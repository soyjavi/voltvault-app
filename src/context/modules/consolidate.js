import { calcOverall } from './calcOverall';
import { calcVault } from './calcVault';

export const consolidate = ({ rates = {}, settings: { baseCurrency } = {}, ...blockchain } = {}) => {
  const txs = (blockchain.txs || []).slice(1).map(({ data = {}, hash, timestamp }) => ({ timestamp, ...data, hash }));
  const vaults = (blockchain.vaults || []).slice(1).map(({ data = {}, hash, timestamp }) =>
    calcVault({
      baseCurrency,
      rates,
      txs,
      vault: { timestamp, ...data, hash },
    }),
  );

  return {
    blockchain,
    latestHash: {
      txs: blockchain.txs && blockchain.txs.length > 0 ? blockchain.txs.slice(-1).pop().hash : undefined,
      vaults: blockchain.vaults && blockchain.vaults.length > 0 ? blockchain.vaults.slice(-1).pop().hash : undefined,
    },
    overall: calcOverall({ baseCurrency, rates, vaults }),
    txs,
    vaults,
  };
};
