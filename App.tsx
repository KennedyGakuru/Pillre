import {View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from 'screens/HomeScreen';
import './global.css';

const App = (): JSX.Element => {
  return (
    <View className="flex-1">
      <HomeScreen/>
    </View>
  );
};

export default App;
