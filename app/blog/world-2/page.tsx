import Link from "next/link";

export default function WorldBlog2() {
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
          <h1 className="text-3xl font-bold mt-4 mb-2">Climate Change and Innovation</h1>
          <p className="text-gray-600">January 30, 2026</p>
        </div>

        <div className="prose prose-lg">
          <p>
            Climate change remains one of the most pressing challenges of our time. Around the world, 
            innovators and scientists are developing solutions to address this crisis, from renewable 
            energy technologies to carbon capture systems.
          </p>
          <p>
            This post examines how global innovation is responding to climate challenges and what role 
            technology can play in creating a more sustainable future. The solutions are out there; 
            scaling them is the next frontier.
          </p>
        </div>
      </div>
    </main>
  );
}

