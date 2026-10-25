export const LAUNCH = { month: "October", year: 2026, monthly: 15, semiannual: 69, annual: 119, freeTransfers: 30, freeMonthly: false } as const;
export const semiannualSavings = Math.round((1 - LAUNCH.semiannual / (LAUNCH.monthly * 6)) * 100);
