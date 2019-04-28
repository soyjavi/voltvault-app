import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, SPACE, UNIT } = THEME;

export default StyleSheet.create({
  card: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    flex: 1,
    justifyContent: 'space-between',
    marginRight: SPACE.S,
  },

  cardLast: {
    marginRight: 0,
  },

  cards: {
    paddingHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingVertical: SPACE.REGULAR,
  },

  content: {
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
  },

  logo: {
    height: UNIT * 1.6,
    width: UNIT * 2.2,
    marginBottom: SPACE.XXS,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
