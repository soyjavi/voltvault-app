import {
  func, number, shape, string,
} from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View } from 'react-native';

import { iconPlace, iconTime } from '../../assets';
import { C, verboseDate } from '../../common';
import { Consumer } from '../../context';
import {
  Button, Icon, Price, Text, Touchable,
} from '../../reactor/components';
import { THEME } from '../../reactor/common';
import MapStaticImage from '../MapStaticImage';
import BulletPrice from '../BulletPrice';
import formatTime from './modules/formatTime';
import styles from './TransactionItem.style';

const {
  VAULT_TRANSFER, COLORS, FIXED, SYMBOL, TX: { TYPE: { EXPENSE } },
} = C;
const { COLOR } = THEME;

class TransactionItem extends Component {
  static propTypes = {
    category: number,
    currency: string,
    hash: string,
    location: shape({}),
    onClone: func,
    timestamp: string.isRequired,
    title: string,
    type: number,
    value: number,
    vault: string,
  };

  static defaultProps = {
    category: undefined,
    currency: undefined,
    hash: undefined,
    location: undefined,
    onClone: undefined,
    title: undefined,
    type: undefined,
    value: undefined,
    vault: undefined,
  };

  state = {
    extended: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { currency, hash }, state: { extended } } = this;
    return hash !== nextProps.hash || currency !== nextProps.currency || extended !== nextState.extended;
  }

  _onToggleExtended = () => {
    const { state: { extended } } = this;
    this.setState({ extended: !extended });
  }

  render() {
    const {
      _onToggleExtended,
      props: {
        category, currency, hash, location, onClone, timestamp, title, type, value, vault, ...inherit
      },
      state: { extended },
    } = this;

    const isHeading = !hash;
    const isBottom = inherit.last;
    const { incomes, expenses } = inherit.cashflow || {};
    const regular = category !== VAULT_TRANSFER;
    let color = COLOR.TEXT;
    if (regular) color = type === EXPENSE ? COLORS[category] : COLORS[(COLORS.length - 1) - category];
    const time = new Date(timestamp);

    return (
      <Consumer>
        { ({ l10n }) => (
          <Fragment>
            <Touchable rippleColor={color} onPress={hash ? _onToggleExtended : undefined}>
              <View style={[styles.row, styles.container, isHeading && styles.heading]}>
                <View
                  style={[
                    styles.line,
                    isHeading && styles.lineHeading,
                    isBottom && !extended && styles.lineBottom,
                  ]}
                />
                <View style={[styles.bullet, hash && color && { backgroundColor: color }]} />
                <View style={styles.texts}>
                  { hash && regular && (
                    <Text subtitle level={2} numberOfLines={1}>{l10n.CATEGORIES[type][category]}</Text>)}
                  { hash && !regular && (
                    <Text subtitle level={2} numberOfLines={1}>
                      {`${l10n.TRANSFER} ${type === EXPENSE ? l10n.TO : l10n.FROM} ${title}`}
                    </Text>)}
                  { !hash && <Text subtitle level={3} lighten>{verboseDate(timestamp, l10n)}</Text> }
                  { title && regular && <Text level={2} lighten numberOfLines={1}>{title}</Text> }
                </View>
                <View style={styles.row}>
                  { incomes > 0 && (
                    <BulletPrice currency={currency} incomes value={incomes} style={styles.bulletPrice} />)}
                  { expenses > 0 && (
                    <BulletPrice currency={currency} value={expenses} style={styles.bulletPrice} />)}
                </View>
                { value && (
                  <Price
                    subtitle
                    level={2}
                    fixed={FIXED[currency]}
                    symbol={SYMBOL[currency]}
                    title={type === EXPENSE ? undefined : '+'}
                    value={value}
                  />)}
              </View>
            </Touchable>

            { hash && extended && (
              <Fragment>
                <View style={[styles.row, styles.container, styles.extended]}>
                  <View style={styles.line} />
                  <View style={styles.bullet} />
                  <View style={[styles.row, styles.texts]}>
                    <Icon value={iconTime} style={styles.icon} />
                    <Text level={2} lighten>{formatTime(time)}</Text>
                  </View>
                </View>
                { location && (
                  <View style={[styles.row, styles.container, styles.extended]}>
                    <View style={styles.line} />
                    <View style={styles.bullet} />
                    <View style={styles.texts}>
                      <Touchable rippleColor={COLOR.WHITE} onPress={() => {}}>
                        <MapStaticImage {...location} />
                      </Touchable>
                      <View style={styles.row}>
                        <Icon value={iconPlace} style={styles.icon} />
                        <Text level={2} lighten>{location.place}</Text>
                      </View>
                    </View>
                  </View>)}
                <View style={[styles.row, styles.container]}>
                  <View style={[styles.line, isBottom && styles.lineBottom]} />
                  <View style={styles.bullet} />
                  <View style={styles.texts}>
                    <Button
                      color={color}
                      rounded
                      title={l10n.CLONE}
                      shadow
                      small
                      style={styles.button}
                      onPress={onClone}
                    />
                  </View>
                </View>
              </Fragment>
            )}
          </Fragment>
        )}
      </Consumer>
    );
  }
}

export default TransactionItem;
