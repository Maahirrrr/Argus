import React, { useEffect, useRef } from 'react';

interface StreamNode {
  name: string;
  category: string;
  rate: string;
  color: string;
  yRatio: number;
}

const STREAM_NODES: StreamNode[] = [
  { name: 'TRANSACTIONS', category: 'ClickHouse', rate: '18.4Cr', color: '#0066FF', yRatio: 0.18 },
  { name: 'SUPPORT', category: 'Zendesk', rate: '2,481', color: '#8A8A8A', yRatio: 0.32 },
  { name: 'RETENTION', category: 'Segment', rate: '41.8%', color: '#10B981', yRatio: 0.46 },
  { name: 'PAYMENTS', category: 'NPCI / PG', rate: '94.2%', color: '#EF4444', yRatio: 0.60 },
  { name: 'FEEDBACK', category: 'App Store', rate: '520/wk', color: '#8A8A8A', yRatio: 0.74 },
  { name: 'REVENUE', category: 'Ledger', rate: '₹4.2M/d', color: '#0066FF', yRatio: 0.88 },
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
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(460, window.innerHeight * 0.55);
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Particle system
    const particles: {
      nodeIndex: number;
      progress: number;
      speed: number;
      size: number;
    }[] = [];

    for (let i = 0; i < 28; i++) {
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

      const startX = 24;
      const hubX = width * 0.58;
      const hubY = height * 0.5;
      const outX = width - 24;

      // Draw flowing curved streams
      STREAM_NODES.forEach((node, idx) => {
        const startY = height * node.yRatio;

        // Interactive deflection from mouse
        const dx = mousePos.current.x - (startX + hubX) / 2;
        const dy = mousePos.current.y - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const deflection = Math.max(0, 1 - dist / 180) * 12;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(
          hubX * 0.45, startY + deflection,
          hubX * 0.75, hubY + Math.sin(time + idx) * 3,
          hubX, hubY
        );
        ctx.strokeStyle = idx === 3 ? 'rgba(239, 68, 68, 0.35)' : 'rgba(29, 29, 29, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle & label
        ctx.fillStyle = '#0A0A0A';
        ctx.beginPath();
        ctx.arc(startX, startY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2E2E2E';
        ctx.stroke();

        // Label text
        ctx.fillStyle = idx === 3 ? '#EF4444' : '#8A8A8A';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(node.name, startX + 8, startY + 3);
      });

      // Draw output streams from AI Engine to Opportunities
      const outPoints = [
        { label: 'OPPORTUNITY #014', y: hubY - 50, color: '#0066FF' },
        { label: 'DECISION SIMULATOR', y: hubY, color: '#10B981' },
        { label: 'SPECS & PRD', y: hubY + 50, color: '#8A8A8A' },
      ];

      outPoints.forEach((out, i) => {
        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.bezierCurveTo(
          hubX + (outX - hubX) * 0.4, hubY,
          hubX + (outX - hubX) * 0.6, out.y,
          outX, out.y
        );
        ctx.strokeStyle = i === 0 ? 'rgba(0, 102, 255, 0.45)' : 'rgba(29, 29, 29, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = out.color;
        ctx.beginPath();
        ctx.arc(outX, out.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(out.label, outX - 8, out.y + 3);
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

        // Calculate point on bezier
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
        ctx.fillStyle = p.nodeIndex === 3 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 245, 240, 0.7)';
        ctx.fill();
      });

      // Central Hub: AI SIGNAL ENGINE
      ctx.fillStyle = '#0A0A0A';
      ctx.beginPath();
      ctx.roundRect(hubX - 52, hubY - 22, 104, 44, 4);
      ctx.fill();
      ctx.strokeStyle = '#2E2E2E';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#0066FF';
      ctx.beginPath();
      ctx.arc(hubX - 36, hubY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#F5F5F0';
      ctx.font = '600 10px "Inter", sans-serif';
      ctx.fillText('AI SIGNAL', hubX - 26, hubY - 2);
      ctx.fillStyle = '#8A8A8A';
      ctx.font = '400 9px "JetBrains Mono", monospace';
      ctx.fillText('ENGINE / 01', hubX - 26, hubY + 11);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full relative p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-sm overflow-hidden select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D] text-[10px] font-mono-tech text-[#8A8A8A]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
          <span>REAL-TIME INGESTION PIPELINE</span>
        </div>
        <span>CLICKHOUSE / NPCI GATEWAY</span>
      </div>
      <canvas ref={canvasRef} className="w-full block" style={{ height: '400px' }} />
      <div className="pt-3 border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
        <span>6 ACTIVE STREAMS</span>
        <span className="text-[#F5F5F0]">4.2M EVENTS / DAY</span>
      </div>
    </div>
  );
};
