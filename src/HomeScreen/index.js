import React, {useState} from 'react';
import NavigationHeader from '../sharedComponents/NavigationHeader';
import {
  Button,
  Content,
  Card,
  CardItem,
  Text,
  Container,
  Accordion,
} from 'native-base';
import {AsyncStorage, StyleSheet} from 'react-native';
import NumericInput from '../sharedComponents/NumericInput';
import Rational, {
  reduceRational,
} from '../recipeCreation/recipeCreation/rational';
import StageGraph from '../sharedComponents/StageGraph';

const styles = StyleSheet.create({
  mediumText: {
    fontSize: 20,
  },
});

const RecipeStage = ({stageWaterAmount, stageTime}) => {
  const [numerator, denominator] = reduceRational(stageWaterAmount, stageTime);
  return (
    <Card>
      <CardItem>
        <Text> Water (ml): {stageWaterAmount}</Text>
      </CardItem>
      <CardItem>
        <Text> Time (s): {stageTime}</Text>
      </CardItem>
      <CardItem>
        <Rational
          numerator={numerator}
          denominator={denominator}
          title="Rate(ml/s):"
          style={styles.mediumText}
        />
      </CardItem>
    </Card>
  );
};

const HomeScreen = props => {
  const [recipe, setRecipe] = useState([]);
  const [time, setTime] = useState(0);
  AsyncStorage.getItem('recipe').then(r => setRecipe(JSON.parse(r)));
  const startTimer = () => { //setTime(time+0.1)
  };

  return (
    <Container>
      <NavigationHeader navigation={props.navigation} title={'Home'} />
      <Content padder>
        <Accordion
          dataArray={recipe}
          renderContent={i => (
            <RecipeStage stageWaterAmount={i.waterAmount} stageTime={i.time} />
          )}
        />
        <StageGraph stages={recipe} tickRate={10}/>
        <Button onPress={() => startTimer()}>
          <Text> Start </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default HomeScreen;
