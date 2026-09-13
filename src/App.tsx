import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { WalletDeck } from './components/WalletDeck';
import { SearchOptimizer } from './components/SearchOptimizer';
import { WalletSwipeShowdown } from './components/WalletSwipeShowdown';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ExclusionRadar } from './components/ExclusionRadar';
import { MilestoneMaximizer } from './components/MilestoneMaximizer';
import { PosDescriptorDecoder } from './components/PosDescriptorDecoder';
import { INDIAN_CARDS } from './data/cards';
import { calculateBestSwipe } from './lib/optimizer';
import type { PaymentChannel, CreditCard } from './lib/types';
import { getSavedWallet, saveWallet } from './lib/storage';
import {
  Wallet,
  ArrowRight,
  Cpu,
  ShieldOff,
  Zap,
  Layers,
  ShieldAlert,
  TrendingUp,
  Terminal
} from 'lucide-react';

export function App() {
  const [activeCards, setActiveCards] = useState<CreditCard[]>(() => getSavedWallet());
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel | 'auto'>('auto');
  const [activeTab, setActiveTab] = useState<'matrix' | 'exclusions' | 'milestones' | 'pos_decoder'>('matrix');

  const activeCardIds = activeCards.map((c) => c.id);

  const handleToggleCard = (cardId: string) => {
    let newCards: CreditCard[] = [];
    if (activeCardIds.includes(cardId)) {
      newCards = activeCards.filter((c) => c.id !== cardId);
    } else {
      const cardToAdd = INDIAN_CARDS.find((c) => c.id === cardId);
      if (cardToAdd) newCards = [...activeCards, cardToAdd];
    }
    setActiveCards(newCards);
    saveWallet(newCards.map((c) => c.id));
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
      <div className="noise-overlay" aria-hidden="true" />
      <Header walletCount={activeCards.length} onOpenDeck={() => setIsWalletOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10">

        {/* Hero Banner */}
        <section className="relative text-center max-w-4xl mx-auto pt-2 pb-2 overflow-hidden">
          {/* Floating ambient orbs */}
          <div className="shimmer-orb w-96 h-96 bg-[#d4af37]/6 -top-40 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="shimmer-orb w-64 h-64 bg-blue-500/4 top-20 -left-20 pointer-events-none" style={{ animationDelay: '4s' }} />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 bg-[#d4af37]/8 border border-[#d4af37]/20 text-[#e5c07b] font-display"
          >
            <span className="pulse-dot" />
            Dual-Engine MCC Resolver · Real-Time POS Parser
          </motion.div>

          {/* Giant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-white"
          >
            Which card{' '}
            <span className="text-gold-foil">
              right now?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base leading-relaxed mb-6 mx-auto text-zinc-400 max-w-[50ch]"
          >
            Resolves ambiguous descriptors like{' '}
            <code className="text-xs px-2 py-0.5 rounded font-mono bg-[#d4af37]/12 text-[#f3e5ab] border border-[#d4af37]/25">
              RAZORPAY*BLINKIT
            </code>{' '}
            and fine-print exclusions across 15 premier Indian cards.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 sm:gap-5"
          >
            {[
              { value: '15', label: 'Cards' },
              { value: '200+', label: 'Merchants' },
              { value: '0', label: 'KYC' },
            ].map(({ value, label }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.08, duration: 0.4 }}
                className="glass-surface px-5 py-2.5 rounded-2xl text-center"
              >
                <p className="display-number text-xl sm:text-2xl text-gold-foil">{value}</p>
                <p className="text-[10px] uppercase tracking-wider mt-0.5 text-zinc-500 font-semibold font-display">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Dual-Pane Spatial Command Center (Desktop: 2 Columns, Mobile: Stacked) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column: Optimization Console & Active Deck Controls (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <SearchOptimizer
              query={query}
              onQueryChange={setQuery}
              amount={amount}
              onAmountChange={setAmount}
              selectedChannel={selectedChannel}
              onChannelChange={setSelectedChannel}
              onQuickSelectQuery={handleQuickSelectQuery}
              activeCards={activeCards}
              onToggleCard={handleToggleCard}
              onSelectPreset={handleSelectPreset}
              onOpenDeck={() => setIsWalletOpen(true)}
            />
          </div>

          {/* Right Column: 3D Showdown Arena & Recommendation Card (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {recommendation ? (
              <WalletSwipeShowdown
                recommendation={recommendation}
                activeCards={activeCards}
                rawQuery={query}
                spendAmount={amount || 1000}
                channel={selectedChannel === 'auto' ? 'online' : selectedChannel}
                onOpenDeck={() => setIsWalletOpen(true)}
              />
            ) : (
              <div className="cred-card rounded-3xl py-14 text-center">
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
          </div>
        </section>

        {/* Full-Width Intelligence Suite: Tabs */}
        <section className="flex flex-col gap-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="section-label">Intelligence Suite</span>
              <h2 className="font-syne text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                Cardholder Power Tools
              </h2>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#09090d] border border-white/[0.08] overflow-x-auto scroll-x">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'matrix'
                    ? 'bg-[#d4af37] text-[#060608] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Yield Ledger</span>
              </button>

              <button
                onClick={() => setActiveTab('exclusions')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'exclusions'
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Exclusion Radar</span>
              </button>

              <button
                onClick={() => setActiveTab('milestones')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'milestones'
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spend Maximizer</span>
              </button>

              <button
                onClick={() => setActiveTab('pos_decoder')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === 'pos_decoder'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>POS Decoder</span>
              </button>
            </div>
          </div>

          {/* Active Tab Panel View */}
          <div>
            {activeTab === 'matrix' && (
              <ComparisonMatrix
                comparison={recommendation?.comparison || []}
                spendAmount={amount || 1000}
              />
            )}
            {activeTab === 'exclusions' && (
              <ExclusionRadar
                activeCards={activeCards}
                onOpenDeck={() => setIsWalletOpen(true)}
              />
            )}
            {activeTab === 'milestones' && (
              <MilestoneMaximizer activeCards={activeCards} />
            )}
            {activeTab === 'pos_decoder' && (
              <PosDescriptorDecoder onQuickSelectQuery={handleQuickSelectQuery} />
            )}
          </div>
        </section>

        {/* Trust Strip */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"
        >
          {[
            {
              icon: ShieldOff,
              title: 'Zero KYC Local Vault',
              desc: 'No card numbers, no CVVs, no bank logins. Stored 100% in local browser sandbox.',
            },
            {
              icon: Cpu,
              title: 'Dual-Engine Precision',
              desc: 'Deterministic rules + semantic resolver for cryptic POS strings & payment aggregators.',
            },
            {
              icon: Zap,
              title: 'Sub-Second Local Latency',
              desc: 'Zero-latency evaluation at checkout speed without tracking or middle-men.',
            },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + idx * 0.08, duration: 0.4 }}
              className="glass-surface p-5 rounded-2xl flex items-start gap-4 border-l-2 border-[#d4af37]/30"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#d4af37]/10 border border-[#d4af37]/20">
                <Icon className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p className="text-sm font-bold mb-0.5 font-display text-white">{title}</p>
                <p className="text-xs leading-relaxed text-zinc-400">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-5 mt-10 bg-[#060608]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center">
              <span className="font-syne font-bold text-[10px] text-[#d4af37]">TW</span>
            </div>
            <div>
              <span className="font-syne font-bold text-sm text-zinc-300">TapWise India</span>
              <span className="text-zinc-600 text-xs ml-2">Private Card Intelligence Engine</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['15 Cards', '200+ Merchants', 'Zero KYC', '100% Local Engine'].map((item) => (
              <span key={item} className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-500 font-display">
                {item}
              </span>
            ))}
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
