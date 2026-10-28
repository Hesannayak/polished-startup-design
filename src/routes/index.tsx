import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { TokenCard } from "@/components/token-card";
import { TOKENS } from "@/data/tokens";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oton — Launchpad on TON blockchain" },
      {
        name: "description",
        content:
          "Create and trade meme tokens on TON with bonding curves. Fair launch, instant liquidity, no presales.",
      },
      { property: "og:title", content: "Oton — Launchpad on TON blockchain" },
      {
        property: "og:description",
        content:
          "Create and trade meme tokens on TON with bonding curves. Fair launch, instant liquidity, no presales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-28 sm:pt-36">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Live on TON Mainnet
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Launchpad on{" "}
          <span className="text-gradient-blue">Ton blockchain</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Create and trade meme tokens with bonding curves.{" "}
          <span className="font-serif italic text-foreground">Fair launch</span>, instant liquidity, no
          presales.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            to="/create"
            className="btn-gradient group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/70 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Launch a Token
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#discover"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-6 py-3 text-sm font-medium text-muted-foreground backdrop-blur transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
          >
            Explore tokens
          </a>
        </div>

        <p className="mt-8 font-mono text-xs tracking-wide text-muted-foreground/80">
          BONDING-CURVE FAIR LAUNCHES · INSTANT LIQUIDITY · 1,000 TON GRADUATION
        </p>
      </div>
    </section>
  );
}

function StatBand() {
  const stats = [
    { value: String(TOKENS.length), label: "Tokens found" },
    { value: "Mainnet", label: "Network" },
    { value: "1,000 TON", label: "Graduation target" },
  ];
  return (
    <div className="grid overflow-hidden rounded-2xl border border-border/70 bg-card/60 sm:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`px-6 py-6 text-center ${i > 0 ? "border-t border-border/60 sm:border-l sm:border-t-0" : ""}`}
        >
          <p className="font-display text-2xl font-bold tracking-tight">{s.value}</p>
          <p className="micro-label mt-1.5 text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Discover() {
  return (
    <section id="discover" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Discover Tokens</h2>
          <p className="mt-2 text-muted-foreground">
            Find and trade the latest meme tokens on TON.
          </p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
        >
          <Plus className="size-4" />
          Create Token
        </Link>
      </div>

      <div className="mt-8">
        <StatBand />
      </div>

      <p className="micro-label mt-10 text-muted-foreground">
        Live on Oton ({TOKENS.length} tokens)
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOKENS.map((token) => (
          <TokenCard key={token.symbol} token={token} />
        ))}
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 px-8 py-14 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 50% 120%, oklch(0.55 0.15 258 / 0.25), transparent 70%)",
          }}
        />
        <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to{" "}
          <span className="font-serif font-normal italic text-gradient-blue">launch?</span>
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
          Deploy your token on the bonding curve in one transaction.
        </p>
        <Link
          to="/create"
          className="btn-gradient relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/70 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          Launch a Token
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Discover />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
