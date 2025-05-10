import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { useTheme } from 'theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {  useRouter } from 'expo-router';

const ForgotPasswordScreen : React.FC = () => {
    const {theme} = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] =useState<string | null>(null);

    const handleBack = (): void => router.back();
    const handleLogin = (): void => router.replace('/login');
    const validateEmail = (email:string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setEmailError('Please enter a valid email');
            return false;
        }
        setEmailError(null);
        return true;
    };

    const handleSendCode = () => {
        const isEmailValid = validateEmail(email);

        if (isEmailValid){
          router.replace('/verify');
        }
    };

    return(
        <SafeAreaView edges={['top','left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>

            <TouchableOpacity onPress={handleBack} 
            style={{backgroundColor:'#F5F5F5', height:40, width:40, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name='arrow-back' size={25} color='black' 
            />
            </TouchableOpacity>
            <View className="mt-20 ">
            <Text className="text-primary font-bold text-4xl">
            Forgot Password?
            </Text>
            <Text className="text-gray-600 text-xl ">
            Don't worry! It occurs. Please enter the {'\n'}email address linked with your account.
            </Text>
            </View>
            <View className="mt-10 items-center ">
                            <TextInput
                             className='border border-gray-300 h-12 w-full rounded-lg px-4'
                             style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                             placeholder='Enter your Email'
                             placeholderTextColor='#999'
                             value={email}
                             onChangeText={(text)  =>{
                                setEmail(text); 
                                validateEmail(text);}}
                             keyboardType='email-address'
                             autoCapitalize='none'
                             />
                             {emailError && <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4, alignSelf: 'flex-start' }}>{emailError}</Text>}
                        </View>
            <TouchableOpacity onPress={handleSendCode}
                className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Send Code</Text>
            </TouchableOpacity>
            <View className='items-center justify-end flex-1 pb-6'>
            <View className="flex-row ">
                <Text className="text-gray-600">Remeber Password?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text className="text-primary ">Login</Text>
                </TouchableOpacity>
            </View>
            </View>            
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;