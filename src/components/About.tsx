"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function About() {
  const data = usePortfolio();
  const about = data.about;
  const skills = data.skills;
  const experience = data.experience;

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6 md:px-[6%]"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start w-full">
        {/* Left */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {about.title}
          </h2>
          <p className="text-[var(--sky)] text-sm font-medium mb-5">
            {about.name}
          </p>
          <p className="text-[var(--muted)] text-sm leading-[1.8] mb-4">
            {about.intro}
          </p>
          <p className="text-[var(--muted)] text-sm leading-[1.8] mb-8">
            {about.description}
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">
            Experience
          </h3>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4 pl-4 border-l-2 border-[var(--border)]">
              <h4 className="text-base font-semibold text-white">
                {exp.role}
              </h4>
              <span className="text-sm text-[var(--muted)] block mb-1">
                {exp.company} &middot; {exp.duration}
              </span>
              <p className="text-sm text-[var(--muted)]">{exp.desc}</p>
            </div>
          ))}
        </div>

        {/* Right - Skills */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">
            Skills & Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="flex gap-3 items-center p-3.5 rounded-lg bg-[var(--card-bg)]
                  border border-[var(--border)] transition-colors duration-200
                  hover:border-[#2a2a2a]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center
                    text-[var(--sky)] text-base bg-[var(--sky)]/[0.08] flex-shrink-0"
                >
                  <i className={`fa-solid ${skill.icon}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-white">
                    {skill.title}
                  </h4>
                  <p className="text-[var(--muted)] text-xs">{skill.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
