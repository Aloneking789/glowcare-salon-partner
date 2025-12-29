import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { apiService, ApiError, CreateServiceRequest, ServiceData } from '@/services/api';
import Colors from '@/constants/colors';
import { usePopup } from '@/components/popup';

// Default placeholder images for different categories
const getCategoryImage = (category: string): string => {
  const images: { [key: string]: string } = {
    haircut: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400',
    shave: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    color: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400',
    facial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    spa: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    trim: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
    default: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
  };
  return images[category.toLowerCase()] || images.default;
};

export default function Services() {
  const { user } = useAuth();
  const { showPopup } = usePopup();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<CreateServiceRequest>({
    name: '',
    duration: 0,
    price: 0,
    category: '',
  });

  const [services, setServices] = useState<(ServiceData & { image: string })[]>([]);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    if (!user?.token) {
      setIsFetching(false);
      return;
    }

    setIsFetching(true);

    try {
      const response = await apiService.getSalonServices(user.token);

      if (response.success) {
        // Add image to each service based on category
        const servicesWithImages = response.data.map(service => ({
          ...service,
          image: getCategoryImage(service.category),
        }));
        setServices(servicesWithImages);
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Failed to fetch services:', apiError.message);
      // Don't show alert on initial load, just log the error
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenModal = () => {
    console.log('Opening modal, current modalVisible:', modalVisible);
    // showPopup({ variant: 'info', title: 'Debug', message: 'Button pressed! Opening modal...' });
    setFormData({ name: '', duration: 0, price: 0, category: '' });
    setModalVisible(true);
    console.log('Modal should now be visible');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFormData({ name: '', duration: 0, price: 0, category: '' });
  };

  const handleCreateService = async () => {
    // Validation
    if (!formData.name.trim()) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter service name' });
      return;
    }
    if (!formData.category.trim()) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter service category' });
      return;
    }
    if (formData.duration <= 0) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter valid duration (greater than 0)' });
      return;
    }
    if (formData.price <= 0) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter valid price (greater than 0)' });
      return;
    }

    if (!user?.token) {
      showPopup({ variant: 'error', title: 'Error', message: 'You must be logged in to create a service' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.createService(user.token, formData);

      if (response.success) {
        // Refresh the services list from API
        await fetchServices();
        
        showPopup({ variant: 'success', title: 'Success', message: 'Service created successfully!' });
        handleCloseModal();
      }
    } catch (error) {
      const apiError = error as ApiError;
      let errorMessage = apiError.message || 'Failed to create service. Please try again.';
      
      if (apiError.errors) {
        const errorMessages = Object.values(apiError.errors).flat();
        errorMessage = errorMessages.join('\n');
      }

      showPopup({ variant: 'error', title: 'Failed to Create Service', message: errorMessage, durationMs: 3500 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string, serviceName: string) => {
    if (!user?.token) {
      showPopup({ variant: 'error', title: 'Error', message: 'You must be logged in to delete a service' });
      return;
    }

    showPopup({
      variant: 'warning',
      title: 'Delete Service',
      message: `Are you sure you want to delete "${serviceName}"?`,
      durationMs: 0,
      actions: {
        secondary: { label: 'Cancel', onPress: () => {} },
        primary: {
          label: 'Delete',
          onPress: async () => {
            setIsLoading(true);
            try {
              const response = await apiService.deleteService(user.token!, serviceId);

              if (response.success) {
                await fetchServices();
                showPopup({ variant: 'success', title: 'Success', message: 'Service deleted successfully!' });
              }
            } catch (error) {
              const apiError = error as ApiError;
              showPopup({
                variant: 'error',
                title: 'Failed to Delete',
                message: apiError.message || 'Could not delete service',
                durationMs: 3500,
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Services</Text>
          <Text style={styles.subtitle}>{services.length} services available</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={fetchServices}
            disabled={isFetching}
          >
            <Ionicons name="refresh-outline" 
              size={18} 
              color={isFetching ? Colors.textMuted : Colors.salon} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleOpenModal}
            activeOpacity={0.7}
            testID="add-service-button"
          >
            <Ionicons name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isFetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.salon} />
            <Text style={styles.loadingText}>Loading services...</Text>
          </View>
        ) : services.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Services Yet</Text>
            <Text style={styles.emptyText}>
              Start by adding your first service to get bookings
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton} 
              onPress={handleOpenModal}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Ionicons name="add" size={20} color={Colors.white} />
              <Text style={styles.emptyButtonText}>Add First Service</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteService(service.id, service.name)}
                  >
                    <Ionicons name="trash-outline" size={16} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.serviceBottom}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceMeta}>
                    <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.metaText}>{service.duration} min</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.servicePrice}>₹{service.price}</Text>
                    <TouchableOpacity style={styles.editButton}>
                      <Ionicons name="create-outline" size={14} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {services.length > 0 && (
          <TouchableOpacity 
            style={styles.addServiceButton} 
            onPress={handleOpenModal}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <LinearGradient
              colors={[Colors.salon, Colors.primaryDark]}
              style={styles.addServiceGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="add" size={22} color={Colors.white} />
              <Text style={styles.addServiceText}>Add New Service</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
          </>
        )}
      </ScrollView>

      {/* Add Service Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Service</Text>
                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Service Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Haircut, Shave, Facial"
                    placeholderTextColor={Colors.textMuted}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Category *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., haircut, shave, facial"
                    placeholderTextColor={Colors.textMuted}
                    value={formData.category}
                    onChangeText={(text) => setFormData({ ...formData, category: text.toLowerCase() })}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Duration (min) *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="30"
                      placeholderTextColor={Colors.textMuted}
                      keyboardType="numeric"
                      value={formData.duration > 0 ? formData.duration.toString() : ''}
                      onChangeText={(text) => setFormData({ ...formData, duration: parseInt(text) || 0 })}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Price (₹) *</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="199"
                      placeholderTextColor={Colors.textMuted}
                      keyboardType="numeric"
                      value={formData.price > 0 ? formData.price.toString() : ''}
                      onChangeText={(text) => setFormData({ ...formData, price: parseInt(text) || 0 })}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.createButton, isLoading && styles.createButtonDisabled]}
                  onPress={handleCreateService}
                  disabled={isLoading}
                >
                  <Text style={styles.createButtonText}>
                    {isLoading ? 'Creating...' : 'Create Service'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
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
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.salon,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  serviceCard: {
    width: '48%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
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
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(220, 38, 38, 0.85)',
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
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  createButton: {
    height: 52,
    backgroundColor: Colors.salon,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
