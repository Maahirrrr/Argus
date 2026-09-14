import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Rocket
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (productType: string, role: string, goal: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<string>('Lead AI Product Manager');
  const [productType, setProductType] = useState<string>('Fintech & Payments');
  const [primaryGoal, setPrimaryGoal] = useState<string>('Accelerate PRD-to-Production Velocity');

  const roles = [
    'Lead AI Product Manager',
    'AI Product Architect',
    'Founder / CPO',
    'Staff Systems Engineer',
  ];

  const productTypes = [
    'Fintech & Payments',
    'High-Scale B2B SaaS',
    'Developer Tooling & APIs',
    'Consumer AI Platform',
  ];

  const goals = [
    'Accelerate PRD-to-Production Velocity',
    'Automate LLM Evaluation Suites & Benchmarks',
    'Real-Time Telemetry & Causal Anomaly Detection',
    'Build Defensible Opportunity & Decision ADR Repos',
  ];

  const handleFinish = () => {
    localStorage.setItem('argus_onboarding_completed', 'true');
    onComplete(productType, role, primaryGoal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-[#F5F5F0]">
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] w-full max-w-xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-[#1D1D1D] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[2px] bg-[#0066FF] flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="font-display font-extrabold text-sm tracking-wider text-[#F5F5F0]">
              WELCOME TO ARGUS
            </span>
          </div>
          <span className="text-xs font-mono-tech text-[#0066FF]">
            STEP {step} OF 4
          </span>
        </div>

        {/* Step 1: Welcome & Mission */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display text-[#F5F5F0]">
              The AI Product Manager Operating System
            </h2>
            <p className="text-xs text-[#8A8A8A] leading-relaxed">
              Argus unites every phase of modern AI product development into a single high-signal cockpit:
              from qualitative user feedback triage and causal telemetry anomalies, to Teresa Torres opportunity trees,
              autonomous PRD & BDD generation, LLM evaluation test suites, and safe canary rollouts.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#050505] border border-[#1D1D1D] rounded-[2px] text-xs font-mono-tech text-[#CCCCCC]">
                <div className="text-[#0066FF] font-bold">SEE THE SIGNAL</div>
                <div className="text-[11px] text-[#8A8A8A] mt-1">Telemetry anomalies & user complaints unified</div>
              </div>
              <div className="p-3 bg-[#050505] border border-[#1D1D1D] rounded-[2px] text-xs font-mono-tech text-[#CCCCCC]">
                <div className="text-[#00CC66] font-bold">SHIP THE PRODUCT</div>
                <div className="text-[11px] text-[#8A8A8A] mt-1">Autonomous BDD specs & canary circuit breakers</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Role */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold font-display text-[#F5F5F0]">
              What is your primary operating role?
            </h2>
            <div className="space-y-2">
              {roles.map((r) => (
                <div
                  key={r}
                  onClick={() => setRole(r)}
                  className={`p-3 bg-[#050505] border rounded-[2px] cursor-pointer transition-all flex items-center justify-between text-xs font-mono-tech ${
                    role === r ? 'border-[#0066FF] text-[#F5F5F0] bg-[#0066FF]/5' : 'border-[#1D1D1D] text-[#8A8A8A]'
                  }`}
                >
                  <span>{r}</span>
                  {role === r && <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Product Domain */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold font-display text-[#F5F5F0]">
              What product domain are you building?
            </h2>
            <div className="space-y-2">
              {productTypes.map((pt) => (
                <div
                  key={pt}
                  onClick={() => setProductType(pt)}
                  className={`p-3 bg-[#050505] border rounded-[2px] cursor-pointer transition-all flex items-center justify-between text-xs font-mono-tech ${
                    productType === pt ? 'border-[#0066FF] text-[#F5F5F0] bg-[#0066FF]/5' : 'border-[#1D1D1D] text-[#8A8A8A]'
                  }`}
                >
                  <span>{pt}</span>
                  {productType === pt && <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Primary Goal */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold font-display text-[#F5F5F0]">
              What is your team's immediate Q3 goal?
            </h2>
            <div className="space-y-2">
              {goals.map((g) => (
                <div
                  key={g}
                  onClick={() => setPrimaryGoal(g)}
                  className={`p-3 bg-[#050505] border rounded-[2px] cursor-pointer transition-all flex items-center justify-between text-xs font-mono-tech ${
                    primaryGoal === g ? 'border-[#0066FF] text-[#F5F5F0] bg-[#0066FF]/5' : 'border-[#1D1D1D] text-[#8A8A8A]'
                  }`}
                >
                  <span>{g}</span>
                  {primaryGoal === g && <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="pt-4 border-t border-[#1D1D1D] flex items-center justify-between">
          <button
            onClick={() => {
              if (step > 1) setStep(step - 1);
              else onClose();
            }}
            className="text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0]"
          >
            {step > 1 ? '← Back' : 'Skip Tour'}
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-medium rounded-[2px] transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#00CC66] hover:bg-[#00B359] text-black text-xs font-mono-tech font-bold rounded-[2px] transition-colors"
            >
              <span>Initialize Workspace</span>
              <Rocket className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
