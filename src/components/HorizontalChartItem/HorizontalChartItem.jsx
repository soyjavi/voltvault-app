import { bool, number, string } from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Row, Text, View } from 'reactor/components';

import { PriceFriendly } from '../PriceFriendly';
import styles from './HorizontalChartItem.style';

const { COLOR } = THEME;

export const HorizontalChartItem = ({ color = COLOR.TEXT, currency, small, title, value, width = 100, ...others }) => (
  <View {...others}>
    <Row align="end">
      <Text caption={small} style={styles.text}>
        {title}
      </Text>
      <PriceFriendly bold={!small} caption currency={currency} value={value} />
    </Row>

    <View style={[styles.bar, styles.barContainer, small && styles.barSmall]}>
      <View style={[styles.bar, small && styles.barSmall, { backgroundColor: color, width: `${width}%` }]} />
    </View>
  </View>
);

HorizontalChartItem.propTypes = {
  color: string,
  currency: string,
  small: bool,
  title: string.isRequired,
  value: number.isRequired,
  width: number,
};
