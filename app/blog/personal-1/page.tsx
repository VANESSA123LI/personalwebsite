import Image from "next/image";
import Link from "next/link";

const OCCUPY_MARS_IMAGE =
  "https://substack-post-media.s3.amazonaws.com/public/images/e7b487b3-f16e-4aa7-8375-b01257c5e9d0_3088x2316.jpeg";

export default function PersonalBlog1() {
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
          <p className="text-sm text-black/60 mb-2">Personal</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">Occupying Mars</h1>
          <p className="text-black/60 mb-2">
            Why we should expand human consciousness in space.
          </p>
          <p className="text-black/60">Vanessa Li · May 2024</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            In the grand tapestry of the cosmos, humanity&apos;s existence is but
            a fleeting moment. Homo Sapiens has been around for 300,000 years,
            which is{" "}
            <a
              href="https://carnegiemnh.org/earth-history-in-your-hand/#:~:text=A%20long%20time%20ago%E2%80%A6,planet%20(4.5%20billion%20years)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              0.007%
            </a>{" "}
            of Earth&apos;s 4.5 billion-year timeline. Humanity is so fortunate
            to exist, but is vulnerable to extinction. Like a flickering candle
            flame, any gust of wind can extinguish the flame. History reminds us
            that any civilization could go extinct, as many once powerful
            empires have. Elon Musk founded SpaceX with the ambitious goal of
            enabling life on Mars, aiming to preserve the fragile and invaluable
            human consciousness.
          </p>

          <p>
            Occupying Mars goes beyond expanding our living space. Some may
            think that we have plenty of problems to worry about on earth, why
            bother with the extraterrestrial? The answer lies in the limitless
            possibilities in the outer world. There are known unknowns, and
            unknown unknown waiting for us ahead. Known unknowns are the things
            that we know that we don&apos;t know. Unknown unknowns are the
            things that we can&apos;t even imagine. There are mysteries that
            awaits us in the uncharted territories of the universe. And Our goal
            is nothing less than a complete description of the universe we live
            in (as Stephen Hawking said in The Brief History of Time). We
            won&apos;t fully understand the benefits of exploring the universe
            until we venture into the unknown and explore the boundaries of our
            familiar world. We might be able to find unexpected insights and
            groundbreaking knowledge. The journey towards that mission is a long
            and arduous one, but we are making progress. There is nothing
            engineering cannot achieve, and we are getting closer everyday.
          </p>

          <p className="font-medium">Ad Astra per Aspera.</p>

          <p>
            The global space economy has reached more than $500M in 2023 with
            private companies emerging as crucial drivers of space missions.
            Compared to federal agencies, private companies have proven to be
            more efficient in leading innovative initiatives, perhaps driven by
            a more fervent commitment to their missions and more effort to
            control cost. I am highly optimistic that startups are the powerhouse
            of innovation and that incumbent players must support them. As
            highlighted in{" "}
            <a
              href="https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              The Three-Body Problem
            </a>
            , science is humanity&apos;s greatest strength. To halt our progress,
            aliens (the San-Ti) had to kill our science. It becomes evident that
            our pursuit of innovation is paramount to our survival as a species.
          </p>

          <p>
            Driving down the launch expenses is the key to opening doors for
            sustainable exploration. SpaceX has done a great job in making
            rockets reusable. Startups are driven by the need to survive in a
            competitive market, so they are incentivized to minimize cost to
            keep themselves alive. The cost problem is best solved by private
            companies because federal agencies like NASA often fund projects
            based on government priorities rather than market forces, leading to
            less pressure to economize. Private companies also tend to be a
            leaner leadership (
            <a
              href="https://www.space.com/nasa-private-companies-moon-race.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              space.com
            </a>
            ). The collaboration between NASA and private firms is essential
            because it leverages NASA&apos;s regulatory framework with private
            sector&apos;s efficiency. Private companies are further driven to
            lower cost from NASA{" "}
            <a
              href="https://www.cnbc.com/2022/05/03/nasas-nelson-competitive-contracts-are-making-space-exploration-cheaper.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              fixed-price contracts
            </a>
            . Fixed-price contracts set a price upfront for what NASA is willing
            to pay for a project. SpaceX&apos;s starship, for example, operates
            under a fixed price deal with NASA. This arrangement motivates
            SpaceX to minimize project costs, allowing them to retain any
            savings as investment in other projects. Reducing the costs for
            space delivery is essential to making interplanetary life possible.
            There are industries yet to be created, such as fields like space
            agriculture, space medicine, interplanetary delivery, space tourism,
            space waste management, terraforming mars, asteroid mining, deep-space
            communication, and more. They all rely on sustainable transportation
            in outer space.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src="/images/falcon-rocket-launch-april-2024.jpg"
              alt="Falcon rocket launch on April 1st, 2024, seen from Southern California"
              width={500}
              height={281}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60">
              Falcon rocket launch on April 1st, 2024, seen from Southern
              California.
            </figcaption>
          </figure>

          <hr className="my-8 border-black/10" />

          <p>
            When I watched the Starship launch from SpaceX&apos;s mission control
            in the headquarters, I was swept away by waves of awe as it ascended
            to orbit. Carrying my little laptop with me and dressed in
            sweatpants from my sleep, I wanted to watch us taking a step further
            for humanity. There were around 60 employees gathered around the
            mission control room. All energetic and excited for the launch,
            despite being 5am and I knew that no one slept well. The countdown
            filled me with the same anticipation as the moment just before a
            roller coaster plunges down its first drop. 5,4,3,2,1… People
            rallied exuberantly. In that fleeting moment, we were united in
            wonder, witnessing the extraordinary power of space exploration.
          </p>

          <p>
            The flames formed bubbles of ashes that looked like dirty cotton
            candy, and up the rocket went. Plumes of exhaust trailed behind,
            swirling against the deepening sky. I watched through the cameras as
            the rocket ascended further away from Earth. I wondered what it
            would feel like to watch earth from a faraway distance. How would I
            feel leaving home to go somewhere very, very far away? Maybe that
            will come one day, hopefully within my lifetime.
          </p>

          <p>
            I never knew that watching kerosene combust through reaction with
            liquid oxygen can be so mesmerizing. One of my favorite quotes was
            that life is not measured by the number of breaths we take, but by
            the moments that take our breath away, and this was one of the
            moments that took my breath away.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={OCCUPY_MARS_IMAGE}
              alt="Wearing the Occupy Mars T-shirt in front of a Falcon 9 booster"
              width={500}
              height={375}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60">
              This is me wearing the Occupy Mars T-shirt in front of a Falcon 9
              booster.
            </figcaption>
          </figure>

          <blockquote className="border-l-4 border-black/20 pl-6 py-2 my-8 italic text-black/90">
            Mankind was born on Earth. It was never meant to die here. —
            Interstellar
          </blockquote>
        </div>
      </div>
    </main>
  );
}
