import { MapPin, Navigation, Phone, CheckCircle, Clock, MessageCircle } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function Active() {
  const activeJob = {
    id: '1',
    customerName: 'Priya Sharma',
    customerPhone: '+919876543210',
    customerAddress: '123 MG Road, Connaught Place, Delhi',
    services: ['Haircut', 'Hair Styling'],
    scheduledTime: '2:00 PM',
    status: 'accepted' as const,
    payment: 899,
    location: { lat: 28.6139, lng: 77.2090 },
    customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    estimatedDuration: '60 mins',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Job</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>In Progress</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, styles.progressDotActive]}>
              <CheckCircle size={16} color={Colors.white} />
            </View>
            <Text style={styles.progressLabel}>Accepted</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot}>
              <Navigation size={16} color={Colors.textLight} />
            </View>
            <Text style={styles.progressLabel}>Navigate</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot}>
              <MapPin size={16} color={Colors.textLight} />
            </View>
            <Text style={styles.progressLabel}>Arrived</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.progressDot}>
              <Clock size={16} color={Colors.textLight} />
            </View>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>

        <View style={styles.customerCard}>
          <View style={styles.customerHeader}>
            <Image 
              source={{ uri: activeJob.customerImage }} 
              style={styles.customerImage}
            />
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{activeJob.customerName}</Text>
              <View style={styles.timeRow}>
                <Clock size={14} color={Colors.textLight} />
                <Text style={styles.scheduledTime}>Scheduled: {activeJob.scheduledTime}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Phone size={18} color={Colors.partner} />
              </View>
              <Text style={styles.detailText}>{activeJob.customerPhone}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <MapPin size={18} color={Colors.partner} />
              </View>
              <Text style={styles.detailText}>{activeJob.customerAddress}</Text>
            </View>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionLabel}>Services</Text>
            <View style={styles.services}>
              {activeJob.services.map((service, idx) => (
                <View key={idx} style={styles.serviceBadge}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{activeJob.estimatedDuration}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Payment</Text>
              <Text style={styles.infoValue}>₹{activeJob.payment}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.iconAction}>
            <View style={styles.iconActionButton}>
              <Phone size={22} color={Colors.partner} />
            </View>
            <Text style={styles.iconActionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconAction}>
            <View style={styles.iconActionButton}>
              <MessageCircle size={22} color={Colors.partner} />
            </View>
            <Text style={styles.iconActionText}>Message</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.navigateButton}
          onPress={() => console.log('Navigate to customer')}
        >
          <LinearGradient
            colors={[Colors.partner, Colors.primaryDark]}
            style={styles.navigateGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Navigation size={20} color={Colors.white} />
            <Text style={styles.navigateText}>Start Navigation</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.arrivedButton}
          onPress={() => console.log('Mark arrived')}
        >
          <Text style={styles.arrivedText}>Mark as Arrived</Text>
        </TouchableOpacity>

        <View style={styles.startJobSection}>
          <TouchableOpacity 
            style={styles.startJobButton}
            onPress={() => console.log('Start job')}
          >
            <LinearGradient
              colors={[Colors.info, '#0ea5e9']}
              style={styles.startJobGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Clock size={20} color={Colors.white} />
              <Text style={styles.startJobText}>Start Job</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => console.log('Complete job')}
        >
          <LinearGradient
            colors={[Colors.success, '#059669']}
            style={styles.completeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <CheckCircle size={20} color={Colors.white} />
            <Text style={styles.completeText}>✓ Complete Job</Text>
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
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.success + '20',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  progressStep: {
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: Colors.success,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textLight,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 4,
  },
  customerCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scheduledTime: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 20,
  },
  detailsSection: {
    gap: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.partner + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  servicesSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 12,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.partner + '15',
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.partner,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.borderLight,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  iconAction: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  iconActionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.partner + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  navigateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 4,
    shadowColor: Colors.partner,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navigateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
  },
  navigateText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  arrivedButton: {
    height: 56,
    backgroundColor: Colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.partner,
    marginBottom: 16,
  },
  arrivedText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.partner,
  },
  startJobSection: {
    marginBottom: 12,
  },
  startJobButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.info,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  startJobGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
  },
  startJobText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  completeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  completeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
  },
  completeText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
