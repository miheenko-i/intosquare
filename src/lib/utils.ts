type ClassValue = string | false | null | undefined | ClassValue[] | Record<string, unknown>;

// Local class name combiner. Variant-specific classes are mutually exclusive;
// component overrides live in the final utilities layer in styles.css.
export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap((value): string[] => {
    if (!value) return [];
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return [cn(...value)];
    return Object.keys(value).filter((key) => Boolean(value[key]));
  }).join(" ");
}
