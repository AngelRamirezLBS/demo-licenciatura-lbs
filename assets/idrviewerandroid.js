/*! IDRViewer - v1.7.0 | Copyright 2018 IDRsolutions */ ! function() {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j, k, l, m = {
            LAYOUT_PRESENTATION: "presentation",
            LAYOUT_MAGAZINE: "magazine",
            LAYOUT_CONTINUOUS: "continuous",
            SELECT_SELECT: "select",
            SELECT_PAN: "pan",
            ZOOM_SPECIFIC: "specific",
            ZOOM_ACTUALSIZE: "actualsize",
            ZOOM_FITWIDTH: "fitwidth",
            ZOOM_FITHEIGHT: "fitheight",
            ZOOM_FITPAGE: "fitpage",
            ZOOM_AUTO: "auto"
        },
        n = 1,
        o = 1,
        p = 0,
        q = 0,
        r = m.ZOOM_AUTO,
        s = !0,
        t = [],
        u = [],
        v = 10,
        w = {},
        x = !1,
        y = "",
        z = [],
        A = !1,
        B = "continuous_horizontal";
    m.setup = function(n) {
        n || (n = IDRViewer.config), x = !0, d = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), f = "svgz" === n.pageType, e = f || "svg" === n.pageType, g = n.bounds, p = n.pagecount, n.url && (y = n.url), E.setup(), b = S("idrviewer");
        var q = document.createElement("style");
        q.setAttribute("type", "text/css"), document.head.appendChild(q), i = q.sheet;
        var r = document.createElement("style");
        r.setAttribute("type", "text/css"), document.head.appendChild(r), j = r.sheet, (o < 1 || o > p) && (o = 1);
        for (var w = 0; w < p; w++)
            if (g[w][0] != g[0][0] || g[w][1] != g[0][1]) {
                s = !1;
                break
            }
        switch (k) {
            case IDRViewer.LAYOUT_CONTINUOUS:
            case B:
            case IDRViewer.LAYOUT_PRESENTATION:
            case IDRViewer.LAYOUT_MAGAZINE:
                break;
            default:
                k = IDRViewer.LAYOUT_CONTINUOUS
        }
        var z = [m.LAYOUT_PRESENTATION, m.LAYOUT_CONTINUOUS, m.LAYOUT_MAGAZINE];
        switch (k) {
            case IDRViewer.LAYOUT_CONTINUOUS:
                c = J;
                break;
            case B:
                c = K;
                break;
            case IDRViewer.LAYOUT_MAGAZINE:
                c = I;
                break;
            case IDRViewer.LAYOUT_PRESENTATION:
                c = H
        }
        window.addEventListener("resize", function() {
            Q()
        }), e && window.addEventListener("mousedown", function() {
            M(window)
        });
        var A = document.createElement("div");
        for (A.style.position = "relative", A.style.display = "inline-block", A.style.verticalAlign = "middle", A.style.minWidth = "100%", A.style.lineHeight = "normal", b.appendChild(A), h = document.createElement("div"), h.id = "overlay", A.appendChild(h), N.setup(), a = document.createElement("div"), a.id = "contentContainer", a.style.overflow = "hidden", a.style.transform = "translateZ(0)", a.style.padding = v / 2 + "px", A.appendChild(a), w = 1; w <= p; w++) {
            var D = document.createElement("div");
            D.id = "page" + w, D.setAttribute("style", "width: " + g[w - 1][0] + "px; height: " + g[w - 1][1] + "px;"), D.className = "page", a.appendChild(D), u[w] = D, t[w] = C(D, w)
        }
        c.setup(o), T.addClass(b, "layout-" + c.toString()), Q(l), c.goToPage(o), E.setPage(o, !0);
        var F = {
            selectMode: N.currentSelectMode,
            isMobile: d,
            layout: c.toString(),
            availableLayouts: z,
            isFirstPage: 1 === o,
            isLastPage: c.isLastPage(o)
        };
        for (var G in n) n.hasOwnProperty(G) && (F[G] = n[G]);
        F.page = o, m.fire("ready", F)
    };
    var C = function(a, b) {
            var c = {};
            return c.isVisible = function() {
                return E.getState(b) === D.LOADED
            }, c.isLoaded = function() {
                var a = E.getState(b);
                return a === D.LOADED || a === D.HIDDEN
            }, c.hide = function() {
                E.getState(b) === D.LOADED && (E.setState(b, D.UNLOADED), a.removeChild(a.lastChild))
            }, c.unload = function() {
                E.getState(b) !== D.LOADED && E.getState(b) !== D.UNLOADED || (E.setState(b, D.UNLOADED), a.removeChild(a.firstChild))
            }, c.load = function() {
                var c = E.getState(b);
                if (c === D.HIDDEN && (E.setState(b, D.LOADED), a.firstChild.style.display = "block"), c === D.UNLOADED)
                    if (E.setState(b, D.LOADING), e) {
                        var d = function() {
                                E.setState(b, D.LOADED), this.removeEventListener("load", d);
                                try {
                                    this.contentDocument.addEventListener("mousedown", function() {
                                        M(window)
                                    })
                                } catch (a) {}
                                m.fire("pageload", {
                                    page: b
                                })
                            },
                            h = document.createElement("object");
                        h.setAttribute("width", "" + g[b - 1][0]), h.setAttribute("height", "" + g[b - 1][1]), h.setAttribute("data", y + b + (f ? ".svgz" : ".svg")), h.setAttribute("type", "image/svg+xml"), h.setAttribute("class", "page-inner"), h.addEventListener("load", d), a.appendChild(h)
                    } else {
                        var i = function() {
                                var c = document.createElement("iframe");
                                c.setAttribute("class", "page-inner"), c.setAttribute("src", y + b + ".html"), c.setAttribute("id", "iframe" + y + b), c.setAttribute("style", "width: " + g[b - 1][0] + "px; height: " + g[b - 1][1] + "px; position: relative; border: 0;"), c.onload = function() {
                                    E.setState(b, D.LOADED), m.fire("pageload", {
                                        page: b
                                    })
                                    var cssLink = document.createElement("link") 
									    cssLink.href = "assets/font-awesome.min.css"; 
										cssLink .rel = "stylesheet"; 
										cssLink .type = "text/css"; 
										document.getElementById("iframe"+y +b).contentWindow.document.head.appendChild(cssLink);
                                }, a.appendChild(c)
                            },
                            k = function() {
                                var DateTime = new Date().getTime();
                                var c = new XMLHttpRequest;
                                c.open("GET", y + b + ".html?t=" + DateTime, !0), c.onload = function() {
                                    if (c.status >= 200 && c.status < 400) {
                                        var d = document.createElement("div");
                                        d.innerHTML = c.responseText;
                                        var e = d.querySelector("#p" + b);
                                        e.style.margin = "0", e.style.overflow = "hidden", e.style.position = "relative";
                                        var f = function() {
                                                E.setState(b, D.LOADED), this && this.removeEventListener("load", f), m.fire("pageload", {
                                                    page: b
                                                })
                                            },
                                            g = e.querySelector("#pdf" + b),
                                            h = g.getAttribute("data") || g.getAttribute("src");
                                        if (h && g.addEventListener("load", f), y) {
                                            var k = g.getAttribute("data");
                                            k ? g.setAttribute("data", y + k) : (k = g.getAttribute("src"), k && k.indexOf("base64") === -1 && g.setAttribute("src", y + k))
                                        }
                                        var l = e.querySelector("#fonts" + b);
                                        if (l) {
                                            var n = l.innerHTML;
                                            l.parentNode.removeChild(l), n.match(/@font-face {[\s\S]*?}/g).forEach(function(a) {
                                                z.indexOf(a) === -1 && (z.push(a), j.insertRule(a.replace('url("', 'url("' + y), j.cssRules.length))
                                            })
                                        }
                                        var o = e.querySelector(".shared-css");
                                        o && (o.parentNode.removeChild(o), A || (document.head.appendChild(o), A = !0)), T.addClass(e, "page-inner");
                                        for (var p = function() {
                                                IDRViewer.goToPage(this.dataset.page, this.dataset.zoom)
                                            }, q = e.querySelectorAll("[data-action-type='GoTo']"), r = 0; r < q.length; r++) q[r].onclick = p;
                                        a.appendChild(e), h || f()
                                    } else i()
                                }, c.onerror = i;
                                try {
                                    c.send()
                                } catch (d) {}
                            };
                        try {
                            i()
                        } catch (l) {
                            i()
                        }
                    }
            }, c
        },
        D = {
            LOADING: "loading",
            HIDDEN: "hidden",
            UNLOADED: "unloaded",
            LOADED: "loaded"
        },
        E = function() {
            var a, b, c, d = {},
                e = 0,
                f = 50,
                g = 20,
                h = 2,
                i = 0,
                j = 0,
                k = 0,
                l = [];
            d.setup = function() {
                c = p;
                for (var a = 1; a <= p; a++) l[a] = D.UNLOADED
            }, d.getState = function(a) {
                return l[a]
            }, d.setState = function(a, b) {
                m(l[a], b), l[a] = b
            };
            var m = function(a, b) {
                    switch (a) {
                        case D.LOADING:
                            i--;
                            break;
                        case D.LOADED:
                            j--;
                            break;
                        case D.HIDDEN:
                            k--;
                            break;
                        case D.UNLOADED:
                            c--
                    }
                    switch (b) {
                        case D.LOADING:
                            i++;
                            break;
                        case D.LOADED:
                            j++;
                            break;
                        case D.HIDDEN:
                            k++;
                            break;
                        case D.UNLOADED:
                            c++
                    }
                },
                n = function() {
                    if (t[a].load(), i < h)
                        for (var d = 1; d < g / 2 && (o(a - d) && (t[a - d].isVisible() || t[a - d].load()), i !== h) && (o(a + d) && (t[a + d].isVisible() || t[a + d].load()), i !== h); d++);
                    for (var k = 1, l = p; j + i > g;) a - k > l - a ? (t[k].isVisible() && t[k].hide(), k++) : (t[l].isVisible() && t[l].hide(), l--);
                    for (k = 1, l = p; p - c > f;) a - k > l - a ? (t[k].isLoaded() && t[k].unload(), k++) : (t[l].isLoaded() && t[l].unload(), l--);
                    b = setTimeout(n, e)
                },
                o = function(a) {
                    return a >= 1 && a <= p
                };
            return d.setPage = function(c, d) {
                a = c, d && t[c].load(), clearTimeout(b), b = setTimeout(n, e)

            }, d.stopLoading = function() {
                clearTimeout(b), b = setTimeout(n, e)
            }, d
        }(),
        F = {
            applyTransform: function(a, b) {
                a.style.webkitTransform = b, a.style.mozTransform = b, a.style.msTransform = b, a.style.oTransform = b, a.style.transform = b
            },
            getTransform: function(a) {
                return "-webkit-transform: " + a + ";\n-moz-transform: " + a + ";\n-ms-transform: " + a + ";\n-o-transform: " + a + ";\ntransform: " + a + ";"
            },
            applyTransformOrigin: function(a, b) {
                a.style.webkitTransformOrigin = b, a.style.mozTransformOrigin = b, a.style.msTransformOrigin = b, a.style.oTransformOrigin = b, a.style.transformOrigin = b
            },
            applyTransitionDuration: function(a, b) {
                a.style.webkitTransitionDuration = b, a.style.mozTransitionDuration = b, a.style.msTransitionDuration = b, a.style.oTransitionDuration = b, a.style.transitionDuration = b
            }
        },
        G = function(a) {
            o != a && (o = a, E.setPage(a), m.fire("pagechange", {
                page: o,
                pagecount: p,
                isFirstPage: 1 === o,
                isLastPage: c.isLastPage(a)
            }))
        },
        H = function() {
            var c = {};
            c.setup = function() {}, c.unload = function() {
                for (var b = 1; b <= p; b++) u[b].style.marginLeft = "", u[b].style.marginTop = "", T.removeClass(u[b], "current", "prev", "next", "before", "after");
                a.style.width = "", a.style.height = ""
            }, c.goToPage = function(a) {
                G(a), s || Q(), b.scrollTop = 0, d(a), c.updateLayout()
            }, c.getVisiblePages = function() {
                return [o]
            };
            var d = function(a) {
                for (var b = 1; b <= p; b++) T.removeClass(u[b], "current", "prev", "next", "before", "after"), b < a ? T.addClass(u[b], "before") : b > a && T.addClass(u[b], "after");
                T.addClass(u[a], "current"), a - 1 >= 1 && T.addClass(u[a - 1], "prev"), a + 1 <= p && T.addClass(u[a + 1], "next")
            };
            return c.updateLayout = function() {
                var c = Math.floor(g[o - 1][0] * n),
                    d = 0,
                    e = b.clientWidth - v;
                e > c ? d = (e - c) / 2 : e = c;
                var f = Math.floor(g[o - 1][1] * n),
                    h = 0,
                    i = b.clientHeight - v;
                i > f ? h = (i - f) / 2 : i = f, a.style.width = e + "px", a.style.height = i + "px";
                for (var j = 1; j <= p; j++) u[j].style.marginLeft = d + "px", u[j].style.marginTop = h + "px"
            }, c.isLastPage = function(a) {
                return a === p
            }, c.getZoomBounds = function() {
                return {
                    width: g[o - 1][0],
                    height: g[o - 1][1]
                }
            }, c.getAutoZoom = function(a, b) {
                return Math.min(a, b)
            }, c.next = function() {
                m.goToPage(o + 1)
            }, c.prev = function() {
                m.goToPage(o - 1)
            }, c.toString = function() {
                return IDRViewer.LAYOUT_PRESENTATION
            }, c
        }(),
        I = function() {
            function c(a) {
                return a > 1 && a < p
            }
            var d = {};
            d.setup = function() {}, d.unload = function() {
                for (var b = 1; b <= p; b++) u[b].style.marginLeft = "", u[b].style.marginTop = "", T.removeClass(u[b], "current", "prev", "next", "before", "after");
                a.style.width = "", a.style.height = ""
            }, d.goToPage = function(a) {
                1 !== a && a % 2 !== 0 && (a -= 1), G(a), s || Q(), e(a), d.updateLayout()
            }, d.getVisiblePages = function() {
                var a = [o];
                return c(o) && a.push(o + 1), a
            };
            var e = function(a) {
                for (var b = 1; b <= p; b++) T.removeClass(u[b], "current", "prev", "next", "before", "after");
                if (T.addClass(u[a], "current"), c(a) && T.addClass(u[a + 1], "current"), 1 == a && (a = 0), a + 2 <= p && (T.addClass(u[a + 2], "next"), a + 3 <= p && T.addClass(u[a + 3], "next")), a - 1 > 0 && (T.addClass(u[a - 1], "prev"), a - 2 > 0 && T.addClass(u[a - 2], "prev")), a + 4 <= p)
                    for (b = a + 4; b <= p; b++) T.addClass(u[b], "after");
                if (a - 3 > 0)
                    for (b = a - 3; b > 0; b--) T.addClass(u[b], "before")
            };
            return d.updateLayout = function() {
                var d = c(o),
                    e = Math.floor(g[o - 1][0] * n),
                    f = d ? Math.floor(g[o][0] * n) : 0,
                    h = 2 * Math.max(e, f),
                    i = Math.max(h, b.clientWidth - v),
                    j = i / 2 - e,
                    k = j + Math.floor(g[o - 1][0] * n),
                    l = Math.floor(g[o - 1][1] * n),
                    m = d ? Math.floor(g[o][1] * n) : l,
                    q = Math.max(l, m, b.clientHeight - v),
                    r = (q - l) / 2,
                    s = (q - m) / 2;
                a.style.width = i + "px", a.style.height = q + "px", u[1].style.marginLeft = k + "px", u[1].style.marginTop = s + "px";
                for (var t = 2; t <= p; t += 2) u[t].style.marginLeft = j + "px", u[t].style.marginTop = r + "px", t < p && (u[t + 1].style.marginLeft = k + "px", u[t + 1].style.marginTop = s + "px")
            }, d.isLastPage = function(a) {
                return a + (1 == a ? 1 : 2) > p
            }, d.getZoomBounds = function() {
                var a = c(o),
                    b = Math.floor(g[o - 1][0]),
                    d = a ? Math.floor(g[o][0]) : 0,
                    e = Math.floor(g[o - 1][1]),
                    f = a ? Math.floor(g[o][1]) : 0;
                return {
                    width: 2 * Math.max(b, d),
                    height: Math.max(e, f)
                }
            }, d.getAutoZoom = function(a, b) {
                return Math.min(a, b)
            }, d.next = function() {
                m.goToPage(o + (1 == o ? 1 : 2))
            }, d.prev = function() {
                m.goToPage(o - 1)
            }, d.toString = function() {
                return IDRViewer.LAYOUT_MAGAZINE
            }, d
        }(),
        J = function() {
            var a = {},
                c = 0,
                d = 0,
                e = [];
            a.setup = function() {
                b.addEventListener("scroll", f);
                for (var a = 0; a < p; a++) g[a][0] > c && (c = g[a][0]), g[a][1] > d && (d = g[a][1])
            }, a.unload = function() {
                b.removeEventListener("scroll", f)
            };
            var f = function() {
                    E.stopLoading(), h()
                },
                h = function() {
                    var a, b;
                    if (u[1].getBoundingClientRect().top > 0) G(1);
                    else
                        for (a = 1; a <= p; a++) {
                            var c = u[a].getBoundingClientRect();
                            b = c.top;
                            var d = c.bottom - c.top;
                            if (b <= .25 * d && b > .5 * -d) {
                                G(a);
                                break
                            }
                        }
                    i()
                },
                i = function() {
                    e = [o];
                    var a, c, d = b.clientHeight,
                        f = function(a) {
                            return c = u[a].getBoundingClientRect(), c.bottom > 0 && c.top < d
                        };
                    for (a = o - 1; a >= 1 && f(a); a--) e.push(a);
                    for (a = o + 1; a <= p && f(a); a++) e.push(a)
                };
            return a.goToPage = function(a, c) {
                var d = 0;
                if (c) {
                    var e = c.split(" ");
                    switch (e[0]) {
                        case "XYZ":
                            d = Number(e[2]);
                            break;
                        case "FitH":
                            d = Number(e[1]);
                            break;
                        case "FitR":
                            d = Number(e[4]);
                            break;
                        case "FitBH":
                            d = Number(e[1])
                    }
                    isNaN(d) && (d = 0), 0 !== d && (d = g[a - 1][1] - d), d < 0 && (d = 0)
                }
                b.scrollTop = u[a].offsetTop - v / 2 + d * n, G(a), i()
            }, a.getVisiblePages = function() {
                return e
            }, a.updateLayout = function() {}, a.isLastPage = function(a) {
                return a === p
            }, a.getZoomBounds = function() {
                return {
                    width: c,
                    height: d
                }
            }, a.getAutoZoom = function(c) {
                return a.getZoomBounds().width > b.clientWidth - v ? c : 1
            }, a.next = function() {
                m.goToPage(o + 1)
            }, a.prev = function() {
                m.goToPage(o - 1)
            }, a.toString = function() {
                return IDRViewer.LAYOUT_CONTINUOUS
            }, a
        }(),
        K = function() {
            var c = {},
                d = 0,
                e = 0,
                f = [],
                h = 0,
                i = 0,
                j = 0,
                k = 0;
            return c.setup = function() {
                var a, f, j, k = 0,
                    l = 0;
                b.addEventListener("touchstart", function(b) {
                    o > 1 && (u[o - 1].style.transition = ""), u[o].style.transition = "", o < p && (u[o + 1].style.transition = ""), 1 === b.touches.length ? (a = Date.now(), f = b.touches[0].pageX, k = f, j = b.touches[0].pageY, l = j) : a = 0, E.stopLoading()
                }), b.addEventListener("touchmove", function(a) {
                    if (1 === a.touches.length && document.documentElement.clientWidth === window.innerWidth) {
                        var c = a.touches[0].pageX,
                            d = a.touches[0].pageY;
                        h = c - k + h, o > 1 && (u[o - 1].style.transform = "translate3D(" + (h - b.clientWidth) + "px, 0, 0)"), u[o].style.transform = "translate3D(" + h + "px, 0, 0)", o < p && (u[o + 1].style.transform = "translate3D(" + (h + b.clientWidth) + "px, 0, 0)"), k = c, l = d, a.preventDefault()
                    }
                    E.stopLoading()
                }), b.addEventListener("touchend", function(d) {
                    var e;
                    if (0 === d.touches.length && Date.now() - a < 300) {
                        var g = k - f,
                            m = l - j;
                        Math.abs(g) > 100 && Math.abs(g) > .25 * Math.abs(m) && (e = g < 0 ? o + 1 : o - 1)
                    }
                    i += h, h = 0;
                    var n = e ? e : Math.round(-i / b.clientWidth) + 1;
                    c.goToPage(n)
                });
                for (var m = 0; m < p; m++) g[m][0] > d && (d = g[m][0]), g[m][1] > e && (e = g[m][1])
            }, c.unload = function() {
                a.style.width = "", a.style.height = ""
            }, c.goToPage = function(a) {
                a < 1 ? a = 1 : a > p && (a = p), i = -j * (a - 1);
                var b = a > o ? "right" : "left";
                if (u[a].style.transition = "0.5s", u[a].style.transform = "translate3D(0, 0, 0)", a === o) a > 1 && (u[a - 1].style.transition = "0.5s", u[a - 1].style.transform = "translate3D(" + -j + "px, 0, 0)"), a < p && (u[a + 1].style.transition = "0.5s", u[a + 1].style.transform = "translate3D(" + j + "px, 0, 0)");
                else if ("right" === b) {
                    u[o].style.transition = "0.5s", u[o].style.transform = "translate3D(" + -j + "px, 0, 0)", o > 1 && (u[o - 1].style.transition = "", u[o - 1].style.transform = "translate3D(" + -j + "px, 0, 0)");
                    for (var c = o + 1; c < a; c++) u[c].style.transition = "", u[c].style.transform = "translate3D(" + -j + "px, 0, 0)"
                } else if ("left" === b) {
                    u[o].style.transition = "0.5s", u[o].style.transform = "translate3D(" + j + "px, 0, 0)", o < p && (u[o + 1].style.transition = "", u[o + 1].style.transform = "translate3D(" + j + "px, 0, 0)");
                    for (var d = o - 1; d > a; d--) u[d].style.transition = "", u[d].style.transform = "translate3D(" + j + "px, 0, 0)"
                }
                setTimeout(function() {
                    E.stopLoading()
                }, 250), G(a), f = [o]
            }, c.getVisiblePages = function() {
                return f
            }, c.updateLayout = function() {
                var c = e * n,
                    f = d * n,
                    g = (j - f) / 2,
                    h = (k - c) / 2;
                k = b.clientHeight, j = b.clientWidth;
                for (var i = 0; i < o; i++) u[i + 1].style.transform = "translate3D(" + -j + "px, 0, 0)", u[i + 1].style.top = h + "px", u[i + 1].style.left = g + "px", u[i + 1].style.position = "absolute";
                for (u[o].style.transform = "translate3D(0, 0, 0)", u[o].style.top = h + "px", u[o].style.left = g + "px", u[o].style.position = "absolute", i = o; i < p; i++) u[i + 1].style.transform = "translate3D(" + j + "px, 0, 0)", u[i + 1].style.top = h + "px", u[i + 1].style.left = g + "px", u[i + 1].style.position = "absolute";
                a.style.width = j + "px", a.style.height = k + "px"
            }, c.isLastPage = function(a) {
                return a === p
            }, c.getZoomBounds = function() {
                return {
                    width: d,
                    height: e
                }
            }, c.getAutoZoom = function(a, b) {
                return Math.min(a, b)
            }, c.next = function() {
                m.goToPage(o + 1)
            }, c.prev = function() {
                m.goToPage(o - 1)
            }, c.toString = function() {
                return B
            }, c
        }(),
        L = function(a) {
            try {
                a.getSelection ? a.getSelection().empty ? a.getSelection().empty() : a.getSelection().removeAllRanges && a.getSelection().removeAllRanges() : a.document.selection && a.document.selection.empty()
            } catch (b) {}
        },
        M = function(b) {
            try {
                L(b);
                for (var c = a.children, d = 0; d < c.length; d++) E.getState(d + 1) === D.LOADED && L(c[d].firstChild.contentDocument)
            } catch (e) {}
        },
        N = function() {
            var a, c, d, f = {},
                g = !1;
            f.setup = function() {
                switch (d) {
                    case IDRViewer.SELECT_PAN:
                    case IDRViewer.SELECT_SELECT:
                        break;
                    default:
                        d = IDRViewer.SELECT_SELECT
                }
                this.currentSelectMode = d, this.currentSelectMode == m.SELECT_SELECT ? f.enableTextSelection() : f.enablePanning()
            }, f.enableTextSelection = function() {
                this.currentSelectMode = m.SELECT_SELECT, T.removeClass(h, "panning"), h.removeEventListener("mousedown", i), document.removeEventListener("mouseup", j), h.removeEventListener("mousemove", k)
            };
            var i = function(b) {
                    return b = b || window.event, T.addClass(h, "mousedown"), a = b.clientX, c = b.clientY, g = !0, !1
                },
                j = function() {
                    T.removeClass(h, "mousedown"), g = !1
                },
                k = function(d) {
                    if (g) return d = d || window.event, b.scrollLeft = b.scrollLeft + a - d.clientX, b.scrollTop = b.scrollTop + c - d.clientY, a = d.clientX, c = d.clientY, !1
                };
            return f.enablePanning = function() {
                this.currentSelectMode = m.SELECT_PAN, e ? M(window) : L(window), T.addClass(h, "panning"), h.addEventListener("mousedown", i), document.addEventListener("mouseup", j), h.addEventListener("mousemove", k)
            }, f.setDefaultMode = function(a) {
                d = a
            }, f
        }();
    m.setSelectMode = function(a) {
        if (x) {
            if (d) return;
            a == m.SELECT_SELECT ? N.enableTextSelection() : N.enablePanning(), m.fire("selectchange", {
                type: a
            })
        } else N.setDefaultMode(a)
    };
    var O, P = function(a, b, c, d, e) {
            var f;
            return f = e ? "translate3d(" + b + "px, " + c + "px, 0) scale(" + d + ")" : "translateX(" + b + "px) translateY(" + c + "px) scale(" + d + ")", F.getTransform(f)
        },
        Q = function(a) {
            E.stopLoading(), n = R(a);
            var d = !1,
                e = !1;
            n >= 4 ? (n = 4, e = !0) : n <= .25 && (n = .25, d = !0);
            var f = b.scrollTop / b.scrollHeight;
            c.updateLayout();
            for (var h = c.getVisiblePages(), j = 1; j <= p; j++) h.indexOf(j) === -1 && t[j].hide();
            O && i.deleteRule(O);
            var k = P(null, 0, 0, n, !1);
            O = i.insertRule(".page-inner { \n" + k + "\n}", i.cssRules.length);
            for (var l = 0; l < p; l++) u[l + 1].style.width = Math.floor(g[l][0] * n) + "px", u[l + 1].style.height = Math.floor(g[l][1] * n) + "px";
            b.scrollTop = b.scrollHeight * f, q++, q % 2 === 1 && Q(), m.fire("zoomchange", {
                zoomType: r,
                zoomValue: n,
                isMinZoom: d,
                isMaxZoom: e
            })
        };
    m.zoomIn = function() {
        Q(1.2 * n)
    }, m.zoomOut = function() {
        Q(n / 1.2)
    }, m.setZoom = function(a) {
        x ? Q(a) : l = a
    };
    var R = function(a) {
        var d = c.getZoomBounds(),
            e = (b.clientWidth - v) / d.width,
            f = (b.clientHeight - v) / d.height,
            g = parseFloat(a);
        switch (isNaN(g) || (n = g, a = m.ZOOM_SPECIFIC), a || (a = r), a) {
            case m.ZOOM_AUTO:
                n = c.getAutoZoom(e, f);
                break;
            case m.ZOOM_FITWIDTH:
                n = e;
                break;
            case m.ZOOM_FITHEIGHT:
                n = f;
                break;
            case m.ZOOM_FITPAGE:
                n = Math.min(e, f);
                break;
            case m.ZOOM_ACTUALSIZE:
                n = 1
        }
        return r = a, n
    };
    m.goToPage = function(a, b) {
        x ? a >= 1 && a <= p && c.goToPage(Number(a), b) : o = a
    }, m.next = function() {
        c.next()
    }, m.prev = function() {
        c.prev()
    }, m.setLayout = function(a) {
        x ? (c.unload(), T.removeClass(b, "layout-" + c.toString()), a == m.LAYOUT_PRESENTATION ? c = H : a == m.LAYOUT_MAGAZINE ? c = I : a == m.LAYOUT_CONTINUOUS ? c = J : a == B && (c = K), c.setup(o), T.addClass(b, "layout-" + c.toString()), Q(IDRViewer.ZOOM_AUTO), c.goToPage(o), m.fire("layoutchange", {
            layout: a
        })) : k = a
    }, m.updateLayout = function() {
        Q()
    };
    var S = function(a) {
        return document.getElementById(a)
    };
    m.on = function(a, b) {
        w[a] || (w[a] = []), w[a].indexOf(b) === -1 && w[a].push(b)
    }, m.off = function(a, b) {
        if (w[a]) {
            var c = w[a].indexOf(b);
            c !== -1 && w[a].splice(c, 1)
        }
    }, m.fire = function(a, b) {
        w[a] && w[a].forEach(function(a) {
            a(b)
        })
    };
    var T = function() {
        return {
            addClass: function(a, b) {
                var c = 0 !== a.className.length ? a.className.split(" ") : [],
                    d = c.indexOf(b);
                d === -1 && (c.push(b), a.className = c.join(" "))
            },
            removeClass: function() {
                for (var a = arguments[0], b = 0 !== a.className.length ? a.className.split(" ") : [], c = 1; c < arguments.length; c++) {
                    var d = b.indexOf(arguments[c]);
                    d !== -1 && b.splice(d, 1)
                }
                a.className = b.join(" ")
            }
        }
    }();
    if (window) {
        window.toggleAnnotation = function(a) {
            var b = document.getElementById(a).style;
            b.visibility = "hidden" === b.visibility ? "visible" : "hidden"
        };
        var U;
        window.Draggable = function(a) {
            function b(a) {
                a = a || window.event, e.isMoving = !0, e.mousePos.x = a.clientX || a.touches[0].pageX, e.mousePos.y = a.clientY || a.touches[0].pageY, e.offsets.left = e.element.parentNode.offsetLeft, e.offsets.top = e.element.parentNode.offsetTop, e.newPos.left = e.offsets.left, e.newPos.top = e.offsets.top, e.element.parentNode.style.zIndex = 5, U && (U.style.zIndex = 4)
            }

            function c() {
                e.isMoving = !1, U = e.element.parentNode
            }

            function d(a) {
                e.isMoving !== !1 && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, a = a || window.event, e.newPos.left = (a.clientX || a.touches[0].pageX) - e.mousePos.x + e.offsets.left, e.newPos.top = (a.clientY || a.touches[0].pageY) - e.mousePos.y + e.offsets.top, e.element.parentNode.style.top = e.newPos.top + "px", e.element.parentNode.style.left = e.newPos.left + "px")
            }
            this.element = a, this.offsets = {}, this.mousePos = {}, this.isMoving = !1, this.newPos = {}, this.html = document.getElementsByTagName("html").item(0), this.isTouch = "ontouchstart" in window;
            var e = this;
            if (this.element.onmousemove = null, this.html.addEventListener)
                if (this.isTouch) {
                    this.element.addEventListener("touchstart", b), this.html.addEventListener("touchmove", d), this.html.addEventListener("touchend", c);
                    try {
                        b(event)
                    } catch (f) {}
                } else this.element.addEventListener("mousedown", b), this.html.addEventListener("mousemove", d), this.html.addEventListener("mouseup", c);
            else this.html.attachEvent && (this.html.attachEvent("onmousedown", b), this.html.attachEvent("onmousemove", d), this.html.attachEvent("onmouseup", c));
            a.onclick = function() {
                e.offsets.left === e.newPos.left && e.newPos.top === e.offsets.top && (toggleAnnotation(e.element.parentNode.id), e.isMoving = !1)
            }
        }
    }
    "function" == typeof define && define.amd ? define(["idrviewer"], [], function() {
        return m
    }) : "object" == typeof module && module.exports ? module.exports = m : window.IDRViewer = m
}();