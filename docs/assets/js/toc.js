// HaxrByte — Auto sidebar index (safe version)
(function(){
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".wrapper") || document.body;
    const heads = [...root.querySelectorAll("h2, h3")];
    if (!heads.length) return;

    // assign ids if missing
    heads.forEach(h => {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase()
          .replace(/[^\w\- ]+/g,"").replace(/\s+/g,"-").slice(0,64);
      }
    });

    const nav = document.createElement("nav");
    nav.className = "hx-sidebar";
    nav.innerHTML = `<div class="hx-sidebar__title">Index</div><ul></ul>`;
    const ul = nav.querySelector("ul");

    heads.forEach(h => {
      const li = document.createElement("li");
      li.className = h.tagName === "H3" ? "lvl-3" : "lvl-2";
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent.trim();
      a.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${h.id}`);
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    document.body.appendChild(nav);
    document.body.classList.add("with-sidebar");

    // highlight active section
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = nav.querySelector(`a[href="#${CSS.escape(entry.target.id)}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          nav.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    }, { rootMargin: "0px 0px -70% 0px", threshold: 0.1 });

    heads.forEach(h => obs.observe(h));
  });
})();
