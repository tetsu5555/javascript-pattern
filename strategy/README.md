ストラテジーパターンでは実行時にアルゴリズムを選択する
利用者は同じインターフェースを使って処理を実行するが、実行のコンテキストに依存する特定の処理をするためにいくつかのアルゴリズムの中からアルゴリズムが選ばれる

使用例
- 妥当性の検証
    - validateメソッドを持つバリデータオブジェクト
        - フォームの具体的な型に関係なく、呼び出され、常に同じ結果を返す
        - バリデータは作業をさばくのに最善なストラテジーを選択し、適切なアルゴリズムにデータの検証を委ねる

