---
layout: heartbeat-default
---

{% include scrolltop.html %}
<nav>
{% include browse.html %}
</nav>
{% assign events = site.events | where: "event_type", page.event_type %}

{% assign myDate = "" %}
<main class="grid flex-grid">{% for post in events %}
   {% assign currentDate = post.date | date: "%Y" %}
   {% if currentDate != myDate %}
   {% unless forloop.first %}</ul>{% endunless %}
 <h1 style="margin-top:20px; margin-bottom:10px">{{ currentDate }}</h1>
 <ul>
   {% assign myDate = currentDate %}
   {% endif %}
   <li><a style="color:white;" target="_blank" href="{{ post.html_url }}"><span>{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.event_type }} by {{ post.user }} to {{ post.repo }}</a></li>
   {% if forloop.last %}</ul>{% endif %}
{% endfor %}</main>
