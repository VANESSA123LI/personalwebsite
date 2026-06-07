import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-8">
        <div className="ml-auto flex items-baseline gap-4">
          <Link href="/blog" className="text-lg">
            Blogs
          </Link>
          {/* <Link href="/services" className="text-lg">
            Services
          </Link> */}
          <Link href="/projects" className="text-lg">
            Projects
          </Link>
          <Link href="/faqs" className="text-lg">
          {/* temporarily hide FAQs */}
            {/* FAQs */}
          </Link>
        </div>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
      <h1 className="text-2xl font-bold">Hi, I&apos;m Vanessa.</h1>
        <p>
          Welcome to my personal website. This is a space for my thoughts,
          projects, and things I find interesting. This is a minimalist website
          just like me.
        </p>

        <p>
          I am currently an explorer at{" "}
          <a
            href="https://www.savantvc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Savant
          </a>
          , a community of founders embarking on hardware quests. I am a scout for{" "}
          <a
            href="https://www.zettavp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zetta Venture Partners
          </a>{""}
          , an AI-native VC firm investing in pre-seed/seed stage. I am
          also a member of {" "}
          <a href="https://www.linkedin.com/company/velocityeleven/about/" 
          target="_blank" 
          rel="noopener noreferrer"
          >
          V11
          </a>{""}
           , a talent community of builders. I have angel invested
          in a few companies. I was previously in the female founders{" "}
          <a
            href="https://pear.vc/programs/female-founder-circles/"
            target="_blank"
            rel="noopener noreferrer"
          >
            circle
          </a>{" "}
          at Pear VC.
        </p>

        <p>
          A few years ago I decided to take a gap year in college to tinker and ended up spending a year working at SpaceX, where I implemented a refurbishment
          program for returned Starlink antennas and routers which saved the company
          millions of dollars in printed circuit board costs, which was the most expensive component.
        </p>

        <p>
          In college, I ran the Yale Undergraduate Venture Group and grew it to
          70+ members. I was a frequent visitor of{" "}
          <a
            href="https://www.elminstitute.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Elm Institute
          </a>{""}
          , where I discussed philosophy and divinity at Yale. 
        </p>

        <p>
          I was a first-gen immigrant who knew nothing about the US before
          moving here. Now I am happy to call San Francisco home. 
        </p>

        {/* <p>
          I struggled with clinical depression and founded a mental health
          initiative many years ago that gained city-wide attention and became
          an annual city festival that lasts til this day.
        </p> */}

        {/* <p>
          I&apos;m always open to chatting. Email me at{" "}
          <a href="mailto:hello@example.com">vanessali767@gmail.com</a>.
        </p> */}
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
