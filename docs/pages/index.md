---
layout: projects
title: Tutorials
permalink: /
hide_hero: true
---

{% assign just_repos = site.data.data.latest.cci-repos %}
{% capture all_tags %}{% for tutorial in site.data.tutorials %}{% assign meta = tutorial[1].tutorial %}{% for notebook in meta.notebooks %}{% for tag in notebook.tags %}{{ tag }},{% endfor %}{% assign title_parts = notebook.title | split: ' ' %}{% for title_part in title_parts %}{{ title_part | downcase }},{% endfor %}{% endfor %}{% endfor %},{% for repo in site.data.data.latest.cci-repo_metadata %}{% assign repo_meta = repo[1] %}{% assign repo_name = repo[0] %}{% for tag in repo_meta.topics %}{{ tag }},{% endfor %}{% assign repo_parts = repo_meta.name | split: "/" %}{% assign description = repo_meta.description | split: " "%}{% for part in repo_parts %}{{ part | downcase }},{% endfor %}{% for word in description %}{{ word | downcase }},{% endfor %}{% endfor %}{% for repo in site.data.data.latest.cci-repos %}{% assign repo_meta = repo[1] %}{% assign language = repo_meta.primaryLanguage.name %}{{ language | downcase }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tags_list = all_tags | split:',' | sort | uniq %}


<div class="filters" style='padding-bottom:60px;'>
<h2 style='text-align:center; font-size: 32px; font-family:"Google Sans",sans-serif;padding-bottom:20px'>search tutorials</h2>
    <input name="tags" style="width:600px; margin:auto;margin-bottom:30px">
    <p style="padding-top:10px; text-align:center; margin:auto">Looking for a particular tutorial? Try entering a language, cloud, or term above.</p>
  </div>


<p style="text-align:center; margin:auto"><button id='star-sort' class="btn">Sort by ⭐️</button><button id='language-sort' style="margin-left:10px" class="btn">Sort by Language</button><button id='name-sort' style="margin-left:10px" class="btn">Sort by Name</button></p>
<div class="cards">{% assign avatars = site.data.custom.avatars %}{% assign lookup = site.data.data.latest.cci-repo_metadata %}{% for tutorial in site.data.tutorials %}{% assign tutorial_name = tutorial[0] %}{% assign meta = tutorial[1].tutorial %}{% assign repo_name = meta.project.github %}{% assign repo = just_repos[repo_name] %}{% assign stars = repo.stargazers.totalCount %}{% assign forks = repo.forks.totalCount %}{% assign description = repo.description | split: " " %}{% assign repo_parts = repo.name | split: "/" %}{% assign license = repo.licenseInfo.name %}{% assign language = repo.primaryLanguage.name %}{% assign website = lookup[repo_name].website %}{% for notebook in meta.notebooks %}
<div class="card topic-{{ tutorial_name | downcase }} {% for topic in notebook.tags  %}topic-{{ topic }} {% endfor %} topic-{{ language | downcase }} {% for topic in lookup[repo_name].topics %}topic-{{ topic }} {% endfor %}{% for topic in description %}topic-{{ topic | downcase }} {% endfor %}{% for part in repo_parts %}topic-{{ part | downcase }} {% endfor %}"
    data-name="{{ tutorial_name }}"
    data-notebook="{{ notebook.name }}"
    data-title="{{ notebook.title }}"
    data-forks="{{ forks }}" 
    data-stars="{{ stars }}"
    data-language="{{ language }}"
    data-repository="{{ repo_name }}"
    style="cursor:pointer" data-url="https://github.com/{{ site.repo }}/blob/{{ site.branch }}/tutorials/{{ tutorial_name }}/notebooks/{{ notebook.name }}" data-website="{{ repo.url }}"><span class="card-title">{{ notebook.title | truncate: 100 }}</span><div style="font-size:12px" class="card-tags">⭐️ {{ stars }} <span style="color:#1864f4; margin-left:15px"><strong>{{ language }}</strong></span></div><span class="card-description"><span style="min-height:80px; max-width:80%; display:inline-block !important">{{ notebook.name | truncate: 100 }}</span>
