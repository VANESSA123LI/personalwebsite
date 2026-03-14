import Link from "next/link";

export default function PersonalBlog5() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">The Power of Curiosity</h1>
          <p className="text-gray-600">February 25, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Curiosity has been a driving force in my life. It&apos;s what led me to explore new fields, 
            ask questions, and continuously learn. This innate desire to understand has opened doors 
            I never expected.
          </p>
          <p>
            In this post, I explore how cultivating curiosity has impacted my personal and professional 
            development, and share thoughts on how we can all nurture this quality in ourselves.
          </p>
        </div>
      </div>
    </main>
  );
}

