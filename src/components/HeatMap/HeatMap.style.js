import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const {
  VIEWPORT: { H, W },
} = LAYOUT;
const { COLOR, SPACE } = THEME;
const MAP_HEIGHT = Math.floor(H / 4);
const MAP_WIDTH = Math.floor(W - SPACE.L * 2);

export { MAP_HEIGHT, MAP_WIDTH };

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    height: MAP_HEIGHT,
    width: MAP_WIDTH,
  },

  small: {
    height: MAP_HEIGHT / 2,
  },
});
