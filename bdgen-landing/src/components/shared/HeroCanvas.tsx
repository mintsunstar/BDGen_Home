'use client';

import { useEffect, useRef } from 'react';

const NODE_COUNT = 70;
const CONNECTION_DIST = 130;

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d')!;

    let W = 0, H = 0;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];
    let animId = 0;
    let visible = true;
    const mouse = { x: -999, y: -999 };

    function resize() { W = canvasEl!.width = window.innerWidth; H = canvasEl!.height = window.innerHeight; }
    function createNode() {
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 + 1, opacity: Math.random() * 0.6 + 0.2 };
    }
    function init() { resize(); nodes.length = 0; for (let i = 0; i < NODE_COUNT; i++) nodes.push(createNode()); }

    function draw() {
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.strokeStyle = 'rgba(0,200,255,' + (1 - dist / CONNECTION_DIST) * 0.25 + ')';
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.strokeStyle = 'rgba(108,63,255,' + (1 - dist / 180) * 0.4 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      });
      nodes.forEach((n) => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,200,255,' + n.opacity + ')'; ctx.fill();
      });
    }
    function update() {
      nodes.forEach((n) => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; });
    }
    function loop() { update(); draw(); animId = requestAnimationFrame(loop); }
    function onVis() { visible = document.visibilityState === 'visible'; if (visible) loop(); else if (animId) cancelAnimationFrame(animId); }
    function onMove(e: MouseEvent) { mouse.x = e.clientX; mouse.y = e.clientY; }

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVis);
    init();
    loop();
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} aria-hidden />;
}
