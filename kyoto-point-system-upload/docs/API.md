# API仕様書

## 認証エンドポイント

### POST /api/auth/mynumber/verify
マイナンバーカード認証

**リクエスト**
```json
{
  "certificate": "base64_encoded_certificate",
  "signature": "base64_encoded_signature",
  "certificateType": "sign" | "user"
}
```

**レスポンス**
```json
{
  "userId": "uuid",
  "message": "認証成功"
}
```

## ポイントエンドポイント

### GET /api/points/balance
ポイント残高取得

**ヘッダー**
```
Authorization: Bearer {token}
```

**レスポンス**
```json
{
  "balance": 5000
}
```

### POST /api/points/use
ポイント使用

**リクエスト**
```json
{
  "qrCode": "qr_data",
  "amount": 1000
}
```

**レスポンス**
```json
{
  "success": true,
  "transactionId": "uuid",
  "remainingBalance": 4000
}
```

## 管理者エンドポイント

### POST /api/admin/points/grant
ポイント付与（多要素認証必須）

**リクエスト**
```json
{
  "userId": "uuid",
  "amount": 5000,
  "reason": "初回登録"
}
```

### POST /api/admin/payments/generate-transfer
全銀協フォーマット振込データ生成

**リクエスト**
```json
{
  "startDate": "2026-08-01",
  "endDate": "2026-08-31"
}
```

**レスポンス**
```json
{
  "transferData": "全銀協フォーマットデータ"
}
```

## エラーレスポンス

```json
{
  "error": "エラーメッセージ",
  "code": "ERROR_CODE"
}
```

### エラーコード
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (重複登録)
- 429: Too Many Requests
- 500: Internal Server Error
