/**
 * Stylised dot-matrix map of the contiguous US with animated routes radiating
 * from Florida. Pure SVG, no library, ~6KB. Communicates "Florida based,
 * nationwide reach" without a single stock photo.
 */
// Land extents per degree of latitude (row = 49 - lat, col = lon + 125), contiguous US.
const ROWS: [number, number][][] = [
  [[2, 30]],                     // 49N
  [[1, 36], [57, 58]],           // 48N
  [[1, 37], [55, 58]],           // 47N
  [[1, 41], [51, 58]],           // 46N
  [[1, 41], [49, 58]],           // 45N
  [[1, 42], [48, 57]],           // 44N
  [[1, 43], [46, 55]],           // 43N
  [[1, 54]],                     // 42N
  [[1, 55]],                     // 41N
  [[1, 51]],                     // 40N
  [[2, 50]],                     // 39N
  [[2, 50]],                     // 38N
  [[3, 49]],                     // 37N
  [[4, 49]],                     // 36N
  [[5, 49]],                     // 35N
  [[5, 47]],                     // 34N
  [[7, 46]],                     // 33N
  [[8, 44]],                     // 32N
  [[14, 17], [19, 44]],          // 31N
  [[21, 43]],                    // 30N
  [[21, 30], [34, 36], [42, 44]],// 29N
  [[22, 28], [42, 45]],          // 28N
  [[25, 27], [43, 46]],          // 27N
  [[26, 28], [43, 46]],          // 26N
  [[44, 46]],                    // 25N
  [[43, 45]],                    // 24.5N Keys
];
const MASK = ROWS.map((ranges) => {
  const row = Array(60).fill(" ");
  ranges.forEach(([a, b]) => { for (let c = a; c <= b; c++) row[c] = "#"; });
  return row.join("");
});
const CELL = 14;
const W = MASK[0].length * CELL;
const H = MASK.length * CELL;
const pt = (c: number, r: number) => [c * CELL + CELL / 2, r * CELL + CELL / 2] as const;

// [col,row,label]
const geo = (lon: number, lat: number) => pt(lon + 125, 49 - lat);
const FL = geo(-81.4, 28.7); // Altamonte Springs
const markets: [number, number, string][] = ([
  [-74.0, 40.7, "New York"], [-74.8, 39.9, "New Jersey"], [-71.1, 42.4, "Massachusetts"], [-76.9, 40.3, "Pennsylvania"],
  [-80.8, 35.2, "North Carolina"], [-81.0, 34.0, "South Carolina"], [-84.4, 33.7, "Georgia"], [-96.8, 32.8, "Texas"],
  [-118.2, 34.0, "California"], [-83.0, 42.3, "Michigan"], [-87.6, 41.9, "Illinois"], [-112.0, 33.4, "Arizona"], [-105.0, 39.7, "Colorado"],
] as [number, number, string][]).map(([lon, lat, n]) => [lon + 125, 49 - lat, n]);

export function UsaMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Map of the United States showing nationwide coverage from Florida">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f97316" stopOpacity=".9" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></radialGradient>
      </defs>
      {MASK.map((row, r) =>
        [...row].map((ch, c) =>
          ch === "#" ? <circle key={`${r}-${c}`} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={3.2} fill="currentColor" opacity=".28" /> : null
        )
      )}
      {/* Routes from Florida */}
      {markets.map(([c, r, label]) => {
        const [x, y] = pt(c, r);
        const mx = (FL[0] + x) / 2, my = Math.min(FL[1], y) - Math.abs(FL[0] - x) * 0.18 - 14;
        return <path key={label} d={`M${FL[0]},${FL[1]} Q${mx},${my} ${x},${y}`} fill="none" stroke="#0ea5e9" strokeWidth="1.4" strokeOpacity=".7" className="route-line" />;
      })}
      {markets.map(([c, r, label]) => {
        const [x, y] = pt(c, r);
        return (
          <g key={label}>
            <circle cx={x} cy={y} r={7} fill="#0ea5e9" opacity=".25" className="pulse-dot" />
            <circle cx={x} cy={y} r={3.5} fill="#38bdf8" />
            <title>{label}</title>
          </g>
        );
      })}
      {/* Florida HQ */}
      <circle cx={FL[0]} cy={FL[1]} r={26} fill="url(#glow)" />
      <circle cx={FL[0]} cy={FL[1]} r={6} fill="#f97316" stroke="#fff" strokeWidth="2" />
      <text x={FL[0] - 14} y={FL[1] + 22} textAnchor="end" fill="currentColor" fontSize="12" fontWeight="700" letterSpacing=".08em">ALTAMONTE SPRINGS, FL · HQ</text>
    </svg>
  );
}
