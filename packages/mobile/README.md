# 📱 京都市ポイントアプリ - モバイル版

React Native + Expoで構築されたネイティブモバイルアプリ

## 🚀 クイックスタート

### 1. 依存関係をインストール

```bash
npm install
```

### 2. 開発サーバーを起動

```bash
npm start
```

### 3. アプリを実行

#### 実機で実行（推奨）

1. **Expo Goをインストール**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **QRコードをスキャン**
   - iOS: カメラアプリで直接スキャン
   - Android: Expo Goアプリ内でスキャン

#### エミュレーターで実行

```bash
# iOS（Macのみ）
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 📱 主要機能

### ユーザー機能
- ✅ マイナンバーカード認証
- ✅ ポイント残高表示
- ✅ QRコード表示（受取用）
- ✅ QRコードスキャン（支払用）
- ✅ 取引履歴
- ✅ 他社ポイント交換（6社対応）
- ✅ プッシュ通知

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
│   ├── payment/           # 決済画面
│   │   ├── scan.tsx       # QRスキャン
│   │   └── confirm.tsx    # 決済確認
│   └── _layout.tsx        # ルートレイアウト
├── components/            # 共通コンポーネント
├── services/              # APIサービス
├── hooks/                 # カスタムフック
├── types/                 # 型定義
├── constants/             # 定数
├── app.json              # Expo設定
├── package.json
└── tsconfig.json
```

---

## 🎨 画面一覧

### メイン画面（タブ）
1. **ホーム** - ポイント残高、QRコード、最近の取引
2. **履歴** - 取引履歴（フィルター機能付き）
3. **ポイント交換** - 他社ポイントとの交換
4. **設定** - アカウント設定、セキュリティ設定

### その他の画面
- **QRスキャン** - カメラでQRコードをスキャン
- **決済確認** - 決済内容の確認と実行
- **ログイン** - マイナンバーカード認証
- **新規登録** - 初回登録

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
```

---

## 📦 ビルド

### iOS（App Store）

```bash
# EAS CLIをインストール
npm install -g eas-cli

# EASにログイン
eas login

# ビルド設定
eas build:configure

# iOSビルド
eas build --platform ios

# App Store Connect にアップロード
eas submit --platform ios
```

### Android（Google Play）

```bash
# Androidビルド
eas build --platform android

# Google Play Console にアップロード
eas submit --platform android
```

### APK（テスト配布）

```bash
# APKビルド
eas build --platform android --profile preview
```

---

## 🔐 セキュリティ機能

### 生体認証

```typescript
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'ログインするには認証してください',
  });
  return result.success;
};
```

### セキュアストレージ

```typescript
import * as SecureStore from 'expo-secure-store';

// 保存
await SecureStore.setItemAsync('authToken', token);

// 取得
const token = await SecureStore.getItemAsync('authToken');
```

---

## 📲 プッシュ通知

```typescript
import * as Notifications from 'expo-notifications';

// 通知設定
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// 通知送信
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'ポイントが付与されました',
    body: '5,000ポイントが付与されました',
  },
  trigger: null,
});
```

---

## 🌐 対応ポイントサービス

1. **楽天ポイント** - 即時交換
2. **Tポイント** - 1-3営業日
3. **dポイント** - 即時交換
4. **Pontaポイント** - 1-3営業日
5. **nanacoポイント** - 即時交換
6. **WAONポイント** - 即時交換

---

## 🧪 テスト

```bash
# ユニットテスト
npm test

# E2Eテスト
detox test
```

---

## 📚 技術スタック

- **React Native** 0.73
- **Expo** ~50.0
- **Expo Router** ~3.4
- **TypeScript** 5.3
- **React Navigation** 6.x
- **Expo Camera** - QRスキャン
- **Expo Local Authentication** - 生体認証
- **Expo Secure Store** - セキュアストレージ
- **Expo Notifications** - プッシュ通知

---

## 🔧 トラブルシューティング

### Metro Bundlerが起動しない

```bash
npm start -- --clear
```

### iOS実機で動かない

```bash
cd ios
pod install
cd ..
```

### Androidビルドエラー

```bash
cd android
./gradlew clean
cd ..
```

---

## 📖 ドキュメント

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [React Navigation](https://reactnavigation.org/)

---

## 🎯 次のステップ

1. ✅ 基本機能の実装完了
2. 🔄 APIサーバーとの連携
3. 🔄 マイナンバーカード認証の実装
4. 🔄 プッシュ通知の設定
5. 🔄 App Store / Google Play への公開

---

## 📞 サポート

問題が発生した場合は、GitHubのIssuesで報告してください。

---

**京都市ポイントアプリ - モバイル版**

© 2026 Kyoto City Point System
