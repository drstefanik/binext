import React, { useRef, useEffect } from "react";
export default function Particles({ density = 90 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const dots = Array.from({ length: density }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: Math.random() - 0.5, vy: Math.random() - 0.5,
    }));
    let raf;
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(12,60,74,0.12)";
      dots.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [density]);
  return <div className="absolute inset-0 -z-10"><canvas ref={ref} className="w-full h-full" /></div>;
}
