import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { VIEWPORT: { H, W } } = LAYOUT;
const { COLOR, BORDER_RADIUS, SPACE } = THEME;
const MAP_HEIGHT = Math.floor(H / 4);
const MAP_WIDTH = Math.floor(W - (SPACE.MEDIUM * 2));

export { MAP_HEIGHT, MAP_WIDTH };

export default StyleSheet.create({
  container: {
  },

  content: {
    margin: SPACE.MEDIUM,
  },

  map: {
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    height: MAP_HEIGHT,
    marginBottom: SPACE.S,
    width: MAP_WIDTH,
  },
});
