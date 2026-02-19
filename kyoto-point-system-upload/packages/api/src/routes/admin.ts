import { Router } from 'express';
import { authenticateAdmin, requireMFA } from '../middleware/auth';
import { grantPoints, bulkGrantPoints } from '../services/pointService';
import { registerMerchant, getMerchants, importMerchants } from '../services/merchantService';
import { generateBankTransferData } from '../services/paymentService';
import { getStatistics } from '../services/analyticsService';

export const adminRouter = Router();

// 多要素認証必須
adminRouter.use(authenticateAdmin);
adminRouter.use(requireMFA);

// ポイント付与
adminRouter.post('/points/grant', async (req, res, next) => {
  try {
    const { userId, amount, reason } = req.body;
    const adminId = req.admin.id;
    
    const result = await grantPoints({ userId, amount, reason, adminId });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 一括ポイント付与
adminRouter.post('/points/bulk-grant', async (req, res, next) => {
  try {
    const { userIds, amount, reason } = req.body;
    const adminId = req.admin.id;
    
    const result = await bulkGrantPoints({ userIds, amount, reason, adminId });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 加盟店登録
adminRouter.post('/merchants/register', async (req, res, next) => {
  try {
    const merchantData = req.body;
    const merchant = await registerMerchant(merchantData);
    res.json(merchant);
  } catch (error) {
    next(error);
  }
});

// 加盟店一括インポート
adminRouter.post('/merchants/import', async (req, res, next) => {
  try {
    const { merchants } = req.body;
    const result = await importMerchants(merchants);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 全銀協フォーマット振込データ生成
adminRouter.post('/payments/generate-transfer', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;
    const transferData = await generateBankTransferData(startDate, endDate);
    res.json({ transferData });
  } catch (error) {
    next(error);
  }
});

// 統計データ取得
adminRouter.get('/statistics', async (req, res, next) => {
  try {
    const stats = await getStatistics();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});
