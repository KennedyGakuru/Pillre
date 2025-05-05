import { useState, useRef } from "react";
import {View, Text, Image, FlatList, TouchableOpacity, Dimensions, StatusBar, ListRenderItemInfo } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "~/types/navigation";
import { useTheme } from "~/theme/colorScheme";

interface Slide {
    id: string;
    title: string;
    description: string;
    image: any;
}

const {width, height} = Dimensions.get('window');

const slides: Slide[] =[
    {
        id: '1',
        title: 'Stay Healthy, \n Stay On Track',
        description: 'Pillre helps you remember your \n daily medicine easily and safely.',
        image: require('../../assets/Onboard1.png'),
    },
    {
        id: '2',
        title: 'Never Miss \n a Dose Again',
        description: 'Get gentle reminders and easily log \n when you take your medicine.',
        image: require('../../assets/Onboard2.png'),
    },
    {
        id: '3',
        title: 'Built Just for You',
        description: 'Customize your schedule, track your\n progress, and stay in control of your health.',
        image: require('../../assets/Onboard3.png'),
    },
];

const OnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const flatListRef = useRef<FlatList<Slide>>(null);

const handleNext = () => {
    if(currentIndex < slides.length -1) {
        flatListRef.current?.scrollToIndex({ index: currentIndex +1});
    } else {
        navigation.navigate('Welcome');
    }
};

const handleSkip = () => {
    navigation.navigate('Login');
};

const updateIndex = (e: any) => {
    const index= Math.round(e.nativeEvent.contentOffset.x/width);
    setCurrentIndex(index);
};
const {theme} = useTheme();



const renderItem = ({item}: ListRenderItemInfo<Slide>) => (
    <View className="h-full items-center justify-center px-8">
            <Text className={` ${theme === 'dark' ? 'text-textDark' : 'text-text-Light'} 
            text-2xl  text-center mt-6 font-bold  max-w-[90%]`}>{item.title}</Text>
            <Text className=" text-gray-600 text-center mt-3  max-w-[90%]">{item.description}</Text>
            <Image
            source={item.image}
            style={{
                width: width * 0.85,
                height: height * 0.4,
              }}
            resizeMode='contain'
            />
    </View>
);


const Dot = ({active}: {active : boolean}) => (
    <View
    style={{
        height:8,
        width: 8,
        borderRadius:4,
        backgroundColor: active ? '#29B6F6' : '#D1D5DB',
        marginHorizontal: 5,
    }}
    />
);

return(
    <View className={`flex-1 ${theme === 'dark' ? 'bg-backgroundDark' : 'bg-backgroundLight'}`}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
        <TouchableOpacity  onPress={handleSkip} className="absolute right-5 top-10">
            <Text className="text-primary  font-bold text-[26px]">Skip</Text>
        </TouchableOpacity>
    

    <FlatList
       ref={flatListRef}
       data={slides}
       renderItem={renderItem}
       horizontal
       pagingEnabled
       showsHorizontalScrollIndicator={false}
       keyExtractor={item => item.id}
       onScroll={updateIndex}
       />


       <View className="flex-row justify-center mt-4">
        {slides.map((_,index) =>(
            <Dot key={index} active={index === currentIndex} />
        ))}
       </View>

       <TouchableOpacity
         onPress={handleNext}
         className="bg-primary mx-6 my-6 p-4 rounded-[10px] pb-6"
         >
            <Text style={{color: 'white', textAlign: 'center', fontWeight:'bold', fontSize: 20}}>
                {currentIndex === slides.length -1 ? 'Get Started' : 'Next'}
            </Text>
         </TouchableOpacity>

         </View>
);
};


export default OnboardingScreen;
    

