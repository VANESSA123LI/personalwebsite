import Link from "next/link";

export default function Contact() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-[#111]">Contact</h1>
      <p className="mt-6 text-lg leading-relaxed text-black/80">
        For services and collaborations, reach me at{" "}
        <a href="mailto:vanessa.li@harvey.ai">vanessa.li@harvey.ai</a>.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-black/70">
        I read every message and will respond when I can.
      </p>
    </main>
  );
}
