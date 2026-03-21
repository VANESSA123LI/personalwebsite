import Image from "next/image";
import Link from "next/link";

const AI_CONFERENCE_IMAGE =
  "https://substack-post-media.s3.amazonaws.com/public/images/5898ed17-c8c2-4be9-afe4-e62f6fa1a677_800x516.png";
const ANDREW_CHEN_IMAGE =
  "https://substack-post-media.s3.amazonaws.com/public/images/691d4f93-ca83-4d5a-967a-9773acc79f6f_800x742.png";

export default function WorldBlog2() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">
            The Future of US Regulations on Generative AI
          </h1>
          <p className="text-black/60">Vanessa Li · June 11, 2023</p>
        </div>

        <figure className="my-8 flex flex-col items-center">
          <Image
            src={AI_CONFERENCE_IMAGE}
            alt="Generative AI Conference in San Francisco in June 2023"
            width={500}
            height={323}
            className="w-full max-w-[500px] h-auto rounded-lg"
          />
          <figcaption className="mt-2 text-sm text-black/60 text-center">
            Generative AI Conference in San Francisco in June 2023.
          </figcaption>
        </figure>

        <div className="prose prose-lg max-w-none space-y-6 text-center">
          <p>
            Washington DC is flooded with AI discussions. Executives cannot shut
            up about it. Technological innovations happen exponentially, and we
            have just arrived at the tip of a new wave. Artificial intelligence
            has been around for decades. It dates back to the 20th century.
            Famous computer scientist Alan Turing laid the groundwork for
            artificial intelligence, starting with the Turing Test, which is a
            theoretical experiment to determine a machine&apos;s ability to
            exhibit intelligent behavior indistinguishable from that of a human.
            The rapid adoption of AI technology today is due to the increased
            capabilities of processing power. Ever since the release of ChatGPT
            in November 2022, AI has taken the world by storm.
          </p>

          <p>
            Many speculate that AI is just another bubble. But unlike the ponzi
            scheme that cryptocurrencies managed to pull off, AI has proven its
            value through the vast users and revenue base. It makes workers more
            productive and firms more efficient. The biggest drawback is not
            whether AI overpromises, it is about when it can deliver its promise.
          </p>

          <p>
            Investors are jumping into the AI gold rush, harnessing rich profits
            from the technology&apos;s potential. A Pwc predicts that AI will add
            $16trn to the global economy by 2030. The conversations around AI end
            up in the white house as a part of the regulatory plan. Crypto became
            heavily regulated by the government and banned in some countries
            after its damaging effect became known. Policy makers have learned
            their lesson on the necessity of regulation and spun into action as
            soon as AI became prominent.
          </p>

          <p>
            Although there is still much to be done in the field for it to be a
            reliable tool, as this new technology takes shape, policy makers are
            keen to manage the potential impact it has. On May 16th, 2023, the
            U.S. Senate conducted a hearing to discuss the regulation of AI. How
            the government chooses to regulate ChatGPT, and AI in general, will
            affect innovations around AI considerably.
          </p>

          <blockquote className="border-l-4 border-black/20 pl-6 py-2 my-8 italic text-black/90">
            <strong>We will need different regulations for different sectors</strong>
          </blockquote>

          <p>
            Regulation of the potentially detrimental risks of AI is definitely
            necessary. However, the process is still unclear and complicated. The
            General Consul of Google Deepmind Tom Lue spoke at a generative AI
            conference this month, and proposed that effective regulation
            requires public-private partnerships. Most importantly, we will need
            different regulations for different sectors. AI is a tool that can be
            used very differently across sectors. There will not be
            one-law-fits-all. Sectors like healthcare and biotechnology are
            traditionally heavily regulated, and it would be the same with AI
            applications. Allowing each sector to adopt AI as it sees fit gives
            more autonomy in the hands of individual regulators and founders.
            This approach will make sure that regulations are innovation-friendly.
          </p>

          <p>
            Given the rapid development of AI, regulators must catch up with the
            speed of innovation, while not being overprotective. Legislators also
            proposed a regulatory sandbox, which is a controlled environment for
            new AI tech to be tested before deployment. This concept is much like
            having clinical trials in biotech, ensuring a high level of safety.
          </p>

          <blockquote className="border-l-4 border-black/20 pl-6 py-2 my-8 italic text-black/90">
            <strong>The future is created with AI, not by AI.</strong>
          </blockquote>

          <p>
            We are far from being replaced by AI. Human power is still much
            needed in professional settings because AI itself does not provide
            enough confidence for users. In the recent court case of Robert Mata
            Vs. Avianca Airline, Mata&apos;s lawyer Mr. Schwartz filed an
            error-filled brief on his behalf using ChatGPT. Chat made up legal
            contents, which diminishes its reputation for being a reliable tool.
            At the end of the day, humans should remain in full control over the
            material they choose to deliver and decisions they choose to make. AI
            simply accelerates our processes. I believe that the future is
            created with AI, not by AI. This is just the beginning of an AI
            revolution. There is still so much to be done, but we&apos;re heading
            in the right direction.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={ANDREW_CHEN_IMAGE}
              alt="Picture with tech investor Andrew Chen from a16z"
              width={500}
              height={464}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60 text-center">
              Picture with tech investor Andrew Chen from a16z
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
