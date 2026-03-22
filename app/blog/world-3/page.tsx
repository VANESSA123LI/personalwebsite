import Image from "next/image";
import Link from "next/link";

const TEL_AVIV_IMAGE_1 =
  "https://substack-post-media.s3.amazonaws.com/public/images/80472efc-c4df-4bad-b03c-730f1a7114f2_1398x672.png";
const TEL_AVIV_IMAGE_2 =
  "https://substack-post-media.s3.amazonaws.com/public/images/7884d104-9866-4a42-8474-2fd470aa7c13_1044x594.png";
const TEL_AVIV_IMAGE_3 =
  "https://substack-post-media.s3.amazonaws.com/public/images/7fead744-651b-40cc-802d-75bf9a5288a7_818x786.png";

export default function WorldBlog3() {
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
            Tel Aviv as a Middle Eastern Startup Hub
          </h1>
          <p className="text-black/60">Vanessa Li · June 12, 2023</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            We all know that Silicon Valley is widely recognized as a global hub
            for technology and innovation. It has been the birthplace of
            numerous successful startups. However, there are a few less
            recognized tech locations, from Austin to Miami to Tel Aviv.
          </p>

          <p>
            Tel Aviv, Israel is known as a startup center. Israel is actually
            number one in the world for the most unicorns per capita (
            <a
              href="https://www.techaviv.com/unicorns"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Source
            </a>
            ). It has established itself as a thriving hub for technology and
            innovation.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={TEL_AVIV_IMAGE_1}
              alt="Tel Aviv startup scene"
              width={500}
              height={240}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
          </figure>

          <p>
            The reasons that made Tel Aviv so successful compared to other
            middle eastern countries likely relates to its geographical history.
            According to Deloitte, Israel&apos;s unique society and culture,
            strong economy, government support, and &quot;global-first&quot;
            market approach establishes its innovation ecosystem. It has
            fostered a vibrant startup ecosystem with abundant access to
            capital.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={TEL_AVIV_IMAGE_2}
              alt="Tel Aviv innovation"
              width={500}
              height={285}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
          </figure>

          <blockquote className="border-l-4 border-black/20 pl-6 py-2 my-8 italic text-black/90">
            How did Israel, the size of New Jersey, become a startup powerhouse?
          </blockquote>

          <p>
            Given the century-long conflict between Israel and Palestine,
            Israelis were pressured to constantly innovate in order to stay
            ahead of their competitors in life or death situations. Israel&apos;s
            military is top-notch. Citizens who join the military after high
            school are given great responsibilities on firearms. In central Tel
            Aviv, arm-bearing soldiers are visible as they go about their days
            as usual.
          </p>

          <p>
            The Unit 8200 was established as an elite intelligence unit of the
            Israel Defense Forces (IDF), where members were trained from a young
            age to become greatest technological engineers. It is known for its
            rigorous selection process to recruit Israel&apos;s brightest minds.
            It played a critical role in various military and counterterrorism
            operations, earning its well-deserved reputation as a highly
            effective and respected intelligence organization. The Unit 8200 has
            a strong focus on technological innovation, and many of its alums
            went on to become successful entrepreneurs. There is no doubt that
            they make the best hackers at hackathons. For example, the CEO of
            AppsFlyer (where I worked), was a former Israeli military trainee.
          </p>

          <p>
            Many venture capital firms look to expand their branch to Israel and
            increase investments in Israeli startups. General Atlantic has made
            successful investments in Israel. Insight Partners opened its first
            Israeli office in Sarona Market in 2019. Toyota Ventures is looking
            to do the same.
          </p>

          <p>
            While Silicon Valley is still the most respected place for ventures,
            innovation expands beyond the valley with vast opportunities
            throughout the world.
          </p>

          <figure className="my-8 flex flex-col items-center">
            <Image
              src={TEL_AVIV_IMAGE_3}
              alt="Just walked out of a tech conference"
              width={500}
              height={481}
              className="w-full max-w-[500px] h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-sm text-black/60">
              Just walked out of a tech conference
            </figcaption>
          </figure>

          <p>
            A comprehensive list of Israeli startups can be found at{" "}
            <a
              href="https://startupnationcentral.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              startupnationcentral.org
            </a>
          </p>

          <p className="font-medium">Yala Yala!</p>
        </div>
      </div>
    </main>
  );
}
