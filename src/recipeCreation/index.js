import React, {useState} from 'react';
import {AsyncStorage, StyleSheet} from 'react-native';
import NumericInput from '../sharedComponents/NumericInput';
import RecipeStages from './recipeCreation/recipeStages';
import Rational, {reduceRational} from './recipeCreation/rational';
import {Toast, Button, Text, Container, H3, View, Content} from 'native-base';
import StageGraph from './recipeCreation/stageGraph';
import NavigationHeader from '../sharedComponents/NavigationHeader';
const styles = StyleSheet.create({
  container: {
    height: null,
    width: null,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    paddingTop: 10,
  },
  ratioTop: {
    paddingTop: 40,
  },
  ratioBottom: {
    paddingBottom: 40,
  },
  info: {
    flexDirection: 'row',
  },
  halfSize: {
    flex: 1,
    paddingLeft: 5,
    alignItems: 'center',
    padding: 5,
  },
  verticalDivider: {
    borderLeftWidth: 1,
  },
});

const RecipeCreation = props => {
  const [coffeeAmount, setCoffeeAmount] = useState(10);
  const [waterAmount, setWaterAmount] = useState(400);
  const [numerator, denominator] = reduceRational(coffeeAmount, waterAmount);
  const [stages, setStages] = useState([
    {time: 1, waterAmount: 400, title: 'Stage 1'},
  ]);
  const saveRecipe = async () => {
    try {
      await AsyncStorage.setItem('recipe', JSON.stringify(stages));
      Toast.show({
        text: 'Recipe Saved!',
        type: 'success',
      });
    } catch {
      Toast.show({
        text: 'Recipe failed to save :(',
        type: 'danger',
      });
    }
  };
  return (
    <Container>
      <NavigationHeader navigation={props.navigation} title={"Add Recipe"} />
      <Content padder>
        <Rational
          title="Ratio:"
          numerator={numerator}
          denominator={denominator}
          style={{...styles.ratioBottom}}
        />
        <View style={styles.info}>
          <View style={{...styles.info, ...styles.halfSize}}>
            <H3>Coffee:</H3>
            <NumericInput
              minValue={1}
              value={coffeeAmount}
              type="up-down"
              onChange={setCoffeeAmount}
              totalWidth={100}
            />
          </View>
          <View style={styles.verticalDivider} />
          <View style={{...styles.info, ...styles.halfSize}}>
            <H3>Water: </H3>
            <NumericInput
              minValue={1}
              value={waterAmount}
              type="up-down"
              onChange={setWaterAmount}
              totalWidth={100}
            />
          </View>
        </View>
        <StageGraph maxWater={waterAmount} stages={stages} />
        <RecipeStages
          stages={stages}
          setStages={setStages}
          totalWater={waterAmount}
        />
        <Button onPress={() => saveRecipe()}>
          <Text> Save </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default RecipeCreation;
