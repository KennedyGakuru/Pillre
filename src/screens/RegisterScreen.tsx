import {Text,View, TouchableOpacity, TextInput, ImageStyle, Image} from 'react-native';
import { useTheme } from '~/theme/colorScheme';
import { useState } from 'react';
import { RootStackParamList } from '~/types/navigation';
import { NavigationProp,useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const RegisterScreen : React.FC = () => {
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmPassword] = useState<string>('');
    const [passwordError,setPasswordError] = useState<string | null>(null);
    const [secureTextEntry,setSecureTextEntry] =useState<boolean>(true);

    const handleBack = (): void => navigation.goBack();
    
    const toggleSecurity = (): void => setSecureTextEntry(!secureTextEntry);
    const validateEmail = (email:string) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        }
        setEmailError(null);
        return true;
    };
    const validatePassword =(confirmText: string) => {
        if (password !== confirmText) {
            setPasswordError("Password don't match");
            return false;
        }
        setPasswordError(null)
        return true;
    };
    const handleRegistration = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = password === confirmpassword;

        if (isEmailValid && isPasswordValid) {
            navigation.navigate('Login')
        }
    }

    const googleLogoStyle : ImageStyle = {
        height: 35,
        width: 35
    };
    const handleLogin = (): void => navigation.navigate('Login');

    return(
        <SafeAreaView edges={['top','left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
        
            <TouchableOpacity onPress={handleBack} 
            style={{backgroundColor:'#F5F5F5', height:40, width:40, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name='arrow-back' size={25} color='black' 
            />
            </TouchableOpacity>

            <View className='mt-20 items-center'>
                <Text className="text-primary text-3xl font-bold text-center">
                    Hello! Register{'\n'}to get started!
                </Text>
            </View>
            <View className="mt-10 items-center">
                <TextInput
                 className='border border-gray-300 h-12 w-full rounded-lg px-4 text-base'
                 style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                 placeholder='UserName'
                 placeholderTextColor='#999'
                 value={userName}
                 onChangeText={(text: string) => setUserName(text)}
                 autoCapitalize='words'
                 />
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

            <View className="mt-10 items-center">
                <View className=" border border-gray-300 h-12 w-full flex-row items-center rounded-lg">
                <TextInput
                 className="flex-1 px-4"
                 style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                 placeholder='Enter your Password'
                 placeholderTextColor='#999'
                 value={password}
                 onChangeText={(text: string) => setPassword(text)}
                 secureTextEntry={secureTextEntry}
                 />
                 <TouchableOpacity onPress={toggleSecurity}
                 className="p-2" >
                  <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color='#29B6F6'
                  />
                  </TouchableOpacity>
                  </View>
            </View>
            <View className="mt-10 items-center">
                <View className=" border border-gray-300 h-12 w-full flex-row items-center rounded-lg">
                <TextInput
                 className="flex-1 px-4"
                 style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                 placeholder='Confirm your Password'
                 placeholderTextColor='#999'
                 value={confirmpassword}
                 onChangeText={(text) =>{
                    setConfirmPassword(text);
                    validatePassword(text);}}
                 secureTextEntry={secureTextEntry}
                 />
                 <TouchableOpacity onPress={toggleSecurity}
                 className="p-2" >
                  <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color='#29B6F6'
                  />
                  </TouchableOpacity>
                  </View>
                  {passwordError && <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4, alignSelf:'flex-start' }}>{passwordError}</Text>}
            </View>

            <TouchableOpacity onPress={handleRegistration}
            className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Register</Text>
            </TouchableOpacity>
            <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300"/>
                    <Text className="px-4 text-gray-400">or</Text>
                <View className="flex-1 h-px bg-gray-300"/>
            </View>

            <TouchableOpacity 
            className="w-full h-12 border border-gray-300 items-center justify-center rounded-lg  flex-row ">
                <Image source={require('../../assets/Google logo.png')}
                 style={googleLogoStyle}
                 />
                <Text style={{color: theme === 'dark' ? '#F3F4F6' : '#1F2937'}}>Continue with Google</Text>
            </TouchableOpacity>


            <View className='items-center justify-end flex-1 pb-6'>
            <View className="flex-row ">
                <Text className="text-gray-600">Already have an account?</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text className="text-primary ">Login</Text>
                </TouchableOpacity>
            </View>
            </View>

        </SafeAreaView>
    ) 
};

export default RegisterScreen;

