import Link from "next/link";
import { Container } from "@/components/Container";
import { CategoryGrid } from "@/components/Sections";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <>
      <section className="hero-bg py-20 text-white"><Container className="text-center"><p className="eyebrow text-blue-300">404</p><h1 className="display mt-3 text-6xl">That page took a different route.</h1><p className="mt-4 text-white/70">Pick what you are shipping below, or head home.</p><Link href="/" className="btn-orange mt-6 px-6 py-3">Back to home <Arrow className="h-4 w-4" /></Link></Container></section>
      <section className="bg-cloud py-16"><Container><CategoryGrid /></Container></section>
    </>
  );
}
