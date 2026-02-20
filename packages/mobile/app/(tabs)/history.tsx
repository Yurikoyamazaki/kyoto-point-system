import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Transaction = {
  id: string;
  type: 'payment' | 'receive' | 'exchange';
  title: string;
  merchant?: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
};

export default function HistoryScreen() {
  const [filter, setFilter] = useState<'all' | 'payment' | 'receive' | 'exchange'>('all');
  
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'payment',
      title: 'スーパーマーケットA',
      merchant: '京都店',
      date: '2026/02/20 14:30',
      amount: -1200,
      status: 'completed',
    },
    {
      id: '2',
      type: 'payment',
      title: 'レストランB',
      merchant: '四条店',
      date: '2026/02/19 19:15',
      amount: -2500,
      status: 'completed',
    },
    {
      id: '3',
      type: 'exchange',
      title: '楽天ポイントに交換',
      date: '2026/02/18 10:00',
      amount: -1000,
      status: 'completed',
    },
    {
      id: '4',
      type: 'payment',
      title: 'カフェC',
      merchant: '河原町店',
      date: '2026/02/17 15:45',
      amount: -800,
      status: 'completed',
    },
    {
      id: '5',
      type: 'receive',
      title: 'ポイント付与',
      date: '2026/02/01 00:00',
      amount: 5000,
      status: 'completed',
    },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <View style={styles.container}>
      {/* フィルター */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <FilterButton
          label="すべて"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="支払い"
          active={filter === 'payment'}
          onPress={() => setFilter('payment')}
        />
        <FilterButton
          label="受取"
          active={filter === 'receive'}
          onPress={() => setFilter('receive')}
        />
        <FilterButton
          label="交換"
          active={filter === 'exchange'}
          onPress={() => setFilter('exchange')}
        />
      </ScrollView>

      {/* 取引リスト */}
      <ScrollView style={styles.listContainer}>
        {filteredTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ScrollView>
    </View>
  );
}

function FilterButton({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'payment':
        return 'cart';
      case 'receive':
        return 'add-circle';
      case 'exchange':
        return 'swap-horizontal';
      default:
        return 'ellipse';
    }
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = () => {
    switch (transaction.status) {
      case 'completed':
        return '完了';
      case 'pending':
        return '処理中';
      case 'failed':
        return '失敗';
      default:
        return '';
    }
  };

  const isPositive = transaction.amount > 0;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardIcon}>
        <Ionicons name={getIcon()} size={24} color="#6366F1" />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{transaction.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        
        {transaction.merchant && (
          <Text style={styles.cardMerchant}>{transaction.merchant}</Text>
        )}
        
        <Text style={styles.cardDate}>{transaction.date}</Text>
      </View>

      <View style={styles.cardAmount}>
        <Text style={[
          styles.amountText,
          isPositive ? styles.amountPositive : styles.amountNegative
        ]}>
          {isPositive ? '+' : ''}{transaction.amount.toLocaleString()}
        </Text>
        <Text style={styles.amountUnit}>ポイント</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterContent: {
    padding: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterButtonActive: {
    backgroundColor: '#6366F1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  cardMerchant: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardAmount: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountPositive: {
    color: '#10B981',
  },
  amountNegative: {
    color: '#EF4444',
  },
  amountUnit: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
