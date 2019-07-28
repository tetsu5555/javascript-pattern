function Sale (price) {
    this.price = price || 100;
}

Sale.prototype.getPrice = function () {
    return this.price
}

// デコレーターオブジェクトは全てコンストラクタプロパティとして実装される
Sale.decorators = {};

// getPriceメソッドを実装するオブジェクト
// 親メソッドから値を取得し、次にその値を変更する
Sale.decorators.fedtax = {
    getPrice: function () {
        var price = this.uber.getPrice();
        price = price * 5 / 100
        return price
    }
}

Sale.decorators.quebec = {
    getPrice: function () {
        var price = this.uber.getPrice()
        price += price * 7.5 / 100
        return price;
    }
}

Sale.decorators.money = {
    getPrice: function () {
        return "$" + this.uber.getPrice().toFixed(2)
    }
}

Sale.decorators.cdn = {
    getPrice: function () {
        return "CDN$ " + this.uber.getPrice().toFixed(2)
    }
}

Sale.prototype.decorate = function (decorator) {
    var F = function () {},
        overrides = this.constructor.decorators[decorator],
        i, newobj;
    // 内部でFという関数オブジェクトを作成して、呼び出し元のオブジェクトを継承させる
    F.prototype = this;
    // 継承させたコンストラクタからnewobjを作成する
    newobj = new F();
    // ここって
    // newobj.uber = this
    // でも同じ？
    // 同じっぽい
    newobj.uber = F.prototype;
    for (i in overrides) {
        if (overrides.hasOwnProperty(i)) {
            newobj[i] = overrides[i];
        }
    }
    console.log(newobj)
    return newobj;
}

// 状況によってオブジェクトに機能を追加することができる
var sale = new Sale(300);
sale = sale.decorate('fedtax')
sale = sale.decorate('quebec')
sale = sale.decorate('money')
sale.getPrice()
