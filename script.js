// ---- Your work ----
// The easy way: drop files into content/research, content/models or content/decks and run build.py
// (or let the GitHub Action do it). Those cards come from content/projects.js.
// You can still add cards by hand in `manualProjects` below; they show after the dropped-in ones.
// The three examples below only show while nothing has been dropped in yet.
//
// category: "research" | "models" | "decks"
// image:  screenshot or cover in assets/ (optional; a colored placeholder shows if empty)
// pdf:    a PDF in assets/ (paper, model write-up, or deck exported to PDF). Opens in an in-page viewer.
// embed:  optional embed URL instead of a PDF (Google Slides "Publish to web" embed link, Canva/Pitch embed, etc.)
// download: a file visitors can download, e.g. your .xlsx model
// highlights: (models) a few headline outputs shown on the card
// links:  any other links, e.g. GitHub repo, notebook, published article, live demo
const manualProjects = [];

const exampleProjects = [
  {
    category: "research",
    title: "Research Paper Title",
    meta: "Working paper · 2026",
    description: "One or two sentences: the question you asked, how you approached it, and the key finding.",
    tags: ["Topic", "Method"],
    image: "",
    pdf: "assets/research/paper.pdf",
    links: [{ label: "SSRN / arXiv", url: "#" }],
  },
  {
    category: "models",
    title: "Company Name DCF Model",
    meta: "DCF · Excel · 2026",
    description: "What you valued and why, the key assumptions, and the output (e.g. implied share price vs. market).",
    tags: ["DCF", "3-Statement", "Valuation"],
    // highlights: 2 to 3 headline outputs shown on the card
    highlights: [
      { label: "Implied price", value: "$00.00" },
      { label: "Upside", value: "00%" },
      { label: "WACC", value: "0.0%" },
    ],
    image: "",          // tip: a screenshot of the summary/output tab looks great here
    pdf: "",            // optional: PDF of the summary tab or a one-page write-up
    download: "assets/models/model.xlsx",
    links: [],
  },
  {
    category: "decks",
    title: "Pitch Deck Name",
    meta: "Seed round · 2026",
    description: "Who it was for, what it pitched, and the outcome if you can share it (raised, won, adopted).",
    tags: ["Strategy", "Fundraising"],
    image: "",
    pdf: "assets/decks/deck.pdf",
    links: [],
  },
];

const generated = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
const projects = generated.length || manualProjects.length ? [...generated, ...manualProjects] : exampleProjects;

// ---- Rendering (no need to edit below) ----
const LABELS = { research: "Research", models: "Financial Model", decks: "Pitch Deck" };
const VIEW_LABEL = { research: "Read paper", models: "View summary", decks: "View deck" };
// Decorative line charts shown on cards that have no cover image
const LINES = {
  research: `<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="M0 34 L12 30 L24 32 L36 22 L48 25 L60 15 L72 18 L84 8 L100 10 L100 40 L0 40Z"/><path d="M0 34 L12 30 L24 32 L36 22 L48 25 L60 15 L72 18 L84 8 L100 10"/></svg>`,
  models: `<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="M0 36 C20 34 30 28 45 24 S70 12 100 4 L100 40 L0 40Z"/><path d="M0 36 C20 34 30 28 45 24 S70 12 100 4"/></svg>`,
  decks: `<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="M4 40 V30 H16 V40Z M24 40 V24 H36 V40Z M44 40 V18 H56 V40Z M64 40 V12 H76 V40Z M84 40 V4 H96 V40Z"/><path d="M10 30 L30 24 L50 18 L70 12 L90 4"/></svg>`,
};
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

document.getElementById("projects").innerHTML = projects
  .map((p, i) => {
    const doc = p.embed || p.pdf;
    return `
    <article class="card" data-category="${esc(p.category)}">
      <div class="thumb">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy" />` : (LINES[p.category] || "")}</div>
      <div class="body">
        <span class="kind">${esc(LABELS[p.category] || "")}</span>
        <h3>${esc(p.title)}</h3>
        ${p.meta ? `<span class="meta">${esc(p.meta)}</span>` : ""}
        <p>${esc(p.description)}</p>
        ${p.highlights ? `<dl class="highlights">${p.highlights.map((h) => `<div><dt>${esc(h.label)}</dt><dd>${esc(h.value)}</dd></div>`).join("")}</dl>` : ""}
        <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="links">
          ${doc ? `<button data-view="${i}">${esc(VIEW_LABEL[p.category] || "View")} →</button>` : ""}
          ${p.download ? `<a href="${esc(p.download)}" download>Download ${esc((p.download.split(".").pop() || "").toUpperCase())} ↓</a>` : ""}
          ${(p.links || []).map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} →</a>`).join("")}
        </div>
      </div>
    </article>`;
  })
  .join("");

// Filters
document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    const f = chip.dataset.filter;
    document.querySelectorAll(".card").forEach((card) => {
      card.hidden = f !== "all" && card.dataset.category !== f;
    });
  })
);

// Document viewer (PDFs and slide embeds). On small screens, open in a new tab instead.
const viewer = document.getElementById("viewer");
const frame = document.getElementById("viewer-frame");
document.getElementById("projects").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-view]");
  if (!btn) return;
  const p = projects[btn.dataset.view];
  const url = p.embed || p.pdf;
  if (window.innerWidth < 720 || !viewer.showModal) { window.open(url, "_blank", "noopener"); return; }
  document.getElementById("viewer-title").textContent = p.title;
  document.getElementById("viewer-open").href = url;
  frame.src = url;
  viewer.showModal();
});
document.getElementById("viewer-close").addEventListener("click", () => viewer.close());
viewer.addEventListener("close", () => { frame.src = "about:blank"; });
viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

document.getElementById("year").textContent = new Date().getFullYear();
