import {View, Text, TouchableOpacity} from 'react-native';
import { useTheme } from '~/theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, Agenda } from 'react-native-calendars';

const HomeScreen: React.FC = () => {
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    return(
        <SafeAreaView edges={['top', 'left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
            <Calendar
            hideExtraDays={true}
            firstDay={1}
            onDayPress={(day) => console.log(day)}
            markedDates={{
                '2025-5-10': {selected: true, marked: true, selectedColor: '#00adf5'}
            }}
            enableSwipeMonths={true}
            theme={{
                backgroundColor: 'white',
                calendarBackground: 'white',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: 'white',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                arrowColor: '#00adf5',
                monthTextColor: '#00adf5',
            }}
            />
            <Text className="text bold">Pillre</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;