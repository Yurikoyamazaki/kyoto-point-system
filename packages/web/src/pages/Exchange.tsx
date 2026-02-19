import { useState } from 'react';
import styles from './Exchange.module.css';

interface Partner {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
}

const PARTNERS: Partner[] = [
  {
    id: 'rakuten',
    name: '楽天ポイント',
    description: '楽天グループで使える共通ポイント',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 't-point',
    name: 'Tポイント',
    description: 'TSUTAYAやファミリーマートで使えるポイント',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '1-3営業日'
  },
  {
    id: 'd-point',
    name: 'dポイント',
    description: 'ドコモのポイントサービス',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 'ponta',
    name: 'Pontaポイント',
    description: 'ローソンやリクルートで使えるポイント',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '1-3営業日'
  },
  {
    id: 'nanaco',
    name: 'nanacoポイント',
    description: 'セブン-イレブンで使える電子マネー',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '即時'
  },
  {
    id: 'waon',
    name: 'WAONポイント',
    description: 'イオングループで使える電子マネー',
    minAmount: 100,
    maxAmount: 10000,
    processingTime: '即時'
  }
];

export default function Exchange() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExchange = async () => {
    if (!selectedPartner || !amount) return;

    const numAmount = parseInt(amount);
    if (numAmount < selectedPartner.minAmount) {
      alert(`最小交換額は${selectedPartner.minAmount}ポイントです`);
      return;
    }
    if (numAmount > selectedPartner.maxAmount) {
      alert(`最大交換額は${selectedPartner.maxAmount}ポイントです`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      alert(`${selectedPartner.name}への交換申請を受け付けました`);
      setIsProcessing(false);
      setAmount('');
      setSelectedPartner(null);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ポイント交換</h1>
      <p className={styles.subtitle}>
        京都ポイントを他社ポイントに交換できます（1:1レート、手数料無料）
      </p>

      <div className={styles.partnerGrid}>
        {PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className={`${styles.partnerCard} ${
              selectedPartner?.id === partner.id ? styles.selected : ''
            }`}
            onClick={() => setSelectedPartner(partner)}
          >
            <div className={styles.partnerIcon}>🎫</div>
            <h3 className={styles.partnerName}>{partner.name}</h3>
            <p className={styles.partnerDescription}>{partner.description}</p>
            <div className={styles.partnerInfo}>
              <span className={styles.partnerInfoLabel}>処理時間:</span>
              <span className={styles.partnerInfoValue}>{partner.processingTime}</span>
            </div>
            <div className={styles.partnerInfo}>
              <span className={styles.partnerInfoLabel}>交換単位:</span>
              <span className={styles.partnerInfoValue}>
                {partner.minAmount}〜{partner.maxAmount}P
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPartner && (
        <div className={styles.exchangeForm}>
          <h2 className={styles.formTitle}>
            {selectedPartner.name}に交換
          </h2>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>交換ポイント数</label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                className={styles.formInput}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`${selectedPartner.minAmount}以上`}
                min={selectedPartner.minAmount}
                max={selectedPartner.maxAmount}
              />
              <span className={styles.inputUnit}>ポイント</span>
            </div>
            <p className={styles.formHelp}>
              {selectedPartner.minAmount}〜{selectedPartner.maxAmount}ポイントの範囲で入力してください
            </p>
          </div>

          <div className={styles.exchangePreview}>
            <div className={styles.previewRow}>
              <span>京都ポイント</span>
              <span className={styles.previewAmount}>-{amount || 0}P</span>
            </div>
            <div className={styles.previewArrow}>↓</div>
            <div className={styles.previewRow}>
              <span>{selectedPartner.name}</span>
              <span className={styles.previewAmount}>+{amount || 0}P</span>
            </div>
          </div>

          <button
            className={styles.exchangeButton}
            onClick={handleExchange}
            disabled={!amount || isProcessing}
          >
            {isProcessing ? '処理中...' : '交換する'}
          </button>

          <button
            className={styles.cancelButton}
            onClick={() => {
              setSelectedPartner(null);
              setAmount('');
            }}
          >
            キャンセル
          </button>
        </div>
      )}

      <div className={styles.noteCard}>
        <h3 className={styles.noteTitle}>交換に関する注意事項</h3>
        <ul className={styles.noteList}>
          <li>交換レートは1:1（手数料無料）</li>
          <li>交換は100ポイント単位で可能</li>
          <li>1回の交換上限は10,000ポイント</li>
          <li>1日の交換上限は10,000ポイント</li>
          <li>1ヶ月の交換上限は50,000ポイント</li>
          <li>交換後の取り消しはできません</li>
          <li>処理時間はパートナーにより異なります</li>
        </ul>
      </div>
    </div>
  );
}
