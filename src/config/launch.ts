export const LAUNCH = { month: "October", year: 2026, monthly: 15, semiannual: 69, annual: 119, freeTransfers: 5, freeMonthly: false } as const;
export const semiannualSavings = Math.round((1 - LAUNCH.semiannual / (LAUNCH.monthly * 6)) * 100);

export const PRODUCT_LINKS = {
 gumroad: "https://omtb.gumroad.com/l/intosquare",
 chrome: "https://chromewebstore.google.com/detail/dcdejadddiaffdpckhnmmmbglepcljmi",
 figma: "https://www.figma.com/community/plugin/1688972983061987655/intosquare-figma-to-squarespace",
 account: "https://api.intosquare.app/account",
} as const;

export const PRO_PLANS = [
 {months:1, label:"1 month", price:LAUNCH.monthly, description:"For your next project."},
 {months:6, label:"6 months", price:LAUNCH.semiannual, description:"For ongoing projects."},
 {months:12, label:"12 months", price:LAUNCH.annual, description:"For a year of creating."},
] as const;

export function gumroadCheckoutUrl(variant: string) {
 const url = new URL(PRODUCT_LINKS.gumroad);
 url.searchParams.set("wanted", "true");
 url.searchParams.set("variant", variant);
 return url.href;
}
