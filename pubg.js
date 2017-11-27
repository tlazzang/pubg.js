window["pubg"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {"name":"pubg.js","version":"2.0.0","description":"A powerful Playerunknown's Battlegrounds JavaScript API Wrapper","main":"src/index.js","scripts":{"test":"npm run lint && npm run tests","lint":"eslint src *.js","tests":"node test/index.js","webpack":"./node_modules/.bin/webpack --config webpack.config.js"},"repository":{"type":"git","url":"git+https://github.com/ickerio/pubg.js.git"},"keywords":["pubg","api","wrapper"],"author":"ickerio","license":"ISC","bugs":{"url":"https://github.com/ickerio/pubg.js/issues"},"runkitExampleFilename":"docs/example.js","homepage":"https://github.com/ickerio/pubg.js#readme","dependencies":{"snekfetch":"^3.4.1"},"devDependencies":{"eslint":"^4.8.0","uglifyjs-webpack-plugin":"^1.0.0-beta.3","webpack":"^3.6.0"}}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Stats = __webpack_require__(2);

class Profile {
    constructor(content, client) {
        this.pubgTrackerId = content.pubgTrackerId;
        this.accountId = content.accountId;
        this.platform = content.platform;
        this.nickname = content.nickname;
        this.avatar = content.avatar;
        this.avatarFull = content.avatar.replace('.jpg', '_full.jpg');
        this.steamId = content.steamId;
        this.lastUpdated = content.lastUpdated;
        this.timePlayed = content.timePlayed;
        this.stats = content.stats.map(stats => new Stats(stats));

        this.client = client;
    }

    getStats(options = {}) {
        return this.stats.find(s => 
            s.region === options.region && 
            s.season === options.season &&
            s.mode === options.mode
        );
    }

    matchHistory() {
        return this.client.getMatchHistory(this.accountId);
    }

    account() {
        return this.client.getAccount(this.steamId);
    }
}

module.exports = Profile;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Stats {
    constructor(content) {
        this.region = content.region;
        this.season = content.season;
        this.mode = content.mode;
        this.stats = this._structureStats(content.stats);
    }

    getItem(name) {
        if (!name || !typeof name === 'string') return;
        return this.stats.find(s => s.name === name);
    }

    _structureStats(Stats) {
        const stats = [];
        for (const stat of Object.keys(Stats)) {
            const data = Stats[stat];
            const statObj = {
                fullName: data.label,
                name: data.field,
                category: data.category,
                value: data.value,
                rank: data.rank,
                percentile: data.percentile,
                displayValue: data.displayValue
            };
            stats.push(statObj);
        }
        return stats;
    }
}

module.exports = Stats;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Account {
    constructor(content, client) {
        this.accountId = content.accountId;
        this.nickname = content.nickname;
        this.steamId = content.steamId;

        this.client = client;
    }
    
    profile(options) {
        return this.client.getProfile(this.nickname, options);
    }

    matchHistory() {
        return this.client.getMatchHistory(this.accountId);
    }

}

module.exports = Account;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Match {
    constructor(content) {
        this.id = content.id;
        this.updated = content.updated;
        this.updatedJS = content.updatedJS;
        this.season = content.season;
        this.seasonDisplay = content.seasonDisplay;
        this.match = content.match;
        this.matchDisplay = content.matchDisplay;
        this.region = content.region;
        this.regionDisplay = content.regionDisplay;
        this.rounds = content.rounds;
        this.wins = content.wins;
        this.kills = content.kills;
        this.assists = content.assists;
        this.top10 = content.top10;
        this.rating = content.rating;
        this.ratingChange = content.ratingChange;
        this.ratingRank = content.ratingRank;
        this.ratingRankChange = content.ratingRankChange;
        this.headshots = content.headshots;
        this.kd = content.kd;
        this.damage = content.damage;
        this.timeSurvived = content.timeSurvived;
        this.winRating = content.winRating;
        this.winRank = content.winRank;
        this.winRatingChange = content.winRatingChange;
        this.winRatingRankChange = content.winRatingRankChange;
        this.killRating = content.killRating;
        this.killRank = content.killRank;
        this.killRatingChange = content.killRatingChange;
        this.killRatingRankChange = content.killRatingRankChange;
        this.moveDistance = content.moveDistance;
    }
}

module.exports = Match;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    // Base Class
    Client: __webpack_require__(6),

    Profile: __webpack_require__(1),
    Account: __webpack_require__(3),
    Stats: __webpack_require__(2),
    Match: __webpack_require__(4),

    version: __webpack_require__(0).version
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const snekfetch = __webpack_require__(7);
const Package = __webpack_require__(0);

const Profile = __webpack_require__(1);
const Account = __webpack_require__(3);
const Match = __webpack_require__(4);

class Client {
    constructor(key) {

        if (!key) {
            throw new Error('No API key passed.');
        }

        this.key = key;

        this._headers = {
            'User-Agent': `pubg.js v${Package.version} (${Package.homepage})`,
            'TRN-Api-Key': this.key
        };
    }

    getProfile(username, options = {}) {
        return this._apiRequest(`https://api.pubgtracker.com/v2/profile/pc/${username}`, options)
            .then(body => new Profile(body, this))
            .catch(e => Promise.reject(e));
    }

    getAccount(id) {
        return this._apiRequest(`https://api.pubgtracker.com/v2/search/steam?steamId=${id}`)
            .then(body => new Account(body, this))
            .catch(e => Promise.reject(e));
    }

    getMatchHistory(accountId) {
        return this._apiRequest(`https://api.pubgtracker.com/v2/matches/pc/${accountId}`)
            .then(body => body.map(match => new Match(match)))
            .catch(e => Promise.reject(e));
    }

    _apiRequest(url, options = {}) {
        return snekfetch.get(url)
            .set(this._headers)
            .query(options)
            .then(r => r.body.error ? Promise.reject(`"${r.body.error}" with code ${r.body.code}`) : r.body)
            .catch(e => Promise.reject(`HTTP ${e}`));
    }

}

module.exports = Client;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const browser = typeof window !== 'undefined';
const querystring = __webpack_require__(9);
const Package = __webpack_require__(12);
const transport = browser ? __webpack_require__(13) : __webpack_require__(14);

/**
 * Snekfetch
 * @extends Stream.Readable
 * @extends Promise
 */
class Snekfetch extends transport.Extension {
  /**
   * Options to pass to the Snekfetch constructor
   * @typedef {object} snekfetchOptions
   * @memberof Snekfetch
   * @property {object} [headers] Headers to initialize the request with
   * @property {object|string|Buffer} [data] Data to initialize the request with
   * @property {string|Object} [query] Query to intialize the request with
   * @property {boolean} [followRedirects=true] If the request should follow redirects
   * @property {object} [qs=querystring] Querystring module to use, any object providing
   * `stringify` and `parse` for querystrings
   * @property {number} [version = 1] The http version to use [1 or 2]
   * @property {external:Agent} [agent] Whether to use an http agent
   */

  /**
   * Create a request.
   * Usually you'll want to do `Snekfetch#method(url [, options])` instead of
   * `new Snekfetch(method, url [, options])`
   * @param {string} method HTTP method
   * @param {string} url URL
   * @param {Snekfetch.snekfetchOptions} opts Options
   */
  constructor(method, url, opts = {
    version: 1,
    qs: querystring,
    followRedirects: true,
  }) {
    super();
    this.options = opts;
    this.request = transport.buildRequest.call(this, method, url, opts);
    if (opts.query) this.query(opts.query);
    if (opts.data) this.send(opts.data);
  }

  /**
   * Add a query param to the request
   * @param {string|Object} name Name of query param or object to add to query
   * @param {string} [value] If name is a string value, this will be the value of the query param
   * @returns {Snekfetch} This request
   */
  query(name, value) {
    if (this.response) throw new Error('Cannot modify query after being sent!');
    if (!this.request.query) this.request.query = {};
    if (name !== null && typeof name === 'object') {
      for (const [k, v] of Object.entries(name)) this.query(k, v);
    } else {
      this.request.query[name] = value;
    }
    return this;
  }

  /**
   * Add a header to the request
   * @param {string|Object} name Name of query param or object to add to headers
   * @param {string} [value] If name is a string value, this will be the value of the header
   * @returns {Snekfetch} This request
   */
  set(name, value) {
    if (this.response) throw new Error('Cannot modify headers after being sent!');
    if (name !== null && typeof name === 'object') {
      for (const key of Object.keys(name)) this.set(key, name[key]);
    } else {
      this.request.setHeader(name, value);
    }
    return this;
  }

  /**
   * Attach a form data object
   * @param {string} name Name of the form attachment
   * @param {string|Object|Buffer} data Data for the attachment
   * @param {string} [filename] Optional filename if form attachment name needs to be overridden
   * @returns {Snekfetch} This request
   */
  attach(...args) {
    if (this.response) throw new Error('Cannot modify data after being sent!');
    const form = this._getFormData();
    form.append(...args);
    return this;
  }

  /**
   * Send data with the request
   * @param {string|Buffer|Object} data Data to send
   * @returns {Snekfetch} This request
   */
  send(data) {
    if (this.response) throw new Error('Cannot modify data after being sent!');
    if (data instanceof transport.FormData || transport.shouldSendRaw(data)) {
      this.data = data;
    } else if (data !== null && typeof data === 'object') {
      const header = this._getRequestHeader('content-type');
      let serialize;
      if (header) {
        if (header.includes('json')) serialize = JSON.stringify;
        else if (header.includes('urlencoded')) serialize = this.options.qs.stringify;
      } else {
        this.set('Content-Type', 'application/json');
        serialize = JSON.stringify;
      }
      this.data = serialize(data);
    } else {
      this.data = data;
    }
    return this;
  }

  then(resolver, rejector) {
    return transport.finalizeRequest.call(this)
      .then(({ response, raw, redirect, headers }) => {
        if (redirect) {
          let method = this.request.method;
          if ([301, 302].includes(response.statusCode)) {
            if (method !== 'HEAD') method = 'GET';
            this.data = null;
          } else if (response.statusCode === 303) {
            method = 'GET';
          }

          const redirectHeaders = {};
          if (this.request._headerNames) {
            for (const name of Object.keys(this.request._headerNames)) {
              if (name.toLowerCase() === 'host') continue;
              redirectHeaders[this.request._headerNames[name]] = this.request._headers[name];
            }
          } else {
            const hds = this.request._headers || this.request.headers;
            for (const name of Object.keys(hds)) {
              if (name.toLowerCase() === 'host') continue;
              const header = hds[name];
              redirectHeaders[header.name] = header.value;
            }
          }

          return new Snekfetch(method, redirect, {
            data: this.data,
            headers: redirectHeaders,
          });
        }

        const statusCode = response.statusCode || response.status;
        // forgive me :(
        const self = this; // eslint-disable-line consistent-this
        /**
         * Response from Snekfetch
         * @typedef {Object} SnekfetchResponse
         * @memberof Snekfetch
         * @prop {HTTP.Request} request
         * @prop {?string|object|Buffer} body Processed response body
         * @prop {string} text Raw response body
         * @prop {boolean} ok If the response code is >= 200 and < 300
         * @prop {number} status HTTP status code
         * @prop {string} statusText Human readable HTTP status
         */
        const res = {
          request: this.request,
          get body() {
            delete res.body;
            const type = this.headers['content-type'];
            if (type && type.includes('application/json')) {
              try {
                res.body = JSON.parse(res.text);
              } catch (err) {
                res.body = res.text;
              }
            } else if (type && type.includes('application/x-www-form-urlencoded')) {
              res.body = self.options.qs.parse(res.text);
            } else {
              res.body = raw;
            }

            return res.body;
          },
          text: raw.toString(),
          ok: statusCode >= 200 && statusCode < 400,
          headers: headers || response.headers,
          status: statusCode,
          statusText: response.statusText || transport.STATUS_CODES[response.statusCode],
        };

        if (res.ok) {
          return res;
        } else {
          const err = new Error(`${res.status} ${res.statusText}`.trim());
          Object.assign(err, res);
          return Promise.reject(err);
        }
      })
      .then(resolver, rejector);
  }

  catch(rejector) {
    return this.then(null, rejector);
  }

  /**
   * End the request
   * @param {Function} [cb] Optional callback to handle the response
   * @returns {Promise} This request
   */
  end(cb) {
    return this.then(
      (res) => cb ? cb(null, res) : res,
      (err) => cb ? cb(err, err.status ? err : null) : Promise.reject(err)
    );
  }

  /* istanbul ignore next */
  _read() {
    this.resume();
    if (this.response) return;
    this.catch((err) => this.emit('error', err));
  }

  _shouldUnzip(res) {
    if (res.statusCode === 204 || res.statusCode === 304) return false;
    if (res.headers['content-length'] === '0') return false;
    return /^\s*(?:deflate|gzip)\s*$/.test(res.headers['content-encoding']);
  }

  _shouldRedirect(res) {
    return this.options.followRedirects !== false && [301, 302, 303, 307, 308].includes(res.statusCode);
  }

  _getFormData() {
    if (!(this.data instanceof transport.FormData)) {
      this.data = new transport.FormData();
    }
    return this.data;
  }

  _finalizeRequest() {
    if (!this.request) return;
    if (!this._getRequestHeader('user-agent')) {
      this.set('User-Agent', `snekfetch/${Snekfetch.version} (${Package.homepage})`);
    }
    if (this.request.method !== 'HEAD') this.set('Accept-Encoding', 'gzip, deflate');
    if (this.data && this.data.getBoundary) {
      this.set('Content-Type', `multipart/form-data; boundary=${this.data.getBoundary()}`);
    }
    if (this.request.query) {
      const [path, query] = this.request.path.split('?');
      this.request.path = `${path}?${this.options.qs.stringify(this.request.query)}${query ? `&${query}` : ''}`;
    }
  }

  get response() {
    return this.request ? this.request.res || this.request._response || null : null;
  }

  _getRequestHeader(header) {
    // https://github.com/jhiesey/stream-http/pull/77
    try {
      return this.request.getHeader(header);
    } catch (err) {
      return null;
    }
  }
}

Snekfetch.version = Package.version;

/**
 * Create a ((THIS)) request
 * @dynamic this.METHODS
 * @method Snekfetch.((THIS)lowerCase)
 * @param {string} url The url to request
 * @param {Snekfetch.snekfetchOptions} [opts] Options
 * @returns {Snekfetch}
 */
Snekfetch.METHODS = transport.METHODS.concat('BREW').filter((m) => m !== 'M-SEARCH');
for (const method of Snekfetch.METHODS) {
  Snekfetch[method.toLowerCase()] = (url, opts) => new Snekfetch(method, url, opts);
}

module.exports = Snekfetch;

/**
 * @external Agent
 * @see {@link https://nodejs.org/api/http.html#http_class_http_agent}
 */


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(10);
exports.encode = exports.stringify = __webpack_require__(11);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"_args":[["snekfetch@3.5.1","/home/travis/build/ickerio/pubg.js"]],"_from":"snekfetch@3.5.1","_id":"snekfetch@3.5.1","_inBundle":false,"_integrity":"sha512-35qHf+7HIzhHOKdRzW7ruUWKkrKGRhZHpUYdqNDlTnIAKk0tCgiyxhBvL796IB05Ty1AjZobF6WGT72J7tfO0g==","_location":"/snekfetch","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"snekfetch@3.5.1","name":"snekfetch","escapedName":"snekfetch","rawSpec":"3.5.1","saveSpec":null,"fetchSpec":"3.5.1"},"_requiredBy":["/"],"_resolved":"https://registry.npmjs.org/snekfetch/-/snekfetch-3.5.1.tgz","_spec":"3.5.1","_where":"/home/travis/build/ickerio/pubg.js","author":{"name":"Gus Caplan","email":"me@gus.host"},"browser":{"./src/node/index.js":false,"./src/meta.js":false},"bugs":{"url":"https://github.com/devsnek/snekfetch/issues"},"dependencies":{},"description":"Just do http requests without all that weird nastiness from other libs","devDependencies":{"coveralls":"^3.0.0","docma":"^1.5.1","eslint":"^4.8.0","jest":"^21.2.1","jsdoc-dynamic":"^1.0.4","json-filter-loader":"^1.0.0","node-fetch":"github:bitinn/node-fetch","uglifyjs-webpack-plugin":"^1.0.0-beta.2","webpack":"^3.6.0"},"homepage":"https://github.com/devsnek/snekfetch","jest":{"collectCoverage":true,"collectCoverageFrom":["src/**/*.js","!src/qs_mock.js","!src/node/mimeOfBuffer.js","!src/node/transports/http2.js"],"verbose":true},"license":"MIT","main":"index.js","name":"snekfetch","repository":{"type":"git","url":"git+https://github.com/devsnek/snekfetch.git"},"scripts":{"docs":"node docs.js","lint":"npx eslint src","test":"node ./node_modules/.bin/jest","test:coveralls":"cat ./coverage/lcov.info | coveralls"},"version":"3.5.1"}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function buildRequest(method, url) {
  return {
    method,
    path: url,
    redirect: this.options.followRedirects ? 'follow' : 'manual',
    headers: {},
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    getHeader(name) {
      return this.headers[name.toLowerCase()];
    },
  };
}

function finalizeRequest() {
  this._finalizeRequest();
  if (this.data) this.request.body = this.data;
  return window.fetch(this.request.path, this.request)
    .then((r) => r.text().then((t) => {
      const headers = {};
      for (const [k, v] of r.headers.entries()) headers[k.toLowerCase()] = v;
      return { response: r, raw: t, headers };
    }));
}

module.exports = {
  buildRequest, finalizeRequest,
  shouldSendRaw: () => false,
  METHODS: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'PATCH'],
  STATUS_CODES: {},
  Extension: Object,
  FormData: window.FormData,
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=pubg.js.map