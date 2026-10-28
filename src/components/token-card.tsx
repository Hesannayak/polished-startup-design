import { Link } from "@tanstack/react-router";
import type { Token } from "@/data/tokens";
import { cn } from "@/lib/utils";

export function TokenAvatar({
  symbol,
  className,
  size = "md",
}: {
  symbol: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={cn(
        "btn-gradient relative flex shrink-0 items-center justify-center rounded-xl font-display font-bold text-primary-foreground",
        "shadow-[0_0_28px_-8px] shadow-primary/60",
        size === "md" ? "size-12 text-xl" : "size-16 text-3xl",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent opacity-60" />
      <span className="relative">{symbol.charAt(0)}</span>
    </span>
  );
}

export function TokenCard({ token }: { token: Token }) {
  return (
    <Link
      to="/token/$symbol"
      params={{ symbol: token.symbol }}
      className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_-16px] hover:shadow-primary/25"
    >
      <div className="flex items-center gap-4">
        <TokenAvatar symbol={token.symbol} />
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="truncate font-display text-base font-semibold">{token.name}</h3>
            <span className="font-mono text-xs text-muted-foreground">${token.symbol}</span>
          </div>
          <p className="mt-1 font-mono text-sm font-medium text-success">{token.marketCap} MC</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-border/60 pt-4 font-mono text-[11px] text-muted-foreground">
        <span>{token.addressShort}</span>
        <span className="text-border">·</span>
        <span>{token.createdAgo}</span>
        <span className="ml-auto font-sans text-xs text-foreground/0 transition-colors duration-300 group-hover:text-primary">
          Trade →
        </span>
      </div>

      {token.description ? (
        <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{token.description}</p>
      ) : null}
    </Link>
  );
}
