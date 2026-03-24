"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";

type PortfolioData = typeof portfolioData;

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");

  const [activeTab, setActiveTab] = useState("hero");
  const [data, setData] = useState<PortfolioData>(
    JSON.parse(JSON.stringify(portfolioData))
  );
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const [expRole, setExpRole] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expDesc, setExpDesc] = useState("");

  const [skillTitle, setSkillTitle] = useState("");
  const [skillIcon, setSkillIcon] = useState("");
  const [skillDesc, setSkillDesc] = useState("");

  const [pTitle, setPTitle] = useState("");
  const [pTags, setPTags] = useState("");
  const [pDemo, setPDemo] = useState("");
  const [pCode, setPCode] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pFeatured, setPFeatured] = useState(false);

  const tabs = [
    { id: "hero", label: "Hero / Home" },
    { id: "hire", label: "Hire Box" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "socials", label: "Socials" },
    { id: "navbar", label: "Navbar" },
    { id: "general", label: "General" },
  ];

  const save = (d: PortfolioData) => {
    setSaving(true);
    setData(d);
    const content = `export const portfolioData = ${JSON.stringify(d, null, 2)};\n`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.ts";
    a.click();
    URL.revokeObjectURL(url);
    setToast("Downloaded! Replace src/data/portfolio.ts and redeploy.");
    setSaving(false);
    setTimeout(() => setToast(""), 4000);
  };

  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0a0a0a", display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{
            background: "#111", border: "1px solid #1a1a1a", borderRadius: 12,
            padding: "40px 36px", width: 380, textAlign: "center",
          }}>
          <div style={{
            width: 48, height: 48, background: "#38bdf8", borderRadius: "50%",
            margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 22 }}>{forgotMode ? "\u2709" : "\uD83D\uDD12"}</span>
          </div>

          {!forgotMode ? (
            /* --- LOGIN --- */
            <form onSubmit={(e) => {
              e.preventDefault();
              setLoggingIn(true);
              setLoginError("");
              if (password === data.adminPassword) {
                setAuthed(true);
              } else {
                setLoginError("Wrong password");
              }
              setLoggingIn(false);
            }}>
              <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Admin Access</h2>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>Enter password to continue</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                style={{
                  width: "100%", padding: "12px 16px", background: "#0a0a0a",
                  border: loginError ? "1px solid #ef4444" : "1px solid #1a1a1a",
                  borderRadius: 8, color: "#fff", fontSize: 14, outline: "none",
                  boxSizing: "border-box", marginBottom: 8,
                }}
              />
              {loginError && (
                <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 8, textAlign: "left" }}>{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                style={{
                  width: "100%", padding: "12px 0", background: "#38bdf8", color: "#000",
                  border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14,
                  cursor: loggingIn ? "wait" : "pointer", marginTop: 8,
                  opacity: loggingIn ? 0.6 : 1,
                }}
              >
                {loggingIn ? "Verifying..." : "Login"}
              </button>
              <p
                onClick={() => { setForgotMode(true); setLoginError(""); setOtpSent(false); setForgotMsg(""); }}
                style={{ color: "#38bdf8", fontSize: 13, marginTop: 16, cursor: "pointer" }}
              >
                Forgot password?
              </p>
            </form>
          ) : !otpSent ? (
            /* --- SEND OTP --- */
            <div>
              <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Reset Password</h2>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>
                A verification code will be sent to your email
              </p>
              <p style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>
                s****r.adhikari119@gmail.com
              </p>
              {forgotMsg && (
                <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>{forgotMsg}</p>
              )}
              <button
                disabled={sendingOtp}
                onClick={async () => {
                  setSendingOtp(true);
                  setForgotMsg("");
                  const code = Math.floor(100000 + Math.random() * 900000).toString();
                  setGeneratedOtp(code);
                  try {
                    const emailjs = await import("@emailjs/browser");
                    await emailjs.send("shishiradk", "shishira", {
                      from_name: "Portfolio Admin",
                      from_email: "noreply@portfolio.com",
                      message: `Your admin verification code is: ${code}`,
                      to_email: "shishir.adhikari119@gmail.com",
                    }, "UHpytVLyxh82_ayhq");
                    setOtpSent(true);
                  } catch {
                    setForgotMsg("Failed to send code. Try again.");
                  }
                  setSendingOtp(false);
                }}
                style={{
                  width: "100%", padding: "12px 0", background: "#38bdf8", color: "#000",
                  border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14,
                  cursor: sendingOtp ? "wait" : "pointer", opacity: sendingOtp ? 0.6 : 1,
                }}
              >
                {sendingOtp ? "Sending..." : "Send Verification Code"}
              </button>
              <p
                onClick={() => { setForgotMode(false); setForgotMsg(""); }}
                style={{ color: "#888", fontSize: 13, marginTop: 16, cursor: "pointer" }}
              >
                Back to login
              </p>
            </div>
          ) : (
            /* --- VERIFY OTP --- */
            <form onSubmit={(e) => {
              e.preventDefault();
              if (otp === generatedOtp) {
                setAuthed(true);
                setForgotMode(false);
              } else {
                setForgotMsg("Invalid code. Try again.");
              }
            }}>
              <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Enter Code</h2>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>
                Check your email for the 6-digit code
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                maxLength={6}
                autoFocus
                style={{
                  width: "100%", padding: "12px 16px", background: "#0a0a0a",
                  border: "1px solid #1a1a1a", borderRadius: 8, color: "#fff",
                  fontSize: 20, outline: "none", boxSizing: "border-box",
                  textAlign: "center", letterSpacing: 8, marginBottom: 8,
                }}
              />
              {forgotMsg && (
                <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>{forgotMsg}</p>
              )}
              <button
                type="submit"
                style={{
                  width: "100%", padding: "12px 0", background: "#38bdf8", color: "#000",
                  border: "none", borderRadius: 8, fontWeight: 600, fontSize: 14,
                  cursor: "pointer", marginTop: 8,
                }}
              >
                Verify & Login
              </button>
              <p
                onClick={() => { setOtpSent(false); setOtp(""); setForgotMsg(""); }}
                style={{ color: "#888", fontSize: 13, marginTop: 16, cursor: "pointer" }}
              >
                Resend code
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0a0a0a", color: "#e5e5e5", fontFamily: "'Poppins', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 250, background: "#111", borderRight: "1px solid #1a1a1a", padding: "24px 20px", flexShrink: 0, overflowY: "auto" }}>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 10, height: 10, background: "#38bdf8", borderRadius: "50%", display: "inline-block" }} />
          CMS Panel
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 12px",
                marginBottom: 4,
                cursor: "pointer",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 500 : 400,
                color: activeTab === tab.id ? "#fff" : "#888",
                background: activeTab === tab.id ? "rgba(255,255,255,0.06)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px 56px", overflowY: "auto", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* HERO */}
          {activeTab === "hero" && (
            <div>
              <SectionTitle>Hero / Home</SectionTitle>
              <Label>Title</Label>
              <Input value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
              <Label>Description</Label>
              <Textarea value={data.hero.description} onChange={(v) => setData({ ...data, hero: { ...data.hero, description: v } })} />
              <Label>Profile Image</Label>
              <FileUpload
                accept="image/*"
                current={data.hero.image}
                onUploaded={(p) => setData({ ...data, hero: { ...data.hero, image: p } })}
              />
              <Label>CV (PDF)</Label>
              <FileUpload
                accept=".pdf"
                current={data.hero.cvLink}
                onUploaded={(p) => setData({ ...data, hero: { ...data.hero, cvLink: p } })}
              />
              <Label>Blog Link</Label>
              <Input value={data.hero.blogLink} onChange={(v) => setData({ ...data, hero: { ...data.hero, blogLink: v } })} />
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* HIRE */}
          {activeTab === "hire" && (
            <div>
              <SectionTitle>Hire Box</SectionTitle>
              <Label>Text</Label>
              <Input value={data.hire.text} onChange={(v) => setData({ ...data, hire: { ...data.hire, text: v } })} />
              <Label>Dot Color</Label>
              <input
                type="color"
                value={data.hire.color}
                onChange={(e) => setData({ ...data, hire: { ...data.hire, color: e.target.value } })}
                style={{ width: "100%", height: 40, background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, cursor: "pointer" }}
              />
              <Checkbox label="Visible" checked={data.hire.visible} onChange={(v) => setData({ ...data, hire: { ...data.hire, visible: v } })} />
              <Checkbox label="Glow effect" checked={data.hire.glow} onChange={(v) => setData({ ...data, hire: { ...data.hire, glow: v } })} />
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <div>
              <SectionTitle>About</SectionTitle>
              <Label>Section Title</Label>
              <Input value={data.about.title} onChange={(v) => setData({ ...data, about: { ...data.about, title: v } })} />
              <Label>Full Name</Label>
              <Input value={data.about.name} onChange={(v) => setData({ ...data, about: { ...data.about, name: v } })} />
              <Label>Intro Paragraph</Label>
              <Textarea value={data.about.intro} onChange={(v) => setData({ ...data, about: { ...data.about, intro: v } })} />
              <Label>Description</Label>
              <Textarea value={data.about.description} onChange={(v) => setData({ ...data, about: { ...data.about, description: v } })} />

              <Divider />
              <SubTitle>Experience</SubTitle>
              {data.experience.map((exp, i) => (
                <ListItem key={i} title={exp.role} sub={`${exp.company} · ${exp.duration}`}
                  onDelete={() => { const d2 = { ...data, experience: data.experience.filter((_, idx) => idx !== i) }; setData(d2); }} />
              ))}
              <div style={{ marginTop: 12 }}>
                <Input value={expRole} onChange={setExpRole} placeholder="Role" />
                <Input value={expCompany} onChange={setExpCompany} placeholder="Company" />
                <Input value={expDuration} onChange={setExpDuration} placeholder="Duration (e.g. 2024 - Present)" />
                <Textarea value={expDesc} onChange={setExpDesc} placeholder="Description" />
                <AddBtn onClick={() => {
                  if (!expRole) return;
                  setData({ ...data, experience: [...data.experience, { role: expRole, company: expCompany, duration: expDuration, desc: expDesc }] });
                  setExpRole(""); setExpCompany(""); setExpDuration(""); setExpDesc("");
                }}>+ Add Experience</AddBtn>
              </div>
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <div>
              <SectionTitle>Skills</SectionTitle>
              {data.skills.map((skill, i) => (
                <ListItem key={i} title={skill.title} sub={skill.desc}
                  onDelete={() => setData({ ...data, skills: data.skills.filter((_, idx) => idx !== i) })} />
              ))}
              <Divider />
              <SubTitle>Add New Skill</SubTitle>
              <Input value={skillTitle} onChange={setSkillTitle} placeholder="Skill title (e.g. Python)" />
              <Input value={skillIcon} onChange={setSkillIcon} placeholder="FontAwesome icon (e.g. fa-code)" />
              <Input value={skillDesc} onChange={setSkillDesc} placeholder="Short description" />
              <AddBtn onClick={() => {
                if (!skillTitle) return;
                setData({ ...data, skills: [...data.skills, { title: skillTitle, icon: skillIcon, desc: skillDesc }] });
                setSkillTitle(""); setSkillIcon(""); setSkillDesc("");
              }}>+ Add Skill</AddBtn>
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === "projects" && (
            <div>
              <SectionTitle>Projects</SectionTitle>
              {data.projects.map((project, i) => (
                <ListItem key={i} title={project.title} sub={project.tags.join(", ")}
                  onDelete={() => setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })} />
              ))}
              <Divider />
              <SubTitle>Add New Project</SubTitle>
              <Input value={pTitle} onChange={setPTitle} placeholder="Project name" />
              <Textarea value={pDesc} onChange={setPDesc} placeholder="Description" />
              <Input value={pTags} onChange={setPTags} placeholder="Tags (comma separated)" />
              <Input value={pDemo} onChange={setPDemo} placeholder="Demo / Live link" />
              <Input value={pCode} onChange={setPCode} placeholder="Source code link" />
              <Checkbox label="Featured" checked={pFeatured} onChange={setPFeatured} />
              <AddBtn onClick={() => {
                if (!pTitle) return;
                setData({ ...data, projects: [...data.projects, {
                  id: "p" + Date.now(), title: pTitle, desc: pDesc,
                  tags: pTags.split(",").map((t) => t.trim()).filter(Boolean),
                  featured: pFeatured, demo: pDemo, code: pCode,
                }] });
                setPTitle(""); setPDesc(""); setPTags(""); setPDemo(""); setPCode(""); setPFeatured(false);
              }}>+ Add Project</AddBtn>
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* SOCIALS */}
          {activeTab === "socials" && (
            <div>
              <SectionTitle>Social Links</SectionTitle>
              {(["linkedin", "github", "kaggle", "twitter", "instagram"] as const).map((key) => (
                <div key={key}>
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input value={data.socials[key]} onChange={(v) => setData({ ...data, socials: { ...data.socials, [key]: v } })} placeholder={`https://${key}.com/...`} />
                </div>
              ))}
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* NAVBAR */}
          {activeTab === "navbar" && (
            <div>
              <SectionTitle>Navbar Links</SectionTitle>
              {data.navbar.map((item, i) => (
                <div key={i} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <input
                      value={item.text}
                      onChange={(e) => {
                        const nav = [...data.navbar];
                        nav[i] = { ...nav[i], text: e.target.value };
                        setData({ ...data, navbar: nav });
                      }}
                      placeholder="Label"
                      style={inputStyle}
                    />
                    <input
                      value={item.link}
                      onChange={(e) => {
                        const nav = [...data.navbar];
                        nav[i] = { ...nav[i], link: e.target.value };
                        setData({ ...data, navbar: nav });
                      }}
                      placeholder="#section"
                      style={inputStyle}
                    />
                    <input
                      value={item.icon}
                      onChange={(e) => {
                        const nav = [...data.navbar];
                        nav[i] = { ...nav[i], icon: e.target.value };
                        setData({ ...data, navbar: nav });
                      }}
                      placeholder="fa-icon"
                      style={{ ...inputStyle, maxWidth: 120 }}
                    />
                  </div>
                </div>
              ))}
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}

          {/* GENERAL */}
          {activeTab === "general" && (
            <div>
              <SectionTitle>General Settings</SectionTitle>
              <Label>Footer Text</Label>
              <Input value={data.footer.text} onChange={(v) => setData({ ...data, footer: { ...data.footer, text: v } })} />
              <Label>Footer Year</Label>
              <Input value={data.footer.year} onChange={(v) => setData({ ...data, footer: { ...data.footer, year: v } })} />
              <Divider />
              <SubTitle>Admin Password</SubTitle>
              <Input value={data.adminPassword} onChange={(v) => setData({ ...data, adminPassword: v })} placeholder="Admin password" />
              <p style={{ color: "#888", fontSize: 12, marginTop: 6 }}>Change your admin password here. Save to apply.</p>
              <SaveBtn saving={saving} onClick={() => save(data)} />
            </div>
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, background: toast.startsWith("Downloaded") ? "#38bdf8" : "#ef4444",
          color: "#000", padding: "10px 20px", borderRadius: 8, fontWeight: 600, fontSize: 14, zIndex: 999,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- Inline style for navbar inputs ---------- */
const inputStyle: React.CSSProperties = {
  flex: 1, padding: "8px 12px", background: "#0a0a0a", border: "1px solid #1a1a1a",
  borderRadius: 8, color: "#fff", fontSize: 13, outline: "none",
};

/* ---------- Sub-components ---------- */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", borderBottom: "1px solid #1a1a1a", paddingBottom: 12, marginBottom: 24 }}>{children}</h3>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: "block", marginTop: 16, marginBottom: 6, color: "#888", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{children}</label>;
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "10px 14px", background: "#111", border: "1px solid #1a1a1a",
        borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", marginTop: 4, boxSizing: "border-box",
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      style={{
        width: "100%", padding: "10px 14px", background: "#111", border: "1px solid #1a1a1a",
        borderRadius: 8, color: "#fff", fontSize: 14, outline: "none", resize: "vertical", marginTop: 4, boxSizing: "border-box",
      }}
    />
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "#888", fontSize: 14, cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        marginTop: 24, padding: "10px 24px", background: "#38bdf8", color: "#000", border: "none",
        borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.6 : 1,
      }}
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );
}

function AddBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", marginTop: 12, padding: "10px 0", background: "#111", color: "#38bdf8",
        border: "1px solid #1a1a1a", borderRadius: 8, cursor: "pointer", fontWeight: 500, fontSize: 14,
      }}
    >
      {children}
    </button>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{children}</h4>;
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #1a1a1a", margin: "24px 0" }} />;
}

