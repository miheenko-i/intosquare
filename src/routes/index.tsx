import { Wordmark } from "@/components/brand";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const title = "IntoSquare — From Figma to editable Squarespace blocks";
export const description = "Transfer prepared Figma layouts into native Squarespace blocks. Join the release list for the IntoSquare plugin and Chrome extension.";

export function Index() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Wordmark />
      <span className="header-status micro"><span className="status-dot"/> IN THE MAKING</span>
      <nav aria-label="Main navigation"><a href="#how-it-works" className="micro">HOW IT WORKS</a><a className="header-cta micro" href="#notify">GET NOTIFIED <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <Hero />
      <HowItWorks />
      <div className="process-note"><span className="micro">A QUICK NOTE</span><p>IntoSquare is in development. Images are added through Squarespace; typography uses your site's styles. You'll still fine-tune the result.</p></div>
    </main>
    <footer className="site-footer micro"><span>INTOSQUARE © 2026</span><span>INDEPENDENTLY MADE.<br/>NOT AFFILIATED WITH FIGMA OR SQUARESPACE.</span><a href="#notify">SEE YOU AT LAUNCH <span aria-hidden="true">↗</span></a></footer>
  </>;
}
