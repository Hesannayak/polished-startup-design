import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { PriceChart } from "@/components/price-chart";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { TokenAvatar } from "@/components/token-card";
import type { Token } from "@/data/tokens";
import { TOKENS } from "@/data/tokens";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/token/$symbol")({
  beforeLoad: ({ params }) => {
    const token = TOKENS.find((t) => t.symbol === params.symbol);
    if (!token) throw notFound();
    return { token };
  },
  head: ({ match }) => {
    const token: Token = match.context.token;
    return {
      meta: [
        { title: `${token.name} ($${token.symbol}) · Oton` },
        {
          name: "description",
          content: `Trade $${token.symbol} on the Oton bonding curve. Market cap ${token.marketCap}, ${token.holders} holders.`,
        },
        { property: "og:title", content: `${token.name} ($${token.symbol}) · Oton` },
        {
          property: "og:description",
          content: `Trade $${token.symbol} on the Oton bonding curve. Market cap ${token.marketCap}.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TokenPage,
});

function HeaderStats({ token }: { token: Token }) {
  const stats = [
    { label: "Market cap", value: token.marketCap },
    { label: "Price", value: token.price },
    { label: "Holders", value: String(token.holders) },
    { label: "Reserve", value: token.reserve },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="micro-label text-muted-foreground">{s.label}</p>
          <p className="mt-1.5 font-mono text-sm font-semibold text-foreground">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Copy token address"
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
    </button>
  );
}

function ChartCard({ token }: { token: Token }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-3.5">
        <span className="micro-label text-muted-foreground">Price</span>
        <span className="font-mono text-xs text-muted-foreground">1D · ${token.symbol}</span>
      </div>
      <div className="px-2 py-4">
        <PriceChart data={token.priceHistory} />
      </div>
    </div>
  );
}

function Tabs({ token }: { token: Token }) {
  const [tab, setTab] = useState<"activity" | "holders">("activity");

  const rows: { id: string; cells: ReactNode[] }[] =
    tab === "activity"
      ? token.activity.map((a) => ({
          id: `${a.amount}-${a.time}`,
          cells: [
            <span
              key="t"
              className={cn(
                "rounded-md px-2 py-1 font-mono text-[11px] font-semibold",
                a.type === "BUY"
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {a.type}
            </span>,
            <span key="a" className="font-mono text-xs text-foreground">{a.amount}</span>,
            <span key="ac" className="font-mono text-xs text-muted-foreground">{a.account}</span>,
            <span key="ti" className="text-xs text-muted-foreground">{a.time}</span>,
            <ArrowUpRight key="ar" className="size-3.5 text-muted-foreground" />,
          ],
        }))
      : token.holdersList.map((h) => ({
          id: h.account,
          cells: [
            <span key="ac" className="font-mono text-xs text-foreground">{h.account}</span>,
            <span key="am" className="font-mono text-xs text-muted-foreground">{h.amount}</span>,
            <span key="sh" className="font-mono text-xs font-semibold text-primary">{h.share}</span>,
          ],
        }));

  return (
    <div className="rounded-2xl border border-border/70 bg-card">
      <div className="flex gap-1 border-b border-border/60 p-1.5">
        {(
          [
            ["activity", `Activity (${token.activity.length})`],
            ["holders", `Holders (${token.holders})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-sm transition-colors duration-200",
              tab === key
                ? "bg-secondary font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <table className="w-full">
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/40 last:border-b-0">
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-5 py-3.5",
                    i === 0 && "w-[110px]",
                    i === row.cells.length - 1 && "text-right",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TradePanel({ symbol }: { symbol: string }) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("5");

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-background/60 p-1">
        {(["buy", "sell"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={cn(
              "rounded-lg py-2 text-sm font-medium capitalize transition-all duration-200",
              side === s
                ? s === "buy"
                  ? "btn-gradient text-primary-foreground shadow-[0_0_20px_-6px] shadow-primary/70"
                  : "bg-destructive text-destructive-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="micro-label mt-5 block text-muted-foreground">Amount (TON)</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
        inputMode="decimal"
        placeholder="0.00"
        className="mt-2 w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 font-mono text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
      <div className="mt-2.5 flex gap-2">
        {["1", "5", "10", "50"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setAmount(v)}
            className="flex-1 rounded-lg border border-border/70 bg-background/40 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {v} TON
          </button>
        ))}
      </div>

      <label className="micro-label mt-6 block text-muted-foreground">Slippage tolerance</label>
      <div className="mt-2 flex gap-2">
        {["1", "5", "10"].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setSlippage(v)}
            className={cn(
              "flex-1 rounded-lg border py-2 font-mono text-xs transition-colors",
              slippage === v
                ? "border-primary/60 bg-primary/10 text-primary"
                : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {v}%
          </button>
        ))}
        <input
          value={slippage}
          onChange={(e) => setSlippage(e.target.value.replace(/[^0-9.]/g, ""))}
          inputMode="decimal"
          className="w-20 rounded-lg border border-border/70 bg-background/40 px-3 py-2 text-center font-mono text-xs outline-none focus:border-primary/50"
          aria-label="Custom slippage"
        />
      </div>

      <button
        type="button"
        className="btn-gradient mt-6 w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground opacity-80 transition-all duration-200 hover:opacity-100"
      >
        Connect Wallet
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Connect a TON wallet to {side === "buy" ? "buy" : "sell"} ${symbol}
      </p>
    </div>
  );
}

function BondingCurveCard({ token }: { token: Token }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Bonding Curve</h3>
        <span className="font-mono text-sm font-semibold text-primary">{token.curvePct}</span>
      </div>
      <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-background/70">
        <div
          className="btn-gradient h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(token.curveProgress * 100, 2)}%` }}
        />
      </div>
      <p className="mt-2.5 font-mono text-xs text-muted-foreground">
        {token.reserve.replace(" TON", "")} / 1000 TON
      </p>
    </div>
  );
}

function TokenPage() {
  const { token } = Route.useRouteContext();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-16 pt-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <TokenAvatar symbol={token.symbol} size="lg" />
            <div>
              <div className="flex items-baseline gap-2.5">
                <h1 className="font-display text-2xl font-bold tracking-tight">{token.name}</h1>
                <span className="font-mono text-sm text-muted-foreground">${token.symbol}</span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                {token.addressFull.slice(0, 8)}…{token.addressFull.slice(-4)}
                <CopyButton value={token.addressFull} />
              </p>
            </div>
          </div>
          <HeaderStats token={token} />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-4">
            <ChartCard token={token} />
            <Tabs token={token} />
          </div>
          <div className="flex flex-col gap-4">
            <TradePanel symbol={token.symbol} />
            <BondingCurveCard token={token} />
            <div className="rounded-2xl border border-border/70 bg-card p-5">
              <h3 className="text-sm font-semibold">About {token.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {token.description}
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
