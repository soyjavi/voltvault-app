import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    width: 'auto',
    backgroundColor: COLOR.backgroundColor,
  },

  focus: {
    borderBottomColor: COLOR.TEXT,
  },

  input: {
    ...FONT.INPUT,
    color: COLOR.TEXT,
    borderWidth: 0,
    flex: 2,
    height: SPACE.XL,
  },
});