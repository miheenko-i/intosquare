import { useEffect, useRef, useState, type FormEvent } from "react";
import { WAITLIST_ENDPOINT, isWaitlistConfigured } from "@/config/waitlist";
import { submitEmail, validateEmail } from "@/lib/waitlist";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const inFlight = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setReady(true); return () => controllerRef.current?.abort(); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || status === "success") return;
    const error = validateEmail(email);
    if (error) { setStatus("error"); setMessage(error); inputRef.current?.focus(); return; }
    inFlight.current = true;
    setStatus("sending");
    setMessage("");
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      await submitEmail(WAITLIST_ENDPOINT, email, controller.signal);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "AbortError" && !(error instanceof TypeError) ? error.message : "Couldn't connect. Please check your connection and try again.");
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  return <section className="waitlist" id="notify" aria-labelledby="notify-heading">
    <span className="section-index micro">(COMING SOON)</span>
    <h2 id="notify-heading">Be there <br/>at <span className="serif">launch.</span></h2>
    <p>{isWaitlistConfigured ? "Leave your email. We'll let you know when IntoSquare is ready." : "The plugin is on its way. Email signups will open here soon."}</p>
    {status === "success" ? <div className="signup-success" role="status"><span aria-hidden="true">↗</span><h3>You're on the list.</h3><p>See you in your inbox when we launch.</p></div> : <form onSubmit={handleSubmit} action={isWaitlistConfigured ? WAITLIST_ENDPOINT : undefined} method="post" noValidate aria-busy={status === "sending"}>
      <label className="micro" htmlFor="signup-email">YOUR EMAIL</label>
      <div className={`email-field ${status === "error" ? "has-error" : ""}`}><input ref={inputRef} id="signup-email" type="email" name="email" value={email} onChange={event => { setEmail(event.target.value); if (status === "error") { setStatus("idle"); setMessage(""); } }} placeholder="you@your.studio" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} aria-invalid={status === "error"} aria-describedby={status === "error" ? "signup-error signup-privacy" : "signup-privacy"} disabled={!ready || !isWaitlistConfigured || status === "sending"}/></div>
      <button className="signup-submit micro" type="submit" disabled={!ready || !isWaitlistConfigured || status === "sending"}>{!isWaitlistConfigured ? "SIGNUPS OPEN SOON" : status === "sending" ? "JOINING…" : "NOTIFY ME AT LAUNCH"}<span aria-hidden="true">↗</span></button>
      <p id="signup-error" className="form-error" role="alert">{message}</p>
      <p id="signup-privacy" className="privacy-note">{isWaitlistConfigured ? "By signing up, you agree to receive an email about the IntoSquare release. No newsletters. No noise." : "One release announcement. No newsletters. No noise."}</p>
      <noscript><p className="privacy-note">Enable JavaScript to use this signup form.</p></noscript>
    </form>}
  </section>;
}
