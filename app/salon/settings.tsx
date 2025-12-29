import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

type Mode = 'slot' | 'queue' | 'hybrid';

interface TimeBlock {
  id: string;
  start: string;
  end: string;
  mode: 'slot' | 'queue';
}

export default function SalonSettings() {
  const [mode, setMode] = useState<Mode>('hybrid');
  const [operatingHours] = useState({ start: '09:00', end: '21:00' });
  const [timeBlocks] = useState<TimeBlock[]>([
    { id: '1', start: '09:00', end: '14:00', mode: 'slot' },
    { id: '2', start: '14:00', end: '21:00', mode: 'queue' },
  ]);

  const modes: { key: Mode; title: string; description: string }[] = [
    { key: 'slot', title: 'Slot Booking', description: 'Customers book specific time slots' },
    { key: 'queue', title: 'Queue System', description: 'Walk-in customers get queue numbers' },
    { key: 'hybrid', title: 'Hybrid Mode', description: 'Combine slots and queue with time blocks' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Salon Settings</Text>
          <Text style={styles.subtitle}>Configure your booking system</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="layers" size={20} color={Colors.salon} />
            <Text style={styles.sectionTitle}>Booking Mode</Text>
          </View>

          {modes.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.modeCard, mode === item.key && styles.modeCardActive]}
              onPress={() => setMode(item.key)}
            >
              <View style={styles.modeContent}>
                <View style={styles.modeHeader}>
                  <Text style={[styles.modeTitle, mode === item.key && styles.modeTextActive]}>
                    {item.title}
                  </Text>
                  <View style={styles.radioOuter}>
                    {mode === item.key && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={[styles.modeDescription, mode === item.key && styles.modeDescActive]}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {mode === 'hybrid' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={20} color={Colors.salon} />
              <Text style={styles.sectionTitle}>Time Blocks</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Set different modes for different times of the day
            </Text>

            {timeBlocks.map((block) => (
              <View key={block.id} style={styles.blockCard}>
                <View style={styles.blockTime}>
                  <Ionicons name="time" size={16} color={Colors.textLight} />
                  <Text style={styles.blockTimeText}>
                    {block.start} - {block.end}
                  </Text>
                </View>
                <View style={[styles.blockModeBadge, { backgroundColor: block.mode === 'slot' ? Colors.info + '20' : Colors.accent + '20' }]}>
                  <Text style={[styles.blockModeText, { color: block.mode === 'slot' ? Colors.info : Colors.accent }]}>
                    {block.mode === 'slot' ? 'Slot Booking' : 'Queue System'}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.addBlockButton}>
              <Text style={styles.addBlockText}>+ Add Time Block</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color={Colors.salon} />
            <Text style={styles.sectionTitle}>Operating Hours</Text>
          </View>

          <View style={styles.hoursCard}>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Opening Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeButtonText}>{operatingHours.start}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              </TouchableOpacity>
            </View>
            <View style={styles.hoursDivider} />
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Closing Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeButtonText}>{operatingHours.end}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color={Colors.salon} />
            <Text style={styles.sectionTitle}>Additional Settings</Text>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Auto-confirm bookings</Text>
                <Text style={styles.settingDesc}>Automatically accept new bookings</Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: Colors.border, true: Colors.salon }}
                thumbColor={Colors.white}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Send notifications</Text>
                <Text style={styles.settingDesc}>Notify customers about their bookings</Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: Colors.border, true: Colors.salon }}
                thumbColor={Colors.white}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Buffer time</Text>
                <Text style={styles.settingDesc}>Time between appointments (mins)</Text>
              </View>
              <TouchableOpacity style={styles.valueButton}>
                <Text style={styles.valueButtonText}>15 mins</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
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
    padding: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 12,
  },
  modeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  modeCardActive: {
    borderColor: Colors.salon,
    backgroundColor: Colors.salon + '08',
  },
  modeContent: {
    gap: 8,
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  modeTextActive: {
    color: Colors.salon,
  },
  modeDescription: {
    fontSize: 13,
    color: Colors.textLight,
  },
  modeDescActive: {
    color: Colors.text,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.salon,
  },
  blockCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  blockTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blockTimeText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  blockModeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  blockModeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addBlockButton: {
    backgroundColor: Colors.salon + '15',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addBlockText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.salon,
  },
  hoursCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hoursLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.salon,
  },
  hoursDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  settingCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 13,
    color: Colors.textLight,
  },
  valueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  valueButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.salon,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    margin: 20,
    marginTop: 8,
    elevation: 4,
    shadowColor: Colors.salon,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
