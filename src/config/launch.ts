export const LAUNCH = { month: "October", year: 2026, monthly: 15, semiannual: 69, annual: 119, freeTransfers: 30, freeMonthly: false } as const;
export const semiannualSavings = Math.round((1 - LAUNCH.semiannual / (LAUNCH.monthly * 6)) * 100);

export const PRODUCT_LINKS = {
 gumroad: "https://omtb.gumroad.com/l/intosquare",
 chrome: "https://chromewebstore.google.com/detail/dcdejadddiaffdpckhnmmmbglepcljmi",
 figma: "https://www.figma.com/community/plugin/1688972983061987655/intosquare-figma-to-squarespace",
 account: "https://api.intosquare.app/account",
} as const;
