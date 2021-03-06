 /*!
* @license SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/

/**!
 * SoundJS FlashAudioPlugin also includes swfobject (http://code.google.com/p/swfobject/)
 */

this.createjs = this.createjs || {}, function() {
    var a = createjs.SoundJS = createjs.SoundJS || {};
    a.version = "0.6.0", a.buildDate = "Thu, 11 Dec 2014 23:32:09 GMT"
}(), this.createjs = this.createjs || {}, createjs.extend = function(a, b) {
    "use strict";
    function c() {
        this.constructor = a
    }
    return c.prototype = b.prototype, a.prototype = new c
}, this.createjs = this.createjs || {}, createjs.promote = function(a, b) {
    "use strict";
    var c = a.prototype, d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__;
    if (d) {
        c[(b += "_") + "constructor"] = d.constructor;
        for (var e in d)
            c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e])
    }
    return a
}, this.createjs = this.createjs || {}, createjs.indexOf = function(a, b) {
    "use strict";
    for (var c = 0, d = a.length; d > c; c++)
        if (b === a[c])
            return c;
    return -1
}, this.createjs = this.createjs || {}, function() {
    "use strict";
    createjs.proxy = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return function() {
            return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c))
        }
    }
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = Object.defineProperty ? !0 : !1, b = {};
    try {
        Object.defineProperty(b, "bar", {get: function() {
                return this._bar
            },set: function(a) {
                this._bar = a
            }})
    } catch (c) {
        a = !1
    }
    createjs.definePropertySupported = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        throw "BrowserDetect cannot be instantiated"
    }
    var b = a.agent = window.navigator.userAgent;
    a.isWindowPhone = b.indexOf("IEMobile") > -1 || b.indexOf("Windows Phone") > -1, a.isFirefox = b.indexOf("Firefox") > -1, a.isOpera = null != window.opera, a.isChrome = b.indexOf("Chrome") > -1, a.isIOS = (b.indexOf("iPod") > -1 || b.indexOf("iPhone") > -1 || b.indexOf("iPad") > -1) && !a.isWindowPhone, a.isAndroid = b.indexOf("Android") > -1 && !a.isWindowPhone, a.isBlackberry = b.indexOf("Blackberry") > -1, createjs.BrowserDetect = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        this._listeners = null, this._captureListeners = null
    }
    var b = a.prototype;
    a.initialize = function(a) {
        a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent, a.willTrigger = b.willTrigger
    }, b.addEventListener = function(a, b, c) {
        var d;
        d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var e = d[a];
        return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b
    }, b.on = function(a, b, c, d, e, f) {
        return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function(a) {
            b.call(c, a, e), d && a.remove()
        }, f)
    }, b.removeEventListener = function(a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
            var e = d[a];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == b) {
                        1 == g ? delete d[a] : e.splice(f, 1);
                        break
                    }
        }
    }, b.off = b.removeEventListener, b.removeAllEventListeners = function(a) {
        a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    }, b.dispatchEvent = function(a) {
        if ("string" == typeof a) {
            var b = this._listeners;
            if (!b || !b[a])
                return !1;
            a = new createjs.Event(a)
        } else
            a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (c) {
        }
        if (a.bubbles && this.parent) {
            for (var d = this, e = [d]; d.parent; )
                e.push(d = d.parent);
            var f, g = e.length;
            for (f = g - 1; f >= 0 && !a.propagationStopped; f--)
                e[f]._dispatchEvent(a, 1 + (0 == f));
            for (f = 1; g > f && !a.propagationStopped; f++)
                e[f]._dispatchEvent(a, 3)
        } else
            this._dispatchEvent(a, 2);
        return a.defaultPrevented
    }, b.hasEventListener = function(a) {
        var b = this._listeners, c = this._captureListeners;
        return !!(b && b[a] || c && c[a])
    }, b.willTrigger = function(a) {
        for (var b = this; b; ) {
            if (b.hasEventListener(a))
                return !0;
            b = b.parent
        }
        return !1
    }, b.toString = function() {
        return "[EventDispatcher]"
    }, b._dispatchEvent = function(a, b) {
        var c, d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
            var e = d[a.type];
            if (!e || !(c = e.length))
                return;
            try {
                a.currentTarget = this
            } catch (f) {
            }
            try {
                a.eventPhase = b
            } catch (f) {
            }
            a.removed = !1, e = e.slice();
            for (var g = 0; c > g && !a.immediatePropagationStopped; g++) {
                var h = e[g];
                h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1)
            }
        }
    }, createjs.EventDispatcher = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.type = a, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!b, this.cancelable = !!c, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1
    }
    var b = a.prototype;
    b.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    }, b.stopPropagation = function() {
        this.propagationStopped = !0
    }, b.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    }, b.remove = function() {
        this.removed = !0
    }, b.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    }, b.set = function(a) {
        for (var b in a)
            this[b] = a[b];
        return this
    }, b.toString = function() {
        return "[Event (type=" + this.type + ")]"
    }, createjs.Event = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.Event_constructor("error"), this.title = a, this.message = b, this.data = c
    }
    var b = createjs.extend(a, createjs.Event);
    b.clone = function() {
        return new createjs.ErrorEvent(this.title, this.message, this.data)
    }, createjs.ErrorEvent = createjs.promote(a, "Event")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b) {
        this.Event_constructor("progress"), this.loaded = a, this.total = null == b ? 1 : b, this.progress = 0 == b ? 0 : this.loaded / this.total
    }
    var b = createjs.extend(a, createjs.Event);
    b.clone = function() {
        return new createjs.ProgressEvent(this.loaded, this.total)
    }, createjs.ProgressEvent = createjs.promote(a, "Event")
}(window), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.LoadItem.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = "Anonymous", this.loadTimeout = 8e3
    }
    var b = a.prototype = {}, c = a;
    c.create = function(b) {
        if ("string" == typeof b) {
            var d = new a;
            return d.src = b, d
        }
        if (b instanceof c)
            return b;
        if (b instanceof Object)
            return b;
        throw new Error("Type not recognized.")
    }, b.set = function(a) {
        for (var b in a)
            this[b] = a[b];
        return this
    }, createjs.LoadItem = c
}(), function() {
    var a = {};
    a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, a.RELATIVE_PATT = /^[./]*?\//i, a.EXTENSION_PATT = /\/?[^/]+\.(\w{1,5})$/i, a.parseURI = function(b) {
        var c = {absolute: !1,relative: !1};
        if (null == b)
            return c;
        var d = b.indexOf("?");
        d > -1 && (b = b.substr(0, d));
        var e;
        return a.ABSOLUTE_PATT.test(b) ? c.absolute = !0 : a.RELATIVE_PATT.test(b) && (c.relative = !0), (e = b.match(a.EXTENSION_PATT)) && (c.extension = e[1].toLowerCase()), c
    }, a.formatQueryString = function(a, b) {
        if (null == a)
            throw new Error("You must specify data.");
        var c = [];
        for (var d in a)
            c.push(d + "=" + escape(a[d]));
        return b && (c = c.concat(b)), c.join("&")
    }, a.buildPath = function(a, b) {
        if (null == b)
            return a;
        var c = [], d = a.indexOf("?");
        if (-1 != d) {
            var e = a.slice(d + 1);
            c = c.concat(e.split("&"))
        }
        return -1 != d ? a.slice(0, d) + "?" + this._formatQueryString(b, c) : a + "?" + this._formatQueryString(b, c)
    }, a.isCrossDomain = function(a) {
        var b = document.createElement("a");
        b.href = a.src;
        var c = document.createElement("a");
        c.href = location.href;
        var d = "" != b.hostname && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname);
        return d
    }, a.isLocal = function(a) {
        var b = document.createElement("a");
        return b.href = a.src, "" == b.hostname && "file:" == b.protocol
    }, a.isBinary = function(a) {
        switch (a) {
            case createjs.AbstractLoader.IMAGE:
            case createjs.AbstractLoader.BINARY:
                return !0;
            default:
                return !1
        }
    }, a.isImageTag = function(a) {
        return a instanceof HTMLImageElement
    }, a.isAudioTag = function(a) {
        return window.HTMLAudioElement ? a instanceof HTMLAudioElement : !1
    }, a.isVideoTag = function(a) {
        return window.HTMLVideoElement ? a instanceof HTMLVideoElement : void 0
    }, a.isText = function(a) {
        switch (a) {
            case createjs.AbstractLoader.TEXT:
            case createjs.AbstractLoader.JSON:
            case createjs.AbstractLoader.MANIFEST:
            case createjs.AbstractLoader.XML:
            case createjs.AbstractLoader.CSS:
            case createjs.AbstractLoader.SVG:
            case createjs.AbstractLoader.JAVASCRIPT:
                return !0;
            default:
                return !1
        }
    }, a.getTypeByExtension = function(a) {
        if (null == a)
            return createjs.AbstractLoader.TEXT;
        switch (a.toLowerCase()) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
            case "webp":
            case "bmp":
                return createjs.AbstractLoader.IMAGE;
            case "ogg":
            case "mp3":
            case "webm":
                return createjs.AbstractLoader.SOUND;
            case "mp4":
            case "webm":
            case "ts":
                return createjs.AbstractLoader.VIDEO;
            case "json":
                return createjs.AbstractLoader.JSON;
            case "xml":
                return createjs.AbstractLoader.XML;
            case "css":
                return createjs.AbstractLoader.CSS;
            case "js":
                return createjs.AbstractLoader.JAVASCRIPT;
            case "svg":
                return createjs.AbstractLoader.SVG;
            default:
                return createjs.AbstractLoader.TEXT
        }
    }, createjs.RequestUtils = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = c, this.resultFormatter = null, this._item = a ? createjs.LoadItem.create(a) : null, this._preferXHR = b, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null
    }
    var b = createjs.extend(a, createjs.EventDispatcher), c = a;
    c.POST = "POST", c.GET = "GET", c.BINARY = "binary", c.CSS = "css", c.IMAGE = "image", c.JAVASCRIPT = "javascript", c.JSON = "json", c.JSONP = "jsonp", c.MANIFEST = "manifest", c.SOUND = "sound", c.VIDEO = "video", c.SPRITESHEET = "spritesheet", c.SVG = "svg", c.TEXT = "text", c.XML = "xml", b.getItem = function() {
        return this._item
    }, b.getResult = function(a) {
        return a ? this._rawResult : this._result
    }, b.getTag = function() {
        return this._tag
    }, b.setTag = function(a) {
        this._tag = a
    }, b.load = function() {
        this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this);
        var a = new createjs.Event("initialize");
        a.loader = this._request, this.dispatchEvent(a), this._request.load()
    }, b.cancel = function() {
        this.canceled = !0, this.destroy()
    }, b.destroy = function() {
        this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners()
    }, b.getLoadedItems = function() {
        return this._loadedItems
    }, b._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    }, b._createTag = function() {
        return null
    }, b._sendLoadStart = function() {
        this._isCanceled() || this.dispatchEvent("loadstart")
    }, b._sendProgress = function(a) {
        if (!this._isCanceled()) {
            var b = null;
            "number" == typeof a ? (this.progress = a, b = new createjs.ProgressEvent(this.progress)) : (b = a, this.progress = a.loaded / a.total, b.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(b)
        }
    }, b._sendComplete = function() {
        if (!this._isCanceled()) {
            this.loaded = !0;
            var a = new createjs.Event("complete");
            a.rawResult = this._rawResult, null != this._result && (a.result = this._result), this.dispatchEvent(a)
        }
    }, b._sendError = function(a) {
        !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a))
    }, b._isCanceled = function() {
        return null == window.createjs || this.canceled ? !0 : !1
    }, b.resultFormatter = null, b.handleEvent = function(a) {
        switch (a.type) {
            case "complete":
                this._rawResult = a.target._response;
                var b = this.resultFormatter && this.resultFormatter(this), c = this;
                b instanceof Function ? b(function(a) {
                    c._result = a, c._sendComplete()
                }) : (this._result = b || this._rawResult, this._sendComplete());
                break;
            case "progress":
                this._sendProgress(a);
                break;
            case "error":
                this._sendError(a);
                break;
            case "loadstart":
                this._sendLoadStart();
                break;
            case "abort":
            case "timeout":
                this._isCanceled() || this.dispatchEvent(a.type)
        }
    }, b.buildPath = function(a, b) {
        return createjs.RequestUtils.buildPath(a, b)
    }, b.toString = function() {
        return "[PreloadJS AbstractLoader]"
    }, createjs.AbstractLoader = createjs.promote(a, "EventDispatcher")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.AbstractLoader_constructor(a, b, c), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src"
    }
    var b = createjs.extend(a, createjs.AbstractLoader);
    b.load = function() {
        this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load()
    }, b._createTag = function() {
    }, b._createRequest = function() {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    }, b._formatResult = function(a) {
        return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR && (a.getTag().src = a.getResult(!0)), a.getTag()
    }, createjs.AbstractMediaLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = function(a) {
        this._item = a
    }, b = createjs.extend(a, createjs.EventDispatcher);
    b.load = function() {
    }, b.destroy = function() {
    }, b.cancel = function() {
    }, createjs.AbstractRequest = createjs.promote(a, "EventDispatcher")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1, this._startTagVisibility = null
    }
    var b = createjs.extend(a, createjs.AbstractRequest);
    b.load = function() {
        null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = !0), this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        var a = new createjs.Event("initialize");
        a.loader = this._tag, this.dispatchEvent(a), this._hideTag(), this._tag[this._tagSrcAttribute] = this._item.src
    }, b.destroy = function() {
        this._clean(), this._tag = null, this.AbstractRequest_destroy()
    }, b._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }, b._handleTagComplete = function() {
        this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this._showTag(), this.dispatchEvent("complete")
    }, b._clean = function() {
        this._tag.onload = null, this._tag.onreadystatechange = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag)
    }, b._hideTag = function() {
        this._startTagVisibility = this._tag.style.visibility, this._tag.style.visibility = "hidden"
    }, b._showTag = function() {
        this._tag.style.visibility = this._startTagVisibility
    }, b._handleStalled = function() {
    }, createjs.TagRequest = createjs.promote(a, "AbstractRequest")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c) {
        this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
    }
    var b = createjs.extend(a, createjs.TagRequest);
    b.load = function() {
        this._tag.onstalled = createjs.proxy(this._handleStalled, this), this._tag.onprogress = createjs.proxy(this._handleProgress, this), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load()
    }, b._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete()
    }, b._handleStalled = function() {
    }, b._handleProgress = function(a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded, a.total);
            this.dispatchEvent(b)
        }
    }, b._clean = function() {
        this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._tag.onprogress = null, this.TagRequest__clean()
    }, createjs.MediaTagRequest = createjs.promote(a, "TagRequest")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a) {
        this.AbstractRequest_constructor(a), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), !this._createXHR(a)
    }
    var b = createjs.extend(a, createjs.AbstractRequest);
    a.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b.getResult = function(a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    }, b.cancel = function() {
        this.canceled = !0, this._clean(), this._request.abort()
    }, b.load = function() {
        if (null == this._request)
            return void this._handleError();
        this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
        try {
            this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a))
        }
    }, b.setResponseType = function(a) {
        this._request.responseType = a
    }, b.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    }, b.getResponseHeader = function(a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    }, b._handleProgress = function(a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
            var b = new createjs.ProgressEvent(a.loaded, a.total);
            this.dispatchEvent(b)
        }
    }, b._handleLoadStart = function() {
        clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart")
    }, b._handleAbort = function(a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, a))
    }, b._handleError = function(a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent(a.message))
    }, b._handleReadyStateChange = function() {
        4 == this._request.readyState && this._handleLoad()
    }, b._handleLoad = function() {
        if (!this.loaded) {
            this.loaded = !0;
            var a = this._checkError();
            if (a)
                return void this._handleError(a);
            this._response = this._getResponse(), this._clean(), this.dispatchEvent(new createjs.Event("complete"))
        }
    }, b._handleTimeout = function(a) {
        this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a))
    }, b._checkError = function() {
        var a = parseInt(this._request.status);
        switch (a) {
            case 404:
            case 0:
                return new Error(a)
        }
        return null
    }, b._getResponse = function() {
        if (null != this._response)
            return this._response;
        if (null != this._request.response)
            return this._request.response;
        try {
            if (null != this._request.responseText)
                return this._request.responseText
        } catch (a) {
        }
        try {
            if (null != this._request.responseXML)
                return this._request.responseXML
        } catch (a) {
        }
        return null
    }, b._createXHR = function(a) {
        var b = createjs.RequestUtils.isCrossDomain(a), c = {}, d = null;
        if (window.XMLHttpRequest)
            d = new XMLHttpRequest, b && void 0 === d.withCredentials && window.XDomainRequest && (d = new XDomainRequest);
        else {
            for (var e = 0, f = s.ACTIVEX_VERSIONS.length; f > e; e++) {
                {
                    s.ACTIVEX_VERSIONS[e]
                }
                try {
                    d = new ActiveXObject(axVersions);
                    break
                } catch (g) {
                }
            }
            if (null == d)
                return !1
        }
        a.mimeType && d.overrideMimeType && d.overrideMimeType(a.mimeType), this._xhrLevel = "string" == typeof d.responseType ? 2 : 1;
        var h = null;
        if (h = a.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(a.src, a.values) : a.src, d.open(a.method || createjs.AbstractLoader.GET, h, !0), b && d instanceof XMLHttpRequest && 1 == this._xhrLevel && (c.Origin = location.origin), a.values && a.method == createjs.AbstractLoader.POST && (c["Content-Type"] = "application/x-www-form-urlencoded"), b || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"), a.headers)
            for (var i in a.headers)
                c[i] = a.headers[i];
        for (i in c)
            d.setRequestHeader(i, c[i]);
        return d instanceof XMLHttpRequest && void 0 !== a.withCredentials && (d.withCredentials = a.withCredentials), this._request = d, !0
    }, b._clean = function() {
        clearTimeout(this._loadTimeout), this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)
    }, b.toString = function() {
        return "[PreloadJS XHRRequest]"
    }, createjs.XHRRequest = createjs.promote(a, "AbstractRequest")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b) {
        this.AbstractMediaLoader_constructor(a, b, createjs.AbstractLoader.SOUND), createjs.RequestUtils.isAudioTag(a) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.src) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.tag) && (this._tag = createjs.RequestUtils.isAudioTag(a) ? a : a.src), null != this._tag && (this._preferXHR = !1)
    }
    var b = createjs.extend(a, createjs.AbstractMediaLoader), c = a;
    c.canLoadItem = function(a) {
        return a.type == createjs.AbstractLoader.SOUND
    }, b._createTag = function(a) {
        var b = document.createElement("audio");
        return b.autoplay = !1, b.preload = "none", b.src = a, b
    }, createjs.SoundLoader = createjs.promote(a, "AbstractMediaLoader")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        throw "Sound cannot be instantiated"
    }
    function b(a, b) {
        this.init(a, b)
    }
    var c = a;
    c.INTERRUPT_ANY = "any", c.INTERRUPT_EARLY = "early", c.INTERRUPT_LATE = "late", c.INTERRUPT_NONE = "none", c.PLAY_INITED = "playInited", c.PLAY_SUCCEEDED = "playSucceeded", c.PLAY_INTERRUPTED = "playInterrupted", c.PLAY_FINISHED = "playFinished", c.PLAY_FAILED = "playFailed", c.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"], c.EXTENSION_MAP = {m4a: "mp4"}, c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/, c.defaultInterruptBehavior = c.INTERRUPT_NONE, c.alternateExtensions = [], c.activePlugin = null, c._pluginsRegistered = !1, c._lastID = 0, c._masterVolume = 1, c._masterMute = !1, c._instances = [], c._idHash = {}, c._preloadHash = {}, c.addEventListener = null, c.removeEventListener = null, c.removeAllEventListeners = null, c.dispatchEvent = null, c.hasEventListener = null, c._listeners = null, createjs.EventDispatcher.initialize(c), c.getPreloadHandlers = function() {
        return {callback: createjs.proxy(c.initLoad, c),types: ["sound"],extensions: c.SUPPORTED_EXTENSIONS}
    }, c._handleLoadComplete = function(a) {
        var b = a.target.getItem().src;
        if (c._preloadHash[b])
            for (var d = 0, e = c._preloadHash[b].length; e > d; d++) {
                var f = c._preloadHash[b][d];
                if (c._preloadHash[b][d] = !0, c.hasEventListener("fileload")) {
                    var a = new createjs.Event("fileload");
                    a.src = f.src, a.id = f.id, a.data = f.data, a.sprite = f.sprite, c.dispatchEvent(a)
                }
            }
    }, c._handleLoadError = function(a) {
        var b = a.target.getItem().src;
        if (c._preloadHash[b])
            for (var d = 0, e = c._preloadHash[b].length; e > d; d++) {
                var f = c._preloadHash[b][d];
                if (c._preloadHash[b][d] = !1, c.hasEventListener("fileerror")) {
                    var a = new createjs.Event("fileerror");
                    a.src = f.src, a.id = f.id, a.data = f.data, a.sprite = f.sprite, c.dispatchEvent(a)
                }
            }
    }, c._registerPlugin = function(a) {
        return a.isSupported() ? (c.activePlugin = new a, !0) : !1
    }, c.registerPlugins = function(a) {
        c._pluginsRegistered = !0;
        for (var b = 0, d = a.length; d > b; b++)
            if (c._registerPlugin(a[b]))
                return !0;
        return !1
    }, c.initializeDefaultPlugins = function() {
        return null != c.activePlugin ? !0 : c._pluginsRegistered ? !1 : c.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    }, c.isReady = function() {
        return null != c.activePlugin
    }, c.getCapabilities = function() {
        return null == c.activePlugin ? null : c.activePlugin._capabilities
    }, c.getCapability = function(a) {
        return null == c.activePlugin ? null : c.activePlugin._capabilities[a]
    }, c.initLoad = function(a) {
        return c._registerSound(a)
    }, c._registerSound = function(a) {
        if (!c.initializeDefaultPlugins())
            return !1;
        var d = c._parsePath(a.src);
        if (null == d)
            return !1;
        a.src = d.src, a.type = "sound";
        var e = a.data, f = c.activePlugin.defaultNumChannels || null;
        if (null != e && (isNaN(e.channels) ? isNaN(e) || (f = parseInt(e)) : f = parseInt(e.channels), e.audioSprite))
            for (var g, h = e.audioSprite.length; h--; )
                g = e.audioSprite[h], c._idHash[g.id] = {src: a.src,startTime: parseInt(g.startTime),duration: parseInt(g.duration)};
        null != a.id && (c._idHash[a.id] = {src: a.src});
        var i = c.activePlugin.register(a, f);
        return b.create(a.src, f), null != e && isNaN(e) ? a.data.channels = f || b.maxPerChannel() : a.data = f || b.maxPerChannel(), i.type && (a.type = i.type), i
    }, c.registerSound = function(a, b, d, e) {
        var f = {src: a,id: b,data: d};
        a instanceof Object && (e = b, f = a), f = createjs.LoadItem.create(f), null != e && (f.src = e + a);
        var g = c._registerSound(f);
        if (!g)
            return !1;
        if (c._preloadHash[f.src] || (c._preloadHash[f.src] = []), c._preloadHash[f.src].push(f), 1 == c._preloadHash[f.src].length)
            g.on("complete", createjs.proxy(this._handleLoadComplete, this)), g.on("error", createjs.proxy(this._handleLoadError, this)), c.activePlugin.preload(g);
        else if (1 == c._preloadHash[f.src][0])
            return !0;
        return f
    }, c.registerSounds = function(a, b) {
        var c = [];
        a.path && (b ? b += a.path : b = a.path);
        for (var d = 0, e = a.length; e > d; d++)
            c[d] = createjs.Sound.registerSound(a[d].src, a[d].id, a[d].data, b);
        return c
    }, c.registerManifest = function(a, b) {
        try {
            console.log("createjs.Sound.registerManifest is deprecated, please use createjs.Sound.registerSounds.")
        } catch (c) {
        }
        return this.registerSounds(a, b)
    }, c.removeSound = function(a, d) {
        if (null == c.activePlugin)
            return !1;
        a instanceof Object && (a = a.src), a = c._getSrcById(a).src, null != d && (a = d + a);
        var e = c._parsePath(a);
        if (null == e)
            return !1;
        a = e.src;
        for (var f in c._idHash)
            c._idHash[f].src == a && delete c._idHash[f];
        return b.removeSrc(a), delete c._preloadHash[a], c.activePlugin.removeSound(a), !0
    }, c.removeSounds = function(a, b) {
        var c = [];
        a.path && (b ? b += a.path : b = a.path);
        for (var d = 0, e = a.length; e > d; d++)
            c[d] = createjs.Sound.removeSound(a[d].src, b);
        return c
    }, c.removeManifest = function(a, b) {
        try {
            console.log("createjs.Sound.removeManifest is deprecated, please use createjs.Sound.removeSounds.")
        } catch (d) {
        }
        return c.removeSounds(a, b)
    }, c.removeAllSounds = function() {
        c._idHash = {}, c._preloadHash = {}, b.removeAll(), c.activePlugin && c.activePlugin.removeAllSounds()
    }, c.loadComplete = function(a) {
        if (!c.isReady())
            return !1;
        var b = c._parsePath(a);
        return a = b ? c._getSrcById(b.src).src : c._getSrcById(a).src, 1 == c._preloadHash[a][0]
    }, c._parsePath = function(a) {
        "string" != typeof a && (a = a.toString());
        var b = a.match(c.FILE_PATTERN);
        if (null == b)
            return !1;
        for (var d = b[4], e = b[5], f = c.getCapabilities(), g = 0; !f[e]; )
            if (e = c.alternateExtensions[g++], g > c.alternateExtensions.length)
                return null;
        a = a.replace("." + b[5], "." + e);
        var h = {name: d,src: a,extension: e};
        return h
    }, c.play = function(a, b, d, e, f, g, h, i, j) {
        b instanceof Object && (d = b.delay, e = b.offset, f = b.loop, g = b.volume, h = b.pan, i = b.startTime, j = b.duration, b = b.interrupt);
        var k = c.createInstance(a, i, j), l = c._playInstance(k, b, d, e, f, g, h);
        return l || k._playFailed(), k
    }, c.createInstance = function(a, d, e) {
        if (!c.initializeDefaultPlugins())
            return new createjs.DefaultSoundInstance(a, d, e);
        a = c._getSrcById(a);
        var f = c._parsePath(a.src), g = null;
        return null != f && null != f.src ? (b.create(f.src), null == d && (d = a.startTime), g = c.activePlugin.create(f.src, d, e || a.duration)) : g = new createjs.DefaultSoundInstance(a, d, e), g.uniqueId = c._lastID++, g
    }, c.setVolume = function(a) {
        if (null == Number(a))
            return !1;
        if (a = Math.max(0, Math.min(1, a)), c._masterVolume = a, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a))
            for (var b = this._instances, d = 0, e = b.length; e > d; d++)
                b[d].setMasterVolume(a)
    }, c.getVolume = function() {
        return c._masterVolume
    }, c.setMute = function(a) {
        if (null == a)
            return !1;
        if (this._masterMute = a, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a))
            for (var b = this._instances, c = 0, d = b.length; d > c; c++)
                b[c].setMasterMute(a);
        return !0
    }, c.getMute = function() {
        return this._masterMute
    }, c.stop = function() {
        for (var a = this._instances, b = a.length; b--; )
            a[b].stop()
    }, c._playInstance = function(a, b, d, e, f, g, h) {
        if (b instanceof Object && (d = b.delay, e = b.offset, f = b.loop, g = b.volume, h = b.pan, b = b.interrupt), b = b || c.defaultInterruptBehavior, null == d && (d = 0), null == e && (e = a.getPosition()), null == f && (f = a.loop), null == g && (g = a.volume), null == h && (h = a.pan), 0 == d) {
            var i = c._beginPlaying(a, b, e, f, g, h);
            if (!i)
                return !1
        } else {
            var j = setTimeout(function() {
                c._beginPlaying(a, b, e, f, g, h)
            }, d);
            a.delayTimeoutId = j
        }
        return this._instances.push(a), !0
    }, c._beginPlaying = function(a, c, d, e, f, g) {
        if (!b.add(a, c))
            return !1;
        var h = a._beginPlaying(d, e, f, g);
        if (!h) {
            var i = createjs.indexOf(this._instances, a);
            return i > -1 && this._instances.splice(i, 1), !1
        }
        return !0
    }, c._getSrcById = function(a) {
        return c._idHash[a] || {src: a}
    }, c._playFinished = function(a) {
        b.remove(a);
        var c = createjs.indexOf(this._instances, a);
        c > -1 && this._instances.splice(c, 1)
    }, createjs.Sound = a, b.channels = {}, b.create = function(a, c) {
        var d = b.get(a);
        return null == d ? (b.channels[a] = new b(a, c), !0) : !1
    }, b.removeSrc = function(a) {
        var c = b.get(a);
        return null == c ? !1 : (c._removeAll(), delete b.channels[a], !0)
    }, b.removeAll = function() {
        for (var a in b.channels)
            b.channels[a]._removeAll();
        b.channels = {}
    }, b.add = function(a, c) {
        var d = b.get(a.src);
        return null == d ? !1 : d._add(a, c)
    }, b.remove = function(a) {
        var c = b.get(a.src);
        return null == c ? !1 : (c._remove(a), !0)
    }, b.maxPerChannel = function() {
        return d.maxDefault
    }, b.get = function(a) {
        return b.channels[a]
    };
    var d = b.prototype;
    d.constructor = b, d.src = null, d.max = null, d.maxDefault = 100, d.length = 0, d.init = function(a, b) {
        this.src = a, this.max = b || this.maxDefault, -1 == this.max && (this.max = this.maxDefault), this._instances = []
    }, d._get = function(a) {
        return this._instances[a]
    }, d._add = function(a, b) {
        return this._getSlot(b, a) ? (this._instances.push(a), this.length++, !0) : !1
    }, d._remove = function(a) {
        var b = createjs.indexOf(this._instances, a);
        return -1 == b ? !1 : (this._instances.splice(b, 1), this.length--, !0)
    }, d._removeAll = function() {
        for (var a = this.length - 1; a >= 0; a--)
            this._instances[a].stop()
    }, d._getSlot = function(b) {
        var c, d;
        if (b != a.INTERRUPT_NONE && (d = this._get(0), null == d))
            return !0;
        for (var e = 0, f = this.max; f > e; e++) {
            if (c = this._get(e), null == c)
                return !0;
            if (c.playState == a.PLAY_FINISHED || c.playState == a.PLAY_INTERRUPTED || c.playState == a.PLAY_FAILED) {
                d = c;
                break
            }
            b != a.INTERRUPT_NONE && (b == a.INTERRUPT_EARLY && c.getPosition() < d.getPosition() || b == a.INTERRUPT_LATE && c.getPosition() > d.getPosition()) && (d = c)
        }
        return null != d ? (d._interrupt(), this._remove(d), !0) : !1
    }, d.toString = function() {
        return "[Sound SoundChannel]"
    }
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = function(a, b, c, d) {
        this.EventDispatcher_constructor(), this.src = a, this.uniqueId = -1, this.playState = null, this.delayTimeoutId = null, this._startTime = Math.max(0, b || 0), this._volume = 1, createjs.definePropertySupported && Object.defineProperty(this, "volume", {get: this.getVolume,set: this.setVolume}), this._pan = 0, createjs.definePropertySupported && Object.defineProperty(this, "pan", {get: this.getPan,set: this.setPan}), this._duration = Math.max(0, c || 0), createjs.definePropertySupported && Object.defineProperty(this, "duration", {get: this.getDuration,set: this.setDuration}), this._playbackResource = null, createjs.definePropertySupported && Object.defineProperty(this, "playbackResource", {get: this.getPlaybackResource,set: this.setPlaybackResource}), d !== !1 && d !== !0 && this.setPlaybackResource(d), this._position = 0, createjs.definePropertySupported && Object.defineProperty(this, "position", {get: this.getPosition,set: this.setPosition}), this._loop = 0, createjs.definePropertySupported && Object.defineProperty(this, "loop", {get: this.getLoop,set: this.setLoop}), this._muted = !1, createjs.definePropertySupported && Object.defineProperty(this, "muted", {get: this.getMuted,set: this.setMuted}), this._paused = !1, createjs.definePropertySupported && Object.defineProperty(this, "paused", {get: this.getPaused,set: this.setPaused})
    }, b = createjs.extend(a, createjs.EventDispatcher);
    b.play = function(a, b, c, d, e, f) {
        return this.playState == createjs.Sound.PLAY_SUCCEEDED ? (a instanceof Object && (c = a.offset, d = a.loop, e = a.volume, f = a.pan), null != c && this.setPosition(c), null != d && this.setLoop(d), null != e && this.setVolume(e), null != f && this.setPan(f), void (this._paused && this.setPaused(!1))) : (this._cleanUp(), createjs.Sound._playInstance(this, a, b, c, d, e, f), this)
    }, b.pause = function() {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? !1 : (this.setPaused(!0), !0)
    }, b.resume = function() {
        return this._paused ? (this.setPaused(!1), !0) : !1
    }, b.stop = function() {
        return this._position = 0, this._paused = !1, this._handleStop(), this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, this
    }, b.destroy = function() {
        this._cleanUp(), this.src = null, this.playbackResource = null, this.removeAllEventListeners()
    }, b.toString = function() {
        return "[AbstractSoundInstance]"
    }, b.getPaused = function() {
        return this._paused
    }, b.setPaused = function(a) {
        return a !== !0 && a !== !1 || this._paused == a || 1 == a && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = a, a ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this)
    }, b.setVolume = function(a) {
        return a == this._volume ? this : (this._volume = Math.max(0, Math.min(1, a)), this._muted || this._updateVolume(), this)
    }, b.getVolume = function() {
        return this._volume
    }, b.setMute = function(a) {
        this.setMuted(a)
    }, b.getMute = function() {
        return this._muted
    }, b.setMuted = function(a) {
        return a === !0 || a === !1 ? (this._muted = a, this._updateVolume(), this) : void 0
    }, b.getMuted = function() {
        return this._muted
    }, b.setPan = function(a) {
        return a == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, a)), this._updatePan(), this)
    }, b.getPan = function() {
        return this._pan
    }, b.getPosition = function() {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ? this._position : this._calculateCurrentPosition()
    }, b.setPosition = function(a) {
        return this._position = Math.max(0, a), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this
    }, b.getDuration = function() {
        return this._duration
    }, b.setDuration = function(a) {
        return a == this._duration ? this : (this._duration = Math.max(0, a || 0), this._updateDuration(), this)
    }, b.setPlaybackResource = function(a) {
        return this._playbackResource = a, 0 == this._duration && this._setDurationFromSource(), this
    }, b.getPlaybackResource = function() {
        return this._playbackResource
    }, b.getLoop = function() {
        return this._loop
    }, b.setLoop = function(a) {
        null != this._playbackResource && (0 != this._loop && 0 == a && this._removeLooping(a), 0 == this._loop && 0 != a && this._addLooping(a)), this._loop = a
    }, b._sendEvent = function(a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b)
    }, b._cleanUp = function() {
        clearTimeout(this.delayTimeoutId), this._handleCleanUp(), this._paused = !1, createjs.Sound._playFinished(this)
    }, b._interrupt = function() {
        this._cleanUp(), this.playState = createjs.Sound.PLAY_INTERRUPTED, this._sendEvent("interrupted")
    }, b._beginPlaying = function(a, b, c, d) {
        return this.setPosition(a), this.setLoop(b), this.setVolume(c), this.setPan(d), null != this._playbackResource && this._position < this._duration ? (this._paused = !1, this._handleSoundReady(), this.playState = createjs.Sound.PLAY_SUCCEEDED, this._sendEvent("succeeded"), !0) : (this._playFailed(), !1)
    }, b._playFailed = function() {
        this._cleanUp(), this.playState = createjs.Sound.PLAY_FAILED, this._sendEvent("failed")
    }, b._handleSoundComplete = function() {
        return this._position = 0, 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, void this._sendEvent("complete"))
    }, b._handleSoundReady = function() {
    }, b._updateVolume = function() {
    }, b._updatePan = function() {
    }, b._updateDuration = function() {
    }, b._setDurationFromSource = function() {
    }, b._calculateCurrentPosition = function() {
    }, b._updatePosition = function() {
    }, b._removeLooping = function() {
    }, b._addLooping = function() {
    }, b._pause = function() {
    }, b._resume = function() {
    }, b._handleStop = function() {
    }, b._handleCleanUp = function() {
    }, b._handleLoop = function() {
    }, createjs.AbstractSoundInstance = createjs.promote(a, "EventDispatcher"), createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    var a = function() {
        this._capabilities = null, this._loaders = {}, this._audioSources = {}, this._soundInstances = {}, this._loaderClass, this._soundInstanceClass
    }, b = a.prototype;
    a._capabilities = null, a.isSupported = function() {
        return !0
    }, b.register = function(a) {
        if (this._audioSources[a.src] = !0, this._soundInstances[a.src] = [], this._loaders[a.src])
            return this._loaders[a.src];
        var b = new this._loaderClass(a);
        return b.on("complete", createjs.proxy(this._handlePreloadComplete, this)), this._loaders[a.src] = b, b
    }, b.preload = function(a) {
        a.on("error", createjs.proxy(this._handlePreloadError, this)), a.load()
    }, b.isPreloadStarted = function(a) {
        return null != this._audioSources[a]
    }, b.isPreloadComplete = function(a) {
        return !(null == this._audioSources[a] || 1 == this._audioSources[a])
    }, b.removeSound = function(a) {
        if (this._soundInstances[a]) {
            for (var b = this._soundInstances[a].length; b--; ) {
                var c = this._soundInstances[a][b];
                c.destroy()
            }
            delete this._soundInstances[a], delete this._audioSources[a], this._loaders[a] && this._loaders[a].destroy(), delete this._loaders[a]
        }
    }, b.removeAllSounds = function() {
        for (var a in this._audioSources)
            this.removeSound(a)
    }, b.create = function(a, b, c) {
        this.isPreloadStarted(a) || this.preload(this.register(a));
        var d = new this._soundInstanceClass(a, b, c, this._audioSources[a]);
        return this._soundInstances[a].push(d), d
    }, b.setVolume = function(a) {
        return this._volume = a, this._updateVolume(), !0
    }, b.getVolume = function() {
        return this._volume
    }, b.setMute = function() {
        return this._updateVolume(), !0
    }, b.toString = function() {
        return "[AbstractPlugin]"
    }, b._handlePreloadComplete = function(a) {
        var b = a.target.getItem().src;
        this._audioSources[b] = a.result;
        for (var c = 0, d = this._soundInstances[b].length; d > c; c++) {
            var e = this._soundInstances[b][c];
            e.setPlaybackResource(this._audioSources[b])
        }
    }, b._handlePreloadError = function() {
    }, b._updateVolume = function() {
    }, createjs.AbstractPlugin = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.SOUND)
    }
    var b = createjs.extend(a, createjs.AbstractLoader);
    a.context = null, b.toString = function() {
        return "[WebAudioLoader]"
    }, b._createRequest = function() {
        this._request = new createjs.XHRRequest(this._item, !1), this._request.setResponseType("arraybuffer")
    }, b._sendComplete = function() {
        a.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._handleError, this))
    }, b._handleAudioDecoded = function(a) {
        this._result = a, this.AbstractLoader__sendComplete()
    }, createjs.WebAudioLoader = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, d, e) {
        this.AbstractSoundInstance_constructor(a, b, d, e), this.gainNode = c.context.createGain(), this.panNode = c.context.createPanner(), this.panNode.panningModel = c._panningModel, this.panNode.connect(this.gainNode), this.sourceNode = null, this._soundCompleteTimeout = null, this._sourceNodeNext = null, this._playbackStartTime = 0, this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
    }
    var b = createjs.extend(a, createjs.AbstractSoundInstance), c = a;
    c.context = null, c.destinationNode = null, c._panningModel = "equalpower", b.destroy = function() {
        this.AbstractSoundInstance_destroy(), this.panNode.disconnect(0), this.panNode = null, this.gainNode.disconnect(0), this.gainNode = null
    }, b.toString = function() {
        return "[WebAudioSoundInstance]"
    }, b._updatePan = function() {
        this.panNode.setPosition(this._pan, 0, -.5)
    }, b._removeLooping = function() {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
    }, b._addLooping = function() {
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
    }, b._setDurationFromSource = function() {
        this._duration = 1e3 * this.playbackResource.duration
    }, b._handleCleanUp = function() {
        this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout), this._playbackStartTime = 0
    }, b._cleanUpAudioNode = function(a) {
        return a && (a.stop(0), a.disconnect(0), a = null), a
    }, b._handleSoundReady = function() {
        this.gainNode.connect(c.destinationNode);
        var a = .001 * this._duration, b = .001 * this._position;
        this.sourceNode = this._createAndPlayAudioNode(c.context.currentTime - a, b), this._playbackStartTime = this.sourceNode.startTime - b, this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (a - b)), 0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
    }, b._createAndPlayAudioNode = function(a, b) {
        var d = c.context.createBufferSource();
        d.buffer = this.playbackResource, d.connect(this.panNode);
        var e = .001 * this._duration;
        return d.startTime = a + e, d.start(d.startTime, b + .001 * this._startTime, e - b), d
    }, b._pause = function() {
        this._position = 1e3 * (c.context.currentTime - this._playbackStartTime), this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout)
    }, b._resume = function() {
        this._handleSoundReady()
    }, b._updateVolume = function() {
        var a = this._muted ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    }, b._calculateCurrentPosition = function() {
        return 1e3 * (c.context.currentTime - this._playbackStartTime)
    }, b._updatePosition = function() {
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), clearTimeout(this._soundCompleteTimeout), this._paused || this._handleSoundReady()
    }, b._handleLoop = function() {
        this._cleanUpAudioNode(this.sourceNode), this.sourceNode = this._sourceNodeNext, this._playbackStartTime = this.sourceNode.startTime, this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0), this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
    }, b._updateDuration = function() {
        this._pause(), this._resume()
    }, createjs.WebAudioSoundInstance = createjs.promote(a, "AbstractSoundInstance")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        this.AbstractPlugin_constructor(), this._panningModel = c._panningModel, this._volume = 1, this.context = c.context, this.dynamicsCompressorNode = this.context.createDynamicsCompressor(), this.dynamicsCompressorNode.connect(this.context.destination), this.gainNode = this.context.createGain(), this.gainNode.connect(this.dynamicsCompressorNode), createjs.WebAudioSoundInstance.destinationNode = this.gainNode, this._capabilities = c._capabilities, this._loaderClass = createjs.WebAudioLoader, this._soundInstanceClass = createjs.WebAudioSoundInstance, this._addPropsToClasses()
    }
    var b = createjs.extend(a, createjs.AbstractPlugin), c = a;
    c._capabilities = null, c._panningModel = "equalpower", c.context = null, c.isSupported = function() {
        var a = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || a || this._isFileXHRSupported() ? (c._generateCapabilities(), null == c.context ? !1 : !0) : !1
    }, c.playEmptySound = function() {
        var a = c.context.createBufferSource();
        a.buffer = c.context.createBuffer(1, 1, 22050), a.connect(c.context.destination), a.start(0, 0, 0)
    }, c._isFileXHRSupported = function() {
        var a = !0, b = new XMLHttpRequest;
        try {
            b.open("GET", "WebAudioPluginTest.fail", !1)
        } catch (c) {
            return a = !1
        }
        b.onerror = function() {
            a = !1
        }, b.onload = function() {
            a = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
        };
        try {
            b.send()
        } catch (c) {
            a = !1
        }
        return a
    }, c._generateCapabilities = function() {
        if (null == c._capabilities) {
            var a = document.createElement("audio");
            if (null == a.canPlayType)
                return null;
            if (null == c.context)
                if (window.AudioContext)
                    c.context = new AudioContext;
                else {
                    if (!window.webkitAudioContext)
                        return null;
                    c.context = new webkitAudioContext
                }
            c._compatibilitySetUp(), c.playEmptySound(), c._capabilities = {panning: !0,volume: !0,tracks: -1};
            for (var b = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = b.length; f > e; e++) {
                var g = b[e], h = d[g] || g;
                c._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
            c.context.destination.numberOfChannels < 2 && (c._capabilities.panning = !1)
        }
    }, c._compatibilitySetUp = function() {
        if (c._panningModel = "equalpower", !c.context.createGain) {
            c.context.createGain = c.context.createGainNode;
            var a = c.context.createBufferSource();
            a.__proto__.start = a.__proto__.noteGrainOn, a.__proto__.stop = a.__proto__.noteOff, c._panningModel = 0
        }
    }, b.toString = function() {
        return "[WebAudioPlugin]"
    }, b._addPropsToClasses = function() {
        var a = this._soundInstanceClass;
        a.context = this.context, a.destinationNode = this.gainNode, a._panningModel = this._panningModel, this._loaderClass.context = this.context
    }, b._updateVolume = function() {
        var a = createjs.Sound._masterMute ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    }, createjs.WebAudioPlugin = createjs.promote(a, "AbstractPlugin")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a) {
        this.src = a, this.length = 0, this.available = 0, this.tags = [], this.duration = 0
    }
    var b = a.prototype;
    b.constructor = a;
    var c = a;
    c.tags = {}, c.get = function(b) {
        var d = c.tags[b];
        return null == d && (d = c.tags[b] = new a(b)), d
    }, c.remove = function(a) {
        var b = c.tags[a];
        return null == b ? !1 : (b.removeAll(), delete c.tags[a], !0)
    }, c.getInstance = function(a) {
        var b = c.tags[a];
        return null == b ? null : b.get()
    }, c.setInstance = function(a, b) {
        var d = c.tags[a];
        return null == d ? null : d.set(b)
    }, c.getDuration = function(a) {
        var b = c.tags[a];
        return null == b ? 0 : b.getDuration()
    }, b.add = function(a) {
        this.tags.push(a), this.length++, this.available++
    }, b.removeAll = function() {
        for (var a; this.length--; )
            a = this.tags[this.length], a.parentNode && a.parentNode.removeChild(a), delete this.tags[this.length];
        this.src = null, this.tags.length = 0
    }, b.get = function() {
        if (0 == this.tags.length)
            return null;
        this.available = this.tags.length;
        var a = this.tags.pop();
        return null == a.parentNode && document.body.appendChild(a), a
    }, b.set = function(a) {
        var b = createjs.indexOf(this.tags, a);
        -1 == b && this.tags.push(a), this.available = this.tags.length
    }, b.getDuration = function() {
        return this.duration || (this.duration = 1e3 * this.tags[this.tags.length - 1].duration), this.duration
    }, b.toString = function() {
        return "[HTMLAudioTagPool]"
    }, createjs.HTMLAudioTagPool = a
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a(a, b, c, d) {
        this.AbstractSoundInstance_constructor(a, b, c, d), this._audioSpriteStopTime = null, this._delayTimeoutId = null, this._endedHandler = createjs.proxy(this._handleSoundComplete, this), this._readyHandler = createjs.proxy(this._handleTagReady, this), this._stalledHandler = createjs.proxy(this.playFailed, this), this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this), this._loopHandler = createjs.proxy(this._handleSoundComplete, this), c ? this._audioSpriteStopTime = .001 * (b + c) : this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)
    }
    var b = createjs.extend(a, createjs.AbstractSoundInstance);
    b.setMasterVolume = function() {
        this._updateVolume()
    }, b.setMasterMute = function() {
        this._updateVolume()
    }, b.toString = function() {
        return "[HTMLAudioSoundInstance]"
    }, b._removeLooping = function() {
        null != this._playbackResource && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }, b._addLooping = function() {
        null == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0)
    }, b._handleCleanUp = function() {
        var a = this._playbackResource;
        if (null != a) {
            a.pause(), a.loop = !1, a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
            try {
                a.currentTime = this._startTime
            } catch (b) {
            }
            createjs.HTMLAudioTagPool.setInstance(this.src, a), this._playbackResource = null
        }
    }, b._beginPlaying = function(a, b, c, d) {
        return this._playbackResource = createjs.HTMLAudioTagPool.getInstance(this.src), this.AbstractSoundInstance__beginPlaying(a, b, c, d)
    }, b._handleSoundReady = function() {
        if (4 !== this._playbackResource.readyState) {
            var a = this._playbackResource;
            return a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), a.preload = "auto", void a.load()
        }
        this._updateVolume(), this._playbackResource.currentTime = .001 * (this._startTime + this._position), this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), 0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0)), this._playbackResource.play()
    }, b._handleTagReady = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), this._handleSoundReady()
    }, b._pause = function() {
        this._playbackResource.pause()
    }, b._resume = function() {
        this._playbackResource.play()
    }, b._updateVolume = function() {
        if (null != this._playbackResource) {
            var a = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
            a != this._playbackResource.volume && (this._playbackResource.volume = a)
        }
    }, b._calculateCurrentPosition = function() {
        return 1e3 * this._playbackResource.currentTime - this._startTime
    }, b._updatePosition = function() {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
        try {
            this._playbackResource.currentTime = .001 * (this._position + this._startTime)
        } catch (a) {
            this._handleSetPositionSeek(null)
        }
    }, b._handleSetPositionSeek = function() {
        null != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }, b._handleAudioSpriteLoop = function() {
        this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(), 0 == this._loop ? this._handleSoundComplete(null) : (this._position = 0, this._loop--, this._playbackResource.currentTime = .001 * this._startTime, this._paused || this._playbackResource.play(), this._sendEvent("loop")))
    }, b._handleLoop = function() {
        0 == this._loop && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    }, b._updateDuration = function() {
        this._audioSpriteStopTime = .001 * (startTime + duration), this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
    }, createjs.HTMLAudioSoundInstance = createjs.promote(a, "AbstractSoundInstance")
}(), this.createjs = this.createjs || {}, function() {
    "use strict";
    function a() {
        this.AbstractPlugin_constructor(), this.defaultNumChannels = 2, this._capabilities = c._capabilities, this._loaderClass = createjs.SoundLoader, this._soundInstanceClass = createjs.HTMLAudioSoundInstance
    }
    var b = createjs.extend(a, createjs.AbstractPlugin), c = a;
    c.MAX_INSTANCES = 30, c._AUDIO_READY = "canplaythrough", c._AUDIO_ENDED = "ended", c._AUDIO_SEEKED = "seeked", c._AUDIO_STALLED = "stalled", c._TIME_UPDATE = "timeupdate", c._capabilities = null, c.enableIOS = !1, c.isSupported = function() {
        return c._generateCapabilities(), null == c._capabilities ? !1 : !0
    }, c._generateCapabilities = function() {
        if (null == c._capabilities) {
            var a = document.createElement("audio");
            if (null == a.canPlayType)
                return null;
            c._capabilities = {panning: !0,volume: !0,tracks: -1};
            for (var b = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = b.length; f > e; e++) {
                var g = b[e], h = d[g] || g;
                c._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h)
            }
        }
    }, b.register = function(a, b) {
        for (var c = createjs.HTMLAudioTagPool.get(a.src), d = null, e = 0; b > e; e++)
            d = this._createTag(a.src), c.add(d);
        var f = this.AbstractPlugin_register(a, b);
        return f.setTag(d), f
    }, b.removeSound = function(a) {
        this.AbstractPlugin_removeSound(a), createjs.HTMLAudioTagPool.remove(a)
    }, b.create = function(a, b, c) {
        var d = this.AbstractPlugin_create(a, b, c);
        return d.setPlaybackResource(null), d
    }, b.toString = function() {
        return "[HTMLAudioPlugin]"
    }, b.setVolume = b.getVolume = b.setMute = null, b._createTag = function(a) {
        var b = document.createElement("audio");
        return b.autoplay = !1, b.preload = "none", b.src = a, b
    }, createjs.HTMLAudioPlugin = createjs.promote(a, "AbstractPlugin")
}();
