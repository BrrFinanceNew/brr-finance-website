
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
      WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
      BUSD: ['0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18],
      CASH: ['0xbFF6a376F54335919BC5332a16A81a07E8bDc06a', 18],
      PRINTER: ['0xDACDCf56f42b3F3a0fB57459CeFC10b8F393f199', 18],
      CBOND: ['0x4A941A610fFd93e565565531480829DD7bf819b8', 18],
      BOMB: ['0x522348779DCb2911539e76A1042aA922F9C47Ee3', 18],
      'wFTM': ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      'CASH-BUSD LP': ['0x2ec7840D0C9fEB2c590eEeD3ee19F1737b2e4300',18],
      'PRINTER-BUSD LP': ['0x9dd76D241f3Ae71281bDbd1aa1629bff4834DF65',18],
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
    buyLink: 'https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&inputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    sort: 0,
    closedForStaking: true,
  }, 
   wbnbRewardPool: { 
    name: 'Earn CASH by staking WBNB',
    poolId: 1,
    sectionInUI: 1,
    contract: 'wbnbRewardPool',
    depositTokenName: 'WBNB',
    earnTokenName: 'CASH',
    finished: false,
    info: '1%',
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://pancakeswap.finance/swap?outputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    sort: 2,
    closedForStaking: true,
  },  
  bombRewardPool: { 
    name: 'Earn CASH by staking BOMB',
    poolId: 2,
    sectionInUI: 1,
    contract: 'bombRewardPool',
    depositTokenName: 'BOMB',
    earnTokenName: 'CASH',
    finished: false,
    info: '1%',
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3',
    sort: 2,
    closedForStaking: true,
  },
/*cash-busd 2*/
 CashBusdShareRewardPool: {
    name: 'Earn PRINTER by CASH-BUSD LP',
    info: '0%',
    poolId: 0,
    sectionInUI: 2,
    contract: 'CashBusdShareRewardPool',
    depositTokenName: 'CASH-BUSD LP',
    earnTokenName: 'PRINTER',
    finished: true,
    multiplier: '35500x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xbFF6a376F54335919BC5332a16A81a07E8bDc06a&inputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    site: '#',
    sort: 0,
    closedForStaking: true,
  }, 
  /*PRINTER BUSD LP*/
   PrinterBusdShareRewardPool: {
    name: 'Earn PRINTER by PRINTER-BUSD LP',
    info: '0%',
    poolId: 1,
    sectionInUI: 2,
    contract: 'PrinterBusdShareRewardPool',
    depositTokenName: 'PRINTER-BUSD LP',
    earnTokenName: 'PRINTER',
    finished: true,
    multiplier: '24000x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xbFF6a376F54335919BC5332a16A81a07E8bDc06a&inputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    site: '#',
    sort: 1,
    closedForStaking: true,
  }, 
  /* BUSD */
   BUSDShareRewardPool: {
    name: 'Earn PRINTER by staking BUSD',
    info: '0.5%',
    poolId: 4,
    sectionInUI: 2,
    contract: 'BUSDShareRewardPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'PRINTER',
    finished: true,
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    sort: 5,
    closedForStaking: false,
  }, 
  /*PRINTER CASH LP*/
   PRINTERCASHShareRewardPool: {
    name: 'Earn PRINTER by PRINTER-CASH LP',
    info: '0%',
    poolId: 5,
    sectionInUI: 2,
    contract: 'PRINTERCASHShareRewardPool',
    depositTokenName: 'PRINTER-CASH LP',
    earnTokenName: 'PRINTER',
    finished: true,
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
  }/* , 
  BUSDRebates: {
    name: 'Bond BUSD, earn CASH',
    info: '0%',
    poolId: 4,
    sectionInUI: 3,
    contract: '-',
    depositTokenName: 'BUSD',
    earnTokenName: 'CASH',
    finished: false,
    multiplier: '5000x',
    buyLink: '',
    site: '',
    sort: 3,
    closedForStaking: false,
  } */
};

export default configurations['production'];
