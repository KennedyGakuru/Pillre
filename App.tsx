
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { JSX } from 'react';
import BottomTabs from '~/navigation/BottomTabs';
import StackNavigator from '~/navigation/StackNavigator';

const App = (): JSX.Element => {
  return (  
      <NavigationContainer>
      <StackNavigator/>
      </NavigationContainer>   
  );
};

export default App;
