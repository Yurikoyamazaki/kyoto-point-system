import { Router } from 'express';
import { authenticateMerchant } from '../middleware/auth';
import { generateMerchantQR } from '../services/qrService';
import { getMerchantTransactions, getMerchantPayments } from '../services/merchantService';

export const merchantRouter = Router();

// QRコード生成
merchantRouter.post('/qr/generate', authenticateMerchant, async (req, res, next) => {
  try {
    const merchantId = req.merchant.id;
    const { amount } = req.body;
    
    const qrCode = await generateMerchantQR(merchantId, amount);
    
    res.json({ qrCode, qrImage: qrCode.image });
  } catch (error) {
    next(error);
  }
});

// 取引履歴取得
merchantRouter.get('/transactions', authenticateMerchant, async (req, res, next) => {
  try {
    const merchantId = req.merchant.id;
    const transactions = await getMerchantTransactions(merchantId);
    res.json({ transactions });
  } catch (error) {
    next(error);
  }
});

// 支払履歴取得
merchantRouter.get('/payments', authenticateMerchant, async (req, res, next) => {
  try {
    const merchantId = req.merchant.id;
    const payments = await getMerchantPayments(merchantId);
    res.json({ payments });
  } catch (error) {
    next(error);
  }
});
