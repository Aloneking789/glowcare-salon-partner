import { useRouter } from 'expo-router';
import { Store, Scissors } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function RoleSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to GlamHub</Text>
          <Text style={styles.subtitle}>Choose your account type to continue</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push('/salon-login')}
          >
            <LinearGradient
              colors={[Colors.salon, Colors.primaryDark]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconContainer}>
                <Store size={48} color={Colors.white} strokeWidth={1.5} />
              </View>
              <Text style={styles.cardTitle}>Salon Owner</Text>
              <Text style={styles.cardDescription}>
                Manage your salon, staff, bookings and services
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => router.push('/partner-login')}
          >
            <LinearGradient
              colors={[Colors.partner, '#4A7A8F']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconContainer}>
                <Scissors size={48} color={Colors.white} strokeWidth={1.5} />
              </View>
              <Text style={styles.cardTitle}>Service Partner</Text>
              <Text style={styles.cardDescription}>
                Accept jobs, manage bookings and earn money
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 20,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  gradient: {
    padding: 32,
    minHeight: 220,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
});
