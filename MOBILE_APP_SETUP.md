# 📱 モバイルアプリ版 - セットアップガイド

## 🎯 概要

京都市ポイント給付アプリのネイティブモバイルアプリ版（iOS/Android対応）

### 技術スタック
- **React Native** - クロスプラットフォーム開発
- **Expo** - 開発環境（推奨）
- **TypeScript** - 型安全性
- **React Navigation** - 画面遷移
- **AsyncStorage** - ローカルストレージ

---

## 🚀 クイックスタート

### 方法1: Expo Go（最速・推奨）⭐

実機で即座にテスト可能！

```bash
# 1. プロジェクトに移動
cd packages/mobile

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm start

# 4. スマホでQRコードをスキャン
# - iOS: カメラアプリでスキャン
# - Android: Expo Goアプリでスキャン
```

### 方法2: エミュレーター

```bash
# iOS（Macのみ）
npm run ios

# Android
npm run android
```

---

## 📋 必要なもの

### 開発環境
- Node.js 20.x以上
- npm または yarn

### 実機テスト（推奨）
- **iOS**: Expo Go アプリ（App Store）
- **Android**: Expo Go アプリ（Google Play）

### エミュレーター（オプション）
- **iOS**: Xcode（Macのみ）
- **Android**: Android Studio

---

## 🛠️ セットアップ手順

### ステップ1: Expo CLIをインストール

```bash
npm install -g expo-cli
```

### ステップ2: プロジェクトを作成

```bash
# packages/mobile ディレクトリに移動
cd packages/mobile

# 依存関係をインストール
npm install
```

### ステップ3: 開発サーバーを起動

```bash
npm start
```

### ステップ4: アプリを実行

#### 実機で実行（推奨）

1. **Expo Goをインストール**
   - iOS: App Storeで「Expo Go」を検索
   - Android: Google Playで「Expo Go」を検索

2. **QRコードをスキャン**
   - ターミナルに表示されるQRコードをスキャン
   - iOS: カメラアプリで直接スキャン
   - Android: Expo Goアプリ内でスキャン

3. **アプリが起動**
   - 自動的にアプリがロードされます

#### エミュレーターで実行

```bash
# iOS（Macのみ）
npm run ios

# Android
npm run android
```

---

## 📱 主要機能

### ユーザー機能
- ✅ マイナンバーカード認証
- ✅ ポイント残高表示
- ✅ QRコードスキャン（決済）
- ✅ QRコード表示（受取）
- ✅ 取引履歴
- ✅ 他社ポイント交換
- ✅ プッシュ通知

### 加盟店機能
- ✅ QRコード生成
- ✅ 決済受付
- ✅ 売上確認
- ✅ 取引履歴

### セキュリティ
- ✅ 生体認証（Face ID / Touch ID / 指紋認証）
- ✅ PIN認証
- ✅ セキュアストレージ
- ✅ SSL通信

---

## 🏗️ プロジェクト構造

```
packages/mobile/
├── app/                    # Expo Router（画面）
│   ├── (tabs)/            # タブナビゲーション
│   │   ├── index.tsx      # ホーム画面
│   │   ├── history.tsx    # 履歴画面
│   │   ├── exchange.tsx   # ポイント交換
│   │   └── settings.tsx   # 設定画面
│   ├── auth/              # 認証画面
│   │   ├── login.tsx      # ログイン
│   │   └── register.tsx   # 新規登録
│   ├── payment/           # 決済画面
│   │   ├── scan.tsx       # QRスキャン
│   │   └── confirm.tsx    # 決済確認
│   └── _layout.tsx        # ルートレイアウト
├── components/            # 共通コンポーネント
│   ├── PointCard.tsx      # ポイントカード
│   ├── QRScanner.tsx      # QRスキャナー
│   ├── TransactionList.tsx # 取引リスト
│   └── Button.tsx         # ボタン
├── services/              # APIサービス
│   ├── api.ts             # API通信
│   ├── auth.ts            # 認証
│   └── storage.ts         # ローカルストレージ
├── hooks/                 # カスタムフック
│   ├── useAuth.ts         # 認証フック
│   └── usePoints.ts       # ポイントフック
├── types/                 # 型定義
│   └── index.ts
├── constants/             # 定数
│   └── Colors.ts
├── app.json              # Expo設定
├── package.json
└── tsconfig.json
```

---

## 🎨 画面一覧

### 認証フロー
1. **スプラッシュ画面** - アプリ起動
2. **ログイン画面** - マイナンバーカード認証
3. **新規登録画面** - 初回登録

