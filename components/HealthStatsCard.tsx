import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'theme/colorScheme';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface HealthStatsCardProps {
  stats: Stat[];
}

export default function HealthStatsCard({ stats }: HealthStatsCardProps) {
  const { theme } = useTheme();

  return (
    <View
      className={`flex-row p-4 rounded-2xl shadow-md ${
        theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'
      }`}
    >
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          className={`flex-1 items-center px-2 ${
            index < stats.length - 1 ? 'border-r border-gray-200 dark:border-gray-700' : ''
          }`}
        >
          <View className="w-10 h-10 rounded-full bg-[#EBF5FF] justify-center items-center mb-2">
            {stat.icon}
          </View>

          <Text
            className={`text-lg font-[Inter-Bold] mb-1 ${
              theme === 'dark' ? 'text-textDark' : 'text-textLight'
            }`}
          >
            {stat.value}
          </Text>

          <Text className="text-xs text-gray-500 font-[Inter-Regular]">{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}
