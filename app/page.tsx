import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-8">
        <h1 className="text-2xl font-bold">Hi, I&apos;m Vanessa.</h1>
        <Link href="/blog" className="text-lg">Blog</Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Welcome to my personal website. This is a space for my thoughts,
          projects, and things I find interesting.
        </p>

        <p>
          I&apos;m always open to chatting. The best way to reach me is at{" "}
          <a href="mailto:hello@example.com">vanessa.li@harvey.ai</a>.
        </p>
      </div>

      <div className="mt-12 space-y-1 text-lg">
        <a href="#" className="block">Twitter</a>
        <a href="https://www.linkedin.com/in/vanessa1li" className="block">LinkedIn</a>
        <a href="https://github.com/VANESSA123LI" className="block">GitHub</a>
      </div>
    </main>
  );
}
