import type { ReactNode } from 'react';

export function ButtonContent({ children }: { children: ReactNode }) {
 return <span className="button-content"><span className="button-face">{children}</span><span className="button-face button-face-hover" aria-hidden="true">{children}</span></span>;
}