function ListItem({ title, sub, onDelete }: { title: string; sub: string; onDelete: () => void }) {
  return (
    <div style={{
      background: "#111", border: "1px solid #1a1a1a", padding: 16, borderRadius: 8,
      marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <b style={{ color: "#fff", fontSize: 14, display: "block", marginBottom: 2 }}>{title}</b>
        <span style={{ color: "#888", fontSize: 12 }}>{sub}</span>
      </div>
      <button
        onClick={onDelete}
        style={{
          background: "transparent", color: "#ef4444", padding: "6px 12px", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 8, cursor: "pointer", fontSize: 13,
        }}
      >
        Delete
      </button>
    </div>
  );
}

function FileUpload({ accept, current, onUploaded }: { accept: string; current: string; onUploaded: (path: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (json.ok) {
        onUploaded(json.path);
      }
    } catch {
      // ignore
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const isImage = accept.startsWith("image");

  return (
    <div style={{ marginTop: 4 }}>
      {/* Current file preview */}
      {current && (
        <div style={{ marginBottom: 8 }}>
          {isImage ? (
            <img
              src={current}
              alt="Current"
              style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #1a1a1a" }}
            />
          ) : (
            <span style={{ color: "#888", fontSize: 13 }}>Current: {current}</span>
          )}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? "#38bdf8" : "#1a1a1a"}`,
          borderRadius: 8,
          padding: "24px 16px",
          textAlign: "center",
          background: dragOver ? "rgba(56,189,248,0.05)" : "#111",
          transition: "all 0.15s",
          cursor: "pointer",
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = accept;
          input.onchange = () => {
            const file = input.files?.[0];
            if (file) upload(file);
          };
          input.click();
        }}
      >
        {uploading ? (
          <span style={{ color: "#38bdf8", fontSize: 14 }}>Uploading...</span>
        ) : (
          <>
            <span style={{ color: "#888", fontSize: 14 }}>
              {isImage ? "Drop image here or click to browse" : "Drop PDF here or click to browse"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
