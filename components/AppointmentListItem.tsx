import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

interface AppointmentListItemProps {
  appointment: Appointment;
  onPress: () => void;
}

export default function AppointmentListItem({ appointment, onPress }: AppointmentListItemProps) {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const [day, month] = formatDate(appointment.date).split(' ');

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center rounded-xl px-4 py-4 mb-3 mx-4 shadow-md
        ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}
      `}
    >
      <View className="w-12 h-12 rounded-lg bg-[#EBF5FF] justify-center items-center mr-4">
        <Text className="text-primary text-lg font-[Inter-Bold]">{day}</Text>
        <Text className="text-primary text-xs font-[Inter-Medium]">{month}</Text>
      </View>

      <View className="flex-1">
        <Text
          className={`text-base mb-0.5 font-[Inter-SemiBold] ${
            theme === 'dark' ? 'text-textDark' : 'text-textLight'
          }`}
        >
          {appointment.doctorName}
        </Text>
        <Text className="text-sm text-gray-500 font-[Inter-Regular] mb-1">
          {appointment.specialty}
        </Text>

        <View className="flex-row items-center">
          <View className="flex-row items-center mr-3">
            <Ionicons name="time" size={14} color="#6B7280" className="mr-1" />
            <Text className="text-xs text-gray-500 font-[Inter-Regular]">{appointment.time}</Text>
          </View>
        </View>
      </View>

      <View className="items-center">
        <View className="w-2 h-2 rounded-full bg-primary mb-1" />
        <Text className="text-xs text-primary font-[Inter-Medium]">Upcoming</Text>
      </View>
    </TouchableOpacity>
  );
}
