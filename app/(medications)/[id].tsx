import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMedications } from 'hooks/useMedications';
import { format } from 'date-fns';

export default function MedicationDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getMedicationById, deleteMedication } = useMedications();
  const medication = getMedicationById(id as string);

  if (!medication) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-[Inter-Medium] text-base text-red-500 text-center mt-6">
          Medication not found
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Medication',
      'Are you sure you want to delete this medication?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMedication(medication.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-blue-100 justify-center items-center">
            <Ionicons name="medkit-outline" size={32} color="#3B82F6" />
          </View>
          <TouchableOpacity 
            className="p-2"
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text className="font-[Inter-Bold] text-2xl text-gray-800 mb-2">
          {medication.name}
        </Text>
        <Text className="font-[Inter-Regular] text-base text-gray-500 mb-6">
          {medication.type}
        </Text>

        <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          {/* Dosage & Timing */}
          <View className="py-4 border-b border-gray-200">
            <View className="flex-row items-center mb-2">
              <Ionicons name="time-outline" size={20} color="#6B7280" />
              <Text className="font-[Inter-Medium] text-sm text-gray-500 ml-2">
                Dosage & Timing
              </Text>
            </View>
            <Text className="font-[Inter-Regular] text-base text-gray-800 mb-1">
              {medication.dosage}
            </Text>
            <Text className="font-[Inter-Regular] text-sm text-gray-500">
              {medication.time}
            </Text>
          </View>

          {/* Frequency */}
          <View className="py-4 border-b border-gray-200">
            <View className="flex-row items-center mb-2">
              <Ionicons name="repeat-outline" size={20} color="#6B7280" />
              <Text className="font-[Inter-Medium] text-sm text-gray-500 ml-2">
                Frequency
              </Text>
            </View>
            <Text className="font-[Inter-Regular] text-base text-gray-800">
              {medication.frequency}
            </Text>
          </View>

          {/* Start Date */}
          <View className="py-4 border-b border-gray-200">
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <Text className="font-[Inter-Medium] text-sm text-gray-500 ml-2">
                Start Date
              </Text>
            </View>
            <Text className="font-[Inter-Regular] text-base text-gray-800">
              {format(new Date(medication.startDate), 'MMMM d, yyyy')}
            </Text>
          </View>

          {/* Instructions */}
          {medication.instructions && (
            <View className="py-4">
              <View className="flex-row items-center mb-2">
                <Ionicons name="document-text-outline" size={20} color="#6B7280" />
                <Text className="font-[Inter-Medium] text-sm text-gray-500 ml-2">
                  Instructions
                </Text>
              </View>
              <Text className="font-[Inter-Regular] text-base text-gray-800">
                {medication.instructions}
              </Text>
            </View>
          )}
        </View>

        {/* Refill Date */}
        {medication.refillDate && (
          <View className="bg-blue-100 rounded-xl p-4 mb-6">
            <Text className="font-[Inter-Medium] text-sm text-blue-500 mb-1">
              Next Refill
            </Text>
            <Text className="font-[Inter-SemiBold] text-base text-gray-800">
              {format(new Date(medication.refillDate), 'MMMM d, yyyy')}
            </Text>
          </View>
        )}

        {/* Buttons */}
        <View className="gap-3">
          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 items-center">
            <Text className="font-[Inter-SemiBold] text-base text-white">
              Edit Medication
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-blue-100 rounded-xl py-4 items-center"
            onPress={() => {/* Handle refill reminder */}}
          >
            <Text className="font-[Inter-SemiBold] text-base text-blue-500">
              Set Refill Reminder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}