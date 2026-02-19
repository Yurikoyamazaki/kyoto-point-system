#!/bin/bash

# 京都市ポイント給付アプリ - セットアップスクリプト

set -e

echo "========================================="
echo "京都市ポイント給付アプリ セットアップ"
echo "========================================="
echo ""

# Node.jsバージョンチェック
echo "1. Node.jsバージョン確認..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.jsがインストールされていません"
    echo "   https://nodejs.org/ からNode.js 20.x以上をインストールしてください"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 20.x以上が必要です（現在: $(node -v)）"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo ""

# npmバージョン確認
echo "2. npmバージョン確認..."
echo "✅ npm $(npm -v)"
echo ""

# 依存関係インストール
echo "3. 依存関係をインストール中..."
npm install
echo "✅ 依存関係のインストール完了"
echo ""

# 環境変数ファイル作成
echo "4. 環境変数ファイルを作成中..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .envファイルを作成しました"
    echo "   必要に応じて.envファイルを編集してください"
else
    echo "⚠️  .envファイルは既に存在します"
fi
echo ""

# PostgreSQL確認
echo "5. PostgreSQL接続確認..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQLクライアントが見つかりました"
    echo "   データベースセットアップ: make migrate"
else
    echo "⚠️  PostgreSQLクライアントが見つかりません"
    echo "   Dockerを使用する場合: make docker-up"
fi
echo ""

# ビルド
echo "6. プロジェクトをビルド中..."
npm run build
echo "✅ ビルド完了"
echo ""

echo "========================================="
echo "セットアップ完了！"
echo "========================================="
echo ""
echo "次のステップ:"
echo "  1. .envファイルを編集して環境変数を設定"
echo "  2. データベースをセットアップ: make migrate"
echo "  3. 開発サーバーを起動: make dev"
echo ""
echo "または Dockerを使用:"
echo "  make docker-up"
echo ""
