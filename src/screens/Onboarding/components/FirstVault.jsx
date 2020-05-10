import PropTypes from 'prop-types';
import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { THEME } from 'reactor/common';
import { Button, Text, Viewport } from 'reactor/components';

import { C } from '@common';
import { FormVault } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';
import { createVault, getRates } from '@services';

import styles from './FirstVault.style';

const { CURRENCY } = C;

export const FirstVault = ({ onVault, ...others }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();

  const [rates, setRates] = useState({});
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ currency: CURRENCY });

  useLayoutEffect(() => {
    const call = async () => setRates(await getRates());
    call();
  }, []);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await createVault(store, snackbar, form);
    if (vault) onVault(vault);
    setBusy(false);
  };

  return (
    <Viewport {...others}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior={'padding'} style={styles.form}>
          <Text marginBottom="M" headline>
            Your first account
          </Text>
          <Text caption marginBottom="L" style={styles.caption}>
            {l10n.FIRST_VAULT_CAPTION}
          </Text>
          <FormVault form={form} onChange={setForm} rates={rates} />
        </KeyboardAvoidingView>

        <Button
          activity={busy}
          disabled={busy || !form.valid}
          marginTop="XL"
          onPress={handleSubmit}
          style={styles.button}
          title={l10n.NEXT}
        />
      </SafeAreaView>
    </Viewport>
  );
};

FirstVault.propTypes = {
  onVault: PropTypes.func,
};