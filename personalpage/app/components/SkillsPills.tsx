'use client';

const skillGroups = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python"] },
  { label: "Frontend", skills: ["React", "Next.js", "React Native", "Expo", "Redux", "Redux Toolkit", "Tailwind CSS", "AJAX", "HTML", "CSS", "SCSS"] },
  { label: "Backend", skills: ["Node.js", "Express.js", "GraphQL", "Bun", "REST API"] },
  { label: "Databases", skills: ["MongoDB", "Mongoose", "PostgreSQL", "SQL", "SQLite", "Redis"] },
  { label: "AI & ML", skills: ["LangChain", "RAG", "OpenAI API", "OpenAI Embeddings", "FAISS", "Prompt Engineering", "LLMs"] },
  { label: "DevOps & Tooling", skills: ["Git", "GitHub Actions", "Docker", "AWS", "CI/CD", "Vercel", "Webpack", "Vite"] },
  { label: "Testing", skills: ["Jest", "Supertest", "React Testing Library"] },
]

export default function SkillsPills() {
  return (
    <div className="flex flex-col gap-4">
      {skillGroups.map((group, i) => (
        <div key={group.label}>
          <p className="text-xs uppercase tracking-widest text-white/30 mb-2">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-card/40 px-2 py-0.5 text-xs text-foreground hover:border-accent/60 hover:text-accent transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
          {i < skillGroups.length - 1 && (
            <hr className="mt-4 border-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}