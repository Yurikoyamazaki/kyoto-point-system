// ユーザー管理サービス

interface UserData {
  cardId: string;
  name: string;
  address: string;
  birthDate: string;
  gender: string;
}

export async function createUser(userData: UserData): Promise<any> {
  // ユーザー登録実装
  // 初回登録時に5,000ポイント付与
  
  return {
    id: 'user_' + Date.now(),
    ...userData,
    points: 5000
  };
}

export async function getUserByCardId(cardId: string): Promise<any> {
  // カードIDでユーザー取得
  return null;
}
