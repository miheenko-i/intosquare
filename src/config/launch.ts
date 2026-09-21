// Launch pricing from the September 2026 IntoSquare research.
export const LAUNCH = { month: "October", year: 2026, monthly: 15, annual: 144, freeTransfers: 3, freeMonthly: false } as const;
export const annualMonthly = LAUNCH.annual / 12;
export const annualSavings = Math.round((1 - LAUNCH.annual / (LAUNCH.monthly * 12)) * 100);
