import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from 'theme/colorScheme';

interface EventItemProps {
  title: string;
  subtitle: string;
  type: 'medication' | 'appointment';
}

export default function EventItem({ title, subtitle, type }: EventItemProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    if (type === 'medication') {
      router.push('/medications');
    } else {
      router.push('/appointments');
    }
  };

  const borderColor = type === 'medication' ? 'border-l-[#10B981]' : 'border-l-[#3B82F6]';
  const dotColor = type === 'medication' ? 'bg-[#10B981]' : 'bg-[#3B82F6]';

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex-row items-center rounded-xl p-4 mb-3 shadow-md border-l-4 ${borderColor}
        ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}
      `}
    >
      <View className={`w-2 h-2 rounded-full mr-4 ${dotColor}`} />

      <View className="flex-1">
        <Text
          className={`text-base mb-1 font-[Inter-SemiBold] ${
            theme === 'dark' ? 'text-textDark' : 'text-textLight'
          }`}
        >
          {title}
        </Text>
        <Text className="text-sm text-gray-500 font-[Inter-Regular]">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
