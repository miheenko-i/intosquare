import { useEffect, useRef, type ReactNode } from 'react';

export function SlidingSwitch({ selected, children }: { selected: string; children: ReactNode }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const control = ref.current;
  if (!control) return;
  const update = () => {
   const active = control.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
   if (!active) return;
   control.style.setProperty('--switch-x', `${active.offsetLeft}px`);
   control.style.setProperty('--switch-y', `${active.offsetTop}px`);
   control.style.setProperty('--switch-width', `${active.offsetWidth}px`);
   control.style.setProperty('--switch-height', `${active.offsetHeight}px`);
   control.dataset.ready = 'true';
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(control);
  for (const button of control.querySelectorAll('button')) observer.observe(button);
  return () => observer.disconnect();
 }, [selected]);
 return <div ref={ref} className="billing-toggle sliding-switch" role="group" aria-label="Billing period">{children}</div>;
}
