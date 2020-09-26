import { loader } from "webpack";
import Stats from "stats.js";

console.log("■1■ Iteratorパターン、iterator：イテレーター=繰り返し・反復子");

/*
interface Aggregate {
    Iterator(): Iteraror
}

interface Iteraror {
    id: number,
    name: string,
    hasnext(): boolean,
    next(): object
}

class Book {
    private name: string = "";
    public Book(e:any) {
        this.name = e;
    }
    public getName() {
        return this.name;
    }
}

class BookShelf implements Aggregate {
    private books: any[]=[];
    private last: number = 0;
    public BookShelf(e: number) {
        this.books = new Book(e);
    }
    public getBook(e: number) {
        return this.books[e];
    }
    public appendBook(e: Book) {
        this.books[this.last] = e;
        this.last++;
    }
    public getLength() {
        return this.last;
    }
    public Iterator() {
        return new BookShelfIterator(this);
    }

}

class BookShelfIterator implements Iteraror {
    private bookShelf:BookShelf = null;
    private index: number;
    public BookShelfIterator(e:BookShelf){
        this.bookShelf = e;
        this.index = 0;
    }

}

// ■元のJavaから変換難しいので省略
*/

console.log("■2■ Adapterパターン、adapt：アダプト=適合させる、別名：wrapperパターン");

// ■1■ 継承を使ったもの

/**
 * あらかじめ提供されているクラス（親クラス）
 */
class Banner {
    public str: string = "";
    public Banner(e: string) {
        this.str = e;
    }
    public showWithParen() {
        console.log("（" + this.str + "）");
    }
    public showWithAster() {
        console.log("*" + this.str + "*");
    }
}

/**
 * Printインターフェース
 */
interface IPrint {
    printWeak(): void,
    printStrong(): void
}

/**
 * PrintBannerクラス（子クラス）
 */
class PrintBanner extends Banner implements IPrint { // 継承してインターフェースも適用

    constructor() {
        super();
    }

    public PrintBanner(e: string) {
        this.str = e;
    }

    public printWeak(): void {
        this.showWithParen();
    }

    public printStrong(): void {
        this.showWithAster();
    }

}

class MainAdapter {
    constructor() { }
    main() {
        let pb = new PrintBanner();
        pb.PrintBanner("ノートPCを接続");
        pb.printWeak();
        pb.printStrong();
        console.log("継承（クラス）例：呼び出し元(メインクラス)からは、Bannerクラスの存在は見えないようになっている\n");
    }
}

// 確認
let m = new MainAdapter();
m.main();

// ■2■ 委譲（譲り渡す）を使ったもの

/**
 * Pintクラス
 */
class Print {
    public printWeak(): void { }
    public printStrong(): void { }
}

/**
 * PrintBannerクラス
 */
class PrintBanner2 extends Print {
    constructor() {
        super();
    }

    public banner: any = null;

    public PrintBanner2(e: string) {
        this.banner = new Banner();
        this.banner.Banner(e);
    }

    public printWeak(): void {
        this.banner.showWithParen();
    }

    public printStrong(): void {
        this.banner.showWithAster();
    }

}

class MainAdapter2 {
    constructor() { }
    main() {
        let pb = new PrintBanner2();
        pb.PrintBanner2("ノートPCを接続");
        pb.printWeak();
        pb.printStrong();
        console.log("委譲（インスタンス）例");
    }
}

// 確認
let m2 = new MainAdapter2();
m2.main();


console.log("■3■ Templateパターン、スーパークラスで処理の枠組を決め、サブクラスで具体的な内容を定義する\n");

