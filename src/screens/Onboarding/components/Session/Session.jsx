import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Row, Text, View, Viewport } from 'reactor/components';

import { C } from '@common';
import { useL10N, useStore } from '@context';

import { NumKeyboard } from './components';
import { onHandshake, askLocalAuthentication } from './Session.controller';
import styles from './Session.style';

const { IS_DEV, VERSION } = C;
const { COLOR } = THEME;

const Session = ({ onSession, visible, ...others }) => {
  const l10n = useL10N();
  const store = useStore();

  const [pin, setPin] = useState('');

  const handleHandshake = onHandshake.bind(undefined, { onSession, store });

  useEffect(() => {
    if (visible) {
      const { settings, vaults = [] } = store;

      if (settings.pin && vaults.length !== 0) {
        if (IS_DEV /* && IS_WEB */) setPin(settings.pin);
        else if (pin === '') askLocalAuthentication({ l10n, setPin, store });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (pin.length === 4) {
      const { settings } = store;
      if (settings.pin === undefined || settings.pin === pin) handleHandshake(pin);
      else setPin('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const signup = store.authorization === undefined;

  return (
    <Viewport {...others} visible={visible} scroll={false}>
      <View style={styles.container}>
        <Text bold subtitle>
          {signup ? l10n.PIN_CHOOSE : l10n.PIN}
        </Text>
        <Row justify="center">
          {['•', '•', '•', '•'].map((letter, index) => (
            <View
              key={index}
              style={[styles.bullet, { backgroundColor: pin.length > index ? COLOR.TEXT : COLOR.BASE }]}
            />
          ))}
        </Row>

        <NumKeyboard onPress={(number) => setPin(`${pin}${number}`)} />
        <Text caption color={COLOR.LIGHTEN} marginBottom="M">{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

Session.propTypes = {
  onSession: PropTypes.func,
  signup: PropTypes.bool,
  visible: PropTypes.bool,
};

export { Session };
