import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Wordmark({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-tight", className)}
      aria-label="IntoSquare home"
    >
      <span
        className={cn(
          "grid h-5 w-5 place-items-center border",
          inverse ? "border-ink-foreground" : "border-foreground",
        )}
      >
        <span className={cn("h-2 w-2", inverse ? "bg-ink-foreground" : "bg-foreground")} />
      </span>
      IntoSquare
    </Link>
  );
}

export function Label({ children, className, inverse = false }: { children: React.ReactNode; className?: string; inverse?: boolean }) {
  return (
    <p className={cn("text-label", inverse ? "text-ink-muted" : "text-muted-foreground", className)}>{children}</p>
  );
}

export function SectionHead({
  label,
  title,
  lead,
  className,
}: {
  label: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid-12 items-end gap-y-6", className)}>
      <div className="col-span-12 lg:col-span-7">
        <Label className="mb-5">{label}</Label>
        <h2 className="text-title text-balance">{title}</h2>
      </div>
      {lead ? (
        <p className="col-span-12 text-body-lg text-muted-foreground lg:col-span-4 lg:col-start-9">{lead}</p>
      ) : null}
    </div>
  );
}