// ★実態のない抽象メソッド（親クラス）がテンプレートメソッド
// ★抽象クラス＝Abstract Class
// ★具象クラス＝Concreate Class
//
// メリット：
// ①ロジックが共通化出来る＝サブクラスが同じようなロジックの場合、後での修正も1箇所で済む
//
// 用語
// スーパークラスの変数にサブクラスのインスタンスのどれを代入しても正しく動作するようにする＝The Liskov Substitution Principle（LSP）
// →instanceofで型を調べたりする必要がないように
//
// サブクラスは
// ・スーパークラスで定義されているメソッドが利用出来る
// ・サブクラスに少しメソッドを書くだけで機能を追加出来る
// ・サブクラスでメソッドをオーバーライドすれば機能を変更出来る
// を期待
//
// スーパークラスは
// ・サブクラスがその（抽象）メソッドを実装する事を期待する
// ・サブクラスに対して、そのメソッドの実装を要請する（↑と同じ？）
// →subclass responsibility（サブラクスの責任）

class AbstractDisplay {
    public open() {
        // サブクラスに実装を任せる抽象メソッド
    }

    public print() {
        // サブクラスに実装を任せる抽象メソッド
    }

    public close() {
        // サブクラスに実装を任せる抽象メソッド
    }

    public display() {
        this.open();
        for (let i = 1; i <= 5; i++) {
            this.print();
        }
        this.close();
    }

}

class CharaDisplay extends AbstractDisplay {
    constructor() {
        super();
    }
    private ch: string = "";
    public CharaDisplay(e: string) {
        this.ch = e;
    }

    public open() {
        console.log("<<");
    }

    public print() {
        console.log(this.ch);
    }
    public close() {
        console.log(">>");
    }

}

class StringDisplay extends AbstractDisplay {
    constructor() {
        super();
    }
    private ch: string = "";
    private leng: number = 0;
    public StringDisplay(e: string) {
        this.ch = e;
        this.leng = this.ch.length;
        console.log("this.leng: " + this.leng);
    }

    public open() {
        this.printLine();
    }

    public print() {
        console.log("+" + this.ch + "+");
    }
    public close() {
        this.printLine();
    }

    private printLine() {
        let temp: string = "";
        temp += "+";
        for (let i: number = 0; i < this.leng; i++) {
            temp += "-";
        }
        temp += "+";
        console.log(temp);
    }

}

class MainTemplate {
    public MainTemplate(e: string) {
        console.log(e);
        let d1 = new CharaDisplay();
        d1.CharaDisplay("A");
        let d2 = new StringDisplay();
        d2.StringDisplay(e);
        d1.display();
        d2.display();
    }
}

// 確認
let m3 = new MainTemplate();
m3.MainTemplate("ABCDE");





console.log("\n■ 4 ■ Facory Methodパターン、スーパークラスでインスタンス生成の枠組を決め、サブクラスで実際の具体的な内容を定義する");


// Facotry
class Product {

    public use() { };

}

class Factory {
    public create(owner: string) {
        let p = this.createProduct(owner);
        this.registerProduct(p);
    }
    public createProduct(e: string) { };
    public registerProduct(e: any) { };

}

// IDcard
class IDcard extends Product {
    private owner: string = "";
    public IDcard(e: string) {
        console.log("IDcard() " + e);
        console.log(e + "のカ－ドを作ります。");
        this.owner = e;
    }
    public use() {
        console.log(this.owner + "のカ－ドを使います。");
    }

    public getOwner() {
        return this.owner;
    }

}

const owners: any[] = [];

class IDfactory extends Factory {

    // public owners: any[] = [];

    public createProduct(e: string) {
        console.log("createProduct() " + e);
        let n = new IDcard();

        //n.use();
        n.IDcard(e);
        //console.log("n: ");
        //console.log(n);//親クラスで登録される?
    };
    public registerProduct(e: string) {
        owners.push(e);
        console.log("this.owners: " + owners);
        // this.getOwners();
    };

    public getOwners() {
        return owners;
    }


}

class MainFactory4 {
    main(e: string) {
        let idfc = new IDfactory();
        idfc.createProduct(e);
        idfc.registerProduct(e);
        //idfc.use();
        //console.log(idfc.getOwners());
    }
}

// 確認
let m4 = new MainFactory4();
m4.main("山田太郎");
m4.main("鈴木花子");
console.log("");

console.log("\n■5■ Singletonパターン、インスタンスが1つしかないことを保証");

