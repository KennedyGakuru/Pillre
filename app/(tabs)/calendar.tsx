import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import EventItem from 'components/EventItem';
import { useMedications } from 'hooks/useMedications';
import { useAppointments } from 'hooks/useAppointments';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarScreen() {
  const { medications } = useMedications();
  const { appointments } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Prepare calendar marked dates
  const markedDates: Record<string, { dots: { key: string; color: string }[]; selected?: boolean; selectedColor?: string }> = {};
  
  // Mark medication dates
  medications.forEach(med => {
    const medicationDates = [];
    // This is simplified - in a real app, you'd generate dates based on frequency
    medicationDates.push(med.startDate);
    
    medicationDates.forEach(date => {
      if (!markedDates[date]) {
        markedDates[date] = { dots: [] };
      }
      
      // Add medication dot if not already added
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
    
    // Add appointment dot if not already added
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
    <View style={styles.legendContainer}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
        <Text style={styles.legendText}>Medications</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
        <Text style={styles.legendText}>Appointments</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      
      <RNCalendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#1F2937',
          selectedDayBackgroundColor: '#3B82F6',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#3B82F6',
          dayTextColor: '#1F2937',
          textDisabledColor: '#9CA3AF',
          dotColor: '#3B82F6',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#3B82F6',
          monthTextColor: '#1F2937',
          indicatorColor: '#3B82F6',
          textDayFontFamily: 'Inter-Regular',
          textMonthFontFamily: 'Inter-SemiBold',
          textDayHeaderFontFamily: 'Inter-Medium',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        style={styles.calendar}
      />
      
      {renderLegend()}
      
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>
          {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>
      
      <ScrollView style={styles.eventsContainer}>
        {medicationsForDay.length > 0 && (
          <View style={styles.eventSection}>
            <View style={styles.eventSectionHeader}>
              <Ionicons name="medkit" size={18} color="#10B981" />
              <Text style={styles.eventSectionTitle}>Medications</Text>
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
          <View style={styles.eventSection}>
            <View style={styles.eventSectionHeader}>
              <Ionicons name="time" size={18} color="#3B82F6" />
              <Text style={styles.eventSectionTitle}>Appointments</Text>
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
          <View style={styles.noEventsContainer}>
            <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
            <Text style={styles.noEventsText}>No events scheduled for this day</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  legendContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDateContainer: {
    padding: 16,
    backgroundColor: '#EBF5FF',
  },
  selectedDateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  eventsContainer: {
    flex: 1,
    padding: 16,
  },
  eventSection: {
    marginBottom: 16,
  },
  eventSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventSectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  noEventsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noEventsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
    textAlign: 'center',
  },
});