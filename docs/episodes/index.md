---
layout: page
title: Episodes
---

{% assign posts = site.posts | where_exp: "p", "p.categories contains 'episode'" %}
{% for post in posts %}
- **{{ post.title }}** — {{ post.subtitle }}  
  [Watch]({{ post.video_url }}) · [Repo]({{ post.repo_url }}) · [Open]({{ post.url }})
{% endfor %}
