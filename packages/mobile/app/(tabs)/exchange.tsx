import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type PointService = {
  id: string;
  name: string;
  icon: string;
  color: string;
  rate: string;
  processingTime: string;
  minAmount: number;
  maxAmount: number;
};

export default function ExchangeScreen() {
  const [selectedService, setSelectedService] = useState<PointService | null>(null);
  const [amount, setAmount] = useState('');
  const [currentPoints] = useState(5000);

  const services: PointService[] = [
    {
      id: 'rakuten',
      name: '楽天ポイント',
      icon: '🛍️',
      color: '#BF0000',
      rate: '1:1',
      processingTime: '即時',
      minAmount: 100,
      maxAmount: 10000,
    },
    {
      id: 'tpoint',
      name: 'Tポイント',
      icon: '🔵',
      color: '#FFD700',
      rate: '1:1',
      processingTime: '1-3営業日',
      minAmount: 100,
      maxAmount: 10000,
    },
    {
      id: 'dpoint',
      name: 'dポイント',
      icon: '🔴',
      color: '#FF6B00',
      rate: '1:1',
      processingTime: '即時',
      minAmount: 100,
      maxAmount: 10000,
    },
    {
      id: 'ponta',
      name: 'Pontaポイント',
      icon: '🦊',
      color: '#FF6B00',
      rate: '1:1',
      processingTime: '1-3営業日',
      minAmount: 100,
      maxAmount: 10000,
    },
    {
      id: 'nanaco',
      name: 'nanacoポイント',
      icon: '7️⃣',
      color: '#00A040',
      rate: '1:1',
      processingTime: '即時',
      minAmount: 100,
      maxAmount: 10000,
    },
    {
      id: 'waon',
      name: 'WAONポイント',
      icon: '🐕',
      color: '#FF1493',
      rate: '1:1',
      processingTime: '即時',
      minAmount: 100,
      maxAmount: 10000,
    },
  ];

  const handleExchange = () => {
    if (!selectedService) {
      Alert.alert('エラー', '交換先のポイントサービスを選択してください');
      return;
    }

    const exchangeAmount = parseInt(amount);
    
    if (!exchangeAmount || exchangeAmount < selectedService.minAmount) {
      Alert.alert('エラー', `最小交換ポイントは${selectedService.minAmount}ポイントです`);
      return;
    }

    if (exchangeAmount > selectedService.maxAmount) {
      Alert.alert('エラー', `最大交換ポイントは${selectedService.maxAmount}ポイントです`);
      return;
    }

    if (exchangeAmount > currentPoints) {
      Alert.alert('エラー', 'ポイント残高が不足しています');
      return;
    }

    Alert.alert(
      '交換確認',
      `${exchangeAmount}ポイントを${selectedService.name}に交換しますか？\n\n処理時間: ${selectedService.processingTime}`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '交換する',
          onPress: () => {
            Alert.alert('成功', 'ポイント交換を受け付けました');
            setAmount('');
            setSelectedService(null);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 現在のポイント */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>交換可能ポイント</Text>
        <Text style={styles.balanceValue}>{currentPoints.toLocaleString()}</Text>
        <Text style={styles.balanceUnit}>ポイント</Text>
      </View>

      {/* ポイントサービス選択 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>交換先を選択</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService?.id === service.id && styles.serviceCardSelected,
              ]}
              onPress={() => setSelectedService(service)}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceRate}>{service.rate}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 交換詳細 */}
      {selectedService && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>交換詳細</Text>
          
          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>交換先</Text>
              <Text style={styles.detailValue}>{selectedService.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>交換レート</Text>
              <Text style={styles.detailValue}>{selectedService.rate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>処理時間</Text>
              <Text style={styles.detailValue}>{selectedService.processingTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>最小交換</Text>
              <Text style={styles.detailValue}>{selectedService.minAmount}P</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>最大交換</Text>
              <Text style={styles.detailValue}>{selectedService.maxAmount}P</Text>
            </View>
          </View>

          {/* 交換ポイント入力 */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>交換ポイント数</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="number-pad"
                placeholder="100"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.inputUnit}>ポイント</Text>
            </View>
            
            {/* クイック選択 */}
            <View style={styles.quickButtons}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setAmount('1000')}
              >
                <Text style={styles.quickButtonText}>1,000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setAmount('3000')}
              >
                <Text style={styles.quickButtonText}>3,000</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => setAmount('5000')}
              >
                <Text style={styles.quickButtonText}>5,000</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 交換ボタン */}
          <TouchableOpacity
            style={styles.exchangeButton}
            onPress={handleExchange}
          >
            <Text style={styles.exchangeButtonText}>交換する</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 注意事項 */}
      <View style={styles.noticeSection}>
        <View style={styles.noticeHeader}>
          <Ionicons name="information-circle" size={20} color="#6366F1" />
          <Text style={styles.noticeTitle}>注意事項</Text>
        </View>
        <Text style={styles.noticeText}>
          • 交換したポイントは取り消しできません{'\n'}
          • 処理時間は交換先により異なります{'\n'}
          • 交換には各サービスのアカウント連携が必要です{'\n'}
          • 1日の交換上限は10,000ポイントです
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#6366F1',
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceUnit: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 4,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '31%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  serviceCardSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceRate: {
    fontSize: 10,
    color: '#6B7280',
  },
  detailCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  inputSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingVertical: 12,
  },
  inputUnit: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  quickButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  exchangeButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  exchangeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  noticeSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    marginBottom: 32,
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
});
