import React from 'react';

import { C, L10N } from './common';
import { Provider, Consumer, ConsumerNavigation } from './context';
import { LayoutView, Snackbar } from './reactor/components';
import {
  Session, Dashboard, Vault,
} from './screens';

const { SCREEN, LANGUAGE } = C;
const {
  SESSION, DASHBOARD, VAULT,
} = SCREEN;

export default () => (
  <Provider dictionary={L10N} language={LANGUAGE}>
    <ConsumerNavigation>
      { ({
        current, stack, parameters,
      }) => (
        <LayoutView>
          <Session backward={current !== SESSION} visible={stack.includes(SESSION)} />

          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          <Vault backward={current !== VAULT} dataSource={parameters} visible={stack.includes(VAULT)} />

          <Consumer>
            { ({ l10n, store: { error, onError } }) => (
              <Snackbar
                caption={error}
                button={l10n.CLOSE}
                visible={error !== undefined}
                onPress={() => onError(undefined)}
              />
            )}
          </Consumer>
        </LayoutView>
      )}
    </ConsumerNavigation>
  </Provider>
);
