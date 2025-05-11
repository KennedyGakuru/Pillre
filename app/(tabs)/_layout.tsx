import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useAuth } from 'context/AuthContext';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { isSignedIn } = useAuth();

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
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: Platform.OS === 'android' ? 8 : 0,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
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
            <Ionicons name="medkit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: '',
          tabBarIcon: ({ color, size }: { color: string; size: number })  => (
            <Ionicons name='time' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '',
          tabBarIcon: ({ color, size } : { color: string; size: number }) => (
            <Ionicons name="calendar" size={size} color={color}/>
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