---
title: CTF Cheat Sheet
---

**Tagline:** *Everyday Hacks to Elite Attacks — Cyber Warfare. Ghost Ops. Red Team Tactics. HaxrByte.*

* TOC
{:toc}

# PortScan

## Namp
```bash
nmap <target> -sC -sV -p- -T4 -vv -oA target
```

## RustScan
```bash
rustscan -a <target> -- -sCV -oA target
```

