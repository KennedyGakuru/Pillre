import React = require('react');
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Pillicon from './Pillicon';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  type: string;
  startDate?: string;
  frequency?: string;
}

interface MedicationListItemProps {
  medication: Medication;
  onPress: () => void;
}

export default function MedicationListItem({ medication, onPress }: MedicationListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Pillicon width={30} height={24}  />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{medication.name}</Text>
        <Text style={styles.details}>{medication.dosage} • {medication.type}</Text>
      </View>
      
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{medication.time}</Text>
        <View style={styles.statusIndicator} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  details: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  timeContainer: {
    alignItems: 'center',
  },
  time: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
});