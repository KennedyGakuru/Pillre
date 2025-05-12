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
import { useTheme } from 'theme/colorScheme';

export default function HomeScreen() {
  const { user } = useAuth();
  const {theme} = useTheme();
  
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
    <SafeAreaView 
          edges={['top', 'left', 'right']}
          className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}
        >
      <DashboardHeader name={user?.name || 'User'} />
      
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        <View className='mb-6'>
          <View className='flex-row justify-between items-center m-4'>
            <Text className={`font-inter-semibold text-lg ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>Today's Medications</Text>
            <TouchableOpacity 
              className='p-1'
              onPress={() => router.push('/medications')}
            >
              <Text className="font-medium text-sm text-primary">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View  className="flex-row flex-wrap justify-between">
            {upcomingMedications.map((medication) => (
              <NextMedicationCard key={medication.id} medication={medication} />
            ))}
            
            <TouchableOpacity 
              style={styles.addButtonContainer}
              className={`w-[31%] aspect-square justify-center items-center rounded-2xl border-2 border-dashed border-gray-300  ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}
              onPress={() => router.push('/(medications)/add')}
            >
              <View  className='w-12 h-12 rounded-full bg-blue-100 justify-center items-center mb-2'>
                <Ionicons name="add" size={24} color="#3B82F6" />
              </View>
              <Text className='font-medium text-xs text-primary text-center'>Add Medicine</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View className='mb-6'>
          <View  className='flex-row justify-between items-center mb-4'>
            <Text className={`font-inter-bold text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Upcoming Appointments</Text>
            <TouchableOpacity 
             className='p-1'
              onPress={() => router.push('/appointments')}
            >
              <Text className="font-medium text-sm text-primary">See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingAppointments.map((appointment) => (
            <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
          ))}
          
          <TouchableOpacity 
             className='bg-primary rounded-lg py-3 items-center justify-center mt-4"'
            onPress={() => router.push('/')}
          >
            <Text className='font-bold text-base text-white'>Book New Appointment</Text>
          </TouchableOpacity>
        </View>
        
        <View className='mb-6'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className={`font-inter-semibold text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Health Statistics</Text>
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
  
});