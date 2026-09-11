/**
 * Site architecture, exactly as the client specified:
 *   1. WHAT are you shipping?      -> 7 category pages
 *   2. WHAT exactly is it?         -> individual service pages
 *   3. WHAT special situation?     -> situation pages (non-running, auction, no trailer, enclosed, fleet)
 *   4. WHERE is it going?          -> added later from Search Console / Ads data (not at launch)
 *
 * Adding a page = adding one entry here. Routing, sitemap, breadcrumbs, schema,
 * internal links and the quote-form preselection all derive from this file.
 */

export type ShipType =
  | "car" | "suv-pickup" | "classic-exotic" | "commercial-truck" | "semi-tractor" | "van-bus"
  | "boat-trailer" | "boat-no-trailer" | "yacht" | "motorhome" | "towable-rv" | "motorcycle"
  | "powersports" | "construction" | "heavy-industrial" | "other";

export type IconKey =
  | "car" | "truck" | "boat" | "rv" | "motorcycle" | "excavator" | "industrial"
  | "boxtruck" | "semi" | "fleet" | "enclosed" | "nonrunning" | "auction" | "yacht"
  | "skidsteer" | "bulldozer" | "forklift" | "worktruck" | "boatlift";

export type FAQ = { q: string; a: string };

export type ServicePage = {
  slug: string;                 // flat URL, e.g. "box-truck-transport"
  kind: "category" | "service" | "situation";
  parent?: string;              // category slug for services/situations
  name: string;                 // nav / card label
  short: string;                // one-line card description
  icon: IconKey;
  title: string;                // <title>, < 60 chars
  description: string;          // meta description, < 160 chars
  eyebrow: string;
  h1: string;
  intro: string;                // 2–3 sentences, brokerage-accurate
  formDefault: ShipType;
  vehicles: string[];           // "what we coordinate" list
  equipment: string[];          // trailer / carrier equipment typically used
  considerations: { title: string; text: string }[];  // what MCC evaluates before dispatch
  faqs: FAQ[];
  keywords: string[];
  related: string[];            // slugs for internal linking
};

const TRUST_NOTE =
  "MCC Bound Legends is a licensed and bonded freight broker. We coordinate your shipment and dispatch a vetted motor carrier whose insurance is verified before pickup. The carrier performs the physical transport.";

export const pages: ServicePage[] = [
  /* ────────────────────────────── 1. CATEGORIES ────────────────────────────── */
  {
    slug: "auto-transport",
    kind: "category",
    name: "Auto Transport",
    short: "Cars, SUVs, pickups, classics, exotics and more",
    icon: "car",
    title: "Nationwide Auto Transport & Car Shipping | MCC",
    description:
      "Door-to-door car shipping nationwide. Open or enclosed auto transport for cars, SUVs, pickups, classics and exotics, coordinated by a licensed broker. Free quote.",
    eyebrow: "Auto Transport",
    h1: "Auto Transport & Car Shipping, Coordinated Nationwide",
    intro:
      "From a daily driver moving across the country to a classic heading to a collector, MCC Bound Legends matches your vehicle with the right vetted carrier. Open carrier for everyday cars, enclosed for anything you would not want exposed to the road, and no deposit until your carrier is assigned.",
    formDefault: "car",
    vehicles: [
      "Cars and sedans", "SUVs and crossovers", "Pickup trucks", "Classic and antique cars",
      "Exotic and luxury vehicles", "Modified and lifted vehicles", "Non-running and inoperable vehicles",
      "Auction and dealer vehicles", "Lease returns and relocations",
    ],
    equipment: ["Open auto carriers (single and multi-car)", "Enclosed carriers (soft and hard side)", "Hotshot trailers for fast single-vehicle moves", "Flatbeds for inoperable or lifted vehicles"],
    considerations: [
      { title: "Open or enclosed", text: "Most cars move safely on open carriers. High-value, low-clearance or freshly restored vehicles are quoted enclosed." },
      { title: "Running condition", text: "Non-running vehicles need a carrier with a winch or a flatbed, so tell us upfront and we dispatch the right truck the first time." },
      { title: "Modifications", text: "Lift kits, wide tires, roof racks and low splitters change which carrier can take the load. We ask so there are no surprises at pickup." },
      { title: "Timing and route", text: "Popular lanes such as Florida to the Northeast move quickly. Rural pickups may take a little longer to pair with a carrier, and we tell you that honestly." },
    ],
    faqs: [
      { q: "How much does it cost to ship a car?", a: "Price depends on distance, vehicle size, open or enclosed transport, running condition and how flexible your dates are. Request a quote with your ZIP codes and we send a real number, not a teaser rate that changes later." },
      { q: "Do I pay a deposit to book?", a: "No. You book with no deposit and pay once a vetted carrier is assigned to your vehicle." },
      { q: "Is my car insured during transport?", a: "The motor carrier that moves your vehicle carries cargo insurance, and we verify that coverage before dispatch. We provide the carrier's insurance details on request." },
      { q: "Can I put items inside the car?", a: "Carriers typically allow a limited amount of personal items in the trunk, below window level. Anything more must be declared so weight and DOT rules are respected." },
    ],
    keywords: ["auto transport", "car shipping", "ship my car", "car shipping quote", "door to door car shipping", "car transport Florida"],
    related: ["enclosed-auto-transport", "non-running-vehicle-transport", "auction-vehicle-transport", "motorcycle-transport"],
  },
  {
    slug: "commercial-vehicle-transport",
    kind: "category",
    name: "Commercial Vehicle Transport",
    short: "Box trucks, work trucks, vans, buses and fleets",
    icon: "truck",
    title: "Commercial Vehicle & Truck Transport Nationwide | MCC",
    description:
      "Transport coordination for box trucks, work trucks, cargo vans, buses, semi tractors and fleet vehicles nationwide. Equipment matched to real specs. Free quote.",
    eyebrow: "Commercial Vehicle Transport",
    h1: "Commercial Vehicle & Truck Transport for Businesses Nationwide",
    intro:
      "A high-roof box truck does not fit on a standard car hauler, and a bucket truck cannot be drive-away shipped without the right permits. MCC Bound Legends reads the actual height, length and weight of your commercial vehicle and coordinates a carrier and trailer that fit it, whether you are moving one work truck or relocating a fleet.",
    formDefault: "commercial-truck",
    vehicles: [
      "Box trucks and straight trucks", "Work, utility and service trucks", "Bucket trucks", "Cargo and delivery vans",
      "Cab-and-chassis trucks", "Semi tractors, day cabs and sleepers", "Buses and shuttle buses",
      "Medium-duty commercial trucks", "Fleet vehicles and dealer inventory",
    ],
    equipment: ["Step deck trailers for tall vehicles", "Lowboy and RGN trailers for heavy units", "Flatbeds for medium-duty trucks", "Drive-away and tow-away service where appropriate", "Open carriers for vans and light fleet vehicles"],
    considerations: [
      { title: "Overall height", text: "Legal height on most routes is 13'6\". A box truck on a flatbed can exceed that, which is why many commercial units move on step decks or lowboys." },
      { title: "Weight and GVWR", text: "Weight decides the trailer class and whether permits are required. We quote from the real number, not a guess." },
      { title: "Running and rolling", text: "Operable units can often be driven onto the trailer or driven away. Non-running trucks need winch or loading equipment arranged in advance." },
      { title: "Volume and scheduling", text: "Dealers, rental companies and fleet managers get one point of contact and staged pickups that fit business hours." },
    ],
    faqs: [
      { q: "Can you move a box truck that is too tall for a car carrier?", a: "Yes. Tall commercial vehicles are quoted on step deck or lowboy trailers so the total height stays legal, or as drive-away when that is the better fit." },
      { q: "Do you handle multiple vehicles for a business?", a: "Yes. We coordinate single units and multi-vehicle fleet moves, dealer transfers, lease returns and company relocations with one coordinator managing the schedule." },
      { q: "What information do you need for a commercial quote?", a: "Year, make and model, overall length, width, height, weight or GVWR, running condition, and pickup and delivery ZIP codes. The quote form on this page asks for exactly that." },
    ],
    keywords: ["commercial vehicle transport", "commercial truck shipping", "box truck transport", "fleet vehicle shipping", "work truck transport", "dealership vehicle transport"],
    related: ["box-truck-transport", "work-truck-transport", "semi-truck-transport", "fleet-vehicle-transport"],
  },
  {
    slug: "boat-transport",
    kind: "category",
    name: "Boat & Yacht Transport",
    short: "Center consoles, yachts, pontoons, sailboats and PWC",
    icon: "boat",
    title: "Nationwide Boat Transport & Yacht Shipping | MCC",
    description:
      "Boat transport coordination nationwide, with or without a trailer. Center consoles, pontoons, sailboats, cabin cruisers and yachts. Florida based. Free quote.",
    eyebrow: "Boat & Marine Transport",
    h1: "Boat Transport & Yacht Shipping, With or Without a Trailer",
    intro:
      "Based in Florida, MCC Bound Legends coordinates boat transport in every direction across the United States. Trailerable boats move on their own trailer or a carrier's. Larger vessels and boats without a trailer are matched with marine haulers and hydraulic trailers, and we coordinate marina or boatyard loading on both ends.",
    formDefault: "boat-trailer",
    vehicles: [
      "Center console boats", "Fishing boats and bay boats", "Powerboats and speedboats", "Pontoon and tritoon boats",
      "Sailboats (mast down)", "Cabin cruisers", "Yachts and sportfish", "Houseboats", "Personal watercraft and jet skis",
      "Boats with trailers", "Boats without trailers", "Oversize boats requiring permits",
    ],
    equipment: ["Tow-away of your own road-worthy trailer", "Specialized hydraulic marine trailers", "Flatbed and step deck with cradles", "Oversize permits and escorts arranged when beam or height require them"],
    considerations: [
      { title: "Trailer or no trailer", text: "If your trailer is road-worthy, a carrier tows it. If not, or if there is no trailer, we dispatch a marine hauler with the right cradle or hydraulic trailer." },
      { title: "Beam, height and length", text: "Beam over 8'6\" and height over 13'6\" on the trailer mean permits. We measure from the waterline to the highest fixed point and plan the route around it." },
      { title: "Loading and launching", text: "Boatyards, marinas, travel lifts and ramps have schedules. We coordinate with them so the carrier and the boat are ready at the same time." },
      { title: "Prep and protection", text: "Shrink wrap, removing canvas and electronics, and securing hatches protect the vessel on the highway. We send a simple prep checklist before pickup." },
    ],
    faqs: [
      { q: "Can you transport a boat without a trailer?", a: "Yes. This is one of our most requested services. We coordinate a marine hauler with the correct cradle or hydraulic trailer and arrange lift-out and lift-in at each end." },
      { q: "How is a boat transport quote calculated?", a: "Length, beam, height, weight, whether a trailer is available, the pickup and delivery locations and any permits or escorts required. Oversize boats cost more because they need specialized equipment and routing." },
      { q: "Do you ship boats to and from Florida?", a: "Every week. Florida is our home base and one of the busiest boat markets in the country, and we coordinate moves in and out of every coastal and inland state." },
      { q: "Is the boat insured in transit?", a: "The marine carrier that moves your boat carries cargo insurance, which we verify before dispatch. Ask us for the certificate and we send it." },
    ],
    keywords: ["boat transport", "boat shipping", "boat hauling", "yacht transport", "boat transport without trailer", "boat transport Florida", "boat shipping quote"],
    related: ["boat-transport-without-trailer", "yacht-transport", "rv-transport", "auto-transport"],
  },
  {
    slug: "rv-transport",
    kind: "category",
    name: "RV & Motorhome Transport",
    short: "Class A/B/C, travel trailers, fifth wheels, campers",
    icon: "rv",
    title: "RV, Motorhome & Travel Trailer Transport | MCC",
    description:
      "RV transport coordination nationwide: Class A, B and C motorhomes, travel trailers, fifth wheels, toy haulers and park models. Drive-away, tow-away or flatbed. Free quote.",
    eyebrow: "RV & Recreational Vehicle Transport",
    h1: "RV & Motorhome Transport, Drive-Away, Tow-Away or Flatbed",
    intro:
      "Snowbirds heading north, buyers picking up a coach out of state, dealers moving inventory: MCC Bound Legends coordinates RV transport across the United States. Motorhomes usually move drive-away with a licensed professional driver; towables move tow-away or on a flatbed depending on size and condition.",
    formDefault: "motorhome",
    vehicles: [
      "Class A motorhomes", "Class B camper vans", "Class C motorhomes", "Travel trailers", "Fifth wheels",
      "Toy haulers", "Pop-up and truck campers", "Park models and destination trailers", "Specialty and vintage RVs",
    ],
    equipment: ["Drive-away service for operable motorhomes", "Tow-away for towable RVs with sound running gear", "Flatbed, step deck or lowboy for non-running or oversize units", "Permits for park models and wide units"],
    considerations: [
      { title: "Drive-away or hauled", text: "An operable motorhome is often best moved by a professional driver. Anything non-running, or a unit you do not want to add mileage to, is hauled." },
      { title: "Tires, brakes and hitch", text: "Tow-away carriers inspect tires, lights and brakes before hooking up. We ask about them at quote time so the pickup goes smoothly." },
      { title: "Height and length", text: "Fifth wheels on a flatbed can exceed legal height. We calculate the loaded height before choosing the trailer." },
      { title: "Seasonal timing", text: "Florida RV traffic peaks in spring and fall. Booking a week or two ahead in those windows gets you better carrier options." },
    ],
    faqs: [
      { q: "Will someone drive my motorhome?", a: "If you choose drive-away, yes, a licensed and insured professional driver moves it, and you approve that method before dispatch. If you prefer no added miles, we quote it hauled." },
      { q: "Can you move a travel trailer if I do not have a tow vehicle?", a: "Yes. Tow-away carriers bring their own truck and tow your trailer on its own wheels, or we load it on a flatbed if its running gear is not road-ready." },
      { q: "How far ahead should I book RV transport?", a: "One to two weeks is comfortable. Faster is often possible, especially on busy lanes in and out of Florida, Texas and Arizona." },
    ],
    keywords: ["RV transport", "motorhome transport", "travel trailer transport", "RV shipping quote", "RV transport Florida", "fifth wheel transport"],
    related: ["boat-transport", "auto-transport", "commercial-vehicle-transport", "motorcycle-transport"],
  },
  {
    slug: "motorcycle-transport",
    kind: "category",
    name: "Motorcycle & Powersports",
    short: "Motorcycles, ATVs, UTVs, side-by-sides, golf carts",
    icon: "motorcycle",
    title: "Motorcycle, ATV & UTV Transport Nationwide | MCC",
    description:
      "Motorcycle shipping and powersports transport nationwide. Cruisers, sport bikes, touring bikes, ATVs, UTVs, side-by-sides and golf carts, secured and coordinated door to door.",
    eyebrow: "Motorcycle & Powersports Transport",
    h1: "Motorcycle & Powersports Transport, Secured and Coordinated Door to Door",
    intro:
      "Bikes and powersports units need to be strapped, chocked and protected differently from cars. MCC Bound Legends coordinates carriers experienced with two-wheel and off-road equipment, enclosed when you want it, and handles single units or a whole trailer of side-by-sides.",
    formDefault: "motorcycle",
    vehicles: [
      "Cruisers and touring motorcycles", "Sport bikes", "Trikes and custom builds", "ATVs and quads", "UTVs and side-by-sides",
      "Golf carts and LSVs", "Dirt bikes and dual sports", "Snowmobiles and other powersports",
    ],
    equipment: ["Enclosed carriers with wheel chocks and soft straps", "Open carriers for ATVs and UTVs", "Palletized or crated transport for non-running bikes", "Multi-unit trailers for dealers and rental fleets"],
    considerations: [
      { title: "Enclosed or open", text: "Most riders choose enclosed for motorcycles. ATVs, UTVs and golf carts often ride open at a lower cost." },
      { title: "Fuel, fluids and battery", text: "Carriers ask for a low tank and a disconnected battery on some units. We send the checklist before pickup." },
      { title: "Accessories", text: "Windshields, bags and racks can be left on if secure. Loose items should be removed." },
      { title: "Non-running units", text: "Bikes that cannot roll need a crate or a carrier with a lift. Tell us and we plan for it." },
    ],
    faqs: [
      { q: "Is enclosed motorcycle transport worth it?", a: "For most street bikes, yes. It keeps the bike out of weather and road debris for a modest difference in price. Off-road units usually ship open without issue." },
      { q: "Can you ship a golf cart or a UTV?", a: "Yes, single units or several at once. Give us the dimensions and whether it runs, and we match a carrier with the right ramps and tie-downs." },
      { q: "Do you need the bike to be running?", a: "No, but we need to know. Non-running motorcycles are handled with a lift gate, crate or winch." },
    ],
    keywords: ["motorcycle transport", "motorcycle shipping", "ATV transport", "UTV transport", "powersports transport", "golf cart shipping"],
    related: ["auto-transport", "enclosed-auto-transport", "rv-transport", "boat-transport"],
  },
  {
    slug: "construction-equipment-transport",
    kind: "category",
    name: "Construction Equipment",
    short: "Excavators, skid steers, dozers, loaders, forklifts",
    icon: "excavator",
    title: "Construction Equipment Transport Nationwide | MCC",
    description:
      "Heavy equipment hauling coordination for excavators, skid steers, bulldozers, backhoes, loaders, forklifts and telehandlers. Lowboy, RGN, step deck. Permits arranged.",
    eyebrow: "Construction Equipment Transport",
    h1: "Construction Equipment Transport, Matched to the Machine's Real Specs",
    intro:
      "A mini excavator rides on a hotshot; a 50,000-lb excavator needs an RGN, permits and possibly an escort. MCC Bound Legends coordinates construction equipment transport from the machine's actual dimensions and weight, arranges oversize permits and routing, and confirms loading equipment on both ends before a truck is dispatched.",
    formDefault: "construction",
    vehicles: [
      "Excavators and mini excavators", "Skid steers and compact track loaders", "Bulldozers", "Backhoes", "Wheel loaders",
      "Forklifts and telehandlers", "Tractors", "Rollers and compactors", "Trenchers and graders", "Cranes and job-site machinery",
    ],
    equipment: ["Hotshot and gooseneck trailers for compact machines", "Flatbed and step deck for mid-size units", "Lowboy and RGN (removable gooseneck) for heavy or tall machines", "Oversize and overweight permits, pilot cars and route surveys"],
    considerations: [
      { title: "Dimensions and weight", text: "Length, width, height and operating weight decide the trailer, the permits and the route. We quote from the spec sheet or your measurements." },
      { title: "Attachments", text: "Buckets, hammers and forks add weight and length. Sometimes they ride on the same trailer, sometimes separately." },
      { title: "Loading equipment", text: "Does the machine run? Is there a ramp, dock or another machine to load it? We confirm before dispatch so nobody waits on site." },
      { title: "Permits and escorts", text: "Over 8'6\" wide, 13'6\" tall or 80,000 lbs gross triggers permits that vary by state. We handle the paperwork and build it into the quote." },
    ],
    faqs: [
      { q: "How do you price excavator or dozer transport?", a: "From the machine's real specifications: dimensions, weight, attachments, running condition, loading equipment available, distance and permits required. Send the model number and we can pull the spec sheet." },
      { q: "Do you arrange oversize permits?", a: "Yes. Permits, pilot cars and route planning for oversize or overweight loads are coordinated as part of the shipment." },
      { q: "Can you pick up from an auction or dealer yard?", a: "Yes. We coordinate release paperwork, yard hours and loading with the auction or dealer so pickup happens in one trip." },
      { q: "What if the machine does not run?", a: "We dispatch a carrier with a winch or arrange a loader on site. Tell us at quote time so the right equipment shows up." },
    ],
    keywords: ["construction equipment transport", "heavy equipment hauling", "excavator transport", "skid steer transport", "bulldozer transport", "forklift transport", "heavy equipment shipping quote"],
    related: ["excavator-transport", "skid-steer-transport", "bulldozer-transport", "forklift-transport"],
  },
  {
    slug: "heavy-equipment-transport",
    kind: "category",
    name: "Heavy Equipment & Machinery",
    short: "Industrial, agricultural, oversized and specialty loads",
    icon: "industrial",
    title: "Heavy Equipment & Machinery Transport | MCC",
    description:
      "Oversized and industrial machinery transport coordination nationwide: agricultural equipment, generators, manufacturing machinery and specialty loads. RGN, lowboy, permits and escorts.",
    eyebrow: "Heavy & Industrial Equipment Transport",
    h1: "Heavy Equipment & Machinery Transport for Oversized and Industrial Loads",
    intro:
      "When the load is heavier, wider or taller than standard freight, the details decide everything. MCC Bound Legends coordinates heavy haul carriers, multi-axle trailers, permits, escorts and route surveys for industrial machinery, agricultural equipment and oversized specialty loads across the United States.",
    formDefault: "heavy-industrial",
    vehicles: [
      "Industrial machinery and presses", "Agricultural equipment and farm machinery", "Combines, sprayers and tractors",
      "Manufacturing equipment", "Generators and transformers", "Oversized and overweight equipment", "Specialty machinery and crated loads",
    ],
    equipment: ["Lowboy, RGN and multi-axle heavy haul trailers", "Step deck and stretch trailers", "Flatbeds for crated and palletized machinery", "Permits, pilot cars, route surveys and bridge analysis where required"],
    considerations: [
      { title: "Exact specifications", text: "Heavy haul is quoted from precise length, width, height and weight, plus the center of gravity for tall or top-heavy loads." },
      { title: "Loading and rigging", text: "Cranes, forklifts and rigging crews are scheduled so the carrier is not waiting on site. We coordinate both ends." },
      { title: "Route and permits", text: "Oversize routes are planned around bridges, clearances and state permit rules. Some states restrict night or weekend movement." },
      { title: "Timeline", text: "Permits and escorts take time to arrange. Sharing specs early gives us the best options and the best price." },
    ],
    faqs: [
      { q: "What counts as an oversize load?", a: "Generally anything over 8'6\" wide, 13'6\" tall, 53' long or 80,000 lbs gross vehicle weight. Thresholds vary by state, and we handle the permits for your route." },
      { q: "Can you move farm and agricultural equipment?", a: "Yes. Tractors, combines, sprayers and implements are coordinated regularly, including seasonal moves between regions." },
      { q: "Do you provide the crane or rigging?", a: "We coordinate with rigging and crane providers at pickup and delivery as part of the plan, and confirm who is responsible for each step before dispatch." },
    ],
    keywords: ["heavy equipment transport", "machinery transport", "industrial equipment transport", "oversized equipment transport", "agricultural equipment transport", "heavy haul trucking"],
    related: ["construction-equipment-transport", "excavator-transport", "bulldozer-transport", "commercial-vehicle-transport"],
  },

  /* ─────────────────────── 2. WHAT EXACTLY IS IT? (services) ─────────────────────── */
  {
    slug: "box-truck-transport",
    kind: "service",
    parent: "commercial-vehicle-transport",
    name: "Box Truck Transport",
    short: "Straight trucks and box trucks, all heights",
    icon: "boxtruck",
    title: "Box Truck Transport Nationwide | MCC Bound Legends",
    description:
      "Move a box truck anywhere in the US. Step deck, lowboy or drive-away transport coordinated to your truck's real height and weight. Licensed broker, free quote.",
    eyebrow: "Box Truck Transport",
    h1: "Box Truck Transport, Coordinated to Your Truck's Real Height and Weight",
    intro:
      "Box trucks are the most common commercial vehicle we are asked to move, and the most common one quoted wrong elsewhere. A 12' to 14' high box on a standard flatbed is over legal height. MCC Bound Legends coordinates step deck, lowboy or professional drive-away transport so your truck arrives legally and on schedule.",
    formDefault: "commercial-truck",
    vehicles: ["10' to 26' box trucks", "Straight trucks and cube vans", "Refrigerated box trucks", "Lift-gate trucks", "Moving-company and rental-fleet box trucks", "Non-running box trucks"],
    equipment: ["Step deck trailers", "Lowboy trailers for tall units", "Drive-away with a licensed professional driver", "Winch-equipped carriers for non-running trucks"],
    considerations: [
      { title: "Loaded height", text: "Truck height plus trailer deck height must stay under 13'6\". That single number decides the trailer type." },
      { title: "Weight", text: "Empty weight and GVWR set the trailer class and axle requirements." },
      { title: "Running condition", text: "Operable trucks can be drive-away shipped, often the fastest and most economical option for long distances." },
      { title: "Pickup location", text: "Dealer lots, rental yards and auctions have release procedures and hours we coordinate in advance." },
    ],
    faqs: [
      { q: "Is it cheaper to drive-away or haul a box truck?", a: "For an operable truck on a long route, drive-away is often less expensive because no specialized trailer is required. For short routes or trucks you do not want miles on, hauling on a step deck makes sense. We quote the option that fits." },
      { q: "Can you move a box truck bought at auction?", a: "Yes. We coordinate the release, yard hours and loading with the auction so the pickup happens in one visit." },
      { q: "How long does box truck transport take?", a: "Typically a few days to a little over a week depending on distance and how quickly a suitable carrier is on your lane. We give you a realistic window when we quote." },
    ],
    keywords: ["box truck transport", "box truck shipping", "move a box truck", "straight truck transport", "ship commercial truck"],
    related: ["work-truck-transport", "semi-truck-transport", "fleet-vehicle-transport", "commercial-vehicle-transport"],
  },
  {
    slug: "work-truck-transport",
    kind: "service",
    parent: "commercial-vehicle-transport",
    name: "Work Truck Transport",
    short: "Utility, service, bucket and cab-chassis trucks",
    icon: "worktruck",
    title: "Work Truck Transport & Shipping | MCC Bound Legends",
    description:
      "Transport coordination for work trucks: utility bodies, service trucks, bucket trucks, cab-and-chassis and upfitted trucks. Nationwide carriers matched to real specs.",
    eyebrow: "Work Truck Transport",
    h1: "Work Truck Transport for Utility, Service and Bucket Trucks",
    intro:
      "Upfitted trucks carry booms, cranes, compressors and racks that change their height, weight and balance. MCC Bound Legends coordinates work truck transport from the truck as it actually is, not the base model, so the carrier arrives with the right trailer and tie-down plan.",
    formDefault: "commercial-truck",
    vehicles: ["Utility and service body trucks", "Bucket and boom trucks", "Mechanic and crane trucks", "Cab-and-chassis units", "Plumbing, electrical and HVAC fleet trucks", "Dump and landscape trucks"],
    equipment: ["Step deck and flatbed trailers", "Lowboy for boom and crane trucks", "Drive-away for operable units", "Multi-unit hauling for fleet relocations"],
    considerations: [
      { title: "Upfit height and overhang", text: "Booms and ladder racks add height and sometimes rear overhang. We measure the finished truck." },
      { title: "Weight distribution", text: "Cranes and compressors shift the balance. Carriers need that detail to secure the load correctly." },
      { title: "Fleet timing", text: "Utility companies and contractors often need trucks staged around job schedules. We plan pickups to match." },
    ],
    faqs: [
      { q: "Can you ship a bucket truck?", a: "Yes. Bucket and boom trucks move on step decks or lowboys, or drive-away when operable and legal to drive." },
      { q: "Do you move fleet work trucks for utility companies?", a: "Yes, single units or scheduled batches with one coordinator handling the timeline and paperwork." },
    ],
    keywords: ["work truck transport", "utility truck transport", "bucket truck shipping", "service truck transport"],
    related: ["box-truck-transport", "fleet-vehicle-transport", "semi-truck-transport", "commercial-vehicle-transport"],
  },
  {
    slug: "semi-truck-transport",
    kind: "service",
    parent: "commercial-vehicle-transport",
    name: "Semi Truck & Tractor Transport",
    short: "Day cabs and sleeper tractors, running or not",
    icon: "semi",
    title: "Semi Truck & Tractor Transport Nationwide | MCC",
    description:
      "Semi tractor transport coordination: day cabs and sleepers moved by drive-away, tow-away, piggyback or lowboy. Auction, dealer and fleet pickups nationwide.",
    eyebrow: "Semi Truck Transport",
    h1: "Semi Truck & Tractor Transport by Drive-Away, Tow-Away or Lowboy",
    intro:
      "Buying a tractor out of state or relocating a fleet? MCC Bound Legends coordinates semi tractor transport nationwide using the method that fits the unit: drive-away for operable trucks, tow-away or piggyback for multiple units, and lowboy or RGN for non-running or specialty tractors.",
    formDefault: "semi-tractor",
    vehicles: ["Day cab tractors", "Sleeper tractors", "Heavy-spec and vocational tractors", "Non-running semi trucks", "Auction and dealer tractors", "Glider kits and specialty builds"],
    equipment: ["Professional drive-away drivers", "Tow-away and saddle-mount (piggyback) for multi-unit moves", "Lowboy and RGN for inoperable units", "Winch loading where required"],
    considerations: [
      { title: "Operable or not", text: "Drive-away needs a legal, running truck with current registration or temporary permits. Non-running tractors are hauled." },
      { title: "Multiple units", text: "Two or more tractors can often be moved together, lowering the per-unit cost." },
      { title: "Paperwork", text: "Title, bill of sale, auction release and temporary tags are confirmed before dispatch." },
    ],
    faqs: [
      { q: "What is the cheapest way to ship a semi truck?", a: "Drive-away is usually the most economical for an operable tractor. Multi-unit tow-away can lower the cost further when several trucks move together. Hauling on a lowboy is priced higher but is the only option for non-running units." },
      { q: "Do you pick up semi trucks from auctions?", a: "Yes. We coordinate release documents, yard hours and loading with the auction so the carrier can collect in one visit." },
    ],
    keywords: ["semi truck transport", "semi tractor transport", "sleeper truck shipping", "day cab transport", "ship semi truck"],
    related: ["box-truck-transport", "fleet-vehicle-transport", "auction-vehicle-transport", "commercial-vehicle-transport"],
  },
  {
    slug: "fleet-vehicle-transport",
    kind: "situation",
    parent: "commercial-vehicle-transport",
    name: "Fleet Vehicle Transport",
    short: "Dealers, rental and fleet managers, multi-unit moves",
    icon: "fleet",
    title: "Fleet Vehicle Transport for Businesses | MCC",
    description:
      "Fleet vehicle shipping for dealerships, rental companies, fleet managers and businesses relocating vehicles. One coordinator, staged pickups, nationwide carriers.",
    eyebrow: "Fleet Vehicle Transport",
    h1: "Fleet Vehicle Transport for Dealers, Rental Companies and Fleet Managers",
    intro:
      "Moving several vehicles at once is a scheduling problem as much as a transport problem. MCC Bound Legends gives businesses one coordinator who stages pickups, matches mixed vehicle types to the right carriers and keeps every unit tracked until the last one is delivered.",
    formDefault: "commercial-truck",
    vehicles: ["Dealer inventory transfers", "Rental and leasing fleets", "Company relocations", "Lease returns", "Mixed fleets of cars, vans and trucks", "Seasonal fleet repositioning"],
    equipment: ["Multi-car open carriers", "Enclosed carriers for premium units", "Step deck and flatbed for trucks and vans", "Drive-away teams for operable commercial units"],
    considerations: [
      { title: "Mixed vehicle types", text: "A fleet of sedans, vans and box trucks needs more than one carrier type. We split and sequence the loads." },
      { title: "Business hours and staging", text: "Pickups are planned around your yard hours and your team's availability." },
      { title: "Reporting", text: "Businesses get one point of contact and clear status on every unit." },
    ],
    faqs: [
      { q: "Is there a minimum number of vehicles for fleet pricing?", a: "No. Volume improves carrier options and pricing, but we coordinate two vehicles as carefully as twenty." },
      { q: "Can you handle recurring fleet moves?", a: "Yes. Dealers and rental companies with regular lanes get a repeatable process and a coordinator who knows their vehicles." },
    ],
    keywords: ["fleet vehicle transport", "fleet vehicle shipping", "dealership vehicle transport", "fleet auto transport Florida", "business vehicle transport"],
    related: ["box-truck-transport", "work-truck-transport", "auction-vehicle-transport", "auto-transport"],
  },
  {
    slug: "enclosed-auto-transport",
    kind: "situation",
    parent: "auto-transport",
    name: "Enclosed Auto Transport",
    short: "Luxury, exotic, classic and collector vehicles",
    icon: "enclosed",
    title: "Enclosed Auto Transport for Luxury & Classic Cars | MCC",
    description:
      "Enclosed car transport coordination for exotic, luxury, classic and collector vehicles. Hard-side carriers, lift gates for low clearance, vetted specialist carriers nationwide.",
    eyebrow: "Enclosed Auto Transport",
    h1: "Enclosed Auto Transport for Luxury, Exotic and Classic Cars",
    intro:
      "Some vehicles should never see an open highway on a trailer. MCC Bound Legends coordinates enclosed carriers with lift gates, soft tie-downs and full weather protection for exotics, classics, restorations and any car you want to arrive exactly as it left.",
    formDefault: "classic-exotic",
    vehicles: ["Exotic and supercars", "Luxury sedans and SUVs", "Classic and antique cars", "Fresh restorations and show cars", "Low-clearance and modified vehicles", "Collector motorcycles"],
    equipment: ["Hard-side enclosed carriers", "Lift-gate loading for low ground clearance", "Single-vehicle enclosed for direct moves", "Multi-vehicle enclosed for collections"],
    considerations: [
      { title: "Ground clearance", text: "Low cars need a lift gate, not ramps. We ask for clearance and dispatch accordingly." },
      { title: "Direct or shared", text: "A dedicated single-car carrier is the fastest and most private. Shared enclosed carriers cost less with a slightly wider window." },
      { title: "Condition report", text: "A detailed inspection with photos at pickup and delivery protects everyone." },
    ],
    faqs: [
      { q: "How much more is enclosed than open transport?", a: "Typically a moderate premium over open transport on the same route. For a vehicle worth protecting, most owners consider it well spent. Request a quote and we show both if you are undecided." },
      { q: "Do enclosed carriers have lift gates?", a: "Many do, and for low-clearance cars we specifically dispatch one that does." },
    ],
    keywords: ["enclosed auto transport", "enclosed car transport", "exotic car shipping", "classic car transport", "luxury car transport"],
    related: ["auto-transport", "non-running-vehicle-transport", "motorcycle-transport", "auction-vehicle-transport"],
  },
  {
    slug: "non-running-vehicle-transport",
    kind: "situation",
    parent: "auto-transport",
    name: "Non-Running Vehicle Transport",
    short: "Inoperable, project, salvage and damaged vehicles",
    icon: "nonrunning",
    title: "Non-Running Vehicle Transport | MCC Bound Legends",
    description:
      "Ship a non-running or inoperable vehicle anywhere in the US. Winch-equipped carriers and flatbeds coordinated for project cars, salvage, damaged and auction vehicles.",
    eyebrow: "Non-Running Vehicle Transport",
    h1: "Non-Running Vehicle Transport with Winch and Flatbed Carriers",
    intro:
      "A vehicle that does not start, roll or steer needs a different carrier than one that does. MCC Bound Legends coordinates winch-equipped carriers, flatbeds and forklift loading for inoperable cars, trucks and equipment, and asks the right questions upfront so the carrier arrives prepared.",
    formDefault: "car",
    vehicles: ["Non-starting cars and trucks", "Project and barn-find vehicles", "Salvage and insurance-auction vehicles", "Collision-damaged vehicles", "Vehicles that do not roll or steer", "Inoperable commercial units and equipment"],
    equipment: ["Winch-equipped open and enclosed carriers", "Rollback and flatbed trucks", "Forklift or loader assistance for vehicles that do not roll", "Lowboy for heavy inoperable units"],
    considerations: [
      { title: "Does it roll, steer and brake?", text: "A car that rolls can be winched. One that does not roll needs a forklift or skates. This changes the carrier and the price." },
      { title: "Loose parts and damage", text: "Anything hanging or loose must be secured or removed before transport." },
      { title: "Pickup location", text: "Salvage yards and auctions have loading equipment. Residential pickups may need a rollback." },
    ],
    faqs: [
      { q: "Does non-running transport cost more?", a: "Yes, modestly, because a winch or special loading is required and fewer carriers are equipped. We tell you the difference clearly in the quote." },
      { q: "Can you pick up from an insurance auction?", a: "Yes. We coordinate release documents and yard loading with the auction so the pickup happens smoothly." },
    ],
    keywords: ["non-running vehicle transport", "ship a non-running vehicle", "inoperable car shipping", "salvage vehicle transport"],
    related: ["auction-vehicle-transport", "auto-transport", "enclosed-auto-transport", "commercial-vehicle-transport"],
  },
  {
    slug: "auction-vehicle-transport",
    kind: "situation",
    parent: "auto-transport",
    name: "Auction Vehicle Transport",
    short: "Pickup from auction yards nationwide",
    icon: "auction",
    title: "Auction Vehicle Transport | MCC Bound Legends",
    description:
      "Transport a vehicle you bought at auction. Release paperwork, yard hours and loading coordinated with the auction, then delivered to your door by a vetted carrier.",
    eyebrow: "Auction Vehicle Transport",
    h1: "Auction Vehicle Transport from Yard Release to Your Door",
    intro:
      "You won the bid. Now the vehicle has to leave the yard before storage fees start. MCC Bound Legends coordinates pickup from vehicle and equipment auctions nationwide, handling release paperwork, gate passes and loading so your purchase reaches you without a second trip or a late fee.",
    formDefault: "car",
    vehicles: ["Cars, trucks and SUVs from vehicle auctions", "Salvage and insurance-auction vehicles", "Dealer-auction purchases", "Auction boats, RVs and motorcycles", "Auction construction and heavy equipment", "Online-auction purchases picked up in any state"],
    equipment: ["Open and enclosed carriers", "Winch and flatbed carriers for non-running lots", "Step deck, lowboy and RGN for auction equipment", "Tow-away for trailers and boats on trailers"],
    considerations: [
      { title: "Release and gate pass", text: "The auction needs a buyer number, lot number and authorization for the carrier. We collect it before dispatch." },
      { title: "Storage deadlines", text: "Most auctions charge storage after a few days. Tell us the deadline and we prioritize the pickup." },
      { title: "Condition unknown", text: "Auction lots are often sold as-is. We plan for non-running until told otherwise." },
    ],
    faqs: [
      { q: "Which auctions can you pick up from?", a: "Any vehicle or equipment auction that releases to licensed carriers. We coordinate directly with the auction's release process on your behalf." },
      { q: "How fast can you pick up after I win?", a: "Often within a few days depending on the location and lane. Tell us the storage deadline and we plan around it." },
    ],
    keywords: ["auction vehicle transport", "transport vehicle from auction", "auction car shipping", "auction equipment transport"],
    related: ["non-running-vehicle-transport", "auto-transport", "semi-truck-transport", "construction-equipment-transport"],
  },
  {
    slug: "boat-transport-without-trailer",
    kind: "situation",
    parent: "boat-transport",
    name: "Boat Transport Without Trailer",
    short: "Marine haulers, hydraulic trailers, lift coordination",
    icon: "boatlift",
    title: "Boat Transport Without a Trailer | MCC Bound Legends",
    description:
      "No trailer? We coordinate marine haulers with hydraulic trailers and cradles, plus marina or boatyard lift-out and lift-in, for boats without a trailer nationwide.",
    eyebrow: "Boat Transport Without Trailer",
    h1: "Boat Transport Without a Trailer, From Lift-Out to Lift-In",
    intro:
      "A boat sitting in the water or on blocks in a yard can still move across the country. MCC Bound Legends coordinates specialized marine haulers with hydraulic trailers or custom cradles, schedules the travel lift or crane at each end, and plans the route for the boat's real beam and height.",
    formDefault: "boat-no-trailer",
    vehicles: ["Center consoles and sportfish without trailers", "Cabin cruisers and express boats", "Sailboats with the mast down", "Yachts up to permitted size", "Boats in dry storage or on blocks", "Boats purchased in the water"],
    equipment: ["Hydraulic marine trailers", "Flatbed and step deck with custom cradles", "Travel lift, crane or forklift coordination at marinas and boatyards", "Oversize permits and escorts when required"],
    considerations: [
      { title: "Beam and height", text: "Measured from the keel to the highest fixed point, plus beam at the widest. These numbers set the permits and the route." },
      { title: "Lift scheduling", text: "Marinas and yards schedule lifts days in advance. We book them so the hauler and the boat are ready together." },
      { title: "Prep", text: "Canvas, antennas and electronics come down; hatches and loose gear are secured. We send the checklist." },
    ],
    faqs: [
      { q: "How do you move a boat with no trailer?", a: "A marine hauler arrives with a hydraulic trailer or cradle, the boat is lifted on at the marina or yard, and lifted off at the destination. We coordinate both lifts and the road transport in between." },
      { q: "What sizes can you handle?", a: "From small runabouts to large cruisers and yachts. Larger vessels need permits and escorts, which we arrange as part of the shipment." },
    ],
    keywords: ["boat transport without trailer", "boat hauling no trailer", "marine transport hydraulic trailer", "boat transport Florida"],
    related: ["boat-transport", "yacht-transport", "rv-transport", "heavy-equipment-transport"],
  },
  {
    slug: "yacht-transport",
    kind: "service",
    parent: "boat-transport",
    name: "Yacht Transport",
    short: "Overland yacht and large-vessel moves",
    icon: "yacht",
    title: "Yacht Transport Nationwide | MCC Bound Legends",
    description:
      "Overland yacht transport coordination: sportfish, motor yachts, cruisers and sailing yachts moved with specialized haulers, permits, escorts and marina lift coordination.",
    eyebrow: "Yacht Transport",
    h1: "Yacht Transport by Road, Planned Down to the Last Bridge",
    intro:
      "Moving a yacht overland is a planned operation: precise measurements, permits in every state on the route, escorts, and lifts timed at both marinas. MCC Bound Legends coordinates yacht transport with experienced marine haulers and keeps you informed at each stage.",
    formDefault: "yacht",
    vehicles: ["Motor yachts and express cruisers", "Sportfish and convertibles", "Sailing yachts (mast unstepped)", "Trawlers", "Catamarans within permitted beam", "Yachts relocating between coasts or to inland lakes"],
    equipment: ["Specialized yacht haulers and hydraulic trailers", "Multi-state oversize permits and pilot cars", "Route surveys for height and width restrictions", "Travel lift and crane coordination"],
    considerations: [
      { title: "Survey and measurements", text: "Length overall, beam, height on the trailer and weight determine everything from permits to which roads are usable." },
      { title: "Season and schedule", text: "Permits can take days to issue. Booking early gives the best routing and pricing." },
      { title: "Insurance and documentation", text: "The marine hauler's cargo coverage is verified before dispatch and provided to you on request." },
    ],
    faqs: [
      { q: "How large a yacht can be moved by road?", a: "Many yachts up to roughly 60 feet move overland regularly; beam and height are usually the limiting factors rather than length. Send the specs and we tell you what is possible." },
      { q: "How long does yacht transport take?", a: "Longer than a standard shipment because of permits, escorts and daylight-only travel rules in some states. We give you a realistic schedule at quote time." },
    ],
    keywords: ["yacht transport", "yacht transport companies", "yacht shipping overland", "yacht hauling"],
    related: ["boat-transport", "boat-transport-without-trailer", "heavy-equipment-transport", "rv-transport"],
  },
  {
    slug: "excavator-transport",
    kind: "service",
    parent: "construction-equipment-transport",
    name: "Excavator Transport",
    short: "Mini to 100,000-lb excavators, permits arranged",
    icon: "excavator",
    title: "Excavator Transport Nationwide | MCC Bound Legends",
    description:
      "Excavator hauling coordination from mini excavators to large tracked machines. Hotshot, step deck, lowboy and RGN trailers, oversize permits and loading confirmed.",
    eyebrow: "Excavator Transport",
    h1: "Excavator Transport from Mini Excavators to Heavy Tracked Machines",
    intro:
      "A 3-ton mini excavator and a 40-ton tracked excavator are different shipments in every way. MCC Bound Legends coordinates excavator transport from the machine's real operating weight and dimensions, selects the right trailer, arranges permits and confirms how it loads at both ends.",
    formDefault: "construction",
    vehicles: ["Mini and compact excavators", "Mid-size tracked excavators", "Large excavators requiring RGN", "Wheeled excavators", "Long-reach and demolition excavators", "Excavators with buckets, hammers and thumbs"],
    equipment: ["Hotshot and tag trailers for minis", "Step deck for mid-size units", "Lowboy and RGN for heavy machines", "Oversize and overweight permits, pilot cars"],
    considerations: [
      { title: "Operating weight", text: "The single most important number. It sets the trailer class, the axle configuration and whether permits apply." },
      { title: "Boom and stick position", text: "Transport height depends on how the boom is folded. Some machines need the boom removed to stay legal." },
      { title: "Attachments", text: "Extra buckets and hammers add weight and may need to ride separately." },
      { title: "Loading", text: "Running machines drive onto the trailer. Non-running ones need a loader or crane arranged in advance." },
    ],
    faqs: [
      { q: "What trailer do you use for an excavator?", a: "Minis ride on hotshot or tag trailers, mid-size machines on step decks, and heavy excavators on lowboys or RGNs. We choose based on weight and transport height." },
      { q: "Do you handle permits for oversize excavators?", a: "Yes. Permits, escorts and route planning are coordinated for you and included in the quote." },
    ],
    keywords: ["excavator transport", "excavator hauling", "excavator hauling company", "excavator transport quote", "excavator transport Florida"],
    related: ["skid-steer-transport", "bulldozer-transport", "construction-equipment-transport", "heavy-equipment-transport"],
  },
  {
    slug: "skid-steer-transport",
    kind: "service",
    parent: "construction-equipment-transport",
    name: "Skid Steer Transport",
    short: "Skid steers and compact track loaders, fast hotshots",
    icon: "skidsteer",
    title: "Skid Steer Transport & Shipping | MCC Bound Legends",
    description:
      "Skid steer and compact track loader transport coordination nationwide. Hotshot and flatbed carriers, attachments included, dealer and auction pickups handled.",
    eyebrow: "Skid Steer Transport",
    h1: "Skid Steer & Compact Track Loader Transport, Quick and Straightforward",
    intro:
      "Skid steers are compact enough to move quickly on hotshot and flatbed trailers, which means more carrier options and faster pickups. MCC Bound Legends coordinates skid steer transport for contractors, dealers, rental companies and buyers, with attachments and loading planned in.",
    formDefault: "construction",
    vehicles: ["Wheeled skid steers", "Compact track loaders", "Mini skid steers and stand-on loaders", "Skid steers with attachments", "Multiple units for dealers and rental fleets"],
    equipment: ["Hotshot and gooseneck trailers", "Flatbed trailers for multiple units", "Tilt and ramp trailers for non-running machines"],
    considerations: [
      { title: "Attachments", text: "Buckets, forks, augers and grapples ride along when secured. Tell us what is coming." },
      { title: "Tracks or tires", text: "Track loaders are heavier and load differently than wheeled units." },
      { title: "Loading", text: "Running units drive on. Non-running units need a tilt trailer or loader on site." },
    ],
    faqs: [
      { q: "How fast can you move a skid steer?", a: "Often within days. Skid steers fit many trailer types, so carriers are easier to match on most lanes." },
      { q: "Can attachments ship with the machine?", a: "Yes. Secured attachments typically ride on the same trailer; we confirm the total weight so nothing is over the limit." },
    ],
    keywords: ["skid steer transport", "skid steer shipping", "compact track loader transport", "skid steer hauling"],
    related: ["excavator-transport", "forklift-transport", "construction-equipment-transport", "bulldozer-transport"],
  },
  {
    slug: "bulldozer-transport",
    kind: "service",
    parent: "construction-equipment-transport",
    name: "Bulldozer Transport",
    short: "Crawler dozers, blades and rippers, heavy haul",
    icon: "bulldozer",
    title: "Bulldozer Transport Nationwide | MCC Bound Legends",
    description:
      "Bulldozer hauling coordination for crawler dozers of every class. Lowboy and RGN trailers, blade and ripper handling, oversize permits and escorts arranged.",
    eyebrow: "Bulldozer Transport",
    h1: "Bulldozer Transport on Lowboy and RGN Trailers, Permits Handled",
    intro:
      "Dozers are heavy, wide and unforgiving of guesswork. MCC Bound Legends coordinates bulldozer transport with heavy-haul carriers, plans for the blade and ripper, and arranges the permits and escorts a wide load requires.",
    formDefault: "construction",
    vehicles: ["Small and mid-size crawler dozers", "Large dozers requiring multi-axle RGN", "Dozers with blades, rippers and winches", "Wheel dozers", "Dozers from auctions, dealers and job sites"],
    equipment: ["Lowboy trailers", "RGN and multi-axle heavy haul trailers", "Oversize and overweight permits, pilot cars", "Blade removal coordination when width requires it"],
    considerations: [
      { title: "Blade width", text: "Blades often push a dozer over 8'6\" wide. Sometimes the blade is angled or removed to reduce permits." },
      { title: "Weight and axle limits", text: "Heavy dozers need multi-axle trailers to stay within per-axle limits in each state on the route." },
      { title: "Loading", text: "Dozers usually walk onto an RGN under their own power. Non-running units require a crane or loader." },
    ],
    faqs: [
      { q: "Does the blade have to come off?", a: "Not always. It depends on width and the states on the route. We calculate whether removing or angling the blade reduces permit cost enough to be worth it." },
      { q: "How much does bulldozer transport cost?", a: "It depends on weight, width, distance and permits. Send the model and we quote from the actual specifications." },
    ],
    keywords: ["bulldozer transport", "dozer hauling", "bulldozer shipping", "heavy equipment hauling"],
    related: ["excavator-transport", "heavy-equipment-transport", "construction-equipment-transport", "skid-steer-transport"],
  },
  {
    slug: "forklift-transport",
    kind: "service",
    parent: "construction-equipment-transport",
    name: "Forklift Transport",
    short: "Warehouse, rough-terrain and telehandler moves",
    icon: "forklift",
    title: "Forklift Transport & Shipping | MCC Bound Legends",
    description:
      "Forklift and telehandler transport coordination nationwide. Warehouse forklifts, rough-terrain lifts and telehandlers moved on flatbed, step deck or hotshot carriers.",
    eyebrow: "Forklift Transport",
    h1: "Forklift & Telehandler Transport for Warehouses, Dealers and Job Sites",
    intro:
      "Forklifts are compact but dense, and mast height catches people out. MCC Bound Legends coordinates forklift and telehandler transport from the collapsed mast height and true weight, with carriers who know how to secure them.",
    formDefault: "construction",
    vehicles: ["Warehouse and electric forklifts", "IC and diesel forklifts", "Rough-terrain forklifts", "Telehandlers", "Reach trucks and order pickers (crated)", "Multiple units for dealers and rental fleets"],
    equipment: ["Hotshot and flatbed trailers", "Step deck for tall masts and telehandlers", "Liftgate or dock loading for warehouse units", "Crating for electric and narrow-aisle units"],
    considerations: [
      { title: "Mast height", text: "Measured with the mast fully lowered. Tall masts may need a step deck." },
      { title: "Weight", text: "Forklifts weigh more than they look. Counterweights matter for trailer choice." },
      { title: "Loading", text: "A dock or ramp is ideal. Without one, we plan a liftgate or a second forklift." },
    ],
    faqs: [
      { q: "Can you ship an electric forklift?", a: "Yes. Electric units are often crated or loaded via dock. We confirm battery handling and charging requirements before pickup." },
      { q: "Do you move telehandlers?", a: "Yes, on step deck or lowboy trailers depending on boom height and weight." },
    ],
    keywords: ["forklift transport", "forklift shipping", "telehandler transport", "forklift hauling"],
    related: ["skid-steer-transport", "construction-equipment-transport", "heavy-equipment-transport", "commercial-vehicle-transport"],
  },
];

