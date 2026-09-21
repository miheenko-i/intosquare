export function validateEmail(value: string): string | null {
  const email = value.trim();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return null;
}

export async function submitEmail(endpoint: string, email: string, signal?: AbortSignal, request: typeof fetch = fetch, website = ""): Promise<void> {
  const validationError = validateEmail(email);
  if (validationError) throw new Error(validationError);
  if (!endpoint.startsWith("https://")) throw new Error("Signups aren't open just yet. Please check back soon.");
  const response = await request(endpoint, {
    method: "POST",
    // A simple cross-origin POST avoids a preflight unsupported by Apps Script.
    // Read the actual JSON acknowledgement; never use opaque no-cors success.
    headers: { "Content-Type": "text/plain;charset=utf-8", "Accept": "application/json" },
    body: JSON.stringify({ email: email.trim(), website, source: "intosquare-launch-2026-10", consent: "Please email me when IntoSquare is released." }),
    signal,
  });
  if (!response.ok) throw new Error("That didn't go through. Please try again in a moment.");
  let result: { success?: boolean | string; ok?: boolean; error?: unknown };
  try {
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    result = payload;
  } catch {
    throw new Error("We couldn't confirm your signup. Please try again.");
  }
  if (result.error || result.success === false || result.success === "false" || result.ok === false) throw new Error("That didn't go through. Please try again in a moment.");
  if (result.success !== true && result.success !== "true" && result.ok !== true) throw new Error("We couldn't confirm your signup. Please try again.");
}
