import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth, User as BaseUser } from 'context/AuthContext';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useTheme } from 'theme/colorScheme';

interface User extends BaseUser {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string | Date;
  gender?: string;
  alternateEmail?: string;
  alternatePhone?: string;
}

const PersonalInfo: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: (user as User)?.dateOfBirth ? new Date(String((user as User).dateOfBirth)) : new Date(),
    gender: '',
    alternateEmail: '',
    alternatePhone: '',
  });

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, dateOfBirth: selectedDate }));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const updatedProfile: Partial<User> = {
        ...formData,
        dateOfBirth: formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString() : formData.dateOfBirth,
      };
      await updateUserProfile(updatedProfile);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update information');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-6">
        {error && (
          <View className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6">
            <Text className="font-inter-medium text-sm text-red-500 dark:text-red-300">
              {error}
            </Text>
          </View>
        )}

        {/* Address Information Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Address Information
          </Text>
          
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Street Address
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.address}
              onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              placeholder="Enter your street address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              City
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.city}
              onChangeText={(text) => setFormData(prev => ({ ...prev, city: text }))}
              placeholder="Enter your city"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                State
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
                value={formData.state}
                onChangeText={(text) => setFormData(prev => ({ ...prev, state: text }))}
                placeholder="State"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="flex-1 ml-2">
              <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                ZIP Code
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
                value={formData.zipCode}
                onChangeText={(text) => setFormData(prev => ({ ...prev, zipCode: text }))}
                placeholder="ZIP"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Personal Details Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Personal Details
          </Text>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Date of Birth
            </Text>
            <TouchableOpacity
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="font-inter-regular text-base text-gray-800 dark:text-gray-100">
                {format(formData.dateOfBirth, 'MMMM d, yyyy')}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.gender}
              onChangeText={(text) => setFormData(prev => ({ ...prev, gender: text }))}
              placeholder="Enter your gender"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Additional Contact Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Additional Contact
          </Text>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Alternative Email
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.alternateEmail}
              onChangeText={(text) => setFormData(prev => ({ ...prev, alternateEmail: text }))}
              placeholder="Enter alternative email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Alternative Phone
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.alternatePhone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, alternatePhone: text }))}
              placeholder="Enter alternative phone"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3 mt-6">
          <TouchableOpacity
            className="flex-1 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg justify-center items-center"
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text className="font-inter-semibold text-base text-gray-700 dark:text-gray-300">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 h-12 bg-blue-500 rounded-lg justify-center items-center ${
              isSubmitting ? 'opacity-70' : ''
            }`}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text className="font-inter-semibold text-base text-white">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInfo;
