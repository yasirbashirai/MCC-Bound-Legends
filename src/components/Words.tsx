/** Splits a headline into staggered animated words. Server-safe. */
export function Words({ text, start = 0, step = 70, className = "" }: { text: string; start?: number; step?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className={`word ${className}`}><span style={{ ["--d" as string]: `${start + i * step}ms` }}>{w}</span></span>
      ))}
    </>
  );
}
