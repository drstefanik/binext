
import React, { useEffect, useRef } from "react";
export default function Particles({ density = 90 }){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return; const ctx=canvas.getContext("2d");
    let w,h,raf; const DPR=window.devicePixelRatio||1;
    const ps=Array.from({length:density}).map(()=>({x:Math.random(),y:Math.random(),vx:(Math.random()*2-1)/700,vy:(Math.random()*2-1)/700,r:Math.random()*2+.6}));
    const resize=()=>{ w=canvas.clientWidth; h=canvas.clientHeight; canvas.width=w*DPR; canvas.height=h*DPR; };
    const draw=()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); ctx.save(); ctx.scale(DPR,DPR);
      ps.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>1) p.vx*=-1; if(p.y<0||p.y>1) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.r,0,Math.PI*2); ctx.fillStyle="rgba(12,60,74,.28)"; ctx.fill(); });
      for(let i=0;i<ps.length;i++){ for(let j=i+1;j<ps.length;j++){ const a=ps[i],b=ps[j]; const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h, d=Math.hypot(dx,dy);
        if(d<140){ ctx.strokeStyle=`rgba(12,60,74,${(1-d/140)*.30})`; ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke(); } } }
      ctx.restore(); raf=requestAnimationFrame(draw); };
    const onResize=()=>resize(); resize(); draw(); window.addEventListener("resize",onResize);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onResize); };
  },[density]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full pointer-events-none" />;
}
