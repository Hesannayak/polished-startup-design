import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Loader2, Rocket } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { BASE_FEE_TON } from "@/data/tokens";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Token · Oton" },
      {
        name: "description",
        content:
          "Launch your token on the Oton bonding curve in one transaction. Fair launch, instant liquidity.",
      },
      { property: "og:title", content: "Create Token · Oton" },
      {
        property: "og:description",
        content: "Launch your token on the Oton bonding curve in one transaction.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatePage,
});

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="micro-label mb-2 block text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border/60 pb-3">
      <h2 className="micro-label text-foreground/80">{children}</h2>
    </div>
  );
}

function CreatePage() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");
  const [autoBuy, setAutoBuy] = useState(true);
  const [autoBuyAmount, setAutoBuyAmount] = useState("0.9");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const autoBuyValue = Number.parseFloat(autoBuyAmount) || 0;
  const total = BASE_FEE_TON + (autoBuy ? autoBuyValue : 0);

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-16 pt-28">
        <h1 className="font-display text-4xl font-bold tracking-tight">Create Token</h1>
        <p className="mt-2.5 text-muted-foreground">
          Launch your token on the bonding curve in one transaction.
        </p>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-9">
          <section className="flex flex-col gap-6">
            <SectionTitle>Token info</SectionTitle>
            <Field label="Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Token"
                className={inputClass}
                maxLength={32}
              />
            </Field>
            <Field label="Symbol">
              <input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase().slice(0, 10))}
                placeholder="MTK"
                className={`${inputClass} font-mono uppercase`}
              />
            </Field>
            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's your token about?"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Token image">
              <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
              {imageUrl ? (
                <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-background/60 p-4">
                  <img src={imageUrl} alt="Token preview" className="size-16 rounded-lg object-cover" />
                  <div className="text-sm">
                    <p className="font-medium">Image ready</p>
                    <button
                      type="button"
                      onClick={() => {
                        setImageUrl(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border/70 bg-background/40 px-6 py-10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ImagePlus className="size-6" />
                  <span className="text-sm">Drop image here or click to upload</span>
                  <span className="font-mono text-[11px] text-muted-foreground/70">
                    PNG, JPG, GIF, WEBP — max 5MB
                  </span>
                </button>
              )}
            </Field>
          </section>

          <section className="flex flex-col gap-6">
            <SectionTitle>Social links</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Twitter">
                <input
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="https://x.com/…"
                  className={inputClass}
                />
              </Field>
              <Field label="Telegram">
                <input
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="https://t.me/…"
                  className={inputClass}
                />
              </Field>
              <Field label="Website">
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://…"
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <SectionTitle>Launch options</SectionTitle>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={autoBuy}
                onChange={(e) => setAutoBuy(e.target.checked)}
                className="size-4 rounded accent-[var(--primary)]"
              />
              Auto-buy on creation
            </label>
            {autoBuy ? (
              <Field label="Auto-buy amount (TON) — max 3 TON">
                <input
                  value={autoBuyAmount}
                  onChange={(e) => setAutoBuyAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                  className={`${inputClass} font-mono`}
                />
              </Field>
            ) : null}

            <div className="rounded-2xl border border-border/70 bg-card/60 p-5">
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Base Fee (Deploy + Gas)</span>
                <span className="font-mono font-medium">1.0 TON</span>
              </div>
              {autoBuy ? (
                <div className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-muted-foreground">Auto-buy Amount</span>
                  <span className="font-mono font-medium">{autoBuyValue.toFixed(1)} TON</span>
                </div>
              ) : null}
              <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
                <span className="font-medium">Total</span>
                <span className="font-mono font-semibold text-primary">{total.toFixed(1)} TON</span>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gradient inline-flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/70 transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Preparing launch…
              </>
            ) : (
              <>
                <Rocket className="size-4" />
                Launch Token
              </>
            )}
          </button>
          <p className="-mt-4 text-center text-xs text-muted-foreground">
            You&apos;ll connect your TON wallet to sign the launch transaction.
          </p>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
