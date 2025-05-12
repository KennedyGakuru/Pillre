import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';


const faqs = [
  {
    question: 'How do I add a new medication?',
    answer: 'To add a new medication, go to the Medications tab and tap the "+" button in the top right corner. Fill in the medication details and tap "Save".',
  },
  {
    question: 'How do I schedule an appointment?',
    answer: 'Navigate to the Appointments tab and tap "Book New Appointment". Select your preferred doctor, date, and time slot to schedule your visit.',
  },
  {
    question: 'Can I set medication reminders?',
    answer: 'Yes! When adding or editing a medication, you can set up custom reminders. The app will notify you when it\'s time to take your medication.',
  },
  {
    question: 'How do I update my emergency contacts?',
    answer: 'Go to Profile > Emergency Contacts. Here you can add, edit, or remove emergency contacts who should be notified in case of emergencies.',
  },
  {
    question: 'Is my health data secure?',
    answer: 'Yes, we take your privacy seriously. All your health data is encrypted and stored securely. We comply with HIPAA regulations and industry security standards.',
  },
];

const supportOptions = [
  {
    icon: <Ionicons name="call" size={24} color="#3B82F6" />,
    title: 'Call Support',
    description: 'Speak with our support team',
    action: () => Linking.openURL('tel:1-800-123-4567'),
  },
  {
    icon: <Ionicons name="mail-outline" size={24} color="#3B82F6" />,
    title: 'Email Support',
    description: 'Send us an email',
    action: () => Linking.openURL('mailto:support@healthapp.com'),
  },
  {
    icon: <Ionicons name="chatbubble" size={24} color="#3B82F6" />,
    title: 'Live Chat',
    description: 'Chat with a support agent',
    action: () => {/* Open chat window */},
  },
];



const help: React.FC = () => {
  const {theme} = useTheme();
    return (
    <SafeAreaView 
      edges={['top', 'left', 'right']}
      className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}
    >
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* FAQ Section */}
          <View className="mb-8">
            <Text className={`font-inter-semibold text-lg mb-4 ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>
              Frequently Asked Questions
            </Text>
            
            {faqs.map((faq, index) => (
              <View 
                key={index} 
                className={`p-4 border rounded-lg mb-3 ${index === faqs.length - 1 ? 'mb-0' : ''} ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-inter-semibold text-base mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  {faq.question}
                </Text>
                <Text className={`font-inter-regular text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.answer}
                </Text>
              </View>
            ))}
          </View>

          {/* Contact Support Section */}
          <View className="mb-8">
            <Text className={`font-inter-semibold text-lg mb-4 ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>
              Contact Support
            </Text>
            
            <View className={`rounded-xl border overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {supportOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center p-4 ${
                    index < supportOptions.length - 1 ? 'border-b border-gray-200' : ''
                  } ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  onPress={option.action}
                >
                  <View className={`w-12 h-12 rounded-full mr-4 justify-center items-center ${
                    theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
                  }`}>
                    {option.icon}
                  </View>
                  <View className="flex-1">
                    <Text className={`font-inter-semibold text-base ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                      {option.title}
                    </Text>
                    <Text className={`font-inter-regular text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {option.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* User Guides Section */}
          <View className="mb-8">
            <Text className={`font-inter-semibold text-lg mb-4 ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>
              User Guides
            </Text>
            
            {['Getting Started Guide', 'Medication Management', 'Appointment Booking'].map((title, index) => (
              <TouchableOpacity 
                key={index}
                className={`flex-row items-center p-4 border rounded-lg mb-3 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <View className="flex-1 mr-4">
                  <Text className={`font-inter-semibold text-base mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                    {title}
                  </Text>
                  <Text className={`font-inter-regular text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {title === 'Getting Started Guide' 
                      ? 'Learn the basics of using the app and setting up your profile'
                      : title === 'Medication Management'
                      ? 'How to add, edit, and track your medications'
                      : 'Step-by-step guide to scheduling appointments'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Troubleshooting Section */}
          <View className="mb-8">
            <Text className={`font-inter-semibold text-lg mb-4 ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>
              Troubleshooting
            </Text>
            
            {['Common Issues and Solutions', 'Connection Problems'].map((title, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 border rounded-lg mb-3 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-inter-semibold text-base mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  {title}
                </Text>
                <Text className={`font-inter-regular text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {title === 'Common Issues and Solutions'
                    ? 'Find solutions to common problems and app-related issues'
                    : 'Resolve issues with app connectivity and syncing'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <Text className={`font-inter-regular text-sm text-center ${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`}>
              Need more help? Our support team is available 24/7 to assist you.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default help;