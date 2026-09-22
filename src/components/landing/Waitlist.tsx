import { ButtonContent } from "./ButtonContent";
import { useRef, useState, type FormEvent } from 'react';
import { WAITLIST_ENDPOINT, isWaitlistConfigured } from '@/config/waitlist';
import { submitEmail, validateEmail } from '@/lib/waitlist';
export function Waitlist() {
 const [email,setEmail]=useState('');const [website,setWebsite]=useState('');
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');const [message,setMessage]=useState('');
 const input=useRef<HTMLInputElement>(null);const busy=useRef(false);
 async function handleSubmit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy.current||status==='success')return;
  const error=validateEmail(email);if(error){setStatus('error');setMessage(error);input.current?.focus();return;}
  busy.current=true;setStatus('sending');setMessage('');const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
  try{await submitEmail(WAITLIST_ENDPOINT,email,controller.signal,fetch,website);setStatus('success');setEmail('');}
  catch(error){setStatus('error');setMessage(error instanceof Error && error.name!=='AbortError' && !(error instanceof TypeError)?error.message:'Couldn’t connect. Please try again.');}
  finally{clearTimeout(timer);busy.current=false;}
 }
 return <section className="waitlist reveal" id="notify" aria-labelledby="notify-heading"><h2 id="notify-heading">Let’s make the move.</h2><p>Get one email when IntoSquare launches.<br/>Then bring your first design along.</p>{status==='success'?<div className="signup-success" role="status"><h3>You’re on the list.</h3><p>We’ll email you when IntoSquare launches in October.</p></div>:<form onSubmit={handleSubmit} noValidate aria-busy={status==='sending'}><label className="visually-hidden" htmlFor="signup-email">Email address</label><div className="signup-row"><input ref={input} id="signup-email" type="email" name="email" value={email} onChange={event=>{setEmail(event.target.value);if(status==='error'){setStatus('idle');setMessage('');}}} placeholder="you@your.studio" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} aria-invalid={status==='error'} aria-describedby={status==='error'?'signup-error signup-privacy':'signup-privacy'} disabled={status==='sending'}/><button className="button signup-submit" type="submit" disabled={status==='sending'||!isWaitlistConfigured}><ButtonContent>{status==='sending'?'Joining…':'Notify me'}<span aria-hidden="true">↗</span></ButtonContent></button></div><div className="honeypot" aria-hidden="true"><label htmlFor="signup-website">Leave empty</label><input id="signup-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event=>setWebsite(event.target.value)}/></div><p className="form-error" id="signup-error" role="alert">{message}</p><p className="privacy-note" id="signup-privacy">By joining, you agree to receive the IntoSquare launch email.<br/>No newsletter. No spam. Just the good news.</p>{!isWaitlistConfigured&&<p className="signup-setup-note">Email signup opens soon.</p>}<noscript><p className="privacy-note">Enable JavaScript to join.</p></noscript></form>}<details className="privacy-details"><summary>How we use your email</summary><p>We save your email and signup date in a private Google Sheet and send a signup notification to hello@intosquare.app. Your address is used for the launch announcement only. To remove it, email <a href="mailto:hello@intosquare.app">hello@intosquare.app</a>.</p></details></section>;
}
