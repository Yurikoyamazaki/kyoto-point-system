# ポイント交換API仕様

## エンドポイント

### GET /api/exchange/partners
交換可能なポイントパートナー一覧取得

**レスポンス**
```json
{
  "partners": [
    {
      "id": "rakuten",
      "name": "楽天ポイント",
      "logo": "/logos/rakuten.png",
      "description": "楽天グループで使える共通ポイント",
      "enabled": true,
      "minExchangeAmount": 100,
      "maxExchangeAmount": 10000,
      "processingTime": "即時"
    }
  ]
}
```

### GET /api/exchange/rates
交換レート取得

**クエリパラメータ**
- partnerId (optional): 特定パートナーのレートのみ取得

**レスポンス**
```json
{
  "rates": [
    {
      "partnerId": "rakuten",
      "partnerName": "楽天ポイント",
      "kyotoToExternal": 1.0,
      "externalToKyoto": 1.0,
      "fee": 0,
      "updatedAt": "2026-02-19T10:00:00Z"
    }
  ]
}
```

### POST /api/exchange/exchange
ポイント交換申請

**リクエスト**
```json
{
  "partnerId": "rakuten",
  "direction": "to_external",
  "amount": 1000,
  "externalAccountId": "rakuten_user_123"
}
```

**direction**
- `to_external`: 京都ポイント → 他社ポイント
- `from_external`: 他社ポイント → 京都ポイント

**レスポンス**
```json
{
  "success": true,
  "exchangeId": "ex_1234567890",
  "status": "completed",
  "estimatedCompletion": "2026-02-19T10:00:00Z"
}
```

### GET /api/exchange/history
交換履歴取得

**レスポンス**
```json
{
  "history": [
    {
      "id": "ex_1234567890",
      "partnerId": "rakuten",
      "partnerName": "楽天ポイント",
      "direction": "to_external",
      "amount": 1000,
      "status": "completed",
      "createdAt": "2026-02-19T10:00:00Z",
      "completedAt": "2026-02-19T10:00:05Z"
    }
  ]
}
```

### GET /api/exchange/status/:exchangeId
交換ステータス確認

**レスポンス**
```json
{
  "exchangeId": "ex_1234567890",
  "status": "completed",
  "completedAt": "2026-02-19T10:00:05Z"
}
```

## ステータス

- `pending`: 申請受付
- `processing`: 処理中
- `completed`: 完了
- `failed`: 失敗
- `cancelled`: キャンセル
