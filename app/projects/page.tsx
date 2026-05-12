import Image from "next/image";
import Link from "next/link";

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  index: string;
  name: string;
  tagline: string;
  description: string;
  role?: string;
  year?: string;
  links?: ProjectLink[];
  images?: ProjectImage[];
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
    name: "Balsawood Glider",
    tagline: "1st place — MESA engineering competition.",
    description:
      "Designed and hand-built a balsawood airplane for the MESA engineering competition",
    images: [
      {
        src: "/images/balsawood-airplane-2.jpg",
        alt: "Handmade balsawood glider",
      },
      {
        src: "/images/balsawood-airplane-3.jpg",
        alt: "Balsawood glider — additional view",
      },
      {
        src: "/images/balsawood-airplane-4.jpg",
        alt: "Balsawood glider — additional view",
      },
      {
        src: "/images/balsawood-airplane-5.jpg",
        alt: "Balsawood glider — additional view",
      },
    ],
  },
  {
    index: "04",
    name: "Soft Robot Dance Bot",
    tagline: "A pneumatic silicone robot that moves to the beat.",
    description:
      "Designed and fabricated a pneumatic soft robot for a graduate-level robotics course. 3D-printed casting molds shaped the body, EcoFlex 00-35 and Dragon Skin 10 silicones formed the layered structure, and embedded silicone tubes paired with syringes drove the actuation — producing controlled, dance-like movement. Iterated through paper-inspired design, mold refinement, and pressure-based motion testing.",
    year: "2025",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black/30">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="text-xs tracking-[0.2em] text-black/40 tabular-nums">
          {project.index}
        </span>
        {project.year && (
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs tabular-nums text-black/60">
            {project.year}
          </span>
        )}
      </div>

      {project.images && project.images.length > 0 && (
        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      )}

      <h3 className="relative mt-6 text-3xl font-bold tracking-tight">
        {project.name}
      </h3>
      <p className="relative mt-2 text-lg italic text-black/70">
        {project.tagline}
      </p>
      <p className="relative mt-4 text-base leading-relaxed text-black/80">
        {project.description}
      </p>

      {project.links && project.links.length > 0 && (
        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.links.map((link) => {
            const isExternal = link.href.startsWith("http");
            const classes =
              "inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-1.5 text-sm transition-colors hover:border-black hover:bg-black hover:text-white";
            return isExternal ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                {link.label} <span aria-hidden>↗</span>
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={classes}>
                {link.label} <span aria-hidden>→</span>
              </Link>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <header className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
        <p className="text-lg leading-relaxed text-black/70">
        I build things. A few are out in the world, others are still cooking.
        </p>
      </header>

      <section className="space-y-6">
        {liveProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </section>
    </main>
  );
}
