import {
  bool, node, number, oneOfType, string,
} from 'prop-types';
import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';

import { Text } from '../../reactor/components';
import styles from './Heading.style';

class Heading extends PureComponent {
  static propTypes = {
    breakline: bool,
    children: node,
    image: oneOfType([number, string]),
    subtitle: string,
    title: string,
  };

  static defaultProps = {
    breakline: false,
    children: undefined,
    image: undefined,
    subtitle: undefined,
    title: undefined,
  };

  render() {
    const {
      breakline, children, image, subtitle, title,
    } = this.props;

    return (
      <View style={[styles.container, breakline && styles.breakline]}>
        { image && <Image source={image} resizeMode="contain" style={styles.image} /> }
        <View style={styles.content}>
          { title && <Text headline level={6}>{title}</Text> }
          { subtitle && <Text subtitle style={styles.subtitle}>{subtitle}</Text> }
        </View>
        { children }
      </View>
    );
  }
}

export default Heading;
