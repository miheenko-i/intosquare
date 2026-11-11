export function CopilotAnnouncement() {
  return <article className="copilot-announcement" id="copilot" aria-labelledby="copilot-title">
    <div className="copilot-announcement-inner">
      <div className="copilot-announcement-copy">
        <div className="copilot-announcement-meta"><span>AI Copilot + MCP</span><span>Coming soon · Pro only</span></div>
        <h3 id="copilot-title">Start with a prompt.<br/>Or a picture.</h3>
        <p>Turn a prompt or screenshot into editable Squarespace sections. Add your photos, preview desktop and mobile, then add to your page.</p>
        <p className="copilot-announcement-mcp"><strong>MCP</strong> helps your AI assistant check exports and plan transfers. Read-only.</p>
        <a className="copilot-announcement-cta" href="#pricing">Explore Pro <span aria-hidden="true">↗</span></a>
      </div>
      <figure className="copilot-announcement-visual" aria-label="Illustrative preview of an editable Squarespace section">
        <div className="copilot-prompt"><span aria-hidden="true">↳</span> Your prompt or screenshot</div>
        <div className="copilot-result"><div className="copilot-result-toolbar"><span>Editable in Squarespace</span><span aria-hidden="true">↗</span></div><div className="copilot-result-layout"><div><span className="copilot-block-label">TEXT</span><b>Space to<br/>make it yours.</b><span className="copilot-demo-button">Explore ↗</span></div><div className="copilot-demo-image"><span className="copilot-block-label">IMAGE</span><i/></div></div></div>
        <figcaption>Desktop + Mobile · Illustrative preview</figcaption>
      </figure>
    </div>
  </article>;
}
