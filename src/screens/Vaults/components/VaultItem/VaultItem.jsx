import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from 'reactor/common';
import { Button, Col, Row, Text, Touchable } from 'reactor/components';

import { Box, CurrencyLogo, PriceFriendly } from '@components';
import { useStore } from '@context';

import styles from './VaultItem.style';

const { COLOR, ICON } = THEME;

const VaultItem = ({ active, onChange, onPress, dataSource: { currency, currentBalance, title } }) => {
  const {
    settings: { baseCurrency },
  } = useStore();

  const colorText = active ? COLOR.TEXT : COLOR.LIGHTEN;

  return (
    <Row>
      <Touchable paddingHorizontal="M" paddingVertical="S" onPress={onPress} style={styles.container}>
        <Row>
          <Col marginRight="S" width="auto">
            <Box outlined={!active} styleContent={styles.boxContent}>
              <CurrencyLogo
                color={currency !== baseCurrency || !active ? COLOR.LIGHTEN : undefined}
                currency={currency}
                size="S"
              />
            </Box>
          </Col>
          <Col>
            <Text color={colorText} numberOfLines={1}>
              {title}
            </Text>
            <PriceFriendly caption color={COLOR.LIGHTEN} currency={currency} value={currentBalance} />
          </Col>
        </Row>
      </Touchable>
      <Button
        color={COLOR.BACKGROUND}
        colorText={colorText}
        icon={active ? 'lock-open' : 'lock'}
        iconFamily={ICON.FAMILY}
        marginRight="S"
        onPress={() => onChange(!active)}
      />
    </Row>
  );
};

VaultItem.propTypes = {
  active: PropTypes.bool,
  dataSource: PropTypes.shape({
    currency: PropTypes.string,
    currentBalance: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export { VaultItem };
