import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, FONT, SPACE } = THEME;

const FONT_SIZE_BASE_CURRENCY = FONT.SUBTITLE.fontSize - SPACE.S;

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
  },

  legend: FONT.LEGEND,

  baseCurrency: {
    fontSize: FONT_SIZE_BASE_CURRENCY,
    lineHeight: FONT_SIZE_BASE_CURRENCY * 1.2,
    height: FONT_SIZE_BASE_CURRENCY,
  },
});
