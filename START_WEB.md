# Webアプリ起動ガイド

## クイックスタート

### 1. 依存関係のインストール
```bash
npm install
```

### 2. Webアプリの起動
```bash
npm run dev:web
```

ブラウザで http://localhost:5173 にアクセスしてください。

## 主な機能

### 利用可能なページ

1. **ホーム** (/)
   - システムの概要
   - 主な機能紹介
   - 利用期間情報

2. **ログイン** (/login)
   - マイナンバーカード認証
   - 初回登録で5,000ポイント付与

3. **ポイント残高** (/points)
   - 現在のポイント残高表示
   - ポイントの使い方案内
   - 加盟店検索
   - ポイント交換・履歴へのリンク

4. **ポイント交換** (/exchange)
   - 楽天ポイント
   - Tポイント
   - dポイント
   - Pontaポイント
   - nanacoポイント
   - WAONポイント
   - 1:1レート、手数料無料

5. **利用履歴** (/history)
   - ポイント付与履歴
   - 使用履歴
   - 交換履歴
   - フィルター機能

## バックエンドAPIとの連携

### APIサーバーの起動（別ターミナル）
```bash
npm run dev:api
```

APIサーバーは http://localhost:3000 で起動します。

### プロキシ設定
Viteの開発サーバーは `/api/*` へのリクエストを自動的にバックエンド（port 3000）にプロキシします。

## 開発コマンド

```bash
# Webアプリのみ起動
npm run dev:web

# APIサーバーのみ起動
npm run dev:api

# ビルド
npm run build:web

# プレビュー（本番ビルドの確認）
cd packages/web && npm run preview
```

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **ルーティング**: React Router v6
- **スタイリング**: CSS Modules
- **バックエンド**: Express + PostgreSQL

## デザイン

- 京都らしさを表現した緑色のグラデーション
- レスポンシブデザイン対応
- モダンで直感的なUI/UX
- アクセシビリティ配慮

## 本番環境へのデプロイ

### ビルド
```bash
npm run build
```

ビルド成果物は `packages/web/dist/` に生成されます。

### 静的ファイルのホスティング
- AWS S3 + CloudFront
- Vercel
- Netlify
- GitHub Pages

などで静的ファイルをホスティングできます。

## トラブルシューティング

### ポート5173が使用中
別のアプリケーションがポート5173を使用している場合:
```bash
# vite.config.tsでポートを変更
server: {
  port: 5174
}
```

### APIサーバーに接続できない
1. APIサーバーが起動しているか確認
2. ポート3000が使用可能か確認
3. .envファイルの設定を確認

### ビルドエラー
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## 次のステップ

1. マイナンバーカード認証の実装
2. Supabaseデータベース連携
3. 実際のAPI統合
4. 加盟店QRコード機能
5. プッシュ通知機能
6. 多言語対応

## サポート

問題が発生した場合は、プロジェクトのドキュメントを参照してください:
- [docs/SETUP.md](docs/SETUP.md)
- [docs/API.md](docs/API.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
