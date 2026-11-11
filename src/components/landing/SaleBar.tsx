import { useEffect, useState } from "react";

const SALE_END = Date.parse("2026-11-30T21:00:00Z");

export function SaleBar() {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const update = () => setActive(Date.now() < SALE_END);
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  if (!active) return null;
  return <aside className="sale-bar" aria-label="Black Friday offer">
    <a href="https://omtb.gumroad.com/l/intosquare/INTOHUNT50">
      <span className="sale-bar-offer"><strong>Black Friday</strong><span>50% off any Pro plan</span></span>
      <span className="sale-bar-details"><span className="sale-bar-code">INTOHUNT50</span><span>Until December 1</span><span aria-hidden="true">↗</span></span>
    </a>
  </aside>;
}
