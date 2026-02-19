// 交換制限管理サービス（不正利用防止）

interface ExchangeLimit {
  userId: string;
  partnerId: string;
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
  lastResetDate: Date;
}

const DEFAULT_DAILY_LIMIT = 10000; // 1日10,000ポイントまで
const DEFAULT_MONTHLY_LIMIT = 50000; // 1ヶ月50,000ポイントまで

export async function checkExchangeLimit(
  userId: string,
  partnerId: string,
  amount: number
): Promise<{ allowed: boolean; reason?: string }> {
  // DB実装
  const limit: ExchangeLimit = {
    userId,
    partnerId,
    dailyLimit: DEFAULT_DAILY_LIMIT,
    monthlyLimit: DEFAULT_MONTHLY_LIMIT,
    dailyUsed: 0,
    monthlyUsed: 0,
    lastResetDate: new Date()
  };
  
  // 日次リセットチェック
  const today = new Date().toDateString();
  const lastReset = limit.lastResetDate.toDateString();
  
  if (today !== lastReset) {
    limit.dailyUsed = 0;
    limit.lastResetDate = new Date();
  }
  
  // 月次リセットチェック
  const currentMonth = new Date().getMonth();
  const lastResetMonth = limit.lastResetDate.getMonth();
  
  if (currentMonth !== lastResetMonth) {
    limit.monthlyUsed = 0;
  }
  
  // 制限チェック
  if (limit.dailyUsed + amount > limit.dailyLimit) {
    return {
      allowed: false,
      reason: `1日の交換上限（${limit.dailyLimit}ポイント）を超えています`
    };
  }
  
  if (limit.monthlyUsed + amount > limit.monthlyLimit) {
    return {
      allowed: false,
      reason: `1ヶ月の交換上限（${limit.monthlyLimit}ポイント）を超えています`
    };
  }
  
  return { allowed: true };
}

export async function updateExchangeLimit(
  userId: string,
  partnerId: string,
  amount: number
): Promise<void> {
  // DB実装: 使用量を更新
}

export async function getExchangeLimit(
  userId: string,
  partnerId: string
): Promise<ExchangeLimit> {
  // DB実装
  return {
    userId,
    partnerId,
    dailyLimit: DEFAULT_DAILY_LIMIT,
    monthlyLimit: DEFAULT_MONTHLY_LIMIT,
    dailyUsed: 0,
    monthlyUsed: 0,
    lastResetDate: new Date()
  };
}
