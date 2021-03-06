import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  smallButton: {
    paddingHorizontal: 0,
  },

  vaults: {
    marginBottom: SPACE.M,
    alignItems: 'center',
  },
});
