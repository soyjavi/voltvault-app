import {
  bool, shape, number, oneOfType, string,
} from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Button, Text, Touchable } from '../../reactor/components';
import Heading from '../Heading';
import Percentage from '../Percentage';
import PriceFriendly from '../PriceFriendly';
import styles from './Summary.style';

const { CURRENCY, SCREEN } = C;
const { COLOR } = THEME;

const captionProps = {
  caption: true, level: 2, lighten: true, numberOfLines: 1,
};

class Summary extends Component {
  static propTypes = {
    currency: string,
    currentBalance: number,
    currentMonth: shape({}),
    image: oneOfType([number, string]),
    mask: bool,
    title: string.isRequired,
  };

  static defaultProps = {
    currency: CURRENCY,
    currentBalance: undefined,
    currentMonth: {},
    mask: undefined,
    image: ASSETS.logo,
  };

  constructor(props) {
    super(props);
    this.state = { mask: props.mask };
  }

  componentWillReceiveProps({ mask }) {
    const { props } = this;
    if (props.mask !== mask) this.setState({ mask });
  }

  shouldComponentUpdate({ currency, currentBalance, mask }) {
    const { props } = this;

    return currency !== props.currency
      || currentBalance !== props.currentBalance
      || mask !== props.mask;
  }

  _onSwitchMask = () => {
    const { state: { mask } } = this;
    this.setState({ mask: !mask });
    this.forceUpdate();
  }

  render() {
    const {
      _onSwitchMask,
      props: {
        currency, currentBalance, currentMonth, image, title, ...inherit
      },
      state: { mask },
    } = this;

    const { progression = 0, incomes = 0, expenses = 0 } = currentMonth;
    const progressionPercentage = currentBalance - progression > 0
      ? (progression * 100) / (currentBalance - progression)
      : progression;

    console.log('    <Summary>', { currency, currentBalance, mask });

    return (
      <Consumer>
        { ({ l10n, navigation, store: { baseCurrency, rates } }) => (
          <View style={[styles.container, inherit.style]}>
            <Touchable onPress={mask !== undefined ? _onSwitchMask : undefined} style={styles.content}>
              <View style={styles.row}>
                <Image source={image} resizeMode="contain" style={styles.logo} />
                <Text caption level={2} lighten>{title.toUpperCase()}</Text>
              </View>
              <PriceFriendly
                currency={baseCurrency}
                headline
                mask={mask}
                level={4}
                value={baseCurrency !== currency
                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                  : Math.abs(currentBalance)}
              />
              <View style={styles.row}>
                { baseCurrency !== currency && (
                  <PriceFriendly
                    currency={currency}
                    mask={mask}
                    subtitle
                    level={2}
                    lighten
                    value={currentBalance}
                  />
                )}
              </View>
            </Touchable>

            <Heading title={l10n.CURRENT_MONTH}>
              <Button
                color={COLOR.PRIMARY}
                outlined
                small
                title={l10n.ACTIVITY}
                onPress={() => navigation.navigate(SCREEN.STATS)}
              />
            </Heading>
            <View style={[styles.row, styles.cards]}>
              <View style={styles.card}>
                <Text {...captionProps}>{l10n.PROGRESSION.toUpperCase()}</Text>
                <Percentage headline level={6} value={progressionPercentage} />
              </View>
              <View style={styles.card}>
                <Text {...captionProps}>{l10n.INCOMES.toUpperCase()}</Text>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  level={6}
                  lighten={incomes === 0}
                  mask={mask}
                  value={incomes}
                />
              </View>
              <View style={[styles.card, styles.cardLast]}>
                <Text {...captionProps}>{l10n.EXPENSES.toUpperCase()}</Text>
                <PriceFriendly
                  currency={baseCurrency}
                  headline
                  level={6}
                  lighten={expenses === 0}
                  mask={mask}
                  value={expenses}
                />
              </View>
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Summary;
