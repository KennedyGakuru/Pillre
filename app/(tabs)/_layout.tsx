import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useAuth } from 'context/AuthContext';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

export default function TabLayout() {
  const { isSignedIn } = useAuth();
  const {theme} = useTheme();

  // Redirect to login if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/(auth)/login');
    }
  }, [isSignedIn]);
  if (!isSignedIn) {
    return null;
  }
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#29B6F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: Platform.OS === 'android' ? 8 : 0,
        },
        tabBarStyle: {
        backgroundColor: '#455A64', 
        borderRadius: 40, 
        height: 60, 
        width: '90%', 
        bottom: 20, 
        marginHorizontal: '5%', 
        position: 'absolute', 
        borderTopWidth: 0,    
},

        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{
          title: '',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size } : { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}