import React from 'react';
import NumericInput from 'react-native-numeric-input';

const numericInput = ({minValue, value, type, onChange}) => {
  return (
    <NumericInput
      minValue={minValue}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};

export default numericInput;
