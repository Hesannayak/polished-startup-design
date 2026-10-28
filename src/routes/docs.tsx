import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs · Oton" },
      {
        name: "description",
        content: "How Oton works: bonding curves, fees, graduation and trading on TON.",
      },
      { property: "og:title", content: "Docs · Oton" },
      {
        property: "og:description",
        content: "How Oton works: bonding curves, fees, graduation and trading on TON.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocsPage,
});

const SECTIONS = [
  {
    title: "Bonding curves",
    body: "Every token launches on a bonding curve. The price rises as people buy and falls as people sell — no order books, no market makers. Liquidity is always available, straight from the curve.",
  },
  {
    title: "Fair launch",
    body: "There are no presales and no team allocations. Everyone buys from the same curve at the same price from the first second.",
  },
  {
    title: "Fees",
    body: "Deploying a token costs a flat 1.0 TON base fee covering deploy and gas. Optionally add an auto-buy of up to 3 TON to seed your own curve at creation.",
  },
  {
    title: "Graduation",
    body: "When a curve fills to the 1,000 TON graduation target, liquidity migrates and the token trades freely on decentralized exchanges. Until then, everything happens on the curve.",
  },
];

function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Docs</h1>
        <p className="mt-2.5 text-muted-foreground">How launching on Oton works.</p>

        <div className="mt-10 flex flex-col gap-4">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl border border-border/70 bg-card/60 p-6 transition-colors duration-300 hover:border-primary/30"
            >
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
