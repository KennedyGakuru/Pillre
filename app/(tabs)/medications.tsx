import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import MedicationListItem from 'components/MedicationListItem';
import { useMedications } from 'hooks/useMedications';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';

export default function MedicationsScreen() {
  const { medications } = useMedications();
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  
  const filteredMedications = medications.filter(medication => 
    medication.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View className="px-4 pb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-inter-bold text-2xl text-gray-800 dark:text-gray-100">
          Medications
        </Text>
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center"
          onPress={() => router.push('/(medications)/add')}
        >
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row items-center bg-white dark:bg-gray-800 rounded-xl px-3 h-12 mb-4 border border-gray-200 dark:border-gray-700">
        <Ionicons name="search" size={20} color="#6B7280" className="mr-2 dark:text-gray-400" />
        <TextInput
          className="flex-1 font-inter-regular text-base text-gray-800 dark:text-gray-100"
          placeholder="Search medicines..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>
      
      <View className="flex-row mb-2">
        <TouchableOpacity className="px-4 py-2 rounded-lg mr-2 bg-blue-100 dark:bg-blue-900">
          <Text className="font-inter-medium text-sm text-blue-500 dark:text-blue-300">All</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-lg mr-2">
          <Text className="font-inter-medium text-sm text-gray-500 dark:text-gray-400">Active</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 rounded-lg">
          <Text className="font-inter-medium text-sm text-gray-500 dark:text-gray-400">Upcoming</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View className="flex-1 items-center justify-center pt-20 px-6">
      <View className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 justify-center items-center mb-6">
        <Ionicons name="medkit" size={40} color="#3B82F6" />
      </View>
      <Text className="font-inter-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
        No medications found
      </Text>
      <Text className="font-inter-regular text-base text-gray-500 dark:text-gray-400 text-center mb-6">
        {searchQuery ? 'Try a different search term' : 'Add your first medication to get started'}
      </Text>
      {!searchQuery && (
        <TouchableOpacity 
          className="bg-blue-500 rounded-xl py-3 px-6"
          onPress={() => router.push('/medications/add')}
        >
          <Text className="font-inter-semibold text-base text-white">Add Medication</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top']}>
      <FlatList
        data={filteredMedications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationListItem 
            medication={item}
            onPress={() => router.push(`/medications/add`)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}