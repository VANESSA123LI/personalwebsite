import Link from "next/link";

export default function PersonalBlog2() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Building Healthy Habits</h1>
          <p className="text-gray-600">January 25, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Developing consistent habits has been transformative for my daily life. Whether it&apos;s 
            morning routines, exercise, or dedicated learning time, small daily actions compound into 
            significant changes over time.
          </p>
          <p>
            The key, I&apos;ve found, is starting small and being patient with the process. It&apos;s not 
            about perfection but about showing up consistently, even when motivation is low. This post 
            shares some strategies that have worked for me.
          </p>
        </div>
      </div>
    </main>
  );
}

