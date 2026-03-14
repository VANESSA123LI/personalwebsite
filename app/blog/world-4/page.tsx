import Link from "next/link";

export default function WorldBlog4() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Global Education Revolution</h1>
          <p className="text-gray-600">February 20, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Education systems worldwide are undergoing significant transformation. Online learning, 
            personalized curricula, and new teaching methodologies are making quality education more 
            accessible than ever before.
          </p>
          <p>
            This post examines how education is evolving globally and the opportunities this creates 
            for learners everywhere. The democratization of knowledge is one of the most exciting 
            developments of our time.
          </p>
        </div>
      </div>
    </main>
  );
}

