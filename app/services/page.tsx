import Link from "next/link";
import { ServicesGrid } from "./services-grid";

export default function Services() {
  return (
    <main className="relative mx-auto max-w-4xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <header className="mb-12 max-w-2xl">
        <h1 className="text-2xl font-bold text-[#111]">Services</h1>
        <p className="mt-3 text-lg leading-relaxed text-black/70">
 
        </p>
      </header>

      <ServicesGrid />
    </main>
  );
}
