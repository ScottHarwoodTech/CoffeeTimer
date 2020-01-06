import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  rationalPart: {
    borderColor: 'grey',
    borderWidth: 5,
  },
  largeText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const GCD = (a, b) => (b ? GCD(b, a % b) : a);

export function reduceRational(numerator, denominator) {
  const gcd = GCD(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

const Rational = ({
  title,
  numerator,
  denominator,
  style,
  partStyle,
  numeratorStyle,
  denominatorStyle,
}) => {
  return (
    <Text style={{...styles.largeText, ...style}}>
      <Text>
        {title}
        {'\n'}
      </Text>
      <Text style={{...styles.rationalPart, ...partStyle, ...numeratorStyle}}>
        {numerator}
      </Text>
      <Text>:</Text>
      <Text style={{...styles.rationalPart, ...partStyle, ...denominatorStyle}}>
        {denominator}
      </Text>
    </Text>
  );
};

Rational.propTypes = {
  title: PropTypes.string.isRequired,
  numerator: PropTypes.number.isRequired,
  denominator: PropTypes.number.isRequired,
  style: Text.propTypes.style,
};

Rational.defaultProps = {
  style: {},
};

export default Rational;
