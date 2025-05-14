import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

const Security: React.FC = () => {
  const { theme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security preferences
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [showLoginHistory, setShowLoginHistory] = useState(true);

  const handleChangePassword = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error('Please fill in all password fields');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPasswordInput = (
    value: string,
    onChangeText: (text: string) => void,
    showPassword: boolean,
    setShowPassword: (show: boolean) => void,
    placeholder: string
  ) => (
    <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <TextInput
        className="flex-1 px-4 py-3 font-inter-regular text-base text-gray-800 dark:text-gray-100"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
      <TouchableOpacity
        className="px-3 py-3"
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons 
          name={showPassword ? "eye-off" : "eye"} 
          size={20} 
          color="#6B7280" 
          className="dark:text-gray-400"
        />
      </TouchableOpacity>
    </View>
  );

  const renderSecurityToggle = (
    value: boolean,
    onValueChange: (value: boolean) => void,
    label: string,
    description: string
  ) => (
    <View className="flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-700">
      <View className="flex-1 mr-4">
        <Text className="font-inter-medium text-base text-gray-800 dark:text-gray-100 mb-1">
          {label}
        </Text>
        <Text className="font-inter-regular text-sm text-gray-500 dark:text-gray-400">
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
        thumbColor={value ? '#3B82F6' : '#9CA3AF'}
      />
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-6">
        {error && (
          <View className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg mb-6">
            <Text className="font-inter-medium text-sm text-red-500 dark:text-red-300">
              {error}
            </Text>
          </View>
        )}

        {/* Change Password Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Change Password
          </Text>
          
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </Text>
            {renderPasswordInput(
              currentPassword,
              setCurrentPassword,
              showCurrentPassword,
              setShowCurrentPassword,
              'Enter current password'
            )}
          </View>

          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </Text>
            {renderPasswordInput(
              newPassword,
              setNewPassword,
              showNewPassword,
              setShowNewPassword,
              'Enter new password'
            )}
          </View>

          <View className="mb-6">
            <Text className="font-inter-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </Text>
            {renderPasswordInput(
              confirmPassword,
              setConfirmPassword,
              showConfirmPassword,
              setShowConfirmPassword,
              'Confirm new password'
            )}
          </View>

          <TouchableOpacity
            className={`bg-primary rounded-lg py-3 items-center ${
              isSubmitting ? 'opacity-70' : ''
            }`}
            onPress={handleChangePassword}
            disabled={isSubmitting}
          >
            <Text className="font-inter-semibold text-base text-white">
              {isSubmitting ? 'Changing Password...' : 'Change Password'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Two-Factor Authentication Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Two-Factor Authentication
          </Text>
          
          {renderSecurityToggle(
            twoFactorEnabled,
            setTwoFactorEnabled,
            'Enable Two-Factor Authentication',
            'Add an extra layer of security to your account'
          )}

          {renderSecurityToggle(
            biometricEnabled,
            setBiometricEnabled,
            'Biometric Authentication',
            'Use Face ID or Touch ID to log in'
          )}
        </View>

        {/* Privacy Preferences Section */}
        <View className="mb-8">
          <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-4">
            Privacy Preferences
          </Text>

          {renderSecurityToggle(
            rememberDevice,
            setRememberDevice,
            'Remember This Device',
            'Stay logged in on this device'
          )}

          {renderSecurityToggle(
            showLoginHistory,
            setShowLoginHistory,
            'Show Login History',
            'View recent account activity'
          )}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Security;