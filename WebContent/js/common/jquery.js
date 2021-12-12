/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function() {
	var l = this, g, y = l.jQuery, p = l.$, o = l.jQuery = l.$ = function(E, F) {
		return new o.fn.init(E, F)
	}, D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/, f = /^.[^:#\[\.,]*$/;
	o.fn = o.prototype = {
		init : function(E, H) {
			E = E || document;
			if (E.nodeType) {
				this[0] = E;
				this.length = 1;
				this.context = E;
				return this
			}
			if (typeof E === "string") {
				var G = D.exec(E);
				if (G && (G[1] || !H)) {
					if (G[1]) {
						E = o.clean( [ G[1] ], H)
					} else {
						var I = document.getElementById(G[3]);
						if (I && I.id != G[3]) {
							return o().find(E)
						}
						var F = o(I || []);
						F.context = document;
						F.selector = E;
						return F
					}
				} else {
					return o(H).find(E)
				}
			} else {
				if (o.isFunction(E)) {
					return o(document).ready(E)
				}
			}
			if (E.selector && E.context) {
				this.selector = E.selector;
				this.context = E.context
			}
			return this.setArray(o.isArray(E) ? E : o.makeArray(E))
		},
		selector : "",
		jquery : "1.3.2",
		size : function() {
			return this.length
		},
		get : function(E) {
			return E === g ? Array.prototype.slice.call(this) : this[E]
		},
		pushStack : function(F, H, E) {
			var G = o(F);
			G.prevObject = this;
			G.context = this.context;
			if (H === "find") {
				G.selector = this.selector + (this.selector ? " " : "") + E
			} else {
				if (H) {
					G.selector = this.selector + "." + H + "(" + E + ")"
				}
			}
			return G
		},
		setArray : function(E) {
			this.length = 0;
			Array.prototype.push.apply(this, E);
			return this
		},
		each : function(F, E) {
			return o.each(this, F, E)
		},
		index : function(E) {
			return o.inArray(E && E.jquery ? E[0] : E, this)
		},
		attr : function(F, H, G) {
			var E = F;
			if (typeof F === "string") {
				if (H === g) {
					return this[0] && o[G || "attr"](this[0], F)
				} else {
					E = {};
					E[F] = H
				}
			}
			return this.each(function(I) {
				for (F in E) {
					o.attr(G ? this.style : this, F, o
							.prop(this, E[F], G, I, F))
				}
			})
		},
		css : function(E, F) {
			if ((E == "width" || E == "height") && parseFloat(F) < 0) {
				F = g
			}
			return this.attr(E, F, "curCSS")
		},
		text : function(F) {
			if (typeof F !== "object" && F != null) {
				return this.empty().append(
						(this[0] && this[0].ownerDocument || document)
								.createTextNode(F))
			}
			var E = "";
			o.each(F || this, function() {
				o.each(this.childNodes, function() {
					if (this.nodeType != 8) {
						E += this.nodeType != 1 ? this.nodeValue : o.fn
								.text( [ this ])
					}
				})
			});
			return E
		},
		wrapAll : function(E) {
			if (this[0]) {
				var F = o(E, this[0].ownerDocument).clone();
				if (this[0].parentNode) {
					F.insertBefore(this[0])
				}
				F.map(function() {
					var G = this;
					while (G.firstChild) {
						G = G.firstChild
					}
					return G
				}).append(this)
			}
			return this
		},
		wrapInner : function(E) {
			return this.each(function() {
				o(this).contents().wrapAll(E)
			})
		},
		wrap : function(E) {
			return this.each(function() {
				o(this).wrapAll(E)
			})
		},
		append : function() {
			return this.domManip(arguments, true, function(E) {
				if (this.nodeType == 1) {
					this.appendChild(E)
				}
			})
		},
		prepend : function() {
			return this.domManip(arguments, true, function(E) {
				if (this.nodeType == 1) {
					this.insertBefore(E, this.firstChild)
				}
			})
		},
		before : function() {
			return this.domManip(arguments, false, function(E) {
				this.parentNode.insertBefore(E, this)
			})
		},
		after : function() {
			return this.domManip(arguments, false, function(E) {
				this.parentNode.insertBefore(E, this.nextSibling)
			})
		},
		end : function() {
			return this.prevObject || o( [])
		},
		push : [].push,
		sort : [].sort,
		splice : [].splice,
		find : function(E) {
			if (this.length === 1) {
				var F = this.pushStack( [], "find", E);
				F.length = 0;
				o.find(E, this[0], F);
				return F
			} else {
				return this.pushStack(o.unique(o.map(this, function(G) {
					return o.find(E, G)
				})), "find", E)
			}
		},
		clone : function(G) {
			var E = this.map(function() {
				if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
					var I = this.outerHTML;
					if (!I) {
						var J = this.ownerDocument.createElement("div");
						J.appendChild(this.cloneNode(true));
						I = J.innerHTML
					}
					return o.clean( [ I.replace(/ jQuery\d+="(?:\d+|null)"/g,
							"").replace(/^\s*/, "") ])[0]
				} else {
					return this.cloneNode(true)
				}
			});
			if (G === true) {
				var H = this.find("*").andSelf(), F = 0;
				E.find("*").andSelf().each(function() {
					if (this.nodeName !== H[F].nodeName) {
						return
					}
					var I = o.data(H[F], "events");
					for ( var K in I) {
						for ( var J in I[K]) {
							o.event.add(this, K, I[K][J], I[K][J].data)
						}
					}
					F++
				})
			}
			return E
		},
		filter : function(E) {
			return this.pushStack(o.isFunction(E)
					&& o.grep(this, function(G, F) {
						return E.call(G, F)
					}) || o.multiFilter(E, o.grep(this, function(F) {
						return F.nodeType === 1
					})), "filter", E)
		},
		closest : function(E) {
			var G = o.expr.match.POS.test(E) ? o(E) : null, F = 0;
			return this.map(function() {
				var H = this;
				while (H && H.ownerDocument) {
					if (G ? G.index(H) > -1 : o(H).is(E)) {
						o.data(H, "closest", F);
						return H
					}
					H = H.parentNode;
					F++
				}
			})
		},
		not : function(E) {
			if (typeof E === "string") {
				if (f.test(E)) {
					return this.pushStack(o.multiFilter(E, this, true), "not",
							E)
				} else {
					E = o.multiFilter(E, this)
				}
			}
			var F = E.length && E[E.length - 1] !== g && !E.nodeType;
			return this.filter(function() {
				return F ? o.inArray(this, E) < 0 : this != E
			})
		},
		add : function(E) {
			return this.pushStack(o.unique(o.merge(this.get(),
					typeof E === "string" ? o(E) : o.makeArray(E))))
		},
		is : function(E) {
			return !!E && o.multiFilter(E, this).length > 0
		},
		hasClass : function(E) {
			return !!E && this.is("." + E)
		},
		val : function(K) {
			if (K === g) {
				var E = this[0];
				if (E) {
					if (o.nodeName(E, "option")) {
						return (E.attributes.value || {}).specified ? E.value
								: E.text
					}
					if (o.nodeName(E, "select")) {
						var I = E.selectedIndex, L = [], M = E.options, H = E.type == "select-one";
						if (I < 0) {
							return null
						}
						for ( var F = H ? I : 0, J = H ? I + 1 : M.length; F < J; F++) {
							var G = M[F];
							if (G.selected) {
								K = o(G).val();
								if (H) {
									return K
								}
								L.push(K)
							}
						}
						return L
					}
					return (E.value || "").replace(/\r/g, "")
				}
				return g
			}
			if (typeof K === "number") {
				K += ""
			}
			return this
					.each(function() {
						if (this.nodeType != 1) {
							return
						}
						if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
							this.checked = (o.inArray(this.value, K) >= 0 || o
									.inArray(this.name, K) >= 0)
						} else {
							if (o.nodeName(this, "select")) {
								var N = o.makeArray(K);
								o("option", this)
										.each(
												function() {
													this.selected = (o.inArray(
															this.value, N) >= 0 || o
															.inArray(this.text,
																	N) >= 0)
												});
								if (!N.length) {
									this.selectedIndex = -1
								}
							} else {
								this.value = K
							}
						}
					})
		},
		html : function(E) {
			return E === g ? (this[0] ? this[0].innerHTML.replace(
					/ jQuery\d+="(?:\d+|null)"/g, "") : null) : this.empty()
					.append(E)
		},
		replaceWith : function(E) {
			return this.after(E).remove()
		},
		eq : function(E) {
			return this.slice(E, +E + 1)
		},
		slice : function() {
			return this.pushStack(Array.prototype.slice.apply(this, arguments),
					"slice", Array.prototype.slice.call(arguments).join(","))
		},
		map : function(E) {
			return this.pushStack(o.map(this, function(G, F) {
				return E.call(G, F, G)
			}))
		},
		andSelf : function() {
			return this.add(this.prevObject)
		},
		domManip : function(J, M, L) {
			if (this[0]) {
				var I = (this[0].ownerDocument || this[0])
						.createDocumentFragment(), F = o.clean(J,
						(this[0].ownerDocument || this[0]), I), H = I.firstChild;
				if (H) {
					for ( var G = 0, E = this.length; G < E; G++) {
						L.call(K(this[G], H), this.length > 1 || G > 0 ? I
								.cloneNode(true) : I)
					}
				}
				if (F) {
					o.each(F, z)
				}
			}
			return this;
			function K(N, O) {
				return M && o.nodeName(N, "table") && o.nodeName(O, "tr") ? (N
						.getElementsByTagName("tbody")[0] || N
						.appendChild(N.ownerDocument.createElement("tbody")))
						: N
			}
		}
	};
	o.fn.init.prototype = o.fn;
	function z(E, F) {
		if (F.src) {
			o.ajax( {
				url : F.src,
				async : false,
				dataType : "script"
			})
		} else {
			o.globalEval(F.text || F.textContent || F.innerHTML || "")
		}
		if (F.parentNode) {
			F.parentNode.removeChild(F)
		}
	}
	function e() {
		return +new Date
	}
	o.extend = o.fn.extend = function() {
		var J = arguments[0] || {}, H = 1, I = arguments.length, E = false, G;
		if (typeof J === "boolean") {
			E = J;
			J = arguments[1] || {};
			H = 2
		}
		if (typeof J !== "object" && !o.isFunction(J)) {
			J = {}
		}
		if (I == H) {
			J = this;
			--H
		}
		for (; H < I; H++) {
			if ((G = arguments[H]) != null) {
				for ( var F in G) {
					var K = J[F], L = G[F];
					if (J === L) {
						continue
					}
					if (E && L && typeof L === "object" && !L.nodeType) {
						J[F] = o
								.extend(E, K || (L.length != null ? [] : {}), L)
					} else {
						if (L !== g) {
							J[F] = L
						}
					}
				}
			}
		}
		return J
	};
	var b = /z-?index|font-?weight|opacity|zoom|line-?height/i, q = document.defaultView
			|| {}, s = Object.prototype.toString;
	o
			.extend( {
				noConflict : function(E) {
					l.$ = p;
					if (E) {
						l.jQuery = y
					}
					return o
				},
				isFunction : function(E) {
					return s.call(E) === "[object Function]"
				},
				isArray : function(E) {
					return s.call(E) === "[object Array]"
				},
				isXMLDoc : function(E) {
					return E.nodeType === 9
							&& E.documentElement.nodeName !== "HTML"
							|| !!E.ownerDocument && o.isXMLDoc(E.ownerDocument)
				},
				globalEval : function(G) {
					if (G && /\S/.test(G)) {
						var F = document.getElementsByTagName("head")[0]
								|| document.documentElement, E = document
								.createElement("script");
						E.type = "text/javascript";
						if (o.support.scriptEval) {
							E.appendChild(document.createTextNode(G))
						} else {
							E.text = G
						}
						F.insertBefore(E, F.firstChild);
						F.removeChild(E)
					}
				},
				nodeName : function(F, E) {
					return F.nodeName
							&& F.nodeName.toUpperCase() == E.toUpperCase()
				},
				each : function(G, K, F) {
					var E, H = 0, I = G.length;
					if (F) {
						if (I === g) {
							for (E in G) {
								if (K.apply(G[E], F) === false) {
									break
								}
							}
						} else {
							for (; H < I;) {
								if (K.apply(G[H++], F) === false) {
									break
								}
							}
						}
					} else {
						if (I === g) {
							for (E in G) {
								if (K.call(G[E], E, G[E]) === false) {
									break
								}
							}
						} else {
							for ( var J = G[0]; H < I
									&& K.call(J, H, J) !== false; J = G[++H]) {
							}
						}
					}
					return G
				},
				prop : function(H, I, G, F, E) {
					if (o.isFunction(I)) {
						I = I.call(H, F)
					}
					return typeof I === "number" && G == "curCSS" && !b.test(E) ? I
							+ "px"
							: I
				},
				className : {
					add : function(E, F) {
						o.each((F || "").split(/\s+/), function(G, H) {
							if (E.nodeType == 1
									&& !o.className.has(E.className, H)) {
								E.className += (E.className ? " " : "") + H
							}
						})
					},
					remove : function(E, F) {
						if (E.nodeType == 1) {
							E.className = F !== g ? o.grep(
									E.className.split(/\s+/), function(G) {
										return !o.className.has(F, G)
									}).join(" ") : ""
						}
					},
					has : function(F, E) {
						return F
								&& o.inArray(E, (F.className || F).toString()
										.split(/\s+/)) > -1
					}
				},
				swap : function(H, G, I) {
					var E = {};
					for ( var F in G) {
						E[F] = H.style[F];
						H.style[F] = G[F]
					}
					I.call(H);
					for ( var F in G) {
						H.style[F] = E[F]
					}
				},
				css : function(H, F, J, E) {
					if (F == "width" || F == "height") {
						var L, G = {
							position : "absolute",
							visibility : "hidden",
							display : "block"
						}, K = F == "width" ? [ "Left", "Right" ] : [ "Top",
								"Bottom" ];
						function I() {
							L = F == "width" ? H.offsetWidth : H.offsetHeight;
							if (E === "border") {
								return
							}
							o.each(K, function() {
								if (!E) {
									L -= parseFloat(o.curCSS(H, "padding"
											+ this, true)) || 0
								}
								if (E === "margin") {
									L += parseFloat(o.curCSS(H,
											"margin" + this, true)) || 0
								} else {
									L -= parseFloat(o.curCSS(H, "border" + this
											+ "Width", true)) || 0
								}
							})
						}
						if (H.offsetWidth !== 0) {
							I()
						} else {
							o.swap(H, G, I)
						}
						return Math.max(0, Math.round(L))
					}
					return o.curCSS(H, F, J)
				},
				curCSS : function(I, F, G) {
					var L, E = I.style;
					if (F == "opacity" && !o.support.opacity) {
						L = o.attr(E, "opacity");
						return L == "" ? "1" : L
					}
					if (F.match(/float/i)) {
						F = w
					}
					if (!G && E && E[F]) {
						L = E[F]
					} else {
						if (q.getComputedStyle) {
							if (F.match(/float/i)) {
								F = "float"
							}
							F = F.replace(/([A-Z])/g, "-$1").toLowerCase();
							var M = q.getComputedStyle(I, null);
							if (M) {
								L = M.getPropertyValue(F)
							}
							if (F == "opacity" && L == "") {
								L = "1"
							}
						} else {
							if (I.currentStyle) {
								var J = F.replace(/\-(\w)/g, function(N, O) {
									return O.toUpperCase()
								});
								L = I.currentStyle[F] || I.currentStyle[J];
								if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
									var H = E.left, K = I.runtimeStyle.left;
									I.runtimeStyle.left = I.currentStyle.left;
									E.left = L || 0;
									L = E.pixelLeft + "px";
									E.left = H;
									I.runtimeStyle.left = K
								}
							}
						}
					}
					return L
				},
				clean : function(F, K, I) {
					K = K || document;
					if (typeof K.createElement === "undefined") {
						K = K.ownerDocument || K[0] && K[0].ownerDocument
								|| document
					}
					if (!I && F.length === 1 && typeof F[0] === "string") {
						var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
						if (H) {
							return [ K.createElement(H[1]) ]
						}
					}
					var G = [], E = [], L = K.createElement("div");
					o
							.each(
									F,
									function(P, S) {
										if (typeof S === "number") {
											S += ""
										}
										if (!S) {
											return
										}
										if (typeof S === "string") {
											S = S
													.replace(
															/(<(\w+)[^>]*?)\/>/g,
															function(U, V, T) {
																return T
																		.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U
																		: V
																				+ "></"
																				+ T
																				+ ">"
															});
											var O = S.replace(/^\s+/, "")
													.substring(0, 10)
													.toLowerCase();
											var Q = !O.indexOf("<opt")
													&& [
															1,
															"<select multiple='multiple'>",
															"</select>" ]
													|| !O.indexOf("<leg")
													&& [ 1, "<fieldset>",
															"</fieldset>" ]
													|| O
															.match(/^<(thead|tbody|tfoot|colg|cap)/)
													&& [ 1, "<table>",
															"</table>" ]
													|| !O.indexOf("<tr")
													&& [ 2, "<table><tbody>",
															"</tbody></table>" ]
													|| (!O.indexOf("<td") || !O
															.indexOf("<th"))
													&& [
															3,
															"<table><tbody><tr>",
															"</tr></tbody></table>" ]
													|| !O.indexOf("<col")
													&& [
															2,
															"<table><tbody></tbody><colgroup>",
															"</colgroup></table>" ]
													|| !o.support.htmlSerialize
													&& [ 1, "div<div>",
															"</div>" ]
													|| [ 0, "", "" ];
											L.innerHTML = Q[1] + S + Q[2];
											while (Q[0]--) {
												L = L.lastChild
											}
											if (!o.support.tbody) {
												var R = /<tbody/i.test(S), N = !O
														.indexOf("<table")
														&& !R ? L.firstChild
														&& L.firstChild.childNodes
														: Q[1] == "<table>"
																&& !R ? L.childNodes
																: [];
												for ( var M = N.length - 1; M >= 0; --M) {
													if (o.nodeName(N[M],
															"tbody")
															&& !N[M].childNodes.length) {
														N[M].parentNode
																.removeChild(N[M])
													}
												}
											}
											if (!o.support.leadingWhitespace
													&& /^\s/.test(S)) {
												L
														.insertBefore(
																K
																		.createTextNode(S
																				.match(/^\s*/)[0]),
																L.firstChild)
											}
											S = o.makeArray(L.childNodes)
										}
										if (S.nodeType) {
											G.push(S)
										} else {
											G = o.merge(G, S)
										}
									});
					if (I) {
						for ( var J = 0; G[J]; J++) {
							if (o.nodeName(G[J], "script")
									&& (!G[J].type || G[J].type.toLowerCase() === "text/javascript")) {
								E.push(G[J].parentNode ? G[J].parentNode
										.removeChild(G[J]) : G[J])
							} else {
								if (G[J].nodeType === 1) {
									G.splice
											.apply(
													G,
													[ J + 1, 0 ]
															.concat(o
																	.makeArray(G[J]
																			.getElementsByTagName("script"))))
								}
								I.appendChild(G[J])
							}
						}
						return E
					}
					return G
				},
				attr : function(J, G, K) {
					if (!J || J.nodeType == 3 || J.nodeType == 8) {
						return g
					}
					var H = !o.isXMLDoc(J), L = K !== g;
					G = H && o.props[G] || G;
					if (J.tagName) {
						var F = /href|src|style/.test(G);
						if (G == "selected" && J.parentNode) {
							J.parentNode.selectedIndex
						}
						if (G in J && H && !F) {
							if (L) {
								if (G == "type" && o.nodeName(J, "input")
										&& J.parentNode) {
									throw "type property can't be changed"
								}
								J[G] = K
							}
							if (o.nodeName(J, "form") && J.getAttributeNode(G)) {
								return J.getAttributeNode(G).nodeValue
							}
							if (G == "tabIndex") {
								var I = J.getAttributeNode("tabIndex");
								return I && I.specified ? I.value
										: J.nodeName
												.match(/(button|input|object|select|textarea)/i) ? 0
												: J.nodeName
														.match(/^(a|area)$/i)
														&& J.href ? 0 : g
							}
							return J[G]
						}
						if (!o.support.style && H && G == "style") {
							return o.attr(J.style, "cssText", K)
						}
						if (L) {
							J.setAttribute(G, "" + K)
						}
						var E = !o.support.hrefNormalized && H && F ? J
								.getAttribute(G, 2) : J.getAttribute(G);
						return E === null ? g : E
					}
					if (!o.support.opacity && G == "opacity") {
						if (L) {
							J.zoom = 1;
							J.filter = (J.filter || "").replace(
									/alpha\([^)]*\)/, "")
									+ (parseInt(K) + "" == "NaN" ? ""
											: "alpha(opacity=" + K * 100 + ")")
						}
						return J.filter && J.filter.indexOf("opacity=") >= 0 ? (parseFloat(J.filter
								.match(/opacity=([^)]*)/)[1]) / 100)
								+ ""
								: ""
					}
					G = G.replace(/-([a-z])/ig, function(M, N) {
						return N.toUpperCase()
					});
					if (L) {
						J[G] = K
					}
					return J[G]
				},
				trim : function(E) {
					return (E || "").replace(/^\s+|\s+$/g, "")
				},
				makeArray : function(G) {
					var E = [];
					if (G != null) {
						var F = G.length;
						if (F == null || typeof G === "string"
								|| o.isFunction(G) || G.setInterval) {
							E[0] = G
						} else {
							while (F) {
								E[--F] = G[F]
							}
						}
					}
					return E
				},
				inArray : function(G, H) {
					for ( var E = 0, F = H.length; E < F; E++) {
						if (H[E] === G) {
							return E
						}
					}
					return -1
				},
				merge : function(H, E) {
					var F = 0, G, I = H.length;
					if (!o.support.getAll) {
						while ((G = E[F++]) != null) {
							if (G.nodeType != 8) {
								H[I++] = G
							}
						}
					} else {
						while ((G = E[F++]) != null) {
							H[I++] = G
						}
					}
					return H
				},
				unique : function(K) {
					var F = [], E = {};
					try {
						for ( var G = 0, H = K.length; G < H; G++) {
							var J = o.data(K[G]);
							if (!E[J]) {
								E[J] = true;
								F.push(K[G])
							}
						}
					} catch (I) {
						F = K
					}
					return F
				},
				grep : function(F, J, E) {
					var G = [];
					for ( var H = 0, I = F.length; H < I; H++) {
						if (!E != !J(F[H], H)) {
							G.push(F[H])
						}
					}
					return G
				},
				map : function(E, J) {
					var F = [];
					for ( var G = 0, H = E.length; G < H; G++) {
						var I = J(E[G], G);
						if (I != null) {
							F[F.length] = I
						}
					}
					return F.concat.apply( [], F)
				}
			});
	var C = navigator.userAgent.toLowerCase();
	o.browser = {
		version : (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, "0" ])[1],
		safari : /webkit/.test(C),
		opera : /opera/.test(C),
		msie : /msie/.test(C) && !/opera/.test(C),
		mozilla : /mozilla/.test(C) && !/(compatible|webkit)/.test(C)
	};
	o.each( {
		parent : function(E) {
			return E.parentNode
		},
		parents : function(E) {
			return o.dir(E, "parentNode")
		},
		next : function(E) {
			return o.nth(E, 2, "nextSibling")
		},
		prev : function(E) {
			return o.nth(E, 2, "previousSibling")
		},
		nextAll : function(E) {
			return o.dir(E, "nextSibling")
		},
		prevAll : function(E) {
			return o.dir(E, "previousSibling")
		},
		siblings : function(E) {
			return o.sibling(E.parentNode.firstChild, E)
		},
		children : function(E) {
			return o.sibling(E.firstChild)
		},
		contents : function(E) {
			return o.nodeName(E, "iframe") ? E.contentDocument
					|| E.contentWindow.document : o.makeArray(E.childNodes)
		}
	}, function(E, F) {
		o.fn[E] = function(G) {
			var H = o.map(this, F);
			if (G && typeof G == "string") {
				H = o.multiFilter(G, H)
			}
			return this.pushStack(o.unique(H), E, G)
		}
	});
	o.each( {
		appendTo : "append",
		prependTo : "prepend",
		insertBefore : "before",
		insertAfter : "after",
		replaceAll : "replaceWith"
	}, function(E, F) {
		o.fn[E] = function(G) {
			var J = [], L = o(G);
			for ( var K = 0, H = L.length; K < H; K++) {
				var I = (K > 0 ? this.clone(true) : this).get();
				o.fn[F].apply(o(L[K]), I);
				J = J.concat(I)
			}
			return this.pushStack(J, E, G)
		}
	});
	o.each( {
		removeAttr : function(E) {
			o.attr(this, E, "");
			if (this.nodeType == 1) {
				this.removeAttribute(E)
			}
		},
		addClass : function(E) {
			o.className.add(this, E)
		},
		removeClass : function(E) {
			o.className.remove(this, E)
		},
		toggleClass : function(F, E) {
			if (typeof E !== "boolean") {
				E = !o.className.has(this, F)
			}
			o.className[E ? "add" : "remove"](this, F)
		},
		remove : function(E) {
			if (!E || o.filter(E, [ this ]).length) {
				o("*", this).add( [ this ]).each(function() {
					o.event.remove(this);
					o.removeData(this)
				});
				if (this.parentNode) {
					this.parentNode.removeChild(this)
				}
			}
		},
		empty : function() {
			o(this).children().remove();
			while (this.firstChild) {
				this.removeChild(this.firstChild)
			}
		}
	}, function(E, F) {
		o.fn[E] = function() {
			return this.each(F, arguments)
		}
	});
	function j(E, F) {
		return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0
	}
	var h = "jQuery" + e(), v = 0, A = {};
	o.extend( {
		cache : {},
		data : function(F, E, G) {
			F = F == l ? A : F;
			var H = F[h];
			if (!H) {
				H = F[h] = ++v
			}
			if (E && !o.cache[H]) {
				o.cache[H] = {}
			}
			if (G !== g) {
				o.cache[H][E] = G
			}
			return E ? o.cache[H][E] : H
		},
		removeData : function(F, E) {
			F = F == l ? A : F;
			var H = F[h];
			if (E) {
				if (o.cache[H]) {
					delete o.cache[H][E];
					E = "";
					for (E in o.cache[H]) {
						break
					}
					if (!E) {
						o.removeData(F)
					}
				}
			} else {
				try {
					delete F[h]
				} catch (G) {
					if (F.removeAttribute) {
						F.removeAttribute(h)
					}
				}
				delete o.cache[H]
			}
		},
		queue : function(F, E, H) {
			if (F) {
				E = (E || "fx") + "queue";
				var G = o.data(F, E);
				if (!G || o.isArray(H)) {
					G = o.data(F, E, o.makeArray(H))
				} else {
					if (H) {
						G.push(H)
					}
				}
			}
			return G
		},
		dequeue : function(H, G) {
			var E = o.queue(H, G), F = E.shift();
			if (!G || G === "fx") {
				F = E[0]
			}
			if (F !== g) {
				F.call(H)
			}
		}
	});
	o.fn.extend( {
		data : function(E, G) {
			var H = E.split(".");
			H[1] = H[1] ? "." + H[1] : "";
			if (G === g) {
				var F = this.triggerHandler("getData" + H[1] + "!", [ H[0] ]);
				if (F === g && this.length) {
					F = o.data(this[0], E)
				}
				return F === g && H[1] ? this.data(H[0]) : F
			} else {
				return this.trigger("setData" + H[1] + "!", [ H[0], G ]).each(
						function() {
							o.data(this, E, G)
						})
			}
		},
		removeData : function(E) {
			return this.each(function() {
				o.removeData(this, E)
			})
		},
		queue : function(E, F) {
			if (typeof E !== "string") {
				F = E;
				E = "fx"
			}
			if (F === g) {
				return o.queue(this[0], E)
			}
			return this.each(function() {
				var G = o.queue(this, E, F);
				if (E == "fx" && G.length == 1) {
					G[0].call(this)
				}
			})
		},
		dequeue : function(E) {
			return this.each(function() {
				o.dequeue(this, E)
			})
		}
	});
	/*
	 * Sizzle CSS Selector Engine - v0.9.3 Copyright 2009, The Dojo Foundation
	 * Released under the MIT, BSD, and GPL Licenses. More information:
	 * http://sizzlejs.com/
	 */
	(function() {
		var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g, L = 0, H = Object.prototype.toString;
		var F = function(Y, U, ab, ac) {
			ab = ab || [];
			U = U || document;
			if (U.nodeType !== 1 && U.nodeType !== 9) {
				return []
			}
			if (!Y || typeof Y !== "string") {
				return ab
			}
			var Z = [], W, af, ai, T, ad, V, X = true;
			R.lastIndex = 0;
			while ((W = R.exec(Y)) !== null) {
				Z.push(W[1]);
				if (W[2]) {
					V = RegExp.rightContext;
					break
				}
			}
			if (Z.length > 1 && M.exec(Y)) {
				if (Z.length === 2 && I.relative[Z[0]]) {
					af = J(Z[0] + Z[1], U)
				} else {
					af = I.relative[Z[0]] ? [ U ] : F(Z.shift(), U);
					while (Z.length) {
						Y = Z.shift();
						if (I.relative[Y]) {
							Y += Z.shift()
						}
						af = J(Y, af)
					}
				}
			} else {
				var ae = ac ? {
					expr : Z.pop(),
					set : E(ac)
				} : F
						.find(Z.pop(),
								Z.length === 1 && U.parentNode ? U.parentNode
										: U, Q(U));
				af = F.filter(ae.expr, ae.set);
				if (Z.length > 0) {
					ai = E(af)
				} else {
					X = false
				}
				while (Z.length) {
					var ah = Z.pop(), ag = ah;
					if (!I.relative[ah]) {
						ah = ""
					} else {
						ag = Z.pop()
					}
					if (ag == null) {
						ag = U
					}
					I.relative[ah](ai, ag, Q(U))
				}
			}
			if (!ai) {
				ai = af
			}
			if (!ai) {
				throw "Syntax error, unrecognized expression: " + (ah || Y)
			}
			if (H.call(ai) === "[object Array]") {
				if (!X) {
					ab.push.apply(ab, ai)
				} else {
					if (U.nodeType === 1) {
						for ( var aa = 0; ai[aa] != null; aa++) {
							if (ai[aa]
									&& (ai[aa] === true || ai[aa].nodeType === 1
											&& K(U, ai[aa]))) {
								ab.push(af[aa])
							}
						}
					} else {
						for ( var aa = 0; ai[aa] != null; aa++) {
							if (ai[aa] && ai[aa].nodeType === 1) {
								ab.push(af[aa])
							}
						}
					}
				}
			} else {
				E(ai, ab)
			}
			if (V) {
				F(V, U, ab, ac);
				if (G) {
					hasDuplicate = false;
					ab.sort(G);
					if (hasDuplicate) {
						for ( var aa = 1; aa < ab.length; aa++) {
							if (ab[aa] === ab[aa - 1]) {
								ab.splice(aa--, 1)
							}
						}
					}
				}
			}
			return ab
		};
		F.matches = function(T, U) {
			return F(T, null, null, U)
		};
		F.find = function(aa, T, ab) {
			var Z, X;
			if (!aa) {
				return []
			}
			for ( var W = 0, V = I.order.length; W < V; W++) {
				var Y = I.order[W], X;
				if ((X = I.match[Y].exec(aa))) {
					var U = RegExp.leftContext;
					if (U.substr(U.length - 1) !== "\\") {
						X[1] = (X[1] || "").replace(/\\/g, "");
						Z = I.find[Y](X, T, ab);
						if (Z != null) {
							aa = aa.replace(I.match[Y], "");
							break
						}
					}
				}
			}
			if (!Z) {
				Z = T.getElementsByTagName("*")
			}
			return {
				set : Z,
				expr : aa
			}
		};
		F.filter = function(ad, ac, ag, W) {
			var V = ad, ai = [], aa = ac, Y, T, Z = ac && ac[0] && Q(ac[0]);
			while (ad && ac.length) {
				for ( var ab in I.filter) {
					if ((Y = I.match[ab].exec(ad)) != null) {
						var U = I.filter[ab], ah, af;
						T = false;
						if (aa == ai) {
							ai = []
						}
						if (I.preFilter[ab]) {
							Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
							if (!Y) {
								T = ah = true
							} else {
								if (Y === true) {
									continue
								}
							}
						}
						if (Y) {
							for ( var X = 0; (af = aa[X]) != null; X++) {
								if (af) {
									ah = U(af, Y, X, aa);
									var ae = W ^ !!ah;
									if (ag && ah != null) {
										if (ae) {
											T = true
										} else {
											aa[X] = false
										}
									} else {
										if (ae) {
											ai.push(af);
											T = true
										}
									}
								}
							}
						}
						if (ah !== g) {
							if (!ag) {
								aa = ai
							}
							ad = ad.replace(I.match[ab], "");
							if (!T) {
								return []
							}
							break
						}
					}
				}
				if (ad == V) {
					if (T == null) {
						throw "Syntax error, unrecognized expression: " + ad
					} else {
						break
					}
				}
				V = ad
			}
			return aa
		};
		var I = F.selectors = {
			order : [ "ID", "NAME", "TAG" ],
			match : {
				ID : /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
				CLASS : /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
				NAME : /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
				ATTR : /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG : /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
				CHILD : /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
				POS : /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
				PSEUDO : /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
			},
			attrMap : {
				"class" : "className",
				"for" : "htmlFor"
			},
			attrHandle : {
				href : function(T) {
					return T.getAttribute("href")
				}
			},
			relative : {
				"+" : function(aa, T, Z) {
					var X = typeof T === "string", ab = X && !/\W/.test(T), Y = X
							&& !ab;
					if (ab && !Z) {
						T = T.toUpperCase()
					}
					for ( var W = 0, V = aa.length, U; W < V; W++) {
						if ((U = aa[W])) {
							while ((U = U.previousSibling) && U.nodeType !== 1) {
							}
							aa[W] = Y || U && U.nodeName === T ? U || false
									: U === T
						}
					}
					if (Y) {
						F.filter(T, aa, true)
					}
				},
				">" : function(Z, U, aa) {
					var X = typeof U === "string";
					if (X && !/\W/.test(U)) {
						U = aa ? U : U.toUpperCase();
						for ( var V = 0, T = Z.length; V < T; V++) {
							var Y = Z[V];
							if (Y) {
								var W = Y.parentNode;
								Z[V] = W.nodeName === U ? W : false
							}
						}
					} else {
						for ( var V = 0, T = Z.length; V < T; V++) {
							var Y = Z[V];
							if (Y) {
								Z[V] = X ? Y.parentNode : Y.parentNode === U
							}
						}
						if (X) {
							F.filter(U, Z, true)
						}
					}
				},
				"" : function(W, U, Y) {
					var V = L++, T = S;
					if (!U.match(/\W/)) {
						var X = U = Y ? U : U.toUpperCase();
						T = P
					}
					T("parentNode", U, V, W, X, Y)
				},
				"~" : function(W, U, Y) {
					var V = L++, T = S;
					if (typeof U === "string" && !U.match(/\W/)) {
						var X = U = Y ? U : U.toUpperCase();
						T = P
					}
					T("previousSibling", U, V, W, X, Y)
				}
			},
			find : {
				ID : function(U, V, W) {
					if (typeof V.getElementById !== "undefined" && !W) {
						var T = V.getElementById(U[1]);
						return T ? [ T ] : []
					}
				},
				NAME : function(V, Y, Z) {
					if (typeof Y.getElementsByName !== "undefined") {
						var U = [], X = Y.getElementsByName(V[1]);
						for ( var W = 0, T = X.length; W < T; W++) {
							if (X[W].getAttribute("name") === V[1]) {
								U.push(X[W])
							}
						}
						return U.length === 0 ? null : U
					}
				},
				TAG : function(T, U) {
					return U.getElementsByTagName(T[1])
				}
			},
			preFilter : {
				CLASS : function(W, U, V, T, Z, aa) {
					W = " " + W[1].replace(/\\/g, "") + " ";
					if (aa) {
						return W
					}
					for ( var X = 0, Y; (Y = U[X]) != null; X++) {
						if (Y) {
							if (Z
									^ (Y.className && (" " + Y.className + " ")
											.indexOf(W) >= 0)) {
								if (!V) {
									T.push(Y)
								}
							} else {
								if (V) {
									U[X] = false
								}
							}
						}
					}
					return false
				},
				ID : function(T) {
					return T[1].replace(/\\/g, "")
				},
				TAG : function(U, T) {
					for ( var V = 0; T[V] === false; V++) {
					}
					return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase()
				},
				CHILD : function(T) {
					if (T[1] == "nth") {
						var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == "even"
								&& "2n" || T[2] == "odd" && "2n+1"
								|| !/\D/.test(T[2]) && "0n+" + T[2] || T[2]);
						T[2] = (U[1] + (U[2] || 1)) - 0;
						T[3] = U[3] - 0
					}
					T[0] = L++;
					return T
				},
				ATTR : function(X, U, V, T, Y, Z) {
					var W = X[1].replace(/\\/g, "");
					if (!Z && I.attrMap[W]) {
						X[1] = I.attrMap[W]
					}
					if (X[2] === "~=") {
						X[4] = " " + X[4] + " "
					}
					return X
				},
				PSEUDO : function(X, U, V, T, Y) {
					if (X[1] === "not") {
						if (X[3].match(R).length > 1 || /^\w/.test(X[3])) {
							X[3] = F(X[3], null, null, U)
						} else {
							var W = F.filter(X[3], U, V, true ^ Y);
							if (!V) {
								T.push.apply(T, W)
							}
							return false
						}
					} else {
						if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
							return true
						}
					}
					return X
				},
				POS : function(T) {
					T.unshift(true);
					return T
				}
			},
			filters : {
				enabled : function(T) {
					return T.disabled === false && T.type !== "hidden"
				},
				disabled : function(T) {
					return T.disabled === true
				},
				checked : function(T) {
					return T.checked === true
				},
				selected : function(T) {
					T.parentNode.selectedIndex;
					return T.selected === true
				},
				parent : function(T) {
					return !!T.firstChild
				},
				empty : function(T) {
					return !T.firstChild
				},
				has : function(V, U, T) {
					return !!F(T[3], V).length
				},
				header : function(T) {
					return /h\d/i.test(T.nodeName)
				},
				text : function(T) {
					return "text" === T.type
				},
				radio : function(T) {
					return "radio" === T.type
				},
				checkbox : function(T) {
					return "checkbox" === T.type
				},
				file : function(T) {
					return "file" === T.type
				},
				password : function(T) {
					return "password" === T.type
				},
				submit : function(T) {
					return "submit" === T.type
				},
				image : function(T) {
					return "image" === T.type
				},
				reset : function(T) {
					return "reset" === T.type
				},
				button : function(T) {
					return "button" === T.type
							|| T.nodeName.toUpperCase() === "BUTTON"
				},
				input : function(T) {
					return /input|select|textarea|button/i.test(T.nodeName)
				}
			},
			setFilters : {
				first : function(U, T) {
					return T === 0
				},
				last : function(V, U, T, W) {
					return U === W.length - 1
				},
				even : function(U, T) {
					return T % 2 === 0
				},
				odd : function(U, T) {
					return T % 2 === 1
				},
				lt : function(V, U, T) {
					return U < T[3] - 0
				},
				gt : function(V, U, T) {
					return U > T[3] - 0
				},
				nth : function(V, U, T) {
					return T[3] - 0 == U
				},
				eq : function(V, U, T) {
					return T[3] - 0 == U
				}
			},
			filter : {
				PSEUDO : function(Z, V, W, aa) {
					var U = V[1], X = I.filters[U];
					if (X) {
						return X(Z, W, V, aa)
					} else {
						if (U === "contains") {
							return (Z.textContent || Z.innerText || "")
									.indexOf(V[3]) >= 0
						} else {
							if (U === "not") {
								var Y = V[3];
								for ( var W = 0, T = Y.length; W < T; W++) {
									if (Y[W] === Z) {
										return false
									}
								}
								return true
							}
						}
					}
				},
				CHILD : function(T, W) {
					var Z = W[1], U = T;
					switch (Z) {
					case "only":
					case "first":
						while (U = U.previousSibling) {
							if (U.nodeType === 1) {
								return false
							}
						}
						if (Z == "first") {
							return true
						}
						U = T;
					case "last":
						while (U = U.nextSibling) {
							if (U.nodeType === 1) {
								return false
							}
						}
						return true;
					case "nth":
						var V = W[2], ac = W[3];
						if (V == 1 && ac == 0) {
							return true
						}
						var Y = W[0], ab = T.parentNode;
						if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
							var X = 0;
							for (U = ab.firstChild; U; U = U.nextSibling) {
								if (U.nodeType === 1) {
									U.nodeIndex = ++X
								}
							}
							ab.sizcache = Y
						}
						var aa = T.nodeIndex - ac;
						if (V == 0) {
							return aa == 0
						} else {
							return (aa % V == 0 && aa / V >= 0)
						}
					}
				},
				ID : function(U, T) {
					return U.nodeType === 1 && U.getAttribute("id") === T
				},
				TAG : function(U, T) {
					return (T === "*" && U.nodeType === 1) || U.nodeName === T
				},
				CLASS : function(U, T) {
					return (" " + (U.className || U.getAttribute("class")) + " ")
							.indexOf(T) > -1
				},
				ATTR : function(Y, W) {
					var V = W[1], T = I.attrHandle[V] ? I.attrHandle[V](Y)
							: Y[V] != null ? Y[V] : Y.getAttribute(V), Z = T
							+ "", X = W[2], U = W[4];
					return T == null ? X === "!="
							: X === "=" ? Z === U
									: X === "*=" ? Z.indexOf(U) >= 0
											: X === "~=" ? (" " + Z + " ")
													.indexOf(U) >= 0
													: !U ? Z && T !== false
															: X === "!=" ? Z != U
																	: X === "^=" ? Z
																			.indexOf(U) === 0
																			: X === "$=" ? Z
																					.substr(Z.length
																							- U.length) === U
																					: X === "|=" ? Z === U
																							|| Z
																									.substr(
																											0,
																											U.length + 1) === U
																									+ "-"
																							: false
				},
				POS : function(X, U, V, Y) {
					var T = U[2], W = I.setFilters[T];
					if (W) {
						return W(X, V, U, Y)
					}
				}
			}
		};
		var M = I.match.POS;
		for ( var O in I.match) {
			I.match[O] = RegExp(I.match[O].source
					+ /(?![^\[]*\])(?![^\(]*\))/.source)
		}
		var E = function(U, T) {
			U = Array.prototype.slice.call(U);
			if (T) {
				T.push.apply(T, U);
				return T
			}
			return U
		};
		try {
			Array.prototype.slice.call(document.documentElement.childNodes)
		} catch (N) {
			E = function(X, W) {
				var U = W || [];
				if (H.call(X) === "[object Array]") {
					Array.prototype.push.apply(U, X)
				} else {
					if (typeof X.length === "number") {
						for ( var V = 0, T = X.length; V < T; V++) {
							U.push(X[V])
						}
					} else {
						for ( var V = 0; X[V]; V++) {
							U.push(X[V])
						}
					}
				}
				return U
			}
		}
		var G;
		if (document.documentElement.compareDocumentPosition) {
			G = function(U, T) {
				var V = U.compareDocumentPosition(T) & 4 ? -1 : U === T ? 0 : 1;
				if (V === 0) {
					hasDuplicate = true
				}
				return V
			}
		} else {
			if ("sourceIndex" in document.documentElement) {
				G = function(U, T) {
					var V = U.sourceIndex - T.sourceIndex;
					if (V === 0) {
						hasDuplicate = true
					}
					return V
				}
			} else {
				if (document.createRange) {
					G = function(W, U) {
						var V = W.ownerDocument.createRange(), T = U.ownerDocument
								.createRange();
						V.selectNode(W);
						V.collapse(true);
						T.selectNode(U);
						T.collapse(true);
						var X = V.compareBoundaryPoints(Range.START_TO_END, T);
						if (X === 0) {
							hasDuplicate = true
						}
						return X
					}
				}
			}
		}
		(function() {
			var U = document.createElement("form"), V = "script"
					+ (new Date).getTime();
			U.innerHTML = "<input name='" + V + "'/>";
			var T = document.documentElement;
			T.insertBefore(U, T.firstChild);
			if (!!document.getElementById(V)) {
				I.find.ID = function(X, Y, Z) {
					if (typeof Y.getElementById !== "undefined" && !Z) {
						var W = Y.getElementById(X[1]);
						return W ? W.id === X[1]
								|| typeof W.getAttributeNode !== "undefined"
								&& W.getAttributeNode("id").nodeValue === X[1] ? [ W ]
								: g
								: []
					}
				};
				I.filter.ID = function(Y, W) {
					var X = typeof Y.getAttributeNode !== "undefined"
							&& Y.getAttributeNode("id");
					return Y.nodeType === 1 && X && X.nodeValue === W
				}
			}
			T.removeChild(U)
		})();
		(function() {
			var T = document.createElement("div");
			T.appendChild(document.createComment(""));
			if (T.getElementsByTagName("*").length > 0) {
				I.find.TAG = function(U, Y) {
					var X = Y.getElementsByTagName(U[1]);
					if (U[1] === "*") {
						var W = [];
						for ( var V = 0; X[V]; V++) {
							if (X[V].nodeType === 1) {
								W.push(X[V])
							}
						}
						X = W
					}
					return X
				}
			}
			T.innerHTML = "<a href='#'></a>";
			if (T.firstChild
					&& typeof T.firstChild.getAttribute !== "undefined"
					&& T.firstChild.getAttribute("href") !== "#") {
				I.attrHandle.href = function(U) {
					return U.getAttribute("href", 2)
				}
			}
		})();
		if (document.querySelectorAll) {
			(function() {
				var T = F, U = document.createElement("div");
				U.innerHTML = "<p class='TEST'></p>";
				if (U.querySelectorAll
						&& U.querySelectorAll(".TEST").length === 0) {
					return
				}
				F = function(Y, X, V, W) {
					X = X || document;
					if (!W && X.nodeType === 9 && !Q(X)) {
						try {
							return E(X.querySelectorAll(Y), V)
						} catch (Z) {
						}
					}
					return T(Y, X, V, W)
				};
				F.find = T.find;
				F.filter = T.filter;
				F.selectors = T.selectors;
				F.matches = T.matches
			})()
		}
		if (document.getElementsByClassName
				&& document.documentElement.getElementsByClassName) {
			(function() {
				var T = document.createElement("div");
				T.innerHTML = "<div class='test e'></div><div class='test'></div>";
				if (T.getElementsByClassName("e").length === 0) {
					return
				}
				T.lastChild.className = "e";
				if (T.getElementsByClassName("e").length === 1) {
					return
				}
				I.order.splice(1, 0, "CLASS");
				I.find.CLASS = function(U, V, W) {
					if (typeof V.getElementsByClassName !== "undefined" && !W) {
						return V.getElementsByClassName(U[1])
					}
				}
			})()
		}
		function P(U, Z, Y, ad, aa, ac) {
			var ab = U == "previousSibling" && !ac;
			for ( var W = 0, V = ad.length; W < V; W++) {
				var T = ad[W];
				if (T) {
					if (ab && T.nodeType === 1) {
						T.sizcache = Y;
						T.sizset = W
					}
					T = T[U];
					var X = false;
					while (T) {
						if (T.sizcache === Y) {
							X = ad[T.sizset];
							break
						}
						if (T.nodeType === 1 && !ac) {
							T.sizcache = Y;
							T.sizset = W
						}
						if (T.nodeName === Z) {
							X = T;
							break
						}
						T = T[U]
					}
					ad[W] = X
				}
			}
		}
		function S(U, Z, Y, ad, aa, ac) {
			var ab = U == "previousSibling" && !ac;
			for ( var W = 0, V = ad.length; W < V; W++) {
				var T = ad[W];
				if (T) {
					if (ab && T.nodeType === 1) {
						T.sizcache = Y;
						T.sizset = W
					}
					T = T[U];
					var X = false;
					while (T) {
						if (T.sizcache === Y) {
							X = ad[T.sizset];
							break
						}
						if (T.nodeType === 1) {
							if (!ac) {
								T.sizcache = Y;
								T.sizset = W
							}
							if (typeof Z !== "string") {
								if (T === Z) {
									X = true;
									break
								}
							} else {
								if (F.filter(Z, [ T ]).length > 0) {
									X = T;
									break
								}
							}
						}
						T = T[U]
					}
					ad[W] = X
				}
			}
		}
		var K = document.compareDocumentPosition ? function(U, T) {
			return U.compareDocumentPosition(T) & 16
		} : function(U, T) {
			return U !== T && (U.contains ? U.contains(T) : true)
		};
		var Q = function(T) {
			return T.nodeType === 9 && T.documentElement.nodeName !== "HTML"
					|| !!T.ownerDocument && Q(T.ownerDocument)
		};
		var J = function(T, aa) {
			var W = [], X = "", Y, V = aa.nodeType ? [ aa ] : aa;
			while ((Y = I.match.PSEUDO.exec(T))) {
				X += Y[0];
				T = T.replace(I.match.PSEUDO, "")
			}
			T = I.relative[T] ? T + "*" : T;
			for ( var Z = 0, U = V.length; Z < U; Z++) {
				F(T, V[Z], W)
			}
			return F.filter(X, W)
		};
		o.find = F;
		o.filter = F.filter;
		o.expr = F.selectors;
		o.expr[":"] = o.expr.filters;
		F.selectors.filters.hidden = function(T) {
			return T.offsetWidth === 0 || T.offsetHeight === 0
		};
		F.selectors.filters.visible = function(T) {
			return T.offsetWidth > 0 || T.offsetHeight > 0
		};
		F.selectors.filters.animated = function(T) {
			return o.grep(o.timers, function(U) {
				return T === U.elem
			}).length
		};
		o.multiFilter = function(V, T, U) {
			if (U) {
				V = ":not(" + V + ")"
			}
			return F.matches(V, T)
		};
		o.dir = function(V, U) {
			var T = [], W = V[U];
			while (W && W != document) {
				if (W.nodeType == 1) {
					T.push(W)
				}
				W = W[U]
			}
			return T
		};
		o.nth = function(X, T, V, W) {
			T = T || 1;
			var U = 0;
			for (; X; X = X[V]) {
				if (X.nodeType == 1 && ++U == T) {
					break
				}
			}
			return X
		};
		o.sibling = function(V, U) {
			var T = [];
			for (; V; V = V.nextSibling) {
				if (V.nodeType == 1 && V != U) {
					T.push(V)
				}
			}
			return T
		};
		return;
		l.Sizzle = F
	})();
	o.event = {
		add : function(I, F, H, K) {
			if (I.nodeType == 3 || I.nodeType == 8) {
				return
			}
			if (I.setInterval && I != l) {
				I = l
			}
			if (!H.guid) {
				H.guid = this.guid++
			}
			if (K !== g) {
				var G = H;
				H = this.proxy(G);
				H.data = K
			}
			var E = o.data(I, "events") || o.data(I, "events", {}), J = o.data(
					I, "handle")
					|| o
							.data(
									I,
									"handle",
									function() {
										return typeof o !== "undefined"
												&& !o.event.triggered ? o.event.handle
												.apply(arguments.callee.elem,
														arguments)
												: g
									});
			J.elem = I;
			o
					.each(F.split(/\s+/),
							function(M, N) {
								var O = N.split(".");
								N = O.shift();
								H.type = O.slice().sort().join(".");
								var L = E[N];
								if (o.event.specialAll[N]) {
									o.event.specialAll[N].setup.call(I, K, O)
								}
								if (!L) {
									L = E[N] = {};
									if (!o.event.special[N]
											|| o.event.special[N].setup.call(I,
													K, O) === false) {
										if (I.addEventListener) {
											I.addEventListener(N, J, false)
										} else {
											if (I.attachEvent) {
												I.attachEvent("on" + N, J)
											}
										}
									}
								}
								L[H.guid] = H;
								o.event.global[N] = true
							});
			I = null
		},
		guid : 1,
		global : {},
		remove : function(K, H, J) {
			if (K.nodeType == 3 || K.nodeType == 8) {
				return
			}
			var G = o.data(K, "events"), F, E;
			if (G) {
				if (H === g || (typeof H === "string" && H.charAt(0) == ".")) {
					for ( var I in G) {
						this.remove(K, I + (H || ""))
					}
				} else {
					if (H.type) {
						J = H.handler;
						H = H.type
					}
					o.each(H.split(/\s+/), function(M, O) {
						var Q = O.split(".");
						O = Q.shift();
						var N = RegExp("(^|\\.)"
								+ Q.slice().sort().join(".*\\.") + "(\\.|$)");
						if (G[O]) {
							if (J) {
								delete G[O][J.guid]
							} else {
								for ( var P in G[O]) {
									if (N.test(G[O][P].type)) {
										delete G[O][P]
									}
								}
							}
							if (o.event.specialAll[O]) {
								o.event.specialAll[O].teardown.call(K, Q)
							}
							for (F in G[O]) {
								break
							}
							if (!F) {
								if (!o.event.special[O]
										|| o.event.special[O].teardown.call(K,
												Q) === false) {
									if (K.removeEventListener) {
										K.removeEventListener(O, o.data(K,
												"handle"), false)
									} else {
										if (K.detachEvent) {
											K.detachEvent("on" + O, o.data(K,
													"handle"))
										}
									}
								}
								F = null;
								delete G[O]
							}
						}
					})
				}
				for (F in G) {
					break
				}
				if (!F) {
					var L = o.data(K, "handle");
					if (L) {
						L.elem = null
					}
					o.removeData(K, "events");
					o.removeData(K, "handle")
				}
			}
		},
		trigger : function(I, K, H, E) {
			var G = I.type || I;
			if (!E) {
				I = typeof I === "object" ? I[h] ? I : o.extend(o.Event(G), I)
						: o.Event(G);
				if (G.indexOf("!") >= 0) {
					I.type = G = G.slice(0, -1);
					I.exclusive = true
				}
				if (!H) {
					I.stopPropagation();
					if (this.global[G]) {
						o.each(o.cache, function() {
							if (this.events && this.events[G]) {
								o.event.trigger(I, K, this.handle.elem)
							}
						})
					}
				}
				if (!H || H.nodeType == 3 || H.nodeType == 8) {
					return g
				}
				I.result = g;
				I.target = H;
				K = o.makeArray(K);
				K.unshift(I)
			}
			I.currentTarget = H;
			var J = o.data(H, "handle");
			if (J) {
				J.apply(H, K)
			}
			if ((!H[G] || (o.nodeName(H, "a") && G == "click")) && H["on" + G]
					&& H["on" + G].apply(H, K) === false) {
				I.result = false
			}
			if (!E && H[G] && !I.isDefaultPrevented()
					&& !(o.nodeName(H, "a") && G == "click")) {
				this.triggered = true;
				try {
					H[G]()
				} catch (L) {
				}
			}
			this.triggered = false;
			if (!I.isPropagationStopped()) {
				var F = H.parentNode || H.ownerDocument;
				if (F) {
					o.event.trigger(I, K, F, true)
				}
			}
		},
		handle : function(K) {
			var J, E;
			K = arguments[0] = o.event.fix(K || l.event);
			K.currentTarget = this;
			var L = K.type.split(".");
			K.type = L.shift();
			J = !L.length && !K.exclusive;
			var I = RegExp("(^|\\.)" + L.slice().sort().join(".*\\.")
					+ "(\\.|$)");
			E = (o.data(this, "events") || {})[K.type];
			for ( var G in E) {
				var H = E[G];
				if (J || I.test(H.type)) {
					K.handler = H;
					K.data = H.data;
					var F = H.apply(this, arguments);
					if (F !== g) {
						K.result = F;
						if (F === false) {
							K.preventDefault();
							K.stopPropagation()
						}
					}
					if (K.isImmediatePropagationStopped()) {
						break
					}
				}
			}
		},
		props : "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which"
				.split(" "),
		fix : function(H) {
			if (H[h]) {
				return H
			}
			var F = H;
			H = o.Event(F);
			for ( var G = this.props.length, J; G;) {
				J = this.props[--G];
				H[J] = F[J]
			}
			if (!H.target) {
				H.target = H.srcElement || document
			}
			if (H.target.nodeType == 3) {
				H.target = H.target.parentNode
			}
			if (!H.relatedTarget && H.fromElement) {
				H.relatedTarget = H.fromElement == H.target ? H.toElement
						: H.fromElement
			}
			if (H.pageX == null && H.clientX != null) {
				var I = document.documentElement, E = document.body;
				H.pageX = H.clientX
						+ (I && I.scrollLeft || E && E.scrollLeft || 0)
						- (I.clientLeft || 0);
				H.pageY = H.clientY
						+ (I && I.scrollTop || E && E.scrollTop || 0)
						- (I.clientTop || 0)
			}
			if (!H.which
					&& ((H.charCode || H.charCode === 0) ? H.charCode
							: H.keyCode)) {
				H.which = H.charCode || H.keyCode
			}
			if (!H.metaKey && H.ctrlKey) {
				H.metaKey = H.ctrlKey
			}
			if (!H.which && H.button) {
				H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3
						: (H.button & 4 ? 2 : 0)))
			}
			return H
		},
		proxy : function(F, E) {
			E = E || function() {
				return F.apply(this, arguments)
			};
			E.guid = F.guid = F.guid || E.guid || this.guid++;
			return E
		},
		special : {
			ready : {
				setup : B,
				teardown : function() {
				}
			}
		},
		specialAll : {
			live : {
				setup : function(E, F) {
					o.event.add(this, F[0], c)
				},
				teardown : function(G) {
					if (G.length) {
						var E = 0, F = RegExp("(^|\\.)" + G[0] + "(\\.|$)");
						o.each((o.data(this, "events").live || {}), function() {
							if (F.test(this.type)) {
								E++
							}
						});
						if (E < 1) {
							o.event.remove(this, G[0], c)
						}
					}
				}
			}
		}
	};
	o.Event = function(E) {
		if (!this.preventDefault) {
			return new o.Event(E)
		}
		if (E && E.type) {
			this.originalEvent = E;
			this.type = E.type
		} else {
			this.type = E
		}
		this.timeStamp = e();
		this[h] = true
	};
	function k() {
		return false
	}
	function u() {
		return true
	}
	o.Event.prototype = {
		preventDefault : function() {
			this.isDefaultPrevented = u;
			var E = this.originalEvent;
			if (!E) {
				return
			}
			if (E.preventDefault) {
				E.preventDefault()
			}
			E.returnValue = false
		},
		stopPropagation : function() {
			this.isPropagationStopped = u;
			var E = this.originalEvent;
			if (!E) {
				return
			}
			if (E.stopPropagation) {
				E.stopPropagation()
			}
			E.cancelBubble = true
		},
		stopImmediatePropagation : function() {
			this.isImmediatePropagationStopped = u;
			this.stopPropagation()
		},
		isDefaultPrevented : k,
		isPropagationStopped : k,
		isImmediatePropagationStopped : k
	};
	var a = function(F) {
		var E = F.relatedTarget;
		while (E && E != this) {
			try {
				E = E.parentNode
			} catch (G) {
				E = this
			}
		}
		if (E != this) {
			F.type = F.data;
			o.event.handle.apply(this, arguments)
		}
	};
	o.each( {
		mouseover : "mouseenter",
		mouseout : "mouseleave"
	}, function(F, E) {
		o.event.special[E] = {
			setup : function() {
				o.event.add(this, F, a, E)
			},
			teardown : function() {
				o.event.remove(this, F, a)
			}
		}
	});
	o.fn.extend( {
		bind : function(F, G, E) {
			return F == "unload" ? this.one(F, G, E) : this.each(function() {
				o.event.add(this, F, E || G, E && G)
			})
		},
		one : function(G, H, F) {
			var E = o.event.proxy(F || H, function(I) {
				o(this).unbind(I, E);
				return (F || H).apply(this, arguments)
			});
			return this.each(function() {
				o.event.add(this, G, E, F && H)
			})
		},
		unbind : function(F, E) {
			return this.each(function() {
				o.event.remove(this, F, E)
			})
		},
		trigger : function(E, F) {
			return this.each(function() {
				o.event.trigger(E, F, this)
			})
		},
		triggerHandler : function(E, G) {
			if (this[0]) {
				var F = o.Event(E);
				F.preventDefault();
				F.stopPropagation();
				o.event.trigger(F, G, this[0]);
				return F.result
			}
		},
		toggle : function(G) {
			var E = arguments, F = 1;
			while (F < E.length) {
				o.event.proxy(G, E[F++])
			}
			return this.click(o.event.proxy(G, function(H) {
				this.lastToggle = (this.lastToggle || 0) % F;
				H.preventDefault();
				return E[this.lastToggle++].apply(this, arguments) || false
			}))
		},
		hover : function(E, F) {
			return this.mouseenter(E).mouseleave(F)
		},
		ready : function(E) {
			B();
			if (o.isReady) {
				E.call(document, o)
			} else {
				o.readyList.push(E)
			}
			return this
		},
		live : function(G, F) {
			var E = o.event.proxy(F);
			E.guid += this.selector + G;
			o(document).bind(i(G, this.selector), this.selector, E);
			return this
		},
		die : function(F, E) {
			o(document).unbind(i(F, this.selector), E ? {
				guid : E.guid + this.selector + F
			} : null);
			return this
		}
	});
	function c(H) {
		var E = RegExp("(^|\\.)" + H.type + "(\\.|$)"), G = true, F = [];
		o.each(o.data(this, "events").live || [], function(I, J) {
			if (E.test(J.type)) {
				var K = o(H.target).closest(J.data)[0];
				if (K) {
					F.push( {
						elem : K,
						fn : J
					})
				}
			}
		});
		F.sort(function(J, I) {
			return o.data(J.elem, "closest") - o.data(I.elem, "closest")
		});
		o.each(F, function() {
			if (this.fn.call(this.elem, H, this.fn.data) === false) {
				return (G = false)
			}
		});
		return G
	}
	function i(F, E) {
		return [ "live", F, E.replace(/\./g, "`").replace(/ /g, "|") ]
				.join(".")
	}
	o.extend( {
		isReady : false,
		readyList : [],
		ready : function() {
			if (!o.isReady) {
				o.isReady = true;
				if (o.readyList) {
					o.each(o.readyList, function() {
						this.call(document, o)
					});
					o.readyList = null
				}
				o(document).triggerHandler("ready")
			}
		}
	});
	var x = false;
	function B() {
		if (x) {
			return
		}
		x = true;
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", function() {
				document.removeEventListener("DOMContentLoaded",
						arguments.callee, false);
				o.ready()
			}, false)
		} else {
			if (document.attachEvent) {
				document.attachEvent("onreadystatechange", function() {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange",
								arguments.callee);
						o.ready()
					}
				});
				if (document.documentElement.doScroll && l == l.top) {
					(function() {
						if (o.isReady) {
							return
						}
						try {
							document.documentElement.doScroll("left")
						} catch (E) {
							setTimeout(arguments.callee, 0);
							return
						}
						o.ready()
					})()
				}
			}
		}
		o.event.add(l, "load", o.ready)
	}
	o
			.each(
					("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error")
							.split(","), function(F, E) {
						o.fn[E] = function(G) {
							return G ? this.bind(E, G) : this.trigger(E)
						}
					});
	o(l).bind("unload", function() {
		for ( var E in o.cache) {
			if (E != 1 && o.cache[E].handle) {
				o.event.remove(o.cache[E].handle.elem)
			}
		}
	});
	(function() {
		o.support = {};
		var F = document.documentElement, G = document.createElement("script"), K = document
				.createElement("div"), J = "script" + (new Date).getTime();
		K.style.display = "none";
		K.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
		var H = K.getElementsByTagName("*"), E = K.getElementsByTagName("a")[0];
		if (!H || !H.length || !E) {
			return
		}
		o.support = {
			leadingWhitespace : K.firstChild.nodeType == 3,
			tbody : !K.getElementsByTagName("tbody").length,
			objectAll : !!K.getElementsByTagName("object")[0]
					.getElementsByTagName("*").length,
			htmlSerialize : !!K.getElementsByTagName("link").length,
			style : /red/.test(E.getAttribute("style")),
			hrefNormalized : E.getAttribute("href") === "/a",
			opacity : E.style.opacity === "0.5",
			cssFloat : !!E.style.cssFloat,
			scriptEval : false,
			noCloneEvent : true,
			boxModel : null
		};
		G.type = "text/javascript";
		try {
			G.appendChild(document.createTextNode("window." + J + "=1;"))
		} catch (I) {
		}
		F.insertBefore(G, F.firstChild);
		if (l[J]) {
			o.support.scriptEval = true;
			delete l[J]
		}
		F.removeChild(G);
		if (K.attachEvent && K.fireEvent) {
			K.attachEvent("onclick", function() {
				o.support.noCloneEvent = false;
				K.detachEvent("onclick", arguments.callee)
			});
			K.cloneNode(true).fireEvent("onclick")
		}
		o(function() {
			var L = document.createElement("div");
			L.style.width = L.style.paddingLeft = "1px";
			document.body.appendChild(L);
			o.boxModel = o.support.boxModel = L.offsetWidth === 2;
			document.body.removeChild(L).style.display = "none"
		})
	})();
	var w = o.support.cssFloat ? "cssFloat" : "styleFloat";
	o.props = {
		"for" : "htmlFor",
		"class" : "className",
		"float" : w,
		cssFloat : w,
		styleFloat : w,
		readonly : "readOnly",
		maxlength : "maxLength",
		cellspacing : "cellSpacing",
		rowspan : "rowSpan",
		tabindex : "tabIndex"
	};
	o.fn
			.extend( {
				_load : o.fn.load,
				load : function(G, J, K) {
					if (typeof G !== "string") {
						return this._load(G)
					}
					var I = G.indexOf(" ");
					if (I >= 0) {
						var E = G.slice(I, G.length);
						G = G.slice(0, I)
					}
					var H = "GET";
					if (J) {
						if (o.isFunction(J)) {
							K = J;
							J = null
						} else {
							if (typeof J === "object") {
								J = o.param(J);
								H = "POST"
							}
						}
					}
					var F = this;
					o
							.ajax( {
								url : G,
								type : H,
								dataType : "html",
								data : J,
								complete : function(M, L) {
									if (L == "success" || L == "notmodified") {
										F
												.html(E ? o("<div/>")
														.append(
																M.responseText
																		.replace(
																				/<script(.|\s)*?\/script>/g,
																				""))
														.find(E)
														: M.responseText)
									}
									if (K) {
										F.each(K, [ M.responseText, L, M ])
									}
								}
							});
					return this
				},
				serialize : function() {
					return o.param(this.serializeArray())
				},
				serializeArray : function() {
					return this
							.map(
									function() {
										return this.elements ? o
												.makeArray(this.elements)
												: this
									})
							.filter(
									function() {
										return this.name
												&& !this.disabled
												&& (this.checked
														|| /select|textarea/i
																.test(this.nodeName) || /text|hidden|password|search/i
														.test(this.type))
									}).map(
									function(E, F) {
										var G = o(this).val();
										return G == null ? null
												: o.isArray(G) ? o.map(G,
														function(I, H) {
															return {
																name : F.name,
																value : I
															}
														}) : {
													name : F.name,
													value : G
												}
									}).get()
				}
			});
	o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend"
			.split(","), function(E, F) {
		o.fn[F] = function(G) {
			return this.bind(F, G)
		}
	});
	var r = e();
	o
			.extend( {
				get : function(E, G, H, F) {
					if (o.isFunction(G)) {
						H = G;
						G = null
					}
					return o.ajax( {
						type : "GET",
						url : E,
						data : G,
						success : H,
						dataType : F
					})
				},
				getScript : function(E, F) {
					return o.get(E, null, F, "script")
				},
				getJSON : function(E, F, G) {
					return o.get(E, F, G, "json")
				},
				post : function(E, G, H, F) {
					if (o.isFunction(G)) {
						H = G;
						G = {}
					}
					return o.ajax( {
						type : "POST",
						url : E,
						data : G,
						success : H,
						dataType : F
					})
				},
				ajaxSetup : function(E) {
					o.extend(o.ajaxSettings, E)
				},
				ajaxSettings : {
					url : location.href,
					global : true,
					type : "GET",
					contentType : "application/x-www-form-urlencoded",
					processData : true,
					async : true,
					xhr : function() {
						return l.ActiveXObject ? new ActiveXObject(
								"Microsoft.XMLHTTP") : new XMLHttpRequest()
					},
					accepts : {
						xml : "application/xml, text/xml",
						html : "text/html",
						script : "text/javascript, application/javascript",
						json : "application/json, text/javascript",
						text : "text/plain",
						_default : "*/*"
					}
				},
				lastModified : {},
				ajax : function(M) {
					M = o
							.extend(true, M, o.extend(true, {}, o.ajaxSettings,
									M));
					var W, F = /=\?(&|$)/g, R, V, G = M.type.toUpperCase();
					if (M.data && M.processData && typeof M.data !== "string") {
						M.data = o.param(M.data)
					}
					if (M.dataType == "jsonp") {
						if (G == "GET") {
							if (!M.url.match(F)) {
								M.url += (M.url.match(/\?/) ? "&" : "?")
										+ (M.jsonp || "callback") + "=?"
							}
						} else {
							if (!M.data || !M.data.match(F)) {
								M.data = (M.data ? M.data + "&" : "")
										+ (M.jsonp || "callback") + "=?"
							}
						}
						M.dataType = "json"
					}
					if (M.dataType == "json"
							&& (M.data && M.data.match(F) || M.url.match(F))) {
						W = "jsonp" + r++;
						if (M.data) {
							M.data = (M.data + "").replace(F, "=" + W + "$1")
						}
						M.url = M.url.replace(F, "=" + W + "$1");
						M.dataType = "script";
						l[W] = function(X) {
							V = X;
							I();
							L();
							l[W] = g;
							try {
								delete l[W]
							} catch (Y) {
							}
							if (H) {
								H.removeChild(T)
							}
						}
					}
					if (M.dataType == "script" && M.cache == null) {
						M.cache = false
					}
					if (M.cache === false && G == "GET") {
						var E = e();
						var U = M.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + E
								+ "$2");
						M.url = U
								+ ((U == M.url) ? (M.url.match(/\?/) ? "&"
										: "?")
										+ "_=" + E : "")
					}
					if (M.data && G == "GET") {
						M.url += (M.url.match(/\?/) ? "&" : "?") + M.data;
						M.data = null
					}
					if (M.global && !o.active++) {
						o.event.trigger("ajaxStart")
					}
					var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
					if (M.dataType == "script"
							&& G == "GET"
							&& Q
							&& (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
						var H = document.getElementsByTagName("head")[0];
						var T = document.createElement("script");
						T.src = M.url;
						if (M.scriptCharset) {
							T.charset = M.scriptCharset
						}
						if (!W) {
							var O = false;
							T.onload = T.onreadystatechange = function() {
								if (!O
										&& (!this.readyState
												|| this.readyState == "loaded" || this.readyState == "complete")) {
									O = true;
									I();
									L();
									T.onload = T.onreadystatechange = null;
									H.removeChild(T)
								}
							}
						}
						H.appendChild(T);
						return g
					}
					var K = false;
					var J = M.xhr();
					if (M.username) {
						J.open(G, M.url, M.async, M.username, M.password)
					} else {
						J.open(G, M.url, M.async)
					}
					try {
						if (M.data) {
							J.setRequestHeader("Content-Type", M.contentType)
						}
						if (M.ifModified) {
							J.setRequestHeader("If-Modified-Since",
									o.lastModified[M.url]
											|| "Thu, 01 Jan 1970 00:00:00 GMT")
						}
						J
								.setRequestHeader("X-Requested-With",
										"XMLHttpRequest");
						J
								.setRequestHeader(
										"Accept",
										M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType]
												+ ", */*"
												: M.accepts._default)
					} catch (S) {
					}
					if (M.beforeSend && M.beforeSend(J, M) === false) {
						if (M.global && !--o.active) {
							o.event.trigger("ajaxStop")
						}
						J.abort();
						return false
					}
					if (M.global) {
						o.event.trigger("ajaxSend", [ J, M ])
					}
					var N = function(X) {
						if (J.readyState == 0) {
							if (P) {
								clearInterval(P);
								P = null;
								if (M.global && !--o.active) {
									o.event.trigger("ajaxStop")
								}
							}
						} else {
							if (!K && J
									&& (J.readyState == 4 || X == "timeout")) {
								K = true;
								if (P) {
									clearInterval(P);
									P = null
								}
								R = X == "timeout" ? "timeout"
										: !o.httpSuccess(J) ? "error"
												: M.ifModified
														&& o.httpNotModified(J,
																M.url) ? "notmodified"
														: "success";
								if (R == "success") {
									try {
										V = o.httpData(J, M.dataType, M)
									} catch (Z) {
										R = "parsererror"
									}
								}
								if (R == "success") {
									var Y;
									try {
										Y = J
												.getResponseHeader("Last-Modified")
									} catch (Z) {
									}
									if (M.ifModified && Y) {
										o.lastModified[M.url] = Y
									}
									if (!W) {
										I()
									}
								} else {
									o.handleError(M, J, R)
								}
								L();
								if (X) {
									J.abort()
								}
								if (M.async) {
									J = null
								}
							}
						}
					};
					if (M.async) {
						var P = setInterval(N, 13);
						if (M.timeout > 0) {
							setTimeout(function() {
								if (J && !K) {
									N("timeout")
								}
							}, M.timeout)
						}
					}
					try {
						J.send(M.data)
					} catch (S) {
						o.handleError(M, J, null, S)
					}
					if (!M.async) {
						N()
					}
					function I() {
						if (M.success) {
							M.success(V, R)
						}
						if (M.global) {
							o.event.trigger("ajaxSuccess", [ J, M ])
						}
					}
					function L() {
						if (M.complete) {
							M.complete(J, R)
						}
						if (M.global) {
							o.event.trigger("ajaxComplete", [ J, M ])
						}
						if (M.global && !--o.active) {
							o.event.trigger("ajaxStop")
						}
					}
					return J
				},
				handleError : function(F, H, E, G) {
					if (F.error) {
						F.error(H, E, G)
					}
					if (F.global) {
						o.event.trigger("ajaxError", [ H, F, G ])
					}
				},
				active : 0,
				httpSuccess : function(F) {
					try {
						return !F.status && location.protocol == "file:"
								|| (F.status >= 200 && F.status < 300)
								|| F.status == 304 || F.status == 1223
					} catch (E) {
					}
					return false
				},
				httpNotModified : function(G, E) {
					try {
						var H = G.getResponseHeader("Last-Modified");
						return G.status == 304 || H == o.lastModified[E]
					} catch (F) {
					}
					return false
				},
				httpData : function(J, H, G) {
					var F = J.getResponseHeader("content-type"), E = H == "xml"
							|| !H && F && F.indexOf("xml") >= 0, I = E ? J.responseXML
							: J.responseText;
					if (E && I.documentElement.tagName == "parsererror") {
						throw "parsererror"
					}
					if (G && G.dataFilter) {
						I = G.dataFilter(I, H)
					}
					if (typeof I === "string") {
						if (H == "script") {
							o.globalEval(I)
						}
						if (H == "json") {
							I = l["eval"]("(" + I + ")")
						}
					}
					return I
				},
				param : function(E) {
					var G = [];
					function H(I, J) {
						G[G.length] = encodeURIComponent(I) + "="
								+ encodeURIComponent(J)
					}
					if (o.isArray(E) || E.jquery) {
						o.each(E, function() {
							H(this.name, this.value)
						})
					} else {
						for ( var F in E) {
							if (o.isArray(E[F])) {
								o.each(E[F], function() {
									H(F, this)
								})
							} else {
								H(F, o.isFunction(E[F]) ? E[F]() : E[F])
							}
						}
					}
					return G.join("&").replace(/%20/g, "+")
				}
			});
	var m = {}, n, d = [
			[ "height", "marginTop", "marginBottom", "paddingTop",
					"paddingBottom" ],
			[ "width", "marginLeft", "marginRight", "paddingLeft",
					"paddingRight" ], [ "opacity" ] ];
	function t(F, E) {
		var G = {};
		o.each(d.concat.apply( [], d.slice(0, E)), function() {
			G[this] = F
		});
		return G
	}
	o.fn.extend( {
		show : function(J, L) {
			if (J) {
				return this.animate(t("show", 3), J, L)
			} else {
				for ( var H = 0, F = this.length; H < F; H++) {
					var E = o.data(this[H], "olddisplay");
					this[H].style.display = E || "";
					if (o.css(this[H], "display") === "none") {
						var G = this[H].tagName, K;
						if (m[G]) {
							K = m[G]
						} else {
							var I = o("<" + G + " />").appendTo("body");
							K = I.css("display");
							if (K === "none") {
								K = "block"
							}
							I.remove();
							m[G] = K
						}
						o.data(this[H], "olddisplay", K)
					}
				}
				for ( var H = 0, F = this.length; H < F; H++) {
					this[H].style.display = o.data(this[H], "olddisplay") || ""
				}
				return this
			}
		},
		hide : function(H, I) {
			if (H) {
				return this.animate(t("hide", 3), H, I)
			} else {
				for ( var G = 0, F = this.length; G < F; G++) {
					var E = o.data(this[G], "olddisplay");
					if (!E && E !== "none") {
						o
								.data(this[G], "olddisplay", o.css(this[G],
										"display"))
					}
				}
				for ( var G = 0, F = this.length; G < F; G++) {
					this[G].style.display = "none"
				}
				return this
			}
		},
		_toggle : o.fn.toggle,
		toggle : function(G, F) {
			var E = typeof G === "boolean";
			return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(
					this, arguments) : G == null || E ? this.each(function() {
				var H = E ? G : o(this).is(":hidden");
				o(this)[H ? "show" : "hide"]()
			}) : this.animate(t("toggle", 3), G, F)
		},
		fadeTo : function(E, G, F) {
			return this.animate( {
				opacity : G
			}, E, F)
		},
		animate : function(I, F, H, G) {
			var E = o.speed(F, H, G);
			return this[E.queue === false ? "each" : "queue"](function() {
				var K = o.extend( {}, E), M, L = this.nodeType == 1
						&& o(this).is(":hidden"), J = this;
				for (M in I) {
					if (I[M] == "hide" && L || I[M] == "show" && !L) {
						return K.complete.call(this)
					}
					if ((M == "height" || M == "width") && this.style) {
						K.display = o.css(this, "display");
						K.overflow = this.style.overflow
					}
				}
				if (K.overflow != null) {
					this.style.overflow = "hidden"
				}
				K.curAnim = o.extend( {}, I);
				o.each(I,
						function(O, S) {
							var R = new o.fx(J, K, O);
							if (/toggle|show|hide/.test(S)) {
								R[S == "toggle" ? L ? "show" : "hide" : S](I)
							} else {
								var Q = S.toString().match(
										/^([+-]=)?([\d+-.]+)(.*)$/), T = R
										.cur(true) || 0;
								if (Q) {
									var N = parseFloat(Q[2]), P = Q[3] || "px";
									if (P != "px") {
										J.style[O] = (N || 1) + P;
										T = ((N || 1) / R.cur(true)) * T;
										J.style[O] = T + P
									}
									if (Q[1]) {
										N = ((Q[1] == "-=" ? -1 : 1) * N) + T
									}
									R.custom(T, N, P)
								} else {
									R.custom(T, S, "")
								}
							}
						});
				return true
			})
		},
		stop : function(F, E) {
			var G = o.timers;
			if (F) {
				this.queue( [])
			}
			this.each(function() {
				for ( var H = G.length - 1; H >= 0; H--) {
					if (G[H].elem == this) {
						if (E) {
							G[H](true)
						}
						G.splice(H, 1)
					}
				}
			});
			if (!E) {
				this.dequeue()
			}
			return this
		}
	});
	o.each( {
		slideDown : t("show", 1),
		slideUp : t("hide", 1),
		slideToggle : t("toggle", 1),
		fadeIn : {
			opacity : "show"
		},
		fadeOut : {
			opacity : "hide"
		}
	}, function(E, F) {
		o.fn[E] = function(G, H) {
			return this.animate(F, G, H)
		}
	});
	o.extend( {
		speed : function(G, H, F) {
			var E = typeof G === "object" ? G : {
				complete : F || !F && H || o.isFunction(G) && G,
				duration : G,
				easing : F && H || H && !o.isFunction(H) && H
			};
			E.duration = o.fx.off ? 0
					: typeof E.duration === "number" ? E.duration
							: o.fx.speeds[E.duration] || o.fx.speeds._default;
			E.old = E.complete;
			E.complete = function() {
				if (E.queue !== false) {
					o(this).dequeue()
				}
				if (o.isFunction(E.old)) {
					E.old.call(this)
				}
			};
			return E
		},
		easing : {
			linear : function(G, H, E, F) {
				return E + F * G
			},
			swing : function(G, H, E, F) {
				return ((-Math.cos(G * Math.PI) / 2) + 0.5) * F + E
			}
		},
		timers : [],
		fx : function(F, E, G) {
			this.options = E;
			this.elem = F;
			this.prop = G;
			if (!E.orig) {
				E.orig = {}
			}
		}
	});
	o.fx.prototype = {
		update : function() {
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this)
			}
			(o.fx.step[this.prop] || o.fx.step._default)(this);
			if ((this.prop == "height" || this.prop == "width")
					&& this.elem.style) {
				this.elem.style.display = "block"
			}
		},
		cur : function(F) {
			if (this.elem[this.prop] != null
					&& (!this.elem.style || this.elem.style[this.prop] == null)) {
				return this.elem[this.prop]
			}
			var E = parseFloat(o.css(this.elem, this.prop, F));
			return E && E > -10000 ? E : parseFloat(o.curCSS(this.elem,
					this.prop)) || 0
		},
		custom : function(I, H, G) {
			this.startTime = e();
			this.start = I;
			this.end = H;
			this.unit = G || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			var E = this;
			function F(J) {
				return E.step(J)
			}
			F.elem = this.elem;
			if (F() && o.timers.push(F) && !n) {
				n = setInterval(function() {
					var K = o.timers;
					for ( var J = 0; J < K.length; J++) {
						if (!K[J]()) {
							K.splice(J--, 1)
						}
					}
					if (!K.length) {
						clearInterval(n);
						n = g
					}
				}, 13)
			}
		},
		show : function() {
			this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
			this.options.show = true;
			this.custom(this.prop == "width" || this.prop == "height" ? 1 : 0,
					this.cur());
			o(this.elem).show()
		},
		hide : function() {
			this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step : function(H) {
			var G = e();
			if (H || G >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				var E = true;
				for ( var F in this.options.curAnim) {
					if (this.options.curAnim[F] !== true) {
						E = false
					}
				}
				if (E) {
					if (this.options.display != null) {
						this.elem.style.overflow = this.options.overflow;
						this.elem.style.display = this.options.display;
						if (o.css(this.elem, "display") == "none") {
							this.elem.style.display = "block"
						}
					}
					if (this.options.hide) {
						o(this.elem).hide()
					}
					if (this.options.hide || this.options.show) {
						for ( var I in this.options.curAnim) {
							o.attr(this.elem.style, I, this.options.orig[I])
						}
					}
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				var J = G - this.startTime;
				this.state = J / this.options.duration;
				this.pos = o.easing[this.options.easing
						|| (o.easing.swing ? "swing" : "linear")](this.state,
						J, 0, 1, this.options.duration);
				this.now = this.start + ((this.end - this.start) * this.pos);
				this.update()
			}
			return true
		}
	};
	o.extend(o.fx, {
		speeds : {
			slow : 600,
			fast : 200,
			_default : 400
		},
		step : {
			opacity : function(E) {
				o.attr(E.elem.style, "opacity", E.now)
			},
			_default : function(E) {
				if (E.elem.style && E.elem.style[E.prop] != null) {
					E.elem.style[E.prop] = E.now + E.unit
				} else {
					E.elem[E.prop] = E.now
				}
			}
		}
	});
	if (document.documentElement.getBoundingClientRect) {
		o.fn.offset = function() {
			if (!this[0]) {
				return {
					top : 0,
					left : 0
				}
			}
			if (this[0] === this[0].ownerDocument.body) {
				return o.offset.bodyOffset(this[0])
			}
			var G = this[0].getBoundingClientRect(), J = this[0].ownerDocument, F = J.body, E = J.documentElement, L = E.clientTop
					|| F.clientTop || 0, K = E.clientLeft || F.clientLeft || 0, I = G.top
					+ (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop)
					- L, H = G.left
					+ (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft)
					- K;
			return {
				top : I,
				left : H
			}
		}
	} else {
		o.fn.offset = function() {
			if (!this[0]) {
				return {
					top : 0,
					left : 0
				}
			}
			if (this[0] === this[0].ownerDocument.body) {
				return o.offset.bodyOffset(this[0])
			}
			o.offset.initialized || o.offset.initialize();
			var J = this[0], G = J.offsetParent, F = J, O = J.ownerDocument, M, H = O.documentElement, K = O.body, L = O.defaultView, E = L
					.getComputedStyle(J, null), N = J.offsetTop, I = J.offsetLeft;
			while ((J = J.parentNode) && J !== K && J !== H) {
				M = L.getComputedStyle(J, null);
				N -= J.scrollTop, I -= J.scrollLeft;
				if (J === G) {
					N += J.offsetTop, I += J.offsetLeft;
					if (o.offset.doesNotAddBorder
							&& !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i
									.test(J.tagName))) {
						N += parseInt(M.borderTopWidth, 10) || 0,
								I += parseInt(M.borderLeftWidth, 10) || 0
					}
					F = G, G = J.offsetParent
				}
				if (o.offset.subtractsBorderForOverflowNotVisible
						&& M.overflow !== "visible") {
					N += parseInt(M.borderTopWidth, 10) || 0, I += parseInt(
							M.borderLeftWidth, 10) || 0
				}
				E = M
			}
			if (E.position === "relative" || E.position === "static") {
				N += K.offsetTop, I += K.offsetLeft
			}
			if (E.position === "fixed") {
				N += Math.max(H.scrollTop, K.scrollTop), I += Math.max(
						H.scrollLeft, K.scrollLeft)
			}
			return {
				top : N,
				left : I
			}
		}
	}
	o.offset = {
		initialize : function() {
			if (this.initialized) {
				return
			}
			var L = document.body, F = document.createElement("div"), H, G, N, I, M, E, J = L.style.marginTop, K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
			M = {
				position : "absolute",
				top : 0,
				left : 0,
				margin : 0,
				border : 0,
				width : "1px",
				height : "1px",
				visibility : "hidden"
			};
			for (E in M) {
				F.style[E] = M[E]
			}
			F.innerHTML = K;
			L.insertBefore(F, L.firstChild);
			H = F.firstChild, G = H.firstChild,
					I = H.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = (G.offsetTop !== 5);
			this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
			H.style.overflow = "hidden", H.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = (G.offsetTop === -5);
			L.style.marginTop = "1px";
			this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
			L.style.marginTop = J;
			L.removeChild(F);
			this.initialized = true
		},
		bodyOffset : function(E) {
			o.offset.initialized || o.offset.initialize();
			var G = E.offsetTop, F = E.offsetLeft;
			if (o.offset.doesNotIncludeMarginInBodyOffset) {
				G += parseInt(o.curCSS(E, "marginTop", true), 10) || 0,
						F += parseInt(o.curCSS(E, "marginLeft", true), 10) || 0
			}
			return {
				top : G,
				left : F
			}
		}
	};
	o.fn
			.extend( {
				position : function() {
					var I = 0, H = 0, F;
					if (this[0]) {
						var G = this.offsetParent(), J = this.offset(), E = /^body|html$/i
								.test(G[0].tagName) ? {
							top : 0,
							left : 0
						} : G.offset();
						J.top -= j(this, "marginTop");
						J.left -= j(this, "marginLeft");
						E.top += j(G, "borderTopWidth");
						E.left += j(G, "borderLeftWidth");
						F = {
							top : J.top - E.top,
							left : J.left - E.left
						}
					}
					return F
				},
				offsetParent : function() {
					var E = this[0].offsetParent || document.body;
					while (E
							&& (!/^body|html$/i.test(E.tagName) && o.css(E,
									"position") == "static")) {
						E = E.offsetParent
					}
					return o(E)
				}
			});
	o.each( [ "Left", "Top" ], function(F, E) {
		var G = "scroll" + E;
		o.fn[G] = function(H) {
			if (!this[0]) {
				return null
			}
			return H !== g ? this.each(function() {
				this == l || this == document ? l.scrollTo(!F ? H : o(l)
						.scrollLeft(), F ? H : o(l).scrollTop()) : this[G] = H
			}) : this[0] == l || this[0] == document ? self[F ? "pageYOffset"
					: "pageXOffset"]
					|| o.boxModel
					&& document.documentElement[G]
					|| document.body[G] : this[0][G]
		}
	});
	o.each( [ "Height", "Width" ], function(I, G) {
		var E = I ? "Left" : "Top", H = I ? "Right" : "Bottom", F = G
				.toLowerCase();
		o.fn["inner" + G] = function() {
			return this[0] ? o.css(this[0], F, false, "padding") : null
		};
		o.fn["outer" + G] = function(K) {
			return this[0] ? o.css(this[0], F, false, K ? "margin" : "border")
					: null
		};
		var J = G.toLowerCase();
		o.fn[J] = function(K) {
			return this[0] == l ? document.compatMode == "CSS1Compat"
					&& document.documentElement["client" + G]
					|| document.body["client" + G] : this[0] == document ? Math
					.max(document.documentElement["client" + G],
							document.body["scroll" + G],
							document.documentElement["scroll" + G],
							document.body["offset" + G],
							document.documentElement["offset" + G])
					: K === g ? (this.length ? o.css(this[0], J) : null) : this
							.css(J, typeof K === "string" ? K : K + "px")
		}
	})
})();
(function(b) {
	b.fn.bgIframe = b.fn.bgiframe = function(f) {
		if (b.browser.msie && parseInt(b.browser.version) <= 6) {
			f = b.extend( {
				top : "auto",
				left : "auto",
				width : "auto",
				height : "auto",
				opacity : true,
				src : "javascript:false;"
			}, f || {});
			var e = function(c) {
				return c && c.constructor == Number ? c + "px" : c
			}, a = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'
					+ f.src
					+ '"style="display:block;position:absolute;z-index:-1;'
					+ (f.opacity !== false ? "filter:Alpha(Opacity='0');" : "")
					+ "top:"
					+ (f.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')"
							: e(f.top))
					+ ";left:"
					+ (f.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')"
							: e(f.left))
					+ ";width:"
					+ (f.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')"
							: e(f.width))
					+ ";height:"
					+ (f.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')"
							: e(f.height)) + ';"/>';
			return this.each(function() {
				if (b("> iframe.bgiframe", this).length == 0) {
					this.insertBefore(document.createElement(a),
							this.firstChild)
				}
			})
		}
		return this
	};
	if (!b.browser.version) {
		b.browser.version = navigator.userAgent.toLowerCase().match(
				/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
	}
})(jQuery);
(function($) {
	$.extend( {
		metadata : {
			defaults : {
				type : "class",
				name : "metadata",
				cre : /({.*})/,
				single : "metadata"
			},
			setType : function(type, name) {
				this.defaults.type = type;
				this.defaults.name = name
			},
			get : function(elem, opts) {
				var settings = $.extend( {}, this.defaults, opts);
				if (!settings.single.length) {
					settings.single = "metadata"
				}
				var data = $.data(elem, settings.single);
				if (data) {
					return data
				}
				data = "{}";
				if (settings.type == "class") {
					var m = settings.cre.exec(elem.className);
					if (m) {
						data = m[1]
					}
				} else {
					if (settings.type == "elem") {
						if (!elem.getElementsByTagName) {
							return undefined
						}
						var e = elem.getElementsByTagName(settings.name);
						if (e.length) {
							data = $.trim(e[0].innerHTML)
						}
					} else {
						if (elem.getAttribute != undefined) {
							var attr = elem.getAttribute(settings.name);
							if (attr) {
								data = attr
							}
						}
					}
				}
				if (data.indexOf("{") < 0) {
					data = "{" + data + "}"
				}
				data = eval("(" + data + ")");
				$.data(elem, settings.single, data);
				return data
			}
		}
	});
	$.fn.metadata = function(opts) {
		return $.metadata.get(this[0], opts)
	}
})(jQuery);
(function(a) {
	a
			.extend(
					a.fn,
					{
						validate : function(b) {
							if (!this.length) {
								b
										&& b.debug
										&& window.console
										&& console
												.warn("nothing selected, can't validate, returning nothing");
								return
							}
							var c = a.data(this[0], "validator");
							if (c) {
								return c
							}
							c = new a.validator(b, this[0]);
							a.data(this[0], "validator", c);
							if (c.settings.onsubmit) {
								this.find("input, button").filter(".cancel")
										.click(function() {
											c.cancelSubmit = true
										});
								if (c.settings.submitHandler) {
									this.find("input, button")
											.filter(":submit").click(
													function() {
														c.submitButton = this
													})
								}
								this
										.submit(function(d) {
											if (c.settings.debug) {
												d.preventDefault()
											}
											function e() {
												if (c.settings.submitHandler) {
													if (c.submitButton) {
														var f = a(
																"<input type='hidden'/>")
																.attr(
																		"name",
																		c.submitButton.name)
																.val(
																		c.submitButton.value)
																.appendTo(
																		c.currentForm)
													}
													c.settings.submitHandler
															.call(
																	c,
																	c.currentForm);
													if (c.submitButton) {
														f.remove()
													}
													return false
												}
												return true
											}
											if (c.cancelSubmit) {
												c.cancelSubmit = false;
												return e()
											}
											if (c.form()) {
												if (c.pendingRequest) {
													c.formSubmitted = true;
													return false
												}
												return e()
											} else {
												c.focusInvalid();
												return false
											}
										})
							}
							return c
						},
						valid : function() {
							if (a(this[0]).is("form")) {
								return this.validate().form()
							} else {
								var c = true;
								var b = a(this[0].form).validate();
								this.each(function() {
									c &= b.element(this)
								});
								return c
							}
						},
						removeAttrs : function(d) {
							var b = {}, c = this;
							a.each(d.split(/\s/), function(e, f) {
								b[f] = c.attr(f);
								c.removeAttr(f)
							});
							return b
						},
						rules : function(e, b) {
							var g = this[0];
							if (e) {
								var d = a.data(g.form, "validator").settings;
								var i = d.rules;
								var j = a.validator.staticRules(g);
								switch (e) {
								case "add":
									a.extend(j, a.validator.normalizeRule(b));
									i[g.name] = j;
									if (b.messages) {
										d.messages[g.name] = a.extend(
												d.messages[g.name], b.messages)
									}
									break;
								case "remove":
									if (!b) {
										delete i[g.name];
										return j
									}
									var h = {};
									a.each(b.split(/\s/), function(k, l) {
										h[l] = j[l];
										delete j[l]
									});
									return h
								}
							}
							var f = a.validator.normalizeRules(a.extend( {},
									a.validator.metadataRules(g), a.validator
											.classRules(g), a.validator
											.attributeRules(g), a.validator
											.staticRules(g)), g);
							if (f.required) {
								var c = f.required;
								delete f.required;
								f = a.extend( {
									required : c
								}, f)
							}
							return f
						}
					});
	a.extend(a.expr[":"], {
		blank : function(b) {
			return !a.trim("" + b.value)
		},
		filled : function(b) {
			return !!a.trim("" + b.value)
		},
		unchecked : function(b) {
			return !b.checked
		}
	});
	a.validator = function(b, c) {
		this.settings = a.extend(true, {}, a.validator.defaults, b);
		this.currentForm = c;
		this.init()
	};
	a.validator.format = function(b, c) {
		if (arguments.length == 1) {
			return function() {
				var d = a.makeArray(arguments);
				d.unshift(b);
				return a.validator.format.apply(this, d)
			}
		}
		if (arguments.length > 2 && c.constructor != Array) {
			c = a.makeArray(arguments).slice(1)
		}
		if (c.constructor != Array) {
			c = [ c ]
		}
		a.each(c, function(d, e) {
			b = b.replace(new RegExp("\\{" + d + "\\}", "g"), e)
		});
		return b
	};
	a
			.extend(
					a.validator,
					{
						defaults : {
							messages : {},
							groups : {},
							rules : {},
							errorClass : "error",
							validClass : "valid",
							errorElement : "label",
							focusInvalid : true,
							errorContainer : a( []),
							errorLabelContainer : a( []),
							onsubmit : true,
							ignore : [],
							ignoreTitle : false,
							onfocusin : function(b) {
								this.lastActive = b;
								if (this.settings.focusCleanup
										&& !this.blockFocusCleanup) {
									this.settings.unhighlight
											&& this.settings.unhighlight.call(
													this, b,
													this.settings.errorClass,
													this.settings.validClass);
									this.errorsFor(b).hide()
								}
							},
							onfocusout : function(b) {
								if (!this.checkable(b)
										&& (b.name in this.submitted || !this
												.optional(b))) {
									this.element(b)
								}
							},
							onkeyup : function(b) {
								if (b.name in this.submitted
										|| b == this.lastElement) {
									this.element(b)
								}
							},
							onclick : function(b) {
								if (b.name in this.submitted) {
									this.element(b)
								} else {
									if (b.parentNode.name in this.submitted) {
										this.element(b.parentNode)
									}
								}
							},
							highlight : function(d, b, c) {
								a(d).addClass(b).removeClass(c)
							},
							unhighlight : function(d, b, c) {
								a(d).removeClass(b).addClass(c)
							}
						},
						setDefaults : function(b) {
							a.extend(a.validator.defaults, b)
						},
						messages : {
							required : "This field is required.",
							remote : "Please fix this field.",
							email : "Please enter a valid email address.",
							url : "Please enter a valid URL.",
							date : "Please enter a valid date.",
							dateISO : "Please enter a valid date (ISO).",
							number : "Please enter a valid number.",
							digits : "Please enter only digits.",
							creditcard : "Please enter a valid credit card number.",
							equalTo : "Please enter the same value again.",
							accept : "Please enter a value with a valid extension.",
							maxlength : a.validator
									.format("Please enter no more than {0} characters."),
							minlength : a.validator
									.format("Please enter at least {0} characters."),
							rangelength : a.validator
									.format("Please enter a value between {0} and {1} characters long."),
							range : a.validator
									.format("Please enter a value between {0} and {1}."),
							max : a.validator
									.format("Please enter a value less than or equal to {0}."),
							min : a.validator
									.format("Please enter a value greater than or equal to {0}.")
						},
						autoCreateRanges : false,
						prototype : {
							init : function() {
								this.labelContainer = a(this.settings.errorLabelContainer);
								this.errorContext = this.labelContainer.length
										&& this.labelContainer
										|| a(this.currentForm);
								this.containers = a(
										this.settings.errorContainer).add(
										this.settings.errorLabelContainer);
								this.submitted = {};
								this.valueCache = {};
								this.pendingRequest = 0;
								this.pending = {};
								this.invalid = {};
								this.reset();
								var b = (this.groups = {});
								a.each(this.settings.groups, function(e, f) {
									a.each(f.split(/\s/), function(h, g) {
										b[g] = e
									})
								});
								var d = this.settings.rules;
								a.each(d, function(e, f) {
									d[e] = a.validator.normalizeRule(f)
								});
								function c(g) {
									var f = a.data(this[0].form, "validator"), e = "on"
											+ g.type.replace(/^validate/, "");
									f.settings[e]
											&& f.settings[e].call(f, this[0])
								}
								a(this.currentForm)
										.validateDelegate(
												":text, :password, :file, select, textarea",
												"focusin focusout keyup", c)
										.validateDelegate(
												":radio, :checkbox, select, option",
												"click", c);
								if (this.settings.invalidHandler) {
									a(this.currentForm).bind(
											"invalid-form.validate",
											this.settings.invalidHandler)
								}
							},
							form : function() {
								this.checkForm();
								a.extend(this.submitted, this.errorMap);
								this.invalid = a.extend( {}, this.errorMap);
								if (!this.valid()) {
									a(this.currentForm).triggerHandler(
											"invalid-form", [ this ])
								}
								this.showErrors();
								return this.valid()
							},
							checkForm : function() {
								this.prepareForm();
								for ( var b = 0, c = (this.currentElements = this
										.elements()); c[b]; b++) {
									this.check(c[b])
								}
								return this.valid()
							},
							element : function(c) {
								c = this.clean(c);
								this.lastElement = c;
								this.prepareElement(c);
								this.currentElements = a(c);
								var b = this.check(c);
								if (b) {
									delete this.invalid[c.name]
								} else {
									this.invalid[c.name] = true
								}
								if (!this.numberOfInvalids()) {
									this.toHide = this.toHide
											.add(this.containers)
								}
								this.showErrors();
								return b
							},
							showErrors : function(c) {
								if (c) {
									a.extend(this.errorMap, c);
									this.errorList = [];
									for ( var b in c) {
										this.errorList.push( {
											message : c[b],
											element : this.findByName(b)[0]
										})
									}
									this.successList = a.grep(this.successList,
											function(d) {
												return !(d.name in c)
											})
								}
								this.settings.showErrors ? this.settings.showErrors
										.call(this, this.errorMap,
												this.errorList)
										: this.defaultShowErrors()
							},
							resetForm : function() {
								if (a.fn.resetForm) {
									a(this.currentForm).resetForm()
								}
								this.submitted = {};
								this.prepareForm();
								this.hideErrors();
								this.elements().removeClass(
										this.settings.errorClass)
							},
							numberOfInvalids : function() {
								return this.objectLength(this.invalid)
							},
							objectLength : function(d) {
								var c = 0;
								for ( var b in d) {
									c++
								}
								return c
							},
							hideErrors : function() {
								this.addWrapper(this.toHide).hide()
							},
							valid : function() {
								return this.size() == 0
							},
							size : function() {
								return this.errorList.length
							},
							focusInvalid : function() {
								if (this.settings.focusInvalid) {
									try {
										a(
												this.findLastActive()
														|| this.errorList.length
														&& this.errorList[0].element
														|| []).filter(
												":visible").focus().trigger(
												"focusin")
									} catch (b) {
									}
								}
							},
							findLastActive : function() {
								var b = this.lastActive;
								return b && a.grep(this.errorList, function(c) {
									return c.element.name == b.name
								}).length == 1 && b
							},
							elements : function() {
								var c = this, b = {};
								return a( [])
										.add(this.currentForm.elements)
										.filter(":input")
										.not(
												":submit, :reset, :image, [disabled]")
										.not(this.settings.ignore)
										.filter(
												function() {
													!this.name
															&& c.settings.debug
															&& window.console
															&& console
																	.error(
																			"%o has no name assigned",
																			this);
													if (this.name in b
															|| !c
																	.objectLength(a(
																			this)
																			.rules())) {
														return false
													}
													b[this.name] = true;
													return true
												})
							},
							clean : function(b) {
								return a(b)[0]
							},
							errors : function() {
								return a(this.settings.errorElement + "."
										+ this.settings.errorClass,
										this.errorContext)
							},
							reset : function() {
								this.successList = [];
								this.errorList = [];
								this.errorMap = {};
								this.toShow = a( []);
								this.toHide = a( []);
								this.currentElements = a( [])
							},
							prepareForm : function() {
								this.reset();
								this.toHide = this.errors()
										.add(this.containers)
							},
							prepareElement : function(b) {
								this.reset();
								this.toHide = this.errorsFor(b)
							},
							check : function(c) {
								c = this.clean(c);
								if (this.checkable(c)) {
									c = this.findByName(c.name)[0]
								}
								var h = a(c).rules();
								var d = false;
								for (method in h) {
									var g = {
										method : method,
										parameters : h[method]
									};
									try {
										var b = a.validator.methods[method]
												.call(this, c.value.replace(
														/\r/g, ""), c,
														g.parameters);
										if (b == "dependency-mismatch") {
											d = true;
											continue
										}
										d = false;
										if (b == "pending") {
											this.toHide = this.toHide.not(this
													.errorsFor(c));
											return
										}
										if (!b) {
											this.formatAndAdd(c, g);
											return false
										}
									} catch (f) {
										this.settings.debug
												&& window.console
												&& console
														.log(
																"exception occured when checking element "
																		+ c.id
																		+ ", check the '"
																		+ g.method
																		+ "' method",
																f);
										throw f
									}
								}
								if (d) {
									return
								}
								if (this.objectLength(h)) {
									this.successList.push(c)
								}
								return true
							},
							customMetaMessage : function(b, d) {
								if (!a.metadata) {
									return
								}
								var c = this.settings.meta ? a(b).metadata()[this.settings.meta]
										: a(b).metadata();
								return c && c.messages && c.messages[d]
							},
							customMessage : function(c, d) {
								var b = this.settings.messages[c];
								return b
										&& (b.constructor == String ? b : b[d])
							},
							findDefined : function() {
								for ( var b = 0; b < arguments.length; b++) {
									if (arguments[b] !== undefined) {
										return arguments[b]
									}
								}
								return undefined
							},
							defaultMessage : function(b, c) {
								return this.findDefined(this.customMessage(
										b.name, c), this
										.customMetaMessage(b, c),
										!this.settings.ignoreTitle && b.title
												|| undefined,
										a.validator.messages[c],
										"<strong>Warning: No message defined for "
												+ b.name + "</strong>")
							},
							formatAndAdd : function(c, e) {
								var d = this.defaultMessage(c, e.method), b = /\$?\{(\d+)\}/g;
								if (typeof d == "function") {
									d = d.call(this, e.parameters, c)
								} else {
									if (b.test(d)) {
										d = jQuery.format(d.replace(b, "{$1}"),
												e.parameters)
									}
								}
								this.errorList.push( {
									message : d,
									element : c
								});
								this.errorMap[c.name] = d;
								this.submitted[c.name] = d
							},
							addWrapper : function(b) {
								if (this.settings.wrapper) {
									b = b.add(b.parent(this.settings.wrapper))
								}
								return b
							},
							defaultShowErrors : function() {
								for ( var c = 0; this.errorList[c]; c++) {
									var b = this.errorList[c];
									this.settings.highlight
											&& this.settings.highlight.call(
													this, b.element,
													this.settings.errorClass,
													this.settings.validClass);
									this.showLabel(b.element, b.message)
								}
								if (this.errorList.length) {
									this.toShow = this.toShow
											.add(this.containers)
								}
								if (this.settings.success) {
									for ( var c = 0; this.successList[c]; c++) {
										this.showLabel(this.successList[c])
									}
								}
								if (this.settings.unhighlight) {
									for ( var c = 0, d = this.validElements(); d[c]; c++) {
										this.settings.unhighlight.call(this,
												d[c], this.settings.errorClass,
												this.settings.validClass)
									}
								}
								this.toHide = this.toHide.not(this.toShow);
								this.hideErrors();
								this.addWrapper(this.toShow).show()
							},
							validElements : function() {
								return this.currentElements.not(this
										.invalidElements())
							},
							invalidElements : function() {
								return a(this.errorList).map(function() {
									return this.element
								})
							},
							showLabel : function(c, d) {
								var b = this.errorsFor(c);
								if (b.length) {
									b.removeClass().addClass(
											this.settings.errorClass);
									b.attr("generated") && b.html(d)
								} else {
									b = a(
											"<" + this.settings.errorElement
													+ "/>").attr( {
										"for" : this.idOrName(c),
										generated : true
									}).addClass(this.settings.errorClass).html(
											d || "");
									if (this.settings.wrapper) {
										b = b.hide().show().wrap(
												"<" + this.settings.wrapper
														+ "/>").parent()
									}
									if (!this.labelContainer.append(b).length) {
										this.settings.errorPlacement ? this.settings
												.errorPlacement(b, a(c))
												: b.insertAfter(c)
									}
								}
								if (!d && this.settings.success) {
									b.text("");
									typeof this.settings.success == "string" ? b
											.addClass(this.settings.success)
											: this.settings.success(b)
								}
								this.toShow = this.toShow.add(b)
							},
							errorsFor : function(c) {
								var b = this.idOrName(c);
								return this.errors().filter(function() {
									return a(this).attr("for") == b
								})
							},
							idOrName : function(b) {
								return this.groups[b.name]
										|| (this.checkable(b) ? b.name : b.id
												|| b.name)
							},
							checkable : function(b) {
								return /radio|checkbox/i.test(b.type)
							},
							findByName : function(b) {
								var c = this.currentForm;
								return a(document.getElementsByName(b)).map(
										function(d, e) {
											return e.form == c && e.name == b
													&& e || null
										})
							},
							getLength : function(c, b) {
								switch (b.nodeName.toLowerCase()) {
								case "select":
									return a("option:selected", b).length;
								case "input":
									if (this.checkable(b)) {
										return this.findByName(b.name).filter(
												":checked").length
									}
								}
								return c.length
							},
							depend : function(c, b) {
								return this.dependTypes[typeof c] ? this.dependTypes[typeof c]
										(c, b)
										: true
							},
							dependTypes : {
								"boolean" : function(c, b) {
									return c
								},
								string : function(c, b) {
									return !!a(c, b.form).length
								},
								"function" : function(c, b) {
									return c(b)
								}
							},
							optional : function(b) {
								return !a.validator.methods.required.call(this,
										a.trim(b.value), b)
										&& "dependency-mismatch"
							},
							startRequest : function(b) {
								if (!this.pending[b.name]) {
									this.pendingRequest++;
									this.pending[b.name] = true
								}
							},
							stopRequest : function(b, c) {
								this.pendingRequest--;
								if (this.pendingRequest < 0) {
									this.pendingRequest = 0
								}
								delete this.pending[b.name];
								if (c && this.pendingRequest == 0
										&& this.formSubmitted && this.form()) {
									a(this.currentForm).submit();
									this.formSubmitted = false
								} else {
									if (!c && this.pendingRequest == 0
											&& this.formSubmitted) {
										a(this.currentForm).triggerHandler(
												"invalid-form", [ this ]);
										this.formSubmitted = false
									}
								}
							},
							previousValue : function(b) {
								return a.data(b, "previousValue")
										|| a.data(b, "previousValue", {
											old : null,
											valid : true,
											message : this.defaultMessage(b,
													"remote")
										})
							}
						},
						classRuleSettings : {
							required : {
								required : true
							},
							email : {
								email : true
							},
							url : {
								url : true
							},
							date : {
								date : true
							},
							dateISO : {
								dateISO : true
							},
							dateDE : {
								dateDE : true
							},
							number : {
								number : true
							},
							numberDE : {
								numberDE : true
							},
							digits : {
								digits : true
							},
							creditcard : {
								creditcard : true
							}
						},
						addClassRules : function(b, c) {
							b.constructor == String ? this.classRuleSettings[b] = c
									: a.extend(this.classRuleSettings, b)
						},
						classRules : function(c) {
							var d = {};
							var b = a(c).attr("class");
							b
									&& a
											.each(
													b.split(" "),
													function() {
														if (this in a.validator.classRuleSettings) {
															a
																	.extend(
																			d,
																			a.validator.classRuleSettings[this])
														}
													});
							return d
						},
						attributeRules : function(c) {
							var e = {};
							var b = a(c);
							for (method in a.validator.methods) {
								var d = b.attr(method);
								if (d) {
									e[method] = d
								}
							}
							if (e.maxlength
									&& /-1|2147483647|524288/.test(e.maxlength)) {
								delete e.maxlength
							}
							return e
						},
						metadataRules : function(b) {
							if (!a.metadata) {
								return {}
							}
							var c = a.data(b.form, "validator").settings.meta;
							return c ? a(b).metadata()[c] : a(b).metadata()
						},
						staticRules : function(c) {
							var d = {};
							var b = a.data(c.form, "validator");
							if (b.settings.rules) {
								d = a.validator
										.normalizeRule(b.settings.rules[c.name])
										|| {}
							}
							return d
						},
						normalizeRules : function(c, b) {
							a.each(c, function(f, e) {
								if (e === false) {
									delete c[f];
									return
								}
								if (e.param || e.depends) {
									var d = true;
									switch (typeof e.depends) {
									case "string":
										d = !!a(e.depends, b.form).length;
										break;
									case "function":
										d = e.depends.call(b, b);
										break
									}
									if (d) {
										c[f] = e.param !== undefined ? e.param
												: true
									} else {
										delete c[f]
									}
								}
							});
							a.each(c, function(d, e) {
								c[d] = a.isFunction(e) ? e(b) : e
							});
							a.each( [ "minlength", "maxlength", "min", "max" ],
									function() {
										if (c[this]) {
											c[this] = Number(c[this])
										}
									});
							a.each( [ "rangelength", "range" ], function() {
								if (c[this]) {
									c[this] = [ Number(c[this][0]),
											Number(c[this][1]) ]
								}
							});
							if (a.validator.autoCreateRanges) {
								if (c.min && c.max) {
									c.range = [ c.min, c.max ];
									delete c.min;
									delete c.max
								}
								if (c.minlength && c.maxlength) {
									c.rangelength = [ c.minlength, c.maxlength ];
									delete c.minlength;
									delete c.maxlength
								}
							}
							if (c.messages) {
								delete c.messages
							}
							return c
						},
						normalizeRule : function(c) {
							if (typeof c == "string") {
								var b = {};
								a.each(c.split(/\s/), function() {
									b[this] = true
								});
								c = b
							}
							return c
						},
						addMethod : function(b, d, c) {
							a.validator.methods[b] = d;
							a.validator.messages[b] = c != undefined ? c
									: a.validator.messages[b];
							if (d.length < 3) {
								a.validator.addClassRules(b, a.validator
										.normalizeRule(b))
							}
						},
						methods : {
							required : function(c, b, e) {
								if (!this.depend(e, b)) {
									return "dependency-mismatch"
								}
								switch (b.nodeName.toLowerCase()) {
								case "select":
									var d = a(b).val();
									return d && d.length > 0;
								case "input":
									if (this.checkable(b)) {
										return this.getLength(c, b) > 0
									}
								default:
									return a.trim(c).length > 0
								}
							},
							remote : function(f, c, g) {
								if (this.optional(c)) {
									return "dependency-mismatch"
								}
								var d = this.previousValue(c);
								if (!this.settings.messages[c.name]) {
									this.settings.messages[c.name] = {}
								}
								d.originalMessage = this.settings.messages[c.name].remote;
								this.settings.messages[c.name].remote = d.message;
								g = typeof g == "string" && {
									url : g
								} || g;
								if (d.old !== f) {
									d.old = f;
									var b = this;
									this.startRequest(c);
									var e = {};
									e[c.name] = f;
									a
											.ajax(a
													.extend(
															true,
															{
																url : g,
																mode : "abort",
																port : "validate"
																		+ c.name,
																dataType : "json",
																data : e,
																success : function(
																		i) {
																	b.settings.messages[c.name].remote = d.originalMessage;
																	var k = i === true;
																	if (k) {
																		var h = b.formSubmitted;
																		b
																				.prepareElement(c);
																		b.formSubmitted = h;
																		b.successList
																				.push(c);
																		b
																				.showErrors()
																	} else {
																		var l = {};
																		var j = (d.message = i
																				|| b
																						.defaultMessage(
																								c,
																								"remote"));
																		l[c.name] = a
																				.isFunction(j) ? j(f)
																				: j;
																		b
																				.showErrors(l)
																	}
																	d.valid = k;
																	b
																			.stopRequest(
																					c,
																					k)
																}
															}, g));
									return "pending"
								} else {
									if (this.pending[c.name]) {
										return "pending"
									}
								}
								return d.valid
							},
							minlength : function(c, b, d) {
								return this.optional(b)
										|| this.getLength(a.trim(c), b) >= d
							},
							maxlength : function(c, b, d) {
								return this.optional(b)
										|| this.getLength(a.trim(c), b) <= d
							},
							rangelength : function(d, b, e) {
								var c = this.getLength(a.trim(d), b);
								return this.optional(b)
										|| (c >= e[0] && c <= e[1])
							},
							min : function(c, b, d) {
								return this.optional(b) || c >= d
							},
							max : function(c, b, d) {
								return this.optional(b) || c <= d
							},
							range : function(c, b, d) {
								return this.optional(b)
										|| (c >= d[0] && c <= d[1])
							},
							email : function(c, b) {
								return this.optional(b)
										|| /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
												.test(c)
							},
							url : function(c, b) {
								return this.optional(b)
										|| /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
												.test(c)
							},
							date : function(c, b) {
								return this.optional(b)
										|| !/Invalid|NaN/.test(new Date(c))
							},
							dateISO : function(c, b) {
								return this.optional(b)
										|| /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/
												.test(c)
							},
							number : function(c, b) {
								return this.optional(b)
										|| /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/
												.test(c)
							},
							digits : function(c, b) {
								return this.optional(b) || /^\d+$/.test(c)
							},
							creditcard : function(f, c) {
								if (this.optional(c)) {
									return "dependency-mismatch"
								}
								if (/[^0-9-]+/.test(f)) {
									return false
								}
								var g = 0, e = 0, b = false;
								f = f.replace(/\D/g, "");
								for ( var h = f.length - 1; h >= 0; h--) {
									var d = f.charAt(h);
									var e = parseInt(d, 10);
									if (b) {
										if ((e *= 2) > 9) {
											e -= 9
										}
									}
									g += e;
									b = !b
								}
								return (g % 10) == 0
							},
							accept : function(c, b, d) {
								d = typeof d == "string" ? d.replace(/,/g, "|")
										: "png|jpe?g|gif";
								return this.optional(b)
										|| c.match(new RegExp(".(" + d + ")$",
												"i"))
							},
							equalTo : function(c, b, e) {
								var d = a(e).unbind(".validate-equalTo").bind(
										"blur.validate-equalTo", function() {
											a(b).valid()
										});
								return c == d.val()
							}
						}
					});
	a.format = a.validator.format
})(jQuery);
(function(c) {
	var b = c.ajax;
	var a = {};
	c.ajax = function(e) {
		e = c.extend(e, c.extend( {}, c.ajaxSettings, e));
		var d = e.port;
		if (e.mode == "abort") {
			if (a[d]) {
				a[d].abort()
			}
			return (a[d] = b.apply(this, arguments))
		}
		return b.apply(this, arguments)
	}
})(jQuery);
(function(a) {
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout
			&& document.addEventListener) {
		a.each( {
			focus : "focusin",
			blur : "focusout"
		}, function(c, b) {
			a.event.special[b] = {
				setup : function() {
					this.addEventListener(c, d, true)
				},
				teardown : function() {
					this.removeEventListener(c, d, true)
				},
				handler : function(f) {
					arguments[0] = a.event.fix(f);
					arguments[0].type = b;
					return a.event.handle.apply(this, arguments)
				}
			};
			function d(f) {
				f = a.event.fix(f);
				f.type = b;
				return a.event.handle.call(this, f)
			}
		})
	}
	a.extend(a.fn, {
		validateDelegate : function(d, c, b) {
			return this.bind(c, function(e) {
				var f = a(e.target);
				if (f.is(d)) {
					return b.apply(f, arguments)
				}
			})
		}
	})
})(jQuery);
jQuery
		.extend(
				jQuery.validator.defaults,
				{
					showErrors : function() {
						if (!jQuery(this.currentForm).hasClass("notTipError")) {
							for ( var c = 0; this.errorList[c]; c++) {
								var b = this.errorList[c];
								this.settings.highlight
										&& this.settings.highlight.call(this,
												b.element,
												this.settings.errorClass,
												this.settings.validClass);
								var a = jQuery(b.element).attr("verrormsg",
										b.message);
								var d = -10, f = 20;
								a
										.unbind()
										.hover(
												function(h) {
													this.top = (h.pageY + f);
													this.left = (h.pageX + d);
													var g = this
															.getAttribute("verrormsg");
													if (g && g != "") {
														jQuery("body")
																.append(
																		'<p id="validateTip">'
																				+ this
																						.getAttribute("verrormsg")
																				+ "</p>");
														jQuery("p#validateTip")
																.css(
																		"top",
																		this.top
																				+ "px")
																.css(
																		"left",
																		this.left
																				+ "px")
																.css("z-index",
																		9999)
																.fadeIn("slow")
													}
												},
												function() {
													jQuery("p#validateTip")
															.fadeOut("slow")
															.remove()
												})
										.mousemove(
												function(g) {
													this.top = (g.pageY + f);
													this.left = (g.pageX + d);
													jQuery("p#validateTip")
															.css(
																	"top",
																	this.top
																			+ "px")
															.css(
																	"left",
																	this.left
																			+ "px")
												})
							}
							if (this.settings.unhighlight) {
								for ( var c = 0, e = this.validElements(); e[c]; c++) {
									jQuery("p#validateTip").fadeOut("slow")
											.remove();
									this.settings.unhighlight.call(this, e[c],
											this.settings.errorClass,
											this.settings.validClass);
									jQuery(e[c]).unbind()
								}
							}
						} else {
							this.defaultShowErrors()
						}
					}
				});
jQuery.extend(jQuery.validator.prototype,
		{
			testDay : function(d) {
				if (!/^\d{4}(\-)?\d{1,2}(\-)?\d{1,2}/.test(d)) {
					return false
				}
				var f = d.replace(/\-/g, "");
				var c = parseInt(f.substr(0, 4), 10), e = parseInt(f.substr(4,
						2), 10) - 1, a = parseInt(f.substr(6, 2), 10);
				var b = new Date(c, e, a);
				return (b.getFullYear() == c && b.getMonth() == e && b
						.getDate() == a)
			},
			testIdCard : function(g) {
				if (/^\d{17}(\d|X|Y)$/.test(g) || /^\d{14}[12]$/.test(g)) {
					var e = parseInt(g.substr(0, 2));
					if (e > 11 && e < 91) {
						var h = g.length == 18 ? g : g.substr(0, 6) + "19"
								+ g.substr(6, 15);
						var f = h.substr(6, 8);
						if (this.testDay(f)) {
							if (g.length == 18) {
								var j = new Array("7", "9", "10", "5", "8",
										"4", "2", "1", "6", "3", "7", "9",
										"10", "5", "8", "4", "2");
								var b = new Array("1", "0", "X", "9", "8", "7",
										"6", "5", "4", "3", "2");
								var a = 0;
								for ( var c = 0; c < 17; c++) {
									a += parseInt(g.charAt(c)) * parseInt(j[c])
								}
								var d = parseInt(a) % 11;
								if (b[d] == g.substr(17)) {
									return true
								}
							} else {
								return true
							}
						}
					}
				}
				return false
			}
		});
jQuery.validator.addMethod("day", function(b, a) {
	return this.optional(a) || this.testDay(b)
}, "请输入正确格式的日期");
jQuery.validator.addMethod("idcard", function(b, a) {
	return this.optional(a) || this.testIdCard(b)
}, "请输入正确的身份证号码");
jQuery.validator.addMethod("normalinput", function(b, a) {
	return this.optional(a) || /^[\u0391-\uFFE5\w]+$/.test(b)
}, "只能输入中文、英文字母、数字和下划线");
jQuery.validator.addMethod("mobile", function(c, a) {
	var b = c.length;
	return this.optional(a) || (b == 11 && /^1[358]\d{9}$/.test(c))
}, "请输入正确的手机号码");
jQuery.validator.addMethod("telephone", function(c, b) {
	var a = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
	return this.optional(b) || (a.test(c))
}, "请输入正确的电话号码");
jQuery.validator.addMethod("postcode", function(c, b) {
	var a = /^[1-9]\d{5}$/;
	return this.optional(b) || (a.test(c))
}, "请正确填写您的邮政编码");
jQuery.validator.addMethod("ip", function(b, a) {
	return this.optional(a)
	|| (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(b) && (RegExp.$1 < 256
			&& RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256))
}, "请输入正确的IP地址");
jQuery.validator.addMethod("numandalpha", function(b, a) {
	return this.optional(a)
			|| ((/^[0-9A-Za-z]+$/.test(b)) && (/[0-9]{1,1}/.test(b))&&(/[A-Za-z]{1,1}/.test(b)))
}, "密码必须为数字和字母的组合");
jQuery.extend(jQuery.validator.messages, {
	required : "必选字段",
	remote : "请修正该字段",
	email : "请输入正确格式的电子邮件",
	url : "请输入合法的网址",
	date : "请输入合法的日期",
	dateISO : "请输入合法的日期 (ISO).",
	number : "请输入合法的数字",
	digits : "只能输入整数",
	creditcard : "请输入合法的信用卡号",
	equalTo : "请再次输入相同的值",
	accept : "请输入拥有合法后缀名的字符串",
	maxlength : jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
	minlength : jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
	rangelength : jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
	range : jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	max : jQuery.validator.format("请输入一个最大为 {0} 的值"),
	min : jQuery.validator.format("请输入一个最小为 {0} 的值")
});
(function(a) {
	a.jGrowl = function(b, c) {
		if (a("#jGrowl").size() == 0) {
			a('<div id="jGrowl"></div>').addClass(a.jGrowl.defaults.position)
					.appendTo("body")
		}
		a("#jGrowl").jGrowl(b, c)
	};
	a.fn.jGrowl = function(b, d) {
		if (a.isFunction(this.each)) {
			var c = arguments;
			return this.each(function() {
				var e = this;
				if (a(this).data("jGrowl.instance") == undefined) {
					a(this).data("jGrowl.instance",
							a.extend(new a.fn.jGrowl(), {
								notifications : [],
								element : null,
								interval : null
							}));
					a(this).data("jGrowl.instance").startup(this)
				}
				if (a.isFunction(a(this).data("jGrowl.instance")[b])) {
					a(this).data("jGrowl.instance")[b].apply(a(this).data(
							"jGrowl.instance"), a.makeArray(c).slice(1))
				} else {
					a(this).data("jGrowl.instance").create(b, d)
				}
			})
		}
	};
	a
			.extend(
					a.fn.jGrowl.prototype,
					{
						defaults : {
							pool : 0,
							header : "",
							group : "",
							sticky : false,
							position : "top-right",
							glue : "after",
							theme : "default",
							corners : "10px",
							check : 250,
							life : 3000,
							speed : "normal",
							easing : "swing",
							closer : true,
							closeTemplate : "&times;",
							closerTemplate : "<div>[ close all ]</div>",
							log : function(c, b, d) {
							},
							beforeOpen : function(c, b, d) {
							},
							open : function(c, b, d) {
							},
							beforeClose : function(c, b, d) {
							},
							close : function(c, b, d) {
							},
							animateOpen : {
								opacity : "show"
							},
							animateClose : {
								opacity : "hide"
							}
						},
						notifications : [],
						element : null,
						interval : null,
						create : function(b, c) {
							var c = a.extend( {}, this.defaults, c);
							this.notifications.push( {
								message : b,
								options : c
							});
							c.log.apply(this.element, [ this.element, b, c ])
						},
						render : function(d) {
							var b = this;
							var c = d.message;
							var e = d.options;
							var d = a(
									'<div class="jGrowl-notification ui-state-highlight ui-corner-all'
											+ ((e.group != undefined && e.group != "") ? " "
													+ e.group
													: "")
											+ '"><div class="close">'
											+ e.closeTemplate
											+ '</div><div class="header">'
											+ e.header
											+ '</div><div class="message">' + c
											+ "</div></div>").data("jGrowl", e)
									.addClass(e.theme).children("div.close")
									.bind(
											"click.jGrowl",
											function() {
												a(this).parent().trigger(
														"jGrowl.close")
											}).parent();
							a(d)
									.bind(
											"mouseover.jGrowl",
											function() {
												a("div.jGrowl-notification",
														b.element).data(
														"jGrowl.pause", true)
											})
									.bind(
											"mouseout.jGrowl",
											function() {
												a("div.jGrowl-notification",
														b.element).data(
														"jGrowl.pause", false)
											})
									.bind(
											"jGrowl.beforeOpen",
											function() {
												if (e.beforeOpen.apply(d, [ d,
														c, e, b.element ]) != false) {
													a(this).trigger(
															"jGrowl.open")
												}
											})
									.bind(
											"jGrowl.open",
											function() {
												if (e.open.apply(d, [ d, c, e,
														b.element ]) != false) {
													if (e.glue == "after") {
														a(
																"div.jGrowl-notification:last",
																b.element)
																.after(d)
													} else {
														a(
																"div.jGrowl-notification:first",
																b.element)
																.before(d)
													}
													a(this)
															.animate(
																	e.animateOpen,
																	e.speed,
																	e.easing,
																	function() {
																		if (a.browser.msie
																				&& (parseInt(
																						a(
																								this)
																								.css(
																										"opacity"),
																						10) === 1 || parseInt(
																						a(
																								this)
																								.css(
																										"opacity"),
																						10) === 0)) {
																			this.style
																					.removeAttribute("filter")
																		}
																		a(this)
																				.data(
																						"jGrowl").created = new Date()
																	})
												}
											})
									.bind(
											"jGrowl.beforeClose",
											function() {
												if (e.beforeClose.apply(d, [ d,
														c, e, b.element ]) != false) {
													a(this).trigger(
															"jGrowl.close")
												}
											})
									.bind(
											"jGrowl.close",
											function() {
												a(this).data("jGrowl.pause",
														true);
												a(this)
														.animate(
																e.animateClose,
																e.speed,
																e.easing,
																function() {
																	a(this)
																			.remove();
																	var f = e.close
																			.apply(
																					d,
																					[
																							d,
																							c,
																							e,
																							b.element ]);
																	if (a
																			.isFunction(f)) {
																		f
																				.apply(
																						d,
																						[
																								d,
																								c,
																								e,
																								b.element ])
																	}
																})
											}).trigger("jGrowl.beforeOpen");
							if (a.fn.corner != undefined) {
								a(d).corner(e.corners)
							}
							if (a("div.jGrowl-notification:parent", b.element)
									.size() > 1
									&& a("div.jGrowl-closer", b.element).size() == 0
									&& this.defaults.closer != false) {
								a(this.defaults.closerTemplate)
										.addClass(
												"jGrowl-closer ui-state-highlight ui-corner-all")
										.addClass(this.defaults.theme)
										.appendTo(b.element)
										.animate(this.defaults.animateOpen,
												this.defaults.speed,
												this.defaults.easing)
										.bind(
												"click.jGrowl",
												function() {
													a(this)
															.siblings()
															.children(
																	"div.close")
															.trigger(
																	"click.jGrowl");
													if (a
															.isFunction(b.defaults.closer)) {
														b.defaults.closer
																.apply(
																		a(this)
																				.parent()[0],
																		[ a(
																				this)
																				.parent()[0] ])
													}
												})
							}
						},
						update : function() {
							a(this.element)
									.find("div.jGrowl-notification:parent")
									.each(
											function() {
												if (a(this).data("jGrowl") != undefined
														&& a(this).data(
																"jGrowl").created != undefined
														&& (a(this).data(
																"jGrowl").created
																.getTime() + a(
																this).data(
																"jGrowl").life) < (new Date())
																.getTime()
														&& a(this).data(
																"jGrowl").sticky != true
														&& (a(this).data(
																"jGrowl.pause") == undefined || a(
																this).data(
																"jGrowl.pause") != true)) {
													a(this)
															.trigger(
																	"jGrowl.beforeClose")
												}
											});
							if (this.notifications.length > 0
									&& (this.defaults.pool == 0 || a(
											this.element).find(
											"div.jGrowl-notification:parent")
											.size() < this.defaults.pool)) {
								this.render(this.notifications.shift())
							}
							if (a(this.element).find(
									"div.jGrowl-notification:parent").size() < 2) {
								a(this.element).find("div.jGrowl-closer")
										.animate(this.defaults.animateClose,
												this.defaults.speed,
												this.defaults.easing,
												function() {
													a(this).remove()
												})
							}
						},
						startup : function(b) {
							this.element = a(b).addClass("jGrowl").append(
									'<div class="jGrowl-notification"></div>');
							this.interval = setInterval(function() {
								a(b).data("jGrowl.instance").update()
							}, this.defaults.check);
							if (a.browser.msie
									&& parseInt(a.browser.version) < 7
									&& !window.XMLHttpRequest) {
								a(this.element).addClass("ie6")
							}
						},
						shutdown : function() {
							a(this.element).removeClass("jGrowl").find(
									"div.jGrowl-notification").remove();
							clearInterval(this.interval)
						},
						close : function() {
							a(this.element).find("div.jGrowl-notification")
									.each(function() {
										a(this).trigger("jGrowl.beforeClose")
									})
						}
					});
	a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
})(jQuery);
/*
 * jQuery UI
 * 
 * @VERSION
 * 
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about) Dual licensed
 * under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI
 */
