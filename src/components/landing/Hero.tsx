import { DemoFrame } from "./DemoFrame";
import { Waitlist } from "./Waitlist";

export function Hero() {
  return <section className="source-hero" aria-labelledby="headline">
    <div className="hero-top">
      <div className="source-intro">
        <p className="micro section-index">FIGMA PLUGIN + CHROME EXTENSION / COMING SOON</p>
        <h1 id="headline">From Figma<br/>to editable<br/><span>Squarespace blocks.</span></h1>
        <p className="hero-description">IntoSquare transfers prepared Figma layouts into native Fluid Engine blocks — text, buttons, images and shapes you can keep editing in Squarespace.</p>
        <a className="text-link micro" href="#how-it-works">THREE STEPS. NO CODE. <span aria-hidden="true">↓</span></a>
      </div>
      <Waitlist />
    </div>
    <figure className="source-demo">
      <div className="demo-caption micro"><span>YOUR DESIGN, BEFORE & AFTER</span><span>CONCEPT PREVIEW / 001</span></div>
      <DemoFrame />
      <figcaption className="micro">Same structure. Native blocks. Keep editing in Squarespace.</figcaption>
    </figure>
  </section>;
}
