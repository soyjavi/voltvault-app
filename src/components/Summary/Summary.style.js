import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { SPACE, UNIT } = THEME;

export default StyleSheet.create({
  balance: {
    fontSize: UNIT * 3.2,
    lineHeight: UNIT * 3.2,
  },

  container: {
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.L,
  },

  content: {
    alignItems: 'flex-start',
    marginBottom: SPACE.MEDIUM,
  },

  image: {
    height: UNIT * 1.4,
    width: UNIT * 1.4,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,

  spaceBetween: {
    justifyContent: 'space-between',
  },
});
