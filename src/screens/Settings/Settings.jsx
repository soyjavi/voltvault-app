import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Alert, Button, Image, Row, Text, View, Viewport } from 'reactor/components';

import { C } from '@common';
import { Header, Heading, ScrollView, SliderCurrencies, Summary } from '@components';
import { useL10N, useNavigation, useSnackBar, useStore } from '@context';
import { ServiceQR, ServiceRates } from '@services';

import { askCamera, changeCurrency, getBlockchain } from './Settings.controller';
import styles from './Settings.style';

const { DELAY_PRESS_MS } = C;
const { COLOR, ICON } = THEME;
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};
const TIMEOUT_CHECK_BLOCKCHAIN = 400;

const Settings = ({ visible, ...inherit }) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const scrollview = useRef(null);
  const store = useStore();
  const snackbar = useSnackBar();

  const [blockchain, setBlockchain] = useState(undefined);
  const [camera, setCamera] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [hasCamera, setHasCamera] = useState(undefined);
  const [qr, setQr] = useState(undefined);
  const [syncRates, setSyncRates] = useState(undefined);

  const {
    settings: { authorization, baseCurrency, secret },
    updateRates,
    fork,
  } = store;

  useEffect(() => {
    if (!visible) setCamera(false);
    else if (hasCamera === undefined) {
      // setQr('418A9E4B-F117-476D-B0F1-6D4A24AED048|backup');
      setHasCamera(askCamera());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (qr) setBlockchain(await getBlockchain({ qr, store }));
      else clearTimeout(timeout);
    }, TIMEOUT_CHECK_BLOCKCHAIN);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qr]);

  const handleQRScanned = ({ data } = {}) => {
    if (data) setQr(data);
  };

  const handleFork = async () => {
    const success = await fork(blockchain);
    if (success) {
      setBlockchain(undefined);
      snackbar.success(l10n.FORKED_CORRECTLY);
    }
  };

  const handleCancel = () => {
    setBlockchain(undefined);
    setQr(undefined);
  };

  const handleChangeCurrency = (currency) => changeCurrency({ currency, l10n, snackbar, store });

  const handleUpdateRates = async () => {
    setSyncRates(true);
    updateRates(await ServiceRates.get({ baseCurrency }).catch(() => {}));
    setSyncRates(false);
  };

  return (
    <>
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Header
          childRight={
            hasCamera ? (
              <Button
                alignSelf="end"
                color={COLOR.BACKGROUND}
                colorText={COLOR.TEXT}
                iconFamily={ICON.FAMILY}
                icon={camera ? 'close' : 'camera'}
                onPress={() => setCamera(!camera)}
                size="S"
              />
            ) : undefined
          }
          highlight={scroll}
          onBack={navigation.back}
          title={l10n.SETTINGS}
        />

        <ScrollView contentContainerStyle={styles.scroll} onScroll={setScroll} ref={scrollview}>
          <Summary currency={baseCurrency} title={l10n.SETTINGS} />

          <View marginBottom="XL" marginHorizontal="M">
            <Heading value={l10n.TRANSFER_TXS} />

            <View marginTop="S" marginBottom="XS" style={styles.content}>
              {!camera ? (
                <Image source={{ uri: ServiceQR.uri({ secret, authorization }) }} style={styles.qr} />
              ) : (
                <Camera {...CAMERA_PROPS} onBarCodeScanned={handleQRScanned} style={styles.camera}>
                  <View style={styles.cameraViewport} />
                </Camera>
              )}
            </View>
            <Text caption color={COLOR.LIGHTEN} style={styles.legend}>
              {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
            </Text>
          </View>

          <Heading paddingLeft="M" value={l10n.CHOOSE_CURRENCY}>
            <Button
              color={COLOR.BACKGROUND}
              colorText={COLOR.TEXT}
              onPress={handleUpdateRates}
              size="S"
              text={l10n.SYNC_RATES_CTA.toUpperCase()}
            />
          </Heading>
          <SliderCurrencies onChange={handleChangeCurrency} paddingLeft="M" selected={baseCurrency} />
          <Row marginHorizontal="M" marginTop="S">
            <Text caption color={COLOR.LIGHTEN}>
              {!syncRates
                ? `${l10n.SYNC_RATES_SENTENCE} ${new Date().toString().split(' ').slice(0, 5).join(' ')}.`
                : l10n.WAIT}
            </Text>
          </Row>
        </ScrollView>
      </Viewport>

      <Alert
        accept={l10n.IMPORT}
        cancel={l10n.CANCEL}
        caption={l10n.TRANSFER_TXS_IMPORT}
        delay={DELAY_PRESS_MS}
        onAccept={handleFork}
        onCancel={handleCancel}
        onClose={handleCancel}
        position="bottom"
        title={l10n.WARNING}
        visible={blockchain !== undefined}
      />
    </>
  );
};

Settings.propTypes = {
  visible: PropTypes.bool,
};

export { Settings };