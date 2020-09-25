import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';
import { useEnvironment } from 'reactor/hooks';

// eslint-disable-next-line react-hooks/rules-of-hooks
const ENV = useEnvironment();
const { BORDER_RADIUS, COLOR, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND,
  },

  status: {
    alignSelf: 'center',
    top: SPACE.XS,
    position: ENV.IS_WEB ? 'fixed' : 'absolute',
    backgroundColor: COLOR.TEXT,
    paddingHorizontal: SPACE.S,
    paddingVertical: SPACE.XS,
    borderRadius: BORDER_RADIUS,
    zIndex: 2,
  },
});
