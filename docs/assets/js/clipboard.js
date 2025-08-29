// HaxrByte — Copy buttons for code blocks (neon edition)
(function () {
  console.log("HaxrByte clipboard.js loaded");

  function makeBtn(label = "Copy") {
    const b = document.createElement("button");
    b.className = "hx-copy";
    b.type = "button";
    b.setAttribute("aria-label", "Copy code to clipboard");
    b.innerHTML = `<span class="hx-copy__label">${label}</span>`;
    return b;
  }

  function addButtons() {
    // Matches both plain <pre><code> and Rouge <div class="highlight"><pre><code>
    document.querySelectorAll("pre code, div.highlight pre code").forEach((code) => {
      const pre = code.closest("pre");
      if (!pre || pre.classList.contains("hx-has-copy")) return;
      pre.classList.add("hx-has-copy");

      // Wrap <pre> for positioning
      const wrap = document.createElement("div");
      wrap.className = "hx-codewrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      // Add language label if available
      const lang = (code.className.match(/language-([a-z0-9+\-]+)/i) || [,"code"])[1];
      const label = document.createElement("div");
      label.className = "hx-lang";
      label.textContent = lang.toLowerCase();
      wrap.appendChild(label);

      // Add copy button
      const btn = makeBtn();
      wrap.appendChild(btn);

      btn.addEventListener("click", async () => {
        const text = code.innerText;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
          } else {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
          }
          btn.classList.add("hx-copied");
          btn.querySelector(".hx-copy__label").textContent = "Copied!";
          setTimeout(() => {
            btn.classList.remove("hx-copied");
            btn.querySelector(".hx-copy__label").textContent = "Copy";
          }, 1200);
        } catch (e) {
          btn.classList.add("hx-failed");
          btn.querySelector(".hx-copy__label").textContent = "Failed";
          setTimeout(() => {
            btn.classList.remove("hx-failed");
            btn.querySelector(".hx-copy__label").textContent = "Copy";
          }, 1400);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", addButtons);
})();
