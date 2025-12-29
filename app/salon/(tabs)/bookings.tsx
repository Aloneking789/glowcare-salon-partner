import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Booking } from '@/types';

export default function Bookings() {
  const [filter, setFilter] = useState<'today' | 'tomorrow' | 'week' | 'pending' | 'completed'>('today');

  const bookings: Booking[] = [
    {
      id: '1',
      customerName: 'Rahul Kumar',
      customerPhone: '+919876543210',
      service: 'Haircut + Shave',
      barber: 'Amit',
      date: 'Today',
      time: '10:30 AM',
      status: 'in-progress',
      type: 'slot',
      price: 399,
      customerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      id: '2',
      customerName: 'Priya Singh',
      customerPhone: '+919876543211',
      service: 'Hair Color',
      barber: 'Rohit',
      date: 'Today',
      time: '11:00 AM',
      status: 'upcoming',
      type: 'slot',
      price: 1499,
      customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      customerPhone: '+919876543212',
      service: 'Haircut',
      date: 'Today',
      time: '11:30 AM',
      status: 'upcoming',
      type: 'queue',
      price: 199,
      customerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    {
      id: '4',
      customerName: 'Neha Sharma',
      customerPhone: '+919876543213',
      service: 'Facial + Cleanup',
      barber: 'Pooja',
      date: 'Today',
      time: '12:00 PM',
      status: 'pending',
      type: 'slot',
      price: 899,
      customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    {
      id: '5',
      customerName: 'Vikram Singh',
      customerPhone: '+919876543214',
      service: 'Hair Spa',
      barber: 'Raj',
      date: 'Yesterday',
      time: '05:00 PM',
      status: 'completed',
      type: 'slot',
      price: 799,
      customerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    },
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return Colors.warning;
      case 'upcoming': return Colors.info;
      case 'in-progress': return Colors.accent;
      case 'completed': return Colors.success;
      default: return Colors.textMuted;
    }
  };

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'today', label: "Today's Bookings" },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'week', label: 'This Week' },
    { key: 'pending', label: 'Pending Approval' },
    { key: 'completed', label: 'Completed' },
  ];

  const renderFilterItem = ({ item }: { item: typeof filters[0] }) => (
    <TouchableOpacity
      style={[styles.filterChip, filter === item.key && styles.filterChipActive]}
      onPress={() => setFilter(item.key)}
    >
      <Text style={[styles.filterText, filter === item.key && styles.filterTextActive]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderBookingItem = ({ item: booking }: { item: Booking }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Image 
          source={{ uri: booking.customerImage }} 
          style={styles.customerImage}
        />
        <View style={styles.customerInfo}>
          <View style={styles.customerTop}>
            <Text style={styles.customerName}>{booking.customerName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                {booking.status.replace('-', ' ')}
              </Text>
            </View>
          </View>
          <Text style={styles.serviceText}>{booking.service}</Text>
          <View style={styles.timeInfo}>
            <Text style={styles.timeText}>{booking.date} • {booking.time}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{booking.type}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bookingMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="person-outline" size={16} color={Colors.textLight} />
          <Text style={styles.metaText}>{booking.barber || 'Not assigned'}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.priceText}>₹{booking.price}</Text>
        </View>
      </View>

      {booking.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call-outline" size={18} color={Colors.salon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.salon} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonSecondary}
            onPress={() => console.log('Reject booking', booking.id)}
          >
            <Text style={styles.actionButtonSecondaryText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonPrimary}
            onPress={() => console.log('Accept booking', booking.id)}
          >
            <Text style={styles.actionButtonPrimaryText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
      {booking.status === 'upcoming' && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call-outline" size={18} color={Colors.salon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={18} color={Colors.salon} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonSecondary}
            onPress={() => console.log('Cancel booking', booking.id)}
          >
            <Text style={styles.actionButtonSecondaryText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButtonPrimary, styles.startServiceButton]}
            onPress={() => console.log('Start service', booking.id)}
          >
            <Text style={styles.actionButtonPrimaryText}>Start Service</Text>
          </TouchableOpacity>
        </View>
      )}
      {booking.status === 'in-progress' && (
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => console.log('Complete service', booking.id)}
        >
          <LinearGradient
            colors={[Colors.success, '#059669']}
            style={styles.completeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.completeButtonText}>✓ Complete Service</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bookings</Text>
          <Text style={styles.subtitle}>Manage all appointments</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="funnel-outline" size={20} color={Colors.salon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filters}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={styles.filterList}
      />

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.salon + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterList: {
    flexGrow: 0,
  },
  filters: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 46,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: Colors.salon,
    borderColor: Colors.salon,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  customerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  serviceText: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.surface,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text,
    textTransform: 'capitalize',
  },
  bookingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border + '40',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.salon,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.salon + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonSecondary: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  actionButtonSecondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  actionButtonPrimary: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.salon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startServiceButton: {
    flex: 1.5,
  },
  actionButtonPrimaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  completeButton: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  completeGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});