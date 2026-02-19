import { useState } from 'react';
import styles from './History.module.css';

interface Transaction {
  id: string;
  type: 'grant' | 'use' | 'exchange_out' | 'exchange_in';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    type: 'grant',
    amount: 5000,
    description: '初回登録ポイント付与',
    date: '2026-08-01',
    status: 'completed'
  },
  {
    id: 'tx_002',
    type: 'use',
    amount: -500,
    description: '京都市内加盟店での利用',
    date: '2026-08-05',
    status: 'completed'
  },
  {
    id: 'tx_003',
    type: 'exchange_out',
    amount: -1000,
    description: '楽天ポイントへ交換',
    date: '2026-08-10',
    status: 'completed'
  }
];

export default function History() {
  const [filter, setFilter] = useState<'all' | 'grant' | 'use' | 'exchange'>('all');
  const [transactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    if (filter === 'grant') return tx.type === 'grant';
    if (filter === 'use') return tx.type === 'use';
    if (filter === 'exchange') return tx.type === 'exchange_out' || tx.type === 'exchange_in';
    return true;
  });

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'grant':
        return 'ポイント付与';
      case 'use':
        return '利用';
      case 'exchange_out':
        return 'ポイント交換（出）';
      case 'exchange_in':
        return 'ポイント交換（入）';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'pending':
        return '処理中';
      case 'failed':
        return '失敗';
      default:
        return status;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted;
      case 'pending':
        return styles.statusPending;
      case 'failed':
        return styles.statusFailed;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>利用履歴</h1>

      <div className={styles.filterBar}>
        <button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          すべて
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'grant' ? styles.active : ''}`}
          onClick={() => setFilter('grant')}
        >
          付与
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'use' ? styles.active : ''}`}
          onClick={() => setFilter('use')}
        >
          利用
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'exchange' ? styles.active : ''}`}
          onClick={() => setFilter('exchange')}
        >
          交換
        </button>
      </div>

      <div className={styles.transactionList}>
        {filteredTransactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <p className={styles.emptyText}>履歴がありません</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className={styles.transactionCard}>
              <div className={styles.transactionHeader}>
                <span className={styles.transactionType}>{getTypeLabel(tx.type)}</span>
                <span className={`${styles.transactionStatus} ${getStatusColor(tx.status)}`}>
                  {getStatusLabel(tx.status)}
                </span>
              </div>
              <div className={styles.transactionBody}>
                <p className={styles.transactionDescription}>{tx.description}</p>
                <div className={styles.transactionAmount}>
                  <span className={tx.amount > 0 ? styles.amountPositive : styles.amountNegative}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </span>
                  <span className={styles.amountUnit}>ポイント</span>
                </div>
              </div>
              <div className={styles.transactionFooter}>
                <span className={styles.transactionDate}>{tx.date}</span>
                <span className={styles.transactionId}>ID: {tx.id}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>集計情報</h3>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>総付与ポイント</span>
            <span className={styles.summaryValue}>5,000P</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>総利用ポイント</span>
            <span className={styles.summaryValue}>500P</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>総交換ポイント</span>
            <span className={styles.summaryValue}>1,000P</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>現在の残高</span>
            <span className={styles.summaryValueHighlight}>3,500P</span>
          </div>
        </div>
      </div>
    </div>
  );
}
