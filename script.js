document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const viewClass = params.get('view') === '2' ? 'view-2' : 'view-1';
    document.body.classList.add(viewClass);
});

class I {
    x;
    y;
    size;
    isFlipped;
    constructor(t, n, i) {
        this.x = t,
        this.y = n,
        this.size = i,
        this.isFlipped = !1
    }
    draw(t) {
        t && (t.fillStyle = this.isFlipped ? "rgba(85, 91, 255, 0.5)" : "rgba(255, 255, 255, 0)",
        t.fillRect(this.x, this.y, this.size, this.size),
        t.strokeStyle = "rgba(0, 94, 184, 0.1)",
        t.lineWidth = 1,
        t.strokeRect(this.x + .5, this.y + .5, this.size - 1, this.size - 1))
    }
    flip() {
        this.isFlipped = !this.isFlipped
    }
}
class k {
    element;
    context;
    dimensions;
    squares;
    squareSize;
    constructor(t) {
        this.element = t,
        this.context = this.element.getContext("2d"),
        this.squares = [],
        this.squareSize = 72,
        this.dimensions = {
            x: this.element.width,
            y: this.element.height
        },
        this.initialize(),
        this.bindEvents(),
        this.drawSquares()
    }
    initialize() {
        if (!(!this.context || !this.dimensions || !this.dimensions.x || !this.dimensions.y))
            for (let t = 0; t < this.dimensions?.y; t += this.squareSize)
                for (let n = 0; n < this.dimensions?.x; n += this.squareSize)
                    this.squares.push(new I(n,t,this.squareSize))
    }
    drawSquares() {
        this.squares.forEach(t=>{
            t.draw(this.context)
        }
        )
    }
    bindEvents() {
        this.element.parentElement && this.element.parentElement.addEventListener("mousemove", t=>{
            const n = t.clientX - this.element.getBoundingClientRect().left
              , i = t.clientY - this.element.getBoundingClientRect().top;
            this.squares.forEach(s=>{
                n >= s.x && n <= s.x + s.size && i >= s.y && i <= s.y + s.size && (s.flip(),
                s.draw(this.context))
            }
            )
        }
        )
    }
}
const g = document.getElementById("square-fx")
  , C = g.parentElement?.getBoundingClientRect();
