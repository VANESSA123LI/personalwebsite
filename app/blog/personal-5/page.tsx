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
        </div>
      </div>
    </main>
  );
}

