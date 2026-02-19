# GitHubアップロード用パッケージ作成スクリプト

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "GitHubアップロード用パッケージ作成" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$sourceDir = Get-Location
$targetDir = Join-Path $env:TEMP "kyoto-point-system-upload"
$zipFile = Join-Path $sourceDir "kyoto-point-system-upload.zip"

# 既存のターゲットディレクトリを削除
if (Test-Path $targetDir) {
    Remove-Item $targetDir -Recurse -Force
}

# ターゲットディレクトリを作成
New-Item -ItemType Directory -Path $targetDir | Out-Null

Write-Host "1. 必要なファイルをコピー中..." -ForegroundColor Yellow

# コピーするフォルダ
$folders = @(
    ".devcontainer",
    ".github",
    "docs",
    "infrastructure",
    "packages",
    "scripts"
)

foreach ($folder in $folders) {
    $source = Join-Path $sourceDir $folder
    if (Test-Path $source) {
        Write-Host "  - $folder をコピー" -ForegroundColor Gray
        Copy-Item $source -Destination $targetDir -Recurse -Force
    }
}

# コピーするファイル
$files = @(
    ".dockerignore",
    ".env.example",
    ".gitignore",
    "docker-compose.yml",
    "Dockerfile",
    "Makefile",
    "package.json",
    "README.md",
    "START_HERE.md",
    "GITHUB_CODESPACES_SETUP.md",
    "DOCKER_ONLY_SETUP.md",
    "INSTALL_FIRST.md",
    "README_FIRST.md",
    "ALTERNATIVE_SETUP.md",
    "UPLOAD_TO_GITHUB.md"
)

foreach ($file in $files) {
    $source = Join-Path $sourceDir $file
    if (Test-Path $source) {
        Write-Host "  - $file をコピー" -ForegroundColor Gray
        Copy-Item $source -Destination $targetDir -Force
    }
}

Write-Host "✅ ファイルのコピー完了" -ForegroundColor Green
Write-Host ""

# 不要なファイルを削除
Write-Host "2. 不要なファイルを削除中..." -ForegroundColor Yellow

$excludePatterns = @(
    "node_modules",
    "dist",
    ".env",
    "*.log",
    ".DS_Store",
    "desktop.ini"
)

foreach ($pattern in $excludePatterns) {
    Get-ChildItem -Path $targetDir -Recurse -Force -Filter $pattern -ErrorAction SilentlyContinue | 
        Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "✅ 不要なファイルの削除完了" -ForegroundColor Green
Write-Host ""

# ZIPファイルを作成
Write-Host "3. ZIPファイルを作成中..." -ForegroundColor Yellow

if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

Compress-Archive -Path "$targetDir\*" -DestinationPath $zipFile -Force

Write-Host "✅ ZIPファイルの作成完了" -ForegroundColor Green
Write-Host ""

# ファイルサイズを表示
$size = (Get-Item $zipFile).Length / 1MB
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "完了！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "作成されたファイル:" -ForegroundColor Yellow
Write-Host "  $zipFile" -ForegroundColor White
Write-Host "  サイズ: $([math]::Round($size, 2)) MB" -ForegroundColor White
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "  1. ZIPファイルを解凍" -ForegroundColor White
Write-Host "  2. GitHubで新規リポジトリ作成" -ForegroundColor White
Write-Host "     https://github.com/new" -ForegroundColor Cyan
Write-Host "  3. 解凍したファイルをアップロード" -ForegroundColor White
Write-Host "  4. Codespacesを起動" -ForegroundColor White
Write-Host ""

# エクスプローラーで開く
Start-Process explorer.exe -ArgumentList "/select,$zipFile"
