// よく一緒に呼び出される関数をまとめた関数を定義する
var myevent = {
    stop: function (e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

// ブラウザごとの違いをファサードの裏に隠す
var myevent = {
    stop: function (e) {
        // IE以外
        if (typeof e.preventDefault === "function") {
            e.preventDefault()
        }
        if (typeof e.stopPropagation === "function") {
            e.stopPropagation()
        }
        // IE
        if (typeof e.returnValue === "boolean") {
            e.returnValue = false
        }
        if (typeof e.cancelBubble === "boolean") {
            e.cancelBubble = true
        }
    }

}
