!function(t){var n={};function r(o){if(n[o])return n[o].exports;var e=n[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=n,r.d=function(t,n,o){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var e in t)r.d(o,e,function(n){return t[n]}.bind(null,e));return o},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=0)}([function(t,n,r){"use strict";var o,e=this&&this.__extends||(o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])})(t,n)},function(t,n){function r(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)});Object.defineProperty(n,"__esModule",{value:!0}),console.log("■1■ Iteratorパターン、iterator：イテレーター=繰り返し・反復子"),console.log("■2■ Adapterパターン、adapt：アダプト=適合させる、別名：wrapperパターン");var i=function(){function t(){this.str=""}return t.prototype.Banner=function(t){this.str=t},t.prototype.showWithParen=function(){console.log("（"+this.str+"）")},t.prototype.showWithAster=function(){console.log("*"+this.str+"*")},t}(),u=function(t){function n(){return t.call(this)||this}return e(n,t),n.prototype.PrintBanner=function(t){this.str=t},n.prototype.printWeak=function(){this.showWithParen()},n.prototype.printStrong=function(){this.showWithAster()},n}(i);(new(function(){function t(){}return t.prototype.main=function(){var t=new u;t.PrintBanner("ノートPCを接続"),t.printWeak(),t.printStrong(),console.log("継承（クラス）例：呼び出し元(メインクラス)からは、Bannerクラスの存在は見えないようになっている\n")},t}())).main();var c=function(t){function n(){var n=t.call(this)||this;return n.banner=null,n}return e(n,t),n.prototype.PrintBanner2=function(t){this.banner=new i,this.banner.Banner(t)},n.prototype.printWeak=function(){this.banner.showWithParen()},n.prototype.printStrong=function(){this.banner.showWithAster()},n}(function(){function t(){}return t.prototype.printWeak=function(){},t.prototype.printStrong=function(){},t}());(new(function(){function t(){}return t.prototype.main=function(){var t=new c;t.PrintBanner2("ノートPCを接続"),t.printWeak(),t.printStrong(),console.log("委譲（インスタンス）例")},t}())).main()}]);