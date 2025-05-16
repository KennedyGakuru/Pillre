import React, { useState } from 'react';
import { ScrollView,Text, TextInput,TouchableOpacity, View, Platform,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { useTheme } from 'theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addAppointment } from 'store/slices/appointmentsSlice';

const specialties = [
  'Cardiology', 'Dermatology', 'Endocrinology', 'Family Medicine',
  'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics',
  'Psychiatry', 'Rheumatology',
];

export default function BookAppointmentScreen() {
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeChange = (_: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) setSelectedTime(time);
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (!selectedSpecialty) throw new Error('Please select a specialty');
      if (!location) throw new Error('Please enter a location');

      const newAppointment = {
        id: uuidv4(),
        specialty: selectedSpecialty,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: format(selectedTime, 'HH:mm'),
        location,
        notes,
        doctorName: 'Dr. Who', 
        status: 'upcoming' as 'upcoming',
      }
      dispatch(addAppointment(newAppointment));


      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className={`${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'} flex-1`}>
    <ScrollView className={`${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'} flex-1`}>
      <View className="p-6">
        <Text className="font-inter-bold text-2xl text-gray-800 dark:text-textDark mb-2">
          Book New Appointment
        </Text>
        <Text className="font-inter-regular text-base text-gray-500 dark:text-gray-400 mb-6">
          Schedule a visit with our healthcare providers
        </Text>

        {error && (
          <View className="bg-red-100 p-4 rounded-lg flex-row items-center mb-6">
            <Ionicons name="alert-circle" size={20} color="#EF4444" className="mr-2" />
            <Text className="text-red-500 font-[Inter-Medium] text-sm">{error}</Text>
          </View>
        )}

        {/* Specialty Selection */}
        <View className="mb-6">
          <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">Specialty</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {specialties.map((specialty) => {
              const active = selectedSpecialty === specialty;
              return (
                <TouchableOpacity
                  key={specialty}
                  className={`rounded-full px-4 py-2 mr-2 ${active ? 'bg-blue-100 dark:bg-blue-900'  : 'bg-gray-100 dark:bg-gray-700'}`}
                  onPress={() => setSelectedSpecialty(specialty)}
                >
                  <Text
                    className={`text-sm font-[Inter-Medium] ${active ? 'text-blue-500 dark:text-blue-300'  : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {specialty}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Date & Time */}
        <View className="mb-6">
          <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">Date & Time</Text>

          <TouchableOpacity
            className="flex-row items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 h-14 mb-3"
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#6B7280" className="mr-3" />
            <Text className="text-base font-inter-regular text-gray-800 dark:text-textDark">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 h-14"
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time" size={20} color="#6B7280" className="mr-3" />
            <Text className="text-base font-inter-regular text-gray-800 dark:text-textDark">
              {format(selectedTime, 'h:mm a')}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Location Input */}
        <View className="mb-6">
          <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">Location</Text>
          <View className="flex-row items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 h-14">
            <Ionicons name="map-sharp" size={20} color="#6B7280" className="mr-3" />
            <TextInput
              className="flex-1 text-base font-[Inter-Regular] text-gray-800 dark:text-textDark"
              value={location}
              onChangeText={setLocation}
              placeholder="Enter clinic location"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Additional Notes */}
        <View className="mb-6">
          <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300 mb-3">Additional Notes</Text>
          <View className="flex-row items-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 h-32">
            <Ionicons name="text" size={20} color="#6B7280" className="mr-3 mt-1" />
            <TextInput
              className="flex-1 text-base font-[Inter-Regular] text-gray-800 dark:text-textDark"
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any special instructions or notes"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mt-6">
          <TouchableOpacity
            className="flex-1 h-14 rounded-xl bg-gray-100 justify-center items-center"
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text className="text-base font-[Inter-SemiBold] text-gray-600">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 h-14 rounded-xl justify-center items-center bg-primary ${
              isSubmitting ? 'bg-blue-300' : 'bg-blue-500'
            }`}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text className="text-base font-[Inter-SemiBold] text-white">
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
