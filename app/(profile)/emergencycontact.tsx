import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';


interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  primaryPhone: string;
  secondaryPhone?: string;
  address?: string;
}

const EmergencyContactScreen: React.FC = () => {
  const { theme } = useTheme();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'John Doe',
      relationship: 'Father',
      primaryPhone: '555-0123',
      secondaryPhone: '555-0124',
      address: '123 Main St, City, State 12345',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addNewContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: '',
      relationship: '',
      primaryPhone: '',
    };
    setContacts(prev => [...prev, newContact]);
    setIsEditing(true);
  };

  const updateContact = (id: string, field: keyof EmergencyContact, value: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const deleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this emergency contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(prev => prev.filter(contact => contact.id !== id));
          },
        },
      ]
    );
  };

  const handleSave = async () => {
    setError(null);

    try {
      // Validate contacts
      const invalidContact = contacts.find(contact => 
        !contact.name || !contact.relationship || !contact.primaryPhone
      );

      if (invalidContact) {
        throw new Error('Please fill in all required fields for each contact');
      }

      // Save contacts logic here
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contacts');
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
    <ScrollView className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
      <View className="p-6">
        {error && (
          <View className="bg-red-100 p-4 rounded-lg mb-6">
            <Text className="font-inter-medium text-red-500 text-sm">{error}</Text>
          </View>
        )}

        <Text className={`font-inter-regular text-base mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Add emergency contacts who should be notified in case of an emergency.
        </Text>

        {contacts.map((contact, index) => (
          <View 
            key={contact.id} 
            className={`rounded-xl p-4 mb-4 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text className={`font-inter-semibold text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                Contact {index + 1}
              </Text>
              <TouchableOpacity
                className="p-2"
                onPress={() => deleteContact(contact.id)}
              >
                <Ionicons name="trash-bin" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className={`font-inter-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Full Name *
              </Text>
              <TextInput
                value={contact.name}
                onChangeText={(text) => updateContact(contact.id, 'name', text)}
                placeholder="Enter contact name"
                editable={isEditing}
                className={`border rounded-lg p-3 font-inter-regular text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`}
              />
            </View>

            {/* Repeat the same pattern for other fields */}
            <View className="mb-4">
              <Text className={`font-inter-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Relationship *
              </Text>
              <TextInput
                value={contact.relationship}
                onChangeText={(text) => updateContact(contact.id, 'relationship', text)}
                placeholder="Enter relationship"
                editable={isEditing}
                className={`border rounded-lg p-3 font-inter-regular text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`}
              />
            </View>

            <View className="mb-4">
              <Text className={`font-inter-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Primary Phone *
              </Text>
              <TextInput
                value={contact.primaryPhone}
                onChangeText={(text) => updateContact(contact.id, 'primaryPhone', text)}
                placeholder="Enter primary phone"
                keyboardType="phone-pad"
                editable={isEditing}
                className={`border rounded-lg p-3 font-inter-regular text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`}
              />
            </View>

            <View className="mb-4">
              <Text className={`font-inter-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Secondary Phone
              </Text>
              <TextInput
                value={contact.secondaryPhone}
                onChangeText={(text) => updateContact(contact.id, 'secondaryPhone', text)}
                placeholder="Enter secondary phone"
                keyboardType="phone-pad"
                editable={isEditing}
                className={`border rounded-lg p-3 font-inter-regular text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`}
              />
            </View>

            <View className="mb-4">
              <Text className={`font-inter-medium text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Address
              </Text>
              <TextInput
                value={contact.address}
                onChangeText={(text) => updateContact(contact.id, 'address', text)}
                placeholder="Enter contact address"
                multiline
                numberOfLines={3}
                editable={isEditing}
                className={`border rounded-lg p-3 h-20 font-inter-regular text-base ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'}`}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          className={`flex-row items-center justify-center p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}
          onPress={addNewContact}
          disabled={!isEditing}
        >
          <Ionicons name='add' size={20} color="#3B82F6" />
          <Text className="font-inter-medium text-blue-500 ml-2">Add Another Contact</Text>
        </TouchableOpacity>

        <View className="flex-row gap-3">
          {isEditing ? (
            <>
              <TouchableOpacity
                className={`flex-1 h-12 rounded-lg justify-center items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                onPress={() => setIsEditing(false)}
              >
                <Text className={`font-inter-semibold text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 h-12 bg-blue-500 rounded-lg justify-center items-center"
                onPress={handleSave}
              >
                <Text className="font-inter-semibold text-white text-base">
                  Save Changes
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="flex-1 h-12 bg-blue-500 rounded-lg justify-center items-center"
              onPress={() => setIsEditing(true)}
            >
              <Text className="font-inter-semibold text-white text-base">
                Edit Contacts
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContactScreen;