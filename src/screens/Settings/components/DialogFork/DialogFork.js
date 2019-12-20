import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';

import { useL10N, useStore } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';
import styles from './DialogFork.style';

const { COLOR } = THEME;

const DialogFork = ({
  onClose, onForked, query, visible, ...inherit
}) => {
  const l10n = useL10N();
  const { onFork } = useStore();
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const fork = await onFork(query);
    if (fork) onForked();
    else onClose();
    setBusy(false);
  };

  return (
    <Dialog
      {...inherit}
      highlight
      onClose={onClose}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={l10n.WARNING}
      visible={visible}
    >
      <Text>{l10n.TRANSFER_TXS_IMPORT}</Text>
      <Button
        activity={busy}
        color={COLOR.PRIMARY}
        disabled={busy}
        onPress={onSubmit}
        shadow
        style={styles.button}
        title={!busy ? l10n.IMPORT : undefined}
      />
    </Dialog>
  );
};

DialogFork.propTypes = {
  onClose: func.isRequired,
  onForked: func.isRequired,
  query: string,
  visible: bool,
};

DialogFork.defaultProps = {
  query: undefined,
  visible: false,
};

export default DialogFork;
