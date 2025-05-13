import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { useAuth } from 'context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

const EditProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    bio: '',
    profileImage: null as string | null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      await updateUserProfile(formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
      <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
            <ScrollView className="flex-1 bg-backgroundLight dark:bg-backgroundDark p-5">
        {/* Profile Image Section */}
        <View className="items-center mb-8">
          <View className="w-[120px] h-[120px] rounded-full mb-4 relative">
            {formData.profileImage ? (
              <>
                <Image
                  source={{ uri: formData.profileImage }}
                  className="w-full h-full rounded-full"
                />
                <TouchableOpacity
                  className="absolute top-0 right-0 bg-red-500 rounded-full p-2"
                  onPress={() => setFormData(prev => ({ ...prev, profileImage: null }))}
                >
                  <Ionicons name="close" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </>
            ) : (
              <View className="w-full h-full rounded-full bg-blue-100 dark:bg-blue-900/30 justify-center items-center">
                <Text className="font-inter-semibold text-5xl text-blue-500">
                  {formData.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            className="flex-row items-center bg-blue-100 dark:bg-blue-900/30 py-2 px-4 rounded-lg"
            onPress={pickImage}
          >
            <Ionicons name="camera" size={20} color="#3B82F6" className="mr-2" />
            <Text className="font-inter-medium text-sm text-blue-500 dark:text-blue-300">
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6">
            <Text className="font-inter-medium text-sm text-red-500 dark:text-red-300">
              {error}
            </Text>
          </View>
        )}

        {/* Form Section */}
        <View className="mb-6">
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Name
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Email
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </Text>
            <TextInput
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 h-32 font-inter-regular text-base text-gray-800 dark:text-gray-100"
              value={formData.bio}
              onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
              placeholder="Tell us about yourself"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="flex-row gap-3">
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
        </ScrollView>
      </SafeAreaView>
    
  );
};

export default EditProfile;