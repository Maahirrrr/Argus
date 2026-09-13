import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { WalletDeck } from './components/WalletDeck';
import { SearchOptimizer } from './components/SearchOptimizer';
import { WalletSwipeShowdown } from './components/WalletSwipeShowdown';
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

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto animate-fade-up">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#f3e5ab] font-display shadow-sm shadow-[#d4af37]/10"
          >
            <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Dual-Engine MCC Resolver · Instant POS Gateway Parser</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.08] mb-5 text-white"
          >
            Which card should
            <br />
            you swipe{' '}
            <span className="text-gold-foil">
              right now?
            </span>
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed mb-8 mx-auto text-zinc-400 max-w-[46ch]"
          >
            Resolves ambiguous merchant descriptors like{' '}
            <code
              className="text-xs px-2 py-0.5 rounded font-mono bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/30"
            >
              RAZORPAY*BLINKIT
            </code>{' '}
            and fine-print exclusions across 15 premier Indian cards in real time.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {[
              { value: '15', label: 'Cards Mapped' },
              { value: '200+', label: 'Merchants Indexed' },
              { value: '0', label: 'KYC Required' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="cred-card px-4 sm:px-6 py-3 rounded-2xl text-center min-w-[100px]"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-gold-foil tabular-nums">
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-wider mt-0.5 text-zinc-500 font-semibold font-display">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Search Optimizer */}
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

        {/* Results */}
        {recommendation ? (
          <div className="flex flex-col gap-6">
            <WalletSwipeShowdown
              recommendation={recommendation}
              activeCards={activeCards}
              rawQuery={query}
              spendAmount={amount || 1000}
              channel={selectedChannel === 'auto' ? 'online' : selectedChannel}
              onOpenDeck={() => setIsWalletOpen(true)}
            />
            <ComparisonMatrix
              comparison={recommendation.comparison}
              spendAmount={amount || 1000}
            />
          </div>
        ) : (
          <div
            className="cred-card rounded-3xl py-14 text-center"
          >
            <Wallet className="w-10 h-10 mx-auto mb-4 text-zinc-600" />
            <p className="text-sm font-semibold mb-1 text-zinc-300 font-display">
              No cards in your active vault
            </p>
            <p className="text-xs mb-5 text-zinc-500">
              Select at least one card to start real-time optimization
            </p>
            <button
              onClick={() => setIsWalletOpen(true)}
              className="btn-cred-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 font-display"
            >
              <span>Add Cards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Trust Strip */}
        <section
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2"
        >
          {[
            {
              icon: ShieldOff,
              title: 'Zero KYC Architecture',
              desc: 'No card numbers, no CVVs, no bank credentials. Encrypted purely in your local sandbox.',
            },
            {
              icon: Cpu,
              title: 'Dual-Engine Intelligence',
              desc: 'Deterministic catalog for high-frequency merchants plus semantic AI resolver for ambiguous POS terminals.',
            },
            {
              icon: Zap,
              title: 'Sub-Second Precision',
              desc: 'Deterministic rule evaluation in under 10ms. Real-time answers at checkout.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="cred-card p-5 rounded-2xl flex items-start gap-3.5"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#d4af37]/10 border border-[#d4af37]/25"
              >
                <Icon className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p className="text-xs font-bold mb-1 font-display text-white">
                  {title}
                </p>
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-white/[0.06] py-8 px-6 mt-8 bg-[#060608]"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-zinc-300">TapWise India</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">Private Card Intelligence</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">Engineered by Mahir Kadia</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500 font-display text-[11px]">
            <span>15 Indian Cards</span>
            <span>·</span>
            <span>200+ Merchants</span>
            <span>·</span>
            <span>Zero Tracking</span>
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
