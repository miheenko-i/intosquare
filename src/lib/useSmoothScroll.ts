import { useEffect } from "react";
import type Lenis from "lenis";

declare global { interface Window { Lenis: typeof Lenis } }

export function useSmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scroller: Lenis | undefined;
    const configure = () => {
      scroller?.destroy();
      scroller = undefined;
      if (!preference.matches && window.Lenis) {
        scroller = new window.Lenis({ autoRaf: true, smoothWheel: true, syncTouch: false, lerp: 0.12, allowNestedScroll: true });
      }
    };
    configure();
    preference.addEventListener("change", configure);
    const navigate = (event: MouseEvent) => {
      if (!scroller || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!link || link.target || link.classList.contains("skip-link")) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== hash) history.pushState(null, "", hash);
      scroller.scrollTo(target, {
        duration: 0.9,
        lerp: undefined,
        onComplete: () => {
          const previous = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (previous === null) target.removeAttribute("tabindex");
          else target.setAttribute("tabindex", previous);
        },
      });
    };
    document.addEventListener("click", navigate);
    return () => {
      document.removeEventListener("click", navigate);
      preference.removeEventListener("change", configure);
      scroller?.destroy();
    };
  }, []);
}
