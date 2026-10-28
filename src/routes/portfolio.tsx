import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · Oton" },
      {
        name: "description",
        content: "Your Oton holdings, created tokens and trading activity on TON.",
      },
      { property: "og:title", content: "Portfolio · Oton" },
      {
        property: "og:description",
        content: "Your Oton holdings, created tokens and trading activity on TON.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Portfolio</h1>
        <p className="mt-2.5 text-muted-foreground">Your holdings, launches and activity.</p>

        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border/70 bg-card/40 px-8 py-20 text-center">
          <span className="btn-gradient flex size-14 items-center justify-center rounded-2xl shadow-[0_0_30px_-8px] shadow-primary/60">
            <Wallet className="size-6 text-primary-foreground" />
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold">Connect your wallet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Connect a TON wallet to see your tokens, created launches and trading history.
          </p>
          <button
            type="button"
            className="btn-gradient mt-7 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Connect Wallet
          </button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