jQuery.ui
		|| (function(a) {
			a.ui = {
				version : "@VERSION",
				plugin : {
					add : function(c, d, f) {
						var e = a.ui[c].prototype;
						for ( var b in f) {
							e.plugins[b] = e.plugins[b] || [];
							e.plugins[b].push( [ d, f[b] ])
						}
					},
					call : function(b, d, c) {
						var f = b.plugins[d];
						if (!f || !b.element[0].parentNode) {
							return
						}
						for ( var e = 0; e < f.length; e++) {
							if (b.options[f[e][0]]) {
								f[e][1].apply(b.element, c)
							}
						}
					}
				},
				contains : function(d, c) {
					return document.compareDocumentPosition ? d
							.compareDocumentPosition(c) & 16 : d !== c
							&& d.contains(c)
				},
				hasScroll : function(e, c) {
					if (a(e).css("overflow") == "hidden") {
						return false
					}
					var b = (c && c == "left") ? "scrollLeft" : "scrollTop", d = false;
					if (e[b] > 0) {
						return true
					}
					e[b] = 1;
					d = (e[b] > 0);
					e[b] = 0;
					return d
				},
				isOverAxis : function(c, b, d) {
					return (c > b) && (c < (b + d))
				},
				isOver : function(g, c, f, e, b, d) {
					return a.ui.isOverAxis(g, f, b) && a.ui.isOverAxis(c, e, d)
				},
				keyCode : {
					BACKSPACE : 8,
					CAPS_LOCK : 20,
					COMMA : 188,
					CONTROL : 17,
					DELETE : 46,
					DOWN : 40,
					END : 35,
					ENTER : 13,
					ESCAPE : 27,
					HOME : 36,
					INSERT : 45,
					LEFT : 37,
					NUMPAD_ADD : 107,
					NUMPAD_DECIMAL : 110,
					NUMPAD_DIVIDE : 111,
					NUMPAD_ENTER : 108,
					NUMPAD_MULTIPLY : 106,
					NUMPAD_SUBTRACT : 109,
					PAGE_DOWN : 34,
					PAGE_UP : 33,
					PERIOD : 190,
					RIGHT : 39,
					SHIFT : 16,
					SPACE : 32,
					TAB : 9,
					UP : 38
				}
			};
			a.fn
					.extend( {
						_focus : a.fn.focus,
						focus : function(b, c) {
							return typeof b === "number" ? this
									.each(function() {
										var d = this;
										setTimeout(function() {
											a(d).focus();
											(c && c.call(d))
										}, b)
									}) : this._focus.apply(this, arguments)
						},
						enableSelection : function() {
							return this.attr("unselectable", "off").css(
									"MozUserSelect", "").unbind(
									"selectstart.ui")
						},
						disableSelection : function() {
							return this.attr("unselectable", "on").css(
									"MozUserSelect", "none").bind(
									"selectstart.ui", function() {
										return false
									})
						},
						scrollParent : function() {
							var b;
							if ((a.browser.msie && (/(static|relative)/)
									.test(this.css("position")))
									|| (/absolute/).test(this.css("position"))) {
								b = this
										.parents()
										.filter(
												function() {
													return (/(relative|absolute|fixed)/)
															.test(a.curCSS(
																	this,
																	"position",
																	1))
															&& (/(auto|scroll)/)
																	.test(a
																			.curCSS(
																					this,
																					"overflow",
																					1)
																			+ a
																					.curCSS(
																							this,
																							"overflow-y",
																							1)
																			+ a
																					.curCSS(
																							this,
																							"overflow-x",
																							1))
												}).eq(0)
							} else {
								b = this
										.parents()
										.filter(
												function() {
													return (/(auto|scroll)/)
															.test(a.curCSS(
																	this,
																	"overflow",
																	1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-y",
																					1)
																	+ a
																			.curCSS(
																					this,
																					"overflow-x",
																					1))
												}).eq(0)
							}
							return (/fixed/).test(this.css("position"))
									|| !b.length ? a(document) : b
						},
						zIndex : function(e) {
							if (e !== undefined) {
								return this.css("zIndex", e)
							}
							if (this.length) {
								var c = a(this[0]), b, d;
								while (c.length && c[0] !== document) {
									b = c.css("position");
									if (b == "absolute" || b == "relative"
											|| b == "fixed") {
										d = parseInt(c.css("zIndex"));
										if (!isNaN(d) && d != 0) {
											return d
										}
									}
									c = c.parent()
								}
							}
							return 0
						}
					});
			a.extend(a.expr[":"],
					{
						data : function(d, c, b) {
							return !!a.data(d, b[3])
						},
						focusable : function(c) {
							var d = c.nodeName.toLowerCase(), b = a.attr(c,
									"tabindex");
							return (/input|select|textarea|button|object/
									.test(d) ? !c.disabled : "a" == d
									|| "area" == d ? c.href || !isNaN(b)
									: !isNaN(b))
									&& !a(c)["area" == d ? "parents"
											: "closest"](":hidden").length
						},
						tabbable : function(c) {
							var b = a.attr(c, "tabindex");
							return (isNaN(b) || b >= 0)
									&& a(c).is(":focusable")
						}
					})
		})(jQuery);
/*
 * jQuery UI Widget
 * 
 * @VERSION
 * 
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about) Dual licensed
 * under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Widget
 */
(function(b) {
	var a = b.fn.remove;
	b.fn.remove = function(c, d) {
		return this.each(function() {
			if (!d) {
				if (!c || b.filter(c, [ this ]).length) {
					b("*", this).add(this).each(function() {
						b(this).triggerHandler("remove")
					})
				}
			}
			return a.call(b(this), c, d)
		})
	};
	b.widget = function(d, f, c) {
		var e = d.split(".")[0], h;
		d = d.split(".")[1];
		h = e + "-" + d;
		if (!c) {
			c = f;
			f = b.Widget
		}
		b.expr[":"][h] = function(i) {
			return !!b.data(i, d)
		};
		b[e] = b[e] || {};
		b[e][d] = function(i, j) {
			if (arguments.length) {
				this._createWidget(i, j)
			}
		};
		var g = new f();
		g.options = b.extend( {}, g.options);
		b[e][d].prototype = b.extend(true, g, {
			namespace : e,
			widgetName : d,
			widgetEventPrefix : b[e][d].prototype.widgetEventPrefix || d,
			widgetBaseClass : h
		}, c);
		b.widget.bridge(d, b[e][d])
	};
	b.widget.bridge = function(d, c) {
		b.fn[d] = function(g) {
			var e = typeof g === "string", f = Array.prototype.slice.call(
					arguments, 1), h = this;
			g = !e && f.length ? b.extend.apply(null, [ true, g ].concat(f))
					: g;
			if (e && g.substring(0, 1) === "_") {
				return h
			}
			if (e) {
				this.each(function() {
					var i = b.data(this, d), j = i && b.isFunction(i[g]) ? i[g]
							.apply(i, f) : i;
					if (j !== i && j !== undefined) {
						h = j;
						return false
					}
				})
			} else {
				this.each(function() {
					var i = b.data(this, d);
					if (i) {
						if (g) {
							i.option(g)
						}
						i._init()
					} else {
						b.data(this, d, new c(g, this))
					}
				})
			}
			return h
		}
	};
	b.Widget = function(c, d) {
		if (arguments.length) {
			this._createWidget(c, d)
		}
	};
	b.Widget.prototype = {
		widgetName : "widget",
		widgetEventPrefix : "",
		options : {
			disabled : false
		},
		_createWidget : function(d, e) {
			this.element = b(e).data(this.widgetName, this);
			this.options = b.extend(true, {}, this.options, b.metadata
					&& b.metadata.get(e)[this.widgetName], d);
			var c = this;
			this.element.bind("remove." + this.widgetName, function() {
				c.destroy()
			});
			this._create();
			this._init()
		},
		_create : function() {
		},
		_init : function() {
		},
		destroy : function() {
			this.element.unbind("." + this.widgetName).removeData(
					this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr(
					"aria-disabled").removeClass(
					this.widgetBaseClass + "-disabled " + this.namespace
							+ "-state-disabled")
		},
		widget : function() {
			return this.element
		},
		option : function(e, f) {
			var d = e, c = this;
			if (arguments.length === 0) {
				return b.extend( {}, c.options)
			}
			if (typeof e === "string") {
				if (f === undefined) {
					return this.options[e]
				}
				d = {};
				d[e] = f
			}
			b.each(d, function(g, h) {
				c._setOption(g, h)
			});
			return c
		},
		_setOption : function(c, d) {
			this.options[c] = d;
			if (c === "disabled") {
				this.widget()[d ? "addClass" : "removeClass"](
						this.widgetBaseClass + "-disabled " + this.namespace
								+ "-state-disabled").attr("aria-disabled", d)
			}
			return this
		},
		enable : function() {
			return this._setOption("disabled", false)
		},
		disable : function() {
			return this._setOption("disabled", true)
		},
		_trigger : function(d, e, f) {
			var h = this.options[d];
			e = b.Event(e);
			e.type = (d === this.widgetEventPrefix ? d : this.widgetEventPrefix
					+ d).toLowerCase();
			f = f || {};
			if (e.originalEvent) {
				for ( var c = b.event.props.length, g; c;) {
					g = b.event.props[--c];
					e[g] = e.originalEvent[g]
				}
			}
			this.element.trigger(e, f);
			return !(b.isFunction(h) && h.call(this.element[0], e, f) === false || e
					.isDefaultPrevented())
		}
	}
})(jQuery);
/*
 * jQuery UI Mouse
 * 
 * @VERSION
 * 
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about) Dual licensed
 * under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Mouse
 * 
 * Depends: jquery.ui.widget.js
 */
(function(a) {
	a
			.widget(
					"ui.mouse",
					{
						options : {
							cancel : ":input,option",
							distance : 1,
							delay : 0
						},
						_mouseInit : function() {
							var b = this;
							this.element.bind("mousedown." + this.widgetName,
									function(c) {
										return b._mouseDown(c)
									}).bind("click." + this.widgetName,
									function(c) {
										if (b._preventClickEvent) {
											b._preventClickEvent = false;
											c.stopImmediatePropagation();
											return false
										}
									});
							this.started = false
						},
						_mouseDestroy : function() {
							this.element.unbind("." + this.widgetName)
						},
						_mouseDown : function(d) {
							d.originalEvent = d.originalEvent || {};
							if (d.originalEvent.mouseHandled) {
								return
							}
							(this._mouseStarted && this._mouseUp(d));
							this._mouseDownEvent = d;
							var c = this, e = (d.which == 1), b = (typeof this.options.cancel == "string" ? a(
									d.target).parents().add(d.target).filter(
									this.options.cancel).length
									: false);
							if (!e || b || !this._mouseCapture(d)) {
								return true
							}
							this.mouseDelayMet = !this.options.delay;
							if (!this.mouseDelayMet) {
								this._mouseDelayTimer = setTimeout(function() {
									c.mouseDelayMet = true
								}, this.options.delay)
							}
							if (this._mouseDistanceMet(d)
									&& this._mouseDelayMet(d)) {
								this._mouseStarted = (this._mouseStart(d) !== false);
								if (!this._mouseStarted) {
									d.preventDefault();
									return true
								}
							}
							this._mouseMoveDelegate = function(f) {
								return c._mouseMove(f)
							};
							this._mouseUpDelegate = function(f) {
								return c._mouseUp(f)
							};
							a(document).bind("mousemove." + this.widgetName,
									this._mouseMoveDelegate).bind(
									"mouseup." + this.widgetName,
									this._mouseUpDelegate);
							(a.browser.safari || d.preventDefault());
							d.originalEvent.mouseHandled = true;
							return true
						},
						_mouseMove : function(b) {
							if (a.browser.msie && !b.button) {
								return this._mouseUp(b)
							}
							if (this._mouseStarted) {
								this._mouseDrag(b);
								return b.preventDefault()
							}
							if (this._mouseDistanceMet(b)
									&& this._mouseDelayMet(b)) {
								this._mouseStarted = (this._mouseStart(
										this._mouseDownEvent, b) !== false);
								(this._mouseStarted ? this._mouseDrag(b) : this
										._mouseUp(b))
							}
							return !this._mouseStarted
						},
						_mouseUp : function(b) {
							a(document).unbind("mousemove." + this.widgetName,
									this._mouseMoveDelegate).unbind(
									"mouseup." + this.widgetName,
									this._mouseUpDelegate);
							if (this._mouseStarted) {
								this._mouseStarted = false;
								this._preventClickEvent = (b.target == this._mouseDownEvent.target);
								this._mouseStop(b)
							}
							return false
						},
						_mouseDistanceMet : function(b) {
							return (Math.max(Math
									.abs(this._mouseDownEvent.pageX - b.pageX),
									Math.abs(this._mouseDownEvent.pageY
											- b.pageY)) >= this.options.distance)
						},
						_mouseDelayMet : function(b) {
							return this.mouseDelayMet
						},
						_mouseStart : function(b) {
						},
						_mouseDrag : function(b) {
						},
						_mouseStop : function(b) {
						},
						_mouseCapture : function(b) {
							return true
						}
					})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.draggable",
					a.ui.mouse,
					{
						widgetEventPrefix : "drag",
						options : {
							addClasses : true,
							appendTo : "parent",
							axis : false,
							connectToSortable : false,
							containment : false,
							cursor : "auto",
							cursorAt : false,
							grid : false,
							handle : false,
							helper : "original",
							iframeFix : false,
							opacity : false,
							refreshPositions : false,
							revert : false,
							revertDuration : 500,
							scope : "default",
							scroll : true,
							scrollSensitivity : 20,
							scrollSpeed : 20,
							snap : false,
							snapMode : "both",
							snapTolerance : 20,
							stack : false,
							zIndex : false
						},
						_create : function() {
							if (this.options.helper == "original"
									&& !(/^(?:r|a|f)/).test(this.element
											.css("position"))) {
								this.element[0].style.position = "relative"
							}
							(this.options.addClasses && this.element
									.addClass("ui-draggable"));
							(this.options.disabled && this.element
									.addClass("ui-draggable-disabled"));
							this._mouseInit()
						},
						destroy : function() {
							if (!this.element.data("draggable")) {
								return
							}
							this.element
									.removeData("draggable")
									.unbind(".draggable")
									.removeClass(
											"ui-draggable ui-draggable-dragging ui-draggable-disabled");
							this._mouseDestroy();
							return this
						},
						_mouseCapture : function(b) {
							var c = this.options;
							if (this.helper || c.disabled
									|| a(b.target).is(".ui-resizable-handle")) {
								return false
							}
							this.handle = this._getHandle(b);
							if (!this.handle) {
								return false
							}
							return true
						},
						_mouseStart : function(b) {
							var c = this.options;
							this.helper = this._createHelper(b);
							this._cacheHelperProportions();
							if (a.ui.ddmanager) {
								a.ui.ddmanager.current = this
							}
							this._cacheMargins();
							this.cssPosition = this.helper.css("position");
							this.scrollParent = this.helper.scrollParent();
							this.offset = this.positionAbs = this.element
									.offset();
							this.offset = {
								top : this.offset.top - this.margins.top,
								left : this.offset.left - this.margins.left
							};
							a.extend(this.offset, {
								click : {
									left : b.pageX - this.offset.left,
									top : b.pageY - this.offset.top
								},
								parent : this._getParentOffset(),
								relative : this._getRelativeOffset()
							});
							this.originalPosition = this.position = this
									._generatePosition(b);
							this.originalPageX = b.pageX;
							this.originalPageY = b.pageY;
							(c.cursorAt && this
									._adjustOffsetFromHelper(c.cursorAt));
							if (c.containment) {
								this._setContainment()
							}
							if (this._trigger("start", b) === false) {
								this._clear();
								return false
							}
							this._cacheHelperProportions();
							if (a.ui.ddmanager && !c.dropBehaviour) {
								a.ui.ddmanager.prepareOffsets(this, b)
							}
							this.helper.addClass("ui-draggable-dragging");
							this._mouseDrag(b, true);
							return true
						},
						_mouseDrag : function(b, d) {
							this.position = this._generatePosition(b);
							this.positionAbs = this
									._convertPositionTo("absolute");
							if (!d) {
								var c = this._uiHash();
								if (this._trigger("drag", b, c) === false) {
									this._mouseUp( {});
									return false
								}
								this.position = c.position
							}
							if (!this.options.axis || this.options.axis != "y") {
								this.helper[0].style.left = this.position.left
										+ "px"
							}
							if (!this.options.axis || this.options.axis != "x") {
								this.helper[0].style.top = this.position.top
										+ "px"
							}
							if (a.ui.ddmanager) {
								a.ui.ddmanager.drag(this, b)
							}
							return false
						},
						_mouseStop : function(c) {
							var d = false;
							if (a.ui.ddmanager && !this.options.dropBehaviour) {
								d = a.ui.ddmanager.drop(this, c)
							}
							if (this.dropped) {
								d = this.dropped;
								this.dropped = false
							}
							if (!this.element[0] || !this.element[0].parentNode) {
								return false
							}
							if ((this.options.revert == "invalid" && !d)
									|| (this.options.revert == "valid" && d)
									|| this.options.revert === true
									|| (a.isFunction(this.options.revert) && this.options.revert
											.call(this.element, d))) {
								var b = this;
								a(this.helper)
										.animate(
												this.originalPosition,
												parseInt(
														this.options.revertDuration,
														10),
												function() {
													if (b._trigger("stop", c) !== false) {
														b._clear()
													}
												})
							} else {
								if (this._trigger("stop", c) !== false) {
									this._clear()
								}
							}
							return false
						},
						cancel : function() {
							if (this.helper.is(".ui-draggable-dragging")) {
								this._mouseUp( {})
							} else {
								this._clear()
							}
							return this
						},
						_getHandle : function(b) {
							var c = !this.options.handle
									|| !a(this.options.handle, this.element).length ? true
									: false;
							a(this.options.handle, this.element).find("*")
									.andSelf().each(function() {
										if (this == b.target) {
											c = true
										}
									});
							return c
						},
						_createHelper : function(c) {
							var d = this.options;
							var b = a.isFunction(d.helper) ? a(d.helper.apply(
									this.element[0], [ c ]))
									: (d.helper == "clone" ? this.element
											.clone() : this.element);
							if (!b.parents("body").length) {
								b
										.appendTo((d.appendTo == "parent" ? this.element[0].parentNode
												: d.appendTo))
							}
							if (b[0] != this.element[0]
									&& !(/(fixed|absolute)/).test(b
											.css("position"))) {
								b.css("position", "absolute")
							}
							return b
						},
						_adjustOffsetFromHelper : function(b) {
							if (typeof b == "string") {
								b = b.split(" ")
							}
							if (a.isArray(b)) {
								b = {
									left : +b[0],
									top : +b[1] || 0
								}
							}
							if ("left" in b) {
								this.offset.click.left = b.left
										+ this.margins.left
							}
							if ("right" in b) {
								this.offset.click.left = this.helperProportions.width
										- b.right + this.margins.left
							}
							if ("top" in b) {
								this.offset.click.top = b.top
										+ this.margins.top
							}
							if ("bottom" in b) {
								this.offset.click.top = this.helperProportions.height
										- b.bottom + this.margins.top
							}
						},
						_getParentOffset : function() {
							this.offsetParent = this.helper.offsetParent();
							var b = this.offsetParent.offset();
							if (this.cssPosition == "absolute"
									&& this.scrollParent[0] != document
									&& a.ui.contains(this.scrollParent[0],
											this.offsetParent[0])) {
								b.left += this.scrollParent.scrollLeft();
								b.top += this.scrollParent.scrollTop()
							}
							if ((this.offsetParent[0] == document.body)
									|| (this.offsetParent[0].tagName
											&& this.offsetParent[0].tagName
													.toLowerCase() == "html" && a.browser.msie)) {
								b = {
									top : 0,
									left : 0
								}
							}
							return {
								top : b.top
										+ (parseInt(this.offsetParent
												.css("borderTopWidth"), 10) || 0),
								left : b.left
										+ (parseInt(this.offsetParent
												.css("borderLeftWidth"), 10) || 0)
							}
						},
						_getRelativeOffset : function() {
							if (this.cssPosition == "relative") {
								var b = this.element.position();
								return {
									top : b.top
											- (parseInt(this.helper.css("top"),
													10) || 0)
											+ this.scrollParent.scrollTop(),
									left : b.left
											- (parseInt(
													this.helper.css("left"), 10) || 0)
											+ this.scrollParent.scrollLeft()
								}
							} else {
								return {
									top : 0,
									left : 0
								}
							}
						},
						_cacheMargins : function() {
							this.margins = {
								left : (parseInt(
										this.element.css("marginLeft"), 10) || 0),
								top : (parseInt(this.element.css("marginTop"),
										10) || 0)
							}
						},
						_cacheHelperProportions : function() {
							this.helperProportions = {
								width : this.helper.outerWidth(),
								height : this.helper.outerHeight()
							}
						},
						_setContainment : function() {
							var e = this.options;
							if (e.containment == "parent") {
								e.containment = this.helper[0].parentNode
							}
							if (e.containment == "document"
									|| e.containment == "window") {
								this.containment = [
										0 - this.offset.relative.left
												- this.offset.parent.left,
										0 - this.offset.relative.top
												- this.offset.parent.top,
										a(
												e.containment == "document" ? document
														: window).width()
												- this.helperProportions.width
												- this.margins.left,
										(a(
												e.containment == "document" ? document
														: window).height() || document.body.parentNode.scrollHeight)
												- this.helperProportions.height
												- this.margins.top ]
							}
							if (!(/^(document|window|parent)$/)
									.test(e.containment)
									&& e.containment.constructor != Array) {
								var c = a(e.containment)[0];
								if (!c) {
									return
								}
								var d = a(e.containment).offset();
								var b = (a(c).css("overflow") != "hidden");
								this.containment = [
										d.left
												+ (parseInt(a(c).css(
														"borderLeftWidth"), 10) || 0)
												+ (parseInt(a(c).css(
														"paddingLeft"), 10) || 0)
												- this.margins.left,
										d.top
												+ (parseInt(a(c).css(
														"borderTopWidth"), 10) || 0)
												+ (parseInt(a(c).css(
														"paddingTop"), 10) || 0)
												- this.margins.top,
										d.left
												+ (b ? Math.max(c.scrollWidth,
														c.offsetWidth)
														: c.offsetWidth)
												- (parseInt(a(c).css(
														"borderLeftWidth"), 10) || 0)
												- (parseInt(a(c).css(
														"paddingRight"), 10) || 0)
												- this.helperProportions.width
												- this.margins.left,
										d.top
												+ (b ? Math.max(c.scrollHeight,
														c.offsetHeight)
														: c.offsetHeight)
												- (parseInt(a(c).css(
														"borderTopWidth"), 10) || 0)
												- (parseInt(a(c).css(
														"paddingBottom"), 10) || 0)
												- this.helperProportions.height
												- this.margins.top ]
							} else {
								if (e.containment.constructor == Array) {
									this.containment = e.containment
								}
							}
						},
						_convertPositionTo : function(f, h) {
							if (!h) {
								h = this.position
							}
							var c = f == "absolute" ? 1 : -1;
							var e = this.options, b = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, g = (/(html|body)/i)
									.test(b[0].tagName);
							return {
								top : (h.top + this.offset.relative.top * c
										+ this.offset.parent.top * c - (a.browser.safari
										&& a.browser.version < 526
										&& this.cssPosition == "fixed" ? 0
										: (this.cssPosition == "fixed" ? -this.scrollParent
												.scrollTop()
												: (g ? 0 : b.scrollTop()))
												* c)),
								left : (h.left + this.offset.relative.left * c
										+ this.offset.parent.left * c - (a.browser.safari
										&& a.browser.version < 526
										&& this.cssPosition == "fixed" ? 0
										: (this.cssPosition == "fixed" ? -this.scrollParent
												.scrollLeft()
												: g ? 0 : b.scrollLeft())
												* c))
							}
						},
						_generatePosition : function(e) {
							var h = this.options, b = this.cssPosition == "absolute"
									&& !(this.scrollParent[0] != document && a.ui
											.contains(this.scrollParent[0],
													this.offsetParent[0])) ? this.offsetParent
									: this.scrollParent, i = (/(html|body)/i)
									.test(b[0].tagName);
							var d = e.pageX;
							var c = e.pageY;
							if (this.originalPosition) {
								if (this.containment) {
									if (e.pageX - this.offset.click.left < this.containment[0]) {
										d = this.containment[0]
												+ this.offset.click.left
									}
									if (e.pageY - this.offset.click.top < this.containment[1]) {
										c = this.containment[1]
												+ this.offset.click.top
									}
									if (e.pageX - this.offset.click.left > this.containment[2]) {
										d = this.containment[2]
												+ this.offset.click.left
									}
									if (e.pageY - this.offset.click.top > this.containment[3]) {
										c = this.containment[3]
												+ this.offset.click.top
									}
								}
								if (h.grid) {
									var g = this.originalPageY
											+ Math
													.round((c - this.originalPageY)
															/ h.grid[1])
											* h.grid[1];
									c = this.containment ? (!(g
											- this.offset.click.top < this.containment[1] || g
											- this.offset.click.top > this.containment[3]) ? g
											: (!(g - this.offset.click.top < this.containment[1]) ? g
													- h.grid[1]
													: g + h.grid[1]))
											: g;
									var f = this.originalPageX
											+ Math
													.round((d - this.originalPageX)
															/ h.grid[0])
											* h.grid[0];
									d = this.containment ? (!(f
											- this.offset.click.left < this.containment[0] || f
											- this.offset.click.left > this.containment[2]) ? f
											: (!(f - this.offset.click.left < this.containment[0]) ? f
													- h.grid[0]
													: f + h.grid[0]))
											: f
								}
							}
							return {
								top : (c - this.offset.click.top
										- this.offset.relative.top
										- this.offset.parent.top + (a.browser.safari
										&& a.browser.version < 526
										&& this.cssPosition == "fixed" ? 0
										: (this.cssPosition == "fixed" ? -this.scrollParent
												.scrollTop()
												: (i ? 0 : b.scrollTop())))),
								left : (d - this.offset.click.left
										- this.offset.relative.left
										- this.offset.parent.left + (a.browser.safari
										&& a.browser.version < 526
										&& this.cssPosition == "fixed" ? 0
										: (this.cssPosition == "fixed" ? -this.scrollParent
												.scrollLeft()
												: i ? 0 : b.scrollLeft())))
							}
						},
						_clear : function() {
							this.helper.removeClass("ui-draggable-dragging");
							if (this.helper[0] != this.element[0]
									&& !this.cancelHelperRemoval) {
								this.helper.remove()
							}
							this.helper = null;
							this.cancelHelperRemoval = false
						},
						_trigger : function(b, c, d) {
							d = d || this._uiHash();
							a.ui.plugin.call(this, b, [ c, d ]);
							if (b == "drag") {
								this.positionAbs = this
										._convertPositionTo("absolute")
							}
							return a.Widget.prototype._trigger.call(this, b, c,
									d)
						},
						plugins : {},
						_uiHash : function(b) {
							return {
								helper : this.helper,
								position : this.position,
								originalPosition : this.originalPosition,
								offset : this.positionAbs
							}
						}
					});
	a.extend(a.ui.draggable, {
		version : "@VERSION"
	});
	a.ui.plugin
			.add(
					"draggable",
					"connectToSortable",
					{
						start : function(c, e) {
							var d = a(this).data("draggable"), f = d.options, b = a
									.extend( {}, e, {
										item : d.element
									});
							d.sortables = [];
							a(f.connectToSortable).each(function() {
								var g = a.data(this, "sortable");
								if (g && !g.options.disabled) {
									d.sortables.push( {
										instance : g,
										shouldRevert : g.options.revert
									});
									g._refreshItems();
									g._trigger("activate", c, b)
								}
							})
						},
						stop : function(c, e) {
							var d = a(this).data("draggable"), b = a.extend(
									{}, e, {
										item : d.element
									});
							a
									.each(
											d.sortables,
											function() {
												if (this.instance.isOver) {
													this.instance.isOver = 0;
													d.cancelHelperRemoval = true;
													this.instance.cancelHelperRemoval = false;
													if (this.shouldRevert) {
														this.instance.options.revert = true
													}
													this.instance._mouseStop(c);
													this.instance.options.helper = this.instance.options._helper;
													if (d.options.helper == "original") {
														this.instance.currentItem
																.css( {
																	top : "auto",
																	left : "auto"
																})
													}
												} else {
													this.instance.cancelHelperRemoval = false;
													this.instance._trigger(
															"deactivate", c, b)
												}
											})
						},
						drag : function(c, f) {
							var e = a(this).data("draggable"), b = this;
							var d = function(i) {
								var n = this.offset.click.top, m = this.offset.click.left;
								var g = this.positionAbs.top, k = this.positionAbs.left;
								var j = i.height, l = i.width;
								var p = i.top, h = i.left;
								return a.ui.isOver(g + n, k + m, p, h, j, l)
							};
							a
									.each(
											e.sortables,
											function(g) {
												this.instance.positionAbs = e.positionAbs;
												this.instance.helperProportions = e.helperProportions;
												this.instance.offset.click = e.offset.click;
												if (this.instance
														._intersectsWith(this.instance.containerCache)) {
													if (!this.instance.isOver) {
														this.instance.isOver = 1;
														this.instance.currentItem = a(
																b)
																.clone()
																.appendTo(
																		this.instance.element)
																.data(
																		"sortable-item",
																		true);
														this.instance.options._helper = this.instance.options.helper;
														this.instance.options.helper = function() {
															return f.helper[0]
														};
														c.target = this.instance.currentItem[0];
														this.instance
																._mouseCapture(
																		c, true);
														this.instance
																._mouseStart(c,
																		true,
																		true);
														this.instance.offset.click.top = e.offset.click.top;
														this.instance.offset.click.left = e.offset.click.left;
														this.instance.offset.parent.left -= e.offset.parent.left
																- this.instance.offset.parent.left;
														this.instance.offset.parent.top -= e.offset.parent.top
																- this.instance.offset.parent.top;
														e
																._trigger(
																		"toSortable",
																		c);
														e.dropped = this.instance.element;
														e.currentItem = e.element;
														this.instance.fromOutside = e
													}
													if (this.instance.currentItem) {
														this.instance
																._mouseDrag(c)
													}
												} else {
													if (this.instance.isOver) {
														this.instance.isOver = 0;
														this.instance.cancelHelperRemoval = true;
														this.instance.options.revert = false;
														this.instance
																._trigger(
																		"out",
																		c,
																		this.instance
																				._uiHash(this.instance));
														this.instance
																._mouseStop(c,
																		true);
														this.instance.options.helper = this.instance.options._helper;
														this.instance.currentItem
																.remove();
														if (this.instance.placeholder) {
															this.instance.placeholder
																	.remove()
														}
														e._trigger(
																"fromSortable",
																c);
														e.dropped = false
													}
												}
											})
						}
					});
	a.ui.plugin.add("draggable", "cursor", {
		start : function(c, d) {
			var b = a("body"), e = a(this).data("draggable").options;
			if (b.css("cursor")) {
				e._cursor = b.css("cursor")
			}
			b.css("cursor", e.cursor)
		},
		stop : function(b, c) {
			var d = a(this).data("draggable").options;
			if (d._cursor) {
				a("body").css("cursor", d._cursor)
			}
		}
	});
	a.ui.plugin
			.add(
					"draggable",
					"iframeFix",
					{
						start : function(b, c) {
							var d = a(this).data("draggable").options;
							a(d.iframeFix === true ? "iframe" : d.iframeFix)
									.each(
											function() {
												a(
														'<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
														.css(
																{
																	width : this.offsetWidth
																			+ "px",
																	height : this.offsetHeight
																			+ "px",
																	position : "absolute",
																	opacity : "0.001",
																	zIndex : 1000
																})
														.css(a(this).offset())
														.appendTo("body")
											})
						},
						stop : function(b, c) {
							a("div.ui-draggable-iframeFix").each(function() {
								this.parentNode.removeChild(this)
							})
						}
					});
	a.ui.plugin.add("draggable", "opacity", {
		start : function(c, d) {
			var b = a(d.helper), e = a(this).data("draggable").options;
			if (b.css("opacity")) {
				e._opacity = b.css("opacity")
			}
			b.css("opacity", e.opacity)
		},
		stop : function(b, c) {
			var d = a(this).data("draggable").options;
			if (d._opacity) {
				a(c.helper).css("opacity", d._opacity)
			}
		}
	});
	a.ui.plugin
			.add(
					"draggable",
					"scroll",
					{
						start : function(c, d) {
							var b = a(this).data("draggable");
							if (b.scrollParent[0] != document
									&& b.scrollParent[0].tagName != "HTML") {
								b.overflowOffset = b.scrollParent.offset()
							}
						},
						drag : function(d, e) {
							var c = a(this).data("draggable"), f = c.options, b = false;
							if (c.scrollParent[0] != document
									&& c.scrollParent[0].tagName != "HTML") {
								if (!f.axis || f.axis != "x") {
									if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight)
											- d.pageY < f.scrollSensitivity) {
										c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop
												+ f.scrollSpeed
									} else {
										if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
											c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop
													- f.scrollSpeed
										}
									}
								}
								if (!f.axis || f.axis != "y") {
									if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth)
											- d.pageX < f.scrollSensitivity) {
										c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft
												+ f.scrollSpeed
									} else {
										if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
											c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft
													- f.scrollSpeed
										}
									}
								}
							} else {
								if (!f.axis || f.axis != "x") {
									if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
										b = a(document).scrollTop(
												a(document).scrollTop()
														- f.scrollSpeed)
									} else {
										if (a(window).height()
												- (d.pageY - a(document)
														.scrollTop()) < f.scrollSensitivity) {
											b = a(document).scrollTop(
													a(document).scrollTop()
															+ f.scrollSpeed)
										}
									}
								}
								if (!f.axis || f.axis != "y") {
									if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
										b = a(document).scrollLeft(
												a(document).scrollLeft()
														- f.scrollSpeed)
									} else {
										if (a(window).width()
												- (d.pageX - a(document)
														.scrollLeft()) < f.scrollSensitivity) {
											b = a(document).scrollLeft(
													a(document).scrollLeft()
															+ f.scrollSpeed)
										}
									}
								}
							}
							if (b !== false && a.ui.ddmanager
									&& !f.dropBehaviour) {
								a.ui.ddmanager.prepareOffsets(c, d)
							}
						}
					});
	a.ui.plugin
			.add(
					"draggable",
					"snap",
					{
						start : function(c, d) {
							var b = a(this).data("draggable"), e = b.options;
							b.snapElements = [];
							a(
									e.snap.constructor != String ? (e.snap.items || ":data(draggable)")
											: e.snap).each(function() {
								var g = a(this);
								var f = g.offset();
								if (this != b.element[0]) {
									b.snapElements.push( {
										item : this,
										width : g.outerWidth(),
										height : g.outerHeight(),
										top : f.top,
										left : f.left
									})
								}
							})
						},
						drag : function(u, p) {
							var g = a(this).data("draggable"), q = g.options;
							var y = q.snapTolerance;
							var x = p.offset.left, w = x
									+ g.helperProportions.width, f = p.offset.top, e = f
									+ g.helperProportions.height;
							for ( var v = g.snapElements.length - 1; v >= 0; v--) {
								var s = g.snapElements[v].left, n = s
										+ g.snapElements[v].width, m = g.snapElements[v].top, A = m
										+ g.snapElements[v].height;
								if (!((s - y < x && x < n + y && m - y < f && f < A
										+ y)
										|| (s - y < x && x < n + y && m - y < e && e < A
												+ y)
										|| (s - y < w && w < n + y && m - y < f && f < A
												+ y) || (s - y < w && w < n + y
										&& m - y < e && e < A + y))) {
									if (g.snapElements[v].snapping) {
										(g.options.snap.release && g.options.snap.release
												.call(
														g.element,
														u,
														a
																.extend(
																		g
																				._uiHash(),
																		{
																			snapItem : g.snapElements[v].item
																		})))
									}
									g.snapElements[v].snapping = false;
									continue
								}
								if (q.snapMode != "inner") {
									var c = Math.abs(m - e) <= y;
									var z = Math.abs(A - f) <= y;
									var j = Math.abs(s - w) <= y;
									var k = Math.abs(n - x) <= y;
									if (c) {
										p.position.top = g
												._convertPositionTo(
														"relative",
														{
															top : m
																	- g.helperProportions.height,
															left : 0
														}).top
												- g.margins.top
									}
									if (z) {
										p.position.top = g._convertPositionTo(
												"relative", {
													top : A,
													left : 0
												}).top
												- g.margins.top
									}
									if (j) {
										p.position.left = g
												._convertPositionTo(
														"relative",
														{
															top : 0,
															left : s
																	- g.helperProportions.width
														}).left
												- g.margins.left
									}
									if (k) {
										p.position.left = g._convertPositionTo(
												"relative", {
													top : 0,
													left : n
												}).left
												- g.margins.left
									}
								}
								var h = (c || z || j || k);
								if (q.snapMode != "outer") {
									var c = Math.abs(m - f) <= y;
									var z = Math.abs(A - e) <= y;
									var j = Math.abs(s - x) <= y;
									var k = Math.abs(n - w) <= y;
									if (c) {
										p.position.top = g._convertPositionTo(
												"relative", {
													top : m,
													left : 0
												}).top
												- g.margins.top
									}
									if (z) {
										p.position.top = g
												._convertPositionTo(
														"relative",
														{
															top : A
																	- g.helperProportions.height,
															left : 0
														}).top
												- g.margins.top
									}
									if (j) {
										p.position.left = g._convertPositionTo(
												"relative", {
													top : 0,
													left : s
												}).left
												- g.margins.left
									}
									if (k) {
										p.position.left = g
												._convertPositionTo(
														"relative",
														{
															top : 0,
															left : n
																	- g.helperProportions.width
														}).left
												- g.margins.left
									}
								}
								if (!g.snapElements[v].snapping
										&& (c || z || j || k || h)) {
									(g.options.snap.snap && g.options.snap.snap
											.call(
													g.element,
													u,
													a
															.extend(
																	g._uiHash(),
																	{
																		snapItem : g.snapElements[v].item
																	})))
								}
								g.snapElements[v].snapping = (c || z || j || k || h)
							}
						}
					});
	a.ui.plugin.add("draggable", "stack", {
		start : function(c, d) {
			var f = a(this).data("draggable").options;
			var e = a.makeArray(a(f.stack)).sort(
					function(h, g) {
						return (parseInt(a(h).css("zIndex"), 10) || 0)
								- (parseInt(a(g).css("zIndex"), 10) || 0)
					});
			if (!e.length) {
				return
			}
			var b = parseInt(e[0].style.zIndex) || 0;
			a(e).each(function(g) {
				this.style.zIndex = b + g
			});
			this[0].style.zIndex = b + e.length
		}
	});
	a.ui.plugin.add("draggable", "zIndex", {
		start : function(c, d) {
			var b = a(d.helper), e = a(this).data("draggable").options;
			if (b.css("zIndex")) {
				e._zIndex = b.css("zIndex")
			}
			b.css("zIndex", e.zIndex)
		},
		stop : function(b, c) {
			var d = a(this).data("draggable").options;
			if (d._zIndex) {
				a(c.helper).css("zIndex", d._zIndex)
			}
		}
	})
})(jQuery);
(function(f) {
	f.ui = f.ui || {};
	var c = /left|center|right/, e = "center", d = /top|center|bottom/, g = "center", a = f.fn.position, b = f.fn.offset;
	f.fn.position = function(i) {
		if (!i || !i.of) {
			return a.apply(this, arguments)
		}
		i = f.extend( {}, i);
		var l = f(i.of), n = (i.collision || "flip").split(" "), m = i.offset ? i.offset
				.split(" ")
				: [ 0, 0 ], k, h, j;
		if (i.of.nodeType === 9) {
			k = l.width();
			h = l.height();
			j = {
				top : 0,
				left : 0
			}
		} else {
			if (i.of.scrollTo && i.of.document) {
				k = l.width();
				h = l.height();
				j = {
					top : l.scrollTop(),
					left : l.scrollLeft()
				}
			} else {
				if (i.of.preventDefault) {
					i.at = "left top";
					k = h = 0;
					j = {
						top : i.of.pageY,
						left : i.of.pageX
					}
				} else {
					k = l.outerWidth();
					h = l.outerHeight();
					j = l.offset()
				}
			}
		}
		f.each( [ "my", "at" ], function() {
			var o = (i[this] || "").split(" ");
			if (o.length === 1) {
				o = c.test(o[0]) ? o.concat( [ g ]) : d.test(o[0]) ? [ e ]
						.concat(o) : [ e, g ]
			}
			o[0] = c.test(o[0]) ? o[0] : e;
			o[1] = d.test(o[1]) ? o[1] : g;
			i[this] = o
		});
		if (n.length === 1) {
			n[1] = n[0]
		}
		m[0] = parseInt(m[0], 10) || 0;
		if (m.length === 1) {
			m[1] = m[0]
		}
		m[1] = parseInt(m[1], 10) || 0;
		if (i.at[0] === "right") {
			j.left += k
		} else {
			if (i.at[0] === e) {
				j.left += k / 2
			}
		}
		if (i.at[1] === "bottom") {
			j.top += h
		} else {
			if (i.at[1] === g) {
				j.top += h / 2
			}
		}
		j.left += m[0];
		j.top += m[1];
		return this.each(function() {
			var r = f(this), q = r.outerWidth(), p = r.outerHeight(), o = f
					.extend( {}, j);
			if (i.my[0] === "right") {
				o.left -= q
			} else {
				if (i.my[0] === e) {
					o.left -= q / 2
				}
			}
			if (i.my[1] === "bottom") {
				o.top -= p
			} else {
				if (i.my[1] === g) {
					o.top -= p / 2
				}
			}
			f.each( [ "left", "top" ], function(t, s) {
				if (f.ui.position[n[t]]) {
					f.ui.position[n[t]][s](o, {
						targetWidth : k,
						targetHeight : h,
						elemWidth : q,
						elemHeight : p,
						offset : m,
						my : i.my,
						at : i.at
					})
				}
			});
			if (f.fn.bgiframe) {
				r.bgiframe()
			}
			r.offset(f.extend(o, {
				using : i.using
			}))
		})
	};
	f.ui.position = {
		fit : {
			left : function(h, i) {
				var k = f(window), j = h.left + i.elemWidth - k.width()
						- k.scrollLeft();
				h.left = j > 0 ? h.left - j : Math.max(0, h.left)
			},
			top : function(h, i) {
				var k = f(window), j = h.top + i.elemHeight - k.height()
						- k.scrollTop();
				h.top = j > 0 ? h.top - j : Math.max(0, h.top)
			}
		},
		flip : {
			left : function(i, j) {
				if (j.at[0] === "center") {
					return
				}
				var l = f(window), k = i.left + j.elemWidth - l.width()
						- l.scrollLeft(), h = j.my[0] === "left" ? -j.elemWidth
						: j.my[0] === "right" ? j.elemWidth : 0, m = -2
						* j.offset[0];
				i.left += i.left < 0 ? h + j.targetWidth + m : k > 0 ? h
						- j.targetWidth + m : 0
			},
			top : function(i, k) {
				if (k.at[1] === "center") {
					return
				}
				var m = f(window), l = i.top + k.elemHeight - m.height()
						- m.scrollTop(), h = k.my[1] === "top" ? -k.elemHeight
						: k.my[1] === "bottom" ? k.elemHeight : 0, j = k.at[1] === "top" ? k.targetHeight
						: -k.targetHeight, n = -2 * k.offset[1];
				i.top += i.top < 0 ? h + k.targetHeight + n : l > 0 ? h + j + n
						: 0
			}
		}
	};
	if (!f.offset.setOffset) {
		f.offset.setOffset = function(l, i) {
			if (/static/.test(f.curCSS(l, "position"))) {
				l.style.position = "relative"
			}
			var k = f(l), n = k.offset(), h = parseInt(
					f.curCSS(l, "top", true), 10) || 0, m = parseInt(f.curCSS(
					l, "left", true), 10) || 0, j = {
				top : (i.top - n.top) + h,
				left : (i.left - n.left) + m
			};
			if ("using" in i) {
				i.using.call(l, j)
			} else {
				k.css(j)
			}
		};
		f.fn.offset = function(h) {
			var i = this[0];
			if (!i || !i.ownerDocument) {
				return null
			}
			if (h) {
				return this.each(function() {
					f.offset.setOffset(this, h)
				})
			}
			return b.call(this)
		}
	}
}(jQuery));
(function(c) {
	c
			.widget(
					"ui.resizable",
					c.ui.mouse,
					{
						widgetEventPrefix : "resize",
						options : {
							alsoResize : false,
							animate : false,
							animateDuration : "slow",
							animateEasing : "swing",
							aspectRatio : false,
							autoHide : false,
							containment : false,
							ghost : false,
							grid : false,
							handles : "e,s,se",
							helper : false,
							maxHeight : null,
							maxWidth : null,
							minHeight : 10,
							minWidth : 10,
							zIndex : 1000
						},
						_create : function() {
							var e = this, j = this.options;
							this.element.addClass("ui-resizable");
							c.extend(this,
									{
										_aspectRatio : !!(j.aspectRatio),
										aspectRatio : j.aspectRatio,
										originalElement : this.element,
										_proportionallyResizeElements : [],
										_helper : j.helper || j.ghost
												|| j.animate ? j.helper
												|| "ui-resizable-helper" : null
									});
							if (this.element[0].nodeName
									.match(/canvas|textarea|input|select|button|img/i)) {
								if (/relative/.test(this.element
										.css("position"))
										&& c.browser.opera) {
									this.element.css( {
										position : "relative",
										top : "auto",
										left : "auto"
									})
								}
								this.element
										.wrap(c(
												'<div class="ui-wrapper" style="overflow: hidden;"></div>')
												.css(
														{
															position : this.element
																	.css("position"),
															width : this.element
																	.outerWidth(),
															height : this.element
																	.outerHeight(),
															top : this.element
																	.css("top"),
															left : this.element
																	.css("left")
														}));
								this.element = this.element.parent().data(
										"resizable",
										this.element.data("resizable"));
								this.elementIsWrapper = true;
								this.element.css( {
									marginLeft : this.originalElement
											.css("marginLeft"),
									marginTop : this.originalElement
											.css("marginTop"),
									marginRight : this.originalElement
											.css("marginRight"),
									marginBottom : this.originalElement
											.css("marginBottom")
								});
								this.originalElement.css( {
									marginLeft : 0,
									marginTop : 0,
									marginRight : 0,
									marginBottom : 0
								});
								this.originalResizeStyle = this.originalElement
										.css("resize");
								this.originalElement.css("resize", "none");
								this._proportionallyResizeElements
										.push(this.originalElement.css( {
											position : "static",
											zoom : 1,
											display : "block"
										}));
								this.originalElement.css( {
									margin : this.originalElement.css("margin")
								});
								this._proportionallyResize()
							}
							this.handles = j.handles
									|| (!c(".ui-resizable-handle", this.element).length ? "e,s,se"
											: {
												n : ".ui-resizable-n",
												e : ".ui-resizable-e",
												s : ".ui-resizable-s",
												w : ".ui-resizable-w",
												se : ".ui-resizable-se",
												sw : ".ui-resizable-sw",
												ne : ".ui-resizable-ne",
												nw : ".ui-resizable-nw"
											});
							if (this.handles.constructor == String) {
								if (this.handles == "all") {
									this.handles = "n,e,s,w,se,sw,ne,nw"
								}
								var k = this.handles.split(",");
								this.handles = {};
								for ( var f = 0; f < k.length; f++) {
									var h = c.trim(k[f]), d = "ui-resizable-"
											+ h;
									var g = c('<div class="ui-resizable-handle ' + d + '"></div>');
									if (/sw|se|ne|nw/.test(h)) {
										g.css( {
											zIndex : ++j.zIndex
										})
									}
									if ("se" == h) {
										g
												.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
									}
									this.handles[h] = ".ui-resizable-" + h;
									this.element.append(g)
								}
							}
							this._renderAxis = function(p) {
								p = p || this.element;
								for ( var m in this.handles) {
									if (this.handles[m].constructor == String) {
										this.handles[m] = c(this.handles[m],
												this.element).show()
									}
									if (this.elementIsWrapper
											&& this.originalElement[0].nodeName
													.match(/textarea|input|select|button/i)) {
										var n = c(this.handles[m], this.element), o = 0;
										o = /sw|ne|nw|se|n|s/.test(m) ? n
												.outerHeight() : n.outerWidth();
										var l = [
												"padding",
												/ne|nw|n/.test(m) ? "Top"
														: /se|sw|s/.test(m) ? "Bottom"
																: /^e$/.test(m) ? "Right"
																		: "Left" ]
												.join("");
										p.css(l, o);
										this._proportionallyResize()
									}
									if (!c(this.handles[m]).length) {
										continue
									}
								}
							};
							this._renderAxis(this.element);
							this._handles = c(".ui-resizable-handle",
									this.element).disableSelection();
							this._handles
									.mouseover(function() {
										if (!e.resizing) {
											if (this.className) {
												var i = this.className
														.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
											}
											e.axis = i && i[1] ? i[1] : "se"
										}
									});
							if (j.autoHide) {
								this._handles.hide();
								c(this.element)
										.addClass("ui-resizable-autohide")
										.hover(
												function() {
													c(this)
															.removeClass(
																	"ui-resizable-autohide");
													e._handles.show()
												},
												function() {
													if (!e.resizing) {
														c(this)
																.addClass(
																		"ui-resizable-autohide");
														e._handles.hide()
													}
												})
							}
							this._mouseInit()
						},
						destroy : function() {
							this._mouseDestroy();
							var d = function(f) {
								c(f)
										.removeClass(
												"ui-resizable ui-resizable-disabled ui-resizable-resizing")
										.removeData("resizable").unbind(
												".resizable").find(
												".ui-resizable-handle")
										.remove()
							};
							if (this.elementIsWrapper) {
								d(this.element);
								var e = this.element;
								e.after(this.originalElement.css( {
									position : e.css("position"),
									width : e.outerWidth(),
									height : e.outerHeight(),
									top : e.css("top"),
									left : e.css("left")
								})).remove()
							}
							this.originalElement.css("resize",
									this.originalResizeStyle);
							d(this.originalElement);
							return this
						},
						_mouseCapture : function(e) {
							var f = false;
							for ( var d in this.handles) {
								if (c(this.handles[d])[0] == e.target) {
									f = true
								}
							}
							return !this.options.disabled && f
						},
						_mouseStart : function(f) {
							var i = this.options, e = this.element.position(), d = this.element;
							this.resizing = true;
							this.documentScroll = {
								top : c(document).scrollTop(),
								left : c(document).scrollLeft()
							};
							if (d.is(".ui-draggable")
									|| (/absolute/).test(d.css("position"))) {
								d.css( {
									position : "absolute",
									top : e.top,
									left : e.left
								})
							}
							if (c.browser.opera
									&& (/relative/).test(d.css("position"))) {
								d.css( {
									position : "relative",
									top : "auto",
									left : "auto"
								})
							}
							this._renderProxy();
							var j = b(this.helper.css("left")), g = b(this.helper
									.css("top"));
							if (i.containment) {
								j += c(i.containment).scrollLeft() || 0;
								g += c(i.containment).scrollTop() || 0
							}
							this.offset = this.helper.offset();
							this.position = {
								left : j,
								top : g
							};
							this.size = this._helper ? {
								width : d.outerWidth(),
								height : d.outerHeight()
							} : {
								width : d.width(),
								height : d.height()
							};
							this.originalSize = this._helper ? {
								width : d.outerWidth(),
								height : d.outerHeight()
							} : {
								width : d.width(),
								height : d.height()
							};
							this.originalPosition = {
								left : j,
								top : g
							};
							this.sizeDiff = {
								width : d.outerWidth() - d.width(),
								height : d.outerHeight() - d.height()
							};
							this.originalMousePosition = {
								left : f.pageX,
								top : f.pageY
							};
							this.aspectRatio = (typeof i.aspectRatio == "number") ? i.aspectRatio
									: ((this.originalSize.width / this.originalSize.height) || 1);
							var h = c(".ui-resizable-" + this.axis).css(
									"cursor");
							c("body").css("cursor",
									h == "auto" ? this.axis + "-resize" : h);
							d.addClass("ui-resizable-resizing");
							this._propagate("start", f);
							return true
						},
						_mouseDrag : function(d) {
							var g = this.helper, f = this.options, l = {}, p = this, i = this.originalMousePosition, m = this.axis;
							var q = (d.pageX - i.left) || 0, n = (d.pageY - i.top) || 0;
							var h = this._change[m];
							if (!h) {
								return false
							}
							var k = h.apply(this, [ d, q, n ]), j = c.browser.msie
									&& c.browser.version < 7, e = this.sizeDiff;
							if (this._aspectRatio || d.shiftKey) {
								k = this._updateRatio(k, d)
							}
							k = this._respectSize(k, d);
							this._propagate("resize", d);
							g.css( {
								top : this.position.top + "px",
								left : this.position.left + "px",
								width : this.size.width + "px",
								height : this.size.height + "px"
							});
							if (!this._helper
									&& this._proportionallyResizeElements.length) {
								this._proportionallyResize()
							}
							this._updateCache(k);
							this._trigger("resize", d, this.ui());
							return false
						},
						_mouseStop : function(g) {
							this.resizing = false;
							var h = this.options, l = this;
							if (this._helper) {
								var f = this._proportionallyResizeElements, d = f.length
										&& (/textarea/i).test(f[0].nodeName), e = d
										&& c.ui.hasScroll(f[0], "left") ? 0
										: l.sizeDiff.height, j = d ? 0
										: l.sizeDiff.width;
								var m = {
									width : (l.size.width - j),
									height : (l.size.height - e)
								}, i = (parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left))
										|| null, k = (parseInt(l.element
										.css("top"), 10) + (l.position.top - l.originalPosition.top))
										|| null;
								if (!h.animate) {
									this.element.css(c.extend(m, {
										top : k,
										left : i
									}))
								}
								l.helper.height(l.size.height);
								l.helper.width(l.size.width);
								if (this._helper && !h.animate) {
									this._proportionallyResize()
								}
							}
							c("body").css("cursor", "auto");
							this.element.removeClass("ui-resizable-resizing");
							this._propagate("stop", g);
							if (this._helper) {
								this.helper.remove()
							}
							return false
						},
						_updateCache : function(d) {
							var e = this.options;
							this.offset = this.helper.offset();
							if (a(d.left)) {
								this.position.left = d.left
							}
							if (a(d.top)) {
								this.position.top = d.top
							}
							if (a(d.height)) {
								this.size.height = d.height
							}
							if (a(d.width)) {
								this.size.width = d.width
							}
						},
						_updateRatio : function(g, f) {
							var h = this.options, i = this.position, e = this.size, d = this.axis;
							if (g.height) {
								g.width = (e.height * this.aspectRatio)
							} else {
								if (g.width) {
									g.height = (e.width / this.aspectRatio)
								}
							}
							if (d == "sw") {
								g.left = i.left + (e.width - g.width);
								g.top = null
							}
							if (d == "nw") {
								g.top = i.top + (e.height - g.height);
								g.left = i.left + (e.width - g.width)
							}
							return g
						},
						_respectSize : function(k, f) {
							var i = this.helper, h = this.options, q = this._aspectRatio
									|| f.shiftKey, p = this.axis, s = a(k.width)
									&& h.maxWidth && (h.maxWidth < k.width), l = a(k.height)
									&& h.maxHeight && (h.maxHeight < k.height), g = a(k.width)
									&& h.minWidth && (h.minWidth > k.width), r = a(k.height)
									&& h.minHeight && (h.minHeight > k.height);
							if (g) {
								k.width = h.minWidth
							}
							if (r) {
								k.height = h.minHeight
							}
							if (s) {
								k.width = h.maxWidth
							}
							if (l) {
								k.height = h.maxHeight
							}
							var e = this.originalPosition.left
									+ this.originalSize.width, n = this.position.top
									+ this.size.height;
							var j = /sw|nw|w/.test(p), d = /nw|ne|n/.test(p);
							if (g && j) {
								k.left = e - h.minWidth
							}
							if (s && j) {
								k.left = e - h.maxWidth
							}
							if (r && d) {
								k.top = n - h.minHeight
							}
							if (l && d) {
								k.top = n - h.maxHeight
							}
							var m = !k.width && !k.height;
							if (m && !k.left && k.top) {
								k.top = null
							} else {
								if (m && !k.top && k.left) {
									k.left = null
								}
							}
							return k
						},
						_proportionallyResize : function() {
							var j = this.options;
							if (!this._proportionallyResizeElements.length) {
								return
							}
							var f = this.helper || this.element;
							for ( var e = 0; e < this._proportionallyResizeElements.length; e++) {
								var g = this._proportionallyResizeElements[e];
								if (!this.borderDif) {
									var d = [ g.css("borderTopWidth"),
											g.css("borderRightWidth"),
											g.css("borderBottomWidth"),
											g.css("borderLeftWidth") ], h = [
											g.css("paddingTop"),
											g.css("paddingRight"),
											g.css("paddingBottom"),
											g.css("paddingLeft") ];
									this.borderDif = c
											.map(
													d,
													function(k, m) {
														var l = parseInt(k, 10) || 0, n = parseInt(
																h[m], 10) || 0;
														return l + n
													})
								}
								if (c.browser.msie
										&& !(!(c(f).is(":hidden") || c(f)
												.parents(":hidden").length))) {
									continue
								}
								g
										.css( {
											height : (f.height()
													- this.borderDif[0] - this.borderDif[2]) || 0,
											width : (f.width()
													- this.borderDif[1] - this.borderDif[3]) || 0
										})
							}
						},
						_renderProxy : function() {
							var e = this.element, h = this.options;
							this.elementOffset = e.offset();
							if (this._helper) {
								this.helper = this.helper
										|| c('<div style="overflow:hidden;"></div>');
								var d = c.browser.msie && c.browser.version < 7, f = (d ? 1
										: 0), g = (d ? 2 : -1);
								this.helper.addClass(this._helper).css( {
									width : this.element.outerWidth() + g,
									height : this.element.outerHeight() + g,
									position : "absolute",
									left : this.elementOffset.left - f + "px",
									top : this.elementOffset.top - f + "px",
									zIndex : ++h.zIndex
								});
								this.helper.appendTo("body").disableSelection()
							} else {
								this.helper = this.element
							}
						},
						_change : {
							e : function(f, e, d) {
								return {
									width : this.originalSize.width + e
								}
							},
							w : function(g, e, d) {
								var i = this.options, f = this.originalSize, h = this.originalPosition;
								return {
									left : h.left + e,
									width : f.width - e
								}
							},
							n : function(g, e, d) {
								var i = this.options, f = this.originalSize, h = this.originalPosition;
								return {
									top : h.top + d,
									height : f.height - d
								}
							},
							s : function(f, e, d) {
								return {
									height : this.originalSize.height + d
								}
							},
							se : function(f, e, d) {
								return c.extend(this._change.s.apply(this,
										arguments), this._change.e.apply(this,
										[ f, e, d ]))
							},
							sw : function(f, e, d) {
								return c.extend(this._change.s.apply(this,
										arguments), this._change.w.apply(this,
										[ f, e, d ]))
							},
							ne : function(f, e, d) {
								return c.extend(this._change.n.apply(this,
										arguments), this._change.e.apply(this,
										[ f, e, d ]))
							},
							nw : function(f, e, d) {
								return c.extend(this._change.n.apply(this,
										arguments), this._change.w.apply(this,
										[ f, e, d ]))
							}
						},
						_propagate : function(e, d) {
							c.ui.plugin.call(this, e, [ d, this.ui() ]);
							(e != "resize" && this._trigger(e, d, this.ui()))
						},
						plugins : {},
						ui : function() {
							return {
								originalElement : this.originalElement,
								element : this.element,
								helper : this.helper,
								position : this.position,
								size : this.size,
								originalSize : this.originalSize,
								originalPosition : this.originalPosition
							}
						}
					});
	c.extend(c.ui.resizable, {
		version : "@VERSION"
	});
	c.ui.plugin
			.add(
					"resizable",
					"alsoResize",
					{
						start : function(e, f) {
							var d = c(this).data("resizable"), h = d.options;
							var g = function(i) {
								c(i)
										.each(
												function() {
													c(this)
															.data(
																	"resizable-alsoresize",
																	{
																		width : parseInt(
																				c(
																						this)
																						.width(),
																				10),
																		height : parseInt(
																				c(
																						this)
																						.height(),
																				10),
																		left : parseInt(
																				c(
																						this)
																						.css(
																								"left"),
																				10),
																		top : parseInt(
																				c(
																						this)
																						.css(
																								"top"),
																				10)
																	})
												})
							};
							if (typeof (h.alsoResize) == "object"
									&& !h.alsoResize.parentNode) {
								if (h.alsoResize.length) {
									h.alsoResize = h.alsoResize[0];
									g(h.alsoResize)
								} else {
									c.each(h.alsoResize, function(i, j) {
										g(i)
									})
								}
							} else {
								g(h.alsoResize)
							}
						},
						resize : function(f, h) {
							var e = c(this).data("resizable"), i = e.options, g = e.originalSize, k = e.originalPosition;
							var j = {
								height : (e.size.height - g.height) || 0,
								width : (e.size.width - g.width) || 0,
								top : (e.position.top - k.top) || 0,
								left : (e.position.left - k.left) || 0
							}, d = function(l, m) {
								c(l)
										.each(
												function() {
													var p = c(this), q = c(this)
															.data(
																	"resizable-alsoresize"), o = {}, n = m
															&& m.length ? m : [
															"width", "height",
															"top", "left" ];
													c
															.each(
																	n
																			|| [
																					"width",
																					"height",
																					"top",
																					"left" ],
																	function(r,
																			t) {
																		var s = (q[t] || 0)
																				+ (j[t] || 0);
																		if (s
																				&& s >= 0) {
																			o[t] = s
																					|| null
																		}
																	});
													if (/relative/.test(p
															.css("position"))
															&& c.browser.opera) {
														e._revertToRelativePosition = true;
														p
																.css( {
																	position : "absolute",
																	top : "auto",
																	left : "auto"
																})
													}
													p.css(o)
												})
							};
							if (typeof (i.alsoResize) == "object"
									&& !i.alsoResize.nodeType) {
								c.each(i.alsoResize, function(l, m) {
									d(l, m)
								})
							} else {
								d(i.alsoResize)
							}
						},
						stop : function(e, f) {
							var d = c(this).data("resizable");
							if (d._revertToRelativePosition && c.browser.opera) {
								d._revertToRelativePosition = false;
								el.css( {
									position : "relative"
								})
							}
							c(this).removeData("resizable-alsoresize-start")
						}
					});
	c.ui.plugin
			.add(
					"resizable",
					"animate",
					{
						stop : function(h, m) {
							var n = c(this).data("resizable"), i = n.options;
							var g = n._proportionallyResizeElements, d = g.length
									&& (/textarea/i).test(g[0].nodeName), e = d
									&& c.ui.hasScroll(g[0], "left") ? 0
									: n.sizeDiff.height, k = d ? 0
									: n.sizeDiff.width;
							var f = {
								width : (n.size.width - k),
								height : (n.size.height - e)
							}, j = (parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left))
									|| null, l = (parseInt(
									n.element.css("top"), 10) + (n.position.top - n.originalPosition.top))
									|| null;
							n.element.animate(c.extend(f, l && j ? {
								top : l,
								left : j
							} : {}),
									{
										duration : i.animateDuration,
										easing : i.animateEasing,
										step : function() {
											var o = {
												width : parseInt(n.element
														.css("width"), 10),
												height : parseInt(n.element
														.css("height"), 10),
												top : parseInt(n.element
														.css("top"), 10),
												left : parseInt(n.element
														.css("left"), 10)
											};
											if (g && g.length) {
												c(g[0]).css( {
													width : o.width,
													height : o.height
												})
											}
											n._updateCache(o);
											n._propagate("resize", h)
										}
									})
						}
					});
	c.ui.plugin
			.add(
					"resizable",
					"containment",
					{
						start : function(e, q) {
							var s = c(this).data("resizable"), i = s.options, k = s.element;
							var f = i.containment, j = (f instanceof c) ? f
									.get(0) : (/parent/.test(f)) ? k.parent()
									.get(0) : f;
							if (!j) {
								return
							}
							s.containerElement = c(j);
							if (/document/.test(f) || f == document) {
								s.containerOffset = {
									left : 0,
									top : 0
								};
								s.containerPosition = {
									left : 0,
									top : 0
								};
								s.parentData = {
									element : c(document),
									left : 0,
									top : 0,
									width : c(document).width(),
									height : c(document).height()
											|| document.body.parentNode.scrollHeight
								}
							} else {
								var m = c(j), h = [];
								c( [ "Top", "Right", "Left", "Bottom" ]).each(
										function(p, o) {
											h[p] = b(m.css("padding" + o))
										});
								s.containerOffset = m.offset();
								s.containerPosition = m.position();
								s.containerSize = {
									height : (m.innerHeight() - h[3]),
									width : (m.innerWidth() - h[1])
								};
								var n = s.containerOffset, d = s.containerSize.height, l = s.containerSize.width, g = (c.ui
										.hasScroll(j, "left") ? j.scrollWidth
										: l), r = (c.ui.hasScroll(j) ? j.scrollHeight
										: d);
								s.parentData = {
									element : j,
									left : n.left,
									top : n.top,
									width : g,
									height : r
								}
							}
						},
						resize : function(f, p) {
							var s = c(this).data("resizable"), h = s.options, e = s.containerSize, n = s.containerOffset, l = s.size, m = s.position, q = s._aspectRatio
									|| f.shiftKey, d = {
								top : 0,
								left : 0
							}, g = s.containerElement;
							if (g[0] != document
									&& (/static/).test(g.css("position"))) {
								d = n
							}
							if (m.left < (s._helper ? n.left : 0)) {
								s.size.width = s.size.width
										+ (s._helper ? (s.position.left - n.left)
												: (s.position.left - d.left));
								if (q) {
									s.size.height = s.size.width
											/ h.aspectRatio
								}
								s.position.left = h.helper ? n.left : 0
							}
							if (m.top < (s._helper ? n.top : 0)) {
								s.size.height = s.size.height
										+ (s._helper ? (s.position.top - n.top)
												: s.position.top);
								if (q) {
									s.size.width = s.size.height
											* h.aspectRatio
								}
								s.position.top = s._helper ? n.top : 0
							}
							s.offset.left = s.parentData.left + s.position.left;
							s.offset.top = s.parentData.top + s.position.top;
							var k = Math.abs((s._helper ? s.offset.left
									- d.left : (s.offset.left - d.left))
									+ s.sizeDiff.width), r = Math
									.abs((s._helper ? s.offset.top - d.top
											: (s.offset.top - n.top))
											+ s.sizeDiff.height);
							var j = s.containerElement.get(0) == s.element
									.parent().get(0), i = /relative|absolute/
									.test(s.containerElement.css("position"));
							if (j && i) {
								k -= s.parentData.left
							}
							if (k + s.size.width >= s.parentData.width) {
								s.size.width = s.parentData.width - k;
								if (q) {
									s.size.height = s.size.width
											/ s.aspectRatio
								}
							}
							if (r + s.size.height >= s.parentData.height) {
								s.size.height = s.parentData.height - r;
								if (q) {
									s.size.width = s.size.height
											* s.aspectRatio
								}
							}
						},
						stop : function(e, m) {
							var p = c(this).data("resizable"), f = p.options, k = p.position, l = p.containerOffset, d = p.containerPosition, g = p.containerElement;
							var i = c(p.helper), q = i.offset(), n = i
									.outerWidth()
									- p.sizeDiff.width, j = i.outerHeight()
									- p.sizeDiff.height;
							if (p._helper && !f.animate
									&& (/relative/).test(g.css("position"))) {
								c(this).css( {
									left : q.left - d.left - l.left,
									width : n,
									height : j
								})
							}
							if (p._helper && !f.animate
									&& (/static/).test(g.css("position"))) {
								c(this).css( {
									left : q.left - d.left - l.left,
									width : n,
									height : j
								})
							}
						}
					});
	c.ui.plugin.add("resizable", "ghost", {
		start : function(f, g) {
			var d = c(this).data("resizable"), h = d.options, e = d.size;
			d.ghost = d.originalElement.clone();
			d.ghost.css( {
				opacity : 0.25,
				display : "block",
				position : "relative",
				height : e.height,
				width : e.width,
				margin : 0,
				left : 0,
				top : 0
			}).addClass("ui-resizable-ghost").addClass(
					typeof h.ghost == "string" ? h.ghost : "");
			d.ghost.appendTo(d.helper)
		},
		resize : function(e, f) {
			var d = c(this).data("resizable"), g = d.options;
			if (d.ghost) {
				d.ghost.css( {
					position : "relative",
					height : d.size.height,
					width : d.size.width
				})
			}
		},
		stop : function(e, f) {
			var d = c(this).data("resizable"), g = d.options;
			if (d.ghost && d.helper) {
				d.helper.get(0).removeChild(d.ghost.get(0))
			}
		}
	});
	c.ui.plugin
			.add(
					"resizable",
					"grid",
					{
						resize : function(d, l) {
							var n = c(this).data("resizable"), g = n.options, j = n.size, h = n.originalSize, i = n.originalPosition, m = n.axis, k = g._aspectRatio
									|| d.shiftKey;
							g.grid = typeof g.grid == "number" ? [ g.grid,
									g.grid ] : g.grid;
							var f = Math.round((j.width - h.width)
									/ (g.grid[0] || 1))
									* (g.grid[0] || 1), e = Math
									.round((j.height - h.height)
											/ (g.grid[1] || 1))
									* (g.grid[1] || 1);
							if (/^(se|s|e)$/.test(m)) {
								n.size.width = h.width + f;
								n.size.height = h.height + e
							} else {
								if (/^(ne)$/.test(m)) {
									n.size.width = h.width + f;
									n.size.height = h.height + e;
									n.position.top = i.top - e
								} else {
									if (/^(sw)$/.test(m)) {
										n.size.width = h.width + f;
										n.size.height = h.height + e;
										n.position.left = i.left - f
									} else {
										n.size.width = h.width + f;
										n.size.height = h.height + e;
										n.position.top = i.top - e;
										n.position.left = i.left - f
									}
								}
							}
						}
					});
	var b = function(d) {
		return parseInt(d, 10) || 0
	};
	var a = function(d) {
		return !isNaN(parseInt(d, 10))
	}
})(jQuery);
(function(b) {
	var a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
	b
			.widget(
					"ui.dialog",
					{
						options : {
							autoOpen : true,
							buttons : {},
							closeOnEscape : true,
							closeText : "close",
							dialogClass : "",
							draggable : true,
							hide : null,
							height : "auto",
							maxHeight : false,
							maxWidth : false,
							minHeight : 150,
							minWidth : 150,
							modal : false,
							position : "center",
							resizable : true,
							show : null,
							stack : true,
							title : "",
							width : 300,
							zIndex : 1000
						},
						_create : function() {
							this.originalTitle = this.element.attr("title");
							var k = this, l = k.options, i = l.title
									|| k.originalTitle || "&#160;", d = b.ui.dialog
									.getTitleId(k.element), j = (k.uiDialog = b("<div></div>"))
									.appendTo(document.body)
									.hide()
									.addClass(a + l.dialogClass)
									.css( {
										zIndex : l.zIndex
									})
									.attr("tabIndex", -1)
									.css("outline", 0)
									.keydown(
											function(m) {
												if (l.closeOnEscape
														&& m.keyCode
														&& m.keyCode === b.ui.keyCode.ESCAPE) {
													k.close(m);
													m.preventDefault()
												}
											}).attr( {
										role : "dialog",
										"aria-labelledby" : d
									}).mousedown(function(m) {
										k.moveToTop(false, m)
									}), f = k.element
									.show()
									.removeAttr("title")
									.addClass(
											"ui-dialog-content ui-widget-content")
									.appendTo(j), e = (k.uiDialogTitlebar = b("<div></div>"))
									.addClass(
											"ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")
									.prependTo(j), h = b('<a href="#"></a>')
									.addClass(
											"ui-dialog-titlebar-close ui-corner-all")
									.attr("role", "button").hover(function() {
										h.addClass("ui-state-hover")
									}, function() {
										h.removeClass("ui-state-hover")
									}).focus(function() {
										h.addClass("ui-state-focus")
									}).blur(function() {
										h.removeClass("ui-state-focus")
									}).click(function(m) {
										k.close(m);
										return false
									}).appendTo(e), g = (k.uiDialogTitlebarCloseText = b("<span></span>"))
									.addClass("ui-icon ui-icon-closethick")
									.text(l.closeText).appendTo(h), c = b(
									"<span></span>")
									.addClass("ui-dialog-title").attr("id", d)
									.html(i).prependTo(e);
							if (b.isFunction(l.beforeclose)
									&& !b.isFunction(l.beforeClose)) {
								l.beforeClose = l.beforeclose
							}
							e.find("*").add(e).disableSelection();
							if (l.draggable && b.fn.draggable) {
								k._makeDraggable()
							}
							if (l.resizable && b.fn.resizable) {
								k._makeResizable()
							}
							k._createButtons(l.buttons);
							k._isOpen = false;
							if (b.fn.bgiframe) {
								j.bgiframe()
							}
						},
						_init : function() {
							if (this.options.autoOpen) {
								this.open()
							}
						},
						destroy : function() {
							var c = this;
							if (c.overlay) {
								c.overlay.destroy()
							}
							c.uiDialog.hide();
							c.element
									.unbind(".dialog")
									.removeData("dialog")
									.removeClass(
											"ui-dialog-content ui-widget-content")
									.hide().appendTo("body");
							c.uiDialog.remove();
							if (c.originalTitle) {
								c.element.attr("title", c.originalTitle)
							}
							return c
						},
						widget : function() {
							return this.uiDialog
						},
						close : function(e) {
							var c = this, d;
							if (false === c._trigger("beforeClose", e)) {
								return
							}
							if (c.overlay) {
								c.overlay.destroy()
							}
							c.uiDialog.unbind("keypress.ui-dialog");
							c._isOpen = false;
							if (c.options.hide) {
								c.uiDialog.hide(c.options.hide, function() {
									c._trigger("close", e)
								})
							} else {
								c.uiDialog.hide();
								c._trigger("close", e)
							}
							b.ui.dialog.overlay.resize();
							if (c.options.modal) {
								d = 0;
								b(".ui-dialog").each(function() {
									if (this !== c.uiDialog[0]) {
										d = Math.max(d, b(this).css("z-index"))
									}
								});
								b.ui.dialog.maxZ = d
							}
							return c
						},
						isOpen : function() {
							return this._isOpen
						},
						moveToTop : function(g, f) {
							var c = this, e = c.options, d;
							if ((e.modal && !g) || (!e.stack && !e.modal)) {
								return c._trigger("focus", f)
							}
							if (e.zIndex > b.ui.dialog.maxZ) {
								b.ui.dialog.maxZ = e.zIndex
							}
							if (c.overlay) {
								b.ui.dialog.maxZ += 1;
								c.overlay.$el
										.css(
												"z-index",
												b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
							}
							d = {
								scrollTop : c.element.attr("scrollTop"),
								scrollLeft : c.element.attr("scrollLeft")
							};
							b.ui.dialog.maxZ += 1;
							c.uiDialog.css("z-index", b.ui.dialog.maxZ);
							c.element.attr(d);
							c._trigger("focus", f);
							return c
						},
						open : function() {
							if (this._isOpen) {
								return
							}
							var d = this, e = d.options, c = d.uiDialog;
							d.overlay = e.modal ? new b.ui.dialog.overlay(d)
									: null;
							if (c.next().length) {
								c.appendTo("body")
							}
							d._size();
							d._position(e.position);
							c.show(e.show);
							d.moveToTop(true);
							if (e.modal) {
								c.bind("keypress.ui-dialog", function(h) {
									if (h.keyCode !== b.ui.keyCode.TAB) {
										return
									}
									var g = b(":tabbable", this), i = g
											.filter(":first"), f = g
											.filter(":last");
									if (h.target === f[0] && !h.shiftKey) {
										i.focus(1);
										return false
									} else {
										if (h.target === i[0] && h.shiftKey) {
											f.focus(1);
											return false
										}
									}
								})
							}
							b( [])
									.add(
											c
													.find(".ui-dialog-content :tabbable:first"))
									.add(
											c
													.find(".ui-dialog-buttonpane :tabbable:first"))
									.add(c).filter(":first").focus();
							d._trigger("open");
							d._isOpen = true;
							return d
						},
						_createButtons : function(f) {
							var e = this, c = false, d = b("<div></div>")
									.addClass(
											"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
							e.uiDialog.find(".ui-dialog-buttonpane").remove();
							if (typeof f === "object" && f !== null) {
								b.each(f, function() {
									return !(c = true)
								})
							}
							if (c) {
								b
										.each(
												f,
												function(g, i) {
													var h = b(
															'<button type="button"></button>')
															.text(g)
															.click(
																	function() {
																		i
																				.apply(
																						e.element[0],
																						arguments)
																	})
															.appendTo(d);
													if (b.fn.button) {
														h.button()
													}
												});
								d.appendTo(e.uiDialog)
							}
						},
						_makeDraggable : function() {
							var c = this, f = c.options, g = b(document), e;
							function d(h) {
								return {
									position : h.position,
									offset : h.offset
								}
							}
							c.uiDialog
									.draggable( {
										cancel : ".ui-dialog-content, .ui-dialog-titlebar-close",
										handle : ".ui-dialog-titlebar",
										containment : "document",
										start : function(h, i) {
											e = f.height === "auto" ? "auto"
													: b(this).height();
											b(this)
													.height(b(this).height())
													.addClass(
															"ui-dialog-dragging");
											c._trigger("dragStart", h, d(i))
										},
										drag : function(h, i) {
											c._trigger("drag", h, d(i))
										},
										stop : function(h, i) {
											f.position = [
													i.position.left
															- g.scrollLeft(),
													i.position.top
															- g.scrollTop() ];
											b(this).removeClass(
													"ui-dialog-dragging")
													.height(e);
											c._trigger("dragStop", h, d(i));
											b.ui.dialog.overlay.resize()
										}
									})
						},
						_makeResizable : function(h) {
							h = (h === undefined ? this.options.resizable : h);
							var d = this, g = d.options, c = d.uiDialog
									.css("position"), f = (typeof h === "string" ? h
									: "n,e,s,w,se,sw,ne,nw");
							function e(i) {
								return {
									originalPosition : i.originalPosition,
									originalSize : i.originalSize,
									position : i.position,
									size : i.size
								}
							}
							d.uiDialog.resizable( {
								cancel : ".ui-dialog-content",
								containment : "document",
								alsoResize : d.element,
								maxWidth : g.maxWidth,
								maxHeight : g.maxHeight,
								minWidth : g.minWidth,
								minHeight : d._minHeight(),
								handles : f,
								start : function(i, j) {
									b(this).addClass("ui-dialog-resizing");
									d._trigger("resizeStart", i, e(j))
								},
								resize : function(i, j) {
									d._trigger("resize", i, e(j))
								},
								stop : function(i, j) {
									b(this).removeClass("ui-dialog-resizing");
									g.height = b(this).height();
									g.width = b(this).width();
									d._trigger("resizeStop", i, e(j));
									b.ui.dialog.overlay.resize()
								}
							}).css("position", c).find(".ui-resizable-se")
									.addClass(
											"ui-icon ui-icon-grip-diagonal-se")
						},
						_minHeight : function() {
							var c = this.options;
							if (c.height === "auto") {
								return c.minHeight
							} else {
								return Math.min(c.minHeight, c.height)
							}
						},
						_position : function(d) {
							var e = [], f = [ 0, 0 ], c;
							d = d || b.ui.dialog.prototype.options.position;
							if (typeof d === "string"
									|| (typeof d === "object" && "0" in d)) {
								e = d.split ? d.split(" ") : [ d[0], d[1] ];
								if (e.length === 1) {
									e[1] = e[0]
								}
								b.each( [ "left", "top" ], function(h, g) {
									if (+e[h] === e[h]) {
										f[h] = e[h];
										e[h] = g
									}
								})
							} else {
								if (typeof d === "object") {
									if ("left" in d) {
										e[0] = "left";
										f[0] = d.left
									} else {
										if ("right" in d) {
											e[0] = "right";
											f[0] = -d.right
										}
									}
									if ("top" in d) {
										e[1] = "top";
										f[1] = d.top
									} else {
										if ("bottom" in d) {
											e[1] = "bottom";
											f[1] = -d.bottom
										}
									}
								}
							}
							c = this.uiDialog.is(":visible");
							if (!c) {
								this.uiDialog.show()
							}
							this.uiDialog.css( {
								top : 0,
								left : 0
							}).position( {
								my : e.join(" "),
								at : e.join(" "),
								offset : f.join(" "),
								of : window,
								collision : "fit",
								using : function(h) {
									var g = b(this).css(h).offset().top;
									if (g < 0) {
										b(this).css("top", h.top - g)
									}
								}
							});
							if (!c) {
								this.uiDialog.hide()
							}
						},
						_setOption : function(f, g) {
							var d = this, c = d.uiDialog, h = c
									.is(":data(resizable)"), e = false;
							switch (f) {
							case "beforeclose":
								f = "beforeClose";
								break;
							case "buttons":
								d._createButtons(g);
								break;
							case "closeText":
								d.uiDialogTitlebarCloseText.text("" + g);
								break;
							case "dialogClass":
								c.removeClass(d.options.dialogClass).addClass(
										a + g);
								break;
							case "disabled":
								if (g) {
									c.addClass("ui-dialog-disabled")
								} else {
									c.removeClass("ui-dialog-disabled")
								}
								break;
							case "draggable":
								if (g) {
									d._makeDraggable()
								} else {
									c.draggable("destroy")
								}
								break;
							case "height":
								e = true;
								break;
							case "maxHeight":
								if (h) {
									c.resizable("option", "maxHeight", g)
								}
								e = true;
								break;
							case "maxWidth":
								if (h) {
									c.resizable("option", "maxWidth", g)
								}
								e = true;
								break;
							case "minHeight":
								if (h) {
									c.resizable("option", "minHeight", g)
								}
								e = true;
								break;
							case "minWidth":
								if (h) {
									c.resizable("option", "minWidth", g)
								}
								e = true;
								break;
							case "position":
								d._position(g);
								break;
							case "resizable":
								if (h && !g) {
									c.resizable("destroy")
								}
								if (h && typeof g === "string") {
									c.resizable("option", "handles", g)
								}
								if (!h && g !== false) {
									d._makeResizable(g)
								}
								break;
							case "title":
								b(".ui-dialog-title", d.uiDialogTitlebar).html(
										"" + (g || "&#160;"));
								break;
							case "width":
								e = true;
								break
							}
							b.Widget.prototype._setOption.apply(d, arguments);
							if (e) {
								d._size()
							}
						},
						_size : function() {
							var d = this.options, c;
							this.element.css("width", "auto").hide();
							c = this.uiDialog.css( {
								height : "auto",
								width : d.width
							}).height();
							this.element.css(d.height === "auto" ? {
								minHeight : Math.max(d.minHeight - c, 0),
								height : "auto"
							} : {
								minHeight : 0,
								height : Math.max(d.height - c, 0)
							}).show();
							if (this.uiDialog.is(":data(resizable)")) {
								this.uiDialog.resizable("option", "minHeight",
										this._minHeight())
							}
						}
					});
	b.extend(b.ui.dialog, {
		version : "@VERSION",
		uuid : 0,
		maxZ : 0,
		getTitleId : function(c) {
			var d = c.attr("id");
			if (!d) {
				this.uuid += 1;
				d = this.uuid
			}
			return "ui-dialog-title-" + d
		},
		overlay : function(c) {
			this.$el = b.ui.dialog.overlay.create(c)
		}
	});
	b
			.extend(
					b.ui.dialog.overlay,
					{
						instances : [],
						oldInstances : [],
						maxZ : 0,
						events : b.map(
								"focus,mousedown,mouseup,keydown,keypress,click"
										.split(","), function(c) {
									return c + ".dialog-overlay"
								}).join(" "),
						create : function(d) {
							if (this.instances.length === 0) {
								setTimeout(
										function() {
											if (b.ui.dialog.overlay.instances.length) {
												b(document)
														.bind(
																b.ui.dialog.overlay.events,
																function(e) {
																	return (b(
																			e.target)
																			.zIndex() >= b.ui.dialog.overlay.maxZ)
																})
											}
										}, 1);
								b(document)
										.bind(
												"keydown.dialog-overlay",
												function(e) {
													if (d.options.closeOnEscape
															&& e.keyCode
															&& e.keyCode === b.ui.keyCode.ESCAPE) {
														d.close(e);
														e.preventDefault()
													}
												});
								b(window).bind("resize.dialog-overlay",
										b.ui.dialog.overlay.resize)
							}
							var c = (this.oldInstances.pop() || b("<div></div>")
									.addClass("ui-widget-overlay")).appendTo(
									document.body).css( {
								width : this.width(),
								height : this.height()
							});
							if (b.fn.bgiframe) {
								c.bgiframe()
							}
							this.instances.push(c);
							return c
						},
						destroy : function(c) {
							this.oldInstances.push(this.instances.splice(b
									.inArray(c, this.instances), 1)[0]);
							if (this.instances.length === 0) {
								b( [ document, window ]).unbind(
										".dialog-overlay")
							}
							c.remove();
							var d = 0;
							b.each(this.instances, function() {
								d = Math.max(d, this.css("z-index"))
							});
							this.maxZ = d
						},
						height : function() {
							var d, c;
							if (b.browser.msie && b.browser.version < 7) {
								d = Math.max(
										document.documentElement.scrollHeight,
										document.body.scrollHeight);
								c = Math.max(
										document.documentElement.offsetHeight,
										document.body.offsetHeight);
								if (d < c) {
									return b(window).height() + "px"
								} else {
									return d + "px"
								}
							} else {
								return b(document).height() + "px"
							}
						},
						width : function() {
							var c, d;
							if (b.browser.msie && b.browser.version < 7) {
								c = Math.max(
										document.documentElement.scrollWidth,
										document.body.scrollWidth);
								d = Math.max(
										document.documentElement.offsetWidth,
										document.body.offsetWidth);
								if (c < d) {
									return b(window).width() + "px"
								} else {
									return c + "px"
								}
							} else {
								return b(document).width() + "px"
							}
						},
						resize : function() {
							var c = b( []);
							b.each(b.ui.dialog.overlay.instances, function() {
								c = c.add(this)
							});
							c.css( {
								width : 0,
								height : 0
							}).css( {
								width : b.ui.dialog.overlay.width(),
								height : b.ui.dialog.overlay.height()
							})
						}
					});
	b.extend(b.ui.dialog.overlay.prototype, {
		destroy : function() {
			b.ui.dialog.overlay.destroy(this.$el)
		}
	})
}(jQuery));
jQuery.effects
		|| (function(g) {
			g.effects = {};
			g.each( [ "backgroundColor", "borderBottomColor",
					"borderLeftColor", "borderRightColor", "borderTopColor",
					"color", "outlineColor" ], function(l, k) {
				g.fx.step[k] = function(m) {
					if (!m.colorInit) {
						m.start = j(m.elem, k);
						m.end = i(m.end);
						m.colorInit = true
					}
					m.elem.style[k] = "rgb("
							+ Math.max(Math.min(parseInt(
									(m.pos * (m.end[0] - m.start[0]))
											+ m.start[0], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(parseInt(
									(m.pos * (m.end[1] - m.start[1]))
											+ m.start[1], 10), 255), 0)
							+ ","
							+ Math.max(Math.min(parseInt(
									(m.pos * (m.end[2] - m.start[2]))
											+ m.start[2], 10), 255), 0) + ")"
				}
			});
			function i(l) {
				var k;
				if (l && l.constructor == Array && l.length == 3) {
					return l
				}
				if (k = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
						.exec(l)) {
					return [ parseInt(k[1], 10), parseInt(k[2], 10),
							parseInt(k[3], 10) ]
				}
				if (k = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
						.exec(l)) {
					return [ parseFloat(k[1]) * 2.55, parseFloat(k[2]) * 2.55,
							parseFloat(k[3]) * 2.55 ]
				}
				if (k = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/
						.exec(l)) {
					return [ parseInt(k[1], 16), parseInt(k[2], 16),
							parseInt(k[3], 16) ]
				}
				if (k = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)) {
					return [ parseInt(k[1] + k[1], 16),
							parseInt(k[2] + k[2], 16),
							parseInt(k[3] + k[3], 16) ]
				}
				if (k = /rgba\(0, 0, 0, 0\)/.exec(l)) {
					return a.transparent
				}
				return a[g.trim(l).toLowerCase()]
			}
			function j(m, k) {
				var l;
				do {
					l = g.curCSS(m, k);
					if (l != "" && l != "transparent" || g.nodeName(m, "body")) {
						break
					}
					k = "backgroundColor"
				} while (m = m.parentNode);
				return i(l)
			}
			var a = {
				aqua : [ 0, 255, 255 ],
				azure : [ 240, 255, 255 ],
				beige : [ 245, 245, 220 ],
				black : [ 0, 0, 0 ],
				blue : [ 0, 0, 255 ],
				brown : [ 165, 42, 42 ],
				cyan : [ 0, 255, 255 ],
				darkblue : [ 0, 0, 139 ],
				darkcyan : [ 0, 139, 139 ],
				darkgrey : [ 169, 169, 169 ],
				darkgreen : [ 0, 100, 0 ],
				darkkhaki : [ 189, 183, 107 ],
				darkmagenta : [ 139, 0, 139 ],
				darkolivegreen : [ 85, 107, 47 ],
				darkorange : [ 255, 140, 0 ],
				darkorchid : [ 153, 50, 204 ],
				darkred : [ 139, 0, 0 ],
				darksalmon : [ 233, 150, 122 ],
				darkviolet : [ 148, 0, 211 ],
				fuchsia : [ 255, 0, 255 ],
				gold : [ 255, 215, 0 ],
				green : [ 0, 128, 0 ],
				indigo : [ 75, 0, 130 ],
				khaki : [ 240, 230, 140 ],
				lightblue : [ 173, 216, 230 ],
				lightcyan : [ 224, 255, 255 ],
				lightgreen : [ 144, 238, 144 ],
				lightgrey : [ 211, 211, 211 ],
				lightpink : [ 255, 182, 193 ],
				lightyellow : [ 255, 255, 224 ],
				lime : [ 0, 255, 0 ],
				magenta : [ 255, 0, 255 ],
				maroon : [ 128, 0, 0 ],
				navy : [ 0, 0, 128 ],
				olive : [ 128, 128, 0 ],
				orange : [ 255, 165, 0 ],
				pink : [ 255, 192, 203 ],
				purple : [ 128, 0, 128 ],
				violet : [ 128, 0, 128 ],
				red : [ 255, 0, 0 ],
				silver : [ 192, 192, 192 ],
				white : [ 255, 255, 255 ],
				yellow : [ 255, 255, 0 ],
				transparent : [ 255, 255, 255 ]
			};
			var e = [ "add", "remove", "toggle" ], c = {
				border : 1,
				borderBottom : 1,
				borderColor : 1,
				borderLeft : 1,
				borderRight : 1,
				borderTop : 1,
				borderWidth : 1,
				margin : 1,
				padding : 1
			};
			function f() {
				var n = document.defaultView ? document.defaultView
						.getComputedStyle(this, null) : this.currentStyle, o = {}, l, m;
				if (n && n.length && n[0] && n[n[0]]) {
					var k = n.length;
					while (k--) {
						l = n[k];
						if (typeof n[l] == "string") {
							m = l.replace(/\-(\w)/g, function(p, q) {
								return q.toUpperCase()
							});
							o[m] = n[l]
						}
					}
				} else {
					for (l in n) {
						if (typeof n[l] === "string") {
							o[l] = n[l]
						}
					}
				}
				return o
			}
			function b(l) {
				var k, m;
				for (k in l) {
					m = l[k];
					if (m == null || g.isFunction(m) || k in c
							|| (/scrollbar/).test(k)
							|| (!(/color/i).test(k) && isNaN(parseFloat(m)))) {
						delete l[k]
					}
				}
				return l
			}
			function h(k, m) {
				var n = {
					_ : 0
				}, l;
				for (l in m) {
					if (k[l] != m[l]) {
						n[l] = m[l]
					}
				}
				return n
			}
			g.effects.animateClass = function(k, l, n, m) {
				if (g.isFunction(n)) {
					m = n;
					n = null
				}
				return this.each(function() {
					var r = g(this), o = r.attr("style") || " ", s = b(f
							.call(this)), q, p = r.attr("className");
					g.each(e, function(t, u) {
						if (k[u]) {
							r[u + "Class"](k[u])
						}
					});
					q = b(f.call(this));
					r.attr("className", p);
					r.animate(h(s, q), l, n, function() {
						g.each(e, function(t, u) {
							if (k[u]) {
								r[u + "Class"](k[u])
							}
						});
						if (typeof r.attr("style") == "object") {
							r.attr("style").cssText = "";
							r.attr("style").cssText = o
						} else {
							r.attr("style", o)
						}
						if (m) {
							m.apply(this, arguments)
						}
					})
				})
			};
			g.fn.extend( {
				_addClass : g.fn.addClass,
				addClass : function(l, k, n, m) {
					return k ? g.effects.animateClass.apply(this, [ {
						add : l
					}, k, n, m ]) : this._addClass(l)
				},
				_removeClass : g.fn.removeClass,
				removeClass : function(l, k, n, m) {
					return k ? g.effects.animateClass.apply(this, [ {
						remove : l
					}, k, n, m ]) : this._removeClass(l)
				},
				_toggleClass : g.fn.toggleClass,
				toggleClass : function(m, l, k, o, n) {
					if (typeof l == "boolean" || l === undefined) {
						if (!k) {
							return this._toggleClass(m, l)
						} else {
							return g.effects.animateClass.apply(this, [ (l ? {
								add : m
							} : {
								remove : m
							}), k, o, n ])
						}
					} else {
						return g.effects.animateClass.apply(this, [ {
							toggle : m
						}, l, k, o ])
					}
				},
				switchClass : function(k, m, l, o, n) {
					return g.effects.animateClass.apply(this, [ {
						add : m,
						remove : k
					}, l, o, n ])
				}
			});
			g.extend(g.effects, {
				version : "@VERSION",
				save : function(l, m) {
					for ( var k = 0; k < m.length; k++) {
						if (m[k] !== null) {
							l.data("ec.storage." + m[k], l[0].style[m[k]])
						}
					}
				},
				restore : function(l, m) {
					for ( var k = 0; k < m.length; k++) {
						if (m[k] !== null) {
							l.css(m[k], l.data("ec.storage." + m[k]))
						}
					}
				},
				setMode : function(k, l) {
					if (l == "toggle") {
						l = k.is(":hidden") ? "show" : "hide"
					}
					return l
				},
				getBaseline : function(l, m) {
					var n, k;
					switch (l[0]) {
					case "top":
						n = 0;
						break;
					case "middle":
						n = 0.5;
						break;
					case "bottom":
						n = 1;
						break;
					default:
						n = l[0] / m.height
					}
					switch (l[1]) {
					case "left":
						k = 0;
						break;
					case "center":
						k = 0.5;
						break;
					case "right":
						k = 1;
						break;
					default:
						k = l[1] / m.width
					}
					return {
						x : k,
						y : n
					}
				},
				createWrapper : function(k) {
					if (k.parent().is(".ui-effects-wrapper")) {
						return k.parent()
					}
					var l = {
						width : k.outerWidth(true),
						height : k.outerHeight(true),
						"float" : k.css("float")
					}, m = g("<div></div>").addClass("ui-effects-wrapper").css(
							{
								fontSize : "100%",
								background : "transparent",
								border : "none",
								margin : 0,
								padding : 0
							});
					k.wrap(m);
					m = k.parent();
					if (k.css("position") == "static") {
						m.css( {
							position : "relative"
						});
						k.css( {
							position : "relative"
						})
					} else {
						g.extend(l, {
							position : k.css("position"),
							zIndex : k.css("z-index")
						});
						g.each( [ "top", "left", "bottom", "right" ], function(
								n, o) {
							l[o] = k.css(o);
							if (isNaN(parseInt(l[o], 10))) {
								l[o] = "auto"
							}
						});
						k.css( {
							position : "relative",
							top : 0,
							left : 0
						})
					}
					return m.css(l).show()
				},
				removeWrapper : function(k) {
					if (k.parent().is(".ui-effects-wrapper")) {
						return k.parent().replaceWith(k)
					}
					return k
				},
				setTransition : function(l, n, k, m) {
					m = m || {};
					g.each(n, function(p, o) {
						unit = l.cssUnit(o);
						if (unit[0] > 0) {
							m[o] = unit[0] * k + unit[1]
						}
					});
					return m
				}
			});
			function d(l, k, m, n) {
				if (typeof l == "object") {
					n = k;
					m = null;
					k = l;
					l = k.effect
				}
				if (g.isFunction(k)) {
					n = k;
					m = null;
					k = {}
				}
				if (g.isFunction(m)) {
					n = m;
					m = null
				}
				if (typeof k == "number" || g.fx.speeds[k]) {
					n = m;
					m = k;
					k = {}
				}
				k = k || {};
				m = m || k.duration;
				m = g.fx.off ? 0 : typeof m == "number" ? m : g.fx.speeds[m]
						|| g.fx.speeds._default;
				n = n || k.complete;
				return [ l, k, m, n ]
			}
			g.fn.extend( {
				effect : function(n, m, p, q) {
					var l = d.apply(this, arguments), o = {
						options : l[1],
						duration : l[2],
						callback : l[3]
					}, k = g.effects[n];
					return k && !g.fx.off ? k.call(this, o) : this
				},
				_show : g.fn.show,
				show : function(l) {
					if (!l || typeof l == "number" || g.fx.speeds[l]) {
						return this._show.apply(this, arguments)
					} else {
						var k = d.apply(this, arguments);
						k[1].mode = "show";
						return this.effect.apply(this, k)
					}
				},
				_hide : g.fn.hide,
				hide : function(l) {
					if (!l || typeof l == "number" || g.fx.speeds[l]) {
						return this._hide.apply(this, arguments)
					} else {
						var k = d.apply(this, arguments);
						k[1].mode = "hide";
						return this.effect.apply(this, k)
					}
				},
				__toggle : g.fn.toggle,
				toggle : function(l) {
					if (!l || typeof l == "number" || g.fx.speeds[l]
							|| typeof l == "boolean" || g.isFunction(l)) {
						return this.__toggle.apply(this, arguments)
					} else {
						var k = d.apply(this, arguments);
						k[1].mode = "toggle";
						return this.effect.apply(this, k)
					}
				},
				cssUnit : function(k) {
					var l = this.css(k), m = [];
					g.each( [ "em", "px", "%", "pt" ], function(n, o) {
						if (l.indexOf(o) > 0) {
							m = [ parseFloat(l), o ]
						}
					});
					return m
				}
			});
			g.easing.jswing = g.easing.swing;
			g
					.extend(
							g.easing,
							{
								def : "easeOutQuad",
								swing : function(l, m, k, o, n) {
									return g.easing[g.easing.def]
											(l, m, k, o, n)
								},
								easeInQuad : function(l, m, k, o, n) {
									return o * (m /= n) * m + k
								},
								easeOutQuad : function(l, m, k, o, n) {
									return -o * (m /= n) * (m - 2) + k
								},
								easeInOutQuad : function(l, m, k, o, n) {
									if ((m /= n / 2) < 1) {
										return o / 2 * m * m + k
									}
									return -o / 2 * ((--m) * (m - 2) - 1) + k
								},
								easeInCubic : function(l, m, k, o, n) {
									return o * (m /= n) * m * m + k
								},
								easeOutCubic : function(l, m, k, o, n) {
									return o * ((m = m / n - 1) * m * m + 1)
											+ k
								},
								easeInOutCubic : function(l, m, k, o, n) {
									if ((m /= n / 2) < 1) {
										return o / 2 * m * m * m + k
									}
									return o / 2 * ((m -= 2) * m * m + 2) + k
								},
								easeInQuart : function(l, m, k, o, n) {
									return o * (m /= n) * m * m * m + k
								},
								easeOutQuart : function(l, m, k, o, n) {
									return -o
											* ((m = m / n - 1) * m * m * m - 1)
											+ k
								},
								easeInOutQuart : function(l, m, k, o, n) {
									if ((m /= n / 2) < 1) {
										return o / 2 * m * m * m * m + k
									}
									return -o / 2 * ((m -= 2) * m * m * m - 2)
											+ k
								},
								easeInQuint : function(l, m, k, o, n) {
									return o * (m /= n) * m * m * m * m + k
								},
								easeOutQuint : function(l, m, k, o, n) {
									return o
											* ((m = m / n - 1) * m * m * m * m + 1)
											+ k
								},
								easeInOutQuint : function(l, m, k, o, n) {
									if ((m /= n / 2) < 1) {
										return o / 2 * m * m * m * m * m + k
									}
									return o / 2
											* ((m -= 2) * m * m * m * m + 2)
											+ k
								},
								easeInSine : function(l, m, k, o, n) {
									return -o * Math.cos(m / n * (Math.PI / 2))
											+ o + k
								},
								easeOutSine : function(l, m, k, o, n) {
									return o * Math.sin(m / n * (Math.PI / 2))
											+ k
								},
								easeInOutSine : function(l, m, k, o, n) {
									return -o / 2
											* (Math.cos(Math.PI * m / n) - 1)
											+ k
								},
								easeInExpo : function(l, m, k, o, n) {
									return (m == 0) ? k : o
											* Math.pow(2, 10 * (m / n - 1)) + k
								},
								easeOutExpo : function(l, m, k, o, n) {
									return (m == n) ? k + o : o
											* (-Math.pow(2, -10 * m / n) + 1)
											+ k
								},
								easeInOutExpo : function(l, m, k, o, n) {
									if (m == 0) {
										return k
									}
									if (m == n) {
										return k + o
									}
									if ((m /= n / 2) < 1) {
										return o / 2
												* Math.pow(2, 10 * (m - 1)) + k
									}
									return o / 2
											* (-Math.pow(2, -10 * --m) + 2) + k
								},
								easeInCirc : function(l, m, k, o, n) {
									return -o
											* (Math.sqrt(1 - (m /= n) * m) - 1)
											+ k
								},
								easeOutCirc : function(l, m, k, o, n) {
									return o
											* Math
													.sqrt(1 - (m = m / n - 1)
															* m) + k
								},
								easeInOutCirc : function(l, m, k, o, n) {
									if ((m /= n / 2) < 1) {
										return -o / 2
												* (Math.sqrt(1 - m * m) - 1)
												+ k
									}
									return o / 2
											* (Math.sqrt(1 - (m -= 2) * m) + 1)
											+ k
								},
								easeInElastic : function(l, n, k, u, r) {
									var o = 1.70158;
									var q = 0;
									var m = u;
									if (n == 0) {
										return k
									}
									if ((n /= r) == 1) {
										return k + u
									}
									if (!q) {
										q = r * 0.3
									}
									if (m < Math.abs(u)) {
										m = u;
										var o = q / 4
									} else {
										var o = q / (2 * Math.PI)
												* Math.asin(u / m)
									}
									return -(m * Math.pow(2, 10 * (n -= 1)) * Math
											.sin((n * r - o) * (2 * Math.PI)
													/ q))
											+ k
								},
								easeOutElastic : function(l, n, k, u, r) {
									var o = 1.70158;
									var q = 0;
									var m = u;
									if (n == 0) {
										return k
									}
									if ((n /= r) == 1) {
										return k + u
									}
									if (!q) {
										q = r * 0.3
									}
									if (m < Math.abs(u)) {
										m = u;
										var o = q / 4
									} else {
										var o = q / (2 * Math.PI)
												* Math.asin(u / m)
									}
									return m
											* Math.pow(2, -10 * n)
											* Math.sin((n * r - o)
													* (2 * Math.PI) / q) + u
											+ k
								},
								easeInOutElastic : function(l, n, k, u, r) {
									var o = 1.70158;
									var q = 0;
									var m = u;
									if (n == 0) {
										return k
									}
									if ((n /= r / 2) == 2) {
										return k + u
									}
									if (!q) {
										q = r * (0.3 * 1.5)
									}
									if (m < Math.abs(u)) {
										m = u;
										var o = q / 4
									} else {
										var o = q / (2 * Math.PI)
												* Math.asin(u / m)
									}
									if (n < 1) {
										return -0.5
												* (m
														* Math.pow(2,
																10 * (n -= 1)) * Math
														.sin((n * r - o)
																* (2 * Math.PI)
																/ q)) + k
									}
									return m
											* Math.pow(2, -10 * (n -= 1))
											* Math.sin((n * r - o)
													* (2 * Math.PI) / q) * 0.5
											+ u + k
								},
								easeInBack : function(l, m, k, p, o, n) {
									if (n == undefined) {
										n = 1.70158
									}
									return p * (m /= o) * m * ((n + 1) * m - n)
											+ k
								},
								easeOutBack : function(l, m, k, p, o, n) {
									if (n == undefined) {
										n = 1.70158
									}
									return p
											* ((m = m / o - 1) * m
													* ((n + 1) * m + n) + 1)
											+ k
								},
								easeInOutBack : function(l, m, k, p, o, n) {
									if (n == undefined) {
										n = 1.70158
									}
									if ((m /= o / 2) < 1) {
										return p
												/ 2
												* (m * m * (((n *= (1.525)) + 1)
														* m - n)) + k
									}
									return p
											/ 2
											* ((m -= 2)
													* m
													* (((n *= (1.525)) + 1) * m + n) + 2)
											+ k
								},
								easeInBounce : function(l, m, k, o, n) {
									return o
											- g.easing.easeOutBounce(l, n - m,
													0, o, n) + k
								},
								easeOutBounce : function(l, m, k, o, n) {
									if ((m /= n) < (1 / 2.75)) {
										return o * (7.5625 * m * m) + k
									} else {
										if (m < (2 / 2.75)) {
											return o
													* (7.5625
															* (m -= (1.5 / 2.75))
															* m + 0.75) + k
										} else {
											if (m < (2.5 / 2.75)) {
												return o
														* (7.5625
																* (m -= (2.25 / 2.75))
																* m + 0.9375)
														+ k
											} else {
												return o
														* (7.5625
																* (m -= (2.625 / 2.75))
																* m + 0.984375)
														+ k
											}
										}
									}
								},
								easeInOutBounce : function(l, m, k, o, n) {
									if (m < n / 2) {
										return g.easing.easeInBounce(l, m * 2,
												0, o, n)
												* 0.5 + k
									}
									return g.easing.easeOutBounce(l, m * 2 - n,
											0, o, n)
											* 0.5 + o * 0.5 + k
								}
							})
		})(jQuery);
(function(a) {
	a.effects.clip = function(b) {
		return this
				.queue(function() {
					var f = a(this), j = [ "position", "top", "left", "height",
							"width" ];
					var i = a.effects.setMode(f, b.options.mode || "hide");
					var k = b.options.direction || "vertical";
					a.effects.save(f, j);
					f.show();
					var c = a.effects.createWrapper(f).css( {
						overflow : "hidden"
					});
					var e = f[0].tagName == "IMG" ? c : f;
					var g = {
						size : (k == "vertical") ? "height" : "width",
						position : (k == "vertical") ? "top" : "left"
					};
					var d = (k == "vertical") ? e.height() : e.width();
					if (i == "show") {
						e.css(g.size, 0);
						e.css(g.position, d / 2)
					}
					var h = {};
					h[g.size] = i == "show" ? d : 0;
					h[g.position] = i == "show" ? 0 : d / 2;
					e.animate(h, {
						queue : false,
						duration : b.duration,
						easing : b.options.easing,
						complete : function() {
							if (i == "hide") {
								f.hide()
							}
							a.effects.restore(f, j);
							a.effects.removeWrapper(f);
							if (b.callback) {
								b.callback.apply(f[0], arguments)
							}
							f.dequeue()
						}
					})
				})
	}
})(jQuery);
var ddsmoothmenu = {
	transition : {
		overtime : 300,
		outtime : 300
	},
	showhidedelay : {
		showdelay : 100,
		hidedelay : 200
	},
	detectwebkit : navigator.userAgent.toLowerCase().indexOf("applewebkit") != -1,
	detectie6 : document.all && !window.XMLHttpRequest,
	buildmenu : function(i, f) {
		var h = ddsmoothmenu;
		var g = i("#" + f.mainmenuid + ">ul");
		g.find("ul").bgIframe( {
			opacity : true
		});
		if (f.click) {
			g.find("a").click(function() {
				var a = this;
				f.click(a)
			})
		}
		var j = g.find("ul").parent();
		j.hover(function(a) {
			i(this).children("a:eq(0)").addClass("selected")
		}, function(a) {
			i(this).children("a:eq(0)").removeClass("selected")
		});
		j
				.each(function(b) {
					var a = i(this).css( {
						zIndex : 100 - b
					});
					var c = i(this).find("ul:eq(0)").css( {
						display : "block"
					});
					c.data("timers", {});
					this._dimensions = {
						w : this.offsetWidth,
						h : this.offsetHeight,
						subulw : c.outerWidth(true) - 2,
						subulh : c.outerHeight()
					};
					this.istopheader = a.parents("ul").length == 1 ? true
							: false;
					c
							.css( {
								top : this.istopheader && f.orientation != "v" ? this._dimensions.h
										+ "px"
										: 0
							});
					a
							.hover(
									function(n) {
										var o = c;
										var m = a.get(0);
										var e = i(this).parents("div"), d = e
												.position().left
												+ e.outerWidth(true);
										clearTimeout(o.data("timers").hidetimer);
										o.data("timers").showtimer = setTimeout(
												function() {
													m._offsets = {
														left : a.offset().left,
														top : a.offset().top
													};
													var r = m.istopheader
															&& f.orientation != "v" ? 0
															: m._dimensions.w;
													r = (m._offsets.left
															+ r
															+ m._dimensions.subulw > d) ? (m.istopheader
															&& f.orientation != "v" ? -m._dimensions.subulw
															+ m._dimensions.w
															: -m._dimensions.w) - 2
															: r;
													if (o.queue().length <= 1) {
														if (o.parent()
																.hasClass(
																		"lvl0")) {
															var q = o
																	.parent(
																			"li")
																	.children(
																			"a"), p = q
																	.position("body"), l = p.left, k = p.top
																	+ q
																			.outerHeight(true);
															o
																	.css(
																			{
																				left : l
																						+ r
																						+ "px",
																				top : k
																						+ "px",
																				width : m._dimensions.subulw
																						+ "px"
																			})
																	.animate(
																			{
																				height : "show",
																				opacity : "show"
																			},
																			ddsmoothmenu.transition.overtime)
														} else {
															o
																	.css(
																			{
																				left : r
																						+ "px",
																				width : m._dimensions.subulw
																						+ "px"
																			})
																	.animate(
																			{
																				height : "show",
																				opacity : "show"
																			},
																			ddsmoothmenu.transition.overtime)
														}
													}
												},
												ddsmoothmenu.showhidedelay.showdelay)
									},
									function(e) {
										var m = c;
										var d = a.get(0);
										clearTimeout(m.data("timers").showtimer);
										m.data("timers").hidetimer = setTimeout(
												function() {
													m
															.animate(
																	{
																		height : "hide",
																		opacity : "hide"
																	},
																	ddsmoothmenu.transition.outtime)
												},
												ddsmoothmenu.showhidedelay.hidedelay)
									})
				});
		g.find("ul").css( {
			display : "none",
			visibility : "visible"
		})
	},
	init : function(f) {
		if (typeof f.customtheme == "object" && f.customtheme.length == 2) {
			var d = "#" + f.mainmenuid;
			var e = (f.orientation == "v") ? d : d + ", " + d;
			document.write('<style type="text/css">\n' + e
					+ " ul li a {background:" + f.customtheme[0] + ";}\n" + d
					+ " ul li a:hover {background:" + f.customtheme[1]
					+ ";}\n</style>")
		}
		jQuery(document).ready(function(a) {
			ddsmoothmenu.buildmenu(a, f)
		})
	}
};
