デコレーターパターン実装方法の一つは
- それぞれのデコレーターを上書きされるメソッドを含むオブジェクトにしてしまうこと

各デコレータは自分より前のデコレータで強化されたオブジェクトを継承する
修飾されたメソッドはuber(継承したオブジェクト)にある同じメソッドを呼びだし、値を取得し、付加機能を実行して処理を続ける

```javascript
var sale = new Sale(100)
sale = sale.decorate('fedtax;);
sale = sale.decorate('quebec');
sale = sale.decorate('money');
sale.getPrice()
```

↑のようなパターンのようにgetPriceメソッドを実行すると

```javascript
sale.getPrice()
↓
money.getPrice()
↓
quebec.getPrice()
↓
fedtax.getPrice()
↓
Sale.prototype.getPrice()
```
