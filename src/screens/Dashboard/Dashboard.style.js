import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { OFFSET } = THEME;

const { STYLE: { DASHBOARD_HEIGHT, HEADER_HEIGHT, NOTCH_HEIGHT } } = C;

export default StyleSheet.create({
  button: {
    position: 'absolute',
    top: OFFSET / 2,
    zIndex: 2,
  },

  left: {
    left: 0,
  },

  right: {
    right: 0,
  },

  scroll: {
    paddingTop: DASHBOARD_HEIGHT + NOTCH_HEIGHT,
    paddingBottom: HEADER_HEIGHT,
  },
});
