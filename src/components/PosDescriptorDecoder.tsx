import React, { useState } from 'react';
import { Terminal, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { INDIAN_MERCHANTS } from '../data/merchants';
import type { PaymentChannel } from '../lib/types';

interface PosDescriptorDecoderProps {
  onQuickSelectQuery: (q: string, channel?: PaymentChannel | 'auto', amount?: number) => void;
}

export const PosDescriptorDecoder: React.FC<PosDescriptorDecoderProps> = ({ onQuickSelectQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all POS descriptors from INDIAN_MERCHANTS
  const allDescriptors = INDIAN_MERCHANTS.flatMap((m) =>
    (m.posDescriptors || []).map((desc) => ({
      descriptor: desc,
      merchantName: m.name,
      category: m.category,
      mcc: m.mcc,
      defaultChannel: m.defaultChannel,
      notes: m.notes,
    }))
  );

  const filtered = allDescriptors.filter(
    (item) =>
      item.descriptor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mcc.includes(searchTerm)
  );

  return (
    <div className="cred-card rounded-3xl p-6 sm:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/25">
            <Terminal className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-white">
                POS Descriptor Decoder & Telemetry
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-display">
                Semantic Resolver
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Demystify cryptic billing strings appearing on your credit card statement or SMS alerts
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search descriptor (e.g. RAZORPAY, BUNDL)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Explainer Tip */}
      <div className="my-5 p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20 flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          <strong>Why do descriptors matter?</strong> When you order from Blinkit, the POS charge often shows as{' '}
          <code className="px-1.5 py-0.5 rounded bg-black/50 text-cyan-300 font-mono text-[11px] border border-cyan-500/30">
            RAZORPAY*BLINKIT GURGAON
          </code>
          . Standard card engines fail to classify this and default to 1%. TapWise dual-engine maps the descriptor directly to MCC 5411 to unlock the full 5%–10% cashback.
        </p>
      </div>

      {/* Descriptors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.slice(0, 18).map((item) => (
          <div
            key={item.descriptor}
            className="p-4 rounded-2xl bg-[#09090d] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black text-cyan-300 border border-cyan-500/25">
                  MCC {item.mcc}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 font-display">
                  {item.merchantName}
                </span>
              </div>

              <p className="font-mono text-xs font-bold text-white mb-2 break-all group-hover:text-cyan-200 transition-colors">
                {item.descriptor}
              </p>

              <p className="text-[11px] text-zinc-500 leading-snug line-clamp-2">
                {item.notes || `Resolves to ${item.merchantName} under ${item.category.replace('_', ' ')} category.`}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-display">
                Channel: {item.defaultChannel}
              </span>
              <button
                onClick={() => onQuickSelectQuery(item.descriptor, item.defaultChannel, 1500)}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#d4af37] hover:text-white cursor-pointer transition-colors"
              >
                <span>Test in Optimizer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
