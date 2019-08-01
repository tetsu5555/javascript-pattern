// 親コンストラクタ
function CarMaker () {}

CarMaker.prototype.drive = function () {
    return `Vroom, I have ${this.doors} doors`;
}

// 静的ファクトリメソッド
CarMaker.factory = function (type) {
    var constr = type,
        newcar;
    if (typeof CarMaker[constr] !== "funcation") {
        throw {
            name: "Error",
            message: `${constr} + doesn't exist`
        };
    }

    if (typeof CarMaker[constr].prototype.drive !== "function") {
        CarMaker[constr].prototype = new CarMaker();
    }

    newcar = new CarMaker[constr]();

    return newcar;
}

CarMaker.Compact = function () {
    this.doors = 4;
};


CarMaker.Convertible = function () {
    this.drive = 2;
};

CarMaker.SUV = function () {
    this.doors = 17;
};

// 以下のように使う
var corolla = CarMaker.factory('Compact');
var solstice  = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive();
solstice.drive();
cherokee.drive();
