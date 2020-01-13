import React from 'react';
import RecipeCreation from './recipeCreation';
import {Root, Icon} from 'native-base';
import HomeScreen from './HomeScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

const MainNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home Screen',
      drawerIcon: () => <Icon name="home" />,
    },
  },
  RecipeCreation: {
    screen: RecipeCreation,
    navigationOptions: {
      drawerLabel: 'Recipe Creation',
      drawerIcon: () => <Icon name="construct" />,
    },
  },
});
const Navigator = createAppContainer(MainNavigator);

const App = () => (
  <Root>
    <Navigator />
  </Root>
);

export default App;
