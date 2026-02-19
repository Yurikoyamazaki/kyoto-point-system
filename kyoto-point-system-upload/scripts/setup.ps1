# 京都市ポイント給付アプリ - セットアップスクリプト (Windows PowerShell)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "京都市ポイント給付アプリ セットアップ" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Node.jsバージョンチェック
Write-Host "1. Node.jsバージョン確認..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
    
    if ($versionNumber -lt 20) {
        Write-Host "❌ Node.js 20.x以上が必要です（現在: $nodeVersion）" -ForegroundColor Red
        Write-Host "   https://nodejs.org/ からNode.js 20.x以上をインストールしてください" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.jsがインストールされていません" -ForegroundColor Red
    Write-Host "   https://nodejs.org/ からNode.js 20.x以上をインストールしてください" -ForegroundColor Red
    exit 1
}
Write-Host ""

# npmバージョン確認
Write-Host "2. npmバージョン確認..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "✅ npm $npmVersion" -ForegroundColor Green
Write-Host ""

# 依存関係インストール
Write-Host "3. 依存関係をインストール中..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 依存関係のインストール完了" -ForegroundColor Green
} else {
    Write-Host "❌ 依存関係のインストールに失敗しました" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 環境変数ファイル作成
Write-Host "4. 環境変数ファイルを作成中..." -ForegroundColor Yellow
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ .envファイルを作成しました" -ForegroundColor Green
    Write-Host "   必要に応じて.envファイルを編集してください" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  .envファイルは既に存在します" -ForegroundColor Yellow
}
Write-Host ""

# PostgreSQL確認
Write-Host "5. PostgreSQL接続確認..." -ForegroundColor Yellow
try {
    $null = Get-Command psql -ErrorAction Stop
    Write-Host "✅ PostgreSQLクライアントが見つかりました" -ForegroundColor Green
    Write-Host "   データベースセットアップ: psql -U postgres -d kyoto_point -f packages/api/src/db/schema.sql" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  PostgreSQLクライアントが見つかりません" -ForegroundColor Yellow
    Write-Host "   Dockerを使用する場合: docker-compose up -d" -ForegroundColor Cyan
}
Write-Host ""

# Docker確認
Write-Host "6. Docker確認..." -ForegroundColor Yellow
try {
    $null = Get-Command docker -ErrorAction Stop
    Write-Host "✅ Dockerが見つかりました" -ForegroundColor Green
    Write-Host "   Docker Composeで起動: docker-compose up -d" -ForegroundColor Cyan
} catch {
    Write-Host "⚠️  Dockerが見つかりません（オプション）" -ForegroundColor Yellow
}
Write-Host ""

# ビルド
Write-Host "7. プロジェクトをビルド中..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ ビルド完了" -ForegroundColor Green
} else {
    Write-Host "❌ ビルドに失敗しました" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "セットアップ完了！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "  1. .envファイルを編集して環境変数を設定" -ForegroundColor White
Write-Host "  2. データベースをセットアップ" -ForegroundColor White
Write-Host "     psql -U postgres -d kyoto_point -f packages/api/src/db/schema.sql" -ForegroundColor Cyan
Write-Host "  3. 開発サーバーを起動: npm run dev:api" -ForegroundColor White
Write-Host ""
Write-Host "または Dockerを使用:" -ForegroundColor Yellow
Write-Host "  docker-compose up -d" -ForegroundColor Cyan
Write-Host ""
