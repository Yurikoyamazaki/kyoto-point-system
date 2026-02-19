import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>京都市デジタルポイント</h1>
          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              ホーム
            </Link>
            <Link
              to="/points"
              className={`${styles.navLink} ${isActive('/points') ? styles.active : ''}`}
            >
              ポイント
            </Link>
            <Link
              to="/exchange"
              className={`${styles.navLink} ${isActive('/exchange') ? styles.active : ''}`}
            >
              ポイント交換
            </Link>
            <Link
              to="/history"
              className={`${styles.navLink} ${isActive('/history') ? styles.active : ''}`}
            >
              履歴
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 京都市. All rights reserved.</p>
      </footer>
    </div>
  );
}
