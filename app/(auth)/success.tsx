import { NavigationProp, useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, ImageStyle} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'theme/colorScheme';
import {  useRouter } from 'expo-router';





const SuccessScreen : React.FC = () => {
    const {theme} = useTheme();
    const router = useRouter();

    const checkmarkStyle : ImageStyle = {
        height: 100,
        width: 100
    };

    const handleLogin = (): void => router.replace('/login');

    return(
        <SafeAreaView edges={['top','left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
            <View className="items-center">
            <Image source={require('../../assets/checked.png')}
                 style={checkmarkStyle}
                 />
                 </View>
            <Text className="text-primary font-bold text-4xl self-center mt-20">
            Password Changed!
            </Text>     
            <Text className="text-primary text-gray-600 text-xl self-center">
            Your password has been changed successfully.
            </Text>     
            <TouchableOpacity onPress={handleLogin}
            className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-20">
                <Text className="text-[white]">Back to Login</Text>
            </TouchableOpacity>     
        </SafeAreaView>
    )
};


export default SuccessScreen;