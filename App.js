/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './HomeScreen'; 
import SavedScreen from './SavedScreen';
import Warna from './components/Colors'; 

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Saved: SavedScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Warna.primary394,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
console.disableYellowBox = true;
export default createAppContainer(AppNavigator);