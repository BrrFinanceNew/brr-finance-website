import { useEffect, useState } from 'react';
import useDegenFinance from './useTombFinance';
import { Whitelist } from '../tomb-finance/types';
import useRefresh from './useRefresh';
import useWallet from 'use-wallet';
const useWhitelistStats = (account: string) => {
  const [stat, setStat] = useState<Whitelist>();
  const { fastRefresh } = useRefresh();
  const degenFinance = useDegenFinance();

  useEffect(() => {
    async function fetchWhitelist() {
      try {
        setStat(await degenFinance.getWhitelistStat(account));
      } catch(err){
        console.error(err)
      }
    }
    fetchWhitelist();
  }, [setStat, degenFinance, fastRefresh]);

  return stat;
};

export default useWhitelistStats;
