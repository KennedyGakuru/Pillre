import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MedicalCondition {
  id: string;
  condition: string;
  diagnosedDate: string;
  notes: string;
}

interface Allergy {
  id: string;
  allergen: string;
  severity: string;
  reaction: string;
}

const healthdata: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Medical Information
  const [bloodType, setBloodType] = useState('A+');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');

  // Medical Conditions
  const [conditions, setConditions] = useState<MedicalCondition[]>([
    {
      id: '1',
      condition: 'Hypertension',
      diagnosedDate: '2023-01-15',
      notes: 'Controlled with medication',
    },
  ]);

  // Allergies
  const [allergies, setAllergies] = useState<Allergy[]>([
    {
      id: '1',
      allergen: 'Peanuts',
      severity: 'Severe',
      reaction: 'Anaphylaxis',
    },
  ]);

  // Insurance Information
  const [insuranceProvider, setInsuranceProvider] = useState('Health Insurance Co.');
  const [policyNumber, setPolicyNumber] = useState('123456789');
  const [groupNumber, setGroupNumber] = useState('GRP001');

  const addCondition = () => {
    const newCondition: MedicalCondition = {
      id: Date.now().toString(),
      condition: '',
      diagnosedDate: '',
      notes: '',
    };
    setConditions(prev => [...prev, newCondition]);
  };

  const updateCondition = (id: string, field: keyof MedicalCondition, value: string) => {
    setConditions(prev =>
      prev.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };

  const deleteCondition = (id: string) => {
    setConditions(prev => prev.filter(condition => condition.id !== id));
  };

  const addAllergy = () => {
    const newAllergy: Allergy = {
      id: Date.now().toString(),
      allergen: '',
      severity: '',
      reaction: '',
    };
    setAllergies(prev => [...prev, newAllergy]);
  };

  const updateAllergy = (id: string, field: keyof Allergy, value: string) => {
    setAllergies(prev =>
      prev.map(allergy =>
        allergy.id === id ? { ...allergy, [field]: value } : allergy
      )
    );
  };

  const deleteAllergy = (id: string) => {
    setAllergies(prev => prev.filter(allergy => allergy.id !== id));
  };

  const handleSave = async () => {
    setError(null);

    try {
      // Validation logic here
      
      // Save logic here
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save health data');
    }
  };

    return(
      
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <ScrollView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
        <View className="p-6">

          {error ? (
            <View className="bg-red-200 p-4 rounded-lg mb-6">
              <Text className="text-red-500 font-[Inter-Medium] text-sm">{error}</Text>
            </View>
          ) : null}

          {/* Section: Basic Info */}
          <View className="mb-8">
            <Text className="text-[18px] font-[Inter-SemiBold] text-textLight dark:text-textDark mb-4">
              Basic Information
            </Text>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Blood Type</Text>
                <TextInput
                  className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark font-[Inter-Regular]"
                  value={bloodType}
                  onChangeText={setBloodType}
                  placeholder="Blood type"
                  placeholderTextColor="#9CA3AF"
                  editable={isEditing}
                />
              </View>

              <View className="flex-1 mx-1">
                <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Height (cm)</Text>
                <TextInput
                  className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark font-[Inter-Regular]"
                  value={height}
                  onChangeText={setHeight}
                  placeholder="Height"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  editable={isEditing}
                />
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Weight (kg)</Text>
                <TextInput
                  className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark font-[Inter-Regular]"
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Weight"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  editable={isEditing}
                />
              </View>
            </View>
          </View>

          {/* Section: Conditions */}
          <View className="mb-8">
            <Text className="text-[18px] font-[Inter-SemiBold] text-textLight dark:text-textDark mb-4">
              Medical Conditions
            </Text>

            {conditions.map(condition => (
              <View key={condition.id} className="bg-white dark:bg-backgroundDark border border-borderLight dark:border-gray-400 rounded-xl p-4 mb-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-base font-[Inter-SemiBold] text-textLight dark:text-textDark">Condition</Text>
                  {isEditing && (
                    <TouchableOpacity onPress={() => deleteCondition(condition.id)}>
                      <Ionicons name="trash-bin" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Condition Name</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                    value={condition.condition}
                    onChangeText={text => updateCondition(condition.id, 'condition', text)}
                    placeholder="Enter condition"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Diagnosed Date</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                    value={condition.diagnosedDate}
                    onChangeText={text => updateCondition(condition.id, 'diagnosedDate', text)}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Notes</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark h-20 text-top"
                    value={condition.notes}
                    onChangeText={text => updateCondition(condition.id, 'notes', text)}
                    placeholder="Additional notes"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={3}
                    editable={isEditing}
                  />
                </View>
              </View>
            ))}

            {isEditing && (
              <TouchableOpacity onPress={addCondition} className="flex-row items-center justify-center p-4 bg-blue-50 rounded-lg mb-4">
                <Ionicons name="add" size={20} color="#29B6F6" />
                <Text className="text-base font-[Inter-Medium] text-blue-500 ml-2">Add Condition</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Allergies Section */}
          <View className="mb-8">
            <Text className="text-[18px] font-[Inter-SemiBold] text-textLight dark:text-textDark mb-4">
              Allergies
            </Text>

            {allergies.map(allergy => (
              <View key={allergy.id} className="bg-white dark:bg-backgroundDark border border-borderLight dark:border-gray-400 rounded-xl p-4 mb-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-base font-[Inter-SemiBold] text-textLight dark:text-textDark">Allergy</Text>
                  {isEditing && (
                    <TouchableOpacity onPress={() => deleteAllergy(allergy.id)}>
                      <Ionicons name="trash-bin" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Allergen</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                    value={allergy.allergen}
                    onChangeText={text => updateAllergy(allergy.id, 'allergen', text)}
                    placeholder="Enter allergen"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Severity</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                    value={allergy.severity}
                    onChangeText={text => updateAllergy(allergy.id, 'severity', text)}
                    placeholder="Enter severity"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Reaction</Text>
                  <TextInput
                    className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                    value={allergy.reaction}
                    onChangeText={text => updateAllergy(allergy.id, 'reaction', text)}
                    placeholder="Enter reaction"
                    placeholderTextColor="#9CA3AF"
                    editable={isEditing}
                  />
                </View>
              </View>
            ))}

            {isEditing && (
              <TouchableOpacity onPress={addAllergy} className="flex-row items-center justify-center p-4 bg-blue-50 rounded-lg mb-4">
                <Ionicons name="add" size={20} color="##29B6F6" />
                <Text className="text-base font-[Inter-Medium] text-blue-500 ml-2">Add Allergy</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Insurance Info */}
          <View className="mb-8">
            <Text className="text-[18px] font-[Inter-SemiBold] text-textLight dark:text-textDark mb-4">
              Insurance Information
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Insurance Provider</Text>
              <TextInput
                className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                value={insuranceProvider}
                onChangeText={setInsuranceProvider}
                placeholder="Enter provider name"
                placeholderTextColor="#9CA3AF"
                editable={isEditing}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Policy Number</Text>
              <TextInput
                className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                value={policyNumber}
                onChangeText={setPolicyNumber}
                placeholder="Enter policy number"
                placeholderTextColor="#9CA3AF"
                editable={isEditing}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-[Inter-Medium] text-gray-500 mb-2">Group Number</Text>
              <TextInput
                className="bg-white border border-borderLight dark:bg-backgroundDark dark:border-gray-400 rounded-lg p-3 text-base text-textLight dark:text-textDark"
                value={groupNumber}
                onChangeText={setGroupNumber}
                placeholder="Enter group number"
                placeholderTextColor="#9CA3AF"
                editable={isEditing}
              />
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            {isEditing ? (
              <>
                <TouchableOpacity onPress={() => setIsEditing(false)} className="flex-1 h-12 bg-gray-100 rounded-lg justify-center items-center">
                  <Text className="font-[Inter-SemiBold] text-base text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} className="flex-1 h-12 bg-blue-500 rounded-lg justify-center items-center">
                  <Text className="font-[Inter-SemiBold] text-base text-white">Save Changes</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(true)} className="flex-1 h-12 bg-blue-500 rounded-lg justify-center items-center">
                <Text className="font-[Inter-SemiBold] text-base text-white">Edit Health Data</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default healthdata;