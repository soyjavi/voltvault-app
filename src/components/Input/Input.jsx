import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { THEME } from 'reactor/common';
import { Row, Text, View } from 'reactor/components';

import { useStore } from '@context';

import { PriceFriendly } from '../PriceFriendly';
import styles from './Input.style';
import { getLastRates } from './modules';

const { COLOR } = THEME;

const exchangeCaption = { caption: true, color: COLOR.LIGHTEN, maskAmount: false };

const Input = ({
  currency,
  keyboard = 'default',
  label,
  maxLength,
  maxValue,
  onChange,
  secure,
  showExchange = true,
  ...others
}) => {
  const { settings: { baseCurrency } = {}, rates } = useStore();

  const [exchange, setExchange] = useState();
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    if (showExchange && currency && currency !== baseCurrency) {
      const latestRates = getLastRates(rates);
      setExchange(latestRates[currency]);
    } else setExchange(undefined);
  }, [baseCurrency, currency, rates, showExchange]);

  useEffect(() => {
    setValue(others.value);
  }, [others.value]);

  const handleChange = (value = '') => {
    let nextValue = value && value.toString().length > 0 ? value : undefined;

    if (currency) {
      nextValue = parseFloat(nextValue, 10) > maxValue ? maxValue.toString() : nextValue;
      setValue(nextValue);
    }

    onChange && onChange(nextValue);
  };

  return (
    <View {...others} style={[styles.container, others.style]}>
      {currency && label && (
        <Row justify="center">
          <Text caption color={COLOR.LIGHTEN}>
            {label.toUpperCase()}
          </Text>
        </Row>
      )}

      <Row justify="center">
        {currency && (
          <PriceFriendly
            bold
            color={!value && !focus ? COLOR.LIGHTEN : undefined}
            currency={currency}
            headline
            pointerEvents="none"
            value={value ? parseFloat(value, 10) : undefined}
          />
        )}

        <TextInput
          autoCapitalize="none"
          autoCorrect={!currency}
          defaultValue={others.defaultValue}
          disabled={others.disabled}
          blurOnSubmit
          editable
          keyboardType={currency ? 'numeric' : keyboard}
          maxLength={maxLength}
          onBlur={() => setFocus(false)}
          onChangeText={handleChange}
          onFocus={() => setFocus(true)}
          placeholder={!focus ? label : undefined}
          placeholderTextColor={COLOR.LIGHTEN}
          secureTextEntry={secure}
          style={[styles.input, currency && styles.inputCurrency]}
          underlineColorAndroid="transparent"
          value={others.value || ''}
        />
      </Row>

      {exchange && (
        <Row justify="center" marginTop="XS">
          <PriceFriendly
            {...exchangeCaption}
            color={focus || others.value > 0 ? COLOR.TEXT : COLOR.LIGHTEN}
            currency={baseCurrency}
            value={parseFloat(others.value || 0, 10) / exchange}
          />
          <View marginRight="XS" />
          <Text {...exchangeCaption}>(</Text>
          <PriceFriendly {...exchangeCaption} currency={baseCurrency} value={1} />
          <Text {...exchangeCaption}>{` = `}</Text>
          <PriceFriendly {...exchangeCaption} currency={currency} value={exchange} />
          <Text {...exchangeCaption}>)</Text>
        </Row>
      )}
    </View>
  );
};

Input.propTypes = {
  currency: PropTypes.string,
  keyboard: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  secure: PropTypes.bool,
  showExchange: PropTypes.bool,
};

export { Input };
