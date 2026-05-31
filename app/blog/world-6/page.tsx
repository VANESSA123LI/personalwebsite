import Image from "next/image";
import Link from "next/link";

export default function WorldBlog6() {
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
            State of Robotics Data (May 2026)
          </h1>
          <p className="text-black/60 mb-2">
            A field report on the data that robots are trained on.
          </p>
          <p className="text-black/60">Vanessa Li · May 2026</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            Software was eating the world, now AI is eating software. The next
            frontier will be physical AI. We&apos;re not just concerned about
            what AI can say, but what AI can do, physically, in the real world.
          </p>

          <p>
            Waymo crossed 450,000 weekly paid rides. Nvidia declared &quot;the
            ChatGPT moment for robotics is here&quot;. Sora was discontinued in
            April 2026. Most of the people on the team were video experts. Where
            do you think their talent was reallocated to? My guess is towards
            world models, in order to advance robotics. Video is the essential
            element for training robotics manipulation. Forget about making silly
            AI video slops to make people laugh, there are better quests such as
            advancing humanoid robots.
          </p>

          <p>
            OpenAI trained GPT on trillions of tokens of essentially free text.
            To teach a humanoid robot to reliably fold a shirt, however, a
            frontier lab needs roughly 10-20,000 hours of annotated teleoperation
            data, billed at north of $100/hour, every minute of it physically
            produced by a human piloting a real robot through a real room.
            Unfortunately, there is no physical data to be scraped from the web.
            The result is that robotics research has become one of the most
            capital-intensive corners of AI, and a quiet race for high-quality
            training data is now underway across every frontier lab.
          </p>

          <p>The three main types of robotics data being used in training:</p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src="/images/robotics-data-types.png"
              alt="The three main types of robotics data being used in training"
              width={700}
              height={400}
              className="w-full max-w-[700px] h-auto rounded-lg"
            />
          </figure>

          <h2 className="text-xl font-bold mt-8 mb-4">Teleoperation</h2>

          <p>
            Teleoperation remains the industry gold standard. Major research labs
            rely 95%+ on teleoperation data over the other two types of data.
            Unfortunately, the best kind of data comes at a high price. Teleop
            data is the hardest and most expensive to collect because it requires
            leader arms and follower arms hardware, and dedicated employees who
            can run the operation. You will become a billionaire if you can find
            a way to scale up teleoperation data collection. Unfortunately, I
            don&apos;t have any good ideas. Most teleop data companies rely on
            labor arbitrage in developing countries. The hardware costs in those
            countries also tend to be lower, therefore teleop data are best
            collected outside of the US. The problem with this, however, besides
            ethical consideration, is that the data farms are too far away from
            the American labs purchasing them. Researchers prefer to be able to
            iterate quickly and identify problems with the collection as quickly
            as possible. They also want to receive the data as soon as they want
            it. Outsourcing it to external laborers means that the timeline to
            collect doubles. Data providers would first provide samples of the
            task for validation, ship the correct hardware to those farms,
            collect and post-process data. Not to mention that every robotics
            company is using different grippers. Standardization remains an
            unsolved problem.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Egocentric video</h2>

          <p>
            This is the most abundant set of data. Everybody and their mother can
            collect egocentric video data as long as they have a camera. Data
            collectors design their own headset to film workers&apos; hands and
            wrist in various settings. These videos are then used to train VLA
            models.
          </p>

          <p>
            The unfortunate thing about ego data is that they are the least
            useful. Because of the way VLA models digest data, any small variance
            in the pixel color would affect the training quality. Videos are fed
            into Vision-Language-Action (VLA) models by dividing them into
            discrete frames, processing those frames through specialized encoders
            to extract visual and motion features, and then fusing this data with
            language commands and robot states to predict physical actions. This
            means that if the background of the video changes, the same action in
            the same background might not transfer. Any difference in lighting can
            dramatically affect the training outcome.
          </p>

          <p>
            Most of that supply came from India and China at very low labor
            costs. Pricing is approaching a commodity. Around 2023-2024, when
            ego-video data vendors first started selling to robotics labs, they
            typically priced raw footage at $5-10/hr.
          </p>

          <p>
            As more and more players rush into this gold mine, ego videos face
            enormous competition while demand remains the same. By April 2026,
            supply had outrun demand. At this rate, ego video data pricing will
            settle well under $1/hr by 2027.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src="/images/ego-video-pricing.png"
              alt="Ego video data pricing over time"
              width={700}
              height={400}
              className="w-full max-w-[700px] h-auto rounded-lg"
            />
          </figure>

          <p>
            Vendors are racing to differentiate themselves and trying to sell
            premium data at a higher price.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Differentiating Factors for Ego Video Data
          </h3>

          <p>
            <strong>Multimodal data</strong>
          </p>

          <p>
            The promise of modal data is that they will increase the accuracy of
            the training data by increasing the number of parameters. Data
            collectors are including additional sensors such as IMU, pressure
            sensors, and IR sensors in addition to RGB cameras to extract more
            information on the movement. These data would need to then be
            calibrated. The challenge with multimodal data is that we&apos;re not
            sure whether these are actually useful in training. An increased
            number of parameters doesn&apos;t necessarily lead to an increased
            desirable outcome.
          </p>

          <p>
            <strong>The ability to get into hard-to-reach environments.</strong>
          </p>

          <p>
            One of the biggest values out of egocentric video data is that people
            can provide a variety of environment data. Anyone with a head-mounted
            camera can capture a task wherever it naturally happens. Environmental
            diversity is the real value proposition. A model needs to see
            thousands of different kitchens, warehouses, hospital rooms, and
            workshops to generalize. Startups that can get a camera into
            environments labs can&apos;t reach on their own have the most
            defensible moat. Currently, there seems to be a lack of US-based data.
            It is easier to access settings in countries with fewer privacy
            concern, therefore we see the market flooded with data from developing
            countries. US-based data is more valuable not only because it&apos;s
            more scarce and expensive to collect, but also because deployment will
            likely happen first in the US. Kitchen layouts in India look very
            different from ones in the US, even the sizes of household appliances
            are different. US-based data would be necessary.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-2">
            How ego data will become more useful
          </h3>

          <p>
            Geometric Foundation Models (GFMs) have shown promising results. GFMs
            are the strongest reason to think egocentric video isn&apos;t a dead
            end. They take ordinary RGB images or video and directly predict 3D
            structure without needing depth sensors. They might turn cheap,
            abundant ego video into something labs can actually use. VLA models
            are brittle to pixel-level variance. I am bullish that geometry-based
            policies will displace pure pixel-to-action VLAs as the dominant
            design.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">Synthetic Data</h2>

          <p>
            The pitch is irresistible: spin up a robot in a simulator like
            NVIDIA&apos;s Isaac Sim, run thousands of trials in parallel
            overnight, and generate perfectly labeled trajectories at near-zero
            marginal cost, with no hardware to ship or operators to pay. The
            challenge is the sim-to-real gap. Even SOTA models can&apos;t
            reproduce the complexity of the real world. A policy trained in
            simulation tends to fail when deployed, because even state-of-the-art
            physics engines can&apos;t fully reproduce real-world friction. The
            field&apos;s response has been less about achieving perfect realism
            and more about engineering around the gap. While world foundation
            models like NVIDIA&apos;s Cosmos add photorealistic textures, weather,
            and sensor noise on top of simulated scenes to make them harder to
            distinguish from reality, the current consensus is that synthetic data
            works best as a complement rather than a replacement. Synthetic data
            is excellent for perception and navigation, but poor for manipulation
            skills.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src="/images/ikea-bear.jpg"
              alt="Picking up an ikea bear, May 2026, SF"
              width={700}
              height={500}
              className="w-full max-w-[700px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60">
              me picking up an ikea bear. May 2026, SF.
            </figcaption>
          </figure>

          <p>
            UMI data sits in an odd spot. It has the collection style of ego
            video and the output quality of teleop. GoPro and a 3D-printed gripper
            is the whole rig. But you don&apos;t walk away with raw footage. A
            processing step runs SLAM over the video to recover the gripper&apos;s
            full 6-DoF path, so labels are reconstructed, not measured. UMI is
            promising, but it isn&apos;t the proven default for now.
          </p>

          <p>
            The race in robotics has quietly shifted. The bottleneck is
            high-quality data. Teleoperation will stay the gold standard, but it
            can&apos;t scale on labor arbitrage alone. Ego video is cheap and
            abundant but only becomes useful once geometric foundation models
            strip away the pixel-level noise that breaks today&apos;s policies.
            And synthetic data, for all its appeal, remains a complement rather
            than a substitute for the real thing. The companies that crack this
            will decide which humanoids actually fold the shirt, and which stay
            expensive demos.
          </p>
        </div>
      </div>
    </main>
  );
}
