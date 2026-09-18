import { ArrowRight } from "@/components/icons";

function FigmaLayer({ name, kind, depth = 0 }: { name: string; kind: string; depth?: number }) {
  return (
    <div
      className="flex items-center justify-between py-1.5 text-[12px]"
      style={{ paddingLeft: depth * 12 }}
    >
      <span className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 border border-foreground" />
        {name}
      </span>
      <span className="font-mono text-[11px] text-muted-foreground">{kind}</span>
    </div>
  );
}

function Block({ label, children, className = "" }: { label: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-foreground/80 p-3 ${className}`}>
      <span className="absolute -top-2 left-2 bg-background px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function DemoFrame() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {/* Window chrome */}
      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full border border-foreground/40" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">landing-hero.intosquare.json</span>
        <span className="text-label text-muted-foreground">Preview</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)]">
        {/* Figma side */}
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-label">Figma</span>
            <span className="font-mono text-[11px] text-muted-foreground">Frame · Hero / Desktop</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[132px_minmax(0,1fr)]">
            <div className="hidden border-r border-border px-3 py-3 sm:block">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Layers</p>
              <FigmaLayer name="Hero" kind="Auto" />
              <FigmaLayer name="Stack" kind="Auto" depth={1} />
              <FigmaLayer name="H1" kind="Text" depth={2} />
              <FigmaLayer name="Body" kind="Text" depth={2} />
              <FigmaLayer name="CTA" kind="Button" depth={2} />
              <FigmaLayer name="Visual" kind="Image" depth={1} />
              <FigmaLayer name="Divider" kind="Line" depth={1} />
            </div>
            <div className="bg-grid-fine p-5 sm:p-7">
              <div className="border border-dashed border-foreground/60 bg-background p-5">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3 space-y-3">
                    <div className="h-6 w-[92%] bg-foreground" />
                    <div className="h-6 w-[70%] bg-foreground" />
                    <div className="mt-4 space-y-1.5">
                      <div className="h-2 w-full bg-foreground/30" />
                      <div className="h-2 w-[88%] bg-foreground/30" />
                      <div className="h-2 w-[60%] bg-foreground/30" />
                    </div>
                    <div className="mt-4 inline-block border border-foreground px-3 py-1.5 text-[11px] font-medium">
                      Get started
                    </div>
                  </div>
                  <div className="col-span-2 bg-dots border border-foreground/40" />
                </div>
                <div className="mt-5 h-px w-full bg-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Transfer indicator */}
        <div className="relative flex items-center justify-center py-4 lg:py-0">
          <svg
            className="absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 88 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line
              x1="0"
              y1="50"
              x2="88"
              y2="50"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="6 6"
              className="animate-transfer"
            />
          </svg>
          <div className="relative z-10 grid h-9 w-9 place-items-center border border-foreground bg-background">
            <ArrowRight className="size-4 rotate-90 lg:rotate-0" />
          </div>
        </div>

        {/* Squarespace side */}
        <div className="lg:border-l lg:border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-label">Squarespace</span>
            <span className="font-mono text-[11px] text-muted-foreground">Fluid Engine · Blank section</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_120px]">
            <div className="bg-grid-fine p-5 sm:p-7">
              <div className="space-y-5 bg-background p-5">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3 space-y-4">
                    <Block label="Text · H1">
                      <div className="h-5 w-[90%] bg-foreground" />
                      <div className="mt-1.5 h-5 w-[65%] bg-foreground" />
                    </Block>
                    <Block label="Text · P">
                      <div className="space-y-1.5">
                        <div className="h-2 w-full bg-foreground/30" />
                        <div className="h-2 w-[85%] bg-foreground/30" />
                      </div>
                    </Block>
                    <Block label="Button" className="inline-block">
                      <span className="text-[11px] font-medium">Get started</span>
                    </Block>
                  </div>
                  <Block label="Image" className="col-span-2 bg-dots" />
                </div>
                <Block label="Line" className="py-0">
                  <div className="h-px w-full bg-foreground" />
                </Block>
              </div>
            </div>
            <div className="hidden border-l border-border px-3 py-3 sm:block">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Import</p>
              <ul className="space-y-2 text-[12px]">
                {[
                  ["Text", "3"],
                  ["Button", "1"],
                  ["Image", "1"],
                  ["Line", "1"],
                  ["Code", "0"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between border-b border-border pb-1.5">
                    <span>{k}</span>
                    <span className="font-mono text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border border-foreground py-1.5 text-center text-[11px] font-medium">
                Import
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
