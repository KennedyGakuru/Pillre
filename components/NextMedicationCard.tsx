import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from 'theme/colorScheme';
import Pillicon from './Pillicon';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  type: string;
}

interface NextMedicationCardProps {
  medication: Medication;
}

export default function NextMedicationCard({ medication }: NextMedicationCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/medications/${medication.id}`)}
      className={`w-[31%] aspect-square rounded-2xl p-3 mb-3 shadow-sm
        ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}
      `}
    >
      <View className="w-10 h-10 rounded-full bg-[#EBF5FF] justify-center items-center mb-3">
        <Pillicon width={30} height={24} />
      </View>

      <Text
        className={`text-sm font-[Inter-SemiBold] mb-1 ${
          theme === 'dark' ? 'text-textDark' : 'text-textLight'
        }`}
      >
        {medication.name}
      </Text>

      <Text className="text-xs text-gray-500 font-[Inter-Regular] mb-1">
        {medication.dosage}
      </Text>

      <Text className="text-xs font-[Inter-Medium] text-primary">
        {medication.time}
      </Text>
    </TouchableOpacity>
  );
}
