// 楽天ポイントAPI連携

interface RakutenExchangeRequest {
  exchangeId: string;
  direction: 'to_external' | 'from_external';
  amount: number;
  externalAccountId: string;
}

export class RakutenPointAPI {
  private apiEndpoint: string;
  private apiKey: string;
  
  constructor() {
    this.apiEndpoint = process.env.RAKUTEN_API_ENDPOINT || '';
    this.apiKey = process.env.RAKUTEN_API_KEY || '';
  }
  
  async exchangePoints(request: RakutenExchangeRequest): Promise<any> {
    const { exchangeId, direction, amount, externalAccountId } = request;
    
    try {
      // 楽天ポイントAPIへのリクエスト
      const response = await fetch(`${this.apiEndpoint}/point/exchange`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Request-ID': exchangeId
        },
        body: JSON.stringify({
          accountId: externalAccountId,
          points: amount,
          direction: direction === 'to_external' ? 'add' : 'subtract',
          partnerId: 'kyoto-city',
          transactionId: exchangeId
        })
      });
      
      if (!response.ok) {
        throw new Error(`楽天API エラー: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        externalTransactionId: data.transactionId,
        status: 'completed'
      };
    } catch (error) {
      console.error('楽天ポイント交換エラー:', error);
      throw error;
    }
  }
  
  async verifyAccount(accountId: string): Promise<boolean> {
    // アカウント存在確認
    try {
      const response = await fetch(`${this.apiEndpoint}/account/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ accountId })
      });
      
      return response.ok;
    } catch (error) {
      console.error('楽天アカウント確認エラー:', error);
      return false;
    }
  }
  
  async getBalance(accountId: string): Promise<number> {
    // ポイント残高取得
    try {
      const response = await fetch(`${this.apiEndpoint}/account/${accountId}/balance`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('残高取得失敗');
      }
      
      const data = await response.json();
      return data.balance;
    } catch (error) {
      console.error('楽天残高取得エラー:', error);
      throw error;
    }
  }
}
