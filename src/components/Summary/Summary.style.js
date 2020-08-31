import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, FONT, COLOR, SPACE } = THEME;

const IMAGE_SIZE = SPACE.XL + SPACE.M;
const FONT_SIZE_BASE_CURRENCY = FONT.SUBTITLE.fontSize - SPACE.XS;

export default StyleSheet.create({
  button: {
    flex: 1,
  },

  container: {
    marginBottom: SPACE.XL,
    marginTop: SPACE.XL,
    marginHorizontal: SPACE.M,
  },

  content: {
    // backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    paddingBottom: SPACE.M,
    paddingTop: IMAGE_SIZE / 2 + SPACE.M,
  },

  legend: FONT.LEGEND,

  baseCurrency: {
    fontSize: FONT_SIZE_BASE_CURRENCY,
    lineHeight: FONT_SIZE_BASE_CURRENCY * 1.2,
    height: FONT_SIZE_BASE_CURRENCY,
  },

  image: {
    borderRadius: BORDER_RADIUS,
    position: 'absolute',
    top: -(IMAGE_SIZE / 2),
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    overflow: 'hidden',
  },
});
