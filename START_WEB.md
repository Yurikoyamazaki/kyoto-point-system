# 🚀 Webデモを起動する

## 🎯 目標

ローカルPCでWebデモを起動して、ブラウザで完成形を確認します。

```
http://localhost:5173
```

---

## ✅ 前提条件

以下がインストール済みであること:
- ✅ Node.js 20.x以上
- ✅ npm（Node.jsと一緒にインストールされる）

確認方法:
```cmd
node --version
npm --version
```

---

## 🚀 起動手順（5分）

### ステップ1: プロジェクトフォルダに移動

```cmd
cd C:\kyoto-point-system-upload
```

または、エクスプローラーでフォルダを開いて、アドレスバーに `cmd` と入力してEnter

### ステップ2: 依存関係をインストール（初回のみ）

```cmd
npm install
```

**所要時間:** 2-3分

**表示例:**
```
added 1234 packages in 2m
```

### ステップ3: デモ環境をセットアップ（初回のみ）

```cmd
cd packages\demo
npm install
```

**所要時間:** 1-2分

### ステップ4: デモを起動

```cmd
npm run dev
```

**表示例:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

### ステップ5: ブラウザでアクセス

```
http://localhost:5173
```

または、表示されたURLをCtrl+クリック

---

## 🎬 デモの使い方

### トップページ

```
http://localhost:5173/
```

3つのデモを選択:
1. **ユーザーアプリ** - モバイル風UI
2. **加盟店管理画面** - Web管理画面
3. **管理者ダッシュボード** - 統計・管理

### ユーザーアプリ

```
http://localhost:5173/user
```

機能:
- ポイント残高確認（5,000ポイント）
- QRコード決済
- ポイント交換
- 利用履歴

### 加盟店管理画面

```
http://localhost:5173/merchant
```

機能:
- QRコード生成
- 取引履歴
- 売上確認

### 管理者ダッシュボード

```
http://localhost:5173/admin
```

機能:
- 統計データ
- ユーザー管理
- ポイント付与

---

## 📱 スマートフォンで確認

### 同じネットワーク内のスマホからアクセス

1. **PCのIPアドレスを確認**
   ```cmd
   ipconfig
   ```
   
   `IPv4 アドレス` を確認（例: 192.168.1.100）

2. **スマホのブラウザでアクセス**
   ```
   http://192.168.1.100:5173/
   ```

3. **デモを確認**
   - スマホで実際のアプリのように操作可能
   - タッチ操作対応

---

## 🛑 停止方法

### デモを停止

ターミナルで:
```
Ctrl + C
```

確認メッセージが出たら `Y` を入力してEnter

---

## 🔧 トラブルシューティング

### 問題1: ポート5173が使用中

**エラー:**
```
Port 5173 is in use
```

**解決方法A: 別のポートを使用**
```cmd
npm run dev -- --port 3000
```

アクセス: `http://localhost:3000`

**解決方法B: 使用中のプロセスを終了**
```cmd
netstat -ano | findstr :5173
taskkill /PID <プロセスID> /F
```

### 問題2: npm installが失敗

**エラー:**
```
npm ERR! code ENOENT
```

**解決方法:**
```cmd
# キャッシュをクリア
npm cache clean --force

# 再インストール
npm install
```

### 問題3: ブラウザで表示されない

**確認事項:**
1. ターミナルにエラーが表示されていないか
2. `http://localhost:5173` が正しいか
3. ブラウザのキャッシュをクリア（Ctrl + F5）

**解決方法:**
```cmd
# デモを再起動
Ctrl + C
npm run dev
```

### 問題4: スマホからアクセスできない

**確認事項:**
1. PCとスマホが同じWi-Fiに接続されているか
2. PCのファイアウォールが許可しているか

**解決方法:**
```cmd
# Windowsファイアウォールで許可
# コントロールパネル → Windows Defender ファイアウォール
# → 詳細設定 → 受信の規則 → 新しい規則
# ポート 5173 を許可
```

---

## 📊 デモデータ

### テストユーザー

| 名前 | カードID | ポイント |
|------|----------|---------|
| 山田太郎 | card_001 | 5,000 |
| 佐藤花子 | card_002 | 3,500 |
| 鈴木一郎 | card_003 | 5,000 |

