import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

const medicationTypes = [
  'Tablet',
  'Capsule',
  'Liquid',
  'Injection',
  'Inhaler',
  'Drops',
  'Cream',
  'Patch',
];

const frequencies = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'Weekly',
  'As needed',
];

export default function AddMedicationScreen() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setStartDate(date);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (!name.trim()) {
        throw new Error('Please enter medication name');
      }

      if (!dosage.trim()) {
        throw new Error('Please enter dosage');
      }

      if (!type) {
        throw new Error('Please select medication type');
      }

      if (!frequency) {
        throw new Error('Please select frequency');
      }

      // Add medication logic here
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add medication');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="font-inter-bold text-2xl text-gray-800 dark:text-textDark mb-2">
            Add New Medication
          </Text>
          <Text className="font-inter-regular text-base text-gray-500 dark:text-gray-400 mb-6">
            Enter your medication details and schedule
          </Text>

          {error && (
            <View className="flex-row items-center bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-6">
              <Ionicons name='alert' size={20} color="#EF4444" className="mr-2" />
              <Text className="flex-1 font-inter-medium text-sm text-red-500 dark:text-red-300">
                {error}
              </Text>
            </View>
          )}

          <View className="mb-6">
            <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">
              Basic Information
            </Text>
            
            <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-3 px-4 h-14">
              <Ionicons name='medkit' size={20} color='#29B6F6' className="mr-3" />
              <TextInput
                className="flex-1 font-inter-regular text-base text-gray-800 dark:text-textDark"
                value={name}
                onChangeText={setName}
                placeholder="Medication name"
                placeholderTextColor='#999'
              />
            </View>

            <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-3 px-4 h-14">
              <Text className="font-inter-medium text-base text-gray-500 dark:text-gray-400 mr-2">
                Dosage:
              </Text>
              <TextInput
                className="flex-1 font-inter-regular text-base text-gray-800 dark:text-textDark"
                value={dosage}
                onChangeText={setDosage}
                placeholder="e.g., 500mg"
                placeholderTextColor='#999'
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">
              Medication Type
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              <View className="flex-row">
                {medicationTypes.map((medicationType) => (
                  <TouchableOpacity
                    key={medicationType}
                    className={`px-4 py-2 rounded-full mr-2 ${
                      type === medicationType 
                        ? 'bg-blue-100 dark:bg-blue-900' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                    onPress={() => setType(medicationType)}
                  >
                    <Text
                      className={`font-inter-medium text-sm ${
                        type === medicationType 
                          ? 'text-blue-500 dark:text-blue-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {medicationType}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="mb-6">
            <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">
              Schedule
            </Text>
            
            <View className="flex-row flex-wrap gap-2 mb-4">
              {frequencies.map((freq) => (
                <TouchableOpacity
                  key={freq}
                  className={`px-4 py-2 rounded-full ${
                    frequency === freq 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                  onPress={() => setFrequency(freq)}
                >
                  <Text
                    className={`font-inter-medium text-sm ${
                      frequency === freq 
                        ? 'text-blue-500 dark:text-blue-300' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {freq}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-3 px-4 h-14"
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name='calendar' size={20} color="#29B6F6"  className="mr-3" />
              <Text className="font-inter-regular text-base text-gray-800 dark:text-textDark">
                Start date: {format(startDate, 'MMMM d, yyyy')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-3 px-4 h-14"
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name='time' size={20} color="#29B6F6"  className="mr-3" />
              <Text className="font-inter-regular text-base text-gray-800 dark:text-textDark">
                First dose at: {format(time, 'h:mm a')}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View className="mb-6">
            <Text className={`font-inter-semibold text-base ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'} mb-3`}>
              Instructions
            </Text>
            <View className="flex-row items-start bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-3 px-4 h-32">
              <Ionicons name='text' size={20} color="#6B7280"  className="mr-3 mt-4" />
              <TextInput
                className="flex-1 font-inter-regular text-base text-gray-800 dark:text-textDark h-full pt-4"
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Add special instructions (e.g., take with food)"
                placeholderTextColor='#999'
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View className="flex-row gap-3 mt-6">
            <TouchableOpacity
              className="flex-1 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 justify-center items-center"
              onPress={() => router.back()}
              disabled={isSubmitting}
            >
              <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 h-14 rounded-xl justify-center items-center ${
                isSubmitting ? 'bg-blue-300 dark:bg-blue-700' : 'bg-blue-500 dark:bg-blue-600'
              }`}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text className="font-inter-semibold text-base text-white">
                {isSubmitting ? 'Adding...' : 'Add Medication'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}