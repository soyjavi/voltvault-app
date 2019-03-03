import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  alignRight: {
    textAlign: 'right',
  },

  card: {
    ...STYLE.CARD,
    marginTop: OFFSET,
    backgroundColor: COLOR.BASE,
    minHeight: 0,
    flex: 1,
    marginRight: OFFSET,
  },

  cardDisabled: {
    opacity: 0.33,
  },

  cardLast: {
    marginRight: 0,
  },

  container: {
    marginTop: OFFSET,
    zIndex: 1,
  },

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginRight: UNIT / 2,
    marginBottom: UNIT * 0.4,
  },

  row: LAYOUT.STYLE.ROW,

  section: {
    marginHorizontal: OFFSET,
    marginBottom: OFFSET,
  },

  separator: {
    flex: 1,
  },

  summary: {
    alignItems: 'flex-start',
    marginBottom: OFFSET,
  },

  slider: {
    paddingHorizontal: OFFSET,
    marginBottom: OFFSET,
  },

});