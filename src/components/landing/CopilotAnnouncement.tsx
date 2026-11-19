import { ButtonContent } from "./ButtonContent";
export function CopilotAnnouncement() {
  return <article className="copilot-announcement" id="copilot" aria-labelledby="copilot-title">
    <div className="copilot-announcement-inner">
      <div className="copilot-announcement-copy">
        <div className="copilot-announcement-meta"><span>Smart mode</span><span>Beta · 5 free generations</span></div>
        <h3 id="copilot-title">A prompt or a picture.<br/>AI will do the job.</h3>
        <p>Describe a section, add a screenshot or use a Figma reference. Bring your own photos. Smart creates native Squarespace blocks with desktop and mobile layouts, using your site’s text styles — ready for you to keep editing.</p>
        <ol className="copilot-announcement-steps"><li>Describe or upload</li><li>Preview your design</li><li>Add to your page</li></ol>
        <a className="button copilot-announcement-cta" href="#pricing"><ButtonContent>Explore Pro <span aria-hidden="true">↗</span></ButtonContent></a>
      </div>
      <figure className="copilot-announcement-visual smart-transfer motion-scene" aria-label="Illustrative preview of an editable Squarespace section">
        <div className="smart-source" aria-hidden="true"><svg viewBox="0 0 420 220"><rect width="420" height="220" fill="#f2f0e9"/><text x="24" y="58" fontSize="28" fontFamily="Arial,sans-serif" fill="#2f493b">Space to</text><text x="24" y="90" fontSize="28" fontFamily="Arial,sans-serif" fill="#2f493b">make it yours.</text><rect x="24" y="140" width="84" height="28" fill="#2f493b"/><text x="35" y="158" fontSize="10" fill="#fff" fontFamily="Arial,sans-serif">Explore ↗</text><rect x="238" y="20" width="162" height="180" fill="#aabfa7"/><path d="M268 170V95a51 51 0 0 1 102 0v75Z" fill="#e3bba1"/></svg><div className="smart-source-bar">reference.png</div><span className="smart-scan"/></div><div className="copilot-prompt"><span aria-hidden="true">↳</span> Your prompt or screenshot</div>
        <div className="copilot-result"><div className="copilot-result-toolbar"><span>Editable in Squarespace</span><span aria-hidden="true">↗</span></div><div className="copilot-result-layout"><div><span className="copilot-block-label">TEXT</span><b>Space to<br/>make it yours.</b><span className="copilot-demo-button">Explore ↗</span></div><div className="copilot-demo-image"><span className="copilot-block-label">IMAGE</span><i/></div></div></div>
      </figure>
    </div>
  </article>;
}
