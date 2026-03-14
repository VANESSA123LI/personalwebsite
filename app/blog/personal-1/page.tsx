import Link from "next/link";

export default function PersonalBlog1() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Reflections on Personal Growth</h1>
          <p className="text-gray-600">January 15, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Personal growth is a journey that never truly ends. Over the past year, I&apos;ve learned 
            valuable lessons about myself, my goals, and what truly matters to me. This post explores 
            some of those reflections and the insights I&apos;ve gained along the way.
          </p>
          <p>
            One of the most important realizations has been the value of taking time for self-reflection. 
            In our busy lives, it&apos;s easy to get caught up in the day-to-day without pausing to consider 
            the bigger picture. Setting aside time for introspection has helped me make more intentional 
            decisions and stay aligned with my values.
          </p>
        </div>
      </div>
    </main>
  );
}

