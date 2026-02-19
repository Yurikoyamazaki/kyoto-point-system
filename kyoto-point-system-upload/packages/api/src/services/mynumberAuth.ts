// マイナンバーカード認証サービス

interface CardInfo {
  cardId: string;
  name: string;
  address: string;
  birthDate: string;
  gender: string;
}

export async function verifyMyNumberCard(
  certificate: string,
  signature: string,
  certificateType: 'sign' | 'user'
): Promise<CardInfo> {
  // J-LISへの証明書有効性確認
  // 実装: 署名用電子証明書または利用者証明用電子証明書の検証
  
  // ICチップから基本4情報取得
  // 注意: 個人番号（マイナンバー）は取得しない
  
  return {
    cardId: 'card_' + Date.now(),
    name: '山田太郎',
    address: '京都市中京区',
    birthDate: '1990-01-01',
    gender: '男性'
  };
}

export async function checkDuplicate(cardId: string): Promise<boolean> {
  // 重複チェック実装
  return false;
}
