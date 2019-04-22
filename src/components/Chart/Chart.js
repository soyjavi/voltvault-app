import {
  arrayOf, bool, number, string,
} from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import styles from './Chart.style';

const { COLOR } = THEME;

class Chart extends Component {
  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  }

  render() {
    const {
      captions, color, inverted, scale, values, ...inherit
    } = this.props;
    let max = 0;
    let floor = 0;
    let gap = 0;
    let scaleValues = [];
    let k;

    if (values.length) {
      max = parseInt(Math.max(...values), 10);
      floor = (parseInt(Math.min(...(values.filter(value => value > 0))), 10) || 0) / 1.02;
      gap = max - floor;
    }

    if (scale) {
      k = max >= 1000;
      // const avg = values.reduce((a, b) => a + b) / values.filter(value => value > 0);
      const avg = floor + (gap / 2);

      scaleValues = !inverted ? [max, avg, 0] : ['', avg, max];
    }

    return (
      <View style={[styles.container, inherit.styleContainer]}>
        { scale && (
          <View style={[styles.scale, captions && styles.scaleCaptions]}>
            <View style={styles.scaleValues}>
              { scaleValues.map((value, index) => (
                <Text key={`scale-${index.toString()}`} lighten style={styles.caption}>
                  {`${value ? parseInt(value / (k ? 1000 : 1), 10) : value}${k && value > 0 ? 'k' : ''}`}
                </Text>
              ))}
            </View>
            <View style={styles.scaleLines}>
              { scaleValues.map((value, index) => <View key={`line-${index.toString()}`} style={styles.scaleLine} />)}
            </View>
          </View>
        )}

        <View style={[styles.content, styles.row, scale && styles.rowScale, inherit.style]}>
          { values.map((value, index) => (
            <View
              key={`${value}-${index.toString()}`}
              style={[styles.column, inverted && styles.inverted]}
            >
              <View
                style={[
                  styles.item,
                  inverted && styles.itemInverted,
                  {
                    backgroundColor: color,
                    height: `${parseInt(((value - floor) * 100) / (max - floor), 10)}%`,
                    opacity: value === 0 ? 0.2 : 1,
                  },
                ]}
              />
            </View>
          ))}
        </View>
        { captions && (
          <View style={[styles.captions, styles.row, scale && styles.rowScale]}>
            { captions.map(caption => (
              <View key={caption} style={styles.column}>
                <Text caption level={2} lighten style={styles.caption}>
                  {caption.substring(0, 3).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

Chart.propTypes = {
  captions: arrayOf(string),
  color: string,
  inverted: bool,
  scale: bool,
  values: arrayOf(number),
};

Chart.defaultProps = {
  captions: undefined,
  color: COLOR.PRIMARY,
  inverted: false,
  scale: true,
  values: [],
};

export default Chart;
