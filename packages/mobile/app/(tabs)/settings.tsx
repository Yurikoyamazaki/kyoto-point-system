import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: 'ログアウト',
          style: 'destructive',
          onPress: () => {
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* ユーザー情報 */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#6366F1" />
        </View>
        <Text style={styles.userName}>山崎 太郎</Text>
        <Text style={styles.userId}>ID: USER-12345</Text>
      </View>

      {/* アカウント設定 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アカウント</Text>
        
        <SettingItem
          icon="person-outline"
          title="プロフィール編集"
          onPress={() => Alert.alert('プロフィール編集')}
        />
        <SettingItem
          icon="card-outline"
          title="マイナンバーカード情報"
          onPress={() => Alert.alert('マイナンバーカード情報')}
        />
        <SettingItem
          icon="link-outline"
          title="外部サービス連携"
          subtitle="楽天、Tポイントなど"
          onPress={() => Alert.alert('外部サービス連携')}
        />
      </View>

      {/* セキュリティ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>セキュリティ</Text>
        
        <SettingToggle
          icon="finger-print"
          title="生体認証"
          subtitle="Face ID / Touch ID"
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
        />
        <SettingItem
          icon="lock-closed-outline"
          title="PINコード変更"
          onPress={() => Alert.alert('PINコード変更')}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          title="セキュリティ設定"
          onPress={() => Alert.alert('セキュリティ設定')}
        />
      </View>

      {/* 通知設定 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知</Text>
        
        <SettingToggle
          icon="notifications-outline"
          title="プッシュ通知"
          subtitle="ポイント付与、決済完了など"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <SettingItem
          icon="mail-outline"
          title="メール通知設定"
          onPress={() => Alert.alert('メール通知設定')}
        />
      </View>

      {/* アプリ情報 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アプリ情報</Text>
        
        <SettingItem
          icon="information-circle-outline"
          title="利用規約"
          onPress={() => Alert.alert('利用規約')}
        />
        <SettingItem
          icon="document-text-outline"
          title="プライバシーポリシー"
          onPress={() => Alert.alert('プライバシーポリシー')}
        />
        <SettingItem
          icon="help-circle-outline"
          title="ヘルプ・お問い合わせ"
          onPress={() => Alert.alert('ヘルプ・お問い合わせ')}
        />
        <SettingItem
          icon="code-outline"
          title="バージョン"
          subtitle="1.0.0"
          hideChevron
        />
      </View>

      {/* ログアウト */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>ログアウト</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 京都市ポイントアプリ</Text>
      </View>
    </ScrollView>
  );
}

function SettingItem({ icon, title, subtitle, onPress, hideChevron }: any) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#6366F1" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {!hideChevron && (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

function SettingToggle({ icon, title, subtitle, value, onValueChange }: any) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#6366F1" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#A5B4FC' }}
        thumbColor={value ? '#6366F1' : '#F3F4F6'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
