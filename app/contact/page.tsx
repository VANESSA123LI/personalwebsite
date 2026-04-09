"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <main className="relative mx-auto max-w-2xl px-6 py-12">
      <div className="flex justify-between items-baseline mb-12">
        <Link href="/" className="text-lg">
          Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-[#111]">Get in Touch</h1>
      <p className="mt-4 text-lg leading-relaxed text-black/70">
        I will respond when I can.
      </p>

      <form className="mt-8 space-y-6">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm text-black/60 uppercase tracking-wide">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border-b border-black/30 bg-transparent py-2 text-lg focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm text-black/60 uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border-b border-black/30 bg-transparent py-2 text-lg focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="block text-sm text-black/60 uppercase tracking-wide">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border-b border-black/30 bg-transparent py-2 text-lg focus:outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 border border-black text-lg hover:bg-black hover:text-white transition-colors"
        >
          Send
        </button>
      </form>
    </main>
  );
}
