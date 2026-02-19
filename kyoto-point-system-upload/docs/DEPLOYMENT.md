# デプロイメントガイド

## 前提条件
- AWS アカウント
- Docker
- Node.js 20+
- PostgreSQL 15+

## 環境構築

### 1. データベースセットアップ
```bash
# RDS PostgreSQL作成
aws rds create-db-instance \
  --db-instance-identifier kyoto-point-db \
  --db-instance-class db.r6g.xlarge \
  --engine postgres \
  --engine-version 15.4 \
  --master-username admin \
  --master-user-password [PASSWORD] \
  --allocated-storage 100 \
  --multi-az \
  --backup-retention-period 7

# スキーマ適用
psql -h [RDS_ENDPOINT] -U admin -d kyoto_point -f packages/api/src/db/schema.sql
```

### 2. コンテナイメージビルド
```bash
# ECRリポジトリ作成
aws ecr create-repository --repository-name kyoto-point-api

# イメージビルド
docker build -t kyoto-point-api packages/api

# プッシュ
aws ecr get-login-password | docker login --username AWS --password-stdin [ECR_URL]
docker tag kyoto-point-api:latest [ECR_URL]/kyoto-point-api:latest
docker push [ECR_URL]/kyoto-point-api:latest
```

### 3. ECSクラスター作成
```bash
# クラスター作成
aws ecs create-cluster --cluster-name kyoto-point-cluster

# タスク定義登録
aws ecs register-task-definition --cli-input-json file://infrastructure/aws/ecs-task-definition.json

# サービス作成
aws ecs create-service \
  --cluster kyoto-point-cluster \
  --service-name kyoto-point-api \
  --task-definition kyoto-point-api \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}"
```

### 4. Auto Scaling設定
```bash
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --resource-id service/kyoto-point-cluster/kyoto-point-api \
  --scalable-dimension ecs:service:DesiredCount \
  --min-capacity 2 \
  --max-capacity 100
```

## 運用開始前チェックリスト

- [ ] データベース接続確認
- [ ] J-LIS連携テスト
- [ ] 負荷テスト（14.3万同時接続）
- [ ] 脆弱性診断実施
- [ ] バックアップ動作確認
- [ ] 監視アラート設定
- [ ] 障害対応手順書作成
- [ ] 運用マニュアル作成
- [ ] セキュリティレビュー完了

## 監視設定

### CloudWatch Alarms
- CPU使用率 > 80%
- メモリ使用率 > 80%
- エラー率 > 1%
- レスポンスタイム > 2秒
- データベース接続数 > 80%

## バックアップ

### 自動バックアップ
- RDS: 日次自動バックアップ（保持期間7日）
- S3: バージョニング有効化
- 監査ログ: S3 Glacier移行（2年保管）

### 災害復旧
- RTO: 1時間
- RPO: 5分
- Multi-AZ構成
