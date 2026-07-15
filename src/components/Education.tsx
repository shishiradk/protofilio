"use client";

import { usePortfolio } from "@/context/PortfolioContext";

export default function Education() {
  const data = usePortfolio();
  const education = data.education;
  const certifications = data.certifications;

  return (
    <section id="education" className="py-20 md:py-28 px-6 md:px-[6%]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start w-full">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-4 pl-4 border-l-2 border-[var(--border)]">
              <h4 className="text-base font-semibold text-white">
                {edu.degree}
              </h4>
              <span className="text-sm text-[var(--muted)] block mb-1">
                {edu.institution} &middot; {edu.duration}
              </span>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Certifications
          </h2>
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]
                transition-colors duration-200 hover:border-[#2a2a2a] mb-3"
            >
              <h4 className="text-sm font-semibold text-white mb-1">
                {cert.title}
              </h4>
              <span className="text-xs text-[var(--muted)]">
                {cert.issuer} &middot; {cert.year}
              </span>
              {cert.id && (
                <p className="text-xs text-[var(--muted)] mt-1 opacity-60">
                  ID: {cert.id}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
