"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const hero = portfolioData.hero;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative"
    >
      <div
        className="w-full px-6 md:px-[8%] flex flex-col md:flex-row items-center
          justify-between gap-10 md:gap-0 pt-28 md:pt-0"
      >
        <div className="max-w-[520px] text-center md:text-left">
          <p className="text-[var(--muted)] text-sm mb-4 tracking-wide uppercase">
            AI/ML &middot; Backend &middot; Systems
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.2] mb-5">
            {hero.title.split("&").map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-[var(--sky)]">& </span>}
                {part.trim()}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[var(--muted)] mb-8 max-w-[440px] mx-auto md:mx-0">
            {hero.description}
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href={hero.cvLink}
              download="Shishir_Adhikari_CV.pdf"
              className="h-12 px-8 flex items-center justify-center rounded-xl
                no-underline font-semibold text-sm text-black
                border border-[var(--sky)]/40
                transition-all duration-300 hover:-translate-y-0.5
                hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              style={{
                background: "linear-gradient(180deg, rgba(56,189,248,0.9), rgba(56,189,248,0.6))",
              }}
            >
              CV
            </a>
            <a
              href={hero.blogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 flex items-center justify-center rounded-xl
                no-underline font-semibold text-sm text-white
                border border-[var(--border)]
                transition-all duration-300 hover:-translate-y-0.5
                hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              Blog
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            src={hero.image}
            alt="Shishir Adhikari"
            width={360}
            height={360}
            className="w-[220px] sm:w-[280px] md:w-[360px] h-auto rounded-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
