import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from '~/screens/OnboardingScreen';
import LoginScreen from "~/screens/LoginScreen";
import BottomTabs from "./BottomTabs";
import { RootStackParamList } from "~/types/navigation";
import WelcomeScreen from "~/screens/WelcomeScreen";
import RegisterScreen from "~/screens/RegisterScreen";
import ForgotPasswordScreen from "~/screens/ForgotPasswordScreen";
import NewPasswordScreen from "~/screens/NewPasswordScreen";
import SuccessScreen from "~/screens/SuccessScreen";
import VerificationScreen from "~/screens/VerificationScreen";




const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Tabs" screenOptions={ {headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="Tabs" component={BottomTabs} />
        </Stack.Navigator>
    );
};

export default StackNavigator;