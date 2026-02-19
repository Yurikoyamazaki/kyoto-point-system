# クイックスタートガイド

## 最速セットアップ（5分）

### Windows環境

#### 1. Node.jsのインストール
1. https://nodejs.org/ にアクセス
2. "LTS" バージョン（推奨版）をダウンロード
3. インストーラーを実行（デフォルト設定でOK）
4. コマンドプロンプトを開いて確認:
   ```cmd
   node --version
   ```

#### 2. プロジェクトのセットアップ
```powershell
# PowerShellで実行
.\scripts\setup.ps1
```

または手動で:
```cmd
# 依存関係インストール
npm install

# 環境変数ファイル作成
copy .env.example .env

# ビルド
npm run build
```

#### 3. Dockerで起動（推奨）
```cmd
# Docker Desktopをインストール済みの場合
docker-compose up -d

# ログ確認
docker-compose logs -f api
```

#### 4. 動作確認
ブラウザで http://localhost:3000/health にアクセス

```json
{"status":"ok","timestamp":"2026-02-19T..."}
```

が表示されればOK！

---

## 手動セットアップ（PostgreSQL使用）

### 1. PostgreSQLのインストール
1. https://www.postgresql.org/download/windows/ からダウンロード
2. インストール（パスワードを設定）
3. pgAdmin 4が自動で起動

### 2. データベース作成
```sql
-- pgAdmin 4またはpsqlで実行
CREATE DATABASE kyoto_point;
```

### 3. スキーマ適用
```cmd
psql -U postgres -d kyoto_point -f packages/api/src/db/schema.sql
psql -U postgres -d kyoto_point -f packages/api/src/db/schema-exchange.sql
```

### 4. 環境変数設定
`.env`ファイルを編集:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/kyoto_point
```

### 5. 起動
```cmd
npm run dev:api
```

---

## よくある質問

### Q: Node.jsが認識されない
A: コマンドプロンプトを再起動してください。それでもダメな場合は、環境変数PATHにNode.jsのパスを追加してください。

### Q: ポート3000が使用中
A: 別のアプリケーションがポートを使用しています。
```cmd
# 使用中のプロセスを確認
netstat -ano | findstr :3000

# プロセスを終了
taskkill /PID <プロセスID> /F
```

### Q: Docker Desktopがない
A: https://www.docker.com/products/docker-desktop/ からダウンロードしてインストールしてください。

### Q: データベース接続エラー
A: 
1. PostgreSQLが起動しているか確認
2. `.env`のDATABASE_URLが正しいか確認
3. パスワードが正しいか確認

---

## 次のステップ

1. **API仕様を確認**: [docs/API.md](./API.md)
2. **ポイント交換機能**: [docs/API_EXCHANGE.md](./API_EXCHANGE.md)
3. **Postmanでテスト**: APIエンドポイントをテスト
4. **管理画面開発**: React管理画面の実装
5. **モバイルアプリ開発**: React Nativeアプリの実装

---

## サポート

問題が発生した場合:
1. [docs/SETUP.md](./SETUP.md) の詳細ガイドを確認
2. [docs/DEPLOYMENT.md](./DEPLOYMENT.md) のトラブルシューティングを確認
3. GitHubのIssuesで質問
