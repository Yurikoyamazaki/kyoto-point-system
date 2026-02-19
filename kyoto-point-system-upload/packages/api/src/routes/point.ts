import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getPointBalance, addPoints, usePoints, getPointHistory } from '../services/pointService';
import { verifyQRCode } from '../services/qrService';

export const pointRouter = Router();

// ポイント残高取得
pointRouter.get('/balance', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const balance = await getPointBalance(userId);
    res.json({ balance });
  } catch (error) {
    next(error);
  }
});

// ポイント使用（QRコード読み取り）
pointRouter.post('/use', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { qrCode, amount } = req.body;
    
    // QRコード検証
    const merchantInfo = await verifyQRCode(qrCode);
    
    // ポイント使用
    const transaction = await usePoints({
      userId,
      merchantId: merchantInfo.merchantId,
      amount
    });
    
    // 加盟店へ通知
    // await notifyMerchant(merchantInfo.email, transaction);
    
    res.json({
      success: true,
      transactionId: transaction.id,
      remainingBalance: transaction.remainingBalance
    });
  } catch (error) {
    next(error);
  }
});

// ポイント履歴取得
pointRouter.get('/history', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await getPointHistory(userId);
    res.json({ history });
  } catch (error) {
    next(error);
  }
});
