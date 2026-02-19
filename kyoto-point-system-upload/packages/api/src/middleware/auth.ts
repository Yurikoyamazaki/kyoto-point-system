import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // JWT検証実装
  next();
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  // 管理者JWT検証実装
  next();
};

export const authenticateMerchant = (req: Request, res: Response, next: NextFunction) => {
  // 加盟店JWT検証実装
  next();
};

export const requireMFA = (req: Request, res: Response, next: NextFunction) => {
  // 多要素認証チェック
  next();
};
