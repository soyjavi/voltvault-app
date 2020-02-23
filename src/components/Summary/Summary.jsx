import { oneOfType, shape, number, string } from 'prop-types';
import React from 'react';
import { Image } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Col, Row, Text, Touchable } from '../../reactor/components';
import { LOGO } from '../../assets';
import { C, exchange, verboseMonth } from '../../common';
import { useL10N, useNavigation, useSettings, useStore } from '../../context';
import { PriceFriendly } from '../PriceFriendly';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;
const { COLOR } = THEME;

const BoxSummary = ({ caption, value, ...inherit }) => (
  <Col>
    <Text caption color={COLOR.LIGHTEN} numberOfLines={1}>
      {caption.toUpperCase()}
    </Text>
    <PriceFriendly {...inherit} color={value === 0 ? COLOR.LIGHTEN : undefined} value={value} />
  </Col>
);

BoxSummary.propTypes = {
  caption: string.isRequired,
  value: number.isRequired,
};

const Summary = ({ currency, currentBalance, currentMonth, image, title }) => {
  const l10n = useL10N();
  const { baseCurrency, rates } = useStore();
  const navigation = useNavigation();
  const {
    state: { maskAmount },
    dispatch,
  } = useSettings();

  const { expenses = 0, incomes = 0, progression = 0, today = 0 } = currentMonth;
  const progressionPercentage =
    currentBalance - progression > 0 ? (progression * 100) / (currentBalance - progression) : progression;

  return (
    <Col paddingHorizontal="M" marginBottom="L">
      <Row align="start" marginBottom="L">
        <Col>
          <Row>
            <Image source={image} resizeMode="contain" style={styles.image} />
            <Text caption numberOfLines={1} marginLeft="XS">
              {title.toUpperCase()}
            </Text>
          </Row>
          <Touchable onPress={() => dispatch({ type: 'MASK_AMOUNT', value: !maskAmount })}>
            <PriceFriendly
              currency={baseCurrency}
              headline
              value={
                baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)
              }
            />
          </Touchable>
          {baseCurrency !== currency && <PriceFriendly currency={currency} subtitle value={currentBalance} />}
        </Col>

        <Col width="auto">
          <Button
            color={COLOR.BRAND}
            onPress={() => navigation.go(SCREEN.STATS)}
            outlined
            size="S"
            title={l10n.ACTIVITY}
          />
        </Col>
      </Row>

      <Row justify="space">
        <BoxSummary caption={verboseMonth(new Date(), l10n)} currency="%" operator value={progressionPercentage} />
        <BoxSummary caption={l10n.INCOMES} currency={baseCurrency} value={incomes} />
        <BoxSummary caption={l10n.EXPENSES} currency={baseCurrency} value={expenses} />
        <BoxSummary caption={l10n.TODAY} currency={baseCurrency} operator value={today} style={null} />
      </Row>
    </Col>
  );
};

Summary.propTypes = {
  currency: string,
  currentBalance: number,
  currentMonth: shape({}),
  image: oneOfType([number, string]),
  title: string,
};

Summary.defaultProps = {
  currency: CURRENCY,
  currentBalance: undefined,
  currentMonth: {},
  image: LOGO,
  title: '',
};

export { Summary };
