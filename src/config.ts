
//import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  production: {
    chainId: 56,
    networkName: 'BSC Mainnet',
    ftmscanUrl: 'https://bscscan.com',
    defaultProvider: 'https://bsc-dataseed.binance.org/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xe9e7cea3dedca5984780bafc599bd69add087d56', 18],
      WBNB: ['0xe9e7cea3dedca5984780bafc599bd69add087d56', 18],
      BUSD: ['0xe9e7cea3dedca5984780bafc599bd69add087d56', 18],
      TSHARES: ['0x4cdf39285d7ca8eb3f090fda0c069ba5f4145b37', 18],
      TOMB: ['0x6c021ae822bea943b2e66552bde1d2696a53fbb7', 18],
      CASH: ['0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5', 18],
      PRINTER: ['0x6E209329A33a63C463dbb65AE2d6655Fe5C98411', 18],
      CBOND: ['0x6B9bD1806b0641218Ae1b63F23329C127a8Ea8f1', 18],
      'wFTM': ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      'CASH-BUSD LP': ['0xF6b99c9B6E6bDbFd1B2De21F908189b49F43B9E3',18],
      'PRINTER-BUSD LP': ['0x1b622bB79d25f67e90BD189B5d116e0923Eb4ECB',18],
      'PRINTER-CASH LP': ['0xF01a23fFa6Ec1d45A607F598ad8421a74522a1e1',18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'TOMB-FTM LP': ['0xbdC7DFb7B88183e87f003ca6B5a2F81202343478', 18],
      'TSHARES-FTM LP': ['0xd352dac95a91afefb112dbbb3463ccfa5ec15b65', 18],
      'TBOND': ['0x24248CD1747348bDC971a5395f4b3cd7feE94ea0', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  BUSDRewardPool: {/*BUSD no whitelist*/
    name: 'Earn CASH by staking BUSD',
    info: '1%',
    poolId: 0,
    sectionInUI: 1,
    contract: 'BUSDRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'CASH',
    finished: false,
    multiplier: '7500x',
    site: "#",
    buyLink: '',
    sort: 0,
    closedForStaking: true,
  }, 
   wbnbRewardPool: { 
    name: 'Earn CASH by staking WBNB',
    poolId: 4,
    sectionInUI: 1,
    contract: 'wbnbRewardPool',
    depositTokenName: 'WBNB',
    earnTokenName: 'CASH',
    finished: false,
    info: '1%',
    multiplier: '7500x',
    site: "#",
    buyLink: '',
    sort: 2,
    closedForStaking: true,
  }, 
/*cash-tomb 2*/
/* CashBusdShareRewardPool: {
    name: 'Earn PRINTER by CASH-BUSD LP',
    info: '0%',
    poolId: 0,
    sectionInUI: 2,
    contract: 'CashBusdShareRewardPool',
    depositTokenName: 'CASH-BUSD LP',
    earnTokenName: 'PRINTER',
    finished: false,
    multiplier: '35500x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5&inputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    site: '#',
    sort: 0,
    closedForStaking: false,
  }, */
  /*PRINTER BUSD LP*/
/*   PrinterBusdShareRewardPool: {
    name: 'Earn PRINTER by PRINTER-BUSD LP',
    info: '0%',
    poolId: 1,
    sectionInUI: 2,
    contract: 'PrinterBusdShareRewardPool',
    depositTokenName: 'PRINTER-BUSD LP',
    earnTokenName: 'PRINTER',
    finished: false,
    multiplier: '24000x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5&inputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    site: '#',
    sort: 1,
    closedForStaking: false,
  }, */
  /* BUSD */
/*   BUSDShareRewardPool: {
    name: 'Earn PRINTER by staking BUSD',
    info: '0.5%',
    whitelist: '',
    poolId: 4,
    sectionInUI: 2,
    contract: 'BUSDShareRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'PRINTER',
    finished: false,
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    sort: 5,
    closedForStaking: false,
  }, */
  /*PRINTER CASH LP*/
/*   PRINTERCASHShareRewardPool: {
    name: 'Earn PRINTER by PRINTER-CASH LP',
    info: '0%',
    poolId: 5,
    sectionInUI: 2,
    contract: 'PRINTERCASHShareRewardPool',
    depositTokenName: 'PRINTER-CASH LP',
    earnTokenName: 'PRINTER',
    finished: false,
    multiplier: '24000x',
    buyLink: '',
    site: '#',
    sort: 2,
    closedForStaking: false,
  },
  CASHshareRewardPool: {
    name: 'Earn PRINTER by CASH',
    info: '0%',
    poolId: 6,
    sectionInUI: 2,
    contract: 'CASHshareRewardPool',
    depositTokenName: 'CASH',
    earnTokenName: 'PRINTER',
    finished: true,
    multiplier: '15000x',
    buyLink: '#',
    site: '#',
    sort: 3,
    closedForStaking: true,
  }, */
};

export default configurations['production'];
