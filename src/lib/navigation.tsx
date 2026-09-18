import { forwardRef, useSyncExternalStore, type AnchorHTMLAttributes } from "react";

// Hash navigation works both from a local HTML file and on any static host.
// The conventional /account URL is supported when the server falls back to index.html.
function currentRoute(): "home" | "account" | "not-found" {
  const hash = window.location.hash;
  if (/^#\/account\/?$/.test(hash)) return "account";
  if (hash === "#/" || (hash && !hash.startsWith("#/"))) return "home";
  if (hash.startsWith("#/")) return "not-found";
  return /\/account\/?$/.test(window.location.pathname) ? "account" : "home";
}
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}
export function useRoute() {
  return useSyncExternalStore(subscribe, currentRoute, () => "home" as const);
}
export const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & { to: "/" | "/account" }>(
  ({ to, children, onClick, ...props }, ref) => <a ref={ref} href={`#${to}`} {...props} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented && to === "/" && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      window.scrollTo({top: 0, behavior: "instant"});
    }
  }}>{children}</a>
);
Link.displayName = "Link";
