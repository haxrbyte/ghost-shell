console.log('[TOC] script loaded');
// HaxrByte — Auto sidebar index (robust + fallbacks)
(function () {
  function slugify(t){return t.trim().toLowerCase().replace(/[^\w\- ]+/g,"").replace(/\s+/g,"-").slice(0,64)||"section";}
  function safeSel(id){return 'a[href="#'+id.replace(/"/g,"").replace(/\\/g,"")+'"]';}

  document.addEventListener("DOMContentLoaded", () => {
    console.log("[TOC] init");
    const root = document.querySelector(".wrapper") || document.body;

    let heads = Array.from(root.querySelectorAll("h2, h3"));
    if (!heads.length) heads = Array.from(root.querySelectorAll("h1, h2"));
    console.log("[TOC] found", heads.length, "headings");

    if (!heads.length) return;
    heads.forEach(h => { if (!h.id) h.id = slugify(h.textContent); });

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
        try { history.replaceState(null, "", `#${h.id}`); } catch (_) {}
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    document.body.appendChild(nav);
    document.body.classList.add("with-sidebar");
    console.log("[TOC] sidebar mounted");
  });
})();
