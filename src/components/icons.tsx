import type { SVGProps, ReactNode } from "react";

// Small local set of outline icons; no external icon runtime or network request.
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}
function icon(children: ReactNode) {
  return (props: SVGProps<SVGSVGElement>) => <Icon {...props}>{children}</Icon>;
}
export const ArrowRight = icon(<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>);
export const ChevronDown = icon(<path d="m6 9 6 6 6-6" />);
export const Check = icon(<path d="m5 12 4 4L19 6" />);
export const Menu = icon(<><path d="M4 6h16M4 12h16M4 18h16" /></>);
export const X = icon(<><path d="m6 6 12 12M6 18 18 6" /></>);
export const Download = icon(<><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 16v4h14v-4" /></>);
export const LogOut = icon(<><path d="M9 4H4v16h5M9 12h12m-5-5 5 5-5 5" /></>);
