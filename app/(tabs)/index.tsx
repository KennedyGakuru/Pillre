import {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'context/AuthContext';
import { router } from 'expo-router';
import DashboardHeader from 'components/DashboardHeader';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'theme/colorScheme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import WeekCalendar from 'components/WeekCalendar';
import { format } from 'date-fns';
import MedicineProgressCircle from 'components/MedicineProgressCircle';
import MedicationListItem from 'components/MedicationListItem';



export default function HomeScreen() {
  const { user } = useAuth();
  const {theme} = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const upcomingMedications = useSelector(
    (state: RootState) => state.medications.medications
  );
  
 const highlightedDates = [
    '2025-05-20',
    '2025-05-22',
    '2025-05-24',
  ];

  return (
    <SafeAreaView 
          edges={['top', 'left', 'right']}
          className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}
        >
      <DashboardHeader name={user?.name || 'User'} />
      
      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
        <View className='mb-6'>
          <View className='flex-row justify-between items-center m-4'>
            <Text className={`font-inter-semibold text-lg ${theme === 'dark' ? 'text-textDark' : 'text-textLight'}`}>Today's Medications</Text>
          </View>
          
          <WeekCalendar
           onDateSelect={setSelectedDate}
           highlightedDates={highlightedDates}
           
           />

           <MedicineProgressCircle progress={2/4} medStatus={'2/5'} day={'wednesday'} /> 

          {upcomingMedications.map((med) => (

          <MedicationListItem
          key={med.id}
         medication={med}
         onPress={() => router.push('/(medications)/edit')}
          />
         ))} 
          
        </View>
        
        
        
        
      </ScrollView>
    </SafeAreaView>
  );
}

function useDate(arg0: any): [any, any] {
  throw new Error('Function not implemented.');
}

function newDate(): any {
  throw new Error('Function not implemented.');
}

