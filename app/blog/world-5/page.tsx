import Link from "next/link";

export default function WorldBlog5() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Cultural Exchange in the Digital Age</h1>
          <p className="text-gray-600">March 1, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            The internet has made it easier than ever to connect with people from different cultures 
            and backgrounds. This unprecedented level of global connectivity is reshaping how we 
            understand and interact with the world.
          </p>
          <p>
            This post explores how digital platforms are facilitating cultural exchange and what this 
            means for global understanding. While challenges exist, the opportunities for cross-cultural 
            learning and collaboration are remarkable.
          </p>
        </div>
      </div>
    </main>
  );
}

