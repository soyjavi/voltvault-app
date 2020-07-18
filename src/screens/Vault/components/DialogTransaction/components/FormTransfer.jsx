import PropTypes from 'prop-types';

import React from 'react';
import { THEME } from 'reactor/common';
import { Icon, Slider } from 'reactor/components';

import { FLAGS } from '@assets';
import { currencyDecimals } from '@common';
import { Input, Option, PriceFriendly, OPTION_SIZE } from '@components';
import { useL10N, useStore } from '@context';

import { getVault, queryAvailableVaults } from '../modules';

const { COLOR, ICON, SPACE } = THEME;

const FormTransaction = ({ form = {}, onChange, vault = {} }) => {
  const l10n = useL10N();
  const { baseCurrency, vaults, rates } = useStore();

  const handleField = (field, fieldValue) => {
    const next = { ...form, [field]: fieldValue };
    const from = getVault(vault.hash, vaults);
    const to = getVault(next.destination, vaults);
    let { exchange = 0, value = 0 } = next;

    if (next.destination && exchange === form.exchange) {
      const keys = Object.keys(rates);
      const lastRates = rates[keys[keys.length - 1]];

      if (from.currency === to.currency) exchange = value;
      else if (from.currency === baseCurrency) exchange = value * lastRates[to.currency];
      else if (to.currency === baseCurrency) exchange = value / lastRates[from.currency];
      else exchange = (value / lastRates[from.currency]) * lastRates[to.currency];

      exchange = parseFloat(exchange, 10).toFixed(currencyDecimals(exchange, to.currency));
    }

    onChange({
      form: { ...next, from, to, exchange },
      valid: next.value > 0 && next.destination !== undefined && next.exchange > 0,
    });
  };

  return (
    <>
      <Input
        currency={vault.currency}
        label={l10n.SEND}
        maxValue={vault.currentBalance}
        onChange={(value) => handleField('value', value)}
        value={form.value}
      />

      <Icon
        color={form.value <= 0 ? COLOR.LIGHTEN : undefined}
        family={ICON.FAMILY}
        marginVertical="S"
        value="arrow-down"
        size={SPACE.L}
        style={{ alignSelf: 'center' }}
      />

      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE}>
        {queryAvailableVaults(vaults, vault.hash).map(({ currency, currentBalance, hash, title }) => (
          <Option
            key={hash}
            image={FLAGS[currency]}
            legend={title}
            marginRight="S"
            onPress={() => handleField('destination', hash)}
            selected={hash === form.destination}
          >
            <PriceFriendly
              caption
              color={COLOR.LIGHTEN}
              maskAmount={false}
              value={currentBalance}
              currency={currency}
            />
          </Option>
        ))}
      </Slider>

      <Input
        currency={form.to ? form.to.currency : baseCurrency}
        disabled={!form.to}
        label={l10n.GET}
        marginTop="M"
        marginBottom="XL"
        onChange={(value) => handleField('exchange', value)}
        value={form.to ? form.exchange : undefined}
      />
    </>
  );
};

FormTransaction.propTypes = {
  destination: PropTypes.string,
  form: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  vault: PropTypes.shape({}).isRequired,
};

FormTransaction.defaultProps = {
  destination: undefined,
};

export default FormTransaction;
