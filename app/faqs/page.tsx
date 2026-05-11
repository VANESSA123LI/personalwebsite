import Link from "next/link";

export default function FAQs() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <div className="space-y-8 text-lg leading-relaxed">
        <h1 className="text-2xl font-bold">FAQs</h1>

        <div className="space-y-2">
          <h2 className="font-semibold">Question 1?</h2>
          <p>Placeholder answer for the first question.</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Question 2?</h2>
          <p>Placeholder answer for the second question.</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Question 3?</h2>
          <p>Placeholder answer for the third question.</p>
        </div>
      </div>
    </main>
  );
}
