/**
 * REAL reviews only, taken verbatim from the company's public Google reviews
 * (as displayed on the current mccboundlegends.com). Never add fabricated reviews.
 */
export type Review = { name: string; text: string; service: string; source: "Google" };

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
];

export const featuredReviews = reviews.slice(0, 3);
