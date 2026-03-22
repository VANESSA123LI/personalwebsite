import Image from "next/image";
import Link from "next/link";

const ARRIVAL_IMAGE =
  "https://substack-post-media.s3.amazonaws.com/public/images/7a363d47-c17f-4613-9a24-9cb6781e372b_500x224.jpeg";

export default function WorldBlog4() {
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
            Voice AI Finds Its Voice
          </h1>
          <p className="text-black/60 mb-2">
            Driving business efficiency with voice agents
          </p>
          <p className="text-black/60">Vanessa Li · August 2025</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Since the dawn of time, voice has been our most natural and
            information-dense form of communication. Every utterance carries
            more than just words. The tone, pace, emotion reveals our true
            intent. What once required human interpretation — context, meaning,
            sentiment — can now be processed instantly by AI. We&apos;re
            archiving enormous amounts of spoken content. Voice has become both
            the richest data source and the most underutilized one.
          </p>

          <blockquote className="border-l-4 border-black/20 pl-6 py-2 my-8 italic text-black/90">
            &quot;Language is the foundation of civilization&quot; – Arrival movie.
          </blockquote>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={ARRIVAL_IMAGE}
              alt="Movie Arrival"
              width={500}
              height={224}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60">
              Movie Arrival
            </figcaption>
          </figure>

          <p>
            Voice is no longer just a medium of human interaction, it is
            becoming a machine-readable interface. It has seen a wide adoption
            from automating customer support and enabling hands-free
            productivity, to training more human-like AI agents. As the
            foundational models continue to improve, voice is poised to emerge
            as the dominant interface between humans and machines.
          </p>

          <p>
            People still rely heavily on phone calls. From a customer&apos;s
            perspective, calling the business provider directly after finding the
            right business online is the fastest way to get what they need,
            especially in urgent situations. Yet, research revealed that 62% of
            phone calls to small businesses are left unanswered. 70% of
            businesses answered less than half of their calls. (
            <a
              href="https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              source
            </a>
            )
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Industry-specific voice solutions
          </h2>

          <p>
            It&apos;s no surprise that many of today&apos;s voice AI applications
            are concentrated in customer service and lead conversion, where
            businesses handle massive volumes of human interactions. The
            benefits are immediately seen – faster response times, reduced
            costs, and improved customer experiences.
          </p>

          <p>
            To deliver this value, companies must be industry-focused. Generic
            voice agents are unable to answer questions specifically related to
            the business, therefore the agent must be trained on proprietary
            information, the way a customer service representative would be
            trained. This would be done by tailoring commands, workflows, and
            integrations to industry needs. Voice agents are here to replace
            company representatives.
          </p>

          <p>
            Voice agents are powerful tools for converting inquiry into business
            deals. Unlike a human, voice AI agents are available 24/7, and would
            never run out of patience.
          </p>

          <p>
            Industry-focused voice solutions can unlock productivity in any
            sector where work is time-sensitive, hands-on, or highly
            transactional. I&apos;m thinking
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>SMB plumbing/home renovation services</li>
            <li>Mental health therapy</li>
            <li>Customer service / call centers</li>
            <li>In-car voice assistants</li>
            <li>Accessibility support</li>
            <li>Education (paired with AR/VR)</li>
            <li>Dubbing in entertainment</li>
            <li>Elderly care</li>
            <li>Voice biometrics/ identity detection</li>
            <li>Offline AI (on-device voice agents)</li>
            <li>Negotiation / bill disputes</li>
            <li>Outbound calls Bot calls are illegal. (telephone consumer protection act)</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Current Market Landscape
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Car Dealers</strong> (lead conversion, service scheduling,
              financing inquiries): numo, toma
            </li>
            <li>
              <strong>Real Estate</strong> (leasing assistant for property
              managers): Uniti AI, Colleen.ai, HostAI, EliseAI
            </li>
            <li>
              <strong>Medical</strong> (appointment scheduling, insurance
              verification): hyro, Infinitus, Outbound AI
            </li>
            <li>
              <strong>Call Center</strong> (customer service): GigaML, PolyAI,
              Replicant
            </li>
            <li>
              <strong>Recruiting</strong> (candidate screening): ConverzAI,
              Ribbon, Mercor, Humanly, heyMilo
            </li>
            <li>
              <strong>Restaurants</strong> (you can imagine): Slang
            </li>
            <li>
              <strong>Logistics</strong> (coordination): HappyRobot, FleetWorks
            </li>
          </ul>

          <p>
            Voice agents create value for end-users and the companies building
            these tools. It can also be integrated with industry software. Once
            adopted, switching to another provider is costly, making these
            agents highly sticky and defensible for the businesses building
            them.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-2">Challenge</h3>
          <p>
            The challenge, however, lies in reliability. Voice models can
            hallucinate or fail in other ways. Building a truly high-quality
            product means orchestrating the right mix of models, integrations,
            conversational flows, and error-handling.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Voice AI infrastructure
          </h2>

          <h3 className="text-lg font-bold mt-6 mb-2">Foundation</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Speech-to-Text (STT) / Automatic Speech Recognition
              (ASR):</strong> Converts speech to text (e.g., Whisper, DeepSpeech)
            </li>
            <li>
              <strong>Text-to-Speech (TTS):</strong> Produces realistic voices.
              (e.g., ElevenLabs, Speechify)
            </li>
            <li>
              <strong>Language Models (NLP):</strong> Understand context, intent,
              and semantics. (e.g., GPT-based models, Claude)
            </li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Middleware: This is the &quot;brain&quot; that decides what to do once
            speech is captured.
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Intent Recognition:</strong> Mapping raw speech into user
              intent (e.g., &quot;book me a flight&quot; → API call).
            </li>
            <li>
              <strong>Workflow Engines:</strong> Handling multi-step tasks
              (&quot;Send an email, then schedule a meeting&quot;).
            </li>
            <li>
              <strong>Context Memory:</strong> Keeping track of previous
              conversations and user state. (e.g. Letta, Redis)
            </li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Major problems to be solved
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Latency optimization: we want sub-second response</li>
            <li>Integration frameworks</li>
            <li>
              Security & authentication: handling access to sensitive user
              systems (emails, Slack…)
            </li>
            <li>Understanding multiple speakers</li>
            <li>Show emotional intelligence: tone, pauses, filler words..</li>
            <li>Ability to understand emotion</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">Application Layer</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Horizontal:</strong> General-purpose assistants (e.g.,
              Martin).
            </li>
            <li>
              <strong>Vertical:</strong> Industry-specific voice solutions
              (B2B).
            </li>
          </ul>

          <p>
            I expect the foundational model to become exponentially better over
            time, fueling applications across industries. From converting leads
            to coordinating logistics, these agents are tightly woven into
            workflows. Companies that embrace voice AI early will capture
            enormous efficiency. The problem ahead isn&apos;t whether voice will
            matter, but who will execute it best. What began as human dialogue is
            now the foundation of the next great computing interface.
          </p>

          <p>
            <em>
              Check out{" "}
              <a
                href="https://alexis-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                alexis-ai.com
              </a>{" "}
              (coming soon).
            </em>
          </p>
        </div>
      </div>
    </main>
  );
}
