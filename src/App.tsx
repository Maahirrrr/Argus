import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { WalletDeck } from './components/WalletDeck';
import { SearchOptimizer } from './components/SearchOptimizer';
import { RecommendationCard } from './components/RecommendationCard';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { getSavedWallet, saveWallet } from './lib/storage';
import { calculateBestSwipe } from './lib/optimizer';
import type { PaymentChannel, CreditCard } from './lib/types';
import { INDIAN_CARDS } from './data/cards';
import { Wallet, ArrowRight, Cpu, ShieldOff, Zap } from 'lucide-react';

export function App() {
  const [activeCards, setActiveCards] = useState<CreditCard[]>(() => getSavedWallet());
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [query, setQuery] = useState('Swiggy');
  const [amount, setAmount] = useState(1200);
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel | 'auto'>('auto');

  const activeCardIds = useMemo(() => activeCards.map((c) => c.id), [activeCards]);

  const handleToggleCard = (cardId: string) => {
    let updated: CreditCard[];
    if (activeCardIds.includes(cardId)) {
      if (activeCards.length === 1) return;
      updated = activeCards.filter((c) => c.id !== cardId);
    } else {
      const cardToAdd = INDIAN_CARDS.find((c) => c.id === cardId);
      if (!cardToAdd) return;
      updated = [...activeCards, cardToAdd];
    }
    setActiveCards(updated);
    saveWallet(updated.map((c) => c.id));
  };

  const handleSelectPreset = (cardIds: string[]) => {
    const updated = INDIAN_CARDS.filter((c) => cardIds.includes(c.id));
    setActiveCards(updated);
    saveWallet(cardIds);
  };

  const handleQuickSelectQuery = (
    newQuery: string,
    channel?: PaymentChannel | 'auto',
    newAmount?: number
  ) => {
    setQuery(newQuery);
    if (channel) setSelectedChannel(channel);
    if (newAmount) setAmount(newAmount);
  };

  const recommendation = useMemo(() => {
    if (activeCards.length === 0) return null;
    const forcedChannel = selectedChannel === 'auto' ? undefined : selectedChannel;
    return calculateBestSwipe(activeCards, query, amount || 1000, forcedChannel);
  }, [activeCards, query, amount, selectedChannel]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header walletCount={activeCards.length} onOpenDeck={() => setIsWalletOpen(true)} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 md:py-14 flex flex-col gap-8">

        {/* ── Hero ── */}
        <section className="text-center max-w-3xl mx-auto animate-fade-up">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: 'rgba(79,70,229,0.08)',
              border: '1px solid rgba(79,70,229,0.2)',
              color: '#818cf8',
            }}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Two-tier AI · MCC resolver · POS gateway parser</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.08] mb-5"
            style={{ color: '#f0f4ff' }}
          >
            Which card should
            <br />
            you swipe{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e2c06a 50%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              right now?
            </span>
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed mb-8 mx-auto"
            style={{ color: '#8892aa', maxWidth: '46ch' }}
          >
            Resolves ambiguous POS codes like{' '}
            <code
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c' }}
            >
              RAZORPAY*BLINKIT
            </code>{' '}
            and fine-print exclusions across 15 Indian cards in under 2 seconds.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {[
              { value: '15', label: 'Cards mapped' },
              { value: '200+', label: 'Merchants indexed' },
              { value: '0', label: 'KYC required' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="font-display text-2xl font-bold tracking-tight"
                  style={{ color: '#c9a84c' }}
                >
                  {value}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#454d62' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Search optimizer ── */}
        <div className="animate-fade-up delay-100">
          <SearchOptimizer
            query={query}
            onQueryChange={setQuery}
            amount={amount}
            onAmountChange={setAmount}
            selectedChannel={selectedChannel}
            onChannelChange={setSelectedChannel}
            onQuickSelectQuery={handleQuickSelectQuery}
          />
        </div>

        {/* ── Results ── */}
        {recommendation ? (
          <div className="flex flex-col gap-5">
            <RecommendationCard
              recommendation={recommendation}
              rawQuery={query}
              spendAmount={amount || 1000}
              channel={selectedChannel === 'auto' ? 'online' : selectedChannel}
            />
            <ComparisonMatrix
              comparison={recommendation.comparison}
              spendAmount={amount || 1000}
            />
          </div>
        ) : (
          <div
            className="rounded-2xl py-14 text-center animate-fade-up delay-200"
            style={{ background: 'rgba(8,12,22,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Wallet className="w-10 h-10 mx-auto mb-4" style={{ color: '#454d62' }} />
            <p className="text-sm font-semibold mb-1" style={{ color: '#8892aa' }}>
              No cards in your wallet
            </p>
            <p className="text-xs mb-5" style={{ color: '#454d62' }}>
              Add at least one card to start optimizing
            </p>
            <button
              onClick={() => setIsWalletOpen(true)}
              className="btn-gold px-5 py-2.5 rounded-xl text-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Add cards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Trust strip ── */}
        <section
          className="rounded-2xl px-6 py-5 animate-fade-up delay-300 grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{ background: 'rgba(8,12,22,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {[
            {
              icon: ShieldOff,
              title: 'Zero KYC',
              desc: 'No card numbers, no CVVs, no bank logins. Just card names.',
            },
            {
              icon: Cpu,
              title: 'Two-Tier AI Engine',
              desc: 'Deterministic catalog for common queries. Semantic resolver for cryptic POS strings.',
            },
            {
              icon: Zap,
              title: 'Sub-second response',
              desc: 'Tier 1 returns in <10ms. Tier 2 AI resolver in <500ms.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#c9a84c' }} />
              </div>
              <div>
                <p className="text-xs font-bold mb-0.5 font-display" style={{ color: '#f0f4ff' }}>
                  {title}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: '#454d62' }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-6 px-5 mt-4"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(5,8,16,0.6)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold" style={{ color: '#8892aa' }}>TapWise India</span>
            <span style={{ color: '#454d62' }}>·</span>
            <span style={{ color: '#454d62' }}>Built by Mahir Kadia</span>
          </div>
          <div className="flex items-center gap-4" style={{ color: '#454d62' }}>
            <span>15 Indian cards · 200+ merchants · Zero data sent</span>
          </div>
        </div>
      </footer>

      {/* Wallet drawer */}
      <WalletDeck
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        activeCardIds={activeCardIds}
        onToggleCard={handleToggleCard}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}

export default App;