class Singleton {
    private Singleton() {
        // privateにする事でクラス外からのコンストラクタ呼び出しを禁止
    }
    // Singleton
    private static _instance: Singleton;
    public static getInstance() {
        let temp: string = "既存";
        if (!this._instance) {
            this._instance = new Singleton(Singleton.getInstance);
            temp = "新規";
        }
        console.log(temp + "インスタンスを返す");
        return this._instance;
    }
    private constructor(caller: Function) {
        if (caller === Singleton.getInstance) {
            console.log("Singletonインスタンス新規作成");
        } else if (Singleton._instance) {
            throw new Error("Singletonが既にインスタンスが存在するためエラー。");
        } else {
            throw new Error("Singletonコンストラクタの引数が不正な為エラー。");
        }
    }
}

let aaaa = Singleton.getInstance();// 新規インスタンスを返す
let bbbb = Singleton.getInstance();// 既存インスタンスを返す
let cccc = Singleton.getInstance();// 既存インスタンスを返す



console.log("\n■ 6 ■ Prototypeパターン、インスタンスがをクラスから生成するのでなく、別のインスタンスのコピーから作る");
// 元記事がJavaでcloneableを継承する形で実装してるので、
// ネット上で別の記事を参照
// 
// JavaScript のオブジェクトのクローンは Object.create で十分なことが多い気がする
// http://var.blog.jp/archives/78945827.html
// 

/*
const copy = obj => {
    if (obj && typeof obj === "object") {
        if (Array.isArray(obj)) {
            return obj.map(copy);
        } else {
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, copy(v)]));
        }
    } else {
        return obj
    }
}
*/

// const copy2 = obj => JSON.parse(JSON.stringify(obj))

class X {
    private value;
    constructor() {
        this.value = 10;
    }
    get() {
        return this.value;
    }
    set(v: number) {
        this.value = v;
    }
}

const x: { [b: string]: any } = new X();
x.set(100)
console.log(x); // e {value: 100}

let x2: { X: any, [a: string]: any } = Object.create(x);
console.log(x2); // e {} 見えない

console.log(x2.get()); // 100 けど参照は出来る
// console.log(x2.value); // err privateなので参照不可能

x2.set(200);
console.log(x2.get()); // 200

x2.a = "a";
console.log(x2.a);

console.log(x.get());// 100
/*
console.log(x.value); // err
console.log(x.a); //err
*/

console.log(x instanceof X);// true
console.log(x2 instanceof X);// true

// クローン元の影響を受ける
x.b = "b";
console.log(x2.b);//b

//x2.a = "2";
//console.log(x.a);

//クローンをする型に clone 機能を用意して プロパティも clone を再帰的にするものを作ってみました
/*
class Clonable {
    clone() {
        const clone = Object.create(this)
        for (const prop of this.constructor.clone_properties) {
            clone[prop] = this[prop].clone()
        }
        return clone
    }

    static get clone_properties() {
        return []
    }
}
class X extends Clonable {
    constructor(){
        super()
        this.str = "aa"
    }
}
class Y extends Clonable {
    constructor(){
        super()
        this.x = new X()
        this.x2 = new X()
    }

    static get clone_properties(){
        return ["x"]
    }
}
*/


console.log("\n■ 7 ■ Builderパターン、インスタンスを少しずつ積み重ねて構造を組み上げていく");

/*
 * 文書を作る抽象クラス
 */
class Builder {
    public makeTitle(title: string): void { };
    public makeSummary(summary: string): void { };
    public makeItems(items: string[]): void { };
    public getResult(): void { };
}

/*
 * 実際に文書を作る具象クラス
 */
class Diretor /*xtends Builder*/ {
    public builder: any;
    public Director(builder: any) {
        console.log("Diretor() " + builder);
        this.builder = builder;
    }
    constructor() {
        // super();
        console.log("Diretor constructor() " + this.builder);
        this.builder.makeTitle("Greeting");
        this.builder.makeSummary("朝から昼にかけて");
        this.builder.makeItems(new String(["おはよう", "こんにちは"]));
        this.builder.makeSummary("夜に");
        this.builder.makeItems(new String(["こんばんは", "おやすみなさい", "さようなら"]));
        return this.builder.getResult();
    }

}

