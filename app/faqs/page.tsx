import Link from "next/link";

export default function FAQs() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">FAQs</h1>

      <div className="text-lg leading-relaxed border-t border-gray-200">
        <details className="group border-b border-gray-200 py-5">
          <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
            <span>Where are you based?</span>
            <span className="ml-2 shrink-0 text-base transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-700">San Francisco! Sometimes I travel to NYC and LA.</p>
        </details>

        <details className="group border-b border-gray-200 py-5">
          <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
            <span>How tall are you?</span>
            <span className="ml-2 shrink-0 text-base transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-700">5&apos;2</p>
        </details>


{/* 
        <details className="group border-b border-gray-200 py-5">
          <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
            <span> Where are you from?</span>
            <span className="ml-2 shrink-0 text-base transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-700">eastern hemisphere</p>
        </details>

 */}



        <details className="group border-b border-gray-200 py-5">
          <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
            <span>Why do you do what you do?</span>
            <span className="ml-2 shrink-0 text-base transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-700">For the glory of God</p>
        </details>

        {/* <details className="group border-b border-gray-200 py-5">
          <summary className="cursor-pointer list-none flex justify-between items-center gap-4">
            <span>Who inspired you?</span>
            <span className="ml-2 shrink-0 text-base transition-transform duration-300 group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-gray-700">To be answered</p>
        </details> */}
      </div>
    </main>
  );
}