<span style="max-width:20%"><a href="{{ lookup[repo_name].website }}"><img style="width:70px; position: absolute; bottom:10px; right:10px;" src="{% if avatars[repo_name] %}{{ site.baseurl }}/assets/img/custom/avatars/{{ avatars[repo_name] }}{% else %}{{ repo_meta.owner.avatarUrl }}{% endif %}"/></a></span></span></div>{% endfor %}{% endfor %}
</div>

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js'></script>
<script src="https://unpkg.com/@yaireo/tagify"></script>
<script src="https://unpkg.com/@yaireo/tagify/dist/tagify.polyfills.min.js"></script>
<link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" />

<script style="display:none">

// Open the project page on click
$(".card").click(function() {
   url = $(this).attr('data-url')
   window.open(url, "_blank");
})


// sort function callbacks
function sort_by_stars(a, b){
    return ($(b).data("stars")) > ($(a).data("stars")) ? 1 : -1;    
}
function sort_by_language(a, b){
    return ($(b).data("language")) < ($(a).data("language")) ? 1 : -1; 
}
function sort_by_name(a, b){
    return ($(b).data("name")) < ($(a).data("name")) ? 1 : -1; 
}

// Sort by stars or language
$("#star-sort").click(function() {$(".cards .card").sort(sort_by_stars).appendTo(".cards")})
$("#language-sort").click(function() {$(".cards .card").sort(sort_by_language).appendTo(".cards")})
$("#name-sort").click(function() {$(".cards .card").sort(sort_by_name).appendTo(".cards")})

var tags = [{% for tag in tags_list %}{"value": "{{ tag }}"}{% if loop.last %}{% else %},{% endif %}{% endfor %}]
console.log(tags)

var input = document.querySelector('input[name=tags]'),
    tagify = new Tagify(input, {
        pattern: /^.{0,200}$/,  // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
        delimiters: ",|;",      // add new tags when these characters are used
        keepInvalidTags: false, // dont keep invalid tags
        editTags: 1,            // single click to edit a tag
        maxTags: 6,
        blacklist: [],          // words to blacklist?
        whitelist: tags,
        transformTag: transformTag,
        // backspace: "edit",
        // placeholder: "search...",
        dropdown : {
            enabled: 1,            // show suggestion after 1 typed character
            fuzzySearch: false,    // match only suggestions that starts with the typed characters
            position: 'text',      // position suggestions list next to typed text
            caseSensitive: false,   // allow adding duplicate items if their case is different
        },
        templates: {
            dropdownItemNoMatch: function(data) {
                return `<div class='${this.settings.classNames.dropdownItem}' tabindex="0" role="option">
                    No suggestion found for: <strong>${data.value}</strong>
                </div>`
            },
            tag : function(tagData){
               try {
                    return `<tag title='${tagData.value}' contenteditable='false' spellcheck="false" class='tagify__tag ${tagData.class ? tagData.class : ""}' ${this.getAttributes(tagData)}><div><span class='tagify__tag-text'>${tagData.value}</span></div></tag>`
               }
               catch(err){}
            },
            dropdownItem : function(tagData){
                try {
                    return `<div class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}' tagifySuggestionIdx="${tagData.tagifySuggestionIdx}"><span>${tagData.value}</span></div>`
                }
                catch(err){}
              }
            }
        })

// generate a random color (in HSL format)
function getRandomColor(){
    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    var h = rand(1, 360)|0,
        s = rand(40, 70)|0,
        l = rand(65, 72)|0;

    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

function transformTag( tagData ){
    var color = getRandomColor()
    tagData.style = "--tag-bg:" + color + ";background-color:" + color;
}

tagify.on('invalid', function(e){
    updateFilters()
})

tagify.on('remove', function(e){
    updateFilters()
});

tagify.on('add', function(e){
    console.log( "original Input:", tagify.DOM.originalInput);
    console.log( "original Input's value:", tagify.DOM.originalInput.value);
    console.log( "event detail:", e.detail);
    updateFilters()
});

function updateFilters() {
    var values = tagify.value
    if (values.length == 0){
      $(".card").show();
    } else {
        filters = ""
        
        // NOTE that this does an OR to give more results
        $.each(values, function(i, e){
          if (i == values.length - 1) {
              filters = filters + " .topic-" + e['value']      
          } else {
              filters = filters + " .topic-" + e['value'] + ","           
          }
        })
        console.log(filters)
        // If no tags, do a reset
        if (filters==""){
            $(".card").show();
        } else {
            $(".card").hide();        
            $(filters).show();        
        }
    }
}
</script>
