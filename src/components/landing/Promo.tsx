import { PluginLogo } from "./PluginLogo";
import { AnimatedDetails } from "./AnimatedDetails";
import { SlidingSwitch } from "./SlidingSwitch";
import { useEffect, useState, type CSSProperties } from "react";
import { ButtonContent } from "./ButtonContent";
import { WorkflowDemo } from "./WorkflowDemo";
import { ThemeToggle } from "./ThemeToggle";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { LAUNCH, PRODUCT_LINKS, PRO_PLANS, gumroadCheckoutUrl } from "@/config/launch";
function Arrow() { return <span aria-hidden="true">↗</span>; }
function Mark() { return <svg viewBox="0 0 36 44" aria-hidden="true"><path d="M18 1 35 10 18 20 1 11Z" fill="currentColor"/><path d="m1 11 17 9v12L1 22Z" fill="currentColor" opacity=".48"/><path d="m18 22 17 10-17 11L1 33Z" fill="currentColor"/></svg>; }
function Brand() { return <a className="brand" href="#top" aria-label="IntoSquare home"><Mark/><span>IntoSquare</span></a>; }
function SectionIntro({title,body}:{title:string;body?:string}) { return <div className="section-intro reveal"><h2>{title}</h2>{body && <p>{body}</p>}</div>; }
function SampleSite({editable=false,mobile=false}:{editable?:boolean;mobile?:boolean}) {
 return <div className={`sample-site ${editable?"editable":""} ${mobile?"mobile-sample":""}`}><div className="sample-nav"><b>forma®</b><span>Spaces for living <Arrow/></span></div><div className="sample-content"><div><span className="sample-kicker">LESS, BUT BETTER.</span><div className="sample-title" data-block="Text">Room to<br/>be yourself.</div><p>Considered spaces.<br/>Everyday possibilities.</p><span className="sample-button" data-block="Button">Explore our spaces <Arrow/></span></div><div className="sample-art" data-block="Image placeholder"><div className="arch"/><div className="pedestal"/><div className="orb"/><span>01 — A little room to imagine.</span></div></div><div className="sample-foot"><span>Thoughtfully designed.</span><span>Made for real life.</span><span>Always yours.</span></div></div>;
}
function IntroVideo() {
 return <figure className="intro-video motion-scene" aria-label="Intro video placeholder. Video coming soon."><div className="video-topline"><span>Figma</span><span className="video-path">Your design <span>→</span> Your website</span><span>Squarespace <Arrow/></span></div><div className="video-canvas"><div className="video-window window-left"><div className="window-bar"><span>Design / Home</span><span>100%</span></div><SampleSite/></div><div className="transfer-trail" aria-hidden="true"><i/><i/><i/></div><div className="transfer-badge"><Mark/></div><div className="video-window window-right"><div className="window-bar"><span>Squarespace / Edit</span><span className="tiny-status">Editable</span></div><SampleSite editable/></div></div><figcaption><span className="play-placeholder" aria-hidden="true">▶</span><div><strong>See your design make the move.</strong><span>Intro video · Coming soon</span></div><span className="video-duration">FIGMA → SQUARESPACE</span></figcaption></figure>;
}
function EditDemo() {
 const [color,setColor]=useState("#d8dccd");
 return <div className="edit-demo" style={{"--sample-bg":color} as CSSProperties}><div className="demo-toolbar"><span><i/> Squarespace editor</span><span>Native blocks</span></div><SampleSite editable/><div className="edit-controls"><span>Try a new background</span><div role="group" aria-label="Preview background color">{["#d8dccd","#ead5bf","#d5deee"].map((c,i)=><button key={c} aria-label={["Sage","Sand","Blue"][i]} aria-pressed={color===c} onClick={()=>setColor(c)} style={{background:c}}/>)}</div></div></div>;
}
function MobileDemo() {
 const [mobile,setMobile]=useState(false);
 return <div className="responsive-demo"><SlidingSwitch selected={mobile?"mobile":"desktop"} className="device-switch" label="Layout preview"><button aria-pressed={!mobile} onClick={()=>setMobile(false)}>Desktop</button><button aria-pressed={mobile} onClick={()=>setMobile(true)}>Mobile</button></SlidingSwitch><div className={`device-preview ${mobile?"is-mobile":""}`}><SampleSite mobile={mobile}/></div><div className="visual-caption">{mobile?"Less space. A layout that follows.":"Your layout, ready for the next screen."}</div></div>;
}
function StyleDemo() {
 const [theme,setTheme]=useState(0);
 const palettes=[["#f9f8f4","#e9e8e2","#58192f","#a78a7f","#201c20"],["#f7f8f4","#d8dccd","#50735d","#a3ac8f","#202c25"]];
 return <div className="style-demo motion-scene"><div className="style-panel"><div className="style-panel-title"><Mark/><span>Site Styles</span><span className="pro-label">PRO</span></div><div className="style-row"><span>Heading 1</span><b>TikTok Sans · 64</b></div><div className="style-row"><span>Paragraph</span><b>TikTok Sans · 18</b></div><div className="palette-swatches">{palettes[theme].map(c=><span key={c} style={{background:c}}/>)}</div><span className="style-status">✓ Typography & palette mapped</span></div><div className="style-result" style={{background:palettes[theme][1],color:palettes[theme][4]}}><span>A LOOK THAT’S YOURS</span><b>Make it<br/>feel like you.</b><span className="style-result-button" style={{background:palettes[theme][2]}}>Let’s begin <Arrow/></span></div><button className="text-button" onClick={()=>setTheme(1-theme)}>Try another palette <span aria-hidden="true">↻</span></button></div>;
}
function PluginLinks() {
 return <div className="plugin-actions"><a className="button" href={PRODUCT_LINKS.chrome}><ButtonContent><PluginLogo kind="chrome"/>Chrome extension</ButtonContent></a><a className="button button-outline" href={PRODUCT_LINKS.figma}><ButtonContent><PluginLogo kind="figma"/>Figma plugin</ButtonContent></a></div>;
}
function InstallPlugins() {
 return <section className="install-plugins reveal" id="plugins" aria-labelledby="install-title">
  <div className="install-intro"><p className="eyebrow">Get started</p><h2 id="install-title">Let’s make<br/>the move.</h2><p>Two plugins. One connected workflow.<br/>Start with {LAUNCH.freeTransfers} free imports on one Squarespace site.</p><PluginLinks/><p className="install-account">Already have a Pro key?<br/><a href={PRODUCT_LINKS.account}>Activate it in your account <Arrow/></a></p></div>
  <div className="install-guide"><h3>From install to first import</h3><ol className="install-steps" role="list">
   <li><span className="install-number" aria-hidden="true">01</span><div><h4>Sign in to IntoSquare</h4><p>Install both plugins, then create your IntoSquare account in the Chrome extension. Verify your email.</p></div></li>
   <li><span className="install-number" aria-hidden="true">02</span><div><h4>Connect Figma</h4><p>Click <strong>Connect account</strong> in Figma. Enter its code in Chrome <strong>Settings → Connect Figma</strong> and confirm.</p></div></li>
   <li><span className="install-number" aria-hidden="true">03</span><div><h4>Make your first import</h4><p>Copy a Figma frame, then import it into a blank Fluid Engine section in Squarespace. Review desktop and mobile.</p></div></li>
  </ol></div>
 </section>;
}

