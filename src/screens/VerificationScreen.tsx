import {Text,TouchableOpacity,View, TextInput} from 'react-native';
import { useTheme } from '~/theme/colorScheme';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp,useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '~/types/navigation';
import { useState,useRef } from 'react';

const VerifictionScreen : React.FC = () => {
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [code, setCode] = useState(["","","",""]);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleBack = (): void => navigation.goBack();

    const handleChange = (text:string, index:number) => {
        if (/^\d$/.test(text)) {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

            if (index < 3 &&  inputs.current[index +1]) {
                inputs.current[index + 1] ?.focus();
            }
        }else  if (text=== '') {
            const newCode = [...code];
            newCode[index] = '',
            setCode(newCode);
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && code[index] === '') {
            if(index > 0) {
                inputs.current[index -1]?.focus();
            }
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
                        Verification
                        </Text>
                        <Text className="text-gray-600 text-xl ">
                        Enter the verification code we just sent on your email address.
                        </Text>
                        </View>

                <View className="flex-row justify-between w-4/5 self-center mt-6">
                 {code.map((digit,index) =>(
                    <TextInput
                     key={index}
                     ref={(ref) => { inputs.current[index] = ref; }}
                     value={digit}
                     onChangeText={(text) => handleChange(text, index)}
                     onKeyPress={(e) => handleKeyPress(e, index)}
                     keyboardType='number-pad'
                     maxLength={1}
                     className="border border-gray-600  rounded-xl text-center text-xl p-3 w-12  h-12 dark:border-white"
                     style={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937' }}
                     />
                 ))}

                </View>
            <TouchableOpacity 
                className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Verify</Text>
            </TouchableOpacity> 

            <View className='items-center mt-10 flex-1'>
                        <View className="flex-row ">
                            <Text className="text-gray-600">Didn't receive code?</Text>
                            <TouchableOpacity>
                                <Text className="text-primary ">Resend</Text>
                            </TouchableOpacity>
                        </View>
                        </View>           

        </SafeAreaView>
    )
};

export default VerifictionScreen;