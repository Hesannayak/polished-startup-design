import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Create", to: "/create" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Docs", to: "/docs" },
] as const;

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="X (Twitter)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TonDiamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5 3.5 9.2c-.4.3-.4.9 0 1.2l8.1 10.6c.2.3.6.3.8 0l8.1-10.6c.4-.3.4-.9 0-1.2L12 2.5Zm0 3.1 5.4 4.2c.3.2.3.6 0 .8L12 19.9 6.6 10.6c-.2-.2-.2-.6 0-.8L12 5.6Z" />
    </svg>
  );
}

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="btn-gradient flex size-8 items-center justify-center rounded-lg shadow-[0_0_18px_-4px] shadow-primary/60 transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="size-4.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M17.5 8.5a6.5 6.5 0 1 0 0 7" />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Oton</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Oton on X"
            className="ml-1 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <XLogo className="size-4" />
          </a>
          <button
            type="button"
            className="btn-gradient ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary/70 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            <TonDiamond className="size-4" />
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="btn-gradient flex size-7 items-center justify-center rounded-lg">
            <svg viewBox="0 0 24 24" className="size-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M17.5 8.5a6.5 6.5 0 1 0 0 7" />
            </svg>
          </span>
          <div>
            <p className="font-display text-sm font-semibold">Oton</p>
            <p className="text-xs text-muted-foreground">Launchpad on TON blockchain</p>
          </div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/create" className="transition-colors hover:text-foreground">Create</Link>
          <Link to="/portfolio" className="transition-colors hover:text-foreground">Portfolio</Link>
          <Link to="/docs" className="transition-colors hover:text-foreground">Docs</Link>
          <span className="text-xs">© 2026 Oton</span>
        </nav>
      </div>
    </footer>
  );
}
