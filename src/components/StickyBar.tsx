"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/data/site";
import { Phone, Arrow } from "./Icons";
import { PhoneLink } from "./PhoneLink";

/** Mobile-only fixed bar: call + quote. Client requirement. Hidden on the quote page itself. */
export function StickyBar() {
  const path = usePathname();
  const router = useRouter();
  if (path === "/get-a-quote/" || path === "/thank-you/") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-white/10 bg-navy-900 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-10px_rgb(0_0_0/0.5)] lg:hidden">
      <PhoneLink location="sticky_bar" className="btn-blue py-3 text-[15px]"><Phone className="h-4.5 w-4.5" /> Call {site.phone}</PhoneLink>
      <Link href="#quote" className="btn-orange py-3 text-[15px]" onClick={(e) => { if (!document.getElementById("quote")) { e.preventDefault(); router.push("/get-a-quote/"); } }}>Get a Quote <Arrow className="h-4 w-4" /></Link>
    </div>
  );
}
