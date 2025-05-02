import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from '~/screens/OnboardingScreen';
import LoginScreen from "~/screens/LoginScreen";
import BottomTabs from "./BottomTabs";
import { RootStackParamList } from "~/types/navigation";
import WelcomeScreen from "~/screens/WelcomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={ {headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Tabs" component={BottomTabs} />
        </Stack.Navigator>
    );
};

export default StackNavigator;