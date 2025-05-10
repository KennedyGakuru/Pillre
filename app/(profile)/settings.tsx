import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settings: React.FC = () => {
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
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
        thumbColor={value ? '#3B82F6' : '#9CA3AF'}
      />
    </View>
  );
    return(
        <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications" size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Notifications</Text>
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="moon" size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Display</Text>
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="globe-outline" size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Language</Text>
          </View>

          <View style={styles.languageContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.languageOption,
                  language === selectedLanguage && styles.languageOptionSelected,
                ]}
                onPress={() => setSelectedLanguage(language)}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === selectedLanguage && styles.languageTextSelected,
                  ]}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="wifi" size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Data & Storage</Text>
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

        <View style={styles.storageInfo}>
          <Text style={styles.storageTitle}>Storage Usage</Text>
          <View style={styles.storageBar}>
            <View style={[styles.storageUsed, { width: '65%' }]} />
          </View>
          <Text style={styles.storageText}>
            Using 650 MB of 1 GB
          </Text>
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Cache</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  languageOptionSelected: {
    backgroundColor: '#EBF5FF',
  },
  languageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  languageTextSelected: {
    color: '#3B82F6',
  },
  storageInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  storageTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 12,
  },
  storageBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  storageUsed: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  storageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#EBF5FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
});

export default settings;