import {
  arrayOf, bool, number, string,
} from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import Heading from '../Heading';
import PriceFriendly from '../PriceFriendly';

import { calcHeight } from './modules';
import styles from './Chart.style';

const { COLOR } = THEME;

class Chart extends Component {
  static propTypes = {
    captions: arrayOf(string),
    color: string,
    currency: string,
    highlight: number,
    inverted: bool,
    title: string,
    values: arrayOf(number),
  };

  static defaultProps = {
    captions: undefined,
    color: COLOR.PRIMARY,
    currency: undefined,
    highlight: undefined,
    inverted: false,
    title: undefined,
    values: [],
  };

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  }

  render() {
    const {
      captions, color, currency, highlight, inverted, title, values, ...inherit
    } = this.props;
    const { max, min, med: avg } = inherit;
    let firstValueIndex = values.findIndex((value) => value !== 0);
    if (firstValueIndex === -1) firstValueIndex = undefined;

    return (
      <Fragment>
        { title && <Heading subtitle={title} /> }
        <View style={[inverted && styles.containerInverted, inherit.styleContainer]}>
          { avg > 0 && (
            <View style={[styles.scales, inverted && styles.scalesInverted, captions && styles.scaleCaptions]}>
              <View style={{ marginTop: -10, top: `${100 - parseInt(((avg - min) * 100) / (max - min), 10)}%` }}>
                <View style={[styles.scaleLine, { backgroundColor: color }]} />
                <View style={[styles.tag, { backgroundColor: color }]}>
                  <PriceFriendly currency={currency} value={avg} lighten style={[styles.legend, styles.legendHighlight]} />
                </View>
              </View>
            </View>
          )}

          <View style={[styles.content, styles.row, styles.rowScale, inherit.style]}>
            { values.map((value, index) => (
              <View
                key={`${value}-${index.toString()}`}
                style={[styles.column, inverted && styles.columnInverted]}
              >
                <View
                  style={[
                    styles.bar,
                    inverted && styles.barInverted,
                    (value !== 0 || index > firstValueIndex) && { backgroundColor: color },
                    value !== 0 && { height: `${calcHeight(value, { min, max, avg })}%` },
                    value === 0 && styles.barEmpty,
                  ]}
                >
                  { value !== 0 && (
                    <View
                      style={[
                        styles.bar,
                        inverted && styles.barInverted,
                        value !== 0 && {
                          backgroundColor: color,
                          height: '100%',
                          opacity: (highlight && highlight === index) ? 1 : 0.33,
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
          { captions && (
            <View style={[styles.captions, styles.row, styles.rowScale]}>
              { captions.map((caption, index) => (
                <View key={caption} style={styles.column}>
                  <Text lighten style={[styles.legend, highlight === index && styles.legendHighlight]}>
                    {caption.substring(0, 3).toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Fragment>
    );
  }
}

export default Chart;
