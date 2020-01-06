import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import Accordion from '../../../sharedComponents/Accordion';
import {Card, CardItem} from 'native-base';
import NumericInput from '../../../sharedComponents/NumericInput';
import Rational, {reduceRational} from '../rational';
import shortid from 'shortid';

const id = shortid.generate();
const styles = StyleSheet.create({
  mediumText: {
    fontSize: 20,
  },
});

const RecipeStage = ({
  setStageWaterAmount,
  setStageTime,
  stageWaterAmount,
  stageTime,
}) => {
  const [numerator, denominator] = reduceRational(stageWaterAmount, stageTime);
  return (
    <Card>
      <CardItem>
        <Text> Water (ml): </Text>
        <NumericInput
          type="up-down"
          value={stageWaterAmount}
          onChange={setStageWaterAmount}
          minValue={1}
        />
      </CardItem>
      <CardItem>
        <Text> Time (s): </Text>
        <NumericInput
          type="up-down"
          minValue={1}
          value={stageTime}
          onChange={setStageTime}
        />
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

const RecipeStages = ({totalWater}) => {
  const [stages, setStages] = useState([
    {time: 1, waterAmount: 1, title: 'Stage 1'},
    {time: 1, waterAmount: 1, title: 'Stage 2'},
  ]);

  const setStageWaterAmount = i => value => {
    const copyOfStages = [...stages];
    copyOfStages[i].waterAmount = value;
    setStages([...copyOfStages]);
  };

  const setStageTime = i => value => {
    const copyOfStages = [...stages];
    copyOfStages[i].time = value;
    setStages([...copyOfStages]);
  };

  const addStage = stage => setStages([...stages, stage]);

  const endStage = {
    title: 'Add Stage',
    openIcon: 'add-circle',
    onOpen: () =>
      addStage({
        title: `Stage ${stages.length + 1}`,
        time: 1,
        waterAmount: 1,
      }),
  };

  const panes = stages.map((stage, i) => ({
    title: `Stage ${stage.title ? stage.title : i}`,
    render: (
      <RecipeStage
        stageWaterAmount={stage.waterAmount}
        setStageWaterAmount={setStageWaterAmount(i)}
        stageTime={stage.time}
        setStageTime={setStageTime(i)}
        key={id + i}
      />
    ),
  }));

  return <Accordion items={[...panes, endStage]} />;
};

export default RecipeStages;
