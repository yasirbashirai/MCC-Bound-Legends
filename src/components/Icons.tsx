import type { IconKey } from "@/data/services";

/**
 * Vehicle silhouettes drawn in the same flat-silhouette language as the MCC logo
 * (truck hauling boat + car + SUV). All on a 64x40 viewBox, currentColor fill,
 * so they inherit brand blue / navy / white from context.
 */
const V: Record<IconKey, React.ReactNode> = {
  car: (
    <>
      <path d="M8 26c-2 0-3-1-3-3v-4l6-3 6-8h20l9 8 9 2c2 .5 3 2 3 4v4c0 1.5-1 3-3 3H8z" />
      <path d="M20 10l-4 6h12v-6zm10 0v6h13l-6-6z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <circle cx="16" cy="28" r="5" /><circle cx="48" cy="28" r="5" />
      <circle cx="16" cy="28" r="2" fill="var(--icon-bg,#fff)" /><circle cx="48" cy="28" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  truck: (
    <>
      <path d="M2 8h34v20H2zM36 14h12l10 8v6H36z" />
      <path d="M40 17v5h12l-6-5z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <circle cx="12" cy="30" r="5" /><circle cx="26" cy="30" r="5" /><circle cx="50" cy="30" r="5" />
      <circle cx="12" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="26" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="50" cy="30" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  boat: (
    <>
      <path d="M4 24h56l-6 8H12z" />
      <path d="M14 22c0-6 6-11 16-11h10l4 4 8 2-2 5H14z" />
      <path d="M30 6h2v6h-2z" />
      <path d="M22 16h10v3H22z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M2 36c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2v3H2z" opacity=".55" />
    </>
  ),
  rv: (
    <>
      <path d="M3 10c0-2 1-3 3-3h40l14 10v10c0 2-1 3-3 3H3z" />
      <path d="M8 11h10v8H8zM22 11h10v8H22zM36 11h8v8h-8zM47 12v7h9z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <circle cx="15" cy="30" r="5" /><circle cx="46" cy="30" r="5" />
      <circle cx="15" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="46" cy="30" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  motorcycle: (
    <>
      <circle cx="13" cy="28" r="9" /><circle cx="51" cy="28" r="9" />
      <circle cx="13" cy="28" r="5" fill="var(--icon-bg,#fff)" /><circle cx="51" cy="28" r="5" fill="var(--icon-bg,#fff)" />
      <path d="M13 28l10-12h12l6 6h5l5 6h-8l-4-4H26l-4 6h-6z" />
      <path d="M36 12l4-4h6l2 4z" /><path d="M18 14h10l-2 3h-9z" />
    </>
  ),
  excavator: (
    <>
      <path d="M4 30h34v6H4z" /><path d="M8 24h26v6H8z" opacity=".8" />
      <path d="M10 12h16v12H10z" /><path d="M13 14h8v6h-8z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M26 16l18-10 4 3-14 12-8-2z" /><path d="M44 6l12 10-3 10-6-2 3-7-9-7z" />
      <path d="M50 24l8 2-2 8-10-2z" />
      <circle cx="10" cy="33" r="2.5" fill="var(--icon-bg,#fff)" /><circle cx="21" cy="33" r="2.5" fill="var(--icon-bg,#fff)" /><circle cx="32" cy="33" r="2.5" fill="var(--icon-bg,#fff)" />
    </>
  ),
  industrial: (
    <>
      <path d="M4 34V14l10 6v-6l10 6v-6l10 6V8h14v26z" />
      <path d="M40 12h6v4h-6zM40 20h6v4h-6zM40 28h6v4h-6zM26 24h6v6h-6zM14 24h6v6h-6z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M52 4h4v8h-4z" /><path d="M2 34h60v3H2z" opacity=".55" />
    </>
  ),
  boxtruck: (
    <>
      <path d="M2 6h38v22H2zM42 14h10l8 8v6H42z" />
      <path d="M45 17v5h9l-5-5z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M8 12h26v2H8zM8 17h26v2H8z" fill="var(--icon-bg,#fff)" opacity=".35" />
      <circle cx="12" cy="30" r="5" /><circle cx="50" cy="30" r="5" />
      <circle cx="12" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="50" cy="30" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  semi: (
    <>
      <path d="M18 8h20v20H18zM38 14h12l10 8v6H38z" />
      <path d="M42 17v5h11l-6-5z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M22 12h12v6H22z" fill="var(--icon-bg,#fff)" opacity=".5" />
      <path d="M4 26h14v3H4z" />
      <circle cx="22" cy="30" r="5" /><circle cx="32" cy="30" r="5" /><circle cx="50" cy="30" r="5" />
      <circle cx="22" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="32" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="50" cy="30" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  fleet: (
    <>
      <path d="M2 14h14l4-6h8l6 6h4v10H2z" opacity=".55" /><circle cx="9" cy="26" r="3.5" opacity=".55" /><circle cx="29" cy="26" r="3.5" opacity=".55" />
      <path d="M24 20h14l4-6h8l6 6h4v10H24z" /><circle cx="31" cy="32" r="3.5" /><circle cx="53" cy="32" r="3.5" />
      <circle cx="31" cy="32" r="1.5" fill="var(--icon-bg,#fff)" /><circle cx="53" cy="32" r="1.5" fill="var(--icon-bg,#fff)" />
    </>
  ),
  enclosed: (
    <>
      <path d="M2 6h44v24H2zM46 14h8l8 8v8H46z" />
      <path d="M49 17v5h9l-5-5z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M10 14c0-1 1-2 2-2h6l3-4h10l4 4h4v8H10z" fill="var(--icon-bg,#fff)" opacity=".85" />
      <circle cx="12" cy="32" r="5" /><circle cx="52" cy="32" r="5" />
      <circle cx="12" cy="32" r="2" fill="var(--icon-bg,#fff)" /><circle cx="52" cy="32" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  nonrunning: (
    <>
      <path d="M2 30l40-6V14l16-2 4 8v10H2z" />
      <path d="M22 21c2-4 5-7 10-7h8l6 5-8 1-16 3z" opacity=".75" />
      <circle cx="12" cy="32" r="4" /><circle cx="52" cy="32" r="4" />
      <circle cx="12" cy="32" r="1.5" fill="var(--icon-bg,#fff)" /><circle cx="52" cy="32" r="1.5" fill="var(--icon-bg,#fff)" />
      <path d="M4 6l6 6M10 6l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ),
  auction: (
    <>
      <path d="M12 30l14-14 6 6-14 14zM24 10l10 10-4 4-10-10z" />
      <path d="M30 4l10 10-4 4L26 8z" />
      <path d="M40 26h12l6 4v6H40z" /><circle cx="46" cy="36" r="3" /><circle cx="56" cy="36" r="3" />
      <path d="M4 34h20v3H4z" />
    </>
  ),
  yacht: (
    <>
      <path d="M2 26h60l-8 8H10z" />
      <path d="M12 24c0-5 4-9 10-9h6V8h12l4 7 10 3-2 6H12z" />
      <path d="M30 17h12v3H30zM18 18h8v3h-8z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M40 4h2v11h-2z" />
      <path d="M2 38c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2v2H2z" opacity=".55" />
    </>
  ),
  skidsteer: (
    <>
      <path d="M8 16h22l4 8h-8v6H8z" /><path d="M12 18h8v6h-8z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M30 14l16 4v10H34l-4-8z" /><path d="M46 20l12-6v16H46z" />
      <path d="M6 30h30v4H6z" opacity=".8" />
      <circle cx="13" cy="32" r="5" /><circle cx="29" cy="32" r="5" />
      <circle cx="13" cy="32" r="2" fill="var(--icon-bg,#fff)" /><circle cx="29" cy="32" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  bulldozer: (
    <>
      <path d="M12 22h22V10h-8l-6 8H12z" /><path d="M22 12h4v6h-4z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M34 20h12v4H34z" /><path d="M46 12h6c3 0 4 2 4 4v12h-10z" />
      <path d="M8 26h32c3 0 4 2 4 4v4H6v-4c0-2 1-4 2-4z" />
      <circle cx="12" cy="31" r="2.5" fill="var(--icon-bg,#fff)" /><circle cx="24" cy="31" r="2.5" fill="var(--icon-bg,#fff)" /><circle cx="36" cy="31" r="2.5" fill="var(--icon-bg,#fff)" />
    </>
  ),
  forklift: (
    <>
      <path d="M8 14h18l6 10v8H8z" /><path d="M12 16h10v6H12z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M26 6h2v20h-2zM32 6h2v22h-2z" opacity=".8" /><path d="M32 8h4v4h-4z" />
      <path d="M32 26h14v4H32z" /><path d="M36 14h10v10H36z" opacity=".55" />
      <circle cx="14" cy="33" r="4.5" /><circle cx="28" cy="33" r="4.5" />
      <circle cx="14" cy="33" r="1.8" fill="var(--icon-bg,#fff)" /><circle cx="28" cy="33" r="1.8" fill="var(--icon-bg,#fff)" />
    </>
  ),
  worktruck: (
    <>
      <path d="M2 12h28v16H2zM32 16h12l10 6v6H32z" />
      <path d="M36 19v4h11l-5-4z" fill="var(--icon-bg,#fff)" opacity=".9" />
      <path d="M6 6h14l4 6H6z" /><path d="M20 4l20 4v3L20 8z" opacity=".7" />
      <path d="M6 16h20v2H6zM6 21h20v2H6z" fill="var(--icon-bg,#fff)" opacity=".35" />
      <circle cx="12" cy="30" r="5" /><circle cx="48" cy="30" r="5" />
      <circle cx="12" cy="30" r="2" fill="var(--icon-bg,#fff)" /><circle cx="48" cy="30" r="2" fill="var(--icon-bg,#fff)" />
    </>
  ),
  boatlift: (
    <>
      <path d="M6 4h4v28H6zM54 4h4v28h-4zM6 4h52v4H6z" />
      <path d="M30 8h4v6h-4z" />
      <path d="M14 22h36l-4 8H18z" /><path d="M20 20c0-4 4-7 10-7h8l3 3 6 1-1 3z" />
      <path d="M2 36c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2 4 2 8 2 4-2 8-2v2H2z" opacity=".55" />
    </>
  ),
};

export function VehicleIcon({ name, className = "" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} fill="currentColor" aria-hidden="true">
      {V[name]}
    </svg>
  );
}

/* ── UI glyphs (stroke) ────────────────────────────────────────────────── */
type P = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Phone = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const Arrow = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.5} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Check = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={3} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
);
export const Shield = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 9.4-8 11-4.5-1.6-8-6-8-11V5z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const Pin = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Clock = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Star = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.5l-6 3.3 1.3-6.7-5-4.6 6.8-.8z" /></svg>
);
export const Users = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.5a5 5 0 0 1 5.5 5" /></svg>
);
export const Chat = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
);
export const Route = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="6" r="2.5" /><path d="M7.5 18H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6.5" /></svg>
);
export const Ruler = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M3 17l14-14 4 4L7 21z" /><path d="M7 13l2 2M10 10l2 2M13 7l2 2" /></svg>
);
export const Doc = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><path d="M6 2h8l5 5v15H6z" /><path d="M14 2v5h5M9 13h6M9 17h6" /></svg>
);
export const Menu = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.5} aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const X = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.5} aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Chevron = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2.5} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);
export const Mail = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Lock = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const Bolt = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
);

