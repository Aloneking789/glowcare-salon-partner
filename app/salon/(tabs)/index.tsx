import { Users, IndianRupee, Clock, Calendar, Scissors, Settings } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';

export default function SalonHome() {
  const { user } = useAuth();
  const router = useRouter();

  const salonImages = [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    'https://images.unsplash.com/photo-1560066984-138dadb4c3cc?w=800',
    'https://images.unsplash.com/photo-1622287162716-f311baa10d13?w=800',
  ];

  const recentBookings = [
    { id: '1', name: 'Rahul Kumar', service: 'Haircut', time: '10:30 AM', status: 'in-progress' as const, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: '2', name: 'Priya Singh', service: 'Hair Color', time: '11:00 AM', status: 'upcoming' as const, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: '3', name: 'Amit Patel', service: 'Shave', time: '11:30 AM', status: 'upcoming' as const, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  ];

  const weekData = [
    { day: 'Mon', bookings: 15, revenue: 2800 },
    { day: 'Tue', bookings: 18, revenue: 3200 },
    { day: 'Wed', bookings: 12, revenue: 2100 },
    { day: 'Thu', bookings: 20, revenue: 3800 },
    { day: 'Fri', bookings: 25, revenue: 4500 },
    { day: 'Sat', bookings: 30, revenue: 5200 },
    { day: 'Sun', bookings: 22, revenue: 4000 },
  ];

  const maxBookings = Math.max(...weekData.map(d => d.bookings));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[Colors.salon, Colors.primaryDark]}
          style={styles.heroSection}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.salonName}>{user?.salonName || 'Salon Owner'}</Text>
            </View>
            <TouchableOpacity 
              style={styles.headerSettings}
              onPress={() => router.push('/salon/settings')}
            >
              <Settings size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.todayOverview}>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <Calendar size={20} color={Colors.salon} />
              </View>
              <Text style={styles.overviewLabel}>Today</Text>
              <Text style={styles.overviewValue}>12 Bookings</Text>
            </View>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <IndianRupee size={20} color={Colors.success} />
              </View>
              <Text style={styles.overviewLabel}>Revenue</Text>
              <Text style={styles.overviewValue}>₹2,400</Text>
            </View>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <Users size={20} color={Colors.info} />
              </View>
              <Text style={styles.overviewLabel}>Active</Text>
              <Text style={styles.overviewValue}>5 Barbers</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.quickActionsSection}>
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push('/salon/bookings')}
          >
            <LinearGradient
              colors={[Colors.info, '#0ea5e9']}
              style={styles.quickActionCardGradient}
            >
              <Calendar size={28} color={Colors.white} />
              <Text style={styles.quickActionCardTitle}>View All{`\n`}Bookings</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push('/salon/services')}
          >
            <LinearGradient
              colors={[Colors.accent, '#f59e0b']}
              style={styles.quickActionCardGradient}
            >
              <Scissors size={28} color={Colors.white} />
              <Text style={styles.quickActionCardTitle}>Manage{`\n`}Services</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push('/salon/barbers')}
          >
            <LinearGradient
              colors={[Colors.success, '#10b981']}
              style={styles.quickActionCardGradient}
            >
              <Users size={28} color={Colors.white} />
              <Text style={styles.quickActionCardTitle}>View{`\n`}Staff</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Performance</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>This Week</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chart}>
            {weekData.map((item, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: (item.bookings / maxBookings) * 120 }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.salon }]} />
              <Text style={styles.legendText}>Bookings</Text>
            </View>
          </View>
        </View>

        <View style={styles.gallerySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Salon</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gallery}
          >
            {salonImages.map((image, index) => (
              <View key={index} style={styles.galleryItem}>
                <Image source={{ uri: image }} style={styles.galleryImage} />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => router.push('/salon/bookings')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.map((booking) => (
            <TouchableOpacity 
              key={booking.id} 
              style={styles.bookingCard}
              onPress={() => router.push('/salon/bookings')}
            >
              <Image 
                source={{ uri: booking.image }} 
                style={styles.bookingImage}
              />
              <View style={styles.bookingInfo}>
                <View style={styles.bookingDetails}>
                  <Text style={styles.bookingName}>{booking.name}</Text>
                  <View style={styles.bookingMeta}>
                    <Scissors size={14} color={Colors.textLight} />
                    <Text style={styles.bookingService}>{booking.service}</Text>
                  </View>
                  <View style={styles.bookingMeta}>
                    <Clock size={14} color={Colors.textLight} />
                    <Text style={styles.bookingTime}>{booking.time}</Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, booking.status === 'in-progress' ? styles.status_inProgress : styles.status_upcoming]}>
                  <Text style={[styles.statusText, booking.status === 'in-progress' ? styles.statusText_inProgress : styles.statusText_upcoming]}>
                    {booking.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickActionHalf} onPress={() => router.push('/salon/settings')}>
            <LinearGradient
              colors={[Colors.salon, Colors.primaryDark]}
              style={styles.quickActionGradientHalf}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Settings size={28} color={Colors.white} />
              <Text style={styles.quickActionTitleHalf}>Settings</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionHalf} onPress={() => router.push('/salon/bookings')}>
            <LinearGradient
              colors={[Colors.info, '#0ea5e9']}
              style={styles.quickActionGradientHalf}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Calendar size={28} color={Colors.white} />
              <Text style={styles.quickActionTitleHalf}>Bookings</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  heroSection: {
    paddingTop: 12,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  salonName: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 4,
  },
  headerSettings: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayOverview: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  overviewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  quickActionsSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  quickActionCardGradient: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
    minHeight: 100,
    justifyContent: 'center',
  },
  quickActionCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 18,
  },
  chartSection: {
    padding: 20,
    paddingTop: 0,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    paddingTop: 20,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    backgroundColor: Colors.salon,
    borderRadius: 8,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textLight,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.salon,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  bookingImage: {
    width: 100,
    height: 120,
  },
  bookingInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  bookingDetails: {
    flex: 1,
  },
  bookingName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  bookingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  bookingService: {
    fontSize: 13,
    color: Colors.textLight,
  },
  bookingTime: {
    fontSize: 13,
    color: Colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  status_upcoming: {
    backgroundColor: Colors.infoLight,
  },
  status_inProgress: {
    backgroundColor: Colors.warningLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusText_upcoming: {
    color: Colors.info,
  },
  statusText_inProgress: {
    color: Colors.warning,
  },
  gallerySection: {
    marginBottom: 24,
  },
  gallery: {
    paddingHorizontal: 20,
    gap: 12,
  },
  galleryItem: {
    width: 280,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionHalf: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  quickActionGradientHalf: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
    minHeight: 120,
    justifyContent: 'center',
  },
  quickActionTitleHalf: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
