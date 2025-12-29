import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/colors';

export default function PartnerHome() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);

  const jobs = [
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerPhone: '+919876543210',
      customerAddress: '123 MG Road, Delhi',
      services: ['Haircut', 'Hair Styling'],
      scheduledTime: '2:00 PM',
      status: 'pending' as const,
      payment: 899,
      location: { lat: 28.6139, lng: 77.2090 },
      customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '2',
      customerName: 'Rahul Verma',
      customerPhone: '+919876543211',
      customerAddress: '456 CP, Delhi',
      services: ['Shave', 'Facial'],
      scheduledTime: '3:30 PM',
      status: 'pending' as const,
      payment: 599,
      location: { lat: 28.6289, lng: 77.2065 },
      customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[Colors.partner, Colors.primaryDark]}
          style={styles.heroSection}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'Partner'}</Text>
            </View>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{user?.name?.charAt(0) || 'P'}</Text>
            </View>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusInfo}>
                <Text style={styles.statusLabel}>You are currently</Text>
                <Text style={[styles.statusValue, { color: isOnline ? Colors.success : Colors.textLight }]}>
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
              <Switch
                value={isOnline}
                onValueChange={setIsOnline}
                trackColor={{ false: Colors.border, true: Colors.success }}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.border}
                style={styles.switch}
              />
            </View>
            <Text style={styles.statusHint}>
              {isOnline ? 'You will receive job requests' : 'Turn on to receive jobs'}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[Colors.partner, Colors.primaryDark]}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIconWhite}>
                <Ionicons name="trending-up" size={20} color={Colors.white} />
              </View>
              <Text style={styles.statValueWhite}>₹2,450</Text>
              <Text style={styles.statLabelWhite}>Today&apos;s Earnings</Text>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={[Colors.success, '#059669']}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statIconWhite}>
                <Ionicons name="checkmark" size={20} color={Colors.white} />
              </View>
              <Text style={styles.statValueWhite}>7</Text>
              <Text style={styles.statLabelWhite}>Jobs Completed</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Your Performance</Text>
          <View style={styles.performanceStats}>
            <View style={styles.performanceStat}>
              <View style={styles.performanceIconContainer}>
                <Ionicons name="star" size={18} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.performanceValue}>4.8</Text>
                <Text style={styles.performanceLabel}>Rating</Text>
              </View>
            </View>
            <View style={styles.performanceStatDivider} />
            <View style={styles.performanceStat}>
              <View style={styles.performanceIconContainer}>
                <Ionicons name="briefcase" size={18} color={Colors.info} />
              </View>
              <View>
                <Text style={styles.performanceValue}>156</Text>
                <Text style={styles.performanceLabel}>Total Jobs</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Job Requests</Text>
          
          {jobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobHeader}>
                <Image 
                  source={{ uri: job.customerImage }} 
                  style={styles.customerImage}
                />
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{job.customerName}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={14} color={Colors.textLight} />
                    <Text style={styles.address} numberOfLines={1}>
                      {job.customerAddress}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.jobDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{job.customerPhone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color={Colors.textLight} />
                  <Text style={styles.detailText}>{job.scheduledTime}</Text>
                </View>
              </View>

              <View style={styles.services}>
                {job.services.map((service, idx) => (
                  <View key={idx} style={styles.serviceBadge}>
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment</Text>
                <Text style={styles.paymentValue}>₹{job.payment}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.rejectButton}
                  onPress={() => console.log('Reject job', job.id)}
                >
                  <Ionicons name="close" size={20} color={Colors.error} />
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.acceptButton}
                  onPress={() => console.log('Accept job', job.id)}
                >
                  <Ionicons name="checkmark" size={20} color={Colors.white} />
                  <Text style={styles.acceptText}>Accept Job</Text>
                </TouchableOpacity>
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
  heroSection: {
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 4,
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  statusCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
  statusHint: {
    fontSize: 12,
    color: Colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statIconWhite: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValueWhite: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  statLabelWhite: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  performanceCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  performanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  performanceStatDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
  performanceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  performanceLabel: {
    fontSize: 12,
    color: Colors.textLight,
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
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  address: {
    fontSize: 14,
    color: Colors.textLight,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 16,
  },
  jobDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  serviceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  serviceText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  paymentValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.partner,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  rejectText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.partner,
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
});
