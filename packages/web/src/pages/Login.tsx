import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('マイナンバーカード認証は実装中です');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ログイン</h1>
        <p className={styles.description}>
          マイナンバーカードを使用して安全にログインします
        </p>

        <div className={styles.cardReaderSection}>
          <div className={styles.cardReaderIcon}>💳</div>
          <p className={styles.cardReaderText}>
            カードリーダーにマイナンバーカードをセットしてください
          </p>
        </div>

        <div className={styles.instructions}>
          <h3 className={styles.instructionsTitle}>ログイン手順</h3>
          <ol className={styles.instructionsList}>
            <li>マイナンバーカードをカードリーダーにセット</li>
            <li>パスワード（4桁の暗証番号）を入力</li>
            <li>認証ボタンをクリック</li>
          </ol>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={styles.loginButton}
        >
          {isLoading ? '認証中...' : 'マイナンバーカードで認証'}
        </button>

        <div className={styles.note}>
          <p>
            初回ログイン時に5,000ポイントが自動的に付与されます
          </p>
        </div>
      </div>

      <div className={styles.helpCard}>
        <h3 className={styles.helpTitle}>お困りの方へ</h3>
        <ul className={styles.helpList}>
          <li>マイナンバーカードをお持ちでない方は、お近くの区役所でお申し込みください</li>
          <li>カードリーダーはコンビニエンスストアやオンラインショップで購入できます</li>
          <li>スマートフォンをお持ちでない方は、区役所の支援窓口をご利用ください</li>
        </ul>
      </div>
    </div>
  );
}
