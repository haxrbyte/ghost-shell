#!/usr/bin/env python3
# HaxrByte — GhostLayer Nightly ARG Seed Rotation
# - Deterministic: today's keystone index is derived from the date
# - Input:  data/keystones.txt  (one line per keystone)
# - Output: data/arg_seed.json

import hashlib
import json
from pathlib import Path
from datetime import datetime, timezone, date

ROOT = Path(__file__).resolve().parents[1]
KEYSTONES = ROOT / "data" / "keystones.txt"
OUTPUT = ROOT / "data" / "arg_seed.json"

def load_keystones():
    if not KEYSTONES.exists():
        raise SystemExit(f"[!] Missing {KEYSTONES}")
    lines = [ln.strip() for ln in KEYSTONES.read_text(encoding="utf-8").splitlines()]
    lines = [ln for ln in lines if ln and not ln.startswith("#")]
    if not lines:
        raise SystemExit("[!] keystones.txt is empty")
    return lines

def day_index(d: date, modulo: int) -> int:
    # Use YYYYMMDD hashed to spread picks; then mod the list length
    seed_str = d.strftime("%Y%m%d")
    digest = hashlib.sha256(seed_str.encode()).hexdigest()
    # take first 8 hex chars for a stable int
    n = int(digest[:8], 16)
    return n % modulo

def build_payload(today: date, keystones: list[str]) -> dict:
    idx = day_index(today, len(keystones))
    ks = keystones[idx]

    # Optional helper hashes for puzzle design
    ymd = today.strftime("%Y-%m-%d")
    h = hashlib.sha256(f"{ymd}:{ks}".encode()).hexdigest()
    short = h[:12]

    return {
        "date": ymd,                 # ISO date (UTC)
        "index": idx,                # selected line index in keystones.txt
        "keystone": ks,              # today's keystone (your "daily code")
        "sig": short,                # short signature usable in hints
        "hash": h                    # full SHA256 if you need verification
    }

def main():
    # Always rotate based on UTC to avoid timezone drift
    today = datetime.now(timezone.utc).date()
    keystones = load_keystones()
    payload = build_payload(today, keystones)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"[+] Wrote {OUTPUT} for {payload['date']} (idx={payload['index']})")

if __name__ == "__main__":
    main()
