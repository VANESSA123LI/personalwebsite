import Link from "next/link";

export default function WorldBlog3() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <div className="mb-8">
          <Link href="/blog" className="text-lg mb-4 inline-block">← Back to Blog</Link>
          <p className="text-sm text-gray-600 mb-2">World</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">The Future of Work</h1>
          <p className="text-gray-600">February 10, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            The nature of work is changing globally. Remote work, automation, and shifting economic 
            structures are reshaping how people earn a living and what careers look like.
          </p>
          <p>
            This post explores global trends in the future of work, from the rise of the gig economy 
            to the skills that will be most valuable in the coming decades. Understanding these shifts 
            helps us navigate an uncertain but exciting future.
          </p>
        </div>
      </div>
    </main>
  );
}

