export function CopilotAnnouncement() {
  return <article className="copilot-announcement" id="copilot" aria-labelledby="copilot-title">
    <div className="copilot-announcement-inner">
      <div className="copilot-announcement-copy">
        <div className="copilot-announcement-meta"><span>AI Copilot + MCP</span><span>Coming soon · Pro only</span></div>
        <h3 id="copilot-title">A prompt or a picture.<br/>AI will do the job.</h3>
        <p>Describe a section or add a screenshot for inspiration. Bring your own photos. Copilot creates native Squarespace blocks with desktop and mobile layouts, using your site’s text styles — ready for you to keep editing.</p>
        <ol className="copilot-announcement-steps"><li>Describe or upload</li><li>Preview your design</li><li>Add to your page</li></ol>
        <p className="copilot-announcement-mcp"><strong>Plan your transfer with MCP.</strong> Connect your AI assistant to inspect Figma exports, flag issues and prepare a transfer plan. MCP is read-only.</p>
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
