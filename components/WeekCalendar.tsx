import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  parseISO,
} from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

interface WeekCalendarProps {
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
  highlightedDates?: string[]; // array of 'YYYY-MM-DD' strings
}

export default function WeekCalendar({
  onDateSelect,
  initialDate = new Date(),
  highlightedDates = [],
}: WeekCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setWeekDates(days);
  }, [currentDate]);

  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const isHighlighted = (date: Date) => {
    return highlightedDates.some((d) => {
      try {
        const parsed = parseISO(d);
        return isSameDay(date, parsed);
      } catch {
        return false;
      }
    });
  };

  return (
    <View className="px-4 py-2">
      <View className="flex-row justify-between items-center mb-3">
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Ionicons name="chevron-back" size={24} color="#3B82F6" />
        </TouchableOpacity>

        {weekDates.length === 7 ? (
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-white">
            {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
          </Text>
        ) : (
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-white">
            Loading...
          </Text>
        )}

        <TouchableOpacity onPress={goToNextWeek}>
          <Ionicons name="chevron-forward" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {weekDates.map((date, index) => {
          const isActive = isSameDay(date, selectedDate);
          const isMarked = isHighlighted(date);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectDate(date)}
              className={`w-16 items-center py-2 rounded-xl mr-3 ${
                isActive ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <Text
                className={`font-inter-bold ${
                  isActive ? 'text-white' : 'text-gray-700 dark:text-white'
                }`}
              >
                {format(date, 'EEE')}
              </Text>
              <View className="relative">
                <Text
                  className={`font-inter-medium ${
                    isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {format(date, 'd')}
                </Text>
                {isMarked && (
                  <View className="w-2 h-2 rounded-full bg-green-400 absolute -bottom-2 self-center" />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
