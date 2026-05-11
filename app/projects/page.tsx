import Link from "next/link";

export default function Projects() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>
      https://www.bosondevelopers.com/
      <div className="flex min-h-[50vh] items-center justify-center text-lg leading-relaxed">
        <p>and other Stealth work coming soon</p>
      </div>
    </main>
  );
}
