import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { CONTENT, HEADER_HEIGHT } } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  content: CONTENT,

  headingVaults: {
    marginRight: SPACE.XS,
  },

  icon: {
    height: SPACE.L,
    width: SPACE.L,
  },

  scroll: {
    paddingVertical: HEADER_HEIGHT,
  },

  vaults: {
    paddingLeft: SPACE.XXS,
    paddingRight: SPACE.MEDIUM,
  },
});
