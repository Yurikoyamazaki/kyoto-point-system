#!/usr/bin/env node

// セットアップチェックスクリプト

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=========================================');
console.log('京都市ポイント給付アプリ - 環境チェック');
console.log('=========================================\n');

let hasErrors = false;

// Node.jsバージョンチェック
console.log('1. Node.jsバージョン確認...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion >= 20) {
  console.log(`✅ Node.js ${nodeVersion}`);
} else {
  console.log(`❌ Node.js 20.x以上が必要です（現在: ${nodeVersion}）`);
  hasErrors = true;
}
console.log('');

// npmバージョンチェック
console.log('2. npmバージョン確認...');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm ${npmVersion}`);
} catch (error) {
  console.log('❌ npmが見つかりません');
  hasErrors = true;
}
console.log('');

// .envファイルチェック
console.log('3. 環境変数ファイル確認...');
if (fs.existsSync('.env')) {
  console.log('✅ .envファイルが存在します');
} else {
  console.log('⚠️  .envファイルが見つかりません');
  console.log('   .env.exampleをコピーして.envを作成してください');
  console.log('   コマンド: copy .env.example .env (Windows)');
}
console.log('');

// PostgreSQLチェック
console.log('4. PostgreSQL確認...');
try {
  execSync('psql --version', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ PostgreSQLクライアントが見つかりました');
} catch (error) {
  console.log('⚠️  PostgreSQLクライアントが見つかりません（オプション）');
  console.log('   Dockerを使用する場合は不要です');
}
console.log('');

// Dockerチェック
console.log('5. Docker確認...');
try {
  execSync('docker --version', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ Dockerが見つかりました');
  console.log('   推奨: docker-compose up -d で起動');
} catch (error) {
  console.log('⚠️  Dockerが見つかりません（オプション）');
  console.log('   手動でPostgreSQLをセットアップしてください');
}
console.log('');

// node_modulesチェック
console.log('6. 依存関係確認...');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modulesが存在します');
} else {
  console.log('⚠️  依存関係がインストールされていません');
  console.log('   コマンド: npm install');
}
console.log('');

// 結果サマリー
console.log('=========================================');
if (hasErrors) {
  console.log('❌ エラーがあります。上記を確認してください。');
  process.exit(1);
} else {
  console.log('✅ 環境チェック完了！');
  console.log('');
  console.log('次のステップ:');
  console.log('  1. npm install          # 依存関係インストール');
  console.log('  2. npm run build        # ビルド');
  console.log('  3. docker-compose up -d # Docker起動（推奨）');
  console.log('     または');
  console.log('     npm run dev:api      # 開発サーバー起動');
}
console.log('=========================================\n');
