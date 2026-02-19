# クリーンなプロジェクトフォルダ作成スクリプト

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "クリーンなプロジェクトフォルダ作成" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$sourceDir = Get-Location
$targetDir = "C:\kyoto-point-system-clean"

# 既存のターゲットディレクトリを削除
if (Test-Path $targetDir) {
    Write-Host "既存のフォルダを削除中..." -ForegroundColor Yellow
    Remove-Item $targetDir -Recurse -Force
}

# ターゲットディレクトリを作成
New-Item -ItemType Directory -Path $targetDir | Out-Null

Write-Host "1. 必要なファイルをコピー中..." -ForegroundColor Yellow
Write-Host ""

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
        Write-Host "  ✓ $folder" -ForegroundColor Green
        Copy-Item $source -Destination $targetDir -Recurse -Force
    } else {
        Write-Host "  ✗ $folder (見つかりません)" -ForegroundColor Red
    }
}

Write-Host ""

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
        Write-Host "  ✓ $file" -ForegroundColor Green
        Copy-Item $source -Destination $targetDir -Force
    } else {
        Write-Host "  ✗ $file (見つかりません)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. 不要なファイルを削除中..." -ForegroundColor Yellow

# node_modulesを削除
Get-ChildItem -Path $targetDir -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        Write-Host "  - node_modules を削除" -ForegroundColor Gray
        Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }

# distを削除
Get-ChildItem -Path $targetDir -Recurse -Directory -Filter "dist" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        Write-Host "  - dist を削除" -ForegroundColor Gray
        Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
    }

# .envを削除（.env.exampleは残す）
Get-ChildItem -Path $targetDir -Recurse -File -Filter ".env" -ErrorAction SilentlyContinue | 
    Where-Object { $_.Name -eq ".env" } |
    ForEach-Object {
        Write-Host "  - .env を削除" -ForegroundColor Gray
        Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    }

# ログファイルを削除
Get-ChildItem -Path $targetDir -Recurse -File -Filter "*.log" -ErrorAction SilentlyContinue | 
    ForEach-Object {
        Write-Host "  - $($_.Name) を削除" -ForegroundColor Gray
        Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
    }

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "完了！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "クリーンなプロジェクトが作成されました:" -ForegroundColor Yellow
Write-Host "  $targetDir" -ForegroundColor White
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "  1. GitHubで新規リポジトリ作成" -ForegroundColor White
Write-Host "     https://github.com/new" -ForegroundColor Cyan
Write-Host "  2. 以下のフォルダの内容をアップロード" -ForegroundColor White
Write-Host "     $targetDir" -ForegroundColor Cyan
Write-Host "  3. Codespacesを起動" -ForegroundColor White
Write-Host "     Code → Codespaces → Create codespace" -ForegroundColor Cyan
Write-Host ""

# エクスプローラーで開く
Start-Process explorer.exe -ArgumentList $targetDir
