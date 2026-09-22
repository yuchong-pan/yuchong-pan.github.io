(function () {
  "use strict";

  var body = document.body;
  var root = body.dataset.root || ".";
  var pageKey = body.dataset.page || "home";
  var site = window.SITE_CONFIG || {};

  function rootPath(path) {
    if (!path || path === "#") return path || "#";
    if (/^(https?:|mailto:|tel:)/.test(path)) return path;
    return root.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  }

  document.title = site.siteTitle || site.name || "Academic Website";
  var description = document.querySelector('meta[name="description"]');
  if (description && site.description) description.setAttribute("content", site.description);

  if (Array.isArray(site.backgroundImages) && site.backgroundImages.length) {
    var previous = sessionStorage.getItem("lastBackground");

    var candidates = site.backgroundImages.filter(function (img) {
      return img !== previous;
    });

    if (!candidates.length) {
      candidates = site.backgroundImages;
    }

    var randomBackground =
      candidates[Math.floor(Math.random() * candidates.length)];

    sessionStorage.setItem("lastBackground", randomBackground);

    // Resolve relative to the current HTML page first.
    // This makes home and inner pages point to the same assets/images folder.
    var pageRelativePath = rootPath(randomBackground);
    var absoluteBackgroundURL =
      new URL(pageRelativePath, window.location.href).href;

    body.style.setProperty(
      "--site-background-image",
      'url("' + absoluteBackgroundURL + '")'
    );
  }

  var logoLink = document.querySelector("#logo a");
  if (logoLink) {
    logoLink.textContent = site.name || "Your Name";
    logoLink.href = pageKey === "home" ? "index.html" : rootPath("index.html");
  }

  var nav = document.getElementById("main-nav");
  if (nav && Array.isArray(site.navigation)) {
    nav.innerHTML = "";
    site.navigation.forEach(function (item) {
      var li = document.createElement("li");
      if (item.key === pageKey) li.className = "active";
      var a = document.createElement("a");
      a.textContent = item.label;
      a.href = pageKey === "home" ? item.href : rootPath(item.href);
      li.appendChild(a);
      nav.appendChild(li);
    });
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function link(label, url) {
    if (!url) return escapeHTML(label);
    return '<a href="' + escapeHTML(url) + '">' + escapeHTML(label) + "</a>";
  }

  function renderResearch() {
    var cfg = window.RESEARCH_CONFIG;
    if (!cfg) return;
    document.getElementById("page-title").textContent = cfg.title;
    document.getElementById("page-intro").textContent = cfg.intro || "";

    var tagBox = document.getElementById("tag-filter");
    (cfg.tags || []).forEach(function (tag) {
      var span = document.createElement("span");
      span.className = "tag-toggle-container";
      span.innerHTML = '<input class="tag-toggle" type="checkbox" value="' + escapeHTML(tag) + '" id="tag-' + escapeHTML(tag).replace(/\W+/g,"-") + '"> <label for="tag-' + escapeHTML(tag).replace(/\W+/g,"-") + '">' + escapeHTML(tag) + "</label>";
      tagBox.appendChild(span);
    });

    var papers = document.getElementById("papers");
    (cfg.publications || []).forEach(function (p, i) {
      var el = document.createElement("article");
      el.className = "paper card" + (p.selected ? " selected" : "");
      el.dataset.searchstr = [p.title,p.authors,p.venue,(p.tags || []).join(" ")].join(" ").toLowerCase();
      el.dataset.tags = JSON.stringify(p.tags || []);
      var titleHTML = p.paper ? link(p.title, p.paper) : escapeHTML(p.title);
      el.innerHTML =
        '<div class="wrapper">' +
          '<button class="abstract-toggle" aria-expanded="false" aria-controls="abstract-' + i + '" title="Toggle abstract">+</button>' +
          '<div class="card-title">' + titleHTML + '</div>' +
          '<p class="card-meta">' + escapeHTML(p.authors) + '</p>' +
          '<p class="card-meta italic">' + escapeHTML(p.venue) + '</p>' +
          '<div class="tag-list">' + (p.tags || []).map(escapeHTML).join(" · ") + '</div>' +
          '<div class="abstract" id="abstract-' + i + '"><strong>Abstract.</strong> ' + escapeHTML(p.abstract || "") + '</div>' +
        '</div>';
      papers.appendChild(el);
    });
    installResearchInteractions();
  }

  function installResearchInteractions() {
    var papers = Array.prototype.slice.call(document.querySelectorAll(".paper"));
    var papersEl = document.getElementById("papers");
    var radios = Array.prototype.slice.call(document.querySelectorAll(".papers-display"));
    var search = document.getElementById("paper-search");
    var tagChecks = Array.prototype.slice.call(document.querySelectorAll(".tag-toggle"));
    var show = document.getElementById("show-abstracts");
    var hide = document.getElementById("hide-abstracts");

    function filter() {
      var mode = (radios.find(function(r){ return r.checked; }) || {}).value || "all";
      papersEl.classList.toggle("selected", mode === "selected");
      papersEl.classList.toggle("search", mode === "search");
      var q = (search.value || "").toLowerCase().trim();
      var activeTags = tagChecks.filter(function(c){ return c.checked; }).map(function(c){ return c.value; });
      papersEl.classList.toggle("active-tags", activeTags.length > 0);
      papers.forEach(function(p) {
        p.classList.toggle("search-hidden", mode === "search" && p.dataset.searchstr.indexOf(q) < 0);
        var ptags = JSON.parse(p.dataset.tags || "[]");
        p.classList.toggle("tag-hidden", activeTags.some(function(t){ return ptags.indexOf(t) < 0; }));
      });
    }

    radios.forEach(function(r){ r.addEventListener("change", filter); });
    search.addEventListener("input", function(){ document.getElementById("search-papers").checked = true; filter(); });
    tagChecks.forEach(function(c){ c.addEventListener("change", filter); });

    function setAbstract(p, expanded) {
      p.classList.toggle("expanded", expanded);
      var b = p.querySelector(".abstract-toggle");
      if (b) { b.textContent = expanded ? "−" : "+"; b.setAttribute("aria-expanded", String(expanded)); }
    }
    papers.forEach(function(p){
      var b = p.querySelector(".abstract-toggle");
      b.addEventListener("click", function(){ setAbstract(p, !p.classList.contains("expanded")); });
    });
    show.addEventListener("click", function(){ papers.forEach(function(p){ setAbstract(p,true); }); });
    hide.addEventListener("click", function(){ papers.forEach(function(p){ setAbstract(p,false); }); });
    filter();
  }

  function renderCourses() {
    var cfg = window.COURSES_CONFIG; if (!cfg) return;
    setTitleIntro(cfg.title,cfg.intro);
    var target = document.getElementById("page-body");
    (cfg.groups || []).forEach(function(g){
      target.insertAdjacentHTML("beforeend", "<h2>"+escapeHTML(g.heading)+"</h2>");
      (g.items || []).forEach(function(c){
        target.insertAdjacentHTML("beforeend", '<div class="card"><div class="card-title">'+link(c.title,c.url)+'</div><p class="card-meta">'+escapeHTML(c.term)+'</p><p>'+escapeHTML(c.description||"")+'</p></div>');
      });
    });
  }

  function renderStudents() {
    var cfg = window.STUDENTS_CONFIG; if (!cfg) return;
    setTitleIntro(cfg.title,cfg.intro);
    var target = document.getElementById("page-body");
    (cfg.groups || []).forEach(function(g){
      var html = "<h2>"+escapeHTML(g.heading)+"</h2><ul>";
      (g.people || []).forEach(function(p){ html += "<li>"+link(p.name,p.url)+" — "+escapeHTML(p.role)+(p.topic?". "+escapeHTML(p.topic):"")+"</li>"; });
      target.insertAdjacentHTML("beforeend",html+"</ul>");
    });
  }

  function renderEvents() {
    var cfg = window.EVENTS_CONFIG; if (!cfg) return;
    setTitleIntro(cfg.title,cfg.intro);
    var target = document.getElementById("page-body");
    (cfg.events || []).forEach(function(e){
      target.insertAdjacentHTML("beforeend", '<div class="card"><div class="card-title">'+link(e.name,e.url)+'</div><p class="card-meta">'+escapeHTML(e.date)+' · '+escapeHTML(e.location)+'</p><p>'+escapeHTML(e.description||"")+'</p></div>');
    });
  }

  function renderContact() {
    var cfg = window.CONTACT_CONFIG; if (!cfg) return;
    setTitleIntro(cfg.title,"");
    var html = "";
    if (cfg.affiliation) html += '<p class="pre-line">'+escapeHTML(cfg.affiliation)+'</p>';
    if (cfg.office) html += '<p><strong>Office:</strong> '+escapeHTML(cfg.office)+'</p>';
    if (cfg.address) html += '<p class="pre-line">'+escapeHTML(cfg.address)+'</p>';
    if (cfg.email) html += '<p><strong>Email:</strong> <a href="mailto:'+escapeHTML(cfg.email)+'">'+escapeHTML(cfg.email)+'</a></p>';
    if (cfg.phone) html += '<p><strong>Phone:</strong> '+escapeHTML(cfg.phone)+'</p>';
    if (cfg.links && cfg.links.length) {
      html += "<h2>Links</h2><p>" + cfg.links.map(function(l){ return link(l.label,l.url); }).join(" &nbsp; · &nbsp; ") + "</p>";
    }
    document.getElementById("page-body").innerHTML = html;
  }

  function renderBio() {
    var cfg = window.BIO_CONFIG;
    if (!cfg) return;

    setTitleIntro(cfg.title, "");

    var html = "";

    if (cfg.image) {
      html +=
        '<img class="profile-image pull-right" src="' +
        escapeHTML(rootPath(cfg.image)) +
        '" alt="Profile photograph">';
    }

    (cfg.paragraphs || []).forEach(function (p) {
      html += "<p>" + escapeHTML(p) + "</p>";
    });

    if (cfg.cv || cfg.resume) {
      html += '<p class="bio-document-links">';

      if (cfg.cv) {
        html +=
          '<a class="button" href="' +
          escapeHTML(rootPath(cfg.cv)) +
          '">Curriculum Vitae</a>';
      }

      if (cfg.resume) {
        html +=
          '<a class="button" href="' +
          escapeHTML(rootPath(cfg.resume)) +
          '">Resume</a>';
      }

      html += "</p>";
    }

    document.getElementById("page-body").innerHTML = html;
  }

  function setTitleIntro(title,intro) {
    var t = document.getElementById("page-title"); if (t) t.textContent = title || "";
    var i = document.getElementById("page-intro"); if (i) i.textContent = intro || "";
  }

  /*
   * Force Chinese text to use the configured 行草/brush-calligraphy font.
   *
   * A mixed-script element such as "潘宇冲 Yuchong Pan" can still end up
   * using the browser's generic CJK fallback in a mixed-script element.
   * To avoid that ambiguity, split Chinese runs into their own spans and assign
   * the Chinese calligraphy font directly.
   */
  function applyCaoshu(rootNode) {
    var cjk = /([\u3000-\u303F\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+)/g;
    var skip = { SCRIPT:1, STYLE:1, NOSCRIPT:1, TEXTAREA:1, INPUT:1, SELECT:1, OPTION:1 };
    var walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !cjk.test(node.nodeValue)) { cjk.lastIndex = 0; return NodeFilter.FILTER_REJECT; }
        cjk.lastIndex = 0;
        var parent = node.parentElement;
        if (!parent || skip[parent.tagName] || parent.classList.contains("zh-caoshu")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      var text = node.nodeValue;
      var last = 0;
      text.replace(cjk, function (match, group, offset) {
        if (offset > last) frag.appendChild(document.createTextNode(text.slice(last, offset)));
        var span = document.createElement("span");
        span.className = "zh-caoshu";
        span.lang = "zh-Hans";
        span.textContent = match;
        frag.appendChild(span);
        last = offset + match.length;
        return match;
      });
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  var renderers = { research:renderResearch, courses:renderCourses, students:renderStudents, events:renderEvents, contact:renderContact, bio:renderBio };
  if (renderers[pageKey]) renderers[pageKey]();
  applyCaoshu(document.body);
})();
