// HaxrByte — Auto sidebar index from H2/H3
(function () {
  const ENABLED = (document.body.dataset.toc ?? "true") !== "false"; // allow per-page disable
  if (!ENABLED) return;

  document.addEventListener("DOMContentLoaded", () => {
    const contentRoot = document.querySelector(".wrapper") || document.body;

    // Collect headings
    const heads = [...contentRoot.querySelectorAll("h2, h3")];
    if (!heads.length) return;

    // Ensure headings have ids
    heads.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.trim()
          .toLowerCase()
          .replace(/[^\w\- ]+/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 64);
      }
    });

    // Build nav
    const nav = document.createElement("nav");
    nav.className = "hx-sidebar";
    const title = document.createElement("div");
    title.className = "hx-sidebar__title";
    title.textContent = "Index";
    nav.appendChild(title);

    const ul = document.createElement("ul");
    heads.forEach(h => {
      const li = document.createElement("li");
      li.className = h.tagName === "H3" ? "lvl-3" : "lvl-2";
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent.trim();
      a.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(a.getAttribute("href"))?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", a.getAttribute("href"));
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    document.body.appendChild(nav);

    // Active section highlight
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = nav.querySelector(`a[href="#${CSS.escape(id)}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          nav.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "0px 0px -70% 0px", threshold: 0.1 });

    heads.forEach(h => observer.observe(h));
  });
})();
