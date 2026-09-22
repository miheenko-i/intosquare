import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionPickerDemo } from "./SectionPickerDemo";
import { CopyDemo } from "./CopyDemo";

// A single timeline owns all three cards. Completed steps hold their result.
const frames = [
  { active: 0, phases: [0, 0, 0], duration: 1200 },
  { active: 0, phases: [1, 0, 0], duration: 700 },
  { active: 0, phases: [2, 0, 0], duration: 1700 },
  { active: 1, phases: [2, 1, 0], duration: 500 },
  { active: 1, phases: [2, 2, 0], duration: 1700 },
  { active: 1, phases: [2, 3, 0], duration: 1300 },
  { active: 2, phases: [2, 3, 1], duration: 500 },
  { active: 2, phases: [2, 3, 2], duration: 1700 },
  { active: 2, phases: [2, 3, 3], duration: 3000 },
];

export function WorkflowDemo({ logo }: { logo: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const restart = useRef<() => void>(() => {});
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let current = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      clearTimeout(timer);
      if (reduced.matches) { setIndex(frames.length - 1); return; }
      setIndex(current);
      if (visible) timer = setTimeout(() => { current = (current + 1) % frames.length; run(); }, frames[current].duration);
    };
    restart.current = () => { current = 0; run(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run(); }, { threshold: 0.05 });
    observer.observe(element);
    reduced.addEventListener("change", run);
    return () => { clearTimeout(timer); observer.disconnect(); reduced.removeEventListener("change", run); restart.current = () => {}; };
  }, []);
  const frame = frames[index];
  const replay = () => restart.current();
  return <div ref={scene} className="steps" data-workflow-step={frame.active + 1}>
    <article className="reveal"><SectionPickerDemo phase={frame.phases[0]} active={frame.active === 0} onReplay={replay}/><h3>Pick your section.</h3><p>Select a prepared frame. IntoSquare checks it and points you to any layers that need attention.</p></article>
    <article className="reveal"><CopyDemo logo={logo} phase={frame.phases[1]} active={frame.active === 1} onReplay={replay}/><h3>Copy it once.</h3><p>Copy from the Figma plugin. Open IntoSquare in Chrome and choose “Paste from Figma.”</p></article>
    <article className="reveal"><CopyDemo transfer phase={frame.phases[2]} active={frame.active === 2} onReplay={replay}/><h3>Paste it into your site.</h3><p>Choose an empty section and transfer. Your design becomes native blocks, ready to edit.</p></article>
  </div>;
}