// Builderのサブクラス、文書を構築する、Stringを返す
class TextBuilder extends Builder {
    private buffer: any = new String();
    public makeTitle(title: string) {
        this.buffer.append("====================\n");
        this.buffer.append("【" + title + "】\n");
        this.buffer.append("\n");
    }
    public makeSummary(summary: string) {
        this.buffer.append("■" + summary + "\n");
        this.buffer.append("\n");
    }
    public makeItems(items: string[]) {
        for (let i: number = 0; i < items.length; i++) {
            this.buffer.append(" ・" + items[i] + "\n");
        }
        this.buffer.append("\n");
    }
    public getResult() {
        this.buffer.append("====================\n");
        return this.buffer.toString();
    }
}

// HTMLBuilderクラス、HTMLを構築する
class HTMLBuilder extends Builder {
    private fileName: any;
    private writer: any;
    public HTMLBuilder() {
        console.log("HTMLBuilder()");
        //
    }
    public makeTitle(title: string) {
        this.fileName = title + ".html";
        // 仮
        console.log(this.fileName + "を出力");
    }
    public makeSummary(summary: string) {
        // 仮
        console.log(summary + "を構築");
    }
    public makeItems(items: string[]) {
        console.log(items);
        console.log("を構築");
    }
    public getResult() {
        return this.fileName;
    }
}

class BuilderTestMain {
    public BuilderTestMain(e: string[]) {
        console.log(e);
        if (e.length !== 1) {
            console.log("arg error1");
        } else if (e[0] === "plain") {
            console.log("plain");
            let diretor: any = new Diretor();
            // let result = diretor.constructor(new TextBuilder());
            diretor.Director(new TextBuilder());
            // console.log(result);
        } else if (e[0] === "html") {
            console.log("html");
            let diretor: any = new Diretor();
            console.log("diretor: " + diretor);
            let filename = diretor.constructor(new HTMLBuilder());
            console.log(filename);
        } else {
            console.log("arg error2");
        }
    }
}

/*
let testBuilder = new BuilderTestMain();
testBuilder.BuilderTestMain(["html"]);
*/

console.log("\n■ 19 ■ Stateパターン、状態によって遷移、ゲームでもよく使われる");


// サンプルでは1つの状態を1つのクラスで表現するようになっている、インターフェースで必要なメソッドを保証

// Stateインターフェース、状態に応じて呼び出されるインターフェース（API）を規定
// 状態依存メソッドの集まり

// 「分割して統治せよ（divide and conquer）」...大きい問題は解決出来る小さい問題に分けて考える、状態パターンもその一つ


interface IFState {
    doClock(hour: number): void;
    doUse(): void;
    doAlbam(): void;
    doPhone(): void;
}

class DayState implements IFState {
    private DayState() {
        //
    }
    // Singleton
    private static _instance: any;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new DayState(DayState.getInstance);
        }
        return this._instance;
    }
    private constructor(caller: Function) {
        if (caller === DayState.getInstance) {
            console.log("昼間インスタンス新規作成");
        } else if (DayState._instance) {
            throw new Error("DayState既にインスタンスが存在するためエラー。");
        } else {
            throw new Error("DayStateコンストラクタの引数が不正な為エラー。");
        }
    }
    public doClock(hour: number): void {
        console.log("入力値は、" + hour);
        if (hour < 9 || hour >= 17) {
            console.log("夜間モードに変更");
            safeFrame.changeState(NightState.getInstance())
        } else {
            console.log("昼間モードのままです");
        }
    };
    public doUse(): void {
        safeFrame.recordLog("金庫使用（昼間）");
    };
    public doAlbam(): void {
        safeFrame.callSecurityCenter("非常ベル（昼間）");
    };
    public doPhone(): void {
        safeFrame.callSecurityCenter("通常の通話（昼間）");
    };
    public toString(): string {
        return "[昼間]"
    }

}

