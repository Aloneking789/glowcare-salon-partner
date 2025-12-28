import { Edit, Plus, Clock } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function Services() {
  const services = [
    { id: '1', name: 'Haircut', duration: 30, price: 199, category: 'haircut', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400' },
    { id: '2', name: 'Shave', duration: 20, price: 99, category: 'shave', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400' },
    { id: '3', name: 'Hair Color', duration: 90, price: 1499, category: 'color', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400' },
    { id: '4', name: 'Beard Trim', duration: 15, price: 79, category: 'shave', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400' },
    { id: '5', name: 'Facial', duration: 45, price: 599, category: 'facial', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' },
    { id: '6', name: 'Hair Spa', duration: 60, price: 799, category: 'spa', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Services</Text>
          <Text style={styles.subtitle}>{services.length} services available</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image 
                source={{ uri: service.image }} 
                style={styles.serviceImage}
              />
              <View style={styles.overlay} />
              <View style={styles.serviceContent}>
                <View style={styles.serviceTop}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{service.category}</Text>
                  </View>
                </View>
                <View style={styles.serviceBottom}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceMeta}>
                    <Clock size={12} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.metaText}>{service.duration} min</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.servicePrice}>₹{service.price}</Text>
                    <TouchableOpacity style={styles.editButton}>
                      <Edit size={14} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addServiceButton}>
          <LinearGradient
            colors={[Colors.salon, Colors.primaryDark]}
            style={styles.addServiceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Plus size={22} color={Colors.white} />
            <Text style={styles.addServiceText}>Add New Service</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  serviceCard: {
    width: '48.5%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  serviceContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  serviceTop: {
    alignItems: 'flex-start',
  },
  serviceBottom: {
    gap: 6,
  },
  serviceName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
    textTransform: 'capitalize',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addServiceButton: {
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
  addServiceGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  addServiceText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
