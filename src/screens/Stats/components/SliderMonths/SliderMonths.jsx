import { number, func } from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { useL10N } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Text, Touchable, Slider } from '../../../../reactor/components';
import styles, { ITEM_WIDTH } from './SliderMonths.style';
import getLastMonths from './modules/getLastMonths';

const { COLOR } = THEME;

const SliderMonths = ({ index, onChange, ...inherit }) => {
  const l10n = useL10N();
  const slider = useRef(null);

  useEffect(() => {
    if (index) {
      const {
        current: { scrollview },
      } = slider;
      scrollview.current.scrollTo({ x: (index - 3) * ITEM_WIDTH, animated: true });
    }
  }, [index]);

  return (
    <Slider ref={slider} itemWidth={ITEM_WIDTH} itemMargin={0} style={[styles.container, inherit.style]}>
      {getLastMonths(l10n.MONTHS).map(({ month, year }, i) => (
        <Touchable
          key={month}
          onPress={() => onChange({ index: i, month, year })}
          rippleColor={COLOR.WHITE}
          style={[styles.item, index === i ? styles.itemSelected : styles.itemOutLined]}
        >
          <Text bold color={index === i ? COLOR.BACKGROUND : undefined} lighten>
            {l10n.MONTHS[month].substr(0, 3)}
          </Text>
          <Text caption color={index === i ? COLOR.BACKGROUND : undefined} lighten>
            {year}
          </Text>
        </Touchable>
      ))}
    </Slider>
  );
};

SliderMonths.propTypes = {
  index: number,
  month: number,
  onChange: func,
  year: number,
};

SliderMonths.defaultProps = {
  index: undefined,
  month: 0,
  onChange: undefined,
  year: 0,
};

export default SliderMonths;
