import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme } = useTheme();
  
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { 
          icon: <Ionicons name="person-circle" size={20} color="#3B82F6" />,
          label: 'Personal Information',
          onPress: () => router.push('/(profile)/personalinfo'),
        },
        { 
          icon: <Ionicons name="call" size={20} color="#3B82F6" />,
          label: 'Emergency Contacts',
          onPress: () => router.push('/(profile)/emergencycontact'),
        },
        { 
          icon: <Ionicons name="lock-closed" size={20} color="#3B82F6" />,
          label: 'Security',
          onPress: () => router.push('/(profile)/security'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: <Ionicons name="notifications" size={20} color="#3B82F6" />,
          label: 'Notifications',
          rightElement: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
              thumbColor={notificationsEnabled ? '#3B82F6' : '#9CA3AF'}
            />
          ),
        },
        { 
          icon: <Ionicons name="heart" size={20} color="#3B82F6" />,
          label: 'Health Data',
          onPress: () => router.push('/(profile)/healthdata'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { 
          icon: <Ionicons name="help-circle" size={20} color="#3B82F6" />,
          label: 'Help & FAQ',
          onPress: () => router.push('/(profile)/help'),
        },
        { 
          icon: <Ionicons name="settings" size={20} color="#3B82F6" />,
          label: 'App Settings',
          onPress: () => router.push('/(profile)/settings'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <ScrollView>
        
        <View className="p-6 mb-5 ">
          <View className=" items-center mb-4">
            <View className="w-[90px] h-[90px]  rounded-[45px] bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-4">
              <Text className="font-inter-semibold text-2xl text-blue-500">
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 ">
                {user?.name || 'User'}
              </Text>
              <Text className="font-inter-regular text-sm text-gray-500 dark:text-gray-400">
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
          <View className='items-center'>
          <TouchableOpacity 
            className="bg-blue-100 dark:bg-blue-900/30 rounded-lg py-2 px-4  "
            onPress={() => router.push('/(profile)/edit')}
          >
            <Text className="font-inter-medium text-sm text-blue-500 dark:text-blue-300">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        
        {profileSections.map((section, sectionIndex) => (
          <View key={`section-${sectionIndex}`} className="mb-5 px-4">
            <Text className="font-inter-semibold text-sm text-gray-500 dark:text-gray-400 mb-2 ml-2">
              {section.title}
            </Text>
            
            <View className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={`item-${sectionIndex}-${itemIndex}`}
                  className={`flex-row items-center justify-between py-4 px-4 ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                  }`}
                  onPress={item.onPress}
                  disabled={!item.onPress}
                >
                  <View className="flex-row items-center">
                    {item.icon}
                    <Text className="font-inter-medium text-base text-gray-800 dark:text-gray-100 ml-3">
                      {item.label}
                    </Text>
                  </View>
                  
                  <View>
                    {item.rightElement}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        
        <TouchableOpacity 
          className="flex-row items-center justify-center bg-red-100 dark:bg-red-900/30 py-3 mx-4 my-4 rounded-xl"
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text className="font-inter-semibold text-base text-red-500 dark:text-red-300 ml-2">
            Sign Out
          </Text>
        </TouchableOpacity>
        
        <Text className="font-inter-regular text-xs text-gray-400 dark:text-gray-500 text-center mb-10">
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}