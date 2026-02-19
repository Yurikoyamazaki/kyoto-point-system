import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>京都市デジタルポイント給付システム</h1>
        <p className={styles.heroSubtitle}>
          京都市民の皆様に5,000ポイントを給付します
        </p>
        <div className={styles.heroActions}>
          <Link to="/login" className={styles.primaryButton}>
            マイナンバーカードでログイン
          </Link>
          <Link to="/points" className={styles.secondaryButton}>
            ポイント残高を確認
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>主な機能</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3 className={styles.featureTitle}>マイナンバーカード認証</h3>
            <p className={styles.featureDescription}>
              安全で確実な本人確認システム
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏪</div>
            <h3 className={styles.featureTitle}>加盟店でのお支払い</h3>
            <p className={styles.featureDescription}>
              QRコードで簡単にポイント利用
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔄</div>
            <h3 className={styles.featureTitle}>ポイント交換</h3>
            <p className={styles.featureDescription}>
              楽天ポイントなど他社ポイントに交換可能
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>利用履歴</h3>
            <p className={styles.featureDescription}>
              ポイントの使用履歴をいつでも確認
            </p>
          </div>
        </div>
      </section>

      <section className={styles.info}>
        <h2 className={styles.sectionTitle}>ご利用期間</h2>
        <div className={styles.infoCard}>
          <p className={styles.infoPeriod}>2026年8月1日 〜 2027年2月28日</p>
          <p className={styles.infoNote}>
            期間内に京都市内の加盟店でご利用いただけます
          </p>
        </div>
      </section>
    </div>
  );
}
