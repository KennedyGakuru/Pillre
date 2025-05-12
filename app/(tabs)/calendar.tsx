import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as RNCalendar } from 'react-native-calendars';
import EventItem from 'components/EventItem';
import { useMedications } from 'hooks/useMedications';
import { useAppointments } from 'hooks/useAppointments';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

export default function CalendarScreen() {
  const { medications } = useMedications();
  const { appointments } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  
  // Determine colors based on theme
  const backgroundColor = theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight';
  const textColor = theme === 'dark' ? 'text-textDark' : 'text-textLight';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const headerBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const selectedDateBgColor = theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50';
  
  // Prepare calendar marked dates
  const markedDates: Record<string, { dots: { key: string; color: string }[]; selected?: boolean; selectedColor?: string }> = {};
  
  // Mark medication dates
  medications.forEach(med => {
    const medicationDates = [];
    medicationDates.push(med.startDate);
    
    medicationDates.forEach(date => {
      if (!markedDates[date]) {
        markedDates[date] = { dots: [] };
      }
      
      if (!markedDates[date].dots.some(dot => dot.key === 'medication')) {
        markedDates[date].dots.push({
          key: 'medication',
          color: '#10B981',
        });
      }
    });
  });
  
  // Mark appointment dates
  appointments.forEach(appointment => {
    const date = appointment.date;
    
    if (!markedDates[date]) {
      markedDates[date] = { dots: [] };
    }
    
    if (!markedDates[date].dots.some(dot => dot.key === 'appointment')) {
      markedDates[date].dots.push({
        key: 'appointment',
        color: '#3B82F6',
      });
    }
  });
  
  // Add selected date styling
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#3B82F6',
    };
  }
  
  // Filter events for selected date
  const medicationsForDay = medications.filter(med => med.startDate === selectedDate);
  const appointmentsForDay = appointments.filter(app => app.date === selectedDate);
  
  const renderLegend = () => (
    <View className={`flex-row px-4 py-4 ${headerBgColor} border-b ${borderColor}`}>
      <View className="flex-row items-center mr-4">
        <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" />
        <Text className={`font-inter-regular text-xs ${secondaryTextColor}`}>Medications</Text>
      </View>
      <View className="flex-row items-center">
        <View className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5" />
        <Text className={`font-inter-regular text-xs ${secondaryTextColor}`}>Appointments</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${backgroundColor}`} edges={['top']}>
      <View className={`px-4 py-4 ${headerBgColor} border-b ${borderColor}`}>
        <Text className={`font-inter-bold text-2xl ${textColor}`}>Calendar</Text>
      </View>
      
      <RNCalendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          calendarBackground: theme === 'dark' ? '#0E1A2B' : '#FFFFFF',
          textSectionTitleColor: theme === 'dark' ? '#F3F4F6' : '#1F2937',
          selectedDayBackgroundColor: '#3B82F6',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#3B82F6',
          dayTextColor: theme === 'dark' ? '#F3F4F6' : '#1F2937',
          textDisabledColor: theme === 'dark' ? '#9CA3AF' : '#9CA3AF',
          dotColor: '#3B82F6',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#3B82F6',
          monthTextColor: theme === 'dark' ? '#F3F4F6' : '#1F2937',
          indicatorColor: '#3B82F6',
          textDayFontFamily: 'Inter-Regular',
          textMonthFontFamily: 'Inter-SemiBold',
          textDayHeaderFontFamily: 'Inter-Medium',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        className={`border-b ${borderColor}`}
      />
      
      {renderLegend()}
      
      <View className={`px-4 py-4 ${selectedDateBgColor}`}>
        <Text className={`font-inter-semibold text-base ${textColor}`}>
          {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>
      
      <ScrollView className="flex-1 px-4 py-4">
        {medicationsForDay.length > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="medkit" size={18} color="#10B981" />
              <Text className={`font-inter-semibold text-base ${textColor} ml-2`}>
                Medications
              </Text>
            </View>
            
            {medicationsForDay.map((medication) => (
              <EventItem 
                key={`med-${medication.id}`}
                title={medication.name}
                subtitle={`${medication.dosage} - ${medication.time}`}
                type="medication"
              />
            ))}
          </View>
        )}
        
        {appointmentsForDay.length > 0 && (
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time" size={18} color="#3B82F6" />
              <Text className={`font-inter-semibold text-base ${textColor} ml-2`}>
                Appointments
              </Text>
            </View>
            
            {appointmentsForDay.map((appointment) => (
              <EventItem 
                key={`app-${appointment.id}`}
                title={appointment.doctorName}
                subtitle={`${appointment.specialty} - ${appointment.time}`}
                type="appointment"
              />
            ))}
          </View>
        )}
        
        {medicationsForDay.length === 0 && appointmentsForDay.length === 0 && (
          <View className="items-center justify-center py-10">
            <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
            <Text className={`font-inter-regular text-base ${secondaryTextColor} mt-3 text-center`}>
              No events scheduled for this day
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}