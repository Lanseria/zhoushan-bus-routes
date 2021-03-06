!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t["wx-promise-request"] = t["wx-promise-request"] || {});
}(this, function (t) {
  "use strict";
  function e() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
  }function n(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
  }function r(t, e) {
    return e = { exports: {} }, t(e, e.exports), e.exports;
  }function o(t, e, n, r) {
    for (var o = t.length, u = n + (r ? 1 : -1); r ? u-- : ++u < o;) if (e(t[u], u, t)) return u;return -1;
  }function u(t) {
    return t !== t;
  }function i(t, e, n) {
    for (var r = n - 1, o = t.length; ++r < o;) if (t[r] === e) return r;return -1;
  }function s(t, e, n) {
    return e === e ? p(t, e, n) : h(t, d, n);
  }function a() {}function c(t) {
    var e = typeof t;return null != t && ("object" == e || "function" == e);
  }var f = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
      l = r(function (t, n) {
    !function (n, r) {
      t.exports = function () {
        function t(t) {
          var e = typeof t;return null !== t && ("object" === e || "function" === e);
        }function n(t) {
          return "function" == typeof t;
        }function r(t) {
          z = t;
        }function o(t) {
          K = t;
        }function u() {
          return void 0 !== D ? function () {
            D(s);
          } : i();
        }function i() {
          var t = setTimeout;return function () {
            return t(s, 1);
          };
        }function s() {
          for (var t = 0; t < B; t += 2) {
            (0, Q[t])(Q[t + 1]), Q[t] = void 0, Q[t + 1] = void 0;
          }B = 0;
        }function a(t, e) {
          var n = this,
              r = new this.constructor(l);void 0 === r[V] && S(r);var o = n._state;if (o) {
            var u = arguments[o - 1];K(function () {
              return M(o, r, u, n._result);
            });
          } else k(n, r, t, e);return r;
        }function c(t) {
          var e = this;if (t && "object" == typeof t && t.constructor === e) return t;var n = new e(l);return b(n, t), n;
        }function l() {}function h() {
          return new TypeError("You cannot resolve a promise with itself");
        }function d() {
          return new TypeError("A promises callback cannot return that same promise.");
        }function p(t) {
          try {
            return t.then;
          } catch (t) {
            return tt.error = t, tt;
          }
        }function v(t, e, n, r) {
          try {
            t.call(e, n, r);
          } catch (t) {
            return t;
          }
        }function y(t, e, n) {
          K(function (t) {
            var r = !1,
                o = v(n, e, function (n) {
              r || (r = !0, e !== n ? b(t, n) : w(t, n));
            }, function (e) {
              r || (r = !0, x(t, e));
            }, "Settle: " + (t._label || " unknown promise"));!r && o && (r = !0, x(t, o));
          }, t);
        }function _(t, e) {
          e._state === Z ? w(t, e._result) : e._state === $ ? x(t, e._result) : k(e, void 0, function (e) {
            return b(t, e);
          }, function (e) {
            return x(t, e);
          });
        }function m(t, e, r) {
          e.constructor === t.constructor && r === a && e.constructor.resolve === c ? _(t, e) : r === tt ? (x(t, tt.error), tt.error = null) : void 0 === r ? w(t, e) : n(r) ? y(t, e, r) : w(t, e);
        }function b(e, n) {
          e === n ? x(e, h()) : t(n) ? m(e, n, p(n)) : w(e, n);
        }function g(t) {
          t._onerror && t._onerror(t._result), A(t);
        }function w(t, e) {
          t._state === X && (t._result = e, t._state = Z, 0 !== t._subscribers.length && K(A, t));
        }function x(t, e) {
          t._state === X && (t._state = $, t._result = e, K(g, t));
        }function k(t, e, n, r) {
          var o = t._subscribers,
              u = o.length;t._onerror = null, o[u] = e, o[u + Z] = n, o[u + $] = r, 0 === u && t._state && K(A, t);
        }function A(t) {
          var e = t._subscribers,
              n = t._state;if (0 !== e.length) {
            for (var r = void 0, o = void 0, u = t._result, i = 0; i < e.length; i += 3) r = e[i], o = e[i + n], r ? M(n, r, o, u) : o(u);t._subscribers.length = 0;
          }
        }function j(t, e) {
          try {
            return t(e);
          } catch (t) {
            return tt.error = t, tt;
          }
        }function M(t, e, r, o) {
          var u = n(r),
              i = void 0,
              s = void 0,
              a = void 0,
              c = void 0;if (u) {
            if (i = j(r, o), i === tt ? (c = !0, s = i.error, i.error = null) : a = !0, e === i) return void x(e, d());
          } else i = o, a = !0;e._state !== X || (u && a ? b(e, i) : c ? x(e, s) : t === Z ? w(e, i) : t === $ && x(e, i));
        }function O(t, e) {
          try {
            e(function (e) {
              b(t, e);
            }, function (e) {
              x(t, e);
            });
          } catch (e) {
            x(t, e);
          }
        }function P() {
          return et++;
        }function S(t) {
          t[V] = et++, t._state = void 0, t._result = void 0, t._subscribers = [];
        }function E() {
          return new Error("Array Methods must be provided an Array");
        }function T(t) {
          return new nt(this, t).promise;
        }function C(t) {
          var e = this;return new e(Y(t) ? function (n, r) {
            for (var o = t.length, u = 0; u < o; u++) e.resolve(t[u]).then(n, r);
          } : function (t, e) {
            return e(new TypeError("You must pass an array to race."));
          });
        }function q(t) {
          var e = this,
              n = new e(l);return x(n, t), n;
        }function L() {
          throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
        }function I() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }function F() {
          var t = void 0;if (void 0 !== f) t = f;else if ("undefined" != typeof self) t = self;else try {
            t = Function("return this")();
          } catch (t) {
            throw new Error("polyfill failed because global object is unavailable in this environment");
          }var e = t.Promise;if (e) {
            var n = null;try {
              n = Object.prototype.toString.call(e.resolve());
            } catch (t) {}if ("[object Promise]" === n && !e.cast) return;
          }t.Promise = rt;
        }var N = void 0;N = Array.isArray ? Array.isArray : function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };var Y = N,
            B = 0,
            D = void 0,
            z = void 0,
            K = function (t, e) {
          Q[B] = t, Q[B + 1] = e, 2 === (B += 2) && (z ? z(s) : R());
        },
            U = "undefined" != typeof window ? window : void 0,
            W = U || {},
            G = W.MutationObserver || W.WebKitMutationObserver,
            H = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
            Q = new Array(1e3),
            R = void 0;R = H ? function () {
          return function () {
            return process.nextTick(s);
          };
        }() : G ? function () {
          var t = 0,
              e = new G(s),
              n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
            n.data = t = ++t % 2;
          };
        }() : J ? function () {
          var t = new MessageChannel();return t.port1.onmessage = s, function () {
            return t.port2.postMessage(0);
          };
        }() : void 0 === U && "function" == typeof e ? function () {
          try {
            var t = Function("return this")().require("vertx");return D = t.runOnLoop || t.runOnContext, u();
          } catch (t) {
            return i();
          }
        }() : i();var V = Math.random().toString(36).substring(2),
            X = void 0,
            Z = 1,
            $ = 2,
            tt = { error: null },
            et = 0,
            nt = function () {
          function t(t, e) {
            this._instanceConstructor = t, this.promise = new t(l), this.promise[V] || S(this.promise), Y(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? w(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && w(this.promise, this._result))) : x(this.promise, E());
          }return t.prototype._enumerate = function (t) {
            for (var e = 0; this._state === X && e < t.length; e++) this._eachEntry(t[e], e);
          }, t.prototype._eachEntry = function (t, e) {
            var n = this._instanceConstructor,
                r = n.resolve;if (r === c) {
              var o = p(t);if (o === a && t._state !== X) this._settledAt(t._state, e, t._result);else if ("function" != typeof o) this._remaining--, this._result[e] = t;else if (n === rt) {
                var u = new n(l);m(u, t, o), this._willSettleAt(u, e);
              } else this._willSettleAt(new n(function (e) {
                return e(t);
              }), e);
            } else this._willSettleAt(r(t), e);
          }, t.prototype._settledAt = function (t, e, n) {
            var r = this.promise;r._state === X && (this._remaining--, t === $ ? x(r, n) : this._result[e] = n), 0 === this._remaining && w(r, this._result);
          }, t.prototype._willSettleAt = function (t, e) {
            var n = this;k(t, void 0, function (t) {
              return n._settledAt(Z, e, t);
            }, function (t) {
              return n._settledAt($, e, t);
            });
          }, t;
        }(),
            rt = function () {
          function t(e) {
            this[V] = P(), this._result = this._state = void 0, this._subscribers = [], l !== e && ("function" != typeof e && L(), this instanceof t ? O(this, e) : I());
          }return t.prototype.catch = function (t) {
            return this.then(null, t);
          }, t.prototype.finally = function (t) {
            var e = this,
                n = e.constructor;return e.then(function (e) {
              return n.resolve(t()).then(function () {
                return e;
              });
            }, function (e) {
              return n.resolve(t()).then(function () {
                throw e;
              });
            });
          }, t;
        }();return rt.prototype.then = a, rt.all = T, rt.race = C, rt.resolve = c, rt.reject = q, rt._setScheduler = r, rt._setAsap = o, rt._asap = K, rt.polyfill = F, rt.Promise = rt, rt;
      }();
    }();
  }),
      h = o,
      d = u,
      p = i,
      v = s,
      y = Array.isArray,
      _ = y,
      m = a,
      b = r(function (t, e) {
    function n(t) {
      return function () {
        if (null === t) throw new Error("Callback was already called.");var e = t;t = null, e.apply(this, arguments);
      };
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = n, t.exports = e.default;
  });n(b);var g = r(function (t, e) {
    function n(t, e) {
      e |= 0;for (var n = Math.max(t.length - e, 0), r = Array(n), o = 0; o < n; o++) r[o] = t[e + o];return r;
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = n, t.exports = e.default;
  });n(g);var w = r(function (t, e) {
    function n(t) {
      setTimeout(t, 0);
    }function r(t) {
      return function (e) {
        var n = (0, u.default)(arguments, 1);t(function () {
          e.apply(null, n);
        });
      };
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.hasNextTick = e.hasSetImmediate = void 0, e.fallback = n, e.wrap = r;var o,
        u = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(g),
        i = e.hasSetImmediate = "function" == typeof setImmediate && setImmediate,
        s = e.hasNextTick = "object" == typeof process && "function" == typeof process.nextTick;o = i ? setImmediate : s ? process.nextTick : n, e.default = r(o);
  });n(w);var x = r(function (t, e) {
    function n() {
      this.head = this.tail = null, this.length = 0;
    }function r(t, e) {
      t.length = 1, t.head = t.tail = e;
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = n, n.prototype.removeLink = function (t) {
      return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, t.prev = t.next = null, this.length -= 1, t;
    }, n.prototype.empty = function () {
      for (; this.head;) this.shift();return this;
    }, n.prototype.insertAfter = function (t, e) {
      e.prev = t, e.next = t.next, t.next ? t.next.prev = e : this.tail = e, t.next = e, this.length += 1;
    }, n.prototype.insertBefore = function (t, e) {
      e.prev = t.prev, e.next = t, t.prev ? t.prev.next = e : this.head = e, t.prev = e, this.length += 1;
    }, n.prototype.unshift = function (t) {
      this.head ? this.insertBefore(this.head, t) : r(this, t);
    }, n.prototype.push = function (t) {
      this.tail ? this.insertAfter(this.tail, t) : r(this, t);
    }, n.prototype.shift = function () {
      return this.head && this.removeLink(this.head);
    }, n.prototype.pop = function () {
      return this.tail && this.removeLink(this.tail);
    }, n.prototype.toArray = function () {
      for (var t = Array(this.length), e = this.head, n = 0; n < this.length; n++) t[n] = e.data, e = e.next;return t;
    }, n.prototype.remove = function (t) {
      for (var e = this.head; e;) {
        var n = e.next;t(e) && this.removeLink(e), e = n;
      }return this;
    }, t.exports = e.default;
  });n(x);var k = c,
      A = r(function (t, e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t) {
      return function () {
        var e = (0, n.default)(arguments),
            r = e.pop();t.call(this, e, r);
      };
    };var n = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(g);t.exports = e.default;
  });n(A);var j = r(function (t, e) {
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }function r(t) {
      return (0, s.default)(function (e, n) {
        var r;try {
          r = t.apply(this, e);
        } catch (t) {
          return n(t);
        }(0, i.default)(r) && "function" == typeof r.then ? r.then(function (t) {
          o(n, null, t);
        }, function (t) {
          o(n, t.message ? t : new Error(t));
        }) : n(null, r);
      });
    }function o(t, e, n) {
      try {
        t(e, n);
      } catch (t) {
        (0, a.default)(u, t);
      }
    }function u(t) {
      throw t;
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;var i = n(k),
        s = n(A),
        a = n(w);t.exports = e.default;
  });n(j);var M = r(function (t, e) {
    function n(t) {
      return u && "AsyncFunction" === t[Symbol.toStringTag];
    }function r(t) {
      return n(t) ? (0, o.default)(t) : t;
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.isAsync = void 0;var o = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(j),
        u = "function" == typeof Symbol;e.default = r, e.isAsync = n;
  });n(M);var O = r(function (t, e) {
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }function r(t, e, n) {
      function r(t, e, n) {
        if (null != n && "function" != typeof n) throw new Error("task callback must be a function");if (_.started = !0, (0, u.default)(t) || (t = [t]), 0 === t.length && _.idle()) return (0, a.default)(function () {
          _.drain();
        });for (var r = 0, o = t.length; r < o; r++) {
          var s = { data: t[r], callback: n || i.default };e ? _._tasks.unshift(s) : _._tasks.push(s);
        }v || (v = !0, (0, a.default)(function () {
          v = !1, _.process();
        }));
      }function l(t) {
        return function (e) {
          d -= 1;for (var n = 0, r = t.length; n < r; n++) {
            var u = t[n],
                i = (0, o.default)(p, u, 0);0 === i ? p.shift() : i > 0 && p.splice(i, 1), u.callback.apply(u, arguments), null != e && _.error(e, u.data);
          }d <= _.concurrency - _.buffer && _.unsaturated(), _.idle() && _.drain(), _.process();
        };
      }if (null == e) e = 1;else if (0 === e) throw new Error("Concurrency must not be zero");var h = (0, f.default)(t),
          d = 0,
          p = [],
          v = !1,
          y = !1,
          _ = { _tasks: new c.default(), concurrency: e, payload: n, saturated: i.default, unsaturated: i.default, buffer: e / 4, empty: i.default, drain: i.default, error: i.default, started: !1, paused: !1, push: function (t, e) {
          r(t, !1, e);
        }, kill: function () {
          _.drain = i.default, _._tasks.empty();
        }, unshift: function (t, e) {
          r(t, !0, e);
        }, remove: function (t) {
          _._tasks.remove(t);
        }, process: function () {
          if (!y) {
            for (y = !0; !_.paused && d < _.concurrency && _._tasks.length;) {
              var t = [],
                  e = [],
                  n = _._tasks.length;_.payload && (n = Math.min(n, _.payload));for (var r = 0; r < n; r++) {
                var o = _._tasks.shift();t.push(o), p.push(o), e.push(o.data);
              }d += 1, 0 === _._tasks.length && _.empty(), d === _.concurrency && _.saturated();var u = (0, s.default)(l(t));h(e, u);
            }y = !1;
          }
        }, length: function () {
          return _._tasks.length;
        }, running: function () {
          return d;
        }, workersList: function () {
          return p;
        }, idle: function () {
          return _._tasks.length + d === 0;
        }, pause: function () {
          _.paused = !0;
        }, resume: function () {
          !1 !== _.paused && (_.paused = !1, (0, a.default)(_.process));
        } };return _;
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;var o = n(v),
        u = n(_),
        i = n(m),
        s = n(b),
        a = n(w),
        c = n(x),
        f = n(M);t.exports = e.default;
  });n(O);var P = r(function (t, e) {
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.default = function (t, e) {
      var n = (0, o.default)(t);return (0, r.default)(function (t, e) {
        n(t[0], e);
      }, e, 1);
    };var r = n(O),
        o = n(M);t.exports = e.default;
  }),
      S = n(P),
      E = { request: wx.request, Promise: l, concurrency: 10 },
      T = S(function (t, e) {
    return t(e);
  }, E.concurrency),
      C = function (t) {
    return new E.Promise(function (e, n) {
      T.push(function (r) {
        E.request(Object.assign({}, t, { success: e, fail: n, complete: r }));
      });
    });
  },
      q = function (t) {
    var e = t.concurrency !== E.concurrency;E = Object.assign({}, E, t), e && (T.concurrency = E.concurrency);
  };t.request = C, t.setConfig = q, t.Promise = l, Object.defineProperty(t, "__esModule", { value: !0 });
});