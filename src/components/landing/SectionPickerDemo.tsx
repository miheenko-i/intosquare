import { useEffect, useRef, useState } from "react";

export function SectionPickerDemo() {
  const scene = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [phase, setPhase] = useState(0);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const cycle = () => {
      clear();
      if (manual.current || !visible) return;
      if (reduced.matches) { setPhase(2); return; }
      setPhase(0);
      timers.current = [
        setTimeout(() => setPhase(1), 1700),
        setTimeout(() => setPhase(2), 2400),
        setTimeout(cycle, 8300),
      ];
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) cycle(); else clear();
    }, { threshold: 0.35 });
    observer.observe(element);
    reduced.addEventListener("change", cycle);
    return () => { clear(); observer.disconnect(); reduced.removeEventListener("change", cycle); };
  }, []);
  const toggle = () => {
    manual.current = true;
    clear();
    setPhase(value => value === 2 ? 0 : 2);
  };
  return <div ref={scene} className={`step-art layers-art section-picker phase-${phase}${manual.current ? " is-manual" : ""}`}>
    <div className="section-picker-list">
      <button className="section-choice hero-choice" aria-expanded={phase === 2} aria-controls="hero-demo-layers" onClick={toggle}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg>
        <span>Hero section</span><span className="choice-meta">Auto Layout</span><span className="choice-chevron" aria-hidden="true">⌄</span>
      </button>
      <div className="hero-demo-expand" aria-hidden={phase !== 2}><div id="hero-demo-layers" className="hero-demo-layers">
        <div className="layer inset"><span>T</span>Room to be yourself.</div>
        <div className="layer inset"><span>▧</span>Image</div>
        <div className="layer inset"><span>↗</span>Explore our spaces</div>
      </div></div>
      <div className="other-sections"><div>
        <div className="section-choice"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg><span>Features</span><span className="choice-meta">Frame</span></div>
        <div className="section-choice"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg><span>Footer</span><span className="choice-meta">Frame</span></div>
      </div></div>
    </div>
    <span className="demo-pointer" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m4 3 15 10-7 1-3 7Z"/></svg><b>You</b></span>
  </div>;
}
