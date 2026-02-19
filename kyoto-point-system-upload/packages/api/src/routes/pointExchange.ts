import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { 
  getExchangePartners, 
  getExchangeRates,
  initiateExchange,
  getExchangeHistory,
  getExchangeStatus
} from '../services/pointExchangeService';

export const pointExchangeRouter = Router();

// 交換可能なポイントパートナー一覧取得
pointExchangeRouter.get('/partners', authenticate, async (req, res, next) => {
  try {
    const partners = await getExchangePartners();
    res.json({ partners });
  } catch (error) {
    next(error);
  }
});

// 交換レート取得
pointExchangeRouter.get('/rates', authenticate, async (req, res, next) => {
  try {
    const { partnerId } = req.query;
    const rates = await getExchangeRates(partnerId as string);
    res.json({ rates });
  } catch (error) {
    next(error);
  }
});

// ポイント交換申請
pointExchangeRouter.post('/exchange', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { partnerId, direction, amount, externalAccountId } = req.body;
    
    // direction: 'to_external' (京都ポイント→他社) or 'from_external' (他社→京都ポイント)
    const exchange = await initiateExchange({
      userId,
      partnerId,
      direction,
      amount,
      externalAccountId
    });
    
    res.json({
      success: true,
      exchangeId: exchange.id,
      status: exchange.status,
      estimatedCompletion: exchange.estimatedCompletion
    });
  } catch (error) {
    next(error);
  }
});

// 交換履歴取得
pointExchangeRouter.get('/history', authenticate, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await getExchangeHistory(userId);
    res.json({ history });
  } catch (error) {
    next(error);
  }
});

// 交換ステータス確認
pointExchangeRouter.get('/status/:exchangeId', authenticate, async (req, res, next) => {
  try {
    const { exchangeId } = req.params;
    const userId = req.user.id;
    
    const status = await getExchangeStatus(exchangeId, userId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});
