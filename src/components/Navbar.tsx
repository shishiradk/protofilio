"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  const [isVertical, setIsVertical] = useState(false);
  const items = portfolioData.navbar;

  useEffect(() => {
    const handleScroll = () => {
      const home = document.getElementById("home");
      if (!home) return;
      const homeBottom = home.offsetTop + home.offsetHeight;
      setIsVertical(window.scrollY >= homeBottom - 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith("#")) {
      e.preventDefault();
      document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed z-[200] transition-all duration-[400ms] ease-in-out
        ${isVertical
          ? "right-4 md:right-6 top-1/2 -translate-y-1/2"
          : "right-4 md:right-6 top-4 md:top-6"
        }`}
    >
      <ul
        className={`list-none flex items-center
          ${isVertical ? "flex-col gap-3 p-2" : "gap-4 md:gap-5"}`}
      >
        {items.map((item) => (
          <li key={item.text}>
            {isVertical ? (
              <a
                href={item.link}
                onClick={(e) => handleClick(e, item.link)}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg
                  bg-[var(--card-bg)] border border-[var(--border)]
                  transition-colors duration-200 hover:border-[#333]"
                title={item.text}
              >
                <i className={`fas ${item.icon} text-white text-sm`} />
              </a>
            ) : (
              <a
                href={item.link}
                onClick={(e) => handleClick(e, item.link)}
                className="text-[var(--muted)] no-underline font-medium px-1 py-1
                  text-sm transition-colors duration-200 hover:text-white"
              >
                {item.text}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
