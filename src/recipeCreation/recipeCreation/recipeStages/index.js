import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card, Accordion, CardItem} from 'native-base';
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

const RecipeStages = ({stages, setStages, totalWater}) => {
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
  const removeStage = index => {
    const clone = [...stages];
    clone.splice(index, 1);
    setStages(clone);
  };

  const endStage = {
    title: 'Add Stage',
    endStage: true,
  };

  const panes = stages.map((stage, i) => ({
    title: stage.title ? stage.title : `Stage ${i}`,
    content: (
      <RecipeStage
        stageWaterAmount={stage.waterAmount}
        setStageWaterAmount={setStageWaterAmount(i)}
        stageTime={stage.time}
        setStageTime={setStageTime(i)}
        key={id + i}
      />
    ),
  }));

  return (
    <Accordion
      dataArray={[...panes, endStage]}
      renderContent={stage => stage.content}
      onAccordionOpen={(item, i) => {
        item.endStage
          ? addStage({
              title: `Stage ${i + 1}`,
              time: 1,
              waterAmount: 1,
            })
          : undefined;
      }}
    />
  );
};

export default RecipeStages;
