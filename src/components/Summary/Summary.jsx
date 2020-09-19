import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Col, Row, Text, Touchable, View } from 'reactor/components';

import { LOGO } from '@assets';
import { C, exchange, verboseMonth } from '@common';
import { useL10N, useStore } from '@context';

import { CurrencyLogo } from '../CurrencyLogo';
import { PriceFriendly } from '../PriceFriendly';
import styles from './Summary.style';

const { CURRENCY } = C;
const { COLOR } = THEME;

const BoxSummary = ({ caption, value, ...inherit }) => (
  <Col align="center" marginHorizontal="S">
    <Text caption color={COLOR.LIGHTEN} numberOfLines={1}>
      {caption.toUpperCase()}
    </Text>
    <PriceFriendly {...inherit} caption fixed={value >= 1000 ? 0 : undefined} value={value} />
  </Col>
);

BoxSummary.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const Summary = ({ children, currency = CURRENCY, currentBalance, currentMonth = {}, image = LOGO, title = '' }) => {
  const l10n = useL10N();
  const {
    rates,
    settings: { baseCurrency, maskAmount },
    updateSettings,
  } = useStore();

  const { expenses = 0, incomes = 0, progression = 0, today = 0 } = currentMonth;
  const progressionPercentage =
    currentBalance - progression > 0 ? (progression * 100) / (currentBalance - progression) : progression;

  const showCurrentBalance = currentBalance !== undefined;

  return (
    <View style={styles.container}>
      <Col align="center" style={styles.content}>
        <CurrencyLogo currency={currency} size="L" />
        <Col align="center">
          <Text subtitle>{title}</Text>

          {showCurrentBalance && (
            <>
              <Touchable onPress={() => updateSettings({ maskAmount: !maskAmount })}>
                <PriceFriendly currency={currency} headline value={Math.abs(currentBalance)} />
              </Touchable>
              {baseCurrency !== currency && (
                <PriceFriendly
                  color={COLOR.LIGHTEN}
                  currency={baseCurrency}
                  marginBottom="S"
                  subtitle
                  value={exchange(Math.abs(currentBalance), currency, baseCurrency, rates)}
                />
              )}
            </>
          )}
        </Col>

        {showCurrentBalance && (
          <Row marginTop="M" justify="space" paddingHorizontal="S">
            <BoxSummary caption={verboseMonth(new Date(), l10n)} currency="%" operator value={progressionPercentage} />
            <BoxSummary caption={l10n.INCOMES} currency={baseCurrency} value={incomes} />
            <BoxSummary caption={l10n.EXPENSES} currency={baseCurrency} value={expenses} />
            <BoxSummary caption={l10n.TODAY} currency={baseCurrency} operator value={today} />
          </Row>
        )}
      </Col>

      {children && (
        <Row marginTop="S">
          {React.Children.map(children, (button, index) =>
            button
              ? React.cloneElement(button, {
                  key: index,
                  color: COLOR.BACKGROUND,
                  marginRight: index < children.length - 1 ? 'S' : undefined,
                  style: styles.button,
                  ...button.props,
                })
              : undefined,
          )}
        </Row>
      )}
    </View>
  );
};

Summary.propTypes = {
  children: PropTypes.node,
  currency: PropTypes.string,
  currentBalance: PropTypes.number,
  currentMonth: PropTypes.shape({}),
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSettings: PropTypes.func,
  title: PropTypes.string,
};

export { Summary };
