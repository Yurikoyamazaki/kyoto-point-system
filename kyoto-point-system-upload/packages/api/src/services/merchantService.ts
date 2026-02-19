// 加盟店管理サービス

export async function registerMerchant(merchantData: any): Promise<any> {
  // 加盟店登録実装
  return { id: 'merchant_' + Date.now(), ...merchantData };
}

export async function getMerchants(): Promise<any[]> {
  // 加盟店一覧取得
  return [];
}

export async function importMerchants(merchants: any[]): Promise<any> {
  // 加盟店一括インポート
  return { success: true, count: merchants.length };
}

export async function getMerchantTransactions(merchantId: string): Promise<any[]> {
  // 加盟店の取引履歴取得
  return [];
}

export async function getMerchantPayments(merchantId: string): Promise<any[]> {
  // 加盟店への支払履歴取得
  return [];
}
