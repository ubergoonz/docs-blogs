(() => {
  const canvas = document.getElementById("matrix-rain");
  // Instant navigation can evaluate extra scripts again without replacing the backdrop.
  if (canvas.dataset.matrixReady === "true") return;

  const context = canvas.getContext("2d");
  if (!context) {
    console.warn("Matrix rain is unavailable: this browser does not support a 2D canvas.");
    return;
  }
  canvas.dataset.matrixReady = "true";

  const toggle = document.getElementById("rain-toggle");
  const header = document.querySelector(".md-header__inner");
  const controls = document.querySelector(".matrix-controls");
  if (header && controls) header.append(controls);
  const label = document.getElementById("rain-label");
  const symbol = toggle.querySelector(".toggle-symbol");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const glyphs = "01<>[]{}:;+=*".split("").concat(
    Array.from({ length: 55 }, (_, index) => String.fromCharCode(0xff66 + index))
  );
  const fontSize = 20;
  let width = 0;
  let height = 0;
  let streams = [];
  let frame = 0;
  let previousTime = 0;
  let paused = motion.matches;

  const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)];

  function draw(delta) {
    context.clearRect(0, 0, width, height);
    context.font = `${fontSize}px monospace`;
    for (const stream of streams) {
      stream.y += stream.speed * delta;
      if (stream.y - stream.characters.length * fontSize > height) {
        stream.y = -fontSize;
      }
      for (let index = stream.characters.length - 1; index >= 0; index--) {
        const y = stream.y - index * fontSize;
        if (y < -fontSize || y > height + fontSize) continue;
        const opacity = 1 - index / stream.characters.length;
        context.fillStyle = index === 0
          ? "rgba(208, 255, 221, 0.95)"
          : `rgba(65, 225, 110, ${opacity * 0.65})`;
        context.fillText(stream.characters[index], stream.x, y);
      }
      if (delta > 0 && Math.random() < 0.12) {
        stream.characters[Math.floor(Math.random() * stream.characters.length)] = randomGlyph();
      }
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    streams = Array.from({ length: Math.ceil(width / fontSize) }, (_, index) => {
      const length = 10 + Math.floor(Math.random() * 22);
      return {
        x: index * fontSize,
        y: Math.random() * (height + length * fontSize),
        speed: 35 + Math.random() * 65,
        characters: Array.from({ length }, randomGlyph)
      };
    });
    draw(0);
  }

  function animate(time) {
    if (!previousTime) previousTime = time;
    const elapsed = time - previousTime;
    if (elapsed >= 1000 / 30) {
      draw(Math.min(elapsed / 1000, 0.1));
      previousTime = time;
    }
    frame = window.requestAnimationFrame(animate);
  }

  function syncAnimation() {
    window.cancelAnimationFrame(frame);
    previousTime = 0;
    toggle.setAttribute("aria-pressed", String(paused));
    label.textContent = paused ? "Resume" : "Pause";
    toggle.title = label.textContent;
    symbol.textContent = paused ? ">" : "||";
    if (!paused && !document.hidden) frame = window.requestAnimationFrame(animate);
  }

  toggle.hidden = false;
  toggle.addEventListener("click", () => {
    paused = !paused;
    syncAnimation();
  });
  motion.addEventListener("change", (event) => {
    paused = event.matches;
    syncAnimation();
  });
  document.addEventListener("visibilitychange", syncAnimation);
  window.addEventListener("resize", resize);
  window.addEventListener("pagehide", () => window.cancelAnimationFrame(frame));
  window.addEventListener("pageshow", syncAnimation);
  resize();
  syncAnimation();
})();