### メインフロー
1. **ホーム画面** - ポイント残高、QRコード
2. **決済画面** - QRスキャン、決済確認
3. **履歴画面** - 取引履歴
4. **交換画面** - 他社ポイント交換
5. **設定画面** - アカウント設定

### 加盟店フロー
1. **店舗ホーム** - QRコード生成
2. **決済受付** - 決済確認
3. **売上確認** - 売上統計

---

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm start

# iOS実機で実行
npm run ios

# Android実機で実行
npm run android

# Web版で実行
npm run web

# 型チェック
npm run type-check

# リント
npm run lint

# ビルド（本番用）
npm run build:ios
npm run build:android
```

---

## 📦 ビルド・配布

### iOS（App Store）

```bash
# 1. EAS CLIをインストール
npm install -g eas-cli

# 2. EASにログイン
eas login

# 3. ビルド設定
eas build:configure

# 4. iOSビルド
eas build --platform ios

# 5. App Store Connect にアップロード
eas submit --platform ios
```

### Android（Google Play）

```bash
# 1. Androidビルド
eas build --platform android

# 2. Google Play Console にアップロード
eas submit --platform android
```

### APK（テスト配布）

```bash
# APKビルド
eas build --platform android --profile preview

# ダウンロードして配布
```

---

## 🔐 セキュリティ設定

### 生体認証

```typescript
import * as LocalAuthentication from 'expo-local-authentication';

// 生体認証の確認
const authenticate = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'ログインするには認証してください',
    fallbackLabel: 'パスコードを使用',
  });
  return result.success;
};
```

### セキュアストレージ

```typescript
import * as SecureStore from 'expo-secure-store';

// トークンを保存
await SecureStore.setItemAsync('authToken', token);

// トークンを取得
const token = await SecureStore.getItemAsync('authToken');
```

---

## 📲 プッシュ通知

### 設定

```bash
# Expo Push Notificationsを使用
npm install expo-notifications
```

### 実装

```typescript
import * as Notifications from 'expo-notifications';

// 通知の設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// 通知を送信
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'ポイントが付与されました',
    body: '5,000ポイントが付与されました',
  },
  trigger: null,
});
```

---

## 🎯 パフォーマンス最適化

### 画像最適化

```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

### リスト最適化

```typescript
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={transactions}
  renderItem={({ item }) => <TransactionItem item={item} />}
  estimatedItemSize={80}
/>
```

---

## 🧪 テスト

### ユニットテスト

```bash
npm test
```

### E2Eテスト（Detox）

```bash
# セットアップ
npm install -g detox-cli

# テスト実行
detox test
```

---

## 🌐 多言語対応

```typescript
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
  ja: { welcome: 'ようこそ' },
  en: { welcome: 'Welcome' },
});

i18n.locale = Localization.locale;
```

---

## 📊 アナリティクス

```typescript
import * as Analytics from 'expo-firebase-analytics';

// イベント送信
await Analytics.logEvent('payment_completed', {
  amount: 1000,
  merchant: 'Store A',
});
```

---

## 🔧 トラブルシューティング

### 問題1: Metro Bundlerが起動しない

```bash
# キャッシュをクリア
npm start -- --clear
```

### 問題2: iOS実機で動かない

```bash
# Podをインストール
cd ios
pod install
cd ..
```

### 問題3: Androidビルドエラー

```bash
# Gradleキャッシュをクリア
cd android
./gradlew clean
cd ..
```

---

## 📚 参考リンク

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Router](https://expo.github.io/router/)

---

## ✅ チェックリスト

### 開発環境
- [ ] Node.js 20.x以上
- [ ] Expo CLI インストール
- [ ] Expo Goアプリ（実機）

### セットアップ
- [ ] プロジェクト作成
- [ ] 依存関係インストール
- [ ] 開発サーバー起動
- [ ] 実機で動作確認

### 機能実装
- [ ] 認証機能
- [ ] ポイント表示
- [ ] QRスキャン
- [ ] 決済機能
- [ ] 履歴表示
- [ ] プッシュ通知

### セキュリティ
- [ ] 生体認証
- [ ] セキュアストレージ
- [ ] SSL通信
- [ ] トークン管理

### テスト
- [ ] ユニットテスト
- [ ] E2Eテスト
- [ ] 実機テスト

### リリース
- [ ] App Store準備
- [ ] Google Play準備
- [ ] ビルド設定
- [ ] 配布

---

## 🎉 今すぐ始める

```bash
# 1. プロジェクトに移動
cd packages/mobile

# 2. インストール
npm install

# 3. 起動
npm start

# 4. Expo Goでスキャン
```

**モバイルアプリ開発を楽しんでください！**
