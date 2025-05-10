import {View, Text, Image, TouchableOpacity} from 'react-native';
import { useTheme } from 'theme/colorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  useRouter } from 'expo-router';



const WelcomeScreen: React.FC = () => {
    const {theme} = useTheme();
    const router = useRouter();
    

    const handleLogin = () => router.replace('/login');
    const handleRegister = () => router.replace('/register');

    return(
        <SafeAreaView edges={['top', 'left', 'right']}
        className={`${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight' } flex-1 items-center `}>
            <Image source={require('../../assets/Pillre.logo.png')}
            style={{height:350, width:350}}
            className="mt-8"
            resizeMode='contain'
            />
            <View className="items-center my-2">
            <Text className="text-primary text-2xl text-center">
             Welcome To
            </Text>
            <Text className="text-primary font-bold text-4xl text-center">
                Pillre
            </Text>
            <Text className="text-primary  text-base mt-2 text-center">
            Your personal assistant for managing {'\n'}your medication schedule.
            </Text>
            </View>
            <View className="w-full max-w-[300px]">
            <TouchableOpacity onPress={handleLogin}
            className="w-full h-12 bg-primary items-center justify-center rounded-lg mb-4">
                <Text className="text-[white]">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}
            className="w-full h-12 bg-primary items-center justify-center rounded-lg">
                <Text className="text-[white]">Register</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

export default WelcomeScreen;