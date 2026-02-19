// ポイント管理サービス

export async function getPointBalance(userId: string): Promise<number> {
  // DB実装
  return 5000;
}

export async function grantPoints(params: {
  userId: string;
  amount: number;
  reason: string;
  adminId: string;
}): Promise<any> {
  // ポイント付与実装
  return { success: true };
}

export async function bulkGrantPoints(params: {
  userIds: string[];
  amount: number;
  reason: string;
  adminId: string;
}): Promise<any> {
  // 一括ポイント付与実装
  return { success: true, count: params.userIds.length };
}

export async function usePoints(params: {
  userId: string;
  merchantId: string;
  amount: number;
}): Promise<any> {
  // ポイント使用実装
  // 重複使用防止チェック
  return {
    id: 'tx_' + Date.now(),
    remainingBalance: 4500
  };
}

export async function addPoints(userId: string, amount: number): Promise<void> {
  // ポイント追加実装
}

export async function getPointHistory(userId: string): Promise<any[]> {
  // ポイント履歴取得実装
  return [];
}
