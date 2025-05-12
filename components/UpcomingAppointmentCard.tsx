import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from 'theme/colorScheme';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

interface UpcomingAppointmentCardProps {
  appointment: Appointment;
}

export default function UpcomingAppointmentCard({ appointment }: UpcomingAppointmentCardProps) {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/appointments/${appointment.id}`)}
      className={`flex-row rounded-2xl p-4 mb-3 shadow-sm
        ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}
      `}
    >
      {/* Left Section */}
      <View className="flex-1">
        <Text
          className={`text-base font-[Inter-SemiBold] mb-1 ${
            theme === 'dark' ? 'text-textDark' : 'text-textLight'
          }`}
        >
          {appointment.doctorName}
        </Text>

        <Text className="text-sm text-gray-500 font-[Inter-Regular] mb-3">
          {appointment.specialty}
        </Text>

        <View className="gap-2">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={14} color="#6B7280" className="mr-1.5" />
            <Text className="text-xs text-gray-500 font-[Inter-Regular]">
              {formatDate(appointment.date)} | {appointment.time}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" className="mr-1.5" />
            <Text className="text-xs text-gray-500 font-[Inter-Regular]">
              {appointment.location}
            </Text>
          </View>
        </View>
      </View>

      {/* Right Section */}
      <View className="items-center justify-center">
        <View className="w-3 h-3 rounded-full bg-primary mb-1" />
        <Text className="text-xs font-[Inter-Medium] text-primary">Upcoming</Text>
      </View>
    </TouchableOpacity>
  );
}
