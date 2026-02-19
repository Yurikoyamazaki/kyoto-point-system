import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth';
import { pointRouter } from './routes/point';
import { merchantRouter } from './routes/merchant';
import { adminRouter } from './routes/admin';
import { pointExchangeRouter } from './routes/pointExchange';
import { errorHandler } from './middleware/errorHandler';
import { auditLogger } from './middleware/auditLogger';

const app = express();
const PORT = process.env.PORT || 3000;

// セキュリティミドルウェア
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [],
  credentials: true
}));

// レート制限
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json());
app.use(auditLogger);

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ルーティング
app.use('/api/auth', authRouter);
app.use('/api/points', pointRouter);
app.use('/api/merchants', merchantRouter);
app.use('/api/admin', adminRouter);
app.use('/api/exchange', pointExchangeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
