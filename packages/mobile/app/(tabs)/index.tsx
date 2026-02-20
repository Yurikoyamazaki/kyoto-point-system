import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';

export default function HomeScreen() {
  const router = useRouter();
  const [points, setPoints] = useState(5000);
  const [userName, setUserName] = useState('山崎 太郎');
  const [qrValue, setQrValue] = useState('USER-12345');

  return (
    <ScrollView style={styles.container}>
      {/* ポイントカード */}
      <View style={styles.pointCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="wallet" size={24} color="#fff" />
          <Text style={styles.cardTitle}>京都市ポイント</Text>
        </View>
        
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>残高</Text>
          <Text style={styles.pointsValue}>{points.toLocaleString()}</Text>
          <Text style={styles.pointsUnit}>ポイント</Text>
        </View>

        <View style={styles.userInfo}>
          <Ionicons name="person-circle" size={20} color="#fff" />
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>

      {/* QRコード */}
      <View style={styles.qrSection}>
        <Text style={styles.sectionTitle}>マイQRコード</Text>
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={200}
            backgroundColor="white"
          />
        </View>
        <Text style={styles.qrHint}>
          加盟店でこのQRコードを提示してください
        </Text>
      </View>

      {/* アクションボタン */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/payment/scan')}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="qr-code-outline" size={32} color="#6366F1" />
          </View>
          <Text style={styles.actionText}>QRスキャン</Text>
          <Text style={styles.actionSubtext}>支払う</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/exchange')}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="swap-horizontal-outline" size={32} color="#6366F1" />
          </View>
          <Text style={styles.actionText}>ポイント交換</Text>
          <Text style={styles.actionSubtext}>他社ポイント</Text>
        </TouchableOpacity>
      </View>

      {/* 最近の取引 */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>最近の取引</Text>
          <TouchableOpacity onPress={() => router.push('/history')}>
            <Text style={styles.seeAllText}>すべて見る</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionList}>
          <TransactionItem
            icon="cart"
            title="スーパーマーケットA"
            date="2026/02/20"
            amount={-1200}
          />
          <TransactionItem
            icon="restaurant"
            title="レストランB"
            date="2026/02/19"
            amount={-2500}
          />
          <TransactionItem
            icon="add-circle"
            title="ポイント付与"
            date="2026/02/01"
            amount={5000}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function TransactionItem({ icon, title, date, amount }: any) {
  const isPositive = amount > 0;
  
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons name={icon} size={24} color="#6366F1" />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        isPositive ? styles.amountPositive : styles.amountNegative
      ]}>
        {isPositive ? '+' : ''}{amount.toLocaleString()}P
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  pointCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#6366F1',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  pointsContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsUnit: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  qrSection: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  qrHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentSection: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountPositive: {
    color: '#10B981',
  },
  amountNegative: {
    color: '#EF4444',
  },
});
