import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-8">
        <div className="ml-auto flex items-baseline gap-4">
          <Link href="/blog" className="text-lg">
            Blog
          </Link>
          {/* <Link href="/services" className="text-lg">
            Services
          </Link> */}
          <Link href="/projects" className="text-lg">
            Projects
          </Link>
          <Link href="/faqs" className="text-lg">
            FAQs
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
      <h1 className="text-2xl font-bold">Hi, I&apos;m Vanessa.</h1>
        <p>
          Welcome to my personal website. This is a space for my thoughts,
          projects, and things I find interesting.
        </p>

        <p>
          I&apos;m always open to chatting. Email me at{" "}
          <a href="mailto:hello@example.com">vanessali767@gmail.com</a>.
        </p>
      </div>

      <div className="mt-12 space-y-1 text-lg">
        <a href="https://github.com/VANESSA123LI" className="block">GitHub</a>
        <a href="https://www.linkedin.com/in/vanessa1li" className="block">LinkedIn</a>
        <a href="https://www.x.com/cyvanessali" className="block">Twitter</a>
      </div>

      <Link
        href="/playground"
        className="fixed bottom-6 right-6 z-10 text-lg"
      >
        Playground
      </Link>
    </main>
  );
}
