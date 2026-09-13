import React, { useState } from 'react';
import {
  Plus,
  ShieldCheck,
  RefreshCw,
  X
} from 'lucide-react';
import { DEMO_DATA_SOURCES } from '../../data/demoData';

export const DataSourcesPage: React.FC = () => {
  const [sources] = useState(DEMO_DATA_SOURCES);
  const [pingStatus, setPingStatus] = useState<Record<string, string>>({});
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleTestPing = (id: string) => {
    setPingStatus(prev => ({ ...prev, [id]: 'Pinging...' }));
    setTimeout(() => {
      setPingStatus(prev => ({ ...prev, [id]: '24ms · Nominal' }));
    }, 400);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              INFRASTRUCTURE CONNECTORS
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
              5 ACTIVE TELEMETRY STREAMS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            DATA SOURCES
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            High-fidelity simulated telemetry pipelines feeding TapWise AI intelligence layer.
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect Source</span>
        </button>
      </div>

      {/* Portfolio / Demo Disclaimer */}
      <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex items-center gap-3 text-xs font-mono-tech text-[#8A8A8A]">
        <ShieldCheck className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
        <span>
          <strong className="text-[#F5F5F0]">Sample Fintech Telemetry:</strong> Feeds operate on deterministic simulated data (ClickHouse, Zendesk, NPCI Gateway). No real customer PII or credentials are required.
        </span>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((ds) => (
          <div
            key={ds.id}
            className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col justify-between hover:border-[#2E2E2E] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono-tech text-[#8A8A8A]">{ds.type}</span>
                <span className={`text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-[2px] ${
                  ds.status === 'Connected'
                    ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25'
                    : 'bg-[#141414] text-[#525252] border border-[#1D1D1D]'
                }`}>
                  {ds.status}
                </span>
              </div>

              <h2 className="text-sm font-bold text-[#F5F5F0] mb-1 font-display">{ds.name}</h2>
              <p className="text-xs text-[#8A8A8A] font-mono-tech mb-4">{ds.description}</p>
            </div>

            <div className="pt-3 border-t border-[#161616] flex items-center justify-between text-[11px] font-mono-tech text-[#525252]">
              <span>{ds.eventCount}</span>
              <div className="flex items-center gap-2">
                {pingStatus[ds.id] ? (
                  <span className="text-[#10B981]">{pingStatus[ds.id]}</span>
                ) : (
                  <button
                    onClick={() => handleTestPing(ds.id)}
                    className="hover:text-[#F5F5F0] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Ping</span>
                  </button>
                )}
                <span>· Sync: {ds.lastSync}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Source Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <h2 className="text-sm font-bold text-[#F5F5F0] font-mono-tech">CONNECT TELEMETRY CONNECTOR</h2>
              <button onClick={() => setIsConnectModalOpen(false)} className="text-[#8A8A8A] hover:text-[#F5F5F0]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Select a data source connector to stream event logs into TapWise anomaly sentry:
            </p>
            <div className="space-y-2 font-mono-tech text-xs">
              {['Stripe Core Webhooks', 'Razorpay Route Gateway', 'Juspay Hyperswitch', 'Mixpanel Analytics'].map((conn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    alert(`Connector "${conn}" added to active test feed.`);
                    setIsConnectModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-[#F5F5F0] flex justify-between cursor-pointer"
                >
                  <span>{conn}</span>
                  <span className="text-[#0066FF]">+ Connect</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
