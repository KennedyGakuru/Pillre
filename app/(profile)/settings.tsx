import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings: React.FC = () => {
  const { theme } = useTheme();
  const [medicationReminders, setMedicationReminders] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [healthTips, setHealthTips] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  // Display Settings
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Language Settings
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  // Data Usage Settings
  const [autoSync, setAutoSync] = useState(true);
  const [dataBackup, setDataBackup] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const renderSettingSwitch = (
    value: boolean,
    onValueChange: (value: boolean) => void,
    title: string,
    description: string
  ) => (
    <View className="flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-700">
      <View className="flex-1 mr-4">
        <Text className="font-inter-medium text-base text-gray-800 dark:text-gray-100 mb-1">
          {title}
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
    <SafeAreaView className='flex-1'>
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-6">
        {/* Notification Settings */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="notifications" size={20} color="#3B82F6" />
            <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 ml-2">
              Notifications
            </Text>
          </View>

          {renderSettingSwitch(
            medicationReminders,
            setMedicationReminders,
            'Medication Reminders',
            'Get notified when it\'s time to take your medications'
          )}

          {renderSettingSwitch(
            appointmentReminders,
            setAppointmentReminders,
            'Appointment Reminders',
            'Receive notifications about upcoming appointments'
          )}

          {renderSettingSwitch(
            healthTips,
            setHealthTips,
            'Health Tips & Updates',
            'Get helpful health tips and important updates'
          )}

          {renderSettingSwitch(
            emergencyAlerts,
            setEmergencyAlerts,
            'Emergency Alerts',
            'Receive critical health and safety alerts'
          )}
        </View>

        {/* Display Settings */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="moon" size={20} color="#3B82F6" />
            <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 ml-2">
              Display
            </Text>
          </View>

          {renderSettingSwitch(
            darkMode,
            setDarkMode,
            'Dark Mode',
            'Switch between light and dark themes'
          )}

          {renderSettingSwitch(
            largeText,
            setLargeText,
            'Large Text',
            'Increase text size for better readability'
          )}

          {renderSettingSwitch(
            highContrast,
            setHighContrast,
            'High Contrast',
            'Enhance visibility with higher contrast'
          )}
        </View>

        {/* Language Settings */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="globe-outline" size={20} color="#3B82F6" />
            <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 ml-2">
              Language
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                className={`px-4 py-2 rounded-full ${
                  language === selectedLanguage
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
                onPress={() => setSelectedLanguage(language)}
              >
                <Text
                  className={`font-inter-medium text-sm ${
                    language === selectedLanguage
                      ? 'text-blue-500 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data & Storage Settings */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="wifi" size={20} color="#3B82F6" />
            <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 ml-2">
              Data & Storage
            </Text>
          </View>

          {renderSettingSwitch(
            autoSync,
            setAutoSync,
            'Auto-Sync',
            'Automatically sync data when connected'
          )}

          {renderSettingSwitch(
            dataBackup,
            setDataBackup,
            'Data Backup',
            'Regularly backup your health data'
          )}

          {renderSettingSwitch(
            offlineMode,
            setOfflineMode,
            'Offline Mode',
            'Access app features without internet'
          )}

          {renderSettingSwitch(
            locationServices,
            setLocationServices,
            'Location Services',
            'Enable location-based features'
          )}
        </View>

        {/* Storage Info */}
        <View className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <Text className="font-inter-semibold text-base text-gray-800 dark:text-gray-100 mb-3">
            Storage Usage
          </Text>
          <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
            <View className="h-full bg-blue-500 rounded-full w-[65%]" />
          </View>
          <Text className="font-inter-regular text-sm text-gray-500 dark:text-gray-400 mb-4">
            Using 650 MB of 1 GB
          </Text>
          <TouchableOpacity className="bg-blue-100 dark:bg-blue-900/30 py-3 rounded-lg items-center">
            <Text className="font-inter-medium text-sm text-blue-500 dark:text-blue-300">
              Clear Cache
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;