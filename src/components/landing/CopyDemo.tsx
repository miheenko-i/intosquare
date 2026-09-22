import { useEffect, useRef, useState, type ReactNode } from "react";

export function CopyDemo({ logo, transfer = false }: { logo?: ReactNode; transfer?: boolean }) {
  const scene = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const replay = useRef<() => void>(() => {});
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    const play = (byUser = false) => {
      clear();
      if (!visible) return;
      if (preference.matches) { setPhase(byUser ? 3 : 0); return; }
      setPhase(byUser ? 1 : 0);
      const delay = byUser ? 0 : 1300;
      timers.current = [
        setTimeout(() => setPhase(1), delay),
        setTimeout(() => setPhase(2), delay + 500),
        setTimeout(() => setPhase(3), delay + 2200),
        setTimeout(() => play(), delay + 6500),
      ];
    };
    replay.current = () => play(true);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play(); else clear();
    }, { threshold: 0.35 });
    observer.observe(element);
    const updateMotion = () => play();
    preference.addEventListener("change", updateMotion);
    return () => { clear(); observer.disconnect(); preference.removeEventListener("change", updateMotion); replay.current = () => {}; };
  }, []);
  return <div ref={scene} className={`step-art ${transfer ? "destination-art" : "copy-art"} copy-animation copy-phase-${phase}`}>
    <div className={transfer ? "destination-mini" : "mini-plugin"}>
      {transfer ? <><span className="tiny-status">Connected</span><b>Your Squarespace site</b><div>Hero Section <span aria-hidden="true">⌄</span></div></> : <><div>{logo}<b>IntoSquare</b></div><span>{phase === 3 ? "✓ Your section is ready" : "Hero section selected"}</span></>}
      <button className="mini-copy copy-demo-button" onClick={() => replay.current()} aria-label={transfer ? "Replay the transfer animation" : "Replay the copy animation"}>
        <span>{phase === 2 ? (transfer ? "Transferring…" : "Checking section…") : phase === 3 ? (transfer ? "Transferred successfully" : "Copied successfully") : (transfer ? "Transfer to Squarespace" : "Copy for Squarespace")}</span>
        {phase === 2 ? <span className="demo-spinner" aria-hidden="true"/> : <span aria-hidden="true">{phase === 3 ? "✓" : "↗"}</span>}
      </button>
    </div>
    {!transfer && <span className="copied-toast" aria-hidden={phase !== 3}>✓ Next stop, Squarespace.</span>}
    <span className="copy-pointer" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m4 3 15 10-7 1-3 7Z"/></svg></span>
  </div>;
}
