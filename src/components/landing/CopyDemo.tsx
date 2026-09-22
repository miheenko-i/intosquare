import type { ReactNode } from "react";

export function CopyDemo({ logo, transfer = false, phase, active, onReplay }: { logo?: ReactNode; transfer?: boolean; phase: number; active: boolean; onReplay: () => void }) {
  return <div className={`step-art ${transfer ? "destination-art" : "copy-art"} copy-animation copy-phase-${phase}${active ? " is-active" : ""}`}>
    <div className={transfer ? "destination-mini" : "mini-plugin"}>
      {transfer ? <><span className="tiny-status">Connected</span><b>Your Squarespace site</b><div>Hero Section <span aria-hidden="true">⌄</span></div></> : <><div>{logo}<b>IntoSquare</b></div><span>{phase === 3 ? "✓ Your section is ready" : "Hero section selected"}</span></>}
      <button className="mini-copy copy-demo-button" onClick={onReplay} aria-label={transfer ? "Replay the transfer animation" : "Replay the copy animation"}>
        <span>{phase === 2 ? (transfer ? "Transferring…" : "Checking section…") : phase === 3 ? (transfer ? "Transferred successfully" : "Copied successfully") : (transfer ? "Transfer to Squarespace" : "Copy for Squarespace")}</span>
        {phase === 2 ? <span className="demo-spinner" aria-hidden="true"/> : <span aria-hidden="true">{phase === 3 ? "✓" : "↗"}</span>}
      </button>
    </div>
    {!transfer && <span className="copied-toast" aria-hidden={phase !== 3}>✓ Next stop, Squarespace.</span>}
    <span className="copy-pointer" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m4 3 15 10-7 1-3 7Z"/></svg></span>
  </div>;
}
