import { useEffect, useState } from "react";

const STORAGE_KEY = "resumepro-draft";

const emptyExperience = () => ({
  role: "",
  company: "",
  dates: "",
  details: "",
});

const emptyEducation = () => ({
  degree: "",
  school: "",
  dates: "",
  details: "",
});

const defaultResume = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  skills: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
};

const fieldClass =
  "mt-1.5 w-full rounded border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15";

function TextField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      {label}
      <input
        className={fieldClass}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

function ResumeMaker() {
  const [resume, setResume] = useState(() => {
    try {
      return {
        ...defaultResume,
        ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
      };
    } catch {
      return defaultResume;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  const updateField = (field, value) => {
    setResume((current) => ({ ...current, [field]: value }));
  };

  const updateEntry = (section, index, field, value) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    }));
  };

  const addEntry = (section, createEntry) => {
    setResume((current) => ({
      ...current,
      [section]: [...current[section], createEntry()],
    }));
  };

  const removeEntry = (section, index) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].filter((_, entryIndex) => entryIndex !== index),
    }));
  };

  const skills = resume.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f3f4ef] text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
              ResumePro / Builder
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Build your resume
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-stone-500 sm:inline">
              Draft saved on this device
            </span>
            <button
              className="rounded bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
              onClick={() => window.print()}
              type="button"
            >
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] items-start gap-7 px-4 py-7 sm:px-8 lg:grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.1fr)] lg:gap-10 lg:py-10">
        <section className="space-y-5" aria-label="Resume details">
          <div className="border-b border-stone-300 pb-3">
            <h2 className="text-lg font-semibold">Your information</h2>
            <p className="mt-1 text-sm text-stone-500">
              Add your details and see your resume update instantly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" value={resume.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Jordan Lee" />
            <TextField label="Professional title" value={resume.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Product Designer" />
            <TextField label="Email" type="email" value={resume.email} onChange={(event) => updateField("email", event.target.value)} placeholder="jordan@email.com" />
            <TextField label="Phone" type="tel" value={resume.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+1 555 010 1234" />
            <TextField label="Location" value={resume.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Toronto, Canada" />
            <TextField label="Website or LinkedIn" value={resume.website} onChange={(event) => updateField("website", event.target.value)} placeholder="linkedin.com/in/jordanlee" />
          </div>

          <label className="block text-sm font-medium text-stone-700">
            Professional summary
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              value={resume.summary}
              onChange={(event) => updateField("summary", event.target.value)}
              placeholder="Write 2–3 sentences about your strengths and career goals."
              rows={4}
            />
          </label>

          <section className="space-y-4 border-t border-stone-300 pt-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Experience</h2>
              <button className="text-sm font-semibold text-emerald-800 hover:text-emerald-950" onClick={() => addEntry("experience", emptyExperience)} type="button">
                + Add experience
              </button>
            </div>
            {resume.experience.map((entry, index) => (
              <div className="space-y-3 border-l-2 border-emerald-800/25 pl-4" key={`experience-${index}`}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Job title" value={entry.role} onChange={(event) => updateEntry("experience", index, "role", event.target.value)} placeholder="Senior Designer" />
                  <TextField label="Company" value={entry.company} onChange={(event) => updateEntry("experience", index, "company", event.target.value)} placeholder="Company name" />
                  <TextField label="Dates" value={entry.dates} onChange={(event) => updateEntry("experience", index, "dates", event.target.value)} placeholder="2022 – Present" />
                  <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
                    Achievements
                    <textarea className={`${fieldClass} min-h-20 resize-y`} value={entry.details} onChange={(event) => updateEntry("experience", index, "details", event.target.value)} placeholder="Describe your impact and results." rows={3} />
                  </label>
                </div>
                {resume.experience.length > 1 && (
                  <button className="text-xs font-medium text-stone-500 hover:text-red-700" onClick={() => removeEntry("experience", index)} type="button">
                    Remove experience
                  </button>
                )}
              </div>
            ))}
          </section>

          <section className="space-y-4 border-t border-stone-300 pt-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Education</h2>
              <button className="text-sm font-semibold text-emerald-800 hover:text-emerald-950" onClick={() => addEntry("education", emptyEducation)} type="button">
                + Add education
              </button>
            </div>
            {resume.education.map((entry, index) => (
              <div className="grid gap-3 border-l-2 border-emerald-800/25 pl-4 sm:grid-cols-2" key={`education-${index}`}>
                <TextField label="Degree or qualification" value={entry.degree} onChange={(event) => updateEntry("education", index, "degree", event.target.value)} placeholder="B.A. Graphic Design" />
                <TextField label="School" value={entry.school} onChange={(event) => updateEntry("education", index, "school", event.target.value)} placeholder="University name" />
                <TextField label="Dates" value={entry.dates} onChange={(event) => updateEntry("education", index, "dates", event.target.value)} placeholder="2018 – 2022" />
                <TextField label="Additional details" value={entry.details} onChange={(event) => updateEntry("education", index, "details", event.target.value)} placeholder="Honors, coursework" />
                {resume.education.length > 1 && (
                  <button className="text-left text-xs font-medium text-stone-500 hover:text-red-700 sm:col-span-2" onClick={() => removeEntry("education", index)} type="button">
                    Remove education
                  </button>
                )}
              </div>
            ))}
          </section>

          <label className="block border-t border-stone-300 pt-5 text-sm font-medium text-stone-700">
            Skills
            <textarea className={`${fieldClass} min-h-20 resize-y`} value={resume.skills} onChange={(event) => updateField("skills", event.target.value)} placeholder="Research, Figma, Prototyping, Communication" rows={3} />
            <span className="mt-1 block text-xs font-normal text-stone-500">Separate each skill with a comma.</span>
          </label>
        </section>

        <section className="lg:sticky lg:top-6" aria-label="Live resume preview">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
            <span>Live preview</span>
            <span>A4 · 1 page layout</span>
          </div>
          <article className="resume-sheet" id="resume-preview">
            <header className="resume-header">
              <h2>{resume.name || "Your Name"}</h2>
              {resume.title && <p className="resume-title">{resume.title}</p>}
              <p className="resume-contact">
                {[resume.email, resume.phone, resume.location, resume.website]
                  .filter(Boolean)
                  .join("  ·  ") || "Email · Phone · Location · LinkedIn"}
              </p>
            </header>

            {resume.summary && (
              <section className="resume-section">
                <h3>Profile</h3>
                <p className="resume-copy">{resume.summary}</p>
              </section>
            )}

            {resume.experience.some((entry) => entry.role || entry.company) && (
              <section className="resume-section">
                <h3>Experience</h3>
                {resume.experience.filter((entry) => entry.role || entry.company).map((entry, index) => (
                  <div className="resume-entry" key={`preview-experience-${index}`}>
                    <div className="resume-entry-heading">
                      <strong>{entry.role || "Job title"}</strong>
                      {entry.dates && <span>{entry.dates}</span>}
                    </div>
                    {entry.company && <p className="resume-muted">{entry.company}</p>}
                    {entry.details && <p className="resume-copy resume-entry-copy">{entry.details}</p>}
                  </div>
                ))}
              </section>
            )}

            {resume.education.some((entry) => entry.degree || entry.school) && (
              <section className="resume-section">
                <h3>Education</h3>
                {resume.education.filter((entry) => entry.degree || entry.school).map((entry, index) => (
                  <div className="resume-entry" key={`preview-education-${index}`}>
                    <div className="resume-entry-heading">
                      <strong>{entry.degree || "Qualification"}</strong>
                      {entry.dates && <span>{entry.dates}</span>}
                    </div>
                    {entry.school && <p className="resume-muted">{entry.school}</p>}
                    {entry.details && <p className="resume-copy resume-entry-copy">{entry.details}</p>}
                  </div>
                ))}
              </section>
            )}

            {skills.length > 0 && (
              <section className="resume-section">
                <h3>Skills</h3>
                <p className="resume-copy">{skills.join("  ·  ")}</p>
              </section>
            )}

            {!resume.summary && !resume.experience.some((entry) => entry.role || entry.company) && !resume.education.some((entry) => entry.degree || entry.school) && !skills.length && (
              <p className="resume-placeholder">Your resume preview will appear here as you add details.</p>
            )}
          </article>
          <p className="mt-3 text-center text-xs text-stone-500 print:hidden">
            Use your browser’s print dialog and choose “Save as PDF.”
          </p>
        </section>
      </div>
    </main>
  );
}

export default ResumeMaker;