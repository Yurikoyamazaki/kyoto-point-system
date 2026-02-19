import { useState, useEffect } from 'react';
import styles from './Points.module.css';

export default function Points() {
  const [balance, setBalance] = useState<number>(5000);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/points/balance', {
        headers: {
          'Authorization': `Bearer demo-token`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ポイント残高</h1>

      <div className={styles.balanceCard}>
        <div className={styles.balanceLabel}>現在の残高</div>
        {isLoading ? (
          <div className={styles.balanceAmount}>読み込み中...</div>
        ) : (
          <>
            <div className={styles.balanceAmount}>
              {balance.toLocaleString()}
              <span className={styles.balanceUnit}>ポイント</span>
            </div>
            <div className={styles.balanceYen}>
              = {balance.toLocaleString()}円相当
            </div>
          </>
        )}
      </div>

      <div className={styles.actionsCard}>
        <h2 className={styles.actionsTitle}>ポイントの使い方</h2>
        <div className={styles.actionGrid}>
          <div className={styles.actionItem}>
            <div className={styles.actionIcon}>🏪</div>
            <h3 className={styles.actionTitle}>加盟店で使う</h3>
            <p className={styles.actionDescription}>
              京都市内の加盟店でQRコードを提示してお支払い
            </p>
            <button className={styles.actionButton}>
              加盟店を探す
            </button>
          </div>

          <div className={styles.actionItem}>
            <div className={styles.actionIcon}>🔄</div>
            <h3 className={styles.actionTitle}>ポイント交換</h3>
            <p className={styles.actionDescription}>
              楽天ポイントやTポイントなど他社ポイントに交換
            </p>
            <button
              className={styles.actionButton}
              onClick={() => window.location.href = '/exchange'}
            >
              交換する
            </button>
          </div>

          <div className={styles.actionItem}>
            <div className={styles.actionIcon}>📊</div>
            <h3 className={styles.actionTitle}>利用履歴</h3>
            <p className={styles.actionDescription}>
              ポイントの使用履歴や交換履歴を確認
            </p>
            <button
              className={styles.actionButton}
              onClick={() => window.location.href = '/history'}
            >
              履歴を見る
            </button>
          </div>
        </div>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.infoTitle}>ご利用上の注意</h3>
        <ul className={styles.infoList}>
          <li>ポイントの有効期限: 2027年2月28日まで</li>
          <li>1ポイント = 1円として利用可能</li>
          <li>加盟店でのお支払いは1円単位で利用可能</li>
          <li>他のポイントへの交換は100ポイント単位</li>
          <li>現金への換金はできません</li>
        </ul>
      </div>
    </div>
  );
}
