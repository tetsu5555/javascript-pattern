var validator = {
    // 利用できる全ての検査
    types: {},

    // 現在の検証セッションでのエラーメッセージ
    messages: [],

    // 現在の検証の設定
    // 名前：検証の種類
    config: {},

    validate: function (data) {
        var i, msg, type, checker, result_ok;

        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];

                checker = this.types[type];

                if(!type) {
                    continue;
                }
                if(!checker) {
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    }
                }

                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg)
                }
            }
        }
        return this.hasErrors();
    },
    hasErrors: function () {
        return this.messages.length !== 0
    }
}

// 検査を追加する
// 空の値でないか検査
validator.types.isNotEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "the value cannot be empty"
};

// 値が数字か検査
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value)
    },
    instructions: "the value can only be a valid number, e.g 1, 3.14 or 2010"
};

// 値が英数字が検査
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: "the value can only contain characters and numbers, no special symbols"
};

// 設定
validator.config = {
    first_name: "isNotEmpty",
    age: "isNumber",
    username: "isAlphaNum"
}


// 実際に使ってみる
var data = {
    first_name: "Super",
    last_name: "Man",
    age: "unknown",
    username: "o_O"
}

validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}
// 実行結果
// Invalid value for *age*, the value can only be a valid number, e.g 1, 3.14 or 2010
// Invalid value for *username*, the value can only contain characters and numbers, no special symbols
