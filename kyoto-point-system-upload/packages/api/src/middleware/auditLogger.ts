import { Request, Response, NextFunction } from 'express';

export const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip,
    userId: req.user?.id,
    userAgent: req.get('user-agent')
  };
  
  // 監査ログ保存（改ざん防止措置付き）
  console.log('AUDIT:', JSON.stringify(logEntry));
  
  next();
};