### テスト加盟店

| 店舗名 | ID | 業種 |
|--------|-----|------|
| 京都カフェ | merchant_001 | 飲食店 |
| 京都書店 | merchant_002 | 書店 |
| 京都スーパー | merchant_003 | スーパー |

### ログイン情報

```
ユーザー: card_001 / PIN: 1234
加盟店: merchant_001 / demo123
管理者: admin_001 / admin123
```

---

## 🎨 カスタマイズ

### テーマカラーを変更

```javascript
// packages/demo/src/theme.ts
export const theme = {
  primary: '#667eea',    // メインカラー
  secondary: '#764ba2',  // サブカラー
  success: '#4caf50',    // 成功
  error: '#dc004e'       // エラー
}
```

### テストデータを変更

```javascript
// packages/demo/src/data/users.ts
export const users = [
  {
    id: 'user_001',
    name: '山田太郎',
    points: 5000
  }
]
```

---

## 📸 スクリーンショット

### 自動でスクリーンショットを撮影

```cmd
npm run demo:screenshot
```

保存場所:
```
packages/demo/screenshots/
├── user-home.png
├── user-payment.png
├── merchant-dashboard.png
└── admin-dashboard.png
```

---

## 🎥 デモ動画を録画

### Windows Game Barを使用

1. **Win + G** を押す
2. 録画ボタンをクリック
3. デモを操作
4. 停止ボタンをクリック

保存場所:
```
C:\Users\<ユーザー名>\Videos\Captures\
```

---

## 🔄 開発モード

### ホットリロード

ファイルを編集すると自動で反映されます:

```
packages/demo/src/pages/UserDemo.tsx
↓ 保存
ブラウザが自動でリロード
```

### デバッグ

ブラウザの開発者ツール:
```
F12 または Ctrl + Shift + I
```

---

## 📦 ビルド（本番用）

### 本番用にビルド

```cmd
npm run build
```

生成場所:
```
packages/demo/dist/
```

### ビルドをプレビュー

```cmd
npm run preview
```

アクセス:
```
http://localhost:4173
```

---

## 🌐 公開する

### Vercelにデプロイ

```cmd
# Vercel CLIをインストール
npm install -g vercel

# デプロイ
cd packages/demo
vercel

# 本番デプロイ
vercel --prod
```

公開URL:
```
https://kyoto-point-demo.vercel.app
```

---

## ✅ チェックリスト

### 起動前
- [ ] Node.js 20.x以上がインストール済み
- [ ] プロジェクトフォルダに移動
- [ ] `npm install` を実行

### 起動時
- [ ] `npm run dev` を実行
- [ ] ターミナルにURLが表示される
- [ ] ブラウザでアクセス

### 確認
- [ ] トップページが表示される
- [ ] ユーザーアプリが動作する
- [ ] 加盟店画面が動作する
- [ ] 管理者画面が動作する

---

## 💡 ヒント

### 複数のターミナルを開く

```
ターミナル1: デモサーバー（npm run dev）
ターミナル2: APIサーバー（npm run dev:api）
ターミナル3: その他のコマンド
```

### エディタで開く

```cmd
# VS Codeで開く
code .

# または
start .
```

---

## 📞 サポート

### デモが起動しない

1. `docs/SETUP.md` を確認
2. `docs/QUICK_START.md` を確認
3. Node.jsのバージョンを確認
4. `npm install` を再実行

### その他の問題

- `CODESPACES_TROUBLESHOOTING.md`
- `QUICK_START_ALTERNATIVES.md`
- GitHubのIssues

---

## ⏭️ 次のステップ

1. ✅ デモを起動
2. ✅ 機能を確認
3. ✅ カスタマイズ
4. ✅ スクリーンショット撮影
5. 🚀 プレゼンテーション準備完了！

---

## 🎯 クイックコマンド

```cmd
# デモを起動
cd packages\demo
npm run dev

# 別のポートで起動
npm run dev -- --port 3000

# ビルド
npm run build

# プレビュー
npm run preview

# スクリーンショット
npm run screenshot
```

**今すぐ試してみましょう！**

```cmd
cd C:\kyoto-point-system-upload\packages\demo
npm install
npm run dev
```

ブラウザで `http://localhost:5173` にアクセス！
