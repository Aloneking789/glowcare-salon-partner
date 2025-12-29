import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function Earnings() {
  const earnings = {
    today: 2450,
    week: 12500,
    month: 45000,
    available: 8500,
  };

  const transactions = [
    { id: '1', date: 'Today, 3:45 PM', amount: 899, status: 'completed', customer: 'Priya Sharma' },
    { id: '2', date: 'Today, 1:20 PM', amount: 599, status: 'completed', customer: 'Rahul Verma' },
    { id: '3', date: 'Yesterday, 5:30 PM', amount: 1299, status: 'completed', customer: 'Amit Patel' },
    { id: '4', date: 'Yesterday, 2:15 PM', amount: 399, status: 'completed', customer: 'Neha Singh' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{earnings.available.toLocaleString()}</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Ionicons name="download" size={18} color={Colors.white} />
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹{earnings.today.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Today</Text>
            <View style={styles.statBadge}>
              <Ionicons name="trending-up" size={12} color={Colors.success} />
              <Text style={styles.statChange}>+12%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹{earnings.week.toLocaleString()}</Text>
            <Text style={styles.statLabel}>This Week</Text>
            <View style={styles.statBadge}>
              <Ionicons name="trending-up" size={12} color={Colors.success} />
              <Text style={styles.statChange}>+8%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>₹{earnings.month.toLocaleString()}</Text>
            <Text style={styles.statLabel}>This Month</Text>
            <View style={styles.statBadge}>
              <Ionicons name="trending-up" size={12} color={Colors.success} />
              <Text style={styles.statChange}>+15%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.customerName}>{transaction.customer}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>+₹{transaction.amount}</Text>
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  balanceCard: {
    backgroundColor: Colors.partner,
    borderRadius: 24,
    padding: 28,
    margin: 20,
    marginTop: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 20,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  withdrawText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.partner,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChange: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: Colors.textLight,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.success,
    marginBottom: 4,
  },
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.successLight,
  },
  completedText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
});
