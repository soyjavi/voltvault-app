import { array, arrayOf, number, shape } from 'prop-types';
import React, { Fragment } from 'react';
import { View } from 'react-native';
import { THEME } from '../../../../reactor/common';

import { useL10N } from '../../../../context';
import { HeatMap, Heading, HorizontalChartItem } from '../../../../components';
import { orderByAmount } from '../../modules';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './Locations.style';

const { COLOR } = THEME;

const Locations = ({ cities, countries, points, precission }) => {
  const l10n = useL10N();
  const citiesTxs = Object.values(cities).length > 0 ? Object.values(cities).reduce((a, b) => a + b) : 1;
  const countriesTxs = Object.values(countries).length > 1 ? Object.values(countries).reduce((a, b) => a + b) : 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading color={COLOR.TEXT_CONTRAST} value={l10n.LOCATIONS} style={styles.heading} />
        <HeatMap
          color={COLOR.LOCATION}
          darkMode={false}
          points={points}
          precission={precission}
          height={MAP_HEIGHT}
          width={MAP_WIDTH}
        />
      </View>

      <View style={styles.content}>
        <Heading color={COLOR.TEXT_CONTRAST} value={l10n.CITIES} style={styles.heading} />
        <Fragment>
          {orderByAmount(cities).map(({ key, amount }) => (
            <HorizontalChartItem
              color={COLOR.LOCATION}
              key={key}
              currency="x"
              title={key}
              value={amount}
              width={Math.floor((amount / citiesTxs) * 100)}
            />
          ))}
        </Fragment>
      </View>

      {Object.keys(countries).length > 1 && (
        <View style={styles.content}>
          <Heading color={COLOR.TEXT_CONTRAST} value={l10n.COUNTRIES} style={styles.heading} />
          <Fragment>
            {orderByAmount(countries).map(({ key, amount }) => (
              <HorizontalChartItem
                color={COLOR.LOCATION}
                key={key}
                currency="x"
                title={key}
                value={amount}
                width={Math.floor((amount / countriesTxs) * 100)}
              />
            ))}
          </Fragment>
        </View>
      )}
    </View>
  );
};

Locations.propTypes = {
  cities: shape({}),
  countries: shape({}),
  points: arrayOf(array),
  precission: number,
};

Locations.defaultProps = {
  cities: {},
  countries: {},
  points: [],
  precission: 0.001,
};

export default Locations;