import { bool, func } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Image, View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import { NumKeyboard } from './components';
import handshake from './modules/handshake';
import styles from './Session.style';

const { VERSION } = C;
const { MOTION: { DURATION } } = THEME;

class Session extends PureComponent {
  static propTypes = {
    getFingerprintAsync: func,
    visible: bool,
  };

  static defaultProps = {
    getFingerprintAsync: undefined,
    visible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      askFingerprint: false,
      pin: '',
    };
    if (props.getFingerprintAsync) props.getFingerprintAsync();
  }

  _onFingerprint = async ({ navigation, store }) => {
    const { props: { getFingerprintAsync }, state: { askFingerprint, busy } } = this;

    if (!busy && !askFingerprint && getFingerprintAsync) {
      this.setState({ askFingerprint: true });
      const { error, success } = await getFingerprintAsync();

      if (success) handshake(this, { pin: store.pin, store, navigation });
      else if (!error) this.setState({ askFingerprint: false });
    }
  }

  _onNumber = ({ number, store, navigation }) => {
    let { state: { pin } } = this;
    pin = `${pin}${number}`;
    this.setState({ pin });

    if (pin.length === 4) {
      setTimeout(() => {
        if (store.pin === undefined || store.pin === pin) handshake(this, { pin, store, navigation });
        else this.setState({ pin: '' });
      }, DURATION / 2);
    }
  }

  render() {
    const {
      _onFingerprint, _onNumber,
      props: { getFingerprintAsync, visible, ...inherit },
      state: { askFingerprint, busy, pin },
    } = this;

    console.log('<Session>', {
      askFingerprint, visible, busy, pin,
    });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, store, navigation }) => (
            <View style={styles.container}>
              { visible && getFingerprintAsync && !askFingerprint && store.pin
                ? _onFingerprint({ store, navigation }) && <Fragment />
                : undefined }
              <View style={styles.content}>
                <View style={styles.row}>
                  <Image source={ASSETS.logo} resizeMode="contain" style={styles.logo} />
                  <Text headline style={styles.textName}>volt.</Text>
                </View>
                <View style={styles.pin}>
                  { busy
                    ? <Activity size="large" style={styles.activity} />
                    : [1, 2, 3, 4].map((number) => (
                      <Motion
                        key={number}
                        style={[styles.bullet, pin.length >= number && styles.bulletActive]}
                        timeline={[{ property: 'scale', value: pin.length >= number ? 1 : 0.8 }]}
                      />
                    ))}
                </View>
                <Text level={2} lighten>
                  { store.pin && getFingerprintAsync ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN }
                </Text>
              </View>

              { store.pin && !busy && getFingerprintAsync && (
                <Image source={ASSETS.fingerprint} style={styles.fingerprint} />)}
              <NumKeyboard onPress={(number) => _onNumber({ number, store, navigation })} />
              <Text lighten caption level={3} style={styles.textVersion}>{`v${VERSION}`}</Text>
            </View>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Session;
