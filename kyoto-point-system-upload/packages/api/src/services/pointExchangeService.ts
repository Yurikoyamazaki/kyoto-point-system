// ポイント交換サービス

interface ExchangePartner {
  id: string;
  name: string;
  logo: string;
  description: string;
  enabled: boolean;
  minExchangeAmount: number;
  maxExchangeAmount: number;
  processingTime: string; // "即時" or "1-3営業日"
}

interface ExchangeRate {
  partnerId: string;
  partnerName: string;
  kyotoToExternal: number; // 京都ポイント→他社ポイントのレート
  externalToKyoto: number; // 他社ポイント→京都ポイントのレート
  fee: number; // 手数料（%）
  updatedAt: Date;
}

interface ExchangeRequest {
  userId: string;
  partnerId: string;
  direction: 'to_external' | 'from_external';
  amount: number;
  externalAccountId: string;
}

// 交換可能なパートナー一覧
const EXCHANGE_PARTNERS: ExchangePartner[] = [
  {
    id: 'rakuten',
    name: '楽天ポイント',
    logo: '/logos/rakuten.png',
    description: '楽天グループで使える共通ポイント',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 't-point',
    name: 'Tポイント',
    logo: '/logos/tpoint.png',
    description: 'TSUTAYAやファミリーマートで使えるポイント',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '1-3営業日'
  },
  {
    id: 'd-point',
    name: 'dポイント',
    logo: '/logos/dpoint.png',
    description: 'ドコモのポイントサービス',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 'ponta',
    name: 'Pontaポイント',
    logo: '/logos/ponta.png',
    description: 'ローソンやリクルートで使えるポイント',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '1-3営業日'
  },
  {
    id: 'nanaco',
    name: 'nanacoポイント',
    logo: '/logos/nanaco.png',
    description: 'セブン-イレブンで使える電子マネー',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 'waon',
    name: 'WAONポイント',
    logo: '/logos/waon.png',
    description: 'イオングループで使える電子マネー',
    enabled: true,
    minExchangeAmount: 100,
    maxExchangeAmount: 10000,
    processingTime: '即時'
  }
];

export async function getExchangePartners(): Promise<ExchangePartner[]> {
  // 有効なパートナーのみ返す
  return EXCHANGE_PARTNERS.filter(p => p.enabled);
}

export async function getExchangeRates(partnerId?: string): Promise<ExchangeRate[]> {
  // 実際のレートはDB or 外部APIから取得
  const rates: ExchangeRate[] = [
    {
      partnerId: 'rakuten',
      partnerName: '楽天ポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    },
    {
      partnerId: 't-point',
      partnerName: 'Tポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    },
    {
      partnerId: 'd-point',
      partnerName: 'dポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    },
    {
      partnerId: 'ponta',
      partnerName: 'Pontaポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    },
    {
      partnerId: 'nanaco',
      partnerName: 'nanacoポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    },
    {
      partnerId: 'waon',
      partnerName: 'WAONポイント',
      kyotoToExternal: 1.0,
      externalToKyoto: 1.0,
      fee: 0,
      updatedAt: new Date()
    }
  ];
  
  if (partnerId) {
    return rates.filter(r => r.partnerId === partnerId);
  }
  
  return rates;
}

export async function initiateExchange(request: ExchangeRequest): Promise<any> {
  const { userId, partnerId, direction, amount, externalAccountId } = request;
  
  // バリデーション
  const partner = EXCHANGE_PARTNERS.find(p => p.id === partnerId);
  if (!partner) {
    throw new Error('無効なパートナーIDです');
  }
  
  if (!partner.enabled) {
    throw new Error('このパートナーとの交換は現在利用できません');
  }
  
  if (amount < partner.minExchangeAmount) {
    throw new Error(`最小交換額は${partner.minExchangeAmount}ポイントです`);
  }
  
  if (amount > partner.maxExchangeAmount) {
    throw new Error(`最大交換額は${partner.maxExchangeAmount}ポイントです`);
  }
  
  // 残高チェック（京都ポイント→他社の場合）
  if (direction === 'to_external') {
    // const balance = await getPointBalance(userId);
    // if (balance < amount) {
    //   throw new Error('ポイント残高が不足しています');
    // }
  }
  
  // 交換処理
  const exchangeId = 'ex_' + Date.now();
  
  // 外部API連携（実装例）
  await callPartnerAPI(partnerId, {
    exchangeId,
    direction,
    amount,
    externalAccountId
  });
  
  // DB保存
  const exchange = {
    id: exchangeId,
    userId,
    partnerId,
    partnerName: partner.name,
    direction,
    amount,
    status: partner.processingTime === '即時' ? 'completed' : 'processing',
    estimatedCompletion: partner.processingTime === '即時' 
      ? new Date() 
      : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date()
  };
  
  return exchange;
}

export async function getExchangeHistory(userId: string): Promise<any[]> {
  // DB実装
  return [];
}

export async function getExchangeStatus(exchangeId: string, userId: string): Promise<any> {
  // DB実装
  return {
    exchangeId,
    status: 'completed',
    completedAt: new Date()
  };
}

// パートナーAPI連携
async function callPartnerAPI(partnerId: string, data: any): Promise<void> {
  // 各パートナーのAPI仕様に応じた実装
  
  switch (partnerId) {
    case 'rakuten':
      // 楽天ポイントAPI連携
      break;
    case 't-point':
      // TポイントAPI連携
      break;
    case 'd-point':
      // dポイントAPI連携
      break;
    case 'ponta':
      // PontaポイントAPI連携
      break;
    case 'nanaco':
      // nanacoAPI連携
      break;
    case 'waon':
      // WAONAPI連携
      break;
    default:
      throw new Error('未対応のパートナーです');
  }
}
