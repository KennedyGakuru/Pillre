import {View, Text, TouchableOpacity, TextInput, Button, Pressable, Platform, Modal} from 'react-native';
import { useTheme } from '~/theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import  DateTimePicker  from '@react-native-community/datetimepicker';



const AddScreen: React.FC = () => {

    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [name, setName] = useState<string>('');
    const [dose, setDose] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [mode, setMode] = useState<'date' |'time'>('date');
    const [show, setShow] = useState(false);

    const formatDateTime = (date: Date)  => {
        const dd =  String(date.getDate()).padStart(2,'0');
        const mm = String(date.getMonth()+2).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2,'0');
        const min = String(date.getMinutes()).padStart(2,'0');
        return `${dd}/${mm}, ${hh}${min}`;
    };

    const showMode = (currentMode: 'date' | 'time') => {
        setMode(currentMode)
        setShow(true)
    };

    const onChange = (event: any, selectedDate?: Date) => {
        if(selectedDate) {
            setDateTime(selectedDate)
        }
        setShow(false)
    };

    const [items, setItems] = useState([
        { label: 'Capsule', value: 'capsule' },
        { label: 'Drop', value: 'drop' },
        { label: 'Tablet', value: 'tablet' },
      ]);



    const handleBack = (): void => navigation.goBack();

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
                
            </View>
            <View className="items-center">
            <TouchableOpacity 
            className="w-36 h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Save</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddScreen;