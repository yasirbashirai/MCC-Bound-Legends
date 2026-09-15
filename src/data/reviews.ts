/**
 * REAL reviews only, taken verbatim from the company's public Google reviews
 * (as displayed on the current mccboundlegends.com) and its public Trustpilot page
 * (trustpilot.com/review/mccboundlegends.com, checked 2026-09-15). Never add fabricated reviews.
 */
export type Review = { name: string; text: string; service: string; source: "Google" | "Trustpilot" };

export const reviews: Review[] = [
  { name: "Christopher Smith", service: "Boat Transport", source: "Google",
    text: "Had my boat transported safely from California to Massachusetts with no issues at all. MCC Bound Legends provided great communication, a smooth process, and everything arrived on time and in perfect condition. Highly recommend them!" },
  { name: "Jennifer K.", service: "RV Transport", source: "Google",
    text: "They made the entire RV transport process smooth. They were honest, responsive, and kept me informed throughout the entire process. I would definitely recommend MCC Bound Legends to anyone looking for reliable RV transport service!" },
  { name: "Joshua Flowers", service: "Auto Transport", source: "Google",
    text: "Very professional, picked up and dropped off within my time frame I requested. Also checked in through the route and sent additional pictures to secure my mind. 6/5 stars. Would use again or recommend." },
  { name: "Sally Sampath", service: "Multi-Vehicle Transport", source: "Google",
    text: "Highly recommend MCC Bound Legends and Jeff! Definitely will be using MCC in the future for all shipping needs. Professional, reliable and knowledgeable, that's Jeff. Excellent customer service! Several vehicles shipped in 2 days, you will not be disappointed!" },
  { name: "Manuel Concepcion", service: "Auto Transport", source: "Google", text: "Great service, I highly recommend it." },
  { name: "Noel Schuyler", service: "Auto Transport", source: "Google", text: "It was very professional and proper." },
  { name: "Alex A.", service: "Auto Transport", source: "Google", text: "Excellent customer service." },
  { name: "John Massy", service: "Boat & Vehicle Transport", source: "Google",
    text: "MCC Bound Legends was professional, reliable, and easy to work with. They provided great pricing, excellent service, and made my boat and vehicle transport process smooth and stress-free. I highly recommend them for all your transport needs!" },
  // Trustpilot (verbatim)
  { name: "Malik", service: "Boat Transport", source: "Trustpilot",
    text: "Excellent Service from Start to Finish! I recently used this broker to transport my boat and I couldn't be happier with the experience. From the first call to final delivery, everything was handled professionally and efficiently. They kept me updated throughout the entire process, answered all my questions, and made sure my boat arrived on time and in perfect condition. The driver was courteous and clearly experienced with high-value transports. If you're looking for a reliable broker who truly cares about your investment, I highly recommend them. I'll definitely be using their services again!" },
  { name: "Anna Carlson", service: "Boat Transport", source: "Trustpilot",
    text: "MCC Bound Legends is an excellent company. The driver was so very nice and went over and beyond for us to make sure he got our boat here safely. I will definitely use them in the future for any shipping needs." },
  { name: "Emmanuel Rosario", service: "Boat Transport", source: "Trustpilot",
    text: "Jeff at MCC bound Legends was great! Full transparency and great comunication with assistance with transporting my boat. Will use again!! Highly recommend!!!" },
];

/** Boat-page review row: the four real boat-transport reviews (excerpted where long, marked with …). */
export const boatReviews: (Review & { excerpt?: string })[] = [
  reviews.find((r) => r.name === "Christopher Smith")!,
  { ...reviews.find((r) => r.name === "Malik")!, excerpt: "Excellent Service from Start to Finish! I recently used this broker to transport my boat and I couldn't be happier with the experience… They kept me updated throughout the entire process… and made sure my boat arrived on time and in perfect condition." },
  reviews.find((r) => r.name === "Anna Carlson")!,
  reviews.find((r) => r.name === "Emmanuel Rosario")!,
];

export const featuredReviews = reviews.slice(0, 3);
