import { Home } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
export default function Menu() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setClosing(true), []);
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => { setOpen(false); setClosing(false); trigger.current?.focus(); }, 300);
    return () => clearTimeout(timer);
  }, [closing]);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>('a, button')?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const focusable = [...(panel.current?.querySelectorAll<HTMLElement>('a, button') ?? []), trigger.current!];
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        const next = (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
        event.preventDefault(); focusable[next].focus();
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', keydown); };
  }, [open, close]);
  const navigate = (progress: number) => {
    close();
    window.scrollTo({ top: progress * (document.documentElement.scrollHeight - innerHeight), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <>
    {open && <>
      <div onClick={close} className={`fixed inset-0 z-20 bg-black/20 ${closing ? 'menu-overlay-close' : 'menu-overlay-open'}`} />
      <div ref={panel} id="navigation-menu" role="dialog" aria-modal="true" aria-label="Navigation" className={`fixed z-30 left-1/2 bottom-[80px] sm:bottom-[100px] md:bottom-[120px] w-[92vw] max-w-[480px] max-h-[calc(100dvh-150px)] overflow-y-auto bg-black rounded-lg p-6 sm:p-8 md:p-10 ${closing ? 'menu-close' : 'menu-open'}`}>
        <p className="text-neutral-400 text-xs tracking-[0.2em] uppercase mb-6">MENU</p>
        <ul className="space-y-1">{['About','Properties','Work','Partnership','Contact'].map((label, i) => <li key={label} className="menu-item-enter" style={{ animationDelay: `${i * 60 + 100}ms`, opacity: 0 }}>{i === 4 ? <a href="mailto:hello@velora.com" className="menu-link">{label}</a> : <button className="menu-link" onClick={() => navigate([.76, .34, .63, 1][i])}>{label}</button>}</li>)}</ul>
        <div className="mt-8 pt-6 border-t border-neutral-700/50 space-y-3 text-sm">
          <div className="flex justify-between gap-4"><span className="text-neutral-400">Private line</span><a className="text-white" href="tel:+442081567290">+44 020 8156 7290</a></div>
          <div className="flex justify-between gap-4"><span className="text-neutral-400">Email</span><a className="text-white" href="mailto:hello@velora.com">hello@velora.com</a></div>
        </div>
        <a href="mailto:hello@velora.com" className="block text-center w-full mt-6 bg-white text-black py-3 text-sm font-medium tracking-wide hover:bg-neutral-100 transition-colors">GET IN TOUCH</a>
      </div>
    </>}
    <div className="fixed z-40 left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 md:bottom-10">
      <button ref={trigger} onClick={() => open ? close() : setOpen(true)} aria-expanded={open && !closing} aria-controls="navigation-menu" aria-label={open ? 'Close menu' : 'Open menu'} className={`relative flex h-14 max-w-[85vw] items-center justify-between overflow-hidden bg-black text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open && !closing ? 'w-14 px-0' : 'w-[280px] px-5'}`}>
        <Home className={`h-5 w-5 shrink-0 text-amber-500 transition-opacity ${open && !closing ? 'opacity-0' : ''}`} />
        <span className={`absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.15em] font-medium transition-opacity ${open && !closing ? 'opacity-0' : ''}`}>HOME</span>
        <span className={`absolute top-4 h-6 w-6 transition-all duration-500 ${open && !closing ? 'right-4' : 'right-5'}`}><span className={`absolute left-0 h-[1.5px] bg-white transition-all duration-500 ${open && !closing ? 'top-[11px] w-5 rotate-45' : 'top-[8px] w-6'}`}/><span className={`absolute left-0 h-[1.5px] bg-white transition-all duration-500 ${open && !closing ? 'top-[11px] w-5 -rotate-45' : 'top-[15px] w-6'}`}/></span>
      </button>
    </div>
  </>;
}
