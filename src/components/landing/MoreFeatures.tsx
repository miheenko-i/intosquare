import { useState } from "react";
import { PlatformLogo } from "./PlatformLogo";
import { SlidingSwitch } from "./SlidingSwitch";
import { ButtonContent } from "./ButtonContent";

function TransferPreview() {
 const [step,setStep]=useState(0);
 return <div className="transfer-preview"><div className="transfer-actions" aria-label="Interactive transfer preview"><button className="button button-outline" onClick={()=>setStep(1)}><ButtonContent><PlatformLogo kind="figma"/>{step ? "Copied ✓" : "Copy for Squarespace"}</ButtonContent></button><span aria-hidden="true">→</span><button className="button" disabled={!step} onClick={()=>setStep(2)}><ButtonContent><PlatformLogo kind="squarespace"/>Paste & Import</ButtonContent></button></div><div className={`transfer-layout ${step===2?'is-imported':''}`}><div className="transfer-preview-bar"><span>{step===2?'Squarespace / Edit':'Figma / Home'}</span><span>{step===2?'Native blocks':'Your frame'}</span></div><div className="transfer-preview-layout"><div className="transfer-text"><span className="transfer-block-label">Text</span><strong>A little room<br/>to imagine.</strong><span className="transfer-demo-button">Explore ↗</span></div><div className="transfer-image"><span className="transfer-block-label">Image</span><i/></div></div></div><p className="transfer-feedback" aria-live="polite">{step===0?'Try the two-step preview.':step===1?'Copied. Now paste it into Squarespace.':'Your layout, ready to edit.'}</p></div>;
}
function AppearancePreview() {
 const [theme,setTheme]=useState('light');
 return <div className="appearance-demo"><SlidingSwitch selected={theme} className="device-switch" label="Preview destination color theme">{['light','dark','bright'].map(t=><button key={t} aria-pressed={theme===t} onClick={()=>setTheme(t)}>{t[0].toUpperCase()+t.slice(1)}</button>)}</SlidingSwitch><div className={`appearance-preview appearance-${theme}`}><div className="appearance-topline"><span>Squarespace color theme</span><span>{theme}</span></div><strong>The details<br/>come with you.</strong><div className="appearance-buttons"><span className="appearance-primary">Primary ↗</span><span className="appearance-secondary">Secondary ↗</span><span className="appearance-tertiary">Tertiary ↗</span></div><div className="appearance-line"/><div className="appearance-bottom">Button styles & line colors</div></div></div>;
}
export function MoreFeatures() {
 return <div className="feature-pair more-features"><article className="feature-card reveal"><div className="feature-copy"><h3>Two clicks.<br/>Your layout is there.</h3><p>Once connected, copy your frame in Figma, then Paste & Import in Squarespace. Keep working with editable blocks.</p></div><TransferPreview/></article><article className="feature-card reveal"><div className="feature-copy"><h3>Your buttons.<br/>Your chosen theme.</h3><p>Bring button corners, outlines and padding from Figma. Apply button and line colors to the Squarespace theme you choose — light, dark or another palette.</p></div><AppearancePreview/></article></div>;
}
