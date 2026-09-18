import { SectionHead } from "@/components/brand";

const steps = [
  {
    n: "01",
    title: "Prepare the frame in Figma",
    body: "Use Auto Layout, assign H1–H4 text styles and keep the structure clean. Complex graphics become image placeholders.",
    visual: (
      <div className="bg-grid-fine border border-border p-4">
        <div className="border border-dashed border-foreground bg-background p-3">
          <div className="h-3 w-3/4 bg-foreground" />
          <div className="mt-2 h-1.5 w-full bg-foreground/30" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-10 bg-dots border border-border" />
            <div className="h-10 bg-dots border border-border" />
          </div>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    title: "Export .intosquare.json",
    body: "Run the IntoSquare plugin on the selected frame. It writes a single structured file describing blocks, order and layout.",
    visual: (
      <div className="border border-border bg-background p-4 font-mono text-[11px] leading-relaxed">
        <div className="text-muted-foreground">{"{"}</div>
        <div className="pl-3">"frame": "Hero / Desktop",</div>
        <div className="pl-3">"blocks": [</div>
        <div className="pl-6">{"{ \"type\": \"text\", \"tag\": \"h1\" },"}</div>
        <div className="pl-6">{"{ \"type\": \"button\" },"}</div>
        <div className="pl-6">{"{ \"type\": \"image\" }"}</div>
        <div className="pl-3">]</div>
        <div className="text-muted-foreground">{"}"}</div>
      </div>
    ),
  },
  {
    n: "03",
    title: "Import into a blank section",
    body: "Import with the Chrome extension into a blank Fluid Engine section. Then add images, set links and fine-tune the layout.",
    visual: (
      <div className="border border-border bg-background p-4">
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2 text-[11px]">
          <span className="font-medium">IntoSquare</span>
          <span className="font-mono text-muted-foreground">Preview</span>
        </div>
        <div className="border border-border px-2 py-1.5 font-mono text-[11px] text-muted-foreground">
          landing-hero.intosquare.json
        </div>
        <div className="mt-2 bg-foreground py-1.5 text-center text-[11px] font-medium text-background">
          Import into section
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="original-process scroll-mt-20 border-y border-border bg-surface">
      <div className="container-editorial py-16 lg:py-20">
        <SectionHead label="How it works" title="Three steps. No code." />
        <ol className="process-cards mt-12 grid grid-cols-1 gap-px border border-border bg-border lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col bg-background p-7 lg:p-9">
              <span className="text-title font-mono">{s.n}</span>
              <h3 className="mt-8 text-heading">{s.title}</h3>
              <p className="mt-3 text-[15px] text-muted-foreground">{s.body}</p>
              <div className="mt-8">{s.visual}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
