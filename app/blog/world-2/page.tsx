import Link from "next/link";

export default function WorldBlog1() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <div className="space-y-6 text-lg leading-relaxed">
        <div className="mb-8">
          <Link href="/blog" className="text-lg mb-4 inline-block">← Back to Blog</Link>
          <p className="text-sm text-gray-600 mb-2">World</p>
          <h1 className="text-3xl font-bold mt-4 mb-2">The Future of US Regulations on Generative AI</h1>
          <p className="text-gray-600">June 11, 2023</p>
        </div>

        <div className="prose prose-lg">
          {/* <p>
          The failure of FTX has left a deep scar on the crypto industry. 
          </p> */}
          <p>
          Washington DC is flooded with AI discussions. Executives cannot shut up about it. Technological innovations happen exponentially, and we have just arrived at the tip of a new wave. Artificial intelligence has been around for decades. It dates back to the 20th century. Famous computer scientist Alan Turing laid the groundwork for artificial intelligence, starting with the Turing Test, which is a theoretical experiment to determine a machine’s ability to exhibit intelligent behavior indistinguishable from that of a human. The rapid adoption of AI technology today is due to the increased capabilities of processing power. Ever since the release of ChatGPT in November 2022, AI has taken the world by storm.

Many speculate that AI is just another bubble. But unlike the ponzi scheme that cryptocurrencies managed to pull off, AI has proven its value through the vast users and revenue base. It makes workers more productive and firms more efficient. The biggest drawback is not whether AI overpromises, it is about when it can deliver its promise.

Investors are jumping into the AI gold rush, harnessing rich profits from the technology’s potential. A Pwc predicts that AI will add $16trn to the global economy by 2030. The conversations around AI end up in the white house as a part of the regulatory plan. Crypto became heavily regulated by the government and banned in some countries after its damaging effect became known. Policy makers have learned their lesson on the necessity of regulation and spun into action as soon as AI became prominent.

Although there is still much to be done in the field for it to be a reliable tool, as this new technology takes shape, policy makers are keen to manage the potential impact it has. On May 16th, 2023, the U.S. Senate conducted a hearing to discuss the regulation of AI. How the government chooses to regulate ChatGPT, and AI in general, will affect innovations around AI considerably.

We will need different regulations for different sectors

Regulation of the potentially detrimental risks of AI is definitely necessary. However, the process is still unclear and complicated. The General Consul of Google Deepmind Tom Lue spoke at a generative AI conference this month, and proposed that effective regulation requires public-private partnerships. Most importantly, we will need different regulations for different sectors. AI is a tool that can be used very differently across sectors. There will not be one-law-fits-all. Sectors like healthcare and biotechnology are traditionally heavily regulated, and it would be the same with AI applications. Allowing each sector to adopt AI as it sees fit gives more autonomy in the hands of individual regulators and founders. This approach will make sure that regulations are innovation-friendly.

Given the rapid development of AI, regulators must catch up with the speed of innovation, while not being overprotective. Legislators also proposed a regulatory sandbox, which is a controlled environment for new AI tech to be tested before deployment. This concept is much like having clinical trials in biotech, ensuring a high level of safety.

The future is created with AI, not by AI.

We are far from being replaced by AI. Human power is still much needed in professional settings because AI itself does not provide enough confidence for users. In the recent court case of Robert Mata Vs. Avianca Airline, Mata’s lawyer Mr. Schwartz filed an error-filled brief on his behalf using ChatGPT. Chat made up legal contents, which diminishes its reputation for being a reliable tool. At the end of the day, humans should remain in full control over the material they choose to deliver and decisions they choose to make. AI simply accelerates our processes. I believe that the future is created with AI, not by AI. This is just the beginning of an AI revolution. There is still so much to be done, but we’re heading in the right direction.


          </p>
        </div>
      </div>
    </main>
  );
}

