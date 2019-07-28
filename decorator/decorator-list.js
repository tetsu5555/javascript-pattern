// リストを使った実装
// javascriptの動的性質を利用すれば継承を一切使わずにできる

// 連鎖上の前のメソッドを修飾されたメソッドから呼ぶ代わりに直前のメソッドの結果をパラーメータートして次のメソッドに渡す

function Sale(price) {
    this.price = (price > 0) || price;
    this.decorators_list = [];
}

Sale.decorators = {};

Sale.decorators.fedtax = {
    getPrice: function (price) {
        return price + price * 5 / 100;
    }
};

Sale.decorators.quebec = {
    getPrice: function (price) {
        return price + price * 7.5 / 100;
    }
};

Sale.decorators.money = {
    getPrice: function (price) {
        return "$" + price.toFixed(2);
    }
};

// decorateメソッドはとてもシンプル
Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator)
}

// getPriceメソッドが少し複雑になった
// リストに追加されたデコレータを順に取り出す
// そのgetPrice()メソッドに直前の結果を渡して呼び出す
Sale.prototype.getPrice = function () {
    // オブジェクトのpriceを変数priceに記録しておく
    var price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for (i = 0; i < max; i++) {
        name = this.decorators_list[i];
        // priceを使ってdecoratorを順に呼び出していき、その結果でpriceを更新する
        price = Sale.decorators[name].getPrice(price);
    }
    return price
}
