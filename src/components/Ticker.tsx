import { pages } from "@/data/services";

/** Thin brand ticker between sections: everything we coordinate, endlessly. */
export function Ticker({ dark = true }: { dark?: boolean }) {
  const items = pages.map((p) => p.name);
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y ${dark ? "border-white/10 bg-navy-900 text-white/70" : "border-line bg-white text-slate"}`} aria-hidden="true">
      <div className="marquee flex w-max gap-10 py-3 [animation-duration:60s]">
        {row.map((t, i) => (
          <span key={i} className="display-md flex shrink-0 items-center gap-10 text-[15px] tracking-wider">
            {t}<span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
