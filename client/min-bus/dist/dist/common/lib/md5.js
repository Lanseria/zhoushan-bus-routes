'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* JavaScript MD5
* https://github.com/blueimp/JavaScript-MD5
*
* Copyright 2011, Sebastian Tschan
* https://blueimp.net
*
* Licensed under the MIT license:
* https://opensource.org/licenses/MIT
*
* Based on
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/

/* global define */

function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length.
*/
function binlMD5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
  var i;
  var output = '';
  var length32 = input.length * 32;
  for (i = 0; i < length32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
  }
  return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  var length8 = input.length * 8;
  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
  }
  return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstrMD5(s) {
  return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstrHMACMD5(key, data) {
  var i;
  var bkey = rstr2binl(key);
  var ipad = [];
  var opad = [];
  var hash;
  ipad[15] = opad[15] = undefined;
  if (bkey.length > 16) {
    bkey = binlMD5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }
  hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
  var hexTab = '0123456789abcdef';
  var output = '';
  var x;
  var i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
  }
  return output;
}

/*
* Encode a string as utf-8
*/
function str2rstrUTF8(input) {
  return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function rawMD5(s) {
  return rstrMD5(str2rstrUTF8(s));
}
function hexMD5(s) {
  return rstr2hex(rawMD5(s));
}
function rawHMACMD5(k, d) {
  return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
}
function hexHMACMD5(k, d) {
  return rstr2hex(rawHMACMD5(k, d));
}

function md5(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hexMD5(string);
    }
    return rawMD5(string);
  }
  if (!raw) {
    return hexHMACMD5(key, string);
  }
  return rawHMACMD5(key, string);
}
exports.default = md5;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1kNS5qcyJdLCJuYW1lcyI6WyJzYWZlQWRkIiwieCIsInkiLCJsc3ciLCJtc3ciLCJiaXRSb3RhdGVMZWZ0IiwibnVtIiwiY250IiwibWQ1Y21uIiwicSIsImEiLCJiIiwicyIsInQiLCJtZDVmZiIsImMiLCJkIiwibWQ1Z2ciLCJtZDVoaCIsIm1kNWlpIiwiYmlubE1ENSIsImxlbiIsImkiLCJvbGRhIiwib2xkYiIsIm9sZGMiLCJvbGRkIiwibGVuZ3RoIiwiYmlubDJyc3RyIiwiaW5wdXQiLCJvdXRwdXQiLCJsZW5ndGgzMiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJzdHIyYmlubCIsInVuZGVmaW5lZCIsImxlbmd0aDgiLCJjaGFyQ29kZUF0IiwicnN0ck1ENSIsInJzdHJITUFDTUQ1Iiwia2V5IiwiZGF0YSIsImJrZXkiLCJpcGFkIiwib3BhZCIsImhhc2giLCJjb25jYXQiLCJyc3RyMmhleCIsImhleFRhYiIsImNoYXJBdCIsInN0cjJyc3RyVVRGOCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmF3TUQ1IiwiaGV4TUQ1IiwicmF3SE1BQ01ENSIsImsiLCJoZXhITUFDTUQ1IiwibWQ1Iiwic3RyaW5nIiwicmF3Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOztBQUVBLFNBQVNBLE9BQVQsQ0FBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QjtBQUN0QixNQUFJQyxNQUFNLENBQUNGLElBQUksTUFBTCxLQUFnQkMsSUFBSSxNQUFwQixDQUFWO0FBQ0EsTUFBSUUsTUFBTSxDQUFDSCxLQUFLLEVBQU4sS0FBYUMsS0FBSyxFQUFsQixLQUF5QkMsT0FBTyxFQUFoQyxDQUFWO0FBQ0EsU0FBUUMsT0FBTyxFQUFSLEdBQWVELE1BQU0sTUFBNUI7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU0UsYUFBVCxDQUF3QkMsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDO0FBQ2hDLFNBQVFELE9BQU9DLEdBQVIsR0FBZ0JELFFBQVMsS0FBS0MsR0FBckM7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU0MsTUFBVCxDQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQlYsQ0FBMUIsRUFBNkJXLENBQTdCLEVBQWdDQyxDQUFoQyxFQUFtQztBQUNqQyxTQUFPYixRQUFRSyxjQUFjTCxRQUFRQSxRQUFRVSxDQUFSLEVBQVdELENBQVgsQ0FBUixFQUF1QlQsUUFBUUMsQ0FBUixFQUFXWSxDQUFYLENBQXZCLENBQWQsRUFBcURELENBQXJELENBQVIsRUFBaUVELENBQWpFLENBQVA7QUFDRDtBQUNELFNBQVNHLEtBQVQsQ0FBZ0JKLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkksQ0FBdEIsRUFBeUJDLENBQXpCLEVBQTRCZixDQUE1QixFQUErQlcsQ0FBL0IsRUFBa0NDLENBQWxDLEVBQXFDO0FBQ25DLFNBQU9MLE9BQVFHLElBQUlJLENBQUwsR0FBVyxDQUFDSixDQUFELEdBQUtLLENBQXZCLEVBQTJCTixDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUNWLENBQWpDLEVBQW9DVyxDQUFwQyxFQUF1Q0MsQ0FBdkMsQ0FBUDtBQUNEO0FBQ0QsU0FBU0ksS0FBVCxDQUFnQlAsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCSSxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJmLENBQTVCLEVBQStCVyxDQUEvQixFQUFrQ0MsQ0FBbEMsRUFBcUM7QUFDbkMsU0FBT0wsT0FBUUcsSUFBSUssQ0FBTCxHQUFXRCxJQUFJLENBQUNDLENBQXZCLEVBQTJCTixDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUNWLENBQWpDLEVBQW9DVyxDQUFwQyxFQUF1Q0MsQ0FBdkMsQ0FBUDtBQUNEO0FBQ0QsU0FBU0ssS0FBVCxDQUFnQlIsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCSSxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJmLENBQTVCLEVBQStCVyxDQUEvQixFQUFrQ0MsQ0FBbEMsRUFBcUM7QUFDbkMsU0FBT0wsT0FBT0csSUFBSUksQ0FBSixHQUFRQyxDQUFmLEVBQWtCTixDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JWLENBQXhCLEVBQTJCVyxDQUEzQixFQUE4QkMsQ0FBOUIsQ0FBUDtBQUNEO0FBQ0QsU0FBU00sS0FBVCxDQUFnQlQsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCSSxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJmLENBQTVCLEVBQStCVyxDQUEvQixFQUFrQ0MsQ0FBbEMsRUFBcUM7QUFDbkMsU0FBT0wsT0FBT08sS0FBS0osSUFBSSxDQUFDSyxDQUFWLENBQVAsRUFBcUJOLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQlYsQ0FBM0IsRUFBOEJXLENBQTlCLEVBQWlDQyxDQUFqQyxDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFNBQVNPLE9BQVQsQ0FBa0JuQixDQUFsQixFQUFxQm9CLEdBQXJCLEVBQTBCO0FBQ3hCO0FBQ0FwQixJQUFFb0IsT0FBTyxDQUFULEtBQWUsUUFBU0EsTUFBTSxFQUE5QjtBQUNBcEIsSUFBRSxDQUFFb0IsTUFBTSxFQUFQLEtBQWUsQ0FBZixJQUFvQixDQUFyQixJQUEwQixFQUE1QixJQUFrQ0EsR0FBbEM7O0FBRUEsTUFBSUMsQ0FBSjtBQUNBLE1BQUlDLElBQUo7QUFDQSxNQUFJQyxJQUFKO0FBQ0EsTUFBSUMsSUFBSjtBQUNBLE1BQUlDLElBQUo7QUFDQSxNQUFJaEIsSUFBSSxVQUFSO0FBQ0EsTUFBSUMsSUFBSSxDQUFDLFNBQVQ7QUFDQSxNQUFJSSxJQUFJLENBQUMsVUFBVDtBQUNBLE1BQUlDLElBQUksU0FBUjs7QUFFQSxPQUFLTSxJQUFJLENBQVQsRUFBWUEsSUFBSXJCLEVBQUUwQixNQUFsQixFQUEwQkwsS0FBSyxFQUEvQixFQUFtQztBQUNqQ0MsV0FBT2IsQ0FBUDtBQUNBYyxXQUFPYixDQUFQO0FBQ0FjLFdBQU9WLENBQVA7QUFDQVcsV0FBT1YsQ0FBUDs7QUFFQU4sUUFBSUksTUFBTUosQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLENBQUYsQ0FBbEIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBQyxTQUE1QixDQUFKO0FBQ0FOLFFBQUlGLE1BQU1FLENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FQLFFBQUlELE1BQU1DLENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsU0FBaEMsQ0FBSjtBQUNBWCxRQUFJRyxNQUFNSCxDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBWixRQUFJSSxNQUFNSixDQUFOLEVBQVNDLENBQVQsRUFBWUksQ0FBWixFQUFlQyxDQUFmLEVBQWtCZixFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLENBQTVCLEVBQStCLENBQUMsU0FBaEMsQ0FBSjtBQUNBTixRQUFJRixNQUFNRSxDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLFVBQWhDLENBQUo7QUFDQVAsUUFBSUQsTUFBTUMsQ0FBTixFQUFTQyxDQUFULEVBQVlOLENBQVosRUFBZUMsQ0FBZixFQUFrQlYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQVgsUUFBSUcsTUFBTUgsQ0FBTixFQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZU4sQ0FBZixFQUFrQlQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFFBQWpDLENBQUo7QUFDQVosUUFBSUksTUFBTUosQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixDQUE1QixFQUErQixVQUEvQixDQUFKO0FBQ0FOLFFBQUlGLE1BQU1FLENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FQLFFBQUlELE1BQU1DLENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxLQUFsQyxDQUFKO0FBQ0FYLFFBQUlHLE1BQU1ILENBQU4sRUFBU0ksQ0FBVCxFQUFZQyxDQUFaLEVBQWVOLENBQWYsRUFBa0JULEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxVQUFsQyxDQUFKO0FBQ0FaLFFBQUlJLE1BQU1KLENBQU4sRUFBU0MsQ0FBVCxFQUFZSSxDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsQ0FBN0IsRUFBZ0MsVUFBaEMsQ0FBSjtBQUNBTixRQUFJRixNQUFNRSxDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLENBQUMsUUFBbEMsQ0FBSjtBQUNBUCxRQUFJRCxNQUFNQyxDQUFOLEVBQVNDLENBQVQsRUFBWU4sQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLENBQUMsVUFBbEMsQ0FBSjtBQUNBWCxRQUFJRyxNQUFNSCxDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLFVBQWpDLENBQUo7O0FBRUFaLFFBQUlPLE1BQU1QLENBQU4sRUFBU0MsQ0FBVCxFQUFZSSxDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBQyxTQUFoQyxDQUFKO0FBQ0FOLFFBQUlDLE1BQU1ELENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBQyxVQUFoQyxDQUFKO0FBQ0FQLFFBQUlFLE1BQU1GLENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsU0FBakMsQ0FBSjtBQUNBWCxRQUFJTSxNQUFNTixDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsQ0FBRixDQUFsQixFQUF3QixFQUF4QixFQUE0QixDQUFDLFNBQTdCLENBQUo7QUFDQVosUUFBSU8sTUFBTVAsQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixDQUE1QixFQUErQixDQUFDLFNBQWhDLENBQUo7QUFDQU4sUUFBSUMsTUFBTUQsQ0FBTixFQUFTTixDQUFULEVBQVlDLENBQVosRUFBZUksQ0FBZixFQUFrQmQsRUFBRXFCLElBQUksRUFBTixDQUFsQixFQUE2QixDQUE3QixFQUFnQyxRQUFoQyxDQUFKO0FBQ0FQLFFBQUlFLE1BQU1GLENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxTQUFsQyxDQUFKO0FBQ0FYLFFBQUlNLE1BQU1OLENBQU4sRUFBU0ksQ0FBVCxFQUFZQyxDQUFaLEVBQWVOLENBQWYsRUFBa0JULEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FaLFFBQUlPLE1BQU1QLENBQU4sRUFBU0MsQ0FBVCxFQUFZSSxDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsU0FBL0IsQ0FBSjtBQUNBTixRQUFJQyxNQUFNRCxDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLENBQTdCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBUCxRQUFJRSxNQUFNRixDQUFOLEVBQVNDLENBQVQsRUFBWU4sQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjtBQUNBWCxRQUFJTSxNQUFNTixDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLFVBQWhDLENBQUo7QUFDQVosUUFBSU8sTUFBTVAsQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLElBQUksRUFBTixDQUFsQixFQUE2QixDQUE3QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQU4sUUFBSUMsTUFBTUQsQ0FBTixFQUFTTixDQUFULEVBQVlDLENBQVosRUFBZUksQ0FBZixFQUFrQmQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixDQUE1QixFQUErQixDQUFDLFFBQWhDLENBQUo7QUFDQVAsUUFBSUUsTUFBTUYsQ0FBTixFQUFTQyxDQUFULEVBQVlOLENBQVosRUFBZUMsQ0FBZixFQUFrQlYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxVQUFoQyxDQUFKO0FBQ0FYLFFBQUlNLE1BQU1OLENBQU4sRUFBU0ksQ0FBVCxFQUFZQyxDQUFaLEVBQWVOLENBQWYsRUFBa0JULEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxVQUFsQyxDQUFKOztBQUVBWixRQUFJUSxNQUFNUixDQUFOLEVBQVNDLENBQVQsRUFBWUksQ0FBWixFQUFlQyxDQUFmLEVBQWtCZixFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLENBQTVCLEVBQStCLENBQUMsTUFBaEMsQ0FBSjtBQUNBTixRQUFJRSxNQUFNRixDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsVUFBakMsQ0FBSjtBQUNBUCxRQUFJRyxNQUFNSCxDQUFOLEVBQVNDLENBQVQsRUFBWU4sQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLFVBQWpDLENBQUo7QUFDQVgsUUFBSU8sTUFBTVAsQ0FBTixFQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZU4sQ0FBZixFQUFrQlQsRUFBRXFCLElBQUksRUFBTixDQUFsQixFQUE2QixFQUE3QixFQUFpQyxDQUFDLFFBQWxDLENBQUo7QUFDQVosUUFBSVEsTUFBTVIsQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixDQUE1QixFQUErQixDQUFDLFVBQWhDLENBQUo7QUFDQU4sUUFBSUUsTUFBTUYsQ0FBTixFQUFTTixDQUFULEVBQVlDLENBQVosRUFBZUksQ0FBZixFQUFrQmQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxVQUFoQyxDQUFKO0FBQ0FQLFFBQUlHLE1BQU1ILENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxTQUFqQyxDQUFKO0FBQ0FYLFFBQUlPLE1BQU1QLENBQU4sRUFBU0ksQ0FBVCxFQUFZQyxDQUFaLEVBQWVOLENBQWYsRUFBa0JULEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxVQUFsQyxDQUFKO0FBQ0FaLFFBQUlRLE1BQU1SLENBQU4sRUFBU0MsQ0FBVCxFQUFZSSxDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsQ0FBN0IsRUFBZ0MsU0FBaEMsQ0FBSjtBQUNBTixRQUFJRSxNQUFNRixDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsQ0FBRixDQUFsQixFQUF3QixFQUF4QixFQUE0QixDQUFDLFNBQTdCLENBQUo7QUFDQVAsUUFBSUcsTUFBTUgsQ0FBTixFQUFTQyxDQUFULEVBQVlOLENBQVosRUFBZUMsQ0FBZixFQUFrQlYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7QUFDQVgsUUFBSU8sTUFBTVAsQ0FBTixFQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZU4sQ0FBZixFQUFrQlQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxRQUFoQyxDQUFKO0FBQ0FaLFFBQUlRLE1BQU1SLENBQU4sRUFBU0MsQ0FBVCxFQUFZSSxDQUFaLEVBQWVDLENBQWYsRUFBa0JmLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBQyxTQUFoQyxDQUFKO0FBQ0FOLFFBQUlFLE1BQU1GLENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxTQUFsQyxDQUFKO0FBQ0FQLFFBQUlHLE1BQU1ILENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsU0FBakMsQ0FBSjtBQUNBWCxRQUFJTyxNQUFNUCxDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsU0FBakMsQ0FBSjs7QUFFQVosUUFBSVMsTUFBTVQsQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLENBQUYsQ0FBbEIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBQyxTQUE1QixDQUFKO0FBQ0FOLFFBQUlHLE1BQU1ILENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsVUFBaEMsQ0FBSjtBQUNBUCxRQUFJSSxNQUFNSixDQUFOLEVBQVNDLENBQVQsRUFBWU4sQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLENBQUMsVUFBbEMsQ0FBSjtBQUNBWCxRQUFJUSxNQUFNUixDQUFOLEVBQVNJLENBQVQsRUFBWUMsQ0FBWixFQUFlTixDQUFmLEVBQWtCVCxFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLENBQUMsUUFBakMsQ0FBSjtBQUNBWixRQUFJUyxNQUFNVCxDQUFOLEVBQVNDLENBQVQsRUFBWUksQ0FBWixFQUFlQyxDQUFmLEVBQWtCZixFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLENBQTdCLEVBQWdDLFVBQWhDLENBQUo7QUFDQU4sUUFBSUcsTUFBTUgsQ0FBTixFQUFTTixDQUFULEVBQVlDLENBQVosRUFBZUksQ0FBZixFQUFrQmQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQVAsUUFBSUksTUFBTUosQ0FBTixFQUFTQyxDQUFULEVBQVlOLENBQVosRUFBZUMsQ0FBZixFQUFrQlYsRUFBRXFCLElBQUksRUFBTixDQUFsQixFQUE2QixFQUE3QixFQUFpQyxDQUFDLE9BQWxDLENBQUo7QUFDQVgsUUFBSVEsTUFBTVIsQ0FBTixFQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZU4sQ0FBZixFQUFrQlQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFVBQWpDLENBQUo7QUFDQVosUUFBSVMsTUFBTVQsQ0FBTixFQUFTQyxDQUFULEVBQVlJLENBQVosRUFBZUMsQ0FBZixFQUFrQmYsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixDQUE1QixFQUErQixVQUEvQixDQUFKO0FBQ0FOLFFBQUlHLE1BQU1ILENBQU4sRUFBU04sQ0FBVCxFQUFZQyxDQUFaLEVBQWVJLENBQWYsRUFBa0JkLEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsQ0FBQyxRQUFsQyxDQUFKO0FBQ0FQLFFBQUlJLE1BQU1KLENBQU4sRUFBU0MsQ0FBVCxFQUFZTixDQUFaLEVBQWVDLENBQWYsRUFBa0JWLEVBQUVxQixJQUFJLENBQU4sQ0FBbEIsRUFBNEIsRUFBNUIsRUFBZ0MsQ0FBQyxVQUFqQyxDQUFKO0FBQ0FYLFFBQUlRLE1BQU1SLENBQU4sRUFBU0ksQ0FBVCxFQUFZQyxDQUFaLEVBQWVOLENBQWYsRUFBa0JULEVBQUVxQixJQUFJLEVBQU4sQ0FBbEIsRUFBNkIsRUFBN0IsRUFBaUMsVUFBakMsQ0FBSjtBQUNBWixRQUFJUyxNQUFNVCxDQUFOLEVBQVNDLENBQVQsRUFBWUksQ0FBWixFQUFlQyxDQUFmLEVBQWtCZixFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLENBQTVCLEVBQStCLENBQUMsU0FBaEMsQ0FBSjtBQUNBTixRQUFJRyxNQUFNSCxDQUFOLEVBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlSSxDQUFmLEVBQWtCZCxFQUFFcUIsSUFBSSxFQUFOLENBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLENBQUMsVUFBbEMsQ0FBSjtBQUNBUCxRQUFJSSxNQUFNSixDQUFOLEVBQVNDLENBQVQsRUFBWU4sQ0FBWixFQUFlQyxDQUFmLEVBQWtCVixFQUFFcUIsSUFBSSxDQUFOLENBQWxCLEVBQTRCLEVBQTVCLEVBQWdDLFNBQWhDLENBQUo7QUFDQVgsUUFBSVEsTUFBTVIsQ0FBTixFQUFTSSxDQUFULEVBQVlDLENBQVosRUFBZU4sQ0FBZixFQUFrQlQsRUFBRXFCLElBQUksQ0FBTixDQUFsQixFQUE0QixFQUE1QixFQUFnQyxDQUFDLFNBQWpDLENBQUo7O0FBRUFaLFFBQUlWLFFBQVFVLENBQVIsRUFBV2EsSUFBWCxDQUFKO0FBQ0FaLFFBQUlYLFFBQVFXLENBQVIsRUFBV2EsSUFBWCxDQUFKO0FBQ0FULFFBQUlmLFFBQVFlLENBQVIsRUFBV1UsSUFBWCxDQUFKO0FBQ0FULFFBQUloQixRQUFRZ0IsQ0FBUixFQUFXVSxJQUFYLENBQUo7QUFDRDtBQUNELFNBQU8sQ0FBQ2hCLENBQUQsRUFBSUMsQ0FBSixFQUFPSSxDQUFQLEVBQVVDLENBQVYsQ0FBUDtBQUNEOztBQUVEOzs7QUFHQSxTQUFTWSxTQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUN6QixNQUFJUCxDQUFKO0FBQ0EsTUFBSVEsU0FBUyxFQUFiO0FBQ0EsTUFBSUMsV0FBV0YsTUFBTUYsTUFBTixHQUFlLEVBQTlCO0FBQ0EsT0FBS0wsSUFBSSxDQUFULEVBQVlBLElBQUlTLFFBQWhCLEVBQTBCVCxLQUFLLENBQS9CLEVBQWtDO0FBQ2hDUSxjQUFVRSxPQUFPQyxZQUFQLENBQXFCSixNQUFNUCxLQUFLLENBQVgsTUFBbUJBLElBQUksRUFBeEIsR0FBK0IsSUFBbkQsQ0FBVjtBQUNEO0FBQ0QsU0FBT1EsTUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsU0FBU0ksU0FBVCxDQUFvQkwsS0FBcEIsRUFBMkI7QUFDekIsTUFBSVAsQ0FBSjtBQUNBLE1BQUlRLFNBQVMsRUFBYjtBQUNBQSxTQUFPLENBQUNELE1BQU1GLE1BQU4sSUFBZ0IsQ0FBakIsSUFBc0IsQ0FBN0IsSUFBa0NRLFNBQWxDO0FBQ0EsT0FBS2IsSUFBSSxDQUFULEVBQVlBLElBQUlRLE9BQU9ILE1BQXZCLEVBQStCTCxLQUFLLENBQXBDLEVBQXVDO0FBQ3JDUSxXQUFPUixDQUFQLElBQVksQ0FBWjtBQUNEO0FBQ0QsTUFBSWMsVUFBVVAsTUFBTUYsTUFBTixHQUFlLENBQTdCO0FBQ0EsT0FBS0wsSUFBSSxDQUFULEVBQVlBLElBQUljLE9BQWhCLEVBQXlCZCxLQUFLLENBQTlCLEVBQWlDO0FBQy9CUSxXQUFPUixLQUFLLENBQVosS0FBa0IsQ0FBQ08sTUFBTVEsVUFBTixDQUFpQmYsSUFBSSxDQUFyQixJQUEwQixJQUEzQixLQUFxQ0EsSUFBSSxFQUEzRDtBQUNEO0FBQ0QsU0FBT1EsTUFBUDtBQUNEOztBQUVEOzs7QUFHQSxTQUFTUSxPQUFULENBQWtCMUIsQ0FBbEIsRUFBcUI7QUFDbkIsU0FBT2dCLFVBQVVSLFFBQVFjLFVBQVV0QixDQUFWLENBQVIsRUFBc0JBLEVBQUVlLE1BQUYsR0FBVyxDQUFqQyxDQUFWLENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU1ksV0FBVCxDQUFzQkMsR0FBdEIsRUFBMkJDLElBQTNCLEVBQWlDO0FBQy9CLE1BQUluQixDQUFKO0FBQ0EsTUFBSW9CLE9BQU9SLFVBQVVNLEdBQVYsQ0FBWDtBQUNBLE1BQUlHLE9BQU8sRUFBWDtBQUNBLE1BQUlDLE9BQU8sRUFBWDtBQUNBLE1BQUlDLElBQUo7QUFDQUYsT0FBSyxFQUFMLElBQVdDLEtBQUssRUFBTCxJQUFXVCxTQUF0QjtBQUNBLE1BQUlPLEtBQUtmLE1BQUwsR0FBYyxFQUFsQixFQUFzQjtBQUNwQmUsV0FBT3RCLFFBQVFzQixJQUFSLEVBQWNGLElBQUliLE1BQUosR0FBYSxDQUEzQixDQUFQO0FBQ0Q7QUFDRCxPQUFLTCxJQUFJLENBQVQsRUFBWUEsSUFBSSxFQUFoQixFQUFvQkEsS0FBSyxDQUF6QixFQUE0QjtBQUMxQnFCLFNBQUtyQixDQUFMLElBQVVvQixLQUFLcEIsQ0FBTCxJQUFVLFVBQXBCO0FBQ0FzQixTQUFLdEIsQ0FBTCxJQUFVb0IsS0FBS3BCLENBQUwsSUFBVSxVQUFwQjtBQUNEO0FBQ0R1QixTQUFPekIsUUFBUXVCLEtBQUtHLE1BQUwsQ0FBWVosVUFBVU8sSUFBVixDQUFaLENBQVIsRUFBc0MsTUFBTUEsS0FBS2QsTUFBTCxHQUFjLENBQTFELENBQVA7QUFDQSxTQUFPQyxVQUFVUixRQUFRd0IsS0FBS0UsTUFBTCxDQUFZRCxJQUFaLENBQVIsRUFBMkIsTUFBTSxHQUFqQyxDQUFWLENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU0UsUUFBVCxDQUFtQmxCLEtBQW5CLEVBQTBCO0FBQ3hCLE1BQUltQixTQUFTLGtCQUFiO0FBQ0EsTUFBSWxCLFNBQVMsRUFBYjtBQUNBLE1BQUk3QixDQUFKO0FBQ0EsTUFBSXFCLENBQUo7QUFDQSxPQUFLQSxJQUFJLENBQVQsRUFBWUEsSUFBSU8sTUFBTUYsTUFBdEIsRUFBOEJMLEtBQUssQ0FBbkMsRUFBc0M7QUFDcENyQixRQUFJNEIsTUFBTVEsVUFBTixDQUFpQmYsQ0FBakIsQ0FBSjtBQUNBUSxjQUFVa0IsT0FBT0MsTUFBUCxDQUFlaEQsTUFBTSxDQUFQLEdBQVksSUFBMUIsSUFBa0MrQyxPQUFPQyxNQUFQLENBQWNoRCxJQUFJLElBQWxCLENBQTVDO0FBQ0Q7QUFDRCxTQUFPNkIsTUFBUDtBQUNEOztBQUVEOzs7QUFHQSxTQUFTb0IsWUFBVCxDQUF1QnJCLEtBQXZCLEVBQThCO0FBQzVCLFNBQU9zQixTQUFTQyxtQkFBbUJ2QixLQUFuQixDQUFULENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU3dCLE1BQVQsQ0FBaUJ6QyxDQUFqQixFQUFvQjtBQUNsQixTQUFPMEIsUUFBUVksYUFBYXRDLENBQWIsQ0FBUixDQUFQO0FBQ0Q7QUFDRCxTQUFTMEMsTUFBVCxDQUFpQjFDLENBQWpCLEVBQW9CO0FBQ2xCLFNBQU9tQyxTQUFTTSxPQUFPekMsQ0FBUCxDQUFULENBQVA7QUFDRDtBQUNELFNBQVMyQyxVQUFULENBQXFCQyxDQUFyQixFQUF3QnhDLENBQXhCLEVBQTJCO0FBQ3pCLFNBQU91QixZQUFZVyxhQUFhTSxDQUFiLENBQVosRUFBNkJOLGFBQWFsQyxDQUFiLENBQTdCLENBQVA7QUFDRDtBQUNELFNBQVN5QyxVQUFULENBQXFCRCxDQUFyQixFQUF3QnhDLENBQXhCLEVBQTJCO0FBQ3pCLFNBQU8rQixTQUFTUSxXQUFXQyxDQUFYLEVBQWN4QyxDQUFkLENBQVQsQ0FBUDtBQUNEOztBQUVELFNBQVMwQyxHQUFULENBQWNDLE1BQWQsRUFBc0JuQixHQUF0QixFQUEyQm9CLEdBQTNCLEVBQWdDO0FBQzlCLE1BQUksQ0FBQ3BCLEdBQUwsRUFBVTtBQUNSLFFBQUksQ0FBQ29CLEdBQUwsRUFBVTtBQUNSLGFBQU9OLE9BQU9LLE1BQVAsQ0FBUDtBQUNEO0FBQ0QsV0FBT04sT0FBT00sTUFBUCxDQUFQO0FBQ0Q7QUFDRCxNQUFJLENBQUNDLEdBQUwsRUFBVTtBQUNSLFdBQU9ILFdBQVdqQixHQUFYLEVBQWdCbUIsTUFBaEIsQ0FBUDtBQUNEO0FBQ0QsU0FBT0osV0FBV2YsR0FBWCxFQUFnQm1CLE1BQWhCLENBQVA7QUFDRDtrQkFDY0QsRyIsImZpbGUiOiJtZDUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIEphdmFTY3JpcHQgTUQ1XHJcbiogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcclxuKlxyXG4qIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXHJcbiogaHR0cHM6Ly9ibHVlaW1wLm5ldFxyXG4qXHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxyXG4qIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbipcclxuKiBCYXNlZCBvblxyXG4qIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcclxuKiBEaWdlc3QgQWxnb3JpdGhtLCBhcyBkZWZpbmVkIGluIFJGQyAxMzIxLlxyXG4qIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxyXG4qIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcclxuKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIExpY2Vuc2VcclxuKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxyXG4qL1xyXG5cclxuLyogZ2xvYmFsIGRlZmluZSAqL1xyXG5cclxuZnVuY3Rpb24gc2FmZUFkZCAoeCwgeSkge1xyXG4gIHZhciBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZilcclxuICB2YXIgbXN3ID0gKHggPj4gMTYpICsgKHkgPj4gMTYpICsgKGxzdyA+PiAxNilcclxuICByZXR1cm4gKG1zdyA8PCAxNikgfCAobHN3ICYgMHhmZmZmKVxyXG59XHJcblxyXG4vKlxyXG4qIEJpdHdpc2Ugcm90YXRlIGEgMzItYml0IG51bWJlciB0byB0aGUgbGVmdC5cclxuKi9cclxuZnVuY3Rpb24gYml0Um90YXRlTGVmdCAobnVtLCBjbnQpIHtcclxuICByZXR1cm4gKG51bSA8PCBjbnQpIHwgKG51bSA+Pj4gKDMyIC0gY250KSlcclxufVxyXG5cclxuLypcclxuKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxyXG4qL1xyXG5mdW5jdGlvbiBtZDVjbW4gKHEsIGEsIGIsIHgsIHMsIHQpIHtcclxuICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKVxyXG59XHJcbmZ1bmN0aW9uIG1kNWZmIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgcmV0dXJuIG1kNWNtbigoYiAmIGMpIHwgKH5iICYgZCksIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuZnVuY3Rpb24gbWQ1Z2cgKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICByZXR1cm4gbWQ1Y21uKChiICYgZCkgfCAoYyAmIH5kKSwgYSwgYiwgeCwgcywgdClcclxufVxyXG5mdW5jdGlvbiBtZDVoaCAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KVxyXG59XHJcbmZ1bmN0aW9uIG1kNWlpIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgcmV0dXJuIG1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpXHJcbn1cclxuXHJcbi8qXHJcbiogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cclxuKi9cclxuZnVuY3Rpb24gYmlubE1ENSAoeCwgbGVuKSB7XHJcbiAgLyogYXBwZW5kIHBhZGRpbmcgKi9cclxuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMilcclxuICB4WygobGVuICsgNjQpID4+PiA5IDw8IDQpICsgMTRdID0gbGVuXHJcblxyXG4gIHZhciBpXHJcbiAgdmFyIG9sZGFcclxuICB2YXIgb2xkYlxyXG4gIHZhciBvbGRjXHJcbiAgdmFyIG9sZGRcclxuICB2YXIgYSA9IDE3MzI1ODQxOTNcclxuICB2YXIgYiA9IC0yNzE3MzM4NzlcclxuICB2YXIgYyA9IC0xNzMyNTg0MTk0XHJcbiAgdmFyIGQgPSAyNzE3MzM4NzhcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XHJcbiAgICBvbGRhID0gYVxyXG4gICAgb2xkYiA9IGJcclxuICAgIG9sZGMgPSBjXHJcbiAgICBvbGRkID0gZFxyXG5cclxuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KVxyXG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4NilcclxuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTcsIDYwNjEwNTgxOSlcclxuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKVxyXG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KVxyXG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDVdLCAxMiwgMTIwMDA4MDQyNilcclxuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKVxyXG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKVxyXG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA3LCAxNzcwMDM1NDE2KVxyXG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpXHJcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKVxyXG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDExXSwgMjIsIC0xOTkwNDA0MTYyKVxyXG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4MilcclxuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpXHJcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNywgLTE1MDIwMDIyOTApXHJcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSlcclxuXHJcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApXHJcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKVxyXG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMylcclxuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMilcclxuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSlcclxuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKVxyXG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpXHJcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KVxyXG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpXHJcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MClcclxuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpXHJcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKVxyXG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpXHJcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NClcclxuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpXHJcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpXHJcblxyXG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KVxyXG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDhdLCAxMSwgLTIwMjI1NzQ0NjMpXHJcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2MilcclxuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpXHJcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMV0sIDQsIC0xNTMwOTkyMDYwKVxyXG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1MylcclxuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpXHJcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTBdLCAyMywgLTEwOTQ3MzA2NDApXHJcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpXHJcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpXHJcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgM10sIDE2LCAtNzIyNTIxOTc5KVxyXG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpXHJcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpXHJcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgMTJdLCAxMSwgLTQyMTgxNTgzNSlcclxuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApXHJcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKVxyXG5cclxuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KVxyXG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSlcclxuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE1LCAtMTQxNjM1NDkwNSlcclxuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSlcclxuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpXHJcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgM10sIDEwLCAtMTg5NDk4NjYwNilcclxuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMylcclxuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KVxyXG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDhdLCA2LCAxODczMzEzMzU5KVxyXG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NClcclxuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKVxyXG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDEzXSwgMjEsIDEzMDkxNTE2NDkpXHJcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApXHJcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpXHJcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE1LCA3MTg3ODcyNTkpXHJcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKVxyXG5cclxuICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpXHJcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKVxyXG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYylcclxuICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpXHJcbiAgfVxyXG4gIHJldHVybiBbYSwgYiwgYywgZF1cclxufVxyXG5cclxuLypcclxuKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gYmlubDJyc3RyIChpbnB1dCkge1xyXG4gIHZhciBpXHJcbiAgdmFyIG91dHB1dCA9ICcnXHJcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzJcclxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xyXG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGlucHV0W2kgPj4gNV0gPj4+IChpICUgMzIpKSAmIDB4ZmYpXHJcbiAgfVxyXG4gIHJldHVybiBvdXRwdXRcclxufVxyXG5cclxuLypcclxuKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXHJcbiogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHIyYmlubCAoaW5wdXQpIHtcclxuICB2YXIgaVxyXG4gIHZhciBvdXRwdXQgPSBbXVxyXG4gIG91dHB1dFsoaW5wdXQubGVuZ3RoID4+IDIpIC0gMV0gPSB1bmRlZmluZWRcclxuICBmb3IgKGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBvdXRwdXRbaV0gPSAwXHJcbiAgfVxyXG4gIHZhciBsZW5ndGg4ID0gaW5wdXQubGVuZ3RoICogOFxyXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcclxuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dC5jaGFyQ29kZUF0KGkgLyA4KSAmIDB4ZmYpIDw8IChpICUgMzIpXHJcbiAgfVxyXG4gIHJldHVybiBvdXRwdXRcclxufVxyXG5cclxuLypcclxuKiBDYWxjdWxhdGUgdGhlIE1ENSBvZiBhIHJhdyBzdHJpbmdcclxuKi9cclxuZnVuY3Rpb24gcnN0ck1ENSAocykge1xyXG4gIHJldHVybiBiaW5sMnJzdHIoYmlubE1ENShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpXHJcbn1cclxuXHJcbi8qXHJcbiogQ2FsY3VsYXRlIHRoZSBITUFDLU1ENSwgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHJITUFDTUQ1IChrZXksIGRhdGEpIHtcclxuICB2YXIgaVxyXG4gIHZhciBia2V5ID0gcnN0cjJiaW5sKGtleSlcclxuICB2YXIgaXBhZCA9IFtdXHJcbiAgdmFyIG9wYWQgPSBbXVxyXG4gIHZhciBoYXNoXHJcbiAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZFxyXG4gIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XHJcbiAgICBia2V5ID0gYmlubE1ENShia2V5LCBrZXkubGVuZ3RoICogOClcclxuICB9XHJcbiAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcclxuICAgIGlwYWRbaV0gPSBia2V5W2ldIF4gMHgzNjM2MzYzNlxyXG4gICAgb3BhZFtpXSA9IGJrZXlbaV0gXiAweDVjNWM1YzVjXHJcbiAgfVxyXG4gIGhhc2ggPSBiaW5sTUQ1KGlwYWQuY29uY2F0KHJzdHIyYmlubChkYXRhKSksIDUxMiArIGRhdGEubGVuZ3RoICogOClcclxuICByZXR1cm4gYmlubDJyc3RyKGJpbmxNRDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpXHJcbn1cclxuXHJcbi8qXHJcbiogQ29udmVydCBhIHJhdyBzdHJpbmcgdG8gYSBoZXggc3RyaW5nXHJcbiovXHJcbmZ1bmN0aW9uIHJzdHIyaGV4IChpbnB1dCkge1xyXG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZidcclxuICB2YXIgb3V0cHV0ID0gJydcclxuICB2YXIgeFxyXG4gIHZhciBpXHJcbiAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICB4ID0gaW5wdXQuY2hhckNvZGVBdChpKVxyXG4gICAgb3V0cHV0ICs9IGhleFRhYi5jaGFyQXQoKHggPj4+IDQpICYgMHgwZikgKyBoZXhUYWIuY2hhckF0KHggJiAweDBmKVxyXG4gIH1cclxuICByZXR1cm4gb3V0cHV0XHJcbn1cclxuXHJcbi8qXHJcbiogRW5jb2RlIGEgc3RyaW5nIGFzIHV0Zi04XHJcbiovXHJcbmZ1bmN0aW9uIHN0cjJyc3RyVVRGOCAoaW5wdXQpIHtcclxuICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KSlcclxufVxyXG5cclxuLypcclxuKiBUYWtlIHN0cmluZyBhcmd1bWVudHMgYW5kIHJldHVybiBlaXRoZXIgcmF3IG9yIGhleCBlbmNvZGVkIHN0cmluZ3NcclxuKi9cclxuZnVuY3Rpb24gcmF3TUQ1IChzKSB7XHJcbiAgcmV0dXJuIHJzdHJNRDUoc3RyMnJzdHJVVEY4KHMpKVxyXG59XHJcbmZ1bmN0aW9uIGhleE1ENSAocykge1xyXG4gIHJldHVybiByc3RyMmhleChyYXdNRDUocykpXHJcbn1cclxuZnVuY3Rpb24gcmF3SE1BQ01ENSAoaywgZCkge1xyXG4gIHJldHVybiByc3RySE1BQ01ENShzdHIycnN0clVURjgoayksIHN0cjJyc3RyVVRGOChkKSlcclxufVxyXG5mdW5jdGlvbiBoZXhITUFDTUQ1IChrLCBkKSB7XHJcbiAgcmV0dXJuIHJzdHIyaGV4KHJhd0hNQUNNRDUoaywgZCkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1kNSAoc3RyaW5nLCBrZXksIHJhdykge1xyXG4gIGlmICgha2V5KSB7XHJcbiAgICBpZiAoIXJhdykge1xyXG4gICAgICByZXR1cm4gaGV4TUQ1KHN0cmluZylcclxuICAgIH1cclxuICAgIHJldHVybiByYXdNRDUoc3RyaW5nKVxyXG4gIH1cclxuICBpZiAoIXJhdykge1xyXG4gICAgcmV0dXJuIGhleEhNQUNNRDUoa2V5LCBzdHJpbmcpXHJcbiAgfVxyXG4gIHJldHVybiByYXdITUFDTUQ1KGtleSwgc3RyaW5nKVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG1kNSJdfQ==