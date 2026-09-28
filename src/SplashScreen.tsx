import { useEffect, useState } from 'react';
export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const fallback = window.setTimeout(() => setFading(true), 10000);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setFading(true);
    return () => { document.body.style.overflow = previous; clearTimeout(fallback); };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setFading(true), 4500);
    return () => clearTimeout(timer);
  }, [ready]);
  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [fading, onComplete]);
  return <div className={`fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} aria-label="天隽凯文化放映机开场动画">
    <div className="projector-scene" aria-hidden="true">
      <div className="projector-light" />
      <img className="projector-body" src="/media/projector-body.png" alt="" onLoad={() => setReady(true)} onError={() => setFading(true)} />
      <img className="projector-reel projector-reel-back" src="/media/projector-reel.png" alt="" />
      <img className="projector-reel projector-reel-front" src="/media/projector-reel.png" alt="" />
    </div>
    <p className="font-heiti text-white text-xl sm:text-2xl tracking-[0.2em] mt-6">天隽凯文化</p>
    <p className="font-heiti text-white/50 text-xs sm:text-sm tracking-[0.3em] mt-4">光影启幕 · 臻享天籁</p>
    <button onClick={() => setFading(true)} className="absolute bottom-8 right-8 text-white/60 hover:text-white text-xs tracking-[0.2em]">跳过开场</button>
  </div>;
}
