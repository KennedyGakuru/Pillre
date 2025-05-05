import {View, Text, TouchableOpacity, TextInput, Image, StatusBar, ImageStyle} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '~/theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';
import {useState } from 'react';



const LoginScreen: React.FC = () => {
    const {theme}= useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

    const handleBack = (): void => navigation.goBack();
    const handleRegister = (): void => navigation.navigate('Register'); 
    const handleForgotPassword = (): void => navigation.navigate('ForgotPassword'); 
    const toggleSceurity = (): void => setSecureTextEntry(!secureTextEntry);
    const googleLogoStyle : ImageStyle = {
        height: 35,
        width: 35
    };

    return(
        <SafeAreaView edges={['top', 'left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
             <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
            <TouchableOpacity onPress={handleBack} 
            style={{backgroundColor:'#F5F5F5', height:40, width:40, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
            <Ionicons name='arrow-back' size={25} color='black' 
            />
            </TouchableOpacity>
            <View className='mt-20 items-center'>
                <Text className="text-primary text-3xl font-bold text-center">
                    Welcome back!{'\n'}Glad to see you, Again!
                </Text>
            </View>    
            <View className="mt-10 items-center">
                <TextInput
                 className='border border-gray-300 h-12 w-full rounded-lg p-5'
                 placeholder='Enter your Email'
                 placeholderTextColor='#999'
                 value={email}
                 onChangeText={(text: string) => setEmail(text)}
                 keyboardType='email-address'
                 autoCapitalize='none'
                 />
            </View>
            <View className="mt-10 items-center">
                <View className=" border border-gray-300 h-12 w-full flex-row items-center rounded-lg">
                <TextInput
                 className="flex-1 p-5"
                 placeholder='Enter your Password'
                 placeholderTextColor='#999'
                 value={password}
                 onChangeText={(text: string) => setPassword(text)}
                 secureTextEntry={secureTextEntry}
                 />
                 <TouchableOpacity onPress={toggleSceurity}
                 className="p-2" >
                  <Ionicons name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color='#29B6F6'
                  />
                  </TouchableOpacity>
                  </View>
            </View>
            
            <TouchableOpacity onPress={handleForgotPassword} 
            className="self-end mb-4">
            <Text className="text-primary ">Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Login</Text>
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
                <Text className="text-gray-600">Don't Have an Account?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text className="text-primary ">Register</Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;