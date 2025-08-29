// HaxrByte — Copy buttons for code blocks (highlight-aware)
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
    const blocks = document.querySelectorAll("div.highlight pre code, pre code");
    console.log("HaxrByte code blocks found:", blocks.length);

    blocks.forEach((code) => {
      const container =
        code.closest("div.highlight") ||      // Rouge container
        code.closest("pre")?.parentElement || // fallback parent
        code.parentElement;

      if (!container || container.classList.contains("hx-has-copy")) return;
      container.classList.add("hx-has-copy");
      container.style.position = container.style.position || "relative";

      // Add language label
      const lang = (code.className.match(/language-([a-z0-9+\-]+)/i) || [,"code"])[1];
      const label = document.createElement("div");
      label.className = "hx-lang";
      label.textContent = lang.toLowerCase();
      container.appendChild(label);

      // Add copy button
      const btn = makeBtn();
      container.appendChild(btn);

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
        } catch {
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
