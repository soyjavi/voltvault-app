import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;
const IMAGE_SIZE = UNIT * 1.8;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    marginLeft: SPACE.MEDIUM,
    marginRight: SPACE.XXS,
    marginVertical: SPACE.XXS,
  },

  content: {
    flex: 1,
  },

  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    marginRight: SPACE.XXS,
  },
});
