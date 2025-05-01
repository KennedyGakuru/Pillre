import Onboarding from 'react-native-onboarding-swiper';
import {Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
    return(
        <Onboarding
         onSkip={() => navigation.replace('Login')}
         onDone={() => navigation.replace('Login')}
         pages={[
            {
                backgroundColor: '#ffffff',
                image: <Image source={require('../../assets/Onboard1.png')} style={{width:200, height: 200}} />,
                title: 'Stay Healthy,Stay On Track',
                subtitle: 'Pillre helps you remember your daily medicine easily and safely.'
            },
            {
                backgroundColor: '#ffffff',
                image: <Image source={require('../../assets/Onboard2.png')} style={{width:200, height: 200}} />,
                title: 'Never Miss a Dose Again',
                subtitle: 'Get gentle reminders and easily log when you take your medicine.'
            },
            {
                backgroundColor: '#ffffff',
                image: <Image source={require('../../assets/Onboard3.png')} style={{width:200, height: 200}} />,
                title: 'Built Just for You',
                subtitle: 'Customize your schedule, track your progress, and stay in control of your health.'
            },
         ]}
         />
    );
};


export default OnboardingScreen;