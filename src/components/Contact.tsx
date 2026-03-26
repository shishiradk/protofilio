"use client";

import { useState, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

const socialIconMap: Record<string, string> = {
  linkedin: "fab fa-linkedin",
  github: "fab fa-github",
  twitter: "fab fa-twitter",
  instagram: "fab fa-instagram",
};

export default function Contact() {
  const [toast, setToast] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const socials = usePortfolio().socials;
  const socialEntries = Object.entries(socials).filter(([, url]) => url);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    setSending(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send("shishiradk", "shishira", {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "shishir.adhikari119@gmail.com",
      }, "UHpytVLyxh82_ayhq");
      setToast(true);
      formRef.current.reset();
      setTimeout(() => setToast(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      alert("Message failed: " + msg);
    }
    setSending(false);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-6 md:px-[6%]"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full">
        {/* Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
            Get in Touch
          </h2>
          <p className="text-[var(--muted)] text-sm mb-6">
            Have a question or want to work together?
          </p>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)]
                  bg-[var(--card-bg)] text-white outline-none text-sm
                  focus:border-[#333] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)]
                  bg-[var(--card-bg)] text-white outline-none text-sm
                  focus:border-[#333] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--muted)] mb-1.5">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)]
                  bg-[var(--card-bg)] text-white outline-none resize-y text-sm
                  focus:border-[#333] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-[var(--sky)] text-black border-none px-5 py-2.5 rounded-lg
                cursor-pointer font-medium text-sm
                disabled:opacity-50 transition-opacity duration-200 hover:opacity-85"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Socials */}
        <div className="md:pt-12">
          <h3 className="text-lg font-semibold text-white mb-4">
            Elsewhere
          </h3>
          <div className="flex gap-3 mb-6 flex-wrap">
            {socialEntries.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--card-bg)] border border-[var(--border)]
                  flex items-center justify-center text-white no-underline text-sm
                  transition-colors duration-200 hover:border-[#333]"
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
          <div className="text-[var(--muted)] text-sm">
            <p>Currently available for freelance work and full-time roles.</p>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="fixed right-5 bottom-20 bg-[var(--sky)] text-black px-4 py-2.5
            rounded-lg z-[999] font-medium text-sm"
        >
          Message sent!
        </div>
      )}
    </section>
  );
}
