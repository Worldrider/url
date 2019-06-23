/**
 * --------------------------------------------------------------------------
 * Url (v1.0.0): url.js
 * Licensed under MIT (https://github.com/Worldrider/url/blob/master/LICENSE.txt)
 * --------------------------------------------------------------------------
 */
"use strict";

class Url {
    /*
    * url.js is a simple util to set url parameters from object and get url parameters as object
    *
    * var url = new Url("http://localhost:8000#hash")
    *
    * url.data = {
    *     profile: 1,
    *     group: [42, 13, 7],
    *     name: "Jane",
    *     tag: ["wow", "such", "test"],
    * }
    *
    * url.toString()
    * "http://localhost:8000?profile=1&group=42&group=13&group=7&name=Jane&tag=wow&tag=such&tag=test#hash")
    *
    * url.data.group = [1, 2, 3, 4, 5]
    * url.data.name = "John"
    *
    * url.toString()
    * "http://localhost:8000?profile=1&name=John&group=1&group=2&group=3&group=4&group=5&tag=wow&tag=such&tag=test#hash")
    *
    * url.data = null
    * url.toString()
    * "http://localhost:8000#hash"
    *
    * url = new Url("http://localhost:8000?profile=1&name=John&group=1&group=2&group=3&group=4&group=5&tag=wow&tag=such&tag=test#hash"))
    *
    * url.data
    * {
    *     profile: 1,
    *     name: "John",
    *     group: [1, 2, 3, 4, 5],
    *     tag: ["wow", "such", "test"],
    * }
    */

    constructor(url, data) {
        let self = this;
        this.url = url ? url : window.location.href
        this.data = Url.getParams(this.url)
        if (data) {
            this.url = Url.setParams(self.url, data)
        }
    }
    toString () {
        var url = this.url
        var data = this.data
        this.url = Url.setParams(url, data)
        return this.url
    }
    static getParams (url) {
        var query = url ? url.split('?')[1] : window.location.search.slice(1);
        var obj = {};
        if (query) {
            query = query.split('#')[0];
            var arr = query.split('&');
            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');
                var name = a[0];
                var value = typeof (a[1]) === 'undefined' ? true : a[1];
                if (parseInt(value)) {
                    value = parseInt(value)
                }
                if (name.match(/\[(\d+)?\]$/)) {
                    var key = name.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];
                    if (name.match(/\[\d+\]$/)) {
                        var index = /\[(\d+)\]/.exec(name)[1];
                        obj[key][index] = value;
                    } else {
                        obj[key].push(value);
                    }
                } else {
                    if (!obj[name]) {
                        obj[name] = value;
                    } else if (obj[name] && !Array.isArray(obj[name])){
                        obj[name] = [obj[name]];
                        obj[name].push(value);
                    } else {
                        obj[name].push(value);
                    }
                }
            }
        }
        return obj;
    }
    static setParams (url, params) {
        function removeParam (url, key) {
            // var searchParams = new URLSearchParams(url);
            // searchParams.delete(key)
            // return searchParams.toString()

            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            while (url.match(re)) {
                url = url.replace(new RegExp("([?&]?)" + key + "=[^&]*", "i"), '');
                if (url.slice(-1) === '?') {
                    url = url.slice(0, -1);
                }
                if (url.indexOf('?') === -1) {
                    url = url.replace(/&/, '?')
                }
            }
            return url
        }
        var i = url.indexOf('#');
        var hash = i === -1 ? '' : url.substr(i);

        if (!params || JSON.stringify(params) == "{}") {
            let bare = url.split('?')[0];
            bare = bare.split('&')[0];
            bare = bare.split('#')[0];
            return bare + hash
        }
        url = i === -1 ? url : url.substr(0, i);
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var value = params[key]
                if (value != null && value.constructor.name === "Object") {
                    throw new TypeError("Parameter can only be primitive type or an Array")
                }

                var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
                var separator = url.indexOf('?') !== -1 ? "&" : "?";

                if (value == undefined || value == null) {
                    url = removeParam(url, key)
                } else if (url.match(re)) {
                    if (Array.isArray(value)) {
                        url = removeParam(url, key)
                        for (var i = 0; i < value.length; i++) {
                            url += separator + key + "=" + value[i];
                        }
                    } else {
                        url = url.replace(re, '$1' + key + "=" + value + '$2');
                    }
                } else {
                    if (Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            url += separator + key + "=" + value[i];
                        }
                    } else {
                        url = url + separator + key + "=" + value;
                    }
                }
            }
        }
        return url + hash;
    }
}
