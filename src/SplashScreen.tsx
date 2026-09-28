import { useEffect, useRef, useState } from 'react';
import { splashVideo } from './assets';
export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const fallback = window.setTimeout(() => setFading(true), 20000);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setFading(true);
    video.current?.play().catch(() => setFading(true));
    return () => { document.body.style.overflow = previous; clearTimeout(fallback); };
  }, []);
  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [fading, onComplete]);
  return <div className={`fixed inset-0 z-[9999] bg-black flex items-center transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} aria-label="VELORA introduction">
    <video ref={video} className="absolute top-[20%] left-[30%] md:left-[55%] md:-translate-x-1/2 w-[320px] sm:w-[390px] md:w-[750px] max-w-none aspect-video object-contain" src={splashVideo} autoPlay muted playsInline onEnded={() => setFading(true)} onError={() => setFading(true)}/>
    <button onClick={() => setFading(true)} className="absolute bottom-8 right-8 text-white/60 hover:text-white text-xs tracking-[0.2em] uppercase">Skip intro</button>
  </div>;
}
