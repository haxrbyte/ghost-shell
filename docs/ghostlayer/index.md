# GhostLayer ARG — Daily Keystone

> Today’s keystone updates at 03:00 UTC. Use it to unlock the next layer.

<div id="seed" style="font-family:monospace"></div>

<script>
(async () => {
  const url = '/ARG/data/arg_seed.json'; // adjust path to your repo/site structure
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    document.getElementById('seed').textContent =
      `Date: ${data.date} | Keystone: ${data.keystone} | Sig: ${data.sig}`;
  } catch (e) {
    document.getElementById('seed').textContent = 'Keystone unavailable.';
  }
})();
</script>
