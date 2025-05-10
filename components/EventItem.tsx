import React = require('react');
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface EventItemProps {
  title: string;
  subtitle: string;
  type: 'medication' | 'appointment';
}

export default function EventItem({ title, subtitle, type }: EventItemProps) {
  const handlePress = () => {
    // Navigate based on event type
    if (type === 'medication') {
      // This is simplified - in a real app, you'd pass an ID
      router.push('/medications');
    } else {
      router.push('/appointments');
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        type === 'medication' ? styles.medicationContainer : styles.appointmentContainer
      ]}
      onPress={handlePress}
    >
      <View 
        style={[
          styles.indicator,
          type === 'medication' ? styles.medicationIndicator : styles.appointmentIndicator
        ]}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medicationContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  appointmentContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  medicationIndicator: {
    backgroundColor: '#10B981',
  },
  appointmentIndicator: {
    backgroundColor: '#3B82F6',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});