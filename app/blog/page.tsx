import Link from "next/link";

const personalPosts = [
  { 
    slug: "personal-1",
    title: "Coming soon", 
    date: "January 15, 2026"
  },
  { 
    slug: "personal-2",
    title: "Coming soon", 
    date: "January 25, 2026"
  },
  { 
    slug: "personal-3",
    title: "Coming soon", 
    date: "February 5, 2026"
  },
  { 
    slug: "personal-4",
    title: "Coming soon", 
    date: "February 15, 2026"
  },
  { 
    slug: "personal-5",
    title: "Coming soon", 
    date: "February 25, 2026"
  },
];

const worldPosts = [
  { 
    slug: "world-1",
    title: "FTX and the future of crypto", 
    date: "December 6, 2022"
  },
  { 
    slug: "world-2",
    title: "Coming soon", 
    date: "January 30, 2026"
  },
  { 
    slug: "world-3",
    title: "Coming soon", 
    date: "February 10, 2026"
  },
  { 
    slug: "world-4",
    title: "Coming soon", 
    date: "February 20, 2026"
  },
  { 
    slug: "world-5",
    title: "CComing soon", 
    date: "March 1, 2026"
  },
];

export default function Blog() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
      <h1 className="absolute right top-6 text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <div className="space-y-12">
        {/* Personal Category */}
        <div>
          <h2 className="text-xl font-bold mb-4">Personal</h2>
          <table className="w-full text-lg border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left font-bold pb-2">Title</th>
                <th className="text-right font-bold pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {personalPosts.map((post) => (
                <tr key={post.slug} className="border-b border-black/10">
                  <td className="py-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="text-right py-2">{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* World Category */}
        <div>
          <h2 className="text-xl font-bold mb-4">World</h2>
          <table className="w-full text-lg border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left font-bold pb-2">Title</th>
                <th className="text-right font-bold pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {worldPosts.map((post) => (
                <tr key={post.slug} className="border-b border-black/10">
                  <td className="py-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="text-right py-2">{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