const questions=[
 ["What do I need to use IntoSquare?","Figma, Chrome, and a Squarespace 7.1 site using Fluid Engine. IntoSquare has two companions: a Figma plugin to copy your design and a Chrome extension to bring it into Squarespace."],
 ["Can I still edit everything in Squarespace?","Supported elements become native Squarespace blocks. Edit text, move blocks, change spacing, and keep building in the normal editor. Unsupported details are flagged before export so you can adjust your design."],
 ["What happens to my images?","The current version creates image placeholders with the layout in place. Add the final images through Squarespace after import. Automatic image upload is not included yet."],
 ["How does the mobile layout work?","Export a desktop frame and IntoSquare creates a mobile arrangement automatically. You can also supply a separate mobile frame. Keep Auto Layout preserves supported groups as Squarespace Stacks; review the imported mobile layout before publishing."],
 ["Can I bring my fonts and colors too?","Yes, with Pro. Copy typography and a five-color palette from Figma into native Squarespace Site Styles. Review changes before applying them across your site. Font availability can affect the result."],
 ["What happens when Pro expires?","Your imported content stays in Squarespace and remains editable. Your Pro access controls future imports and Pro features; it does not lock the pages you already created."],
];
function Pricing() {
 return <section className="section pricing" id="pricing">
  <SectionIntro title="Choose your Pro access." body="One payment. No auto-renewal."/>
  <div className="price-grid">
   {PRO_PLANS.map(plan=><article key={plan.months} className={`price-card pro-plan reveal${plan.months===12?' price-pro':''}`}>
    <div className="plan-top"><div className="plan-heading"><h3>{plan.label}</h3>{plan.months>1&&<span className="plan-saving">Save ${LAUNCH.monthly*plan.months-plan.price}</span>}</div><span>{plan.description}</span></div>
    <div className="price">${plan.price}</div>
    <p className="price-detail">One-time payment.</p>
    <a href={gumroadCheckoutUrl(plan.label)} className="button"><ButtonContent>Get {plan.label} <Arrow/></ButtonContent></a>
   </article>)}
  </div>
  <ul className="pro-included" aria-label="Included in every Pro plan"><li>Unlimited imports</li><li>Unlimited sites</li><li>Fonts & colors</li></ul>
  <p className="pricing-free">Try {LAUNCH.freeTransfers} free imports on one site. <a href="#plugins">Get started <Arrow/></a></p>
  <p className="pricing-note">Savings compared with $15 one-month passes. Prices in USD; taxes shown at checkout.<br/>Pro starts when you activate your key. <a href={PRODUCT_LINKS.account}>Activate a key <Arrow/></a></p>
 </section>;
}
export function Promo() {
 useSmoothScroll();
 const [menu,setMenu]=useState(false);
 const [compact,setCompact]=useState(false);
 useEffect(()=>{
  const update=()=>setCompact(previous=>window.scrollY>80?true:window.scrollY<24?false:previous);
  update();window.addEventListener("scroll",update,{passive:true});
  return ()=>window.removeEventListener("scroll",update);
 },[]);
 useEffect(()=>{
  const elements=document.querySelectorAll(".reveal");
  if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.08});
  elements.forEach(el=>{el.classList.add("will-reveal");observer.observe(el);});
  const scenes=document.querySelectorAll(".motion-scene");
  const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("is-in-view",entry.isIntersecting)),{threshold:0});
  scenes.forEach(scene=>motionObserver.observe(scene));
  return ()=>{observer.disconnect();motionObserver.disconnect();};
 },[]);
 return <><a className="skip-link" href="#main">Skip to content</a><header className={`site-header${compact?" is-compact":""}`} id="top"><Brand/><button className="menu-toggle" aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?"Close":"Menu"}</button><nav id="main-nav" className={menu?"open":""} aria-label="Main navigation" onClick={()=>setMenu(false)}><a href="#how-it-works">How it works</a><a href="#features">What moves</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#plugins">Install</a><a className="mobile-pro-link" href="#pricing">Get Pro <Arrow/></a></nav><div className="header-actions"><ThemeToggle/><a href="#pricing" className="button header-cta"><ButtonContent>Get Pro <Arrow/></ButtonContent></a></div></header>
 <main id="main" tabIndex={-1}><section className="hero page-width"><h1 id="headline"><span className="hero-heading-primary">From Figma to Squarespace.</span><br/><span>Skip the Rebuild</span></h1><div className="hero-bottom"><p>Bring your Figma layouts and styles into Squarespace.<br className="desktop-br"/> Keep them editable. No more manual copy-paste.</p><PluginLinks/></div><IntroVideo/><div className="hero-proof"><span>Native Squarespace blocks</span><span>Site Styles transfer</span><span>No code to write</span></div></section>
 <section className="section page-width" id="how-it-works"><SectionIntro title="Design. Copy. Keep going." body="A Figma plugin and a Chrome extension, working together."/><WorkflowDemo logo={<Mark/>}/></section>
 <section className="section features-section" id="features"><div className="page-width"><SectionIntro title="The design moves. You stay in control."/><article className="feature-wide reveal"><div className="feature-copy"><h3>The handoff is<br/>just the beginning.</h3><p>Text stays text. Buttons stay buttons. Auto Layout becomes Stacks. Change the details right inside Squarespace.</p><div className="block-tags"><span>Text</span><span>Button</span><span>Shape</span><span>Stack</span><span>Line</span></div></div><EditDemo/></article><div className="feature-pair"><article className="feature-card reveal"><div className="feature-copy"><h3>Big ideas.<br/>Smaller screens.</h3><p>Create a mobile arrangement from your desktop design, or bring your own mobile frame.</p></div><MobileDemo/></article><article className="feature-card reveal"><div className="feature-copy"><h3>Bring the look<br/>along, too.</h3><p>Move your typography and five-color palette into real Squarespace Site Styles.</p></div><StyleDemo/></article></div><div className="honest-note"><span>Good to know</span><p>Images arrive as placeholders. Different desktop and mobile arrangements use Separate blocks. IntoSquare flags unsupported details before you export.</p><a href="#faq">A few more answers <Arrow/></a></div></div></section>
 <div className="page-width"><Pricing/><section className="section faq reveal" id="faq"><div><h2>Glad you asked.</h2><p>Something else on your mind?<br/><a href="mailto:hello@intosquare.app">Say hello <Arrow/></a></p></div><div className="faq-list">{questions.map(([q,a])=><AnimatedDetails key={q} title={q} icon><p>{a}</p></AnimatedDetails>)}</div></section><InstallPlugins/></div></main><footer className="site-footer page-width"><div className="footer-main"><Brand/><p>Less rebuilding. More creating.</p><a href="mailto:hello@intosquare.app">Get support <Arrow/></a><a href="https://www.instagram.com/intosquare.app/" target="_blank" rel="noopener noreferrer">Instagram <Arrow/></a></div><div className="footer-bottom"><span>© 2026 IntoSquare</span><span>Independently made. Not affiliated with Figma or Squarespace.</span><nav className="footer-legal" aria-label="Legal information"><a href="/terms/">Terms of Service</a><a href="/refunds/">Refund Policy</a><a href="/privacy/">Privacy Policy</a></nav><a href="#pricing">Get Pro <Arrow/></a></div></footer></>;
}
