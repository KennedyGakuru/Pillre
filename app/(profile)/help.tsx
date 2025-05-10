import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


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
    return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          {faqs.map((faq, index) => (
            <View 
              key={index} 
              style={[
                styles.faqItem,
                index === faqs.length - 1 && styles.faqItemLast
              ]}
            >
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          
          <View style={styles.supportContainer}>
            {supportOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.supportOption}
                onPress={option.action}
              >
                <View style={styles.supportIconContainer}>
                  {option.icon}
                </View>
                <View style={styles.supportInfo}>
                  <Text style={styles.supportTitle}>{option.title}</Text>
                  <Text style={styles.supportDescription}>{option.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Guides</Text>
          
          <TouchableOpacity style={styles.guideItem}>
            <Text style={styles.guideTitle}>Getting Started Guide</Text>
            <Text style={styles.guideDescription}>
              Learn the basics of using the app and setting up your profile
            </Text>
           <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.guideItem}>
            <Text style={styles.guideTitle}>Medication Management</Text>
            <Text style={styles.guideDescription}>
              How to add, edit, and track your medications
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.guideItem}>
            <Text style={styles.guideTitle}>Appointment Booking</Text>
            <Text style={styles.guideDescription}>
              Step-by-step guide to scheduling appointments
            
            </Text>
           <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troubleshooting</Text>
          
          <TouchableOpacity style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingTitle}>
              Common Issues and Solutions
            </Text>
            <Text style={styles.troubleshootingDescription}>
              Find solutions to common problems and app-related issues
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.troubleshootingItem}>
            <Text style={styles.troubleshootingTitle}>
              Connection Problems
            </Text>
            <Text style={styles.troubleshootingDescription}>
              Resolve issues with app connectivity and syncing
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Need more help? Our support team is available 24/7 to assist you.
          </Text>
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    borderRadius: 8,
  },
  faqItemLast: {
    marginBottom: 0,
  },
  question: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  answer: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  supportContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  supportDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  guideItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  guideDescription: {
    flex: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginRight: 16,
  },
  troubleshootingItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  troubleshootingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  troubleshootingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  footer: {
    padding: 24,
    backgroundColor: '#EBF5FF',
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#3B82F6',
    textAlign: 'center',
  },
});


export default help;