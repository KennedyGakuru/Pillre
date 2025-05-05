import { NavigationProp, useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, ImageStyle} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '~/theme/colorScheme';
import { RootStackParamList } from '~/types/navigation';




const SuccessScreen : React.FC = () => {
    const {theme} = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const checkmarkStyle : ImageStyle = {
        height: 100,
        width: 100
    };

    const handleLogin = (): void => navigation.navigate('Login');

    return(
        <SafeAreaView edges={['top','left','right']}
        className={`flex-1 p-10 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
            <Image source={require('../../assets/checked.png.png')}
                 style={checkmarkStyle}
                 />
            <Text className="text-primary font-bold text-4xl">
            Password Changed!
            </Text>     
            <Text className="text-primary text-gray-600 text-xl">
            Your password has been changed successfully.
            </Text>     
            <TouchableOpacity onPress={handleLogin}
            className="w-full h-12 bg-primary items-center justify-center rounded-lg mt-10">
                <Text className="text-[white]">Register</Text>
            </TouchableOpacity>     
        </SafeAreaView>
    )
};


export default SuccessScreen;