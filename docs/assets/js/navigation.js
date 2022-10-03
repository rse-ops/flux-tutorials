!function(t) {
    function e(i) {
        if (n[i])
            return n[i].exports;
        var o = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, e),
        o.l = !0,
        o.exports
    }
    var n = {};
    e.m = t,
    e.c = n,
    e.i = function(t) {
        return t
    }
    ,
    e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }
    ,
    e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return e.d(n, "a", n),
        n
    }
    ,
    e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    e.p = "",
    e(e.s = 6)
}([function(t, e, n) {
    "use strict";
    n.d(e, "a", function() {
        return i
    });
    var i = function() {
        function t() {
            this.windowHeight = window.innerHeight,
            this.docHeight = document.body.clientHeight,
            this.scrollHeight = this.docHeight - this.windowHeight
        }
        return t.prototype.GetElOffset = function(t) {
            return t.getBoundingClientRect().top + window.pageYOffset - document.body.clientTop
        }
        ,
        t.prototype.HasHitWindowTop = function(t) {
            return window.scrollY >= t
        }
        ,
        t.prototype.HasHitWindowBottom = function(t) {
            return t <= window.scrollY + this.windowHeight
        }
        ,
        t.prototype.IsInViewport = function(t, e) {
            var n = t.getBoundingClientRect().top
              , i = t.getBoundingClientRect().bottom;
            return n < window.innerHeight && i >= 0
        }
        ,
        t.prototype.IsLeavingViewport = function(t) {
            return t.getBoundingClientRect().top <= 0
        }
        ,
        t.prototype.IsBottom = function(t) {
            return window.pageYOffset + this.windowHeight + t >= this.docHeight
        }
        ,
        t.prototype.getPercentageScrolled = function() {
            return Math.max(0, window.pageYOffset / this.scrollHeight * 100)
        }
        ,
        t
    }()
}
, function(t, e, n) {
    "use strict";
    n.d(e, "a", function() {
        return i
    });
    var i = function() {
        function t() {
            this.trackEvent = function(t, e, n) {
                try {
                    ga("send", "event", t, e, n)
                } catch (t) {}
            }
        }
        return t
    }()
}
, function(t, e, n) {
    "use strict";
    var i = n(0)
      , o = n(1);
    n.d(e, "a", function() {
        return a
    });
    var a = function() {
        function t(t, e, n, a) {
            var s = this;
            this.WindowHeight = window.innerHeight,
            this.WindowWidth = window.innerWidth,
            this.resetGlobalDimensions = function() {
                s.WindowHeight = window.innerHeight,
                s.WindowWidth = window.innerWidth,
                s.ContainerOffset = s.Utils.GetElOffset(s.ContainerEl),
                s.FooterOffset = s.Utils.GetElOffset(document.getElementById("FooterMain"))
            }
            ,
            this.getTouchedEl = function(t) {
                var e = t.changedTouches[0];
                return document.elementFromPoint(e.clientX, e.clientY)
            }
            ,
            this.getTargetFromNavEl = function(t) {
                var e = t.href
                  , n = e.substr(e.indexOf("#"));
                return document.getElementById(n.replace("#", ""))
            }
            ,
            this.setState = function() {
                s.WindowHeight >= 400 && s.WindowWidth <= 720 ? (s.toggleNav(),
                s.toggleIndicator(),
                s.setAlphaCharacterFromScroll(),
                s.fixNavToBottom()) : s.NavEl.className = s.NavEl.className.replace(" active", "")
            }
            ,
            this.toggleNav = function() {
                s.Utils.HasHitWindowTop(s.ContainerOffset) ? s.NavEl.className.indexOf("active") < 0 && (s.NavEl.className += " active",
                s.Tracker.trackEvent("Community_Affiliations", "Scroll", "Activate Alpha Nav")) : s.NavEl.className = s.NavEl.className.replace(" active", "")
            }
            ,
            this.fixNavToBottom = function() {
                s.Utils.HasHitWindowBottom(s.FooterOffset) ? (s.NavEl.style.display = "inline-block",
                s.NavEl.style.top = s.FooterOffset - window.scrollY - s.WindowHeight + "px",
                s.NavEl.style.display = "block") : s.NavEl.style.top = "0px"
            }
            ,
            this.toggleIndicator = function() {
                s.Utils.HasHitWindowTop(s.ContainerOffset) ? s.activateIndicator() : s.deactivateIndicator(),
                s.Utils.HasHitWindowBottom(s.FooterOffset) && s.deactivateIndicator()
            }
            ,
            this.activateIndicator = function() {
                s.IndicatorEl.className.indexOf("active") < 0 && (s.IndicatorEl.className += " active")
            }
            ,
            this.deactivateIndicator = function() {
                s.IndicatorEl.className = s.IndicatorEl.className.replace(" active", "")
            }
            ,
            this.scrollToTarget = function(t) {
                t.scrollIntoView(!0)
            }
            ,
            this.setAlphaCharacterFromScroll = function() {
                var t, e, n, i;
                if (!(s.IndicatorEl.className.indexOf("trackfinger") >= 0))
                    for (var o = 0; o <= s.ListEls.length; o++)
                        try {
                            t = s.Utils.GetElOffset(s.ListEls[o]),
                            i = s.ListEls[o],
                            s.Utils.HasHitWindowTop(t) && s.Utils.IsInViewport(i, 0) && (n = s.NavChildEls[o + 1],
                            e = Math.floor(n.offsetTop - n.scrollTop + n.clientTop),
                            s.IndicatorEl.style.top = e + "px",
                            s.CurrentAlphaEl.textContent = n.getAttribute("data-char").toString())
                        } catch (t) {}
            }
            ;
            var r;
            this.Utils = new i.a,
            this.ContainerEl = t,
            this.ContainerOffset = this.Utils.GetElOffset(this.ContainerEl),
            this.IndicatorEl = e,
            this.CurrentAlphaEl = this.IndicatorEl.getElementsByClassName("current-alpha")[0],
            this.ListEls = n,
            this.NavEl = a,
            this.NavChildEls = this.NavEl.getElementsByTagName("a"),
            this.FooterOffset = this.Utils.GetElOffset(document.getElementById("FooterMain")),
            this.Tracker = new o.a;
            for (var l = 0; l < this.NavChildEls.length; l++)
                this.NavChildEls[l].addEventListener("click", function(t) {
                    var e = s.getTargetFromNavEl(t.target);
                    s.scrollToTarget(e),
                    t.preventDefault()
                });
            this.NavEl.addEventListener("touchstart", function(t) {
                clearTimeout(r);
                var e = s.getTouchedEl(t)
                  , n = e.getAttribute("data-char").toString();
                s.activateIndicator(),
                s.IndicatorEl.style.top = t.changedTouches[0].clientY + "px",
                s.IndicatorEl.className += " trackfinger",
                s.Tracker.trackEvent("Community_Affiliations", "Touch Start", "Zoom Alpha Indicator " + n),
                t.preventDefault()
            }),
            this.NavEl.addEventListener("touchmove", function(t) {
                var e = s.getTouchedEl(t);
                try {
                    var n = s.getTargetFromNavEl(e);
                    s.CurrentAlphaEl.textContent = e.getAttribute("data-char").toString(),
                    s.IndicatorEl.style.top = t.changedTouches[0].clientY + "px",
                    s.scrollToTarget(n)
                } catch (t) {}
                t.preventDefault()
            }),
            this.NavEl.addEventListener("touchend", function(t) {
                s.IndicatorEl.className = s.IndicatorEl.className.replace(" trackfinger", "");
                var e = s.getTouchedEl(t)
                  , n = e.getAttribute("data-char").toString();
                try {
                    var i = s.getTargetFromNavEl(e);
                    s.scrollToTarget(i),
                    s.Tracker.trackEvent("Community_Affiliations", "Touch End", "Close Alpha Indicator " + n)
                } catch (t) {}
                t.preventDefault()
            }),
            window.addEventListener("scroll", function() {
                clearTimeout(r),
                r = setTimeout(s.deactivateIndicator, 1e3),
                s.setState()
            }),
            window.addEventListener("resize", function() {
                s.resetGlobalDimensions(),
                s.setState()
            }),
            window.addEventListener("orientationchange", function() {
                window.setTimeout(function() {
                    s.resetGlobalDimensions(),
                    s.setState()
                }, 200)
            }),
            this.setState()
        }
        return t
    }()
}
, function(t, e, n) {
    "use strict";
    var i = n(7);
    n.d(e, "a", function() {
        return o
    });
    var o = function() {
        function t() {
            this.MainToggle = document.getElementById("DocsNavToggle"),
            this.MainMenuEl = document.getElementById("DocsNav"),
            this.CreatingToggle = document.getElementById("Creating"),
            this.CreatingMenuEl = document.querySelectorAll('[data-parent="Creating"]')[0],
            this.UsingToggle = document.getElementById("Using"),
            this.UsingMenuEl = document.querySelectorAll('[data-parent="Using"]')[0],
            this.GrowingToggle = document.getElementById("Growing"),
            this.GrowingMenuEl = document.querySelectorAll('[data-parent="Growing"]')[0],
            new i.a(this.MainToggle,this.MainMenuEl),
            new i.a(this.CreatingToggle,this.CreatingMenuEl),
            new i.a(this.UsingToggle,this.UsingMenuEl),
            new i.a(this.GrowingToggle,this.GrowingMenuEl),
            this.applyAnchors()
        }
        return t.prototype.applyAnchors = function() {
            for (var t = document.querySelector(".details-docs"), e = t.querySelectorAll("h1,h2,h3,h4,h5,h6"), n = 0; n < e.length; n++) {
                var i = e.item(n)
                  , o = document.createElement("a");
                o.href = "#" + i.id,
                o.classList.add("anchor-link"),
                i.appendChild(o)
            }
        }
        ,
        t
    }()
}
, function(t, e, n) {
    "use strict";
    var i = n(1);
    n.d(e, "a", function() {
        return o
    });
    var o = function() {
        function t() {
            var t = this;
            this.NavTriggerEl = document.getElementById("NavTrigger"),
            this.BodyEl = document.body,
            this.ShadowBoxEl = document.createElement("div"),
            this.ShadowBoxEl.id = "ShadowBox",
            this.Tracker = new i.a,
            this.BodyEl.appendChild(this.ShadowBoxEl),
            this.NavTriggerEl.addEventListener("click", function(e) {
                e.preventDefault(),
                t.toggleActiveClass()
            }),
            this.ShadowBoxEl.addEventListener("click", function() {
                t.toggleActiveClass(),
                t.Tracker.trackEvent("Header", "Click", "Nav Toggle Close")
            })
        }
        return t.prototype.toggleActiveClass = function() {
            var t = this.BodyEl.className.indexOf("nav-active");
            this.BodyEl.className = t < 0 ? this.BodyEl.className += " nav-active" : this.BodyEl.className.replace(" nav-active", "")
        }
        ,
        t
    }()
}
, function(t, e, n) {
    "use strict";
    var i = n(0);
    n.d(e, "a", function() {
        return o
    });
    var o = function() {
        function t() {
            var t = this;
            this.Utils = new i.a,
            this.BlogEl = document.getElementById("Blog"),
            this.AnimationEls = [document.getElementById("Use"), document.getElementById("Release"), document.getElementById("Support")];
            for (var e = this, n = 0; n < this.AnimationEls.length; n++)
                !function(n) {
                    var i = n;
                    e.AnimationEls[n].addEventListener("touchstart", function(e) {
                        t.toggleClass(t.AnimationEls[i], "animation"),
                        t.toggleClass(t.AnimationEls[i], "animation")
                    })
                }(n);
            document.getElementById("hero_hotspot_one").addEventListener("mouseover", function(e) {
                t.toggleHiddenNode(e.target)
            }),
            document.getElementById("hero_hotspot_two").addEventListener("mouseover", function(e) {
                t.toggleHiddenNode(e.target)
            }),
            this.Utils.IsInViewport(this.BlogEl, 0) && this.BlogEl.className.indexOf("active") < 0 && (this.BlogEl.className += " active"),
            window.addEventListener("scroll", function() {
                t.Utils.IsInViewport(t.BlogEl, 0) && t.BlogEl.className.indexOf("active") < 0 && (t.BlogEl.className += " active")
            })
        }
        return t.prototype.toggleClass = function(t, e) {
            t.className.indexOf(e) < 0 ? t.className += " " + e : t.className = t.className.replace(" " + e, "")
        }
        ,
        t.prototype.toggleHiddenNode = function(t) {
            var e = document.getElementById(t.getAttribute("data-target"));
            e.style.width = e.getAttribute("data-width") + "px",
            t.style.display = "none"
        }
        ,
        t
    }()
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(2)
      , o = n(3)
      , a = n(4)
      , s = n(5);
    n.d(e, "OGCApp", function() {
        return r
    });
    var r = function() {
        function t() {
            var t = this;
            window.onload = function() {
                t.InitializeOGCApp()
            }
        }
        return t.prototype.InitializeOGCApp = function() {
            var t = this;
            if (this.DocEl = document.documentElement,
            this.Header = new a.a,
            this.DocEl.className = this.DocEl.className.replace("no-js", "js"),
            this.BodyEl = document.body,
            this.BodyClass = this.BodyEl.className,
            this.BodyClass.indexOf("home") >= 0)
                new s.a;
            else if (this.BodyClass.indexOf("docs") >= 0)
                new o.a;
            else if (this.BodyClass.indexOf("affiliations") >= 0) {
                var e = document.getElementById("AlphaIndicator")
                  , n = document.getElementById("Affiliations")
                  , r = document.getElementsByClassName("alpha-set")
                  , l = document.getElementById("AlphaMenu");
                new i.a(n,e,r,l)
            }
            "ontouchstart"in document && (this.BodyEl.className = this.BodyEl.className.replace("no-touch", ""))
        }
        ,
        t
    }();
    new r
}
, function(t, e, n) {
    "use strict";
    n.d(e, "a", function() {
        return i
    });
    var i = function() {
        function t(t, e) {
            var n = this;
            this.TriggerEl = t,
            this.TargetEl = e,
            this.TriggerEl.addEventListener("click", function(t) {
                t.preventDefault(),
                n.toggleActiveClass(n.TriggerEl),
                n.toggleActiveClass(n.TargetEl)
            })
        }
        return t.prototype.toggleActiveClass = function(t) {
            t.className.indexOf("active") < 0 ? t.className += " active" : t.className = t.className.replace(" active", "").replace("active", "")
        }
        ,
        t
    }()
}
]);
