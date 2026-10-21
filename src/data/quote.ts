import type { ShipType } from "./services";

/**
 * Quote form configuration.
 * Each ship type declares which optional field groups it needs, so the form can
 * show dimension / trailer / attachment fields only when relevant (client requirement).
 */
export type FieldGroup = "vehicle" | "dimensions" | "trailer" | "attachments" | "loading";

export type ShipOption = {
  value: ShipType;
  label: string;
  group: string;
  fields: FieldGroup[];
};

export const shipOptions: ShipOption[] = [
  { value: "car",              label: "Car / Sedan",                       group: "Auto",       fields: ["vehicle"] },
  { value: "suv-pickup",       label: "SUV / Pickup Truck",                group: "Auto",       fields: ["vehicle"] },
  { value: "classic-exotic",   label: "Classic / Exotic / Luxury Car",     group: "Auto",       fields: ["vehicle"] },
  { value: "commercial-truck", label: "Box / Work / Commercial Truck",     group: "Commercial", fields: ["vehicle", "dimensions"] },
  { value: "semi-tractor",     label: "Semi Tractor (Day Cab / Sleeper)",  group: "Commercial", fields: ["vehicle", "dimensions"] },
  { value: "van-bus",          label: "Cargo Van / Bus / Shuttle",         group: "Commercial", fields: ["vehicle", "dimensions"] },
  { value: "boat-trailer",     label: "Boat With Trailer",                 group: "Marine",     fields: ["vehicle", "dimensions"] },
  { value: "boat-no-trailer",  label: "Boat Without Trailer",              group: "Marine",     fields: ["vehicle", "dimensions", "loading"] },
  { value: "yacht",            label: "Yacht / Large Vessel",              group: "Marine",     fields: ["vehicle", "dimensions", "loading"] },
  { value: "motorhome",        label: "Motorhome (Class A / B / C)",       group: "RV",         fields: ["vehicle", "dimensions"] },
  { value: "towable-rv",       label: "Travel Trailer / Fifth Wheel",      group: "RV",         fields: ["vehicle", "dimensions"] },
  { value: "motorcycle",       label: "Motorcycle",                        group: "Powersports", fields: ["vehicle"] },
  { value: "powersports",      label: "ATV / UTV / Golf Cart",             group: "Powersports", fields: ["vehicle"] },
  { value: "construction",     label: "Construction Equipment",            group: "Equipment",  fields: ["vehicle", "dimensions", "trailer", "attachments", "loading"] },
  { value: "heavy-industrial", label: "Heavy / Industrial Machinery",      group: "Equipment",  fields: ["vehicle", "dimensions", "trailer", "attachments", "loading"] },
  { value: "other",            label: "Something Else",                    group: "Other",      fields: ["vehicle", "dimensions"] },
];

export const shipGroups = Array.from(new Set(shipOptions.map((o) => o.group)));
export const getShipOption = (v: string | undefined) => shipOptions.find((o) => o.value === v);

/** SMS consent text, verbatim from the client's revision checklist (website_revisions.pdf §2, 2026-10-21).
 *  The form appends "Please review our Privacy Policy and Terms & Conditions." with both as links. */
export const smsConsent =
  "By checking this box, I agree to receive SMS messages from MCC Bound Legends LLC at the number provided. Message frequency varies. Message and data rates may apply. Reply HELP for assistance or STOP to opt out.";
