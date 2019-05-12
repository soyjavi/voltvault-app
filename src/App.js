import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

import { C } from './common';
import { Consumer } from './context';
import { THEME } from './reactor/common';
import { LayoutView, Snackbar } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault,
} from './screens';
import styles from './App.style';

const { SCREEN, SETTINGS: { HIDE_OVERALL_BALANCE, NIGHT_MODE } } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT,
} = SCREEN;
const { COLOR } = THEME;

export default () => (
  <Consumer>
    { ({
      events,
      l10n,
      navigation: {
        current, goBack, params, stack,
      },
      store: {
        error, onError, settings: { [HIDE_OVERALL_BALANCE]: mask, [NIGHT_MODE]: nightMode }, ...store
      },
    }) => (
      <LayoutView style={styles.container}>
        { console.log('<App>') }
        <Session {...events} backward={current !== SESSION} visible={stack.includes(SESSION)} />

        { stack.includes(SESSION) && (
          <Fragment>
            <StatusBar
              backgroundColor={COLOR.BACKGROUND}
              barStyle={nightMode ? 'light-content' : 'dark-content'}
            />
            <Dashboard backward={current !== DASHBOARD} mask={mask} visible={stack.includes(DASHBOARD)} />
            <Snackbar caption={error} button={l10n.CLOSE} visible={!!(error)} onPress={() => onError(undefined)} />
          </Fragment>
        )}

        { stack.includes(DASHBOARD) && (
          <Fragment>
            <Settings backward={current !== SETTINGS} visible={stack.includes(SETTINGS)} />
            <Vault
              backward={current !== VAULT}
              dataSource={stack.includes(VAULT) && params.Vault
                ? store.vaults.find(({ hash }) => hash === params.Vault.hash)
                : undefined
              }
              goBack={goBack}
              visible={stack.includes(VAULT)}
            />
            <Stats {...store} backward={current !== STATS} vault={params.Vault} visible={stack.includes(STATS)} />
            <DialogClone dataSource={store.tx} highlight={nightMode} visible={store.tx !== undefined} />
          </Fragment>
        )}
      </LayoutView>
    )}
  </Consumer>
);
