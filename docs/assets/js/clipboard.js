// HaxrByte — Copy buttons for code blocks
(function () {
  // Utility: create button
  function makeBtn(label = "Copy") {
    const b = document.createElement("button");
    b.className = "hx-copy";
    b.type = "button";
    b.setAttribute("aria-label", "Copy code to clipboard");
    b.innerHTML = `<span class="hx-copy__label">${label}</span>`;
    return b;
  }

  function addButtons() {
    // Select code blocks inside <pre>
    document.querySelectorAll("pre > code").forEach((code) => {
      const pre = code.parentElement;
      if (pre.classList.contains("hx-has-copy")) return; // prevent dupes
      pre.classList.add("hx-has-copy");

      // Wrap <pre> to position button
      const wrap = document.createElement("div");
      wrap.className = "hx-codewrap";
      pre.replaceWith(wrap);
      wrap.appendChild(pre);

      // Add a language label if present (class like "language-bash")
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
            // Fallback
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
