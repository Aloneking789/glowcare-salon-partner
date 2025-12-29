import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Colors from '@/constants/colors';

// Skeleton Loader Component
const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Hero Section Skeleton */}
      <View style={[styles.heroSection, { backgroundColor: Colors.salon }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Animated.View style={[styles.skeletonText, { width: 120, opacity }]} />
            <Animated.View style={[styles.skeletonText, { width: 180, height: 24, marginTop: 4, opacity }]} />
          </View>
          <Animated.View style={[styles.skeletonCircle, { opacity }]} />
        </View>

        <View style={styles.todayOverview}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.overviewCard}>
              <Animated.View style={[styles.skeletonCircle, { width: 40, height: 40, opacity }]} />
              <Animated.View style={[styles.skeletonText, { width: 50, marginTop: 8, opacity }]} />
              <Animated.View style={[styles.skeletonText, { width: 70, marginTop: 4, opacity }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions Skeleton */}
      <View style={styles.quickActionsSection}>
        {[1, 2, 3].map((i) => (
          <Animated.View key={i} style={[styles.quickActionCard, { opacity }]}>
            <View style={[styles.quickActionCardGradient, { backgroundColor: Colors.border }]}>
              <Animated.View style={[styles.skeletonCircle, { width: 28, height: 28, opacity }]} />
              <Animated.View style={[styles.skeletonText, { width: 60, marginTop: 8, opacity }]} />
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Chart Section Skeleton */}
      <View style={styles.chartSection}>
        <View style={styles.sectionHeader}>
          <Animated.View style={[styles.skeletonText, { width: 160, opacity }]} />
          <Animated.View style={[styles.skeletonText, { width: 70, opacity }]} />
        </View>
        <View style={styles.chart}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <View key={i} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <Animated.View style={[styles.bar, { height: 60 + Math.random() * 60, opacity }]} />
              </View>
              <Animated.View style={[styles.skeletonText, { width: 30, height: 12, opacity }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Gallery Section Skeleton */}
      <View style={styles.gallerySection}>
        <View style={styles.sectionHeader}>
          <Animated.View style={[styles.skeletonText, { width: 120, opacity }]} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
          {[1, 2, 3].map((i) => (
            <Animated.View key={i} style={[styles.galleryItem, { opacity }]}>
              <View style={[styles.galleryImage, { backgroundColor: Colors.border }]} />
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Recent Bookings Skeleton */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Animated.View style={[styles.skeletonText, { width: 140, opacity }]} />
          <Animated.View style={[styles.skeletonText, { width: 60, opacity }]} />
        </View>
        {[1, 2, 3].map((i) => (
          <Animated.View key={i} style={[styles.bookingCard, { opacity }]}>
            <View style={[styles.bookingImage, { backgroundColor: Colors.border }]} />
            <View style={styles.bookingInfo}>
              <View style={styles.bookingDetails}>
                <Animated.View style={[styles.skeletonText, { width: 120, opacity }]} />
                <Animated.View style={[styles.skeletonText, { width: 80, marginTop: 6, opacity }]} />
                <Animated.View style={[styles.skeletonText, { width: 70, marginTop: 4, opacity }]} />
              </View>
              <Animated.View style={[styles.skeletonBadge, { opacity }]} />
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default function SalonHome() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <SkeletonLoader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
              <Ionicons name="settings-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.todayOverview}>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <Ionicons name="calendar-outline" size={20} color={Colors.salon} />
              </View>
              <Text style={styles.overviewLabel}>Today</Text>
              <Text style={styles.overviewValue}>12 Bookings</Text>
            </View>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <Ionicons name="cash-outline" size={20} color={Colors.success} />
              </View>
              <Text style={styles.overviewLabel}>Revenue</Text>
              <Text style={styles.overviewValue}>₹2,400</Text>
            </View>
            <View style={styles.overviewCard}>
              <View style={styles.overviewIcon}>
                <Ionicons name="people-outline" size={20} color={Colors.info} />
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
              <Ionicons name="calendar-outline" size={28} color={Colors.white} />
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
              <Ionicons name="cut-outline" size={28} color={Colors.white} />
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
              <Ionicons name="people-outline" size={28} color={Colors.white} />
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
                    <Ionicons name="cut-outline" size={14} color={Colors.textLight} />
                    <Text style={styles.bookingService}>{booking.service}</Text>
                  </View>
                  <View style={styles.bookingMeta}>
                    <Ionicons name="time-outline" size={14} color={Colors.textLight} />
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
              <Ionicons name="settings-outline" size={28} color={Colors.white} />
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
              <Ionicons name="calendar-outline" size={28} color={Colors.white} />
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
  scrollContent: {
    paddingBottom: 100,
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
    backgroundColor: 'rgba(151, 133, 133, 0.2)',
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
    marginBottom: 130,
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
  // Skeleton Loader Styles
  skeletonText: {
    height: 16,
    backgroundColor: Colors.border,
    borderRadius: 8,
  },
  skeletonCircle: {
    width: 44,
    height: 44,
    backgroundColor: Colors.border,
    borderRadius: 22,
  },
  skeletonBadge: {
    width: 80,
    height: 28,
    backgroundColor: Colors.border,
    borderRadius: 12,
  },
});
