// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"vendors/css/animate.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/codemirror.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/combined.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/ionicons.eot":[["ionicons.c628c025.eot","vendors/fonts/ionicons.eot"],"vendors/fonts/ionicons.eot"],"./../fonts/ionicons.woff":[["ionicons.e9956e69.woff","vendors/fonts/ionicons.woff"],"vendors/fonts/ionicons.woff"],"./../fonts/ionicons.ttf":[["ionicons.044e0f8b.ttf","vendors/fonts/ionicons.ttf"],"vendors/fonts/ionicons.ttf"],"./../fonts/ionicons.svg":[["ionicons.a54256ce.svg","vendors/fonts/ionicons.svg"],"vendors/fonts/ionicons.svg"],"./../fonts/Lato-Light.eot":[["Lato-Light.3c97fe76.eot","vendors/fonts/Lato-Light.eot"],"vendors/fonts/Lato-Light.eot"],"./../fonts/Lato-Light.woff2":[["Lato-Light.cb0c9583.woff2","vendors/fonts/Lato-Light.woff2"],"vendors/fonts/Lato-Light.woff2"],"./../fonts/Lato-Light.woff":[["Lato-Light.c9c59e8e.woff","vendors/fonts/Lato-Light.woff"],"vendors/fonts/Lato-Light.woff"],"./../fonts/Lato-Light.ttf":[["Lato-Light.9e982457.ttf","vendors/fonts/Lato-Light.ttf"],"vendors/fonts/Lato-Light.ttf"],"./../fonts/Lato-LightItalic.eot":[["Lato-LightItalic.184bf78e.eot","vendors/fonts/Lato-LightItalic.eot"],"vendors/fonts/Lato-LightItalic.eot"],"./../fonts/Lato-LightItalic.woff2":[["Lato-LightItalic.69b9e097.woff2","vendors/fonts/Lato-LightItalic.woff2"],"vendors/fonts/Lato-LightItalic.woff2"],"./../fonts/Lato-LightItalic.woff":[["Lato-LightItalic.7d9facd5.woff","vendors/fonts/Lato-LightItalic.woff"],"vendors/fonts/Lato-LightItalic.woff"],"./../fonts/Lato-LightItalic.ttf":[["Lato-LightItalic.82a482bf.ttf","vendors/fonts/Lato-LightItalic.ttf"],"vendors/fonts/Lato-LightItalic.ttf"],"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/grid.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/ionicons.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/ionicons.eot":[["ionicons.c628c025.eot","vendors/fonts/ionicons.eot"],"vendors/fonts/ionicons.eot"],"./../fonts/ionicons.woff":[["ionicons.e9956e69.woff","vendors/fonts/ionicons.woff"],"vendors/fonts/ionicons.woff"],"./../fonts/ionicons.ttf":[["ionicons.044e0f8b.ttf","vendors/fonts/ionicons.ttf"],"vendors/fonts/ionicons.ttf"],"./../fonts/ionicons.svg":[["ionicons.a54256ce.svg","vendors/fonts/ionicons.svg"],"vendors/fonts/ionicons.svg"],"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/latofonts.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/Lato-Light.eot":[["Lato-Light.3c97fe76.eot","vendors/fonts/Lato-Light.eot"],"vendors/fonts/Lato-Light.eot"],"./../fonts/Lato-Light.woff2":[["Lato-Light.cb0c9583.woff2","vendors/fonts/Lato-Light.woff2"],"vendors/fonts/Lato-Light.woff2"],"./../fonts/Lato-Light.woff":[["Lato-Light.c9c59e8e.woff","vendors/fonts/Lato-Light.woff"],"vendors/fonts/Lato-Light.woff"],"./../fonts/Lato-Light.ttf":[["Lato-Light.9e982457.ttf","vendors/fonts/Lato-Light.ttf"],"vendors/fonts/Lato-Light.ttf"],"./../fonts/Lato-LightItalic.eot":[["Lato-LightItalic.184bf78e.eot","vendors/fonts/Lato-LightItalic.eot"],"vendors/fonts/Lato-LightItalic.eot"],"./../fonts/Lato-LightItalic.woff2":[["Lato-LightItalic.69b9e097.woff2","vendors/fonts/Lato-LightItalic.woff2"],"vendors/fonts/Lato-LightItalic.woff2"],"./../fonts/Lato-LightItalic.woff":[["Lato-LightItalic.7d9facd5.woff","vendors/fonts/Lato-LightItalic.woff"],"vendors/fonts/Lato-LightItalic.woff"],"./../fonts/Lato-LightItalic.ttf":[["Lato-LightItalic.82a482bf.ttf","vendors/fonts/Lato-LightItalic.ttf"],"vendors/fonts/Lato-LightItalic.ttf"],"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/magnific-popup.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/normalize.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"vendors/css/shadowfox.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"resources/css/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../../vendors/css/combined.css":"vendors/css/combined.css","./img/GcP71BP-min.png":[["GcP71BP-min.62448586.png","resources/css/img/GcP71BP-min.png"],"resources/css/img/GcP71BP-min.png"],"./img/testimonials_bg.jpg":[["testimonials_bg.d164d092.jpg","resources/css/img/testimonials_bg.jpg"],"resources/css/img/testimonials_bg.jpg"],"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"resources/css/queries.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./vendors/css/animate.css":"vendors/css/animate.css","./vendors/css/codemirror.css":"vendors/css/codemirror.css","./vendors/css/combined.css":"vendors/css/combined.css","./vendors/css/grid.css":"vendors/css/grid.css","./vendors/css/ionicons.css":"vendors/css/ionicons.css","./vendors/css/latofonts.css":"vendors/css/latofonts.css","./vendors/css/magnific-popup.css":"vendors/css/magnific-popup.css","./vendors/css/normalize.css":"vendors/css/normalize.css","./vendors/css/shadowfox.css":"vendors/css/shadowfox.css","./resources/css/style":"resources/css/style.css","./resources/css/queries":"resources/css/queries.css","_css_loader":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53439" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}],"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([]);
},{}]},{},["../../../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)