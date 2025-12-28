import { LogOut, Phone, Mail, Settings, Tag } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/colors';

export default function Profile() {
  const { user, logout } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);

  const skills = ['Haircut', 'Makeup', 'Facial', 'Spa'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'P'}</Text>
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Mail size={16} color={Colors.textLight} />
              <Text style={styles.contactText}>{user?.email}</Text>
            </View>
            {user?.phone && (
              <View style={styles.contactItem}>
                <Phone size={16} color={Colors.textLight} />
                <Text style={styles.contactText}>{user.phone}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityInfo}>
              <Text style={styles.availabilityTitle}>Available for Jobs</Text>
              <Text style={styles.availabilitySubtitle}>
                {isAvailable ? 'You are accepting job requests' : 'You won&apos;t receive new jobs'}
              </Text>
            </View>
            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: Colors.border, true: Colors.partner + '40' }}
              thumbColor={isAvailable ? Colors.partner : Colors.textMuted}
            />
          </View>

          <View style={styles.skillsCard}>
            <View style={styles.skillsHeader}>
              <Tag size={20} color={Colors.partner} />
              <Text style={styles.skillsTitle}>My Skills</Text>
            </View>
            <View style={styles.skills}>
              {skills.map((skill, idx) => (
                <View key={idx} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Settings size={22} color={Colors.partner} strokeWidth={2} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Settings</Text>
              <Text style={styles.menuSubtitle}>Update profile and preferences</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
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
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    margin: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.partner + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.partner,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  contactInfo: {
    gap: 8,
    alignSelf: 'stretch',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    paddingHorizontal: 20,
    gap: 12,
  },
  availabilityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
  },
  availabilityInfo: {
    flex: 1,
    marginRight: 16,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  availabilitySubtitle: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 18,
  },
  skillsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
  },
  skillsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.partner + '15',
  },
  skillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.partner,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.partner + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: Colors.textLight,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.errorLight,
    borderRadius: 16,
    padding: 16,
    margin: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
});
