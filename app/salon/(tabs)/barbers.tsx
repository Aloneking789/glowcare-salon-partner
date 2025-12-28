import { Plus, Star, Briefcase, Phone, Mail } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function Barbers() {
  const barbers = [
    { 
      id: '1', 
      name: 'Amit Kumar', 
      specialty: ['Haircut', 'Shave'], 
      experience: '5 years', 
      rating: 4.8, 
      status: 'active',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      phone: '+919876543210',
      completedServices: 1234,
    },
    { 
      id: '2', 
      name: 'Rohit Singh', 
      specialty: ['Hair Color', 'Styling'], 
      experience: '4 years', 
      rating: 4.6, 
      status: 'active',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      phone: '+919876543211',
      completedServices: 987,
    },
    { 
      id: '3', 
      name: 'Raj Patel', 
      specialty: ['Haircut', 'Beard Trim'], 
      experience: '3 years', 
      rating: 4.7, 
      status: 'busy',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      phone: '+919876543212',
      completedServices: 756,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Staff</Text>
          <Text style={styles.subtitle}>{barbers.length} team members</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {barbers.map((barber) => (
          <View key={barber.id} style={styles.barberCard}>
            <View style={styles.barberHeader}>
              <Image 
                source={{ uri: barber.image }} 
                style={styles.barberImage}
              />
              <View style={styles.barberInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.barberName}>{barber.name}</Text>
                  <View style={[styles.statusDot, barber.status === 'active' ? styles.statusActive : styles.statusBusy]} />
                </View>
                <View style={styles.ratingContainer}>
                  <Star size={14} color={Colors.accent} fill={Colors.accent} />
                  <Text style={styles.rating}>{barber.rating}</Text>
                  <Text style={styles.ratingDivider}>•</Text>
                  <Briefcase size={14} color={Colors.textLight} />
                  <Text style={styles.experience}>{barber.experience}</Text>
                </View>
              </View>
            </View>

            <View style={styles.specialtiesSection}>
              <Text style={styles.specialtiesLabel}>Specialties</Text>
              <View style={styles.specialties}>
                {barber.specialty.map((spec, idx) => (
                  <View key={idx} style={styles.specialtyBadge}>
                    <Text style={styles.specialtyText}>{spec}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{barber.completedServices}</Text>
                <Text style={styles.statLabel}>Services</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statusBadgeText, { color: barber.status === 'active' ? Colors.success : Colors.warning }]}>
                  {barber.status === 'active' ? 'Available' : 'Busy'}
                </Text>
                <Text style={styles.statLabel}>Status</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={18} color={Colors.salon} />
                <Text style={styles.actionButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Mail size={18} color={Colors.salon} />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButtonPrimary}
                onPress={() => console.log('View profile', barber.id)}
              >
                <Text style={styles.actionButtonPrimaryText}>Assign Jobs</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addStaffButton}>
          <LinearGradient
            colors={[Colors.salon, Colors.primaryDark]}
            style={styles.addStaffGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Plus size={22} color={Colors.white} />
            <Text style={styles.addStaffText}>Add New Staff Member</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 20,
    paddingTop: 12,
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.salon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  barberCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  barberHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  barberImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 12,
  },
  barberInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  barberName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  ratingDivider: {
    fontSize: 14,
    color: Colors.textMuted,
    marginHorizontal: 4,
  },
  experience: {
    fontSize: 13,
    color: Colors.textLight,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusActive: {
    backgroundColor: Colors.success,
  },
  statusBusy: {
    backgroundColor: Colors.warning,
  },
  specialtiesSection: {
    marginBottom: 16,
  },
  specialtiesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 8,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.salon + '15',
  },
  specialtyText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.salon,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
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
  },
  statusBadgeText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.salon + '15',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.salon,
  },
  actionButtonPrimary: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.salon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  addStaffButton: {
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.salon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  addStaffGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  addStaffText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
