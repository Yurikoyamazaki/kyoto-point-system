// 外部アカウント連携サービス

interface ExternalAccount {
  id: string;
  userId: string;
  partnerId: string;
  externalAccountId: string;
  externalAccountName: string;
  verified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
}

export async function linkExternalAccount(
  userId: string,
  partnerId: string,
  externalAccountId: string
): Promise<ExternalAccount> {
  // 外部APIで本人確認
  const verified = await verifyExternalAccount(partnerId, externalAccountId);
  
  if (!verified) {
    throw new Error('外部アカウントの確認に失敗しました');
  }
  
  // DB保存
  const account: ExternalAccount = {
    id: 'acc_' + Date.now(),
    userId,
    partnerId,
    externalAccountId,
    externalAccountName: externalAccountId,
    verified: true,
    verifiedAt: new Date(),
    createdAt: new Date()
  };
  
  return account;
}

export async function getLinkedAccounts(userId: string): Promise<ExternalAccount[]> {
  // DB実装
  return [];
}

export async function unlinkExternalAccount(
  userId: string,
  accountId: string
): Promise<void> {
  // DB実装
}

async function verifyExternalAccount(
  partnerId: string,
  externalAccountId: string
): Promise<boolean> {
  // 各パートナーのAPIで本人確認
  // 実装例: OAuth認証、SMS認証など
  return true;
}
