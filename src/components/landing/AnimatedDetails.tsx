import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';

export function AnimatedDetails({ title, children, className = '', icon = false }: { title: string; children: ReactNode; className?: string; icon?: boolean }) {
 const details = useRef<HTMLDetailsElement>(null);
 const content = useRef<HTMLDivElement>(null);
 const animation = useRef<Animation | null>(null);
 const expanded = useRef(false);
 const [open, setOpen] = useState(false);
 useEffect(() => () => animation.current?.cancel(), []);
 function toggle(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
  const element = details.current;
  const panel = content.current;
  if (!element || !panel) return;
  const start = element.getBoundingClientRect().height;
  expanded.current = !expanded.current;
  const next = expanded.current;
  setOpen(next);
  animation.current?.cancel();
  panel.toggleAttribute('inert', !next);
  element.open = true;
  const summary = element.querySelector('summary')!;
  const style = getComputedStyle(element);
  const borders = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  const end = summary.getBoundingClientRect().height + (next ? panel.getBoundingClientRect().height : 0) + borders;
  const finish = () => { element.open = next; element.style.height = ''; element.style.overflow = ''; animation.current = null; };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
  element.style.overflow = 'hidden';
  const current = element.animate({ height: [`${start}px`, `${end}px`] }, { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)' });
  animation.current = current;
  current.onfinish = finish;
 }
 return <details ref={details} className={`animated-details ${className}`} data-expanded={open}><summary onClick={toggle}>{title}{icon && <span aria-hidden="true">+</span>}</summary><div ref={content} className="details-content">{children}</div></details>;
}
