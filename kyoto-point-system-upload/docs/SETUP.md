# セットアップガイド

## 前提条件

### 必須ソフトウェア
1. **Node.js 20.x以上**
   - ダウンロード: https://nodejs.org/
   - インストール後、コマンドプロンプトで確認:
     ```bash
     node --version
     npm --version
     ```

2. **PostgreSQL 15以上**
   - ダウンロード: https://www.postgresql.org/download/windows/
   - または Docker使用:
     ```bash
     docker run --name kyoto-point-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15
     ```

3. **Git**
   - ダウンロード: https://git-scm.com/download/win

### 推奨ツール
- Docker Desktop (コンテナ実行用)
- VS Code (開発環境)
- Postman (API テスト用)

## セットアップ手順

### 1. Node.jsのインストール
```bash
# Node.js 20.x LTSをインストール
# https://nodejs.org/ からダウンロードしてインストール

# インストール確認
node --version  # v20.x.x
npm --version   # 10.x.x
```

### 2. プロジェクトのセットアップ
```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して必要な値を設定
```

### 3. データベースのセットアップ
```bash
# PostgreSQLに接続
psql -U postgres

# データベース作成
CREATE DATABASE kyoto_point;

# スキーマ適用
psql -U postgres -d kyoto_point -f packages/api/src/db/schema.sql
psql -U postgres -d kyoto_point -f packages/api/src/db/schema-exchange.sql
```

### 4. ビルドと起動
```bash
# APIサーバーのビルド
npm run build --workspace=api

# 開発モードで起動
npm run dev:api

# または本番モードで起動
npm run start --workspace=api
```

### 5. 動作確認
```bash
# ヘルスチェック
curl http://localhost:3000/health

# レスポンス例:
# {"status":"ok","timestamp":"2026-02-19T..."}
```

## Docker を使用したセットアップ

### 1. Docker Composeで全体を起動
```bash
# docker-compose.ymlを使用
docker-compose up -d

# ログ確認
docker-compose logs -f api
```

### 2. データベースマイグレーション
```bash
docker-compose exec api npm run migrate
```

## トラブルシューティング

### Node.jsが認識されない
- 環境変数PATHにNode.jsのパスが含まれているか確認
- コマンドプロンプトを再起動

### ポートが使用中
```bash
# Windowsでポート使用状況確認
netstat -ano | findstr :3000

# プロセスを終了
taskkill /PID <プロセスID> /F
```

### データベース接続エラー
- PostgreSQLが起動しているか確認
- .envファイルのDATABASE_URLが正しいか確認
- ファイアウォール設定を確認

## 次のステップ

1. [API仕様書](./API.md)を確認
2. [ポイント交換API](./API_EXCHANGE.md)を確認
3. [デプロイメントガイド](./DEPLOYMENT.md)を確認
4. Postmanでテストリクエストを実行
