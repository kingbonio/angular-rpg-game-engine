!function(e){function n(n){for(var t,i,l=n[0],f=n[1],a=n[2],c=0,s=[];c<l.length;c++)o[i=l[c]]&&s.push(o[i][0]),o[i]=0;for(t in f)Object.prototype.hasOwnProperty.call(f,t)&&(e[t]=f[t]);for(p&&p(n);s.length;)s.shift()();return u.push.apply(u,a||[]),r()}function r(){for(var e,n=0;n<u.length;n++){for(var r=u[n],t=!0,l=1;l<r.length;l++)0!==o[r[l]]&&(t=!1);t&&(u.splice(n--,1),e=i(i.s=r[0]))}return e}var t={},o={0:0},u=[];function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,n,r){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)i.d(r,t,(function(n){return e[n]}).bind(null,t));return r},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="https://kingbonio.github.io/angular-2d-game-engine/";var l=window.webpackJsonp=window.webpackJsonp||[],f=l.push.bind(l);l.push=n,l=l.slice();for(var a=0;a<l.length;a++)n(l[a]);var p=f;r()}([]);