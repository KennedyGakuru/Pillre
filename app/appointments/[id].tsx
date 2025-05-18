import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppointments } from 'hooks/useAppointments';
import { format } from 'date-fns';

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointmentById, deleteAppointment } = useAppointments();
  const appointment = getAppointmentById(id as string);

  if (!appointment) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-[Inter-Medium] text-base text-red-500 text-center mt-6">
          Appointment not found
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAppointment(appointment.id);
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
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
            <Text className="font-[Inter-Medium] text-sm text-blue-500">
              Upcoming
            </Text>
          </View>
          <TouchableOpacity 
            className="p-2"
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text className="font-[Inter-Bold] text-2xl text-gray-800 mb-2">
          {appointment.doctorName}
        </Text>
        <Text className="font-[Inter-Regular] text-base text-gray-500 mb-6">
          {appointment.specialty}
        </Text>

        <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <View className="flex-row items-start py-3 border-b border-gray-200">
            <Ionicons name="calendar-outline" size={20} color="#6B7280" className="mr-3 mt-1" />
            <View>
              <Text className="font-[Inter-Medium] text-sm text-gray-500 mb-1">
                Date
              </Text>
              <Text className="font-[Inter-Regular] text-base text-gray-800">
                {format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}
              </Text>
            </View>
          </View>

          <View className="flex-row items-start py-3 border-b border-gray-200">
            <Ionicons name="time-outline" size={20} color="#6B7280" className="mr-3 mt-1" />
            <View>
              <Text className="font-[Inter-Medium] text-sm text-gray-500 mb-1">
                Time
              </Text>
              <Text className="font-[Inter-Regular] text-base text-gray-800">
                {appointment.time}
              </Text>
            </View>
          </View>

          <View className="flex-row items-start py-3 border-b border-gray-200">
            <Ionicons name="location-outline" size={20} color="#6B7280" className="mr-3 mt-1" />
            <View>
              <Text className="font-[Inter-Medium] text-sm text-gray-500 mb-1">
                Location
              </Text>
              <Text className="font-[Inter-Regular] text-base text-gray-800">
                {appointment.location}
              </Text>
            </View>
          </View>

          {appointment.notes && (
            <View className="flex-row items-start py-3">
              <Ionicons name="document-text-outline" size={20} color="#6B7280" className="mr-3 mt-1" />
              <View>
                <Text className="font-[Inter-Medium] text-sm text-gray-500 mb-1">
                  Notes
                </Text>
                <Text className="font-[Inter-Regular] text-base text-gray-800">
                  {appointment.notes}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="gap-3">
          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 items-center">
            <Text className="font-[Inter-SemiBold] text-base text-white">
              Reschedule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-100 rounded-xl py-4 items-center">
            <Text className="font-[Inter-SemiBold] text-base text-red-500">
              Cancel Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}