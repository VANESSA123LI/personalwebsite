import Image from "next/image";
import Link from "next/link";

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const photos: Photo[] = [
  { src: "/images/photoshoots/photo-1.jpg", alt: "Photoshoot", width: 2400, height: 3600 },
  { src: "/images/photoshoots/photo-2.jpg", alt: "Photoshoot", width: 2400, height: 3600 },
  { src: "/images/photoshoots/photo-3.jpg", alt: "Photoshoot", width: 5504, height: 8256 },
  { src: "/images/photoshoots/photo-4.jpg", alt: "Photoshoot", width: 5175, height: 7762 },
  { src: "/images/photoshoots/photo-5.jpg", alt: "Photoshoot", width: 8256, height: 5504 },
  { src: "/images/photoshoots/photo-6.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
  { src: "/images/photoshoots/photo-7.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
  { src: "/images/photoshoots/photo-8.jpg", alt: "Photoshoot", width: 6240, height: 4160 },
  { src: "/images/photoshoots/photo-9.jpg", alt: "Photoshoot", width: 960, height: 1392 },
  { src: "/images/photoshoots/photo-10.jpg", alt: "Photoshoot", width: 960, height: 1415 },
  { src: "/images/photoshoots/photo-11.jpg", alt: "Photoshoot", width: 1536, height: 2304 },
  { src: "/images/photoshoots/photo-12.jpg", alt: "Photoshoot", width: 1536, height: 2304 },
];

export default function Photoshoots() {
  return (
    <main className="relative mx-auto max-w-5xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/projects" className="text-lg">
          ← Projects
        </Link>
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <header className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Photoshoots</h1>
        <p className="text-lg leading-relaxed text-black/70">
          Portraits and photoshoots from over the years.
        </p>
      </header>

      <section className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02]">
          <video
            src="/videos/photoshoot-reel.mp4"
            controls
            playsInline
            preload="metadata"
            className="h-auto w-full"
          />
        </div>
      </section>
    </main>
  );
}
