import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "~/screens/HomeScreen";
import AddScreen from "~/screens/AddScreen";
import ProfileScreen from "~/screens/ProfileScreen";


export type BottomParamList ={
    Home: undefined;
    Add: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomParamList>();


const BottomTabs = ()  => {
    return(
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => {
                let iconName: keyof typeof Ionicons.glyphMap = "home";
                if (route.name === 'Home'){
                    iconName = 'home';
                } else if (route.name === 'Add'){
                    return(
                    <Ionicons name='add-circle' size={50} color={color} style={{ marginBottom: -20, marginRight: -20, marginLeft: -20 }}/>
                    );
                }else if (route.name === 'Profile'){
                    iconName = 'person';
                }   
                return <Ionicons name={iconName} size={size} color={color} style={{ marginBottom: -20 }}/>
            },
            tabBarActiveTintColor:'#29B6F6',
            tabBarInactiveTintColor: 'white',
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#455A64',
                borderRadius: 40,
                height: 60,
                width: '90%',
                bottom: 20,
                marginHorizontal: '5%',
                position: 'absolute',
                borderTopWidth: 0,           
            }
        })}
       >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
       </Tab.Navigator> 
    );
};

export default BottomTabs;