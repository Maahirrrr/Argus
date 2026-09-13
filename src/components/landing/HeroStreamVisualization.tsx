import React, { useEffect, useRef } from 'react';

interface StreamNode {
  name: string;
  shortName: string;
  category: string;
  rate: string;
  color: string;
  yRatio: number;
}

const STREAM_NODES: StreamNode[] = [
  { name: 'TRANSACTIONS', shortName: 'TXNS', category: 'ClickHouse', rate: '18.4Cr', color: '#0066FF', yRatio: 0.18 },
  { name: 'SUPPORT', shortName: 'HELP', category: 'Zendesk', rate: '2,481', color: '#8A8A8A', yRatio: 0.32 },
  { name: 'RETENTION', shortName: 'RET', category: 'Segment', rate: '41.8%', color: '#10B981', yRatio: 0.46 },
  { name: 'PAYMENTS', shortName: 'PAY', category: 'NPCI / PG', rate: '94.2%', color: '#EF4444', yRatio: 0.60 },
  { name: 'FEEDBACK', shortName: 'FEED', category: 'App Store', rate: '520/wk', color: '#8A8A8A', yRatio: 0.74 },
  { name: 'REVENUE', shortName: 'REV', category: 'Ledger', rate: '₹4.2M/d', color: '#0066FF', yRatio: 0.88 },
];

export const HeroStreamVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = window.innerWidth < 640 ? 320 : 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = window.innerWidth < 640 ? 320 : 400;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mousePos.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Particle system
    const particles: {
      nodeIndex: number;
      progress: number;
      speed: number;
      size: number;
    }[] = [];

    for (let i = 0; i < 26; i++) {
      particles.push({
        nodeIndex: i % STREAM_NODES.length,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        size: 1.5 + Math.random() * 1.5,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 460;
      const startX = isMobile ? 12 : 24;
      const hubX = isMobile ? width * 0.52 : width * 0.58;
      const hubY = height * 0.5;
      const outX = isMobile ? width - 12 : width - 24;

      // Draw flowing curved streams
      STREAM_NODES.forEach((node, idx) => {
        const startY = height * node.yRatio;

        // Interactive deflection from mouse or touch
        const dx = mousePos.current.x - (startX + hubX) / 2;
        const dy = mousePos.current.y - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const deflection = Math.max(0, 1 - dist / 180) * 10;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
          hubX * 0.45, startY + deflection,
          hubX * 0.75, hubY + Math.sin(time + idx) * 3,
          hubX, hubY
        );
        ctx.strokeStyle = idx === 3 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(29, 29, 29, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle & label
        ctx.fillStyle = '#0A0A0A';
        ctx.beginPath();
        ctx.arc(startX, startY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = idx === 3 ? '#EF4444' : '#2E2E2E';
        ctx.stroke();

        // Label text (use short names on small phones)
        ctx.fillStyle = idx === 3 ? '#EF4444' : '#8A8A8A';
        ctx.font = isMobile ? '8px "JetBrains Mono", monospace' : '9px "JetBrains Mono", monospace';
        const labelText = isMobile ? node.shortName : node.name;
        ctx.fillText(labelText, startX + 6, startY + 3);
      });

      // Draw output streams from AI Engine to Opportunities
      const outPoints = [
        { label: isMobile ? '#014 OPP' : 'OPPORTUNITY #014', y: hubY - 42, color: '#0066FF' },
        { label: isMobile ? 'SIMULATOR' : 'DECISION SIMULATOR', y: hubY, color: '#10B981' },
        { label: isMobile ? 'PRD SPEC' : 'SPECS & PRD', y: hubY + 42, color: '#8A8A8A' },
      ];

      outPoints.forEach((out, i) => {
        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.bezierCurveTo(
          hubX + (outX - hubX) * 0.4, hubY,
          hubX + (outX - hubX) * 0.6, out.y,
          outX, out.y
        );
        ctx.strokeStyle = i === 0 ? 'rgba(0, 102, 255, 0.5)' : 'rgba(29, 29, 29, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = out.color;
        ctx.beginPath();
        ctx.arc(outX, out.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = isMobile ? '8px "JetBrains Mono", monospace' : '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(out.label, outX - 6, out.y + 3);
        ctx.textAlign = 'left';
      });

      // Animate Particles along the bezier curves
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.nodeIndex = Math.floor(Math.random() * STREAM_NODES.length);
        }

        const node = STREAM_NODES[p.nodeIndex];
        const startY = height * node.yRatio;

        const t = p.progress;
        const cp1x = hubX * 0.45;
        const cp1y = startY;
        const cp2x = hubX * 0.75;
        const cp2y = hubY;

        const x =
          Math.pow(1 - t, 3) * startX +
          3 * Math.pow(1 - t, 2) * t * cp1x +
          3 * (1 - t) * Math.pow(t, 2) * cp2x +
          Math.pow(t, 3) * hubX;

        const y =
          Math.pow(1 - t, 3) * startY +
          3 * Math.pow(1 - t, 2) * t * cp1y +
          3 * (1 - t) * Math.pow(t, 2) * cp2y +
          Math.pow(t, 3) * hubY;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.nodeIndex === 3 ? 'rgba(239, 68, 68, 0.85)' : 'rgba(245, 245, 240, 0.7)';
        ctx.fill();
      });

      // Central Hub: AI SIGNAL ENGINE
      const hubBoxW = isMobile ? 86 : 104;
      const hubBoxH = isMobile ? 38 : 44;
      ctx.fillStyle = '#0A0A0A';
      ctx.beginPath();
      ctx.roundRect(hubX - hubBoxW / 2, hubY - hubBoxH / 2, hubBoxW, hubBoxH, 4);
      ctx.fill();
      ctx.strokeStyle = '#2E2E2E';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#0066FF';
      ctx.beginPath();
      ctx.arc(hubX - (isMobile ? 30 : 36), hubY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F5F0';
      ctx.font = isMobile ? '600 9px "Inter", sans-serif' : '600 10px "Inter", sans-serif';
      ctx.fillText('AI SIGNAL', hubX - (isMobile ? 22 : 26), hubY - 2);
      ctx.fillStyle = '#8A8A8A';
      ctx.font = isMobile ? '400 8px "JetBrains Mono", monospace' : '400 9px "JetBrains Mono", monospace';
      ctx.fillText('ENGINE / 01', hubX - (isMobile ? 22 : 26), hubY + 10);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="w-full relative p-3 sm:p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] overflow-hidden select-none">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#1D1D1D] text-[10px] font-mono-tech text-[#8A8A8A]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
          <span className="truncate">REAL-TIME INGESTION</span>
        </div>
        <span className="text-[9px] text-[#525252]">CLICKHOUSE / NPCI</span>
      </div>
      <canvas ref={canvasRef} className="w-full block" style={{ height: '320px', maxHeight: '400px' }} />
      <div className="pt-2.5 border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
        <span>6 ACTIVE STREAMS</span>
        <span className="text-[#F5F5F0]">4.2M EVENTS / DAY</span>
      </div>
    </div>
  );
};
