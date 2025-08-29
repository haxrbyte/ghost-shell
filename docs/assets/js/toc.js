// HaxrByte — Auto sidebar index (robust + fallbacks)
(function () {
  function slugify(txt) {
    return txt.trim().toLowerCase()
      .replace(/[^\w\- ]+/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 64) || "section";
  }

  function safeSel(id) {
    // Avoid CSS.escape dependency
    return 'a[href="#' + id.replace(/"/g,"").replace(/\\/g,"") + '"]';
  }

  document.addEventListener("DOMContentLoaded", () => {
    console.log("[TOC] init");

    const root = document.querySelector(".wrapper") || document.body;

    // Prefer H2/H3; fall back to H1/H2 if none
    let heads = Array.from(root.querySelectorAll("h2, h3"));
    if (heads.length === 0) heads = Array.from(root.querySelectorAll("h1, h2"));

    console.log("[TOC] found", heads.length, "headings");
    if (!heads.length) return;

    // Ensure IDs
    heads.forEach(h => { if (!h.id) h.id = slugify(h.textContent); });

    // Build sidebar
    const nav = document.createElement("nav");
    nav.className = "hx-sidebar";
    nav.innerHTML = `<div class="hx-sidebar__title">Index</div><ul></ul>`;
    const ul = nav.querySelector("ul");

    heads.forEach(h => {
      const li = document.createElement("li");
      li.className = h.tagName === "H3" ? "lvl-3" : "lvl-2";
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent.trim() || h.id;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        // keep URL in sync for sharing
        try { history.replaceState(null, "", `#${h.id}`); } catch (_) {}
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    document.body.appendChild(nav);
    document.body.classList.add("with-sidebar");

    // Highlight active section — with IntersectionObserver fallback
    function setActive(id) {
      nav.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
      const link = nav.querySelector(safeSel(id));
      if (link) link.classList.add("active");
    }

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id));
      }, { rootMargin: "0px 0px -70% 0px", threshold: 0.1 });
      heads.forEach(h => io.observe(h));
    } else {
      // Fallback: scroll listener
      const pos = heads.map(h => ({ id: h.id, y: h.getBoundingClientRect().top + window.scrollY }));
      window.addEventListener("scroll", () => {
        const y = window.scrollY + window.innerHeight * 0.3;
        let current = pos[0].id;
        for (const p of pos) if (p.y <= y) current = p.id;
        setActive(current);
      }, { passive: true });
    }

    console.log("[TOC] sidebar mounted");
  });
})();
