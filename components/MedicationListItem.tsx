import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'theme/colorScheme';
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
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-4 mb-3 mx-4 rounded-xl shadow-sm
        ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}
      `}
    >
      <View className="w-12 h-12 rounded-full bg-[#EBF5FF] justify-center items-center mr-4">
        <Pillicon width={30} height={24} />
      </View>

      <View className="flex-1">
        <Text
          className={`text-base font-[Inter-SemiBold] mb-1 ${
            theme === 'dark' ? 'text-textDark' : 'text-textLight'
          }`}
        >
          {medication.name}
        </Text>

        <Text className="text-sm text-gray-500 font-[Inter-Regular]">
          {medication.dosage} • {medication.type}
        </Text>
      </View>

      <View className="items-center">
        <Text
          className={`text-sm font-[Inter-Medium] mb-1 ${
            theme === 'dark' ? 'text-textDark' : 'text-textLight'
          }`}
        >
          {medication.time}
        </Text>
        <View className="w-2 h-2 rounded-full bg-green-500" />
      </View>
    </TouchableOpacity>
  );
}
