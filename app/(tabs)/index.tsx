import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'context/AuthContext';
import { router } from 'expo-router';
import DashboardHeader from 'components/DashboardHeader';
import NextMedicationCard from 'components/NextMedicationCard';
import UpcomingAppointmentCard from 'components/UpcomingAppointmentCard';
import HealthStatsCard from 'components/HealthStatsCard';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuth();
  
  const upcomingMedications = [
    { id: '1', name: 'Lisinopril', dosage: '10mg', time: '09:00 AM', type: 'Tablet' },
    { id: '2', name: 'Metformin', dosage: '500mg', time: '01:00 PM', type: 'Tablet' },
    { id: '3', name: 'Vitamin D', dosage: '1000 IU', time: '09:00 PM', type: 'Capsule' },
  ];
  
  const upcomingAppointments = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2025-05-25',
      time: '10:30 AM',
      location: 'Heart Care Center',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Endocrinologist',
      date: '2025-06-02',
      time: '2:15 PM',
      location: 'Diabetes Management Clinic',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DashboardHeader name={user?.name || 'User'} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Medications</Text>
            <TouchableOpacity 
              style={styles.sectionButton}
              onPress={() => router.push('/medications')}
            >
              <Text style={styles.sectionButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.medicationsContainer}>
            {upcomingMedications.map((medication) => (
              <NextMedicationCard key={medication.id} medication={medication} />
            ))}
            
            <TouchableOpacity 
              style={styles.addButtonContainer}
              onPress={() => router.push('/(medications)/add')}
            >
              <View style={styles.addButton}>
                <Ionicons name="add" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.addButtonText}>Add Medicine</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity 
              style={styles.sectionButton}
              onPress={() => router.push('/appointments')}
            >
              <Text style={styles.sectionButtonText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.map((appointment) => (
            <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
          ))}
          
          <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.scheduleButtonText}>Book New Appointment</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Statistics</Text>
          </View>
          
          <HealthStatsCard 
            stats={[
              { label: 'Adherence', value: '85%', icon: <Ionicons name="medkit" size={20} color="#3B82F6" /> },
              { label: 'Appointments', value: '2', icon: <Ionicons name="time" size={20} color="#3B82F6" /> },
              { label: 'Reminders', value: '8', icon: <Ionicons name="notifications" size={20} color="#3B82F6" /> },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  sectionButton: {
    padding: 4,
  },
  sectionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  medicationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addButtonContainer: {
    width: '31%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    backgroundColor: '#F9FAFB',
    padding: 12,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3B82F6',
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  scheduleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});