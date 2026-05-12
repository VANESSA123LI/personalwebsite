import Link from "next/link";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  role?: string;
  year?: string;
  links?: ProjectLink[];
};

const liveProjects: Project[] = [
  {
    index: "01",
    name: "Alexis AI",
    tagline: "Your inbox and calendar, handled. Hands-free.",
    description:
      "A voice assistant for email and calendar. Call a number, summarize your inbox, draft replies, and create events — all without opening an app. Built for busy people who multitask. Available in English, Mandarin, and Spanish.",
    role: "Co-founder · Product & Engineering",
    year: "2025",
    links: [
      { label: "alexis-ai.com", href: "https://alexis-ai.com" },
      {
        label: "Read: Voice AI Finds Its Voice",
        href: "/blog/world-4",
      },
    ],
  },
  {
    index: "02",
    name: "Coco",
    tagline: "An AI furry friend, in your pocket.",
    description:
      "A friendly AI therapy dog and virtual pet for mental wellness. Chat with Coco anytime to feel heard, earn coins as you talk, then feed and level up your furry friend. A daily dose of joy.",
    role: "Co-founder · iOS",
    year: "2025",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/coco-ai-furry-friend/id6748201136",
      },
    ],
  },
  {
    index: "03",
    name: "Fuel",
    tagline: "Daily motivation shots for Gen Z.",
    description:
      "A daily dose of motivation — the spiciest quotes on the internet, served fresh. Designed to be the opposite of every soft, beige motivational app.",
    role: "Co-founder · iOS",
    year: "2025",
  },
];

const inDevelopment: Project[] = [
  {
    index: "04",
    name: "Daily Meditation AI",
    tagline: "A personal meditation guide that learns your day.",
    description:
      "Adaptive meditations generated from how your day actually went. In development.",
    year: "2026",
  },
  {
    index: "05",
    name: "καιρός (Kairós)",
    tagline: "The right moment, on purpose.",
    description:
      "Exploring how AI can help us notice and act on the right moments in life — not just measure time, but spend it well. Early concept.",
    year: "2026",
  },
];

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-8 border-b border-black/10">
      <div className="text-sm text-black/40 pt-1 tabular-nums">
        {project.index}
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-2xl font-bold">{project.name}</h3>
          {project.year && (
            <span className="text-sm text-black/40 tabular-nums">
              {project.year}
            </span>
          )}
        </div>
        <p className="italic text-black/70 text-lg">{project.tagline}</p>
        <p className="text-base leading-relaxed">{project.description}</p>
        {project.role && (
          <p className="text-sm text-black/50">{project.role}</p>
        )}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
            {project.links.map((link) => {
              const isExternal = link.href.startsWith("http");
              return isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="text-base">
                  {link.label} →
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <header className="mb-12 space-y-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-lg leading-relaxed">
I build things. A few are out in the world, others are still cooking.
        </p>
      </header>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-2 border-b border-black pb-2">
          <h2 className="text-xl font-bold">Live</h2>
          <span className="text-sm text-black/40">Shipped & shipping</span>
        </div>
        <div>
          {liveProjects.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-2 border-b border-black pb-2">
          <h2 className="text-xl font-bold">In Development</h2>
          <span className="text-sm text-black/40">Coming soon</span>
        </div>
        <div>
          {inDevelopment.map((project) => (
            <ProjectRow key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section className="pt-4 text-base leading-relaxed text-black/70">
        <p>
          Want to build something together, or just curious about the stack?{" "}
          <a href="mailto:vanessali767@gmail.com">Drop me a line</a>.
        </p>
      </section>
    </main>
  );
}
