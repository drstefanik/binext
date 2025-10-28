
import React, { useEffect, useRef } from "react";
export default function Particles(){
  const ref = useRef(null);
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, raf; const DPR = window.devicePixelRatio||1;
    const particles = Array.from({length: 60}, ()=>({ x: Math.random(), y: Math.random(), vx:(Math.random()*2-1)/700, vy:(Math.random()*2-1)/700, r: Math.random()*2+0.6 }));
    const resize = ()=>{ w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w*DPR; canvas.height = h*DPR; };
    const draw = ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save(); ctx.scale(DPR,DPR);
      particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>1) p.vx*=-1;
        if(p.y<0||p.y>1) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*w, p.y*h, p.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(12,60,74,0.25)"; ctx.fill();
      });
      // soft links
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i], b=particles[j];
          const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h, dist=Math.hypot(dx,dy);
          if(dist<120){ ctx.strokeStyle=`rgba(12,60,74,${(1-dist/120)*0.15})`; ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke(); }
        }
      }
      ctx.restore(); raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  },[]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
