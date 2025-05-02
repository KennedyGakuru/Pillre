import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '~/theme/colorScheme';

const LoginScreen = () => {
    const {theme}= useTheme();
    return(
        <View className="flex-1">
            <Text className= "text-[#29B6F6] text-2xl"> Welcome back! Glad to see you, Again!</Text>
        </View>
    );
}

export default LoginScreen;