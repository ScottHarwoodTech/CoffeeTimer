import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RecipeCreation from './recipeCreation';
import {getTheme} from 'native-base';

const MainNavigator = createStackNavigator({
  RecipeCreation: {
    screen: RecipeCreation,
    navigationOptions: ({navigation}) => ({title: 'Add Recipe'}),
  },
});
const Navigation = createAppContainer(MainNavigator);
const theme = getTheme();

const App = () => <Navigation screenProps={{theme}} />;

export default App;
