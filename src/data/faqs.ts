import type { FAQ } from "./services";

/** Site-wide FAQ. Brokerage-accurate. No guaranteed dates, no insurance claims on MCC's behalf. */
export const generalFaqs: { group: string; items: FAQ[] }[] = [
  {
    group: "Booking & Pricing",
    items: [
      { q: "How do I get a quote?", a: "Use the quote form on any page or call (888) 785-0028. Tell us what you are shipping, the pickup and delivery ZIP codes and your preferred date. For commercial vehicles, boats and equipment we also ask for dimensions and weight so the quote is accurate the first time." },
      { q: "Is there a deposit to book?", a: "No. You book with no deposit. Payment is arranged once a vetted carrier has been assigned to your shipment." },
      { q: "Why do quotes vary so much between companies?", a: "Some companies advertise a low number to win the booking and then raise it when no carrier will take the load at that price. We quote from real market rates for your lane and your specific vehicle or equipment, so the number holds." },
      { q: "What payment methods do you accept?", a: "Major credit and debit cards, bank transfers and certified payment options depending on the shipment. Details are confirmed when your carrier is assigned." },
    ],
  },
  {
    group: "How Transport Works",
    items: [
      { q: "Is MCC Bound Legends the carrier or a broker?", a: "MCC Bound Legends LLC is a licensed and bonded freight broker (USDOT 4464266, MC 1760960). We coordinate your shipment and dispatch a vetted motor carrier who performs the physical transport. That structure gives you access to specialized equipment nationwide with one point of contact." },
      { q: "How do you choose the carrier?", a: "By equipment fit, safety record, operating authority and insurance. We verify the carrier's insurance before dispatch, every time." },
      { q: "Is door-to-door service available?", a: "Yes, wherever a carrier can legally and safely reach. For narrow residential streets or gated communities, the driver may arrange a nearby meeting point such as a large parking lot." },
      { q: "Can you guarantee a pickup or delivery date?", a: "We give you a realistic pickup window and estimated transit time, and we keep you updated. Exact dates depend on the carrier's route, weather and traffic, so we do not promise a guaranteed date unless it has been specifically confirmed with the assigned carrier." },
      { q: "How will I know where my shipment is?", a: "Your coordinator provides updates by phone, text or email from pickup through delivery, and you can reach us directly during business hours." },
    ],
  },
  {
    group: "Insurance & Protection",
    items: [
      { q: "Is my vehicle or equipment insured in transit?", a: "The motor carrier performing the transport carries cargo insurance, and we verify that coverage before dispatch. As a broker, MCC Bound Legends does not itself provide cargo insurance, but we will provide the carrier's certificate on request and assist you if a claim is ever needed." },
      { q: "What happens at pickup and delivery?", a: "The driver completes a condition report (bill of lading) with you at pickup, noting any existing damage, and repeats it at delivery. Review it carefully and take your own photos; it is the document that protects you." },
    ],
  },
  {
    group: "Preparing Your Shipment",
    items: [
      { q: "How should I prepare a car for transport?", a: "Wash it so the inspection is accurate, leave about a quarter tank of fuel, remove toll tags and loose items, note any existing damage, and have a set of keys ready for the driver." },
      { q: "How should I prepare a boat?", a: "Remove or secure canvas, antennas and electronics, drain water systems, secure hatches and loose gear, and shrink wrap if desired. We send a specific checklist with your booking." },
      { q: "How should I prepare equipment?", a: "Confirm whether it runs, lower or fold booms and masts, secure attachments, and let us know what loading equipment is available on site." },
    ],
  },
];
