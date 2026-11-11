export function CopilotAnnouncement() {
  return <section className="copilot-announcement page-width" id="copilot" aria-labelledby="copilot-title">
    <div className="copilot-announcement-inner">
      <div className="copilot-announcement-copy">
        <div className="copilot-announcement-meta"><span>Up next / AI Copilot + MCP</span><span>Coming soon · Pro only</span></div>
        <h2 id="copilot-title">Start with a prompt.<br/>Or a picture.</h2>
        <p>Describe a section or drop in a screenshot. Copilot turns your idea into native Squarespace blocks — with desktop and mobile layouts you can keep editing.</p>
        <ol className="copilot-announcement-steps"><li>Describe or upload</li><li>Preview your design</li><li>Add to your page</li></ol>
        <div className="copilot-announcement-mcp"><h3>Your AI assistant, in the loop.</h3><p>The MCP server gives compatible AI assistants design context and transfer checks, so they can help you plan the next step.</p></div>
        <div className="copilot-announcement-footer"><a href="#pricing">Explore Pro <span aria-hidden="true">↗</span></a><span>In development. Planned for Pro subscribers.</span></div>
      </div>
      <figure className="copilot-announcement-visual" aria-label="Illustration: a screenshot reference becomes an editable Squarespace section">
        <div className="copilot-reference"><span>01 / Your reference</span><div className="copilot-reference-mini"><b>Space to<br/>make it yours.</b><i/><i/></div></div>
        <div className="copilot-prompt"><span aria-hidden="true">↳</span> “Turn this into a section for my site.”</div>
        <div className="copilot-result"><div className="copilot-result-toolbar"><span>02 / Editable in Squarespace</span><span aria-hidden="true">↗</span></div><div className="copilot-result-layout"><div><span className="copilot-block-label">TEXT</span><b>Space to<br/>make it yours.</b><span className="copilot-demo-button">Explore the collection ↗</span></div><div className="copilot-demo-image"><span className="copilot-block-label">IMAGE</span><i/></div></div><div className="copilot-result-foot"><span>Text · Images · Buttons</span><span>Desktop + Mobile</span></div></div>
        <figcaption>AI starts it. You make it yours. <span>Illustrative preview.</span></figcaption>
      </figure>
    </div>
  </section>;
}