/* ───────────────────────────── helpers ───────────────────────────── */

export const categories = pages.filter((p) => p.kind === "category");
export const getPage = (slug: string) => pages.find((p) => p.slug === slug);
export const childrenOf = (slug: string) => pages.filter((p) => p.parent === slug);
export const situations = pages.filter((p) => p.kind === "situation");
export const brokerNote = TRUST_NOTE;

/** Future expansion list — displayed as "also coordinated", NOT built as pages until data justifies it. */
export const futurePages = [
  "Cargo Van Transport", "Bus Transport", "Travel Trailer Transport", "Fifth Wheel Transport",
  "ATV & UTV Transport", "Backhoe Transport", "Wheel Loader Transport", "Industrial Machinery Transport",
  "Agricultural Equipment Transport",
];

/** Best-fit silhouette for a free-text vehicle/equipment label. */
export function iconFor(label: string, fallback: IconKey): IconKey {
  const l = label.toLowerCase();
  const rules: [RegExp, IconKey][] = [
    [/without trailer|on blocks|in the water|dry storage/, "boatlift"], [/yacht|sportfish|cruiser|trawler|catamaran/, "yacht"],
    [/sail|pontoon|console|fishing|jet ski|watercraft|houseboat|powerboat|speedboat|bay boat|runabout|boat/, "boat"],
    [/excavator/, "excavator"], [/skid|track loader|stand-on/, "skidsteer"], [/dozer/, "bulldozer"], [/forklift|telehandler|reach truck|order picker/, "forklift"],
    [/crane|roller|compactor|grader|trencher|backhoe|wheel loader|tractor(?!s,)|combine|sprayer|generator|transformer|press|machinery|industrial|manufacturing|oversized|crated|agricultural|farm/, "industrial"],
    [/box truck|straight truck|cube|refrigerated|lift-gate|moving/, "boxtruck"], [/semi|day cab|sleeper|glider|tractor/, "semi"],
    [/utility|service body|bucket|boom|mechanic|crane truck|cab-and-chassis|chassis|dump|landscape|plumbing|hvac|work truck/, "worktruck"],
    [/van|bus|shuttle|fleet|dealer|rental|lease|relocation|inventory|company/, "fleet"],
    [/motorhome|class a|class b|class c|travel trailer|fifth wheel|toy hauler|camper|park model|rv/, "rv"],
    [/motorcycle|cruiser|sport bike|touring|trike|dirt bike|dual sport|atv|utv|quad|side-by-side|golf cart|lsv|snowmobile|powersport/, "motorcycle"],
    [/non-running|non-starting|salvage|damaged|inoperable|project|barn|do not roll|collision/, "nonrunning"], [/auction|lot|insurance-auction/, "auction"],
    [/classic|antique|exotic|luxury|restoration|show car|collector|supercar|low-clearance|modified|lifted/, "enclosed"],
    [/car|sedan|suv|crossover|pickup|truck/, "car"],
  ];
  for (const [re, icon] of rules) if (re.test(l)) return icon;
  return fallback;
}
