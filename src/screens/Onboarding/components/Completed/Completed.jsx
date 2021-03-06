import PropTypes from 'prop-types';
import React from 'react';
import { Button, Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner } from '@components';
import { useL10N } from '@context';

import styles from './Completed.style';

const { DELAY_PRESS_MS } = C;

const Completed = ({ onPress, ...inherit }) => {
  const l10n = useL10N();

  return (
    <Viewport {...inherit}>
      <Banner
        align="right"
        image={BANNERS.COMPLETED}
        marginBottom="XL"
        title={l10n.ONBOARDING_COMPLETED_TITLE}
        caption={l10n.ONBOARDING_COMPLETED_CAPTION}
      />
      <Button delay={DELAY_PRESS_MS} onPress={onPress} style={styles.buttonRight} text={l10n.CONTINUE.toUpperCase()} />
    </Viewport>
  );
};

Completed.propTypes = {
  onPress: PropTypes.func,
};

export { Completed };
