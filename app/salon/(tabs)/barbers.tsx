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
import { apiService, ApiError, CreateBarberRequest, BarberData } from '@/services/api';
import Colors from '@/constants/colors';
import { usePopup } from '@/components/popup';

export default function Barbers() {
  const { user } = useAuth();
  const { showPopup } = usePopup();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<CreateBarberRequest>({
    name: '',
    specialty: [],
    experience: '',
    image: '',
  });
  const [specialtyInput, setSpecialtyInput] = useState('');

  const [barbers, setBarbers] = useState<BarberData[]>([]);

  // Fetch barbers on component mount
  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    if (!user?.token) {
      setIsFetching(false);
      return;
    }

    try {
      setIsFetching(true);
      const response = await apiService.getBarbers(user.token);
      if (response.success) {
        setBarbers(response.data);
      }
    } catch (error) {
      const apiError = error as ApiError;
      showPopup({
        variant: 'error',
        title: 'Error',
        message: apiError.message || 'Failed to fetch staff',
        durationMs: 3500,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({ name: '', specialty: [], experience: '', image: '' });
    setSpecialtyInput('');
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setFormData({ name: '', specialty: [], experience: '', image: '' });
    setSpecialtyInput('');
  };

  const handleAddSpecialty = () => {
    const trimmed = specialtyInput.trim().toLowerCase();
    if (trimmed && !formData.specialty.includes(trimmed)) {
      setFormData({ ...formData, specialty: [...formData.specialty, trimmed] });
      setSpecialtyInput('');
    }
  };

  const handleRemoveSpecialty = (spec: string) => {
    setFormData({ 
      ...formData, 
      specialty: formData.specialty.filter(s => s !== spec) 
    });
  };

  const handleAddBarber = async () => {
    // Validation
    if (!formData.name.trim()) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter staff name' });
      return;
    }
    if (formData.specialty.length === 0) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please add at least one specialty' });
      return;
    }
    if (!formData.experience.trim()) {
      showPopup({ variant: 'error', title: 'Error', message: 'Please enter experience' });
      return;
    }

    if (!user?.token) {
      showPopup({ variant: 'error', title: 'Error', message: 'You must be logged in to add staff' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.addBarber(user.token, formData);

      if (response.success) {
        await fetchBarbers();
        showPopup({ variant: 'success', title: 'Success', message: 'Staff member added successfully!' });
        handleCloseModal();
      }
    } catch (error) {
      const apiError = error as ApiError;
      let errorMessage = apiError.message || 'Failed to add barber. Please try again.';
      
      if (apiError.errors) {
        const errorMessages = Object.values(apiError.errors).flat();
        errorMessage = errorMessages.join('\n');
      }

      showPopup({ variant: 'error', title: 'Failed to Add Staff', message: errorMessage, durationMs: 3500 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Staff</Text>
          <Text style={styles.subtitle}>{barbers.length} team members</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
          <Ionicons name="add" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isFetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.salon} />
            <Text style={styles.loadingText}>Loading staff...</Text>
          </View>
        ) : barbers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Staff Members Yet</Text>
            <Text style={styles.emptyText}>
              Start by adding your first staff member
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton} 
              onPress={handleOpenModal}
              disabled={isLoading}
            >
              <Ionicons name="add" size={20} color={Colors.white} />
              <Text style={styles.emptyButtonText}>Add First Staff</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {barbers.map((barber) => (
              <View key={barber.id} style={styles.barberCard}>
                <View style={styles.barberHeader}>
                  <Image 
                    source={{ uri: barber.imageUrl || 'https://via.placeholder.com/150' }} 
                    style={styles.barberImage}
                  />
                  <View style={styles.barberInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.barberName}>{barber.name}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="briefcase" size={14} color={Colors.textLight} />
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

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="call" size={18} color={Colors.salon} />
                    <Text style={styles.actionButtonText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="mail" size={18} color={Colors.salon} />
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

            <TouchableOpacity 
              style={styles.addStaffButton} 
              onPress={handleOpenModal}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.salon, Colors.primaryDark]}
                style={styles.addStaffGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="add" size={22} color={Colors.white} />
                <Text style={styles.addStaffText}>Add New Staff Member</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Add Barber Modal */}
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
                <Text style={styles.modalTitle}>Add New Staff</Text>
                <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Amit Kumar"
                    placeholderTextColor={Colors.textMuted}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Specialties *</Text>
                  <View style={styles.specialtyInputContainer}>
                    <TextInput
                      style={[styles.input, styles.specialtyInput]}
                      placeholder="e.g., haircut, shave, color"
                      placeholderTextColor={Colors.textMuted}
                      value={specialtyInput}
                      onChangeText={setSpecialtyInput}
                      onSubmitEditing={handleAddSpecialty}
                      returnKeyType="done"
                    />
                    <TouchableOpacity 
                      style={styles.addSpecialtyButton} 
                      onPress={handleAddSpecialty}
                    >
                      <Ionicons name="add" size={20} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                  {formData.specialty.length > 0 && (
                    <View style={styles.addedSpecialties}>
                      {formData.specialty.map((spec, idx) => (
                        <View key={idx} style={styles.addedSpecialtyChip}>
                          <Text style={styles.addedSpecialtyText}>{spec}</Text>
                          <TouchableOpacity onPress={() => handleRemoveSpecialty(spec)}>
                            <Ionicons name="close" size={16} color={Colors.salon} />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Experience *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 5 years"
                    placeholderTextColor={Colors.textMuted}
                    value={formData.experience}
                    onChangeText={(text) => setFormData({ ...formData, experience: text })}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Image URL (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="https://example.com/image.jpg"
                    placeholderTextColor={Colors.textMuted}
                    value={formData.image}
                    onChangeText={(text) => setFormData({ ...formData, image: text })}
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.createButton, isLoading && styles.createButtonDisabled]}
                  onPress={handleAddBarber}
                  disabled={isLoading}
                >
                  <Text style={styles.createButtonText}>
                    {isLoading ? 'Adding...' : 'Add Staff Member'}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
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
    maxHeight: '85%',
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  specialtyInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  specialtyInput: {
    flex: 1,
  },
  addSpecialtyButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.salon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addedSpecialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  addedSpecialtyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.salon + '15',
  },
  addedSpecialtyText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.salon,
  },
  createButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: Colors.salon,
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

