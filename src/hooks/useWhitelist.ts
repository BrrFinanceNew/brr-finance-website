import { useEffect, useState } from 'react';
import useCashFinance from './useTombFinance';
import { Whitelist } from '../tomb-finance/types';
import useRefresh from './useRefresh';
import useWallet from 'use-wallet';
const useWhitelistStats = (account: string) => {
  const [stat, setStat] = useState<Whitelist>();
  const { fastRefresh } = useRefresh();
  const cashFinance = useCashFinance();

  useEffect(() => {
    async function fetchWhitelist() {
      try {
        setStat(await cashFinance.getWhitelistStat(account));
      } catch(err){
        console.error(err)
      }
    }
    fetchWhitelist();
  }, [setStat, cashFinance, fastRefresh]);

  return stat;
};

export default useWhitelistStats;
