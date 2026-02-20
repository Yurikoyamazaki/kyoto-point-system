import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentPoints] = useState(5000);

  const merchantName = params.merchantName as string || 'テスト店舗';
  const amount = parseInt(params.amount as string) || 0;

  const handleConfirm = async () => {
    if (amount > currentPoints) {
      Alert.alert('エラー', 'ポイント残高が不足しています');
      return;
    }

    if (amount <= 0) {
      Alert.alert('エラー', '金額を入力してください');
      return;
    }

    setLoading(true);

    // 決済処理をシミュレート
    setTimeout(() => {
      setLoading(false);
      
      Alert.alert(
        '決済完了',
        `${amount.toLocaleString()}ポイントの決済が完了しました`,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    }, 1500);
  };

  const handleCancel = () => {
    Alert.alert(
      '決済キャンセル',
      '決済をキャンセルしますか？',
      [
        { text: 'いいえ', style: 'cancel' },
        {
          text: 'はい',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 決済情報カード */}
      <View style={styles.card}>
        {/* 店舗情報 */}
        <View style={styles.merchantSection}>
          <View style={styles.merchantIcon}>
            <Ionicons name="storefront" size={32} color="#6366F1" />
          </View>
          <Text style={styles.merchantName}>{merchantName}</Text>
        </View>

        {/* 金額 */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>お支払い金額</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountValue}>{amount.toLocaleString()}</Text>
            <Text style={styles.amountUnit}>ポイント</Text>
          </View>
        </View>

        {/* 残高 */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>現在の残高</Text>
            <Text style={styles.balanceValue}>
              {currentPoints.toLocaleString()}P
            </Text>
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>決済後の残高</Text>
            <Text style={[
              styles.balanceValue,
              (currentPoints - amount) < 0 && styles.balanceNegative
            ]}>
              {(currentPoints - amount).toLocaleString()}P
            </Text>
          </View>
        </View>

        {/* 決済日時 */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.infoText}>
              {new Date().toLocaleString('ja-JP')}
            </Text>
          </View>
        </View>
      </View>

      {/* 注意事項 */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Ionicons name="information-circle" size={20} color="#6366F1" />
          <Text style={styles.noticeTitle}>ご確認ください</Text>
        </View>
        <Text style={styles.noticeText}>
          • 決済後のキャンセルはできません{'\n'}
          • ポイントは即座に減算されます{'\n'}
          • 領収書はメールで送信されます
        </Text>
      </View>

      {/* ボタン */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>キャンセル</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.confirmButtonText}>決済する</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  merchantSection: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  merchantIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  merchantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  amountUnit: {
    fontSize: 20,
    color: '#6B7280',
    marginLeft: 8,
  },
  balanceSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  balanceNegative: {
    color: '#EF4444',
  },
  infoSection: {
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  noticeCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  confirmButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
