import {View, Text, TouchableOpacity, TextInput, Button, Pressable, Platform, Modal} from 'react-native';
import { useTheme } from '~/theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddScreen: React.FC = () => {

    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [name, setName] = useState<string>('');
    const [dose, setDose] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);



    const [items, setItems] = useState([
        { label: 'Capsule', value: 'capsule' },
        { label: 'Drop', value: 'drop' },
        { label: 'Tablet', value: 'tablet' },
      ]);



    const handleBack = (): void => navigation.goBack();
    const handleSave = async () => {
        const medicineData ={
            id: Date.now(),
            name,
            dose,
            amount,
            type: selectedValue,
            data: date.toISOString(),
            time: time.toISOString(),
        };
        try{
            const storedData = await AsyncStorage.getItem('medicines');
            const existing = storedData ? JSON.parse(storedData) : [];

            const updated = [...existing, medicineData];

            await AsyncStorage.setItem('medicines', JSON.stringify(updated));

            console.log('Saved Successfully');
            // navigation.navigate('Tabs', { screen: 'Home' })

        } catch (error) {
            console.error('Save error:',error);
        }
    };

    return(
        <SafeAreaView edges={['top', 'left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
            <TouchableOpacity onPress={handleBack} 
            style={{backgroundColor:'#F5F5F5', height:40, width:40, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name='arrow-back' size={25} color='black' 
            />
            </TouchableOpacity>
            <View className='items-center'>
                <Text className="text-primary text-3xl font-bold text-center">
                Add New Medicine
                </Text>
                <Text className="text-gray-600 text-xl  text-center">
                Fill out the fields and {'\n'} hit the Save Button to add it!
                </Text>
            </View> 
            <View>
                <Text 
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}>
                    Name</Text>
                <TextInput
                className='border border-gray-300 h-12 w-full rounded-lg px-4 text-base mt-3'
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                placeholder='Name (e.g. Ibuprofen)'
                value={name}
                onChangeText={(text : string) => setName(text)}
                autoCapitalize='words'
                />
            </View>
            <View className="mt-10 z-50"> 
             <Text className="text-base mb-2" style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}>
              Type
             </Text>
              <DropDownPicker
                open={open}
                value={selectedValue}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedValue}
                setItems={setItems}
                placeholder="Select an option"
                style={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
                borderColor: '#D1D5DB', marginTop: 8
                }}
                dropDownContainerStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#fff',
                borderColor: '#D1D5DB',
                }}
                textStyle={{
                color: theme === 'dark' ? '#F3F4F6' : '#1F2937',
                }}
                placeholderStyle={{
                color: '#9CA3AF',
                }}
                 />
            </View>
            
            <View className="mt-10">
                <Text 
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}>
                    Dose</Text>
                <TextInput
                className='border border-gray-300 h-12 w-full rounded-lg px-4 text-base mt-3'
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                placeholder='Dose (e.g. 100mg)'
                value={dose}
                onChangeText={(text : string) => setDose(text)}
                autoCapitalize='words'
                />
            </View>
            <View className="mt-10">
                <Text 
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}>
                    Amount</Text>
                <TextInput
                className='border border-gray-300 h-12 w-full rounded-lg px-4 text-base mt-3'
                style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                placeholder='Dose (e.g. 3)'
                value={amount}
                onChangeText={(text : string) => setAmount(text)}
                keyboardType='numeric'
                autoCapitalize='words'
                />
            </View>
            <View className='mt-5'>
                <Text style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                >Reminders</Text>
                <Text style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                >Date</Text>
                
                <View className='flex-row justify-between'>
                <TouchableOpacity className="w-12 h-6 bg-primary items-center justify-center rounded-lg mt-10"
                onPress={() => setShowDatePicker(true)}> <Text className='text-white'> Date</Text></TouchableOpacity>
              {showDatePicker && (
              <DateTimePicker
              value={date}
              mode="date"
             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
             onChange={(event, selectedDate) => {
             setShowDatePicker(false);
             if (selectedDate) setDate(selectedDate);
             }}
             />
            )}
           <TouchableOpacity className="w-12 h-6 bg-primary items-center justify-center rounded-lg mt-10"
            onPress={() => setShowTimePicker(true)}> <Text className="text-white"> Time</Text></TouchableOpacity>
            {showTimePicker && (
             <DateTimePicker
             value={time}
             mode="time"
             is24Hour={true}
             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
             onChange={(event, selectedTime) => {
             setShowTimePicker(false);
             if (selectedTime) setTime(selectedTime);
             }}
             />
             )}
             </View>
            </View>
             <Text className="text-lg">{date.toDateString()}: {time.toLocaleTimeString()}</Text>
            <View className="items-center">
            <TouchableOpacity onPress={handleSave}
            className="w-36 h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Save</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddScreen;