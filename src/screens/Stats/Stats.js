import { bool } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { View, ScrollView } from 'react-native';

import { iconBack } from '../../assets';
import { ChartCategories } from '../../components';
import { Header } from '../../containers';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Stats.style';

class Stats extends Component {
  static propTypes = {
    visible: bool,
  };

  static defaultProps = {
    visible: false,
  };

  state = {
    date: '2018-11', // @TODO
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { props: { visible }, state: { date } } = this;
    return (visible !== nextProps.visible) || (date !== nextState.date);
  }

  render() {
    const {
      props: { visible, ...inherit },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ navigation, l10n, store: { queryTxs, vaults } }) => (
            <Fragment>
              <Header
                left={{ icon: iconBack, onPress: () => navigation.goBack() }}
                title={l10n.STATS}
                visible={visible}
              />
              <ScrollView contentContainerStyle={styles.scroll}>
                <View>
                  { vaults.map(({
                    color, currency, hash, title,
                  }) => (
                    queryTxs[hash]
                      ? (
                        <View key={hash} style={styles.content}>
                          <Text headline level={6} style={styles.title}>{title}</Text>
                          { Object.keys(queryTxs[hash].incomes).length > 0 && (
                            <View>
                              <Text subtitle level={2} lighten style={styles.subtitle}>{l10n.INCOMES}</Text>
                              <ChartCategories
                                categories={l10n.CATEGORIES[1]}
                                color={color}
                                currency={currency}
                                total={queryTxs.overall.incomes}
                                values={queryTxs[hash].incomes}
                              />
                            </View>)}

                          { Object.keys(queryTxs[hash].expenses).length > 0 && (
                            <View>
                              <Text subtitle level={2} lighten style={styles.subtitle}>{l10n.EXPENSES}</Text>
                              <ChartCategories
                                categories={l10n.CATEGORIES[0]}
                                color={color}
                                currency={currency}
                                total={queryTxs.overall.expenses}
                                values={queryTxs[hash].expenses}
                              />
                            </View>)}
                        </View>)
                      : <View key={hash} />))}
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Consumer>
      </Viewport>
    );
  }
}

export default Stats;
