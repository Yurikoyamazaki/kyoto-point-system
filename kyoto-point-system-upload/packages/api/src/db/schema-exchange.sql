-- ポイント交換パートナーテーブル
CREATE TABLE exchange_partners (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  min_exchange_amount INTEGER NOT NULL,
  max_exchange_amount INTEGER NOT NULL,
  processing_time VARCHAR(50),
  api_endpoint VARCHAR(255),
  api_key_encrypted TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 交換レートテーブル
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id VARCHAR(50) REFERENCES exchange_partners(id),
  kyoto_to_external DECIMAL(10, 4) NOT NULL,
  external_to_kyoto DECIMAL(10, 4) NOT NULL,
  fee_percentage DECIMAL(5, 2) DEFAULT 0,
  effective_from TIMESTAMP NOT NULL,
  effective_to TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_partner_effective (partner_id, effective_from, effective_to)
);

-- ポイント交換履歴テーブル
CREATE TABLE point_exchanges (
  id VARCHAR(50) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  partner_id VARCHAR(50) NOT NULL REFERENCES exchange_partners(id),
  direction VARCHAR(20) NOT NULL, -- 'to_external' or 'from_external'
  kyoto_amount INTEGER NOT NULL,
  external_amount INTEGER NOT NULL,
  exchange_rate DECIMAL(10, 4) NOT NULL,
  fee_amount INTEGER DEFAULT 0,
  external_account_id VARCHAR(255),
  external_transaction_id VARCHAR(255),
  status VARCHAR(20) NOT NULL, -- 'pending', 'processing', 'completed', 'failed', 'cancelled'
  error_message TEXT,
  estimated_completion TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_partner_id (partner_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- ユーザー外部アカウント連携テーブル
CREATE TABLE user_external_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  partner_id VARCHAR(50) NOT NULL REFERENCES exchange_partners(id),
  external_account_id VARCHAR(255) NOT NULL,
  external_account_name VARCHAR(255),
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, partner_id, external_account_id),
  INDEX idx_user_partner (user_id, partner_id)
);

-- 交換制限テーブル（不正利用防止）
CREATE TABLE exchange_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  partner_id VARCHAR(50) NOT NULL REFERENCES exchange_partners(id),
  daily_limit INTEGER NOT NULL,
  monthly_limit INTEGER NOT NULL,
  daily_used INTEGER DEFAULT 0,
  monthly_used INTEGER DEFAULT 0,
  last_reset_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, partner_id)
);

-- 初期データ投入
INSERT INTO exchange_partners (id, name, logo_url, description, enabled, min_exchange_amount, max_exchange_amount, processing_time) VALUES
('rakuten', '楽天ポイント', '/logos/rakuten.png', '楽天グループで使える共通ポイント', true, 100, 10000, '即時'),
('t-point', 'Tポイント', '/logos/tpoint.png', 'TSUTAYAやファミリーマートで使えるポイント', true, 100, 10000, '1-3営業日'),
('d-point', 'dポイント', '/logos/dpoint.png', 'ドコモのポイントサービス', true, 100, 10000, '即時'),
('ponta', 'Pontaポイント', '/logos/ponta.png', 'ローソンやリクルートで使えるポイント', true, 100, 10000, '1-3営業日'),
('nanaco', 'nanacoポイント', '/logos/nanaco.png', 'セブン-イレブンで使える電子マネー', true, 100, 10000, '即時'),
('waon', 'WAONポイント', '/logos/waon.png', 'イオングループで使える電子マネー', true, 100, 10000, '即時');

-- 初期レート設定（1:1交換）
INSERT INTO exchange_rates (partner_id, kyoto_to_external, external_to_kyoto, fee_percentage, effective_from) VALUES
('rakuten', 1.0, 1.0, 0, CURRENT_TIMESTAMP),
('t-point', 1.0, 1.0, 0, CURRENT_TIMESTAMP),
('d-point', 1.0, 1.0, 0, CURRENT_TIMESTAMP),
('ponta', 1.0, 1.0, 0, CURRENT_TIMESTAMP),
('nanaco', 1.0, 1.0, 0, CURRENT_TIMESTAMP),
('waon', 1.0, 1.0, 0, CURRENT_TIMESTAMP);
