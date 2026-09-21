import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../google-apps-script/Code.gs', import.meta.url), 'utf8');
function harness({ quota = 100, failWrite = false, failMail = false, lockAvailable = true } = {}) {
  const rows = [['Email', 'Date', 'Consent', 'Source', 'Notification', 'Notified']];
  const mail = [], cache = new Map(); let released = 0;
  const sheet = {
    getLastRow: () => rows.length,
    getRange(row, col, height = 1, width = 1) {
      return {
        setNumberFormat() { return this; },
        setValues(values) {
          if (failWrite) throw new Error('Storage unavailable');
          values.forEach((valuesRow, i) => {
            rows[row - 1 + i] ??= [];
            valuesRow.forEach((value, j) => { rows[row - 1 + i][col - 1 + j] = value; });
          }); return this;
        },
        getValue: () => rows[row - 1]?.[col - 1],
        getDisplayValues: () => Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => String(rows[row - 1 + i]?.[col - 1 + j] ?? ''))),
      };
    },
  };
  const context = vm.createContext({
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => lockAvailable, releaseLock: () => released++ }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    CacheService: { getScriptCache: () => ({ get: key => cache.get(key), put: (key, value) => cache.set(key, value) }) },
    MailApp: { getRemainingDailyQuota: () => quota, sendEmail(message) { if (failMail) throw new Error('Mail unavailable'); mail.push(message); quota--; } },
  });
  vm.runInContext(source, context);
  const request = (email = 'designer@example.com', extra = {}) => context.doPost({ postData: { contents: JSON.stringify({ email, website: '', source: 'intosquare-launch-2026-10', consent: 'Please email me when IntoSquare is released.', ...extra }) } });
  return { context, rows, mail, request, released: () => released, restoreMail: () => { quota = 100; failMail = false; } };
}
test('signup persists normalized email and sends only to the fixed business inbox', () => {
  const app = harness(); assert.equal(app.request(' Designer@Example.com ').ok, true);
  assert.equal(app.rows[1][0], 'designer@example.com'); assert.equal(app.rows[1][4], 'sent');
  assert.equal(app.mail.length, 1); assert.equal(app.mail[0].to, 'hello@intosquare.app');
  assert.match(app.mail[0].body, /designer@example.com/); assert.equal(app.released(), 1);
});
test('repeated submissions reuse one row and do not resend successful notifications', () => {
  const app = harness(); app.request(); app.request('DESIGNER@example.com');
  assert.equal(app.rows.length, 2); assert.equal(app.mail.length, 1);
});
test('invalid email, consent, source and honeypot never write or send', () => {
  const app = harness();
  for (const [email, extra] of [['x\n@example.com', {}], ['a@example.com', { consent: '' }], ['a@example.com', { source: 'other' }], ['a@example.com', { website: 'spam' }]]) assert.equal(app.request(email, extra).ok, false);
  assert.equal(app.rows.length, 1); assert.equal(app.mail.length, 0);
});
test('unavailable storage or lock never claims signup success', () => {
  for (const options of [{ failWrite: true }, { lockAvailable: false }]) {
    const app = harness(options); assert.equal(app.request().ok, false); assert.equal(app.mail.length, 0);
  }
});
test('mail failure and quota exhaustion preserve signup for a later retry', () => {
  for (const options of [{ quota: 0 }, { failMail: true }]) {
    const app = harness(options); assert.equal(app.request().ok, true); assert.equal(app.rows[1][4], 'pending');
    app.restoreMail(); app.context.retryPendingNotifications(); app.context.retryPendingNotifications();
    assert.equal(app.rows[1][4], 'sent'); assert.equal(app.mail.length, 1);
  }
});
test('email-like spreadsheet formulas remain text; health response exposes no subscriber data', () => {
  const app = harness(); app.request('+alias@example.com');
  assert.equal(app.rows[1][0], "'+alias@example.com");
  assert.deepEqual(app.context.doGet(), { ok: true, service: 'IntoSquare launch signup' });
});
test('rate limit caps new rows without preventing legitimate duplicate acknowledgement', () => {
  const app = harness(); for (let i = 0; i < 20; i++) assert.equal(app.request(`user${i}@example.com`).ok, true);
  assert.equal(app.request('extra@example.com').ok, false); assert.equal(app.request('user0@example.com').ok, true);
  assert.equal(app.rows.length, 21);
});
