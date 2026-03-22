import Link from "next/link";

export default function WorldBlog5() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <div className="mb-8">
          <Link href="/blog" className="text-lg mb-4 inline-block">
            ← Back to Blog
          </Link>
          <p className="text-sm text-black/60 mb-2">World</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">Goodhart&apos;s Law</h1>
          <p className="text-black/60 mb-2">
            When a measure becomes a target, it ceases to be a good measure.
          </p>
          <p className="text-black/60">Vanessa Li · May 27, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            During British rule in India around the 18th century, the colonial
            government was concerned about venomous cobra snakes in India. The
            government decided to incentivize the citizens to kill the cobras in
            order to reduce its population by handing out rewards for every dead
            cobra. As time went by, however, individuals began breeding cobras
            for the purpose of killing them to collect the reward. When the
            government officials realized what was happening, they scrapped the
            reward program. Consequently, the cobra breeders, finding no further
            use for their now worthless snakes, released them into the wild,
            resulting in an even larger cobra population than before the rewards
            program started.
          </p>

          <p>
            This cobra effect is a prime example of the Goodhart Law:
            &quot;When a measure becomes a target, it ceases to be a good
            measure.&quot;
          </p>

          <p>
            A lot of things in life that we chase are the wrong targets, and
            that&apos;s how we wind up being unhappy.
          </p>

          <p>
            GPA was designed to be a measurement, but it became the target for
            many in college. My classmates would take &quot;gut classes&quot;
            for the easy A to boost their GPA, giving up the opportunity to have
            a better education in other classes. Similarly in high school, the
            number of AP classes were maximized over the quality of education.
            Since that was what colleges cared about, high school students would
            do anything to increase their statistics. I often wished that I
            could just learn without consequences, that I don&apos;t have to
            give up the time to explore a topic for memorizing exam contents.
            There is just not enough time for everything, and if GPA is the
            measurement I was supposed to care about, it will always be
            prioritized over other things.
          </p>

          <p>
            The summer of 2019 was the best summer of my life. I was in the
            Summer Science Program, which was a six-week residential program for
            students to conduct research. I did biochemistry research. There was
            so much to learn and I had nothing to worry about. The only job I
            had was to learn as much as I could. I soaked up knowledge from the
            lectures and played around with proteins, bacteria, and pipettes in
            the lab. There was no measurement whatsoever. I had so much fun and
            there were no grades to worry about.
          </p>

          <p>
            I&apos;m not suggesting that we eliminate measurements entirely, but
            rather that we ensure we&apos;re using the right ones. As time went
            on in college, I came to realize that GPA is the wrong target. What
            really mattered is what I know. The only thing I should compare
            myself to is who I was yesterday.
          </p>

          <p>
            The biggest warning sign of Goodhart&apos;s Law is relying on a
            single measurement. Statistics always get more accurate with more
            variables. That&apos;s why people who think that having a certain
            level of wealth will make them happy often end up miserable. A good
            target always includes a set of thoughtful measurements.
          </p>

          <p>
            Spend more time thinking about decisions that matter, about what to
            really focus on. There is nothing worse than running in the wrong
            direction. Failing to carefully consider the targets of your life
            risks waking up one day to the realization that all your efforts
            have been misdirected.
          </p>
        </div>
      </div>
    </main>
  );
}
