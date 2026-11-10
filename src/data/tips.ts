/**
 * Auto Transport Tips hub (Milestone 2). One entry = one article at /auto-transport-tips/<slug>/.
 * Hub, routing, sitemap and schema all read from this list.
 */
export type TipSection = { h: string; p?: string[]; list?: string[] };
export type Tip = {
  slug: string;
  title: string;        // H1
  metaTitle: string;    // <title>, < 60 chars
  description: string;  // meta description, < 160 chars
  excerpt: string;      // hub card text
  readMins: number;
  date: string;         // ISO publish date
  sections: TipSection[];
  related: string[];    // service page slugs
};

export const tips: Tip[] = [
  {
    slug: "how-to-prepare-your-car-for-transport",
    title: "How to Prepare Your Car for Transport: 10-Step Checklist",
    metaTitle: "How to Prepare Your Car for Transport (Checklist) | MCC",
    description: "A simple 10-step checklist to get your car ready for shipping: cleaning, photos, fuel, personal items, keys and what to check at delivery.",
    excerpt: "Ten simple steps that make pickup faster and protect you if anything happens on the road.",
    readMins: 5,
    date: "2026-11-11",
    sections: [
      { h: "Why preparation matters", p: ["Most pickup delays and delivery disputes come from the same few things: a dirty car that hides scratches, a full trunk, a missing key or no photos. Ten minutes of preparation avoids all of them."] },
      { h: "Before pickup day", list: [
        "Wash the car so existing scratches and dents are easy to see on the inspection report.",
        "Take dated photos of every side, the roof, the wheels and the odometer.",
        "Remove personal items. Carriers allow only a small amount, in the trunk and below window level, and they are not covered by cargo insurance.",
        "Remove toll tags and parking passes so you are not charged on the way.",
        "Leave about a quarter tank of fuel. More adds weight, less can be a problem at loading.",
        "Check for leaks, and tell us if the car has any mechanical issues or does not run.",
        "Fold in mirrors, lower or remove antennas, and secure or remove loose spoilers and racks.",
        "Turn off or disable the alarm, or tell the driver how to switch it off.",
      ] },
      { h: "On pickup day", list: [
        "Walk around the car with the driver and agree on the condition report (bill of lading) before you sign.",
        "Hand over one full set of keys and keep a copy of the signed report.",
      ] },
      { h: "At delivery", p: ["Inspect the car against the pickup condition report before you sign, ideally in daylight. If you see new damage, note it on the delivery report and take photos before the driver leaves. Then call your coordinator."] },
    ],
    related: ["auto-transport", "enclosed-auto-transport", "non-running-vehicle-transport"],
  },
  {
    slug: "open-vs-enclosed-car-transport",
    title: "Open vs Enclosed Car Transport: Which One Do You Need?",
    metaTitle: "Open vs Enclosed Car Transport: Which Is Right? | MCC",
    description: "Open or enclosed car shipping? Compare protection, price and availability, and see which vehicles should always ship enclosed.",
    excerpt: "Open is cheaper and faster to book. Enclosed protects. Here is how to decide in two minutes.",
    readMins: 4,
    date: "2026-11-11",
    sections: [
      { h: "Open car transport", p: ["Open carriers are the two-level trucks you see on the highway. Most cars in the US are shipped this way. They are exposed to weather and road dust, the same as driving the car, and they are the most affordable and most widely available option."], list: ["Best for daily drivers, SUVs, pickups and dealer vehicles", "More carriers on every route, so pickup is usually faster", "Lowest price"] },
      { h: "Enclosed car transport", p: ["Enclosed carriers keep the vehicle inside a covered trailer, protected from rain, sun, road debris and curious eyes. Many have lift gates for cars with low ground clearance."], list: ["Best for classic, exotic, luxury and freshly restored cars", "Lift-gate loading for low cars instead of steep ramps", "Typically 40 to 60 percent more than open on the same route"] },
      { h: "How to decide", list: [
        "If you would be upset by a stone chip or road grime, choose enclosed.",
        "If the car is low, rare, high-value or just painted, choose enclosed.",
        "If it is an everyday vehicle and price matters most, open is the smart choice.",
        "Not sure? Ask for both prices in one quote and decide with real numbers.",
      ] },
    ],
    related: ["enclosed-auto-transport", "auto-transport", "expedited-transport"],
  },
  {
    slug: "snowbird-car-shipping-guide",
    title: "Snowbird Car Shipping Guide: Moving Your Car to and from Florida",
    metaTitle: "Snowbird Car Shipping to & from Florida: Guide | MCC",
    description: "Shipping your car to Florida for the winter? When to book, what it costs in season, and how to ship your car, boat or RV the easy way.",
    excerpt: "Every fall thousands of cars head south. Book at the right time and skip the I-95 drive.",
    readMins: 5,
    date: "2026-11-11",
    sections: [
      { h: "When snowbird season happens", p: ["Demand for car shipping to Florida rises from October through December, and the return trip north peaks from March through May. In those months more people want carriers on the same lanes, so prices rise and pickup windows get tighter."] },
      { h: "When to book", list: [
        "Book two to four weeks before you want the car picked up.",
        "Give a pickup window of a few days rather than one fixed date.",
        "If you can, ship a week or two before or after the busiest weeks.",
        "Book the return trip early. Spring fills up fast.",
      ] },
      { h: "Ship more than the car", p: ["Many snowbirds move a second vehicle, a golf cart, a boat or an RV at the same time. One coordinator can plan all of them together, which saves you calls and often saves money on the same route."] },
      { h: "Fly down, your car is waiting", p: ["Most owners drop the car off with the carrier, fly to Florida and have the car delivered to their winter home. Have someone available to receive it if you will not be there yet, and share their contact details when you book."] },
    ],
    related: ["auto-transport", "boat-transport-florida", "rv-transport", "atv-utv-transport"],
  },
];

export const getTip = (slug: string) => tips.find((t) => t.slug === slug);
