import { bool, func, node, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Image, View } from 'react-native';

import { Icon, Text, Touchable } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { Box } from '../Box';
import styles from './CardOption.style';

const { COLOR } = THEME;

const CardOption = ({ children, color, icon, image, onPress, selected, title, ...inherit }) => (
  <Box small style={[styles.box, inherit.style]}>
    <Touchable
      onPress={onPress}
      rippleColor={COLOR.PRIMARY}
      style={[styles.container, selected && { backgroundColor: color }]}
    >
      {icon && (
        <View style={styles.icon}>
          <Icon value={icon} color={COLOR.TEXT} size={28} />
        </View>
      )}

      {image && <Image source={image} style={styles.image} />}

      <Text caption lighten={selected && color === COLOR.PRIMARY} numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      {children}
    </Touchable>
  </Box>
);

CardOption.propTypes = {
  children: node,
  color: string,
  icon: oneOfType([number, string]),
  image: oneOfType([number, string]),
  onPress: func.isRequired,
  selected: bool,
  title: string.isRequired,
};

CardOption.defaultProps = {
  children: undefined,
  color: COLOR.PRIMARY,
  icon: undefined,
  image: undefined,
  selected: false,
};

export { CardOption };
