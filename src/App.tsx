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
import { Zap, Sparkles } from 'lucide-react';

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
      if (activeCards.length === 1) return; // keep at least 1
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

  // Run the Two-Tier Optimizer Engine
  const recommendation = useMemo(() => {
    if (activeCards.length === 0) return null;
    const forcedChannel = selectedChannel === 'auto' ? undefined : selectedChannel;
    return calculateBestSwipe(activeCards, query, amount || 1000, forcedChannel);
  }, [activeCards, query, amount, selectedChannel]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <Header
        walletCount={activeCards.length}
        onOpenDeck={() => setIsWalletOpen(true)}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real-time Indian Credit Card Rewards & Gateway Classifier</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Never swipe the wrong <br className="hidden sm:inline" />
            card in India again.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Resolves ambiguous merchant POS codes, gateway descriptors (<code className="text-emerald-400 font-mono text-xs">RAZORPAY*BLINKIT</code>, <code className="text-emerald-400 font-mono text-xs">PAYTM*DMART</code>), and fine-print exclusions in sub-second time.
          </p>
        </div>

        {/* Search & Configuration Bar */}
        <SearchOptimizer
          query={query}
          onQueryChange={setQuery}
          amount={amount}
          onAmountChange={setAmount}
          selectedChannel={selectedChannel}
          onChannelChange={setSelectedChannel}
          onQuickSelectQuery={handleQuickSelectQuery}
        />

        {/* Recommendation Engine Result */}
        {recommendation ? (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
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
          <div className="text-center py-12 border border-zinc-800 rounded-2xl bg-zinc-900/30">
            <p className="text-zinc-400 text-sm">No cards selected in your wallet.</p>
            <button
              onClick={() => setIsWalletOpen(true)}
              className="mt-3 px-4 py-2 bg-emerald-500 text-black font-semibold text-xs rounded-lg"
            >
              Select Active Cards
            </button>
          </div>
        )}
      </main>

      {/* Wallet Selection Drawer Modal */}
      <WalletDeck
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        activeCardIds={activeCardIds}
        onToggleCard={handleToggleCard}
        onSelectPreset={handleSelectPreset}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/60 py-8 px-4 mt-12 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-zinc-300">TapWise India</span>
            <span>•</span>
            <span>Zero KYC · 100% Client-Side Private</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="hover:text-zinc-200">15 Top Indian Cards Mapped</span>
            <span>•</span>
            <span className="hover:text-zinc-200">POS Gateway Disambiguation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
