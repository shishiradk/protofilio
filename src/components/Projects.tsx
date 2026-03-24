"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const projects = portfolioData.projects;
  const visibleCount = 6;

  const visibleProjects = expanded ? projects : projects.slice(0, visibleCount);
  const hasMore = projects.length > visibleCount;

  return (
    <section
      id="projects"
      className="py-20 md:py-28 px-6 md:px-[6%]"
    >
      <div className="max-w-[1100px] mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
          Projects
        </h2>
        <p className="text-[var(--muted)] mb-8 text-sm">
          Some things I&apos;ve built recently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-lg p-5 bg-[var(--card-bg)] border border-[var(--border)]
                relative transition-colors duration-200 hover:border-[#2a2a2a]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-semibold text-white">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[11px] text-white bg-red-600
                    px-2.5 py-1 rounded font-medium flex-shrink-0 mt-0.5">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-[var(--muted)] text-sm mb-3 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex gap-1.5 flex-wrap mb-4">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-white/[0.04] text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 items-center">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm text-white no-underline
                    border border-[var(--border)] font-medium
                    transition-colors duration-200 hover:border-[#333]"
                >
                  Source Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm text-black no-underline
                    bg-[var(--sky)] font-medium
                    transition-opacity duration-200 hover:opacity-85"
                >
                  Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-transparent border border-[var(--border)] text-white
                px-5 py-2 rounded-lg cursor-pointer text-sm
                transition-colors duration-200 hover:border-[#333]"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
