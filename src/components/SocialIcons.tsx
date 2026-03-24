"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

const socialIconMap: Record<string, string> = {
  linkedin: "fab fa-linkedin",
  github: "fab fa-github",
  twitter: "fab fa-twitter",
  instagram: "fab fa-instagram",
};

export default function SocialIcons() {
  const [visible, setVisible] = useState(true);
  const socials = portfolioData.socials;

  useEffect(() => {
    const handleScroll = () => {
      const contact = document.getElementById("contact");
      if (!contact) return;
      const rect = contact.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(!inView);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const entries = Object.entries(socials).filter(([, url]) => url);

  return (
    <div
      className="fixed left-4 md:left-5 bottom-4 md:bottom-5 flex gap-2 z-[120]
        transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[var(--card-bg)]
            border border-[var(--border)] flex items-center justify-center
            text-[var(--muted)] no-underline text-sm
            transition-colors duration-200 hover:text-white hover:border-[#333]"
        >
          {socialIconMap[key] ? (
            <i className={socialIconMap[key]} />
          ) : (
            <span className="font-medium text-xs">
              {key === "kaggle" ? "K" : key[0].toUpperCase()}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
