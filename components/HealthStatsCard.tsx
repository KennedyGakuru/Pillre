import { View, Text, StyleSheet } from 'react-native';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface HealthStatsCardProps {
  stats: Stat[];
}

export default function HealthStatsCard({ stats }: HealthStatsCardProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View 
          key={stat.label} 
          style={[
            styles.statItem,
            index < stats.length - 1 && styles.withDivider
          ]}
        >
          <View style={styles.iconContainer}>
            {stat.icon}
          </View>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  withDivider: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});