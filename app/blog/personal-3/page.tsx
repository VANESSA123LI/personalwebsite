import Link from "next/link";

export default function PersonalBlog3() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Finding Balance in Life</h1>
          <p className="text-gray-600">February 5, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Balance is something I&apos;ve been working on for a while. Between work, personal projects, 
            relationships, and self-care, finding the right equilibrium can be challenging.
          </p>
          <p>
            I&apos;ve learned that balance doesn&apos;t mean equal time for everything, but rather ensuring 
            that the important aspects of life receive appropriate attention. Sometimes that means saying 
            no, and sometimes it means being fully present in whatever I&apos;m doing.
          </p>
        </div>
      </div>
    </main>
  );
}

