!function(t){var n={};function o(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=n,o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)o.d(e,r,function(n){return t[n]}.bind(null,r));return e},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=0)}([function(t,n,o){"use strict";var e,r=this&&this.__extends||(e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])})(t,n)},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)});Object.defineProperty(n,"__esModule",{value:!0}),console.log("■1■ Iteratorパターン、iterator：イテレーター=繰り返し・反復子"),console.log("■2■ Adapterパターン、adapt：アダプト=適合させる、別名：wrapperパターン");var i=function(){function t(){this.str=""}return t.prototype.Banner=function(t){this.str=t},t.prototype.showWithParen=function(){console.log("（"+this.str+"）")},t.prototype.showWithAster=function(){console.log("*"+this.str+"*")},t}(),c=function(t){function n(){return t.call(this)||this}return r(n,t),n.prototype.PrintBanner=function(t){this.str=t},n.prototype.printWeak=function(){this.showWithParen()},n.prototype.printStrong=function(){this.showWithAster()},n}(i);(new(function(){function t(){}return t.prototype.main=function(){var t=new c;t.PrintBanner("ノートPCを接続"),t.printWeak(),t.printStrong(),console.log("継承（クラス）例：呼び出し元(メインクラス)からは、Bannerクラスの存在は見えないようになっている\n")},t}())).main();var l=function(t){function n(){var n=t.call(this)||this;return n.banner=null,n}return r(n,t),n.prototype.PrintBanner2=function(t){this.banner=new i,this.banner.Banner(t)},n.prototype.printWeak=function(){this.banner.showWithParen()},n.prototype.printStrong=function(){this.banner.showWithAster()},n}(function(){function t(){}return t.prototype.printWeak=function(){},t.prototype.printStrong=function(){},t}());(new(function(){function t(){}return t.prototype.main=function(){var t=new l;t.PrintBanner2("ノートPCを接続"),t.printWeak(),t.printStrong(),console.log("委譲（インスタンス）例")},t}())).main(),console.log("■3■ Templateパターン、スーパークラスで処理の枠組を決め、サブクラスで具体的な内容を定義する\n");var s=function(){function t(){}return t.prototype.open=function(){},t.prototype.print=function(){},t.prototype.close=function(){},t.prototype.display=function(){this.open();for(var t=1;t<=5;t++)this.print();this.close()},t}(),u=function(t){function n(){var n=t.call(this)||this;return n.ch="",n}return r(n,t),n.prototype.CharaDisplay=function(t){this.ch=t},n.prototype.open=function(){console.log("<<")},n.prototype.print=function(){console.log(this.ch)},n.prototype.close=function(){console.log(">>")},n}(s),p=function(t){function n(){var n=t.call(this)||this;return n.ch="",n.leng=0,n}return r(n,t),n.prototype.StringDisplay=function(t){this.ch=t,this.leng=this.ch.length,console.log("this.leng: "+this.leng)},n.prototype.open=function(){this.printLine()},n.prototype.print=function(){console.log("+"+this.ch+"+")},n.prototype.close=function(){this.printLine()},n.prototype.printLine=function(){var t="";t+="+";for(var n=0;n<this.leng;n++)t+="-";t+="+",console.log(t)},n}(s);(new(function(){function t(){}return t.prototype.MainTemplate=function(t){console.log(t);var n=new u;n.CharaDisplay("A");var o=new p;o.StringDisplay(t),n.display(),o.display()},t}())).MainTemplate("ABCDE"),console.log("\n■ 4 ■ Facory Methodパターン、スーパークラスでインスタンス生成の枠組を決め、サブクラスで実際の具体的な内容を定義する");var a=function(){function t(){}return t.prototype.use=function(){},t}(),f=function(){function t(){}return t.prototype.create=function(t){var n=this.createProduct(t);this.registerProduct(n)},t.prototype.createProduct=function(t){},t.prototype.registerProduct=function(t){},t}(),h=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.owner="",n}return r(n,t),n.prototype.IDcard=function(t){console.log("IDcard() "+t),console.log(t+"のカ－ドを作ります。"),this.owner=t},n.prototype.use=function(){console.log(this.owner+"のカ－ドを使います。")},n.prototype.getOwner=function(){return this.owner},n}(a),g=[],y=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return r(n,t),n.prototype.createProduct=function(t){console.log("createProduct() "+t),(new h).IDcard(t)},n.prototype.registerProduct=function(t){g.push(t),console.log("this.owners: "+g)},n.prototype.getOwners=function(){return g},n}(f),d=new(function(){function t(){}return t.prototype.main=function(t){var n=new y;n.createProduct(t),n.registerProduct(t)},t}());d.main("山田太郎"),d.main("鈴木花子"),console.log(""),console.log("\n■5■ Singletonパターン、インスタンスが1つしかないことを保証");var m=function(){function t(n){if(n!==t.getInstance)throw t._instance?new Error("Singletonが既にインスタンスが存在するためエラー。"):new Error("Singletonコンストラクタの引数が不正な為エラー。");console.log("Singletonインスタンス新規作成")}return t.prototype.Singleton=function(){},t.getInstance=function(){var n="既存";return this._instance||(this._instance=new t(t.getInstance),n="新規"),console.log(n+"インスタンスを返す"),this._instance},t}();m.getInstance(),m.getInstance(),m.getInstance();console.log("\n■ 6 ■ Prototypeパターン、インスタンスがをクラスから生成するのでなく、別のインスタンスのコピーから作る");var w=function(){function t(){this.value=10}return t.prototype.get=function(){return this.value},t.prototype.set=function(t){this.value=t},t}(),b=new w;b.set(100),console.log(b);var v=Object.create(b);console.log(v),console.log(v.get()),v.set(200),console.log(v.get()),v.a="a",console.log(v.a),console.log(b.get()),console.log(b instanceof w),console.log(v instanceof w),b.b="b",console.log(v.b),console.log("\n■ 7 ■ Builderパターン、インスタンスを少しずつ積み重ねて構造を組み上げていく");var S=function(){function t(){}return t.prototype.makeTitle=function(t){},t.prototype.makeSummary=function(t){},t.prototype.makeItems=function(t){},t.prototype.getResult=function(){},t}(),P=function(){function t(){return console.log("Diretor constructor() "+this.builder),this.builder.makeTitle("Greeting"),this.builder.makeSummary("朝から昼にかけて"),this.builder.makeItems(new String(["おはよう","こんにちは"])),this.builder.makeSummary("夜に"),this.builder.makeItems(new String(["こんばんは","おやすみなさい","さようなら"])),this.builder.getResult()}return t.prototype.Director=function(t){console.log("Diretor() "+t),this.builder=t},t}(),_=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.buffer=new String,n}return r(n,t),n.prototype.makeTitle=function(t){this.buffer.append("====================\n"),this.buffer.append("【"+t+"】\n"),this.buffer.append("\n")},n.prototype.makeSummary=function(t){this.buffer.append("■"+t+"\n"),this.buffer.append("\n")},n.prototype.makeItems=function(t){for(var n=0;n<t.length;n++)this.buffer.append(" ・"+t[n]+"\n");this.buffer.append("\n")},n.prototype.getResult=function(){return this.buffer.append("====================\n"),this.buffer.toString()},n}(S),k=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return r(n,t),n.prototype.HTMLBuilder=function(){console.log("HTMLBuilder()")},n.prototype.makeTitle=function(t){this.fileName=t+".html",console.log(this.fileName+"を出力")},n.prototype.makeSummary=function(t){console.log(t+"を構築")},n.prototype.makeItems=function(t){console.log(t),console.log("を構築")},n.prototype.getResult=function(){return this.fileName},n}(S);!function(){function t(){}t.prototype.BuilderTestMain=function(t){if(console.log(t),1!==t.length)console.log("arg error1");else if("plain"===t[0]){console.log("plain"),(n=new P).Director(new _)}else if("html"===t[0]){console.log("html");var n=new P;console.log("diretor: "+n);var o=n.constructor(new k);console.log(o)}else console.log("arg error2")}}();console.log("\n■ 9 ■ Bridgeパターン、機能の階層と、実装の階層を分ける（それを橋渡しするのでブリッジ）");!function(t){function n(){return t.call(this)||this}r(n,t),n.prototype.CountDisplay=function(t){},n.prototype.multiDisplay=function(t){open();for(var n=0;n<t;n++)print();close()}}(function(){function t(){}return t.prototype.Display=function(t){console.log("Display()"),this.imple=t},t.prototype.open=function(){this.imple.rawOpen()},t.prototype.print=function(){this.imple.rawPrint()},t.prototype.close=function(){this.imple.rawClose()},t.prototype.display=function(){open(),print(),close()},t}());var I=new(function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.str="",n.width=0,n}return r(n,t),n.prototype.StringDisplayImple=function(t){this.str=t,this.width=t.length},n.prototype.open=function(){this.printLine2()},n.prototype.print=function(){console.log("|"+this.str+"|")},n.prototype.close=function(){this.printLine2()},n.prototype.printLine2=function(){console.log("+");for(var t=0;t<this.width;t++)console.log("-");console.log("+")},n}(function(){function t(){}return t.prototype.rawopen=function(){},t.prototype.rawPrint=function(){},t.prototype.rawClose=function(){},t}()));I.StringDisplayImple("ああああ"),I.open(),I.print(),I.close(),console.log("\n■ 19 ■ Stateパターン、状態によって遷移、ゲームでもよく使われる");for(var C=function(){function t(n){if(n!==t.getInstance)throw t._instance?new Error("DayState既にインスタンスが存在するためエラー。"):new Error("DayStateコンストラクタの引数が不正な為エラー。");console.log("昼間インスタンス新規作成")}return t.prototype.DayState=function(){},t.getInstance=function(){return this._instance||(this._instance=new t(t.getInstance)),this._instance},t.prototype.doClock=function(t){console.log("入力値は、"+t),t<9||t>=17?(console.log("夜間モードに変更"),M.changeState(D.getInstance())):console.log("昼間モードのままです")},t.prototype.doUse=function(){M.recordLog("金庫使用（昼間）")},t.prototype.doAlbam=function(){M.callSecurityCenter("非常ベル（昼間）")},t.prototype.doPhone=function(){M.callSecurityCenter("通常の通話（昼間）")},t.prototype.toString=function(){return"[昼間]"},t}(),D=function(){function t(n){if(n!==t.getInstance)throw t._instance?new Error("既にNightStateインスタンスが存在するためエラー。"):new Error("NightStateコンストラクタの引数が不正な為エラー。");console.log("夜間インスタンス新規作成")}return t.prototype.NightState=function(){},t.getInstance=function(){return this._instance||(this._instance=new t(t.getInstance)),this._instance},t.prototype.doClock=function(t){console.log("入力値は、"+t),t>=9&&t<17?(console.log("昼間モードに変更"),M.changeState(C.getInstance())):console.log("夜間モードのままです")},t.prototype.doUse=function(){M.recordLog("非常：夜間の金庫使用！")},t.prototype.doAlbam=function(){M.callSecurityCenter("非常ベル（夜間）")},t.prototype.doPhone=function(){M.callSecurityCenter("夜間の通話録音（夜間）")},t.prototype.toString=function(){return"[夜間]"},t}(),O=function(){function t(){this.state=C.getInstance()}return t.prototype.SefeFrame=function(t){console.log("this.state:"+this.state)},t.prototype.pushButton=function(t){switch(console.log("n: "+t),console.log("this.state:"+this.state),t){case 1:console.log("ボタン1"),this.state.doUse();break;case 2:console.log("ボタン2"),this.state.doAlbam();break;case 3:console.log("ボタン3"),this.state.doPhone();break;case 4:throw console.log("ボタン4、終了しました"),M&&delete M.state,new Error("システムは終了しました");default:console.log("error num: "+t)}},t.prototype.setClock=function(){console.log("setClock()");var t=Number($("#hour_input").val());console.log("現在の時間は、"+t),this.state.doClock(t)},t.prototype.changeState=function(t){console.log("changeState()"),console.log(this.state+"から"+t+"に状態が変化しました"),this.state=t},t.prototype.callSecurityCenter=function(t){console.log("call"+t+"\n")},t.prototype.recordLog=function(t){console.log("record ... "+t+"\n")},t}(),B=["金庫使用ボタン","非常ベル使用ボタン","通常通話ボタン","終了ボタン"],j=[1,2,3,4],T=j.length,E=function(t){var n=document.createElement("button");n.textContent=""+B[t],n.onclick=function(){var n=""+B[t];console.log("押した: "+n),M.pushButton(Number(""+j[t]))},document.body.appendChild(n);var o=document.createElement("span");if(o.textContent=" ",document.body.appendChild(o),t===T-1){var e=document.createElement("br");document.body.appendChild(e)}},L=0;L<T;L++)E(L);$("#hour_input").change((function(){console.log("時間変更しました"),M.setClock()}));var M=new O;console.log("safeFrame:"),console.log(M),M.SefeFrame("test start")}]);