"use client";

import Link from "next/link";
import { useState } from "react";

type Service = {
  id: string;
  emoji: string;
  title: string;
  teaser: string;
  details: string;
};

const SERVICES: Service[] = [
  {
    id: "college",s
    emoji: "🎓",
    title: "College Admission Consulting",
    teaser:
      "Guidance through the college application process and essay editing tailored to your story.",
    details:
      "I've helped students gain admission to Harvard, Stanford, Cornell, and other top universities. I specialize in working with ambitious students who want more than generic advice — from building a realistic, strategic school list to refining personal statements and supplements until your voice reads clearly on the page. I also offer extracurricular consulting to help you frame your activities with intention. Sessions are flexible: full-cycle support from start to finish, or focused editing on drafts you already have. The goal is applications that feel coherent, honest, and ready to submit with confidence.",

  },
  {
    id: "industry",
    emoji: "📊",
    title: "Industry Consulting",
    teaser:
      "Strategic advisory for businesses and professionals facing growth, product, or execution decisions.",
    details:
      "I work with teams and individuals on prioritization, positioning, and how to communicate plans to stakeholders who need to align quickly. Engagements can be a single intensive working session or a short series of check-ins—always tied to concrete decisions, not abstract frameworks. Expect direct feedback, lightweight artifacts, and next steps you can act on immediately.",
  },
  {
    id: "ai",
    emoji: "🤖",
    title: "AI Consulting & Implementation",
    teaser:
      "Website builds, AI ops automation, workflow integration, and practical implementation—not slide decks.",
    details:
      "We start from real bottlenecks: manual reporting, handoffs between tools, or customer-facing experiences that need to ship. I help design small, reliable automations, connect systems you already use, and stand up simple sites or internal tools where they unlock the most value. Iteration is deliberate so teams actually adopt what we build instead of abandoning it after launch.",
  },
  {
    id: "translation",
    emoji: "🌏",
    title: "Trans-Pacific Translation",
    teaser:
      "Mandarin ↔ English for manufacturing and sourcing—bridging teams, suppliers, and documentation across the Pacific.",
    details:
      "I translate and localize technical specs, contracts, email threads, and meeting notes with attention to tone and intent on both sides of the relationship. Contexts range from factory updates and QC issues to commercial terms and project timelines. The aim is clarity and trust: everyone understands commitments, risks, and next actions without nuance getting lost between languages.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`mt-1 h-5 w-5 shrink-0 text-black/45 transition-transform duration-300 ease-out ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ServicesGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {SERVICES.map((service) => {
        const open = openId === service.id;
        return (
          <article
            key={service.id}
            className="rounded-lg border border-black/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <button
              type="button"
              onClick={() => toggle(service.id)}
              aria-expanded={open}
              aria-controls={`${service.id}-details`}
              id={`${service.id}-trigger`}
              className="flex w-full items-start gap-3 p-5 text-left transition-colors hover:bg-black/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20"
            >
              <span className="text-xl leading-none" aria-hidden>
                {service.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-semibold text-[#111]">
                  {service.title}
                </span>
                <span className="mt-1.5 block text-[15px] leading-snug text-black/70">
                  {service.teaser}
                </span>
              </span>
              <Chevron open={open} />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={`${service.id}-details`}
                  role="region"
                  aria-labelledby={`${service.id}-trigger`}
                  className="border-t border-black/[0.06] px-5 pb-5 pt-4"
                >
                  <p className="text-[15px] leading-relaxed text-black/75">
                    {service.details}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-block text-[15px] text-black/55 underline decoration-black/25 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