/* Social */
export const Facebook = ({ className = "" }: P) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.7-4.5 4.5V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z" /></svg>);
export const Instagram = ({ className = "" }: P) => (<svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>);
export const TikTok = ({ className = "" }: P) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2.3 1.7 3.8 4 4v3.3c-1.5 0-2.9-.5-4-1.3v6.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.4a2.4 2.4 0 1 0 1.5 2.2V3h3.3z" /></svg>);
export const YouTube = ({ className = "" }: P) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M22 8.2c-.2-1.5-1-2.4-2.5-2.6C17.5 5.3 12 5.3 12 5.3s-5.5 0-7.5.3C3 5.8 2.2 6.7 2 8.2 1.8 9.7 1.8 12 1.8 12s0 2.3.2 3.8c.2 1.5 1 2.4 2.5 2.6 2 .3 7.5.3 7.5.3s5.5 0 7.5-.3c1.5-.2 2.3-1.1 2.5-2.6.2-1.5.2-3.8.2-3.8s0-2.3-.2-3.8zM10 15V9l5.2 3z" /></svg>);

/* ── Header / boat-hero glyphs (client header + hero references, 2026-09-19) ── */
/** Delivery truck with motion lines. */
export const Truck = ({ className = "" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...stroke} aria-hidden="true">
    <path d="M9 9h12v13H9zM21 13h5l3 4v5h-8z" /><circle cx="13" cy="24" r="2.5" /><circle cx="24" cy="24" r="2.5" />
    <path d="M2 12h5M3 16h4M4 20h3" strokeWidth="1.6" />
  </svg>
);
/** Solid delivery truck (used small in the top bar). */
export const TruckSolid = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M20 8h-3V4H3a2 2 0 0 0-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM7 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM17 12V9.5h2.5l2 2.5H17z" /></svg>
);
/** Simplified contiguous USA silhouette. */
export const Usa = ({ className = "" }: P) => (
  <svg viewBox="0 0 64 40" className={className} fill="currentColor" aria-hidden="true">
    <path d="M3 9l2-3 12 1 8-2 10 1 8-3 8 2 5-2 4 3-1 6 2 5-3 5-3 4-2 6 3 6-4 1-3-6-3-4-6-1-5 3-6-1-4 3-4 4-4-4-1-6-4-4-4-1-2-6z" />
  </svg>
);
/** Group of people (Vetted Carriers). */
export const Group = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6.5" r="3" /><circle cx="5" cy="8.5" r="2.3" /><circle cx="19" cy="8.5" r="2.3" />
    <path d="M12 11c-3 0-5.5 2-5.5 4.5V18h11v-2.5C17.5 13 15 11 12 11zM5 12.5c-2.2 0-4 1.4-4 3.2V17h4.3v-1.5c0-1.2.5-2.3 1.3-3.2A4.5 4.5 0 0 0 5 12.5zm14 0c-.6 0-1.1.1-1.6.3.8.9 1.3 2 1.3 3.2V17H23v-1.3c0-1.8-1.8-3.2-4-3.2z" />
  </svg>
);
/** Headset (Real People, Real Support). */
export const Headset = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a8 8 0 0 0-8 8v6a3 3 0 0 0 3 3h1v-7H6v-2a6 6 0 0 1 12 0v2h-2v7h1.2A3 3 0 0 0 20 16.5V10a8 8 0 0 0-8-8z" /><path d="M14 19.5h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z" />
  </svg>
);
/** Snowflake (Snowbird Season Specialists). */
export const Snowflake = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" /><path d="M12 2l-2.5 2.5M12 2l2.5 2.5M12 22l-2.5-2.5M12 22l2.5-2.5M2 12l2.5-2.5M2 12l2.5 2.5M22 12l-2.5-2.5M22 12l-2.5 2.5" />
  </svg>
);
/** Sun (Florida Destinations). */
export const Sun = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" fill="currentColor" /><g {...stroke} strokeWidth={2}><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></g>
  </svg>
);
/** Speedboat outline (All Boat Types & Sizes). */
export const Boat = ({ className = "" }: P) => (
  <svg viewBox="0 0 40 24" className={className} {...stroke} strokeWidth={1.8} aria-hidden="true">
    <path d="M3 14h33l-5 6H8z" /><path d="M9 14c0-3 3-6 8-6h6l3 2 5 1-1 3" /><path d="M20 8V4h2" /><path d="M2 22c2 0 2-1.5 4-1.5S8 22 10 22s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" opacity=".7" />
  </svg>
);
/** Small wave glyph (Coast to Coast callout). */
export const Waves = ({ className = "" }: P) => (
  <svg viewBox="0 0 40 12" className={className} {...stroke} strokeWidth={2} aria-hidden="true"><path d="M2 4c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2M2 10c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2" /></svg>
);
/** Chain link (Quick Links accordion). */
export const LinkIcon = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
/** Gear (What We Coordinate accordion). */
export const Gear = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9.4 5.2l-2-.4a7.7 7.7 0 0 0 0-1.6l2-.4.2-.2-.8-3-.3-.1-1.9.7a7.6 7.6 0 0 0-1.1-1.1l.7-1.9-.1-.3-3-.8-.2.2-.4 2a7.7 7.7 0 0 0-1.6 0l-.4-2-.2-.2-3 .8-.1.3.7 1.9a7.6 7.6 0 0 0-1.1 1.1l-1.9-.7-.3.1-.8 3 .2.2 2 .4a7.7 7.7 0 0 0 0 1.6l-2 .4-.2.2.8 3 .3.1 1.9-.7a7.6 7.6 0 0 0 1.1 1.1l-.7 1.9.1.3 3 .8.2-.2.4-2a7.7 7.7 0 0 0 1.6 0l.4 2 .2.2 3-.8.1-.3-.7-1.9a7.6 7.6 0 0 0 1.1-1.1l1.9.7.3-.1.8-3-.2-.2zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
  </svg>
);
/** Small US flag. */
export const Flag = ({ className = "" }: P) => (
  <svg viewBox="0 0 34 22" className={className} aria-hidden="true">
    {Array.from({ length: 13 }).map((_, i) => <rect key={i} x="0" y={i * (22 / 13)} width="34" height={22 / 13 + 0.2} fill={i % 2 ? "#fff" : "#b22234"} />)}
    <rect x="0" y="0" width="14" height="11.9" fill="#3c3b6e" />
    {Array.from({ length: 15 }).map((_, i) => <circle key={i} cx={2 + (i % 5) * 2.6} cy={2 + Math.floor(i / 5) * 3.6} r=".7" fill="#fff" />)}
  </svg>
);
