// // © Fyrestar - https://github.com/Fyrestar/THREE.DrawCallInspector
// var $jscomp = { scope: {} };
// $jscomp.defineProperty =
//   "function" == typeof Object.defineProperties
//     ? Object.defineProperty
//     : function (a, d, k) {
//         if (k.get || k.set)
//           throw new TypeError("ES3 does not support getters and setters.");
//         a != Array.prototype && a != Object.prototype && (a[d] = k.value);
//       };
// $jscomp.getGlobal = function (a) {
//   return "undefined" != typeof window && window === a
//     ? a
//     : "undefined" != typeof global && null != global
//     ? global
//     : a;
// };
// $jscomp.global = $jscomp.getGlobal(this);
// $jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
// $jscomp.initSymbol = function () {
//   $jscomp.initSymbol = function () {};
//   $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
// };
// $jscomp.symbolCounter_ = 0;
// $jscomp.Symbol = function (a) {
//   return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++;
// };
// $jscomp.initSymbolIterator = function () {
//   $jscomp.initSymbol();
//   var a = $jscomp.global.Symbol.iterator;
//   a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
//   "function" != typeof Array.prototype[a] &&
//     $jscomp.defineProperty(Array.prototype, a, {
//       configurable: !0,
//       writable: !0,
//       value: function () {
//         return $jscomp.arrayIterator(this);
//       },
//     });
//   $jscomp.initSymbolIterator = function () {};
// };
// $jscomp.arrayIterator = function (a) {
//   var d = 0;
//   return $jscomp.iteratorPrototype(function () {
//     return d < a.length ? { done: !1, value: a[d++] } : { done: !0 };
//   });
// };
// $jscomp.iteratorPrototype = function (a) {
//   $jscomp.initSymbolIterator();
//   a = { next: a };
//   a[$jscomp.global.Symbol.iterator] = function () {
//     return this;
//   };
//   return a;
// };
// $jscomp.makeIterator = function (a) {
//   $jscomp.initSymbolIterator();
//   var d = a[Symbol.iterator];
//   return d ? d.call(a) : $jscomp.arrayIterator(a);
// };
// $jscomp.owns = function (a, d) {
//   return Object.prototype.hasOwnProperty.call(a, d);
// };
// $jscomp.polyfill = function (a, d, k, b) {
//   if (d) {
//     k = $jscomp.global;
//     a = a.split(".");
//     for (b = 0; b < a.length - 1; b++) {
//       var u = a[b];
//       u in k || (k[u] = {});
//       k = k[u];
//     }
//     a = a[a.length - 1];
//     b = k[a];
//     d = d(b);
//     d != b &&
//       null != d &&
//       $jscomp.defineProperty(k, a, {
//         configurable: !0,
//         writable: !0,
//         value: d,
//       });
//   }
// };
// $jscomp.polyfill(
//   "WeakMap",
//   function (a) {
//     function d(c) {
//       $jscomp.owns(c, b) || $jscomp.defineProperty(c, b, { value: {} });
//     }
//     function k(c) {
//       var a = Object[c];
//       a &&
//         (Object[c] = function (c) {
//           d(c);
//           return a(c);
//         });
//     }
//     if (
//       (function () {
//         if (!a || !Object.seal) return !1;
//         try {
//           var c = Object.seal({}),
//             d = Object.seal({}),
//             b = new a([
//               [c, 2],
//               [d, 3],
//             ]);
//           if (2 != b.get(c) || 3 != b.get(d)) return !1;
//           b["delete"](c);
//           b.set(d, 4);
//           return !b.has(c) && 4 == b.get(d);
//         } catch (q) {
//           return !1;
//         }
//       })()
//     )
//       return a;
//     var b = "$jscomp_hidden_" + Math.random().toString().substring(2);
//     k("freeze");
//     k("preventExtensions");
//     k("seal");
//     var u = 0,
//       r = function (c) {
//         this.id_ = (u += Math.random() + 1).toString();
//         if (c) {
//           $jscomp.initSymbol();
//           $jscomp.initSymbolIterator();
//           c = $jscomp.makeIterator(c);
//           for (var a; !(a = c.next()).done; )
//             (a = a.value), this.set(a[0], a[1]);
//         }
//       };
//     r.prototype.set = function (a, k) {
//       d(a);
//       if (!$jscomp.owns(a, b)) throw Error("WeakMap key fail: " + a);
//       a[b][this.id_] = k;
//       return this;
//     };
//     r.prototype.get = function (a) {
//       return $jscomp.owns(a, b) ? a[b][this.id_] : void 0;
//     };
//     r.prototype.has = function (a) {
//       return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_);
//     };
//     r.prototype["delete"] = function (a) {
//       return $jscomp.owns(a, b) && $jscomp.owns(a[b], this.id_)
//         ? delete a[b][this.id_]
//         : !1;
//     };
//     return r;
//   },
//   "es6-impl",
//   "es3"
// );
// (function () {
//   function a(a, c) {
//     a.addEventListener("click", c);
//     a.addEventListener("touchstart", c);
//   }
//   function d(a, c, d, b) {
//     b = void 0 === b ? null : b;
//     this.renderer = a;
//     this.scene = c;
//     this.camera = d;
//     this.maxDeltaLabel = "";
//     this.fade = b.fade || 0.01;
//     this.bias = b.bias || 0.25;
//     this.scale = b.scale || 0.25;
//     this.overlayStrength = b.overlayStrength || 0.5;
//     this.enableGLHooks = void 0 !== b.enableGLHooks ? b.enableGLHooks : !0;
//     this.enableMaterials =
//       void 0 !== b.enableMaterials ? b.enableMaterials : !1;
//     this.skipFrames = void 0 !== b.skipFrames ? b.skipFrames : 4;
//     this.resolution = new THREE.Vector2(256, 256);
//     this.painted = this.mounted = !1;
//     this.recordMode = void 0 !== b.record ? b.record : 0;
//     this.timer = null;
//     this.enabled = void 0 !== b.enabled ? b.enabled : !0;
//     this.wait = void 0 !== b.wait ? b.wait : !1;
//     this.updateFrameIndex =
//       this.pending =
//       this.maxDelta =
//       this.calls =
//       this.stage =
//       this.recordCount =
//         0;
//     this.updatePreview = !1;
//     this.autoUpdatePreview =
//       void 0 !== b.autoUpdatePreview ? b.autoUpdatePreview : !0;
//   }
//   var k = new THREE.Scene(),
//     b = new THREE.Scene();
//   b.children.push(null);
//   var u = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
//     r = new THREE.Mesh(
//       new THREE.PlaneBufferGeometry(2, 2),
//       new THREE.MeshBasicMaterial()
//     );
//   k.add(r);
//   var c = new THREE.Vector2(),
//     m = new THREE.Vector4(),
//     l = new THREE.Vector4(),
//     q = {
//       index: 0,
//       length: 0,
//       list: [],
//       push: function (a) {
//         this.index + 1 > this.length &&
//           (this.list.push(a), this.index++, this.length++);
//         this.list[this.index] = a;
//         this.index++;
//       },
//     };
//   d.RecordDraw = 0;
//   d.RecordRender = 1;
//   d.destroy = function () {
//     q.length = 0;
//     q.list = [];
//   };
//   d.prototype = {
//     frameIndex: 0,
//     needsUpdate: !1,
//     needsRecord: !1,
//     mount: function (c) {
//       function d(a) {
//         a.uniforms._uAge = { value: null };
//         a.uniforms._uDelta = { value: null };
//         a.fragmentShader = "uniform float _uDelta;\n" + a.fragmentShader;
//         a.fragmentShader = a.fragmentShader.replace(
//           /\}(?=[^.]*$)/g,
//           "\n    float level = _uDelta * 3.14159265/2.;\n    vec3 heat;\n    heat.r = sin(level);\n    heat.g = sin(level * 2.5);\n    heat.b = cos(level * 2.0);\n\t\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, heat, " +
//             h.overlayStrength.toFixed(1) +
//             " );\n\t}\n"
//         );
//       }
//       function k(a, c, e, p) {
//         y.material = e;
//         y.geometry = c;
//         y.group = p;
//         c = n.properties.get(e);
//         if (126 < I) {
//           p = c.currentProgram;
//           if (!p) return;
//           C = c.uniforms;
//           f.useProgram(p.program);
//           e = p.getUniforms().map;
//         } else {
//           c.program ||
//             ((p = a.material),
//             (a.material = e),
//             (b.children[0] = a),
//             n.compile(b, u, a),
//             (a.material = p));
//           void 0 === c.shader
//             ? ((e = c), (p = c.program))
//             : c.program
//             ? ((e = c.shader), (p = c.program))
//             : ((e = c.shader), (p = e.program));
//           if (!p) return;
//           C = e.uniforms;
//           if (!e.program) return;
//           f.useProgram(p.program);
//           e = e.program.getUniforms().map;
//         }
//         y.set(e._uDelta, a.userData.delta);
//         y.set(e._uAge, a.userData.age);
//         C = null;
//       }
//       c = void 0 === c ? document.body : c;
//       if (!1 !== this.enabled) {
//         var F = this.enableMaterials,
//           n = this.renderer,
//           h = this,
//           f = n.getContext(),
//           m = performance || Date,
//           l = (this.timer = n.capabilities.isWebGL2
//             ? f.getExtension("EXT_disjoint_timer_query_webgl2")
//             : null),
//           r = !!l;
//         l || (this.skipFrames = -1);
//         this.target = new THREE.WebGLRenderTarget(
//           this.resolution.x,
//           this.resolution.y,
//           { format: THREE.RGBAFormat }
//         );
//         var D = new THREE.MeshBasicMaterial({ color: 16777215 });
//         D.onBeforeCompile = d;
//         var G = (function () {
//             var a = {},
//               c = new WeakMap();
//             return {
//               map: c,
//               push: function (b, f, g) {
//                 var e = c.get(b);
//                 e &&
//                   e.userData.material !== g &&
//                   e.userData.geometry !== f &&
//                   (e = null);
//                 e ||
//                   ((e = f.uuid + "_" + g.uuid),
//                   void 0 === a[e]
//                     ? ((b = g.clone()),
//                       g.uniforms && (b.uniforms = g.uniforms),
//                       (b.onBeforeCompile = d),
//                       (b.userData.material = g),
//                       (b.userData.geometry = f),
//                       (a[e] = b))
//                     : c.set(b, a[e]));
//               },
//             };
//           })(),
//           C,
//           I = parseInt(THREE.REVISION),
//           y = {
//             material: null,
//             geometry: null,
//             group: null,
//             set: function (a, c) {
//               a && (a.setValue(f, c, n.textures), (C[a.id].value = c));
//             },
//           },
//           v,
//           w = 0,
//           z = 0;
//         if (this.enableGLHooks) {
//           var E = f.drawElements,
//             H = f.drawElementsInstanced;
//           f.drawElements = function (a, c, b, d) {
//             if (w && v && 0 === h.recordMode) {
//               if (l) {
//                 var e = f.createQuery();
//                 e &&
//                   (h.wait && h.pending++,
//                   (v.userData.query = e),
//                   f.beginQuery(l.TIME_ELAPSED_EXT, e),
//                   E.call(this, a, c, b, d),
//                   f.endQuery(l.TIME_ELAPSED_EXT));
//               } else
//                 f.finish(),
//                   f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, A),
//                   (z = m.now()),
//                   E.call(this, a, c, b, d),
//                   f.finish(),
//                   f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, A),
//                   (v.userData.deltaTime = (m.now() - z) / 1e6),
//                   (h.needsUpdate = !0);
//               w = 0;
//             } else E.call(this, a, c, b, d);
//           };
//           f.drawElementsInstanced = function (a, c, b, d, g) {
//             if (w && v && 0 === h.recordMode) {
//               if (r) {
//                 var e = f.createQuery();
//                 e &&
//                   (h.wait && h.pending++,
//                   (v.userData.query = e),
//                   f.beginQuery(l.TIME_ELAPSED_EXT, e),
//                   H.call(this, a, c, b, d, g),
//                   f.endQuery(l.TIME_ELAPSED_EXT));
//               } else
//                 f.finish(),
//                   f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, A),
//                   (z = m.now());
//               w = 0;
//             } else H.call(this, a, c, b, d, g);
//           };
//         }
//         var A = new Uint8Array(4);
//         n.renderBufferDirect2 = n.renderBufferDirect;
//         n.renderBufferDirect = function (a, c, b, d, g, t) {
//           if (1 === h.stage) {
//             q.push(g);
//             var e = g.userData;
//             v = g;
//             if (e.query) {
//               var x = f.getQueryParameter(e.query, f.QUERY_RESULT_AVAILABLE),
//                 p = f.getParameter(l.GPU_DISJOINT_EXT);
//               x &&
//                 !p &&
//                 (e.deltaTime = f.getQueryParameter(e.query, f.QUERY_RESULT));
//               if (x || p)
//                 f.deleteQuery(e.query),
//                   (e.query = null),
//                   (h.needsUpdate = !0),
//                   h.wait && h.pending--;
//               n.renderBufferDirect2(a, c, b, d, g, t);
//             } else if (e.recordCount === h.recordCount)
//               n.renderBufferDirect2(a, c, b, d, g, t);
//             else {
//               void 0 === e.delta && (e.delta = 0);
//               e.deltaTime = 0;
//               e.measured = !1;
//               e.query = null;
//               e.recordCount = h.recordCount;
//               if (1 === h.recordMode)
//                 if (r) {
//                   if ((x = f.createQuery()))
//                     h.wait && h.pending++,
//                       (w = 0),
//                       f.beginQuery(l.TIME_ELAPSED_EXT, x),
//                       n.renderBufferDirect2(a, c, b, d, g, t),
//                       f.endQuery(l.TIME_ELAPSED_EXT),
//                       (e.query = x);
//                 } else
//                   f.finish(),
//                     f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, A),
//                     (z = m.now()),
//                     n.renderBufferDirect2(a, c, b, d, g, t),
//                     f.finish(),
//                     f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, A),
//                     (v.userData.deltaTime = (m.now() - z) / 1e6),
//                     (h.needsUpdate = !0);
//               else (w = 1), n.renderBufferDirect2(a, c, b, d, g, t), (w = 0);
//               F && G.push(g, b, d);
//             }
//           } else if (2 === h.stage)
//             if (
//               (h.maxDelta &&
//                 void 0 !== g.userData.delta &&
//                 ((d =
//                   Math.min(g.userData.deltaTime / h.maxDelta, 1) -
//                   g.userData.delta),
//                 (g.userData.delta += (d + Math.max(-d * h.bias, 0)) * h.fade)),
//               F)
//             ) {
//               if ((d = G.map.get(g)))
//                 k(g, b, d, t), n.renderBufferDirect2(a, c, b, d, g, t);
//             } else k(g, b, D, t), n.renderBufferDirect2(a, c, b, D, g, t);
//           else n.renderBufferDirect2(a, c, b, d, g, t);
//         };
//         var B = (this.container = document.createElement("div"));
//         B.innerHTML =
//           '\n\t\t\t<input style="position: absolute; z-index: 2; right: 10px; top: 10px; opacity: 0.5; width: 5em;" type="number" min="-1" id="record" value="-1" />\n\t\t\t<div style="pointer-events: none; color: gray; display: flex; align-items: center; justify-content: center; position: absolute;left: 0;right: 0; top: 0; bottom: 0; font-size: 150%; font-family: Arial;">' +
//           (this.timer ? "" : "< Click to Capture >") +
//           '</div>\n\t\t\t<canvas style="position: relative; z-index: 1;"></canvas>\n\t\t\t';
//         this.domElement = B.children[2];
//         this.ctx = this.domElement.getContext("2d");
//         this.ctx.font = "20px Arial";
//         this.ctx.fillStyle = "#ffffff";
//         a(this.domElement, function () {
//           h.needsRecord = !0;
//         });
//         B.children[0].value = this.skipFrames;
//         B.children[0].addEventListener("change", function () {
//           h.skipFrames = parseInt(this.value);
//         });
//         B.setAttribute(
//           "style",
//           "cursor: pointer; position: fixed; z-index: 99999; left: 1em; bottom: 1em; background: silver; border: 1px solid gray;"
//         );
//         c.appendChild(this.container);
//         this.mounted = !0;
//       }
//     },
//     begin: function () {
//       this.mounted &&
//         ((q.index = 0),
//         (this.stage = 1),
//         !(this.wait && 0 < this.pending) &&
//           ((this.renderFrame = this.renderer.info.render.frame),
//           -1 < this.skipFrames && this.frameIndex++,
//           this.needsRecord ||
//             (this.frameIndex > this.skipFrames && -1 < this.skipFrames))) &&
//         (this.renderer.getSize(c),
//         0 < c.x &&
//           0 < c.y &&
//           ((this.needsRecord = !1),
//           (this.frameIndex = 0),
//           this.recordCount++,
//           c.set(c.x * this.scale, c.y * this.scale).floor(),
//           c.x !== this.resolution.x || c.y !== this.resolution.y)) &&
//         (this.resolution.copy(c),
//         this.target.setSize(c.x, c.y),
//         (this.domElement.width = c.x),
//         (this.domElement.height = c.y));
//     },
//     end: function () {
//       if (!1 !== this.enabled && this.needsUpdate) {
//         var a = this.renderer,
//           c = a.getRenderTarget();
//         this.calls = q.index;
//         this.stage = 2;
//         a.setRenderTarget(this.target);
//         a.clear();
//         a.render(this.scene, this.camera);
//         if (q.index) {
//           for (var b = 0, d = 0, k = q.index, h = q.list; d < k; d++)
//             b = Math.max(b, h[d].userData.deltaTime || 0);
//           b -= this.maxDelta;
//           this.maxDelta += 0.05 * (b + Math.max(-b * this.bias, 0));
//         }
//         a.setRenderTarget(c);
//         this.stage = 0;
//       }
//     },
//     update: function () {
//       if (
//         !1 !== this.enabled &&
//         (this.updatePreview || this.autoUpdatePreview)
//       ) {
//         this.updatePreview = !1;
//         var a = this.renderer,
//           b = this.resolution,
//           d = this.ctx;
//         this.updateFrameIndex++;
//         60 < this.updateFrameIndex &&
//           ((this.maxDeltaLabel =
//             "Max. ms: " + (this.maxDelta / 1e6).toFixed(6)),
//           (this.updateFrameIndex = 0));
//         var q = a.getRenderTarget();
//         a.getViewport(m);
//         a.getScissor(l);
//         a.getSize(c);
//         m.x = m.x || 0;
//         m.y = m.y || 0;
//         m.z = m.z || c.x;
//         m.w = m.w || c.y;
//         l.x = l.x || 0;
//         l.y = l.y || 0;
//         l.z = l.z || c.x;
//         l.w = l.w || c.y;
//         a.setRenderTarget(null);
//         a.clear();
//         a.setViewport(0, 0, b.x, b.y);
//         a.setScissor(0, 0, b.x, b.y);
//         r.material.map = this.target.texture;
//         a.render(k, u);
//         d.clearRect(0, 0, b.x, b.y);
//         d.drawImage(a.domElement, 0, c.y - b.y, b.x, b.y, 0, 0, b.x, b.y);
//         d.font = "15px Arial";
//         d.fillStyle = "#ffffff";
//         d.strokeStyle = "#000000";
//         d.lineWidth = 4;
//         d.miterLimit = 0.2;
//         b = "Drawcalls: " + this.calls;
//         d.strokeText(b, 10, 20);
//         d.fillText(b, 10, 20);
//         b = this.maxDeltaLabel;
//         d.strokeText(b, 10, 50);
//         d.fillText(b, 10, 50);
//         a.setViewport(m);
//         a.setScissor(l);
//         a.setRenderTarget(q);
//       }
//     },
//   };
//   THREE.DrawCallInspector = d;
// })();