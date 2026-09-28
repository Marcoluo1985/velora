import { useCallback, useState } from 'react';
import SplashScreen from './SplashScreen';
import ScrollGallery from './ScrollGallery';
import Menu from './Menu';
import { heroVideo } from './assets';

export default function App() {
  const [intro, setIntro] = useState(true);
  const complete = useCallback(() => setIntro(false), []);
  return <main className="bg-black h-[900vh]">
    {intro && <SplashScreen onComplete={complete} />}
    <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
      <video className="absolute inset-0 w-full h-full object-cover" src={heroVideo} poster="/media/home-poster.jpg" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative flex h-full flex-col">
        <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 md:pt-8">
          <div className="w-8 sm:w-32 md:w-40" />
          <a href="#" className="font-haboro text-white text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase">天隽凯文化</a>
          <div className="w-8 sm:w-32 md:w-40"><a href="mailto:hello@velora.com" className="hidden sm:block bg-white text-black px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-geist font-medium tracking-wide text-center hover:bg-white/90 transition-colors">联系我们</a></div>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6"><h1 className="font-haboro text-white text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-wide uppercase max-w-5xl">臻享天籁空间<br />您值得拥有</h1></div>
        <div className="h-[72px] sm:h-[80px] md:h-[96px] shrink-0" />
      </div>
    </section>
    <ScrollGallery />
    <Menu />
  </main>;
}
