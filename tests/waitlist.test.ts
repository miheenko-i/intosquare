import { test } from "node:test";
import assert from "node:assert/strict";
import { submitEmail, validateEmail } from "../src/lib/waitlist.ts";

test("reject invalid addresses before any request", async () => {
  for (const email of ["", "missing-domain@", "two words@example.com", "x@example", "@example.com"]) {
    assert.ok(validateEmail(email));
    await assert.rejects(submitEmail("https://example.com/form", email, undefined, async () => { assert.fail("Must not send invalid email"); }), /valid email/);
  }
});
test("send a trimmed email and release-only consent after validation", async () => {
  const controller = new AbortController();
  await submitEmail("https://example.com/form", "  designer@example.com  ", controller.signal, async (url, init) => {
    assert.equal(url, "https://example.com/form");
    assert.equal(init?.method, "POST");
    assert.equal(init?.signal, controller.signal);
    assert.equal(new Headers(init?.headers).get("Content-Type"), "text/plain;charset=utf-8");
    const data = JSON.parse(init?.body as string);
    assert.equal(data.email, "designer@example.com");
    assert.equal(data.source, "intosquare-launch-2026-10");
    assert.equal(data.website, "");
    assert.match(data.consent, /released/);
    return Response.json({ ok: true });
  });
});
test("unconfigured endpoint never sends or reports success", async () => {
  await assert.rejects(submitEmail("", "designer@example.com", undefined, async () => { assert.fail("Must not send without configuration"); }), /aren't open/);
});
test("HTTP errors and provider rejection never count as success", async () => {
  for (const response of [Response.json({ ok: true }, { status: 429 }), Response.json({ success: "false" }), Response.json({ error: "Activation required" }), Response.json({ ok: false }), Response.json({})]) {
    await assert.rejects(submitEmail("https://example.com/form", "designer@example.com", undefined, async () => response));
  }
});
test("accept explicit provider success only", async () => {
  for (const result of [{ ok: true }, { success: true }, { success: "true" }]) {
    await submitEmail("https://example.com/form", "designer@example.com", undefined, async () => Response.json(result));
  }
});
test("network failures propagate for retry without storing the email", async () => {
  await assert.rejects(submitEmail("https://example.com/form", "designer@example.com", undefined, async () => { throw new TypeError("Network unavailable"); }), /Network unavailable/);
});
test("malformed acknowledgement gives a readable retry message", async () => {
  for (const response of [new Response("<html>Error</html>"), Response.json(null), Response.json([])]) {
    await assert.rejects(submitEmail("https://example.com/form", "designer@example.com", undefined, async () => response), /couldn't confirm/);
  }
});
