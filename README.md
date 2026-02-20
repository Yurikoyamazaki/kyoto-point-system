# 🏛️ 京都市ポイント給付アプリ

## 📖 プロジェクト概要

京都市民向けのデジタルポイント給付・利用システム

### 主要機能
- マイナンバーカード認証による本人確認
- 1人5,000ポイントの給付
- 加盟店でのQRコード決済
- 他社ポイントとの交換（楽天、T、d、Ponta、nanaco、WAON）
- 管理者による一元管理
- デジタルデバイド対策

### 対象規模
- 想定利用者: 70万人
- 同時アクセス: 14.3万人
- 稼働: 24時間365日
- ポイント使用期間: 2026年8月1日〜2027年2月28日

---

## 🚀 クイックスタート

### 他のユーザー向け（初めての方）

**→ `FOR_OTHER_USERS.md` を開いてください**

このプロジェクトを自分のPCで動かす手順を詳しく説明しています。

### 簡単3ステップ

```bash
# 1. Node.jsをインストール
https://nodejs.org/

# 2. プロジェクトをダウンロード
https://github.com/Yurikoyamazaki/kyoto-point-system
→ Code → Download ZIP

# 3. セットアップして起動
npm install
cd packages/demo
npm install
npm run dev

# ブラウザでアクセス
http://localhost:5173
```

---

## 📱 デモを確認

### 方法1: モバイルアプリ（ネイティブ）⭐NEW

```bash
cd packages/mobile
npm install
npm start
# Expo Goアプリでスキャン
```

詳細: `MOBILE_APP_SETUP.md`

### 方法2: ローカルPC（Web版）

```bash
cd packages/demo
npm install
npm run dev
```

アクセス: `http://localhost:5173`

### 方法3: オンライン（最速）

```
https://stackblitz.com/github/Yurikoyamazaki/kyoto-point-system
```

### 方法4: 静的HTML（インストール不要）

```
demo/index.html をブラウザで開く
```

---

## 📚 ドキュメント

### 初めての方
- **`FOR_OTHER_USERS.md`** - 他のユーザー向けセットアップガイド ⭐
- **`MOBILE_APP_SETUP.md`** - モバイルアプリセットアップ 📱NEW
- **`START_HERE.md`** - 最初に読むファイル
- **`README_FIRST.md`** - 状況別ガイド

### セットアップ
- **`INSTALL_FIRST.md`** - Node.jsインストール
- **`docs/SETUP.md`** - 詳細セットアップ
- **`docs/QUICK_START.md`** - クイックスタート
- **`COMPLETE_SETUP_GUIDE.md`** - 完全ガイド

### デモ
- **`START_WEB.md`** - Webデモ起動
- **`DEMO_SETUP.md`** - デモ環境構築
- **`WEB_DEMO_QUICK.md`** - オンラインデモ

### 開発環境
- **`DOCKER_ONLY_SETUP.md`** - Docker使用
- **`GITHUB_CODESPACES_SETUP.md`** - Codespaces
- **`ALTERNATIVE_SETUP.md`** - 代替方法

### 本番環境
- **`AWS_ECS_SETUP.md`** - AWS ECSデプロイ
- **`docs/DEPLOYMENT.md`** - デプロイメント
- **`docs/ARCHITECTURE.md`** - アーキテクチャ

### API・仕様
- **`docs/API.md`** - API仕様書
- **`docs/API_EXCHANGE.md`** - ポイント交換API
- **`docs/SECURITY.md`** - セキュリティ仕様
- **`docs/REQUIREMENTS.md`** - 要件一覧

### トラブルシューティング
- **`CODESPACES_TROUBLESHOOTING.md`** - Codespaces問題解決
- **`QUICK_START_ALTERNATIVES.md`** - 代替方法まとめ

---

## 🏗️ 技術スタック

### フロントエンド
- React + TypeScript
- Vite
- React Router

### モバイルアプリ
- React Native + Expo
- TypeScript
- Expo Router
- Expo Camera（QRスキャン）
- 生体認証対応

### バックエンド
- Node.js + Express
- PostgreSQL
- Redis

### インフラ
- AWS ECS Fargate
- RDS PostgreSQL (Multi-AZ)
- ElastiCache Redis
- Application Load Balancer

### セキュリティ
- TLS 1.2以上
- JWT認証
- 多要素認証（管理者）
- OWASP Top 10対策

---

## 📂 プロジェクト構成

