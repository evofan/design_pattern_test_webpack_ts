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


