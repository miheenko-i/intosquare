// Public form endpoint, injected at build time. Never put a secret API key here.
export const WAITLIST_ENDPOINT = "__INTOSQUARE_WAITLIST_ENDPOINT__";
export const isWaitlistConfigured = WAITLIST_ENDPOINT.startsWith("https://");
