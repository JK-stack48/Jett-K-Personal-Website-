// Terminal theme extras: typed prompt + falling code rain in the hero.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Typed command
  const cmd = "cat about.txt";
  const el = document.getElementById("typed");
  if (el) {
    if (reduce) el.textContent = cmd;
    else { let i = 0; const t = setInterval(() => { el.textContent = cmd.slice(0, ++i); if (i >= cmd.length) clearInterval(t); }, 90); }
  }

  // Code rain (finance/energy flavoured characters)
  const c = document.getElementById("rain");
  if (!c || reduce) return;
  const ctx = c.getContext("2d");
  const chars = "0123456789$%+-=<>{}[]/*.EBITDAWACCNPVIRRDCFLBOMWhBTU".split("");
  const size = 16;
  let cols = [], w = 0, h = 0;
  const resize = () => {
    const r = c.getBoundingClientRect(); const d = devicePixelRatio || 1;
    w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    cols = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * -h / size);
  };
  resize(); addEventListener("resize", resize);
  let last = 0;
  const draw = (ts) => {
    requestAnimationFrame(draw);
    if (ts - last < 55) return; last = ts;
    ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = "source-over";
    ctx.font = `${size - 2}px "JetBrains Mono", monospace`;
    cols.forEach((y, i) => {
      const ch = chars[(Math.random() * chars.length) | 0];
      ctx.fillStyle = Math.random() < 0.05 ? "#1d4ed8" : "#93b4f0";
      ctx.fillText(ch, i * size, y * size);
      cols[i] = y * size > h && Math.random() > 0.975 ? 0 : y + 1;
    });
  };
  requestAnimationFrame(draw);
})();
