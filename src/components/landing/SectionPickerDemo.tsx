export function SectionPickerDemo({ phase, active, onReplay }: { phase: number; active: boolean; onReplay: () => void }) {
  return <div className={`step-art layers-art section-picker phase-${phase}${active ? " is-active" : ""}`}>
    <div className="section-picker-list">
      <button className="section-choice hero-choice" aria-expanded={phase === 2} aria-controls="hero-demo-layers" onClick={onReplay}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg>
        <span>Hero section</span><span className="choice-meta">Auto Layout</span><span className="choice-chevron" aria-hidden="true">⌄</span>
      </button>
      <div className="hero-demo-expand" aria-hidden={phase !== 2}><div id="hero-demo-layers" className="hero-demo-layers">
        <div className="layer inset"><span>T</span>Room to be yourself.</div>
        <div className="layer inset"><span>▧</span>Image</div>
        <div className="layer inset"><span>↗</span>Explore our spaces</div>
      </div></div>
      <div className="other-sections"><div>
        <div className="section-choice"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg><span>Features</span><span className="choice-meta">Frame</span></div>
        <div className="section-choice"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3 4 17M14 3l-2 14M3 7h14M2 13h14"/></svg><span>Footer</span><span className="choice-meta">Frame</span></div>
      </div></div>
    </div>
    <span className="demo-pointer" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m4 3 15 10-7 1-3 7Z"/></svg><b>You</b></span>
  </div>;
}
