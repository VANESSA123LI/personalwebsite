import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      {/* ---- Top navigation ---- */}
      <nav className="mx-auto max-w-2xl px-6 pt-10 flex justify-end items-baseline gap-6 text-lg">
        <Link href="/blog" className="link-plain">
          Blogs
        </Link>
        <Link href="/projects" className="link-plain">
          Projects
        </Link>
      </nav>

      {/* ---- Heading ---- */}
      <header className="mx-auto max-w-2xl px-6 pt-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)]">
          Hi, I&apos;m Vanessa.
        </h1>
      </header>

      {/* ---- Body ---- */}
      <section className="mx-auto max-w-2xl px-6 pt-8 space-y-6 text-lg leading-relaxed">
        <p>
          Welcome to my personal website. This is a space for my thoughts,
          projects, and things I find interesting. This is a minimalist website
          just like me.
        </p>

        <p>
          I am currently an explorer at{" "}
          <a href="https://www.savantvc.com/" target="_blank" rel="noopener noreferrer">
            Savant
          </a>
          , a community of founders embarking on hardware quests. I was accepted to join{" "}
          <a
            href="https://www.ycombinator.com/verify/rei5gdcejhyco2d9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Y Combinator
          </a>{" "}
          but have decided to postpone my batch date. On the investing side, I am a scout for{" "}
          <a href="https://www.zettavp.com/" target="_blank" rel="noopener noreferrer">
            Zetta Venture Partners
          </a>
          , an AI-native VC firm investing in pre-seed/seed stage. I am also a
          member of{" "}
          <a
            href="https://www.linkedin.com/company/velocityeleven/about/"
            target="_blank"
            rel="noopener noreferrer"
          >
            V11
          </a>
          , a talent community of builders. I have angel invested in a few
          companies. I was previously in the female founders{" "}
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
          A few years ago I decided to take a gap year in college to tinker and
          ended up spending a year working at SpaceX, where I implemented a
          refurbishment program for returned Starlink antennas and routers which
          saved the company millions of dollars in printed circuit board costs,
          the most expensive component.
        </p>

        <p>
          In college, I ran the Yale Undergraduate Venture Group and grew it to
          70+ members. I was a frequent visitor of{" "}
          <a href="https://www.elminstitute.org/" target="_blank" rel="noopener noreferrer">
            The Elm Institute
          </a>
          , where I discussed philosophy and divinity at Yale.
        </p>

        <p>
          I was a first-gen immigrant who knew nothing about the US before
          moving here. Now I am happy to call San Francisco home.
        </p>
      </section>

      {/* ---- Social links ---- */}
      <section className="mx-auto max-w-2xl px-6 pt-10">
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-lg">
          <a href="https://github.com/VANESSA123LI" className="link-plain">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vanessa1li" className="link-plain">
            LinkedIn
          </a>
          <a href="https://www.x.com/cyvanessali" className="link-plain">
            Twitter
          </a>
        </div>
      </section>

      {/* ---- The sky deepens and the painting rises out of it ---- */}
      <div className="sky-fade" aria-hidden="true" />

      <figure className="painting">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/persistence-of-memory.jpg"
          alt="The Persistence of Memory, Salvador Dalí's 1931 Surrealist oil painting of melting clocks in a luminous Catalan landscape"
        />
        <figcaption>
          <span className="work">The Persistence of Memory</span>
          <br />
          Salvador Dalí
           {/* &middot; 1931 &middot; Museum of Modern Art, New York */}
        </figcaption>
      </figure>

      <Link
        href="/playground"
        className="playground-chip fixed bottom-6 right-6 z-20 text-lg"
      >
        Playground
      </Link>
    </main>
  );
}
