import Link from "next/link";

const posts = [
  { title: "Coming soon", date: "2026"},
  { title: "Coming soon", date: "2026"},
];

export default function Blog() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link href="/" className="text-lg">Home</Link>
      </div>

      <table className="w-full text-lg border-collapse">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left font-bold pb-2">Title</th>
            <th className="text-right font-bold pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => (
            <tr key={i} className="border-b border-black/10">
              <td className="py-2">{post.title}</td>
              <td className="text-right py-2">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