C && (g.width = C.width,
g.height = C.height,
new k(g));
function a() {}
a.hasClass = function(e, t) {
    return e.classList.contains(t)
}
;
a.addClass = function(e, t) {
    var n = t.split(" ");
    e.classList.add(n[0]),
    n.length > 1 && a.addClass(e, n.slice(1).join(" "))
}
;
a.removeClass = function(e, t) {
    var n = t.split(" ");
    e.classList.remove(n[0]),
    n.length > 1 && a.removeClass(e, n.slice(1).join(" "))
}
;
a.toggleClass = function(e, t, n) {
    n ? a.addClass(e, t) : a.removeClass(e, t)
}
;
a.setAttributes = function(e, t) {
    for (var n in t)
        e.setAttribute(n, t[n])
}
;
a.getChildrenByClassName = function(e, t) {
    for (var n = e.children, i = [], s = 0; s < n.length; s++)
        a.hasClass(n[s], t) && i.push(n[s]);
    return i
}
;
a.is = function(e, t) {
    if (t.nodeType)
        return e === t;
    for (var n = typeof t == "string" ? document.querySelectorAll(t) : t, i = n.length; i--; )
        if (n[i] === e)
            return !0;
    return !1
}
;
a.setHeight = function(e, t, n, i, s, u) {
    var l = t - e
      , d = null
      , c = function(h) {
        d || (d = h);
        var f = h - d;
        f > i && (f = i);
        var w = parseInt(f / i * l + e);
        u && (w = Math[u](f, e, t - e, i)),
        n.style.height = w + "px",
        f < i ? window.requestAnimationFrame(c) : s && s()
    };
    n.style.height = e + "px",
    window.requestAnimationFrame(c)
}
;
a.scrollTo = function(e, t, n, i) {
    var s = i || window
      , u = s.scrollTop || document.documentElement.scrollTop
      , l = null;
    i || (u = window.scrollY || document.documentElement.scrollTop);
    var d = function(c) {
        l || (l = c);
        var h = c - l;
        h > t && (h = t);
        var f = Math.easeInOutQuad(h, u, e - u, t);
        s.scrollTo(0, f),
        h < t ? window.requestAnimationFrame(d) : n && n()
    };
    window.requestAnimationFrame(d)
}
;
a.moveFocus = function(e) {
    e || (e = document.getElementsByTagName("body")[0]),
    e.focus(),
    document.activeElement !== e && (e.setAttribute("tabindex", "-1"),
    e.focus())
}
;
a.getIndexInArray = function(e, t) {
    return Array.prototype.indexOf.call(e, t)
}
;
a.cssSupports = function(e, t) {
    if ("CSS"in window)
        return CSS.supports(e, t);
    var n = e.replace(/-([a-z])/g, function(i) {
        return i[1].toUpperCase()
    });
    return n in document.body.style
}
;
a.extend = function() {
    var e = {}
      , t = !1
      , n = 0
      , i = arguments.length;
    Object.prototype.toString.call(arguments[0]) === "[object Boolean]" && (t = arguments[0],
    n++);
    for (var s = function(l) {
        for (var d in l)
            Object.prototype.hasOwnProperty.call(l, d) && (t && Object.prototype.toString.call(l[d]) === "[object Object]" ? e[d] = extend(!0, e[d], l[d]) : e[d] = l[d])
    }; n < i; n++) {
        var u = arguments[n];
        s(u)
    }
    return e
}
;
a.osHasReducedMotion = function() {
    if (!window.matchMedia)
        return !1;
    var e = window.matchMedia("(prefers-reduced-motion: reduce)");
    return e ? e.matches : !1
}
;
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
Element.prototype.closest || (Element.prototype.closest = function(e) {
    var t = this;
    if (!document.documentElement.contains(t))
        return null;
    do {
        if (t.matches(e))
            return t;
        t = t.parentElement || t.parentNode
    } while (t !== null && t.nodeType === 1);
    return null
}
);
if (typeof window.CustomEvent != "function") {
    let e = function(t, n) {
        n = n || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(t, n.bubbles, n.cancelable, n.detail),
        i
    };
    var Z = e;
    e.prototype = window.Event.prototype,
    window.CustomEvent = e
}
Math.easeInOutQuad = function(e, t, n, i) {
    return e /= i / 2,
    e < 1 ? n / 2 * e * e + t : (e--,
    -n / 2 * (e * (e - 2) - 1) + t)
}
;
Math.easeInQuart = function(e, t, n, i) {
    return e /= i,
    n * e * e * e * e + t
}
;
Math.easeOutQuart = function(e, t, n, i) {
    return e /= i,
    e--,
    -n * (e * e * e * e - 1) + t
}
;
Math.easeInOutQuart = function(e, t, n, i) {
    return e /= i / 2,
    e < 1 ? n / 2 * e * e * e * e + t : (e -= 2,
    -n / 2 * (e * e * e * e - 2) + t)
}
;
Math.easeOutElastic = function(e, t, n, i) {
    var l = 1.70158
      , s = i * .7
      , u = n;
    if (e == 0)
        return t;
    if ((e /= i) == 1)
        return t + n;
    if (s || (s = i * .3),
    u < Math.abs(n)) {
        u = n;
        var l = s / 4
    } else
        var l = s / (2 * Math.PI) * Math.asin(n / u);
    return u * Math.pow(2, -10 * e) * Math.sin((e * i - l) * (2 * Math.PI) / s) + n + t
}
;
(function() {
    var e = document.getElementsByClassName("js-tab-focus")
      , t = !1
      , n = !1
      , i = !1;
    function s() {
        e.length > 0 && (l(!1),
        window.addEventListener("keydown", u)),
        window.removeEventListener("mousedown", s),
        n = !1,
        i = !0
    }
    function u(c) {
        c.keyCode === 9 && (l(!0),
        window.removeEventListener("keydown", u),
        window.addEventListener("mousedown", s),
        n = !0)
    }
    function l(c) {
        for (var h = c ? "" : "none", f = 0; f < e.length; f++)
            e[f].style.setProperty("outline", h)
    }
    function d() {
        if (t) {
            i && l(n);
            return
        }
        t = e.length > 0,
        window.addEventListener("mousedown", s)
    }
    d(),
    window.addEventListener("initFocusTabs", d)
}
)();
(function() {
    var e = document.getElementsByClassName("reveal-fx")
      , t = "IntersectionObserver"in window && "IntersectionObserverEntry"in window && "intersectionRatio"in window.IntersectionObserverEntry.prototype;
    if (e.length > 0) {
        let p = function() {
            for (var r = 0; r < e.length; r++)
                c[r] = new IntersectionObserver(function(o, T) {
                    o[0].isIntersecting && (S(o[0].target),
                    T.unobserve(o[0].target))
                }
                ,{
                    rootMargin: "0px 0px -" + d[r] + "px 0px"
                }),
                c[r].observe(e[r])
        }
          , x = function() {
            for (var r = 0; r < e.length; r++)
                a.addClass(e[r], "reveal-fx--is-visible")
        }
          , v = function() {
            s || (s = !0,
            window.requestAnimationFrame ? window.requestAnimationFrame(y) : setTimeout(function() {
                y()
            }, 250))
        }
          , y = function() {
            i = window.innerHeight,
            m()
        }
          , m = function() {
            for (var r = 0; r < e.length; r++)
                (function(o) {
                    u.indexOf(o) == -1 && z(e[o], o) && (A(o),
                    u.push(o))
                }
                )(r);
            E(),
            s = !1
        }
          , A = function(r) {
            l[r] && l[r] != 0 ? setTimeout(function() {
                a.addClass(e[r], "reveal-fx--is-visible")
            }, l[r]) : a.addClass(e[r], "reveal-fx--is-visible")
        }
          , S = function(r) {
            var o = a.getIndexInArray(e, r);
            u.indexOf(o) == -1 && (A(o),
            u.push(o),
            E(),
            s = !1)
        }
          , L = function() {
            for (var r = [], o = 0; o < e.length; o++)
                r.push(e[o].getAttribute("data-reveal-fx-delay") ? parseInt(e[o].getAttribute("data-reveal-fx-delay")) : 0);
            return r
        }
          , O = function() {
            for (var r = [], o = 0; o < e.length; o++)
                r.push(e[o].getAttribute("data-reveal-fx-delta") ? parseInt(e[o].getAttribute("data-reveal-fx-delta")) : n);
            return r
        }
          , b = function(r) {
            return window.getComputedStyle(r, "::before").getPropertyValue("content").replace(/'|"/g, "") != "reveal-fx"
        }
          , z = function(r, o) {
            return M(r) <= i - d[o]
        }
          , M = function(r) {
            return r.getBoundingClientRect().top
        }
          , E = function() {
            e.length > u.length || (window.removeEventListener("load", m),
            window.removeEventListener("resize", v))
        }
          , B = function() {
            for (; e[0]; ) {
                var r = e[0].getAttribute("class").split(" ").filter(function(o) {
                    return o.lastIndexOf("reveal-fx--", 0) !== 0
                });
                e[0].setAttribute("class", r.join(" ").trim()),
                a.removeClass(e[0], "reveal-fx")
            }
        }
          , q = function() {
            if (!(a.osHasReducedMotion() || !t || b(e[0]))) {
                e.length <= u.length && (window.addEventListener("load", m),
                window.addEventListener("resize", v));
                for (var r = 0; r < c.length; r++)
                    c[r] && c[r].disconnect();
                c = [];
                for (var r = 0; r < e.length; r++)
                    a.removeClass(e[r], "reveal-fx--is-visible");
                u = [],
                p()
            }
        };
        var h = p
          , f = x
          , w = v
          , F = y
          , j = m
          , H = A
          , P = S
          , Q = L
          , V = O
          , Y = b
          , J = z
          , R = M
          , N = E
          , U = B
          , W = q;
        if (a.osHasReducedMotion() || !t) {
            B();
            return
        }
        if (b(e[0])) {
            x();
            return
        }
        var n = 120
          , i = window.innerHeight
          , s = !1
          , u = []
          , l = L()
          , d = O();
        window.addEventListener("load", m),
        window.addEventListener("resize", v),
        window.addEventListener("restartAll", q);
        var c = [];
        p()
    }
}
)();
console.info("%c %cMade By %cShahar Maoz%caka RakLoZe  %c14.02.2024%c  %cIsrael", 'padding-left: 36px; line-height: 36px; ; background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px', "background: #666; border-radius:0.5em 0 0 0.5em; padding:0.2em 0em 0.1em 0.5em; color: white; font-weight: bold", "background: #666; border-radius:0 0.5em 0.5em 0; padding:0.2em 0.5em 0.1em 0em; color: white;", "", "background: #c3a650; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;", "", "background: #15889f; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;");