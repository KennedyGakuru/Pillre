
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from '~/navigation/BottomTabs';


const App = (): JSX.Element => {
  return (
      <NavigationContainer>
      <BottomTabs/>
      </NavigationContainer>
  );
};

export default App;
