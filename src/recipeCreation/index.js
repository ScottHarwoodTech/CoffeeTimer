import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import NumericInput from '../sharedComponents/NumericInput';
import RecipeStages from './recipeCreation/recipeStages';
import Rational, {reduceRational} from './recipeCreation/rational';
import {Container, Content} from 'native-base';

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
});

const RecipeCreation = () => {
  const [coffeeAmount, setCoffeeAmount] = useState(10);
  const [waterAmount, setWaterAmount] = useState(400);
  const [numerator, denominator] = reduceRational(coffeeAmount, waterAmount);

  return (
    <Container
      style={styles.scrollView}
      contentContainerStyle={styles.container}>
      <Content>
        <Rational
          title="Ratio:"
          numerator={numerator}
          denominator={denominator}
          style={{...styles.largeText, ...styles.ratioBottom}}
        />
        <Text>Coffee Amount</Text>
        <NumericInput
          minValue={1}
          value={coffeeAmount}
          type="up-down"
          onChange={setCoffeeAmount}
        />
        <Text>Coffee Amount: {coffeeAmount}</Text>
        <Text>Water Amount</Text>
        <NumericInput
          minValue={1}
          value={waterAmount}
          type="up-down"
          onChange={setWaterAmount}
        />
        <Text>Water Amount: {waterAmount}</Text>
        <RecipeStages totalWater={waterAmount} />
      </Content>
    </Container>
  );
};

export default RecipeCreation;
