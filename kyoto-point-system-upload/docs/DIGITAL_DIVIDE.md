# デジタルデバイド対策

## 概要
スマートフォンを保有していない市民へのポイント給付方法

## 対策案

### 1. 親のスマホへの付与
子どもや高齢者のポイントを、親や家族のスマートフォンに付与

**実装方法**
- 家族アカウント連携機能
- マイナンバーカードで本人確認後、代理登録
- 複数人のポイントを1つのアプリで管理

**データベース設計**
```sql
CREATE TABLE family_accounts (
  id UUID PRIMARY KEY,
  proxy_user_id UUID REFERENCES users(id),
  beneficiary_card_id VARCHAR(255),
  beneficiary_name VARCHAR(255),
  relationship VARCHAR(50),
  created_at TIMESTAMP
);
```

### 2. 5,000円相当の品物給付
物品での給付（事務局が別途対応）

**システム対応**
- 物品給付選択者の記録
- 配送状況管理
- 給付完了フラグ

### 3. デジタルカード発行
物理的なカードでポイント利用

**実装方法**
- カード番号発行
- 加盟店での手入力またはバーコード読取
- ポイント残高照会（電話・窓口）

**データベース設計**
```sql
CREATE TABLE physical_cards (
  card_number VARCHAR(20) PRIMARY KEY,
  user_card_id VARCHAR(255) UNIQUE,
  issued_at TIMESTAMP,
  status VARCHAR(20)
);
```

## 一元管理

### 管理画面機能
- スマホ利用者と非利用者の統合管理
- 給付方法別の統計
- 利用状況の可視化

### データ統合
```typescript
interface User {
  id: string;
  cardId: string;
  name: string;
  accessMethod: 'smartphone' | 'physical_card' | 'proxy' | 'goods';
  proxyUserId?: string;
  physicalCardNumber?: string;
}
```

## 窓口対応

### 区役所等支援窓口
- マイナンバーカード認証支援
- デジタルカード発行
- 操作説明

### システム連携
- 窓口端末からの登録
- リアルタイム重複チェック
- 即時カード発行
