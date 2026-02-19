import { Router } from 'express';
import { verifyMyNumberCard, checkDuplicate } from '../services/mynumberAuth';
import { createUser, getUserByCardId } from '../services/userService';

export const authRouter = Router();

// マイナンバーカード認証
authRouter.post('/mynumber/verify', async (req, res, next) => {
  try {
    const { certificate, signature, certificateType } = req.body;
    
    // J-LISへの証明書有効性確認
    const cardInfo = await verifyMyNumberCard(certificate, signature, certificateType);
    
    // 重複チェック
    const isDuplicate = await checkDuplicate(cardInfo.cardId);
    if (isDuplicate) {
      return res.status(409).json({ error: '既に登録済みです' });
    }
    
    // 基本4情報取得（氏名、住所、生年月日、性別）
    const { name, address, birthDate, gender } = cardInfo;
    
    // ユーザー登録
    const user = await createUser({
      cardId: cardInfo.cardId,
      name,
      address,
      birthDate,
      gender
    });
    
    res.json({ userId: user.id, message: '認証成功' });
  } catch (error) {
    next(error);
  }
});

// ログイン
authRouter.post('/login', async (req, res, next) => {
  try {
    const { certificate, signature } = req.body;
    
    const cardInfo = await verifyMyNumberCard(certificate, signature, 'user');
    const user = await getUserByCardId(cardInfo.cardId);
    
    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }
    
    // JWTトークン発行
    const token = generateToken(user.id);
    
    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (error) {
    next(error);
  }
});

function generateToken(userId: string): string {
  // JWT実装
  return 'token';
}
