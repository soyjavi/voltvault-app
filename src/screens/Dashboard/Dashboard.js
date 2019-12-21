import { FontAwesome } from '@expo/vector-icons';
import { bool } from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { THEME } from '../../reactor/common';
import { Button, Slider, Viewport } from '../../reactor/components';
import { C, onHardwareBackPress } from '../../common';
import {
  Footer, GroupTransactions, Header, Heading, Summary,
} from '../../components';
import {
  useL10N, useNavigation, useSettings, useStore,
} from '../../context';
import { DialogVault, Syncing, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './modules';
import styles from './Dashboard.style';

const { SCREEN, STYLE: { VAULT_ITEM_WIDTH } } = C;
const { COLOR, SPACE } = THEME;

const Dashboard = ({ backward, visible, ...inherit }) => {
  const { state: settings } = useSettings();
  const l10n = useL10N();
  const navigation = useNavigation();
  const {
    baseCurrency, overall, sync, txs, vaults,
  } = useStore();

  const [dialog, setDialog] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    onHardwareBackPress(!backward, () => { if (dialog) setDialog(false); });
  }, [backward, dialog]);

  console.log('<Dashboard>', {
    visible,
    sync,
    vaults,
    txs,
    baseCurrency,
  });

  const isInitialized = vaults.length > 0;
  const lastTxs = queryLastTxs({ txs, vaults });
  if (!isInitialized && !dialog) setDialog(true);

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} title={l10n.OVERALL_BALANCE}>
        <Button onPress={() => navigation.go(SCREEN.SETTINGS)}>
          <FontAwesome name="cog" color={COLOR.PRIMARY} size={20} />
        </Button>
      </Header>
      <ScrollView
        onScroll={({ nativeEvent: { contentOffset } }) => setScroll(contentOffset.y > SPACE.MEDIUM)}
        scrollEventThrottle={40}
        contentContainerStyle={styles.scroll}
      >
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE} />

        { isInitialized && (
          <View style={styles.content}>
            <Heading color={COLOR.TEXT_CONTRAST} subtitle={l10n.VAULTS} />
            <Slider itemWidth={VAULT_ITEM_WIDTH + SPACE.S} itemMargin={0} style={styles.vaults}>
              { queryVaults({ settings, vaults }).map((vault) => (
                <VaultCard {...vault} key={vault.hash} onPress={() => navigation.go(SCREEN.VAULT, vault)} />
              ))}
            </Slider>

            { lastTxs.length > 0 && (
              <Fragment>
                <Heading color={COLOR.TEXT_CONTRAST} subtitle={l10n.LAST_TRANSACTIONS} />
                { lastTxs.map((item) => (
                  <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />))}
              </Fragment>
            )}

          </View>
        )}
      </ScrollView>

      <Syncing scroll={scroll} />
      <Footer onPress={() => setDialog(true)} />
      { visible && sync && <DialogVault visible={dialog} onClose={() => setDialog(false)} /> }
    </Viewport>
  );
};

Dashboard.propTypes = {
  backward: bool,
  visible: bool,
};

Dashboard.defaultProps = {
  backward: false,
  visible: true,
};

export default Dashboard;