```
kyoto-point-system/
├── packages/
│   ├── api/              # バックエンドAPI
│   │   ├── src/
│   │   │   ├── routes/   # APIルート
│   │   │   ├── services/ # ビジネスロジック
│   │   │   ├── middleware/
│   │   │   └── db/       # データベーススキーマ
│   │   └── package.json
│   ├── demo/             # Webデモ
│   │   ├── src/
│   │   │   ├── pages/    # 各画面
│   │   │   ├── components/
│   │   │   └── data/     # テストデータ
│   │   └── package.json
│   └── mobile/           # モバイルアプリ（NEW）
│       ├── app/          # Expo Router
│       │   ├── (tabs)/   # タブ画面
│       │   ├── auth/     # 認証
│       │   └── payment/  # 決済
│       ├── components/
│       └── package.json
├── docs/                 # ドキュメント
├── demo/                 # 静的HTMLデモ
├── infrastructure/       # インフラ設定
├── scripts/              # セットアップスクリプト
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🎯 主要機能

### ユーザー機能
- ✅ マイナンバーカード認証
- ✅ ポイント残高確認
- ✅ QRコード決済
- ✅ ポイント使用履歴
- ✅ 他社ポイント交換（6社対応）

### 加盟店機能
- ✅ QRコード生成
- ✅ 取引履歴確認
- ✅ 売上確認
- ✅ 支払履歴確認

### 管理者機能
- ✅ ポイント付与
- ✅ ユーザー管理
- ✅ 加盟店管理
- ✅ 統計ダッシュボード
- ✅ 全銀協フォーマット振込データ生成

### セキュリティ機能
- ✅ マイナンバーカード電子証明書検証
- ✅ 重複登録防止
- ✅ 不正使用防止
- ✅ 監査ログ（改ざん防止）
- ✅ 多要素認証（管理者）

---

## 🌐 対応ポイントサービス

1. **楽天ポイント** - 即時交換
2. **Tポイント** - 1-3営業日
3. **dポイント** - 即時交換
4. **Pontaポイント** - 1-3営業日
5. **nanacoポイント** - 即時交換
6. **WAONポイント** - 即時交換

交換レート: 1:1（手数料無料）

---

## 💻 開発環境

### 必要なもの
- Node.js 20.x以上
- Docker Desktop（推奨）
- PostgreSQL 15以上（Dockerを使わない場合）

### セットアップ

```bash
# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env

# Dockerで起動（推奨）
docker-compose up -d

# または手動起動
npm run dev:api
```

---

## 🧪 テスト

```bash
# 単体テスト
npm run test

# E2Eテスト
npm run test:e2e

# カバレッジ
npm run test:coverage
```

---

## 📊 統計データ

- **総ユーザー数:** 70万人
- **総ポイント発行:** 35億ポイント
- **加盟店数:** 5,000店
- **総取引数:** 150万件
- **平均取引額:** 1,200円

---

## 🔐 セキュリティ

### 対策済み
- ✅ OWASP Top 10対策
- ✅ TLS 1.2以上の暗号化
- ✅ 第三者脆弱性診断実施
- ✅ 監査ログ取得・保管
- ✅ 個人番号（マイナンバー）非取得

### コンプライアンス
- ✅ 京都市個人情報保護条例遵守
- ✅ 情報セキュリティ規定遵守
- ✅ デジタル庁ガイドライン準拠

---

## 📞 サポート

### ドキュメント
プロジェクト内の各種ドキュメントを参照してください。

### 質問・問題報告
GitHubのIssuesで質問・報告してください:
```
https://github.com/Yurikoyamazaki/kyoto-point-system/issues
```

### よくある質問
- `FOR_OTHER_USERS.md` のトラブルシューティング
- `CODESPACES_TROUBLESHOOTING.md`
- `docs/SETUP.md`

---

## 🤝 コントリビューション

プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

このプロジェクトは京都市のデジタルポイント給付事業のデモシステムです。

---

## 🎉 今すぐ始める

### 最速で確認（30秒）

```
https://stackblitz.com/github/Yurikoyamazaki/kyoto-point-system
```

### ローカルで確認（5分）

```bash
# 1. プロジェクトをダウンロード
https://github.com/Yurikoyamazaki/kyoto-point-system
→ Code → Download ZIP

# 2. セットアップ
npm install
cd packages/demo
npm install

# 3. 起動
npm run dev

# 4. アクセス
http://localhost:5173
```

### 詳細な手順

**→ `FOR_OTHER_USERS.md` を開いてください**

---

## 📧 お問い合わせ

プロジェクトに関する質問は、GitHubのIssuesでお願いします。

---

**京都市ポイント給付アプリ - デモシステム**

© 2026 Kyoto City Point System
