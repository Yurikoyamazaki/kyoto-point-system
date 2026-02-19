// 外部パートナーAPI統合インターフェース

import { RakutenPointAPI } from './rakutenAPI';

export interface PartnerAPI {
  exchangePoints(request: any): Promise<any>;
  verifyAccount(accountId: string): Promise<boolean>;
  getBalance(accountId: string): Promise<number>;
}

export class PartnerAPIFactory {
  static getAPI(partnerId: string): PartnerAPI {
    switch (partnerId) {
      case 'rakuten':
        return new RakutenPointAPI();
      case 't-point':
        // return new TPointAPI();
        throw new Error('TポイントAPI未実装');
      case 'd-point':
        // return new DPointAPI();
        throw new Error('dポイントAPI未実装');
      case 'ponta':
        // return new PontaAPI();
        throw new Error('PontaポイントAPI未実装');
      case 'nanaco':
        // return new NanacoAPI();
        throw new Error('nanacoAPI未実装');
      case 'waon':
        // return new WaonAPI();
        throw new Error('WAONAPI未実装');
      default:
        throw new Error(`未対応のパートナー: ${partnerId}`);
    }
  }
}
