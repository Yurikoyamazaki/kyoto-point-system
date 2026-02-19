# システムアーキテクチャ

## 概要
京都市デジタルポイント給付システムは、AWS上に構築された高可用性・高セキュリティのクラウドネイティブアプリケーションです。

## インフラ構成

### フロントエンド
- モバイルアプリ: React Native (iOS/Android)
- 管理画面: React + TypeScript
- 配信: CloudFront + S3

### バックエンド
- API: Node.js + Express (ECS Fargate)
- データベース: Amazon RDS (PostgreSQL) Multi-AZ
- キャッシュ: Amazon ElastiCache (Redis)
- ファイルストレージ: Amazon S3

### セキュリティ
- WAF: AWS WAF
- DDoS対策: AWS Shield
- 証明書: AWS Certificate Manager
- シークレット管理: AWS Secrets Manager
- 監査ログ: CloudWatch Logs + S3 (改ざん防止)

### スケーリング
- Auto Scaling: ECS Service Auto Scaling
- 同時接続数: 最大14.3万人対応
- RDS: Read Replica構成

## データフロー

1. ユーザー認証
   - マイナンバーカード → J-LIS → API → DB

2. ポイント使用
   - アプリ → QRコード読取 → API → 加盟店検証 → ポイント減算 → 通知

3. 管理者操作
   - 管理画面 → MFA認証 → API → 操作実行 → 監査ログ

## セキュリティ対策

### 通信暗号化
- TLS 1.2以上
- 証明書ピンニング（モバイルアプリ）

### 認証・認可
- JWT (Access Token + Refresh Token)
- 多要素認証（管理者）
- マイナンバーカード電子証明書

### データ保護
- 暗号化: at-rest (RDS/S3), in-transit (TLS)
- バックアップ: 日次自動バックアップ
- 個人番号: 取得・保存しない

### 脆弱性対策
- OWASP Top 10対応
- 第三者脆弱性診断（開発完了時・機能追加時）
- 定期的なセキュリティパッチ適用

## 監視・運用

### モニタリング
- CloudWatch メトリクス
- X-Ray トレーシング
- CloudWatch Alarms

### ログ管理
- アプリケーションログ
- アクセスログ
- 監査ログ（改ざん防止）

### 障害対応
- 24時間365日監視
- 自動復旧機能
- インシデント対応手順書
