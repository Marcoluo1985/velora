import { useEffect, useState } from 'react';
import { images } from './assets';
const phase = (p: number, start: number, end: number) => Math.max(0, Math.min(1, (p - start) / (end - start)));
export default function ScrollGallery() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const expand = phase(progress, .06, .16);
  const eased = expand < .5 ? 4 * expand ** 3 : 1 - (-2 * expand + 2) ** 3 / 2;
  const width = progress < .06 ? `${phase(progress, 0, .06) * 50}px` : `calc(50px + (100vw - 50px) * ${eased})`;
  const scaleStyle = (start: number, end: number) => {
    const p = phase(progress, start, end);
    return { transform: `scale(${.2 + p * .8})`, opacity: Math.min(1, p * 4) };
  };
  const morph = phase(progress, .78, .9);
  const shade = Math.round(morph * 255);
  return <div className="fixed inset-0 z-10 pointer-events-none" aria-hidden={progress === 0}>
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-black" style={{ width }} />
    {images.map((src, i) => <div key={src} className="absolute inset-0 flex items-center justify-center" style={scaleStyle([.16, .34, .5][i], [.34, .5, .64][i])}>
      <img src={src} alt={['Contemporary luxury residence surrounded by landscape', 'Exceptional architectural property', 'Refined private residence'][i]} className="w-[85vw] h-auto max-w-[900px] aspect-[16/10] rounded-lg sm:w-full sm:h-full sm:max-w-none sm:aspect-auto sm:rounded-none object-cover"/>
    </div>)}
    <div className="absolute inset-0 flex items-center justify-center" style={{ ...scaleStyle(.64, .78), backgroundColor: `rgb(${shade}, ${shade}, ${shade})` }}>
      <p className="font-geist font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-[1.3] max-w-3xl px-6 text-white" style={{ opacity: 1 - morph }}>Access exceptional real estate opportunities <span className="text-amber-500">worldwide.</span></p>
    </div>
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: phase(progress, .9, 1) }}>
      <p className="font-geist font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center leading-[1.3] max-w-3xl px-6 text-neutral-800">Built on trust and <span className="text-amber-500">expertise.</span></p>
    </div>
  </div>;
}
