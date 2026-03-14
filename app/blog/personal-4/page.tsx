import Link from "next/link";

export default function PersonalBlog4() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <div className="mb-8">
          <Link href="/blog" className="text-lg mb-4 inline-block">← Back to Blog</Link>
          <p className="text-sm text-gray-600 mb-2">Personal</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">Lessons from Failure</h1>
          <p className="text-gray-600">February 15, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Failure is an uncomfortable but essential teacher. Throughout my journey, I&apos;ve encountered 
            setbacks and disappointments that, while difficult at the time, have provided some of my 
            most valuable learning experiences.
          </p>
          <p>
            This post reflects on specific failures and what they taught me about resilience, adaptability, 
            and the importance of maintaining perspective. Sometimes the best growth comes from our 
            toughest moments.
          </p>
        </div>
      </div>
    </main>
  );
}