class NightState implements IFState {
    private NightState() {
        //
    }
    // Singleton
    private static _instance: any;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new NightState(NightState.getInstance);
        }
        return this._instance;
    }
    private constructor(caller: Function) {
        if (caller === NightState.getInstance) {
            console.log("夜間インスタンス新規作成");
        } else if (NightState._instance) {
            throw new Error("既にNightStateインスタンスが存在するためエラー。");
        } else {
            throw new Error("NightStateコンストラクタの引数が不正な為エラー。");
        }
    }
    public doClock(hour: number): void {
        console.log("入力値は、" + hour);
        if (hour >= 9 && hour < 17) {
            console.log("昼間モードに変更");
            safeFrame.changeState(DayState.getInstance())
        } else {
            console.log("夜間モードのままです");
        }
    };
    public doUse(): void {
        safeFrame.recordLog("非常：夜間の金庫使用！");
    };
    public doAlbam(): void {
        safeFrame.callSecurityCenter("非常ベル（夜間）");
    };
    public doPhone(): void {
        safeFrame.callSecurityCenter("夜間の通話録音（夜間）");
    };
    public toString(): string {
        return "[夜間]"
    }

}

// Contextインターフェース、状態を管理する
interface IFContext {
    setClock(): void; // 時刻の設定
    changeState(state: any): void; // 状態を変化させる
    callSecurityCenter(msg: string): void; // 警備センターを呼び出す
    recordLog(msg: string): void; // 記録する
}

//SafeFrameクラス、Safe=金庫
class SafeFrame implements IFContext {

    private state: any = DayState.getInstance();

    // constractor
    public SefeFrame(title: string) {
        console.log("this.state:" + this.state);
    }

    // ボタン押下時の処理
    public pushButton(n: number) {
        console.log("n: " + n);
        console.log("this.state:" + this.state);
        switch (n) {
            case 1:
                console.log("ボタン1");
                this.state.doUse();
                break;
            case 2:
                console.log("ボタン2");
                this.state.doAlbam();
                break;
            case 3:
                console.log("ボタン3");
                this.state.doPhone();
                break;
            case 4:
                console.log("ボタン4、終了しました");
                if (safeFrame) { delete safeFrame.state };
                throw new Error('システムは終了しました');
                break;
            default:
                console.log("error num: " + n);
                break;
        }
    }

    // 時刻設定
    public setClock() {
        console.log("setClock()");
        let t: number = Number($("#hour_input").val());
        console.log("現在の時間は、" + t);
        this.state.doClock(t);
    }

    // ステート変更
    public changeState(state: any) {
        console.log("changeState()");
        console.log(`${this.state}から${state}に状態が変化しました`);
        this.state = state;
    }

    // 警備センター呼び出し
    public callSecurityCenter(msg: string) {
        console.log("call" + msg + "\n");
    }

    // 記録する
    public recordLog(msg: string) {
        console.log("record ... " + msg + "\n");
    }

}

let names: string[] = ["金庫使用ボタン", "非常ベル使用ボタン", "通常通話ボタン", "終了ボタン"];
let nums: number[] = [1, 2, 3, 4];
let buttonNum: number = nums.length;
for (let i: number = 0; i < buttonNum; i++) {
    let button: HTMLButtonElement = <HTMLButtonElement>(
        document.createElement("button")
    );
    button.textContent = `${names[i]}`;
    button.onclick = function () {
        let temp: string = `${names[i]}`;
        console.log("押した: " + temp);
        safeFrame.pushButton(Number(`${nums[i]}`));
    };
    document.body.appendChild(button);
    let divider: HTMLElement = <HTMLElement>document.createElement("span");
    divider.textContent = " ";
    document.body.appendChild(divider);
    if (i === buttonNum - 1) {
        let newLine: HTMLElement = <HTMLElement>document.createElement("br");
        document.body.appendChild(newLine);
    }
}

// npm i -D @types/jqueyで型判別出来るようにしておく（$でエラーが出るので）
$("#hour_input").change(function () {
    console.log("時間変更しました");
    safeFrame.setClock();
});

// テスト実行
let safeFrame: SafeFrame = new SafeFrame();
console.log("safeFrame:");
console.log(safeFrame);
safeFrame.SefeFrame("test start");

