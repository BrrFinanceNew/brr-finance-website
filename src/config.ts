// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      USDC: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
      TSHARES: ['0x4cdf39285d7ca8eb3f090fda0c069ba5f4145b37', 18],
      TOMB: ['0x6c021ae822bea943b2e66552bde1d2696a53fbb7', 18],
      DEGEN: ['0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5', 18],
      DSHARE: ['0xeddF0Dc0772D69572C0b9fFFaFF335ceBC1B6140', 18],
      DBOND: ['0x6B9bD1806b0641218Ae1b63F23329C127a8Ea8f1', 18],
//      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
//      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
//      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
//      BELUGA: ['0x4A13a2cf881f5378DEF61E430139Ed26d843Df9A', 18],
//      BIFI: ['0xd6070ae98b8069de6B494332d1A1a81B6179D960', 18],
//      MIM: ['0x82f0b8b456c1a451378467398982d4834b6829c1', 18],
//      BLOOM: ['0x9B2e37cDC711CfcAC1E1482B5741c74dd3924199', 9],
      'wFTM': ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
//      '2OMB': ['0x7a6e4E3CC2ac9924605DCa4bA31d1831c84b44aE', 18],
//      'TOMB-TSHARES LP': ['0xd9B5f00d183df52D717046521152303129F088DD', 18],
//      'TOMB-WFTM LP': ['0xbdC7DFb7B88183e87f003ca6B5a2F81202343478',18],
//      'TSHARES-WFTM LP': ['0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52',18],
//      '2SHARES': ['0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca', 18],
      'DEGEN-TOMB LP': ['0x83A52eff2E9D112E9B022399A9fD22a9DB7d33Ae',18],
      'DSHARE-USDC LP': ['0xd352daC95a91AfeFb112DBBB3463ccfA5EC15b65',18],
//      'DSHARE': ['0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7', 18],
//      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'TOMB-FTM LP': ['0x83a52eff2e9d112e9b022399a9fd22a9db7d33ae', 18],
      'TSHARES-FTM LP': ['0xd352dac95a91afefb112dbbb3463ccfa5ec15b65', 18],
      'DEGEN-DSHARE LP': ['0xd352dac95a91afefb112dbbb3463ccfa5ec15b65', 18],
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
  USDCRewardPool: {/*USDC no whitelist*/
    name: 'Earn DEGEN by staking USDC',
    info: '1%',
    whitelist: 'No',
    poolId: 0,
    sectionInUI: 0,
    contract: 'USDCRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'DEGEN',
    finished: false,
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    sort: 0,
    closedForStaking: true,
  },
  TombRewardPool: { /*TOMB no whitelist*/
    name: 'Earn DEGEN by staking TOMB',
    info: '1%',
    whitelist: 'No',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombRewardPool',
    depositTokenName: 'TOMB',
    earnTokenName: 'DEGEN',
    finished: false,
    multiplier: '5000x',
    site: '#',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    sort: 1,
    closedForStaking: true,
  },
  tsharesRewardPool: { /*TSHARES no whitelist*/
    name: 'Earn DEGEN by staking TSHARES',
    poolId: 2,
    whitelist: 'No',
    sectionInUI: 0,
    contract: 'tsharesRewardPool',
    depositTokenName: 'TSHARES',
    earnTokenName: 'DEGEN',
    finished: false,
    info: '1%',
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37',
    sort: 2,
    closedForStaking: true,
  }, 
  WhitelistTsharesRewardPool: { /*TSHARES whitelist*/
    name: 'Earn DEGEN by staking TSHARES',
    poolId: 0,
    whitelist: 'Yes',
    sectionInUI: 0,
    contract: 'WhitelistTsharesRewardPool',
    depositTokenName: 'TSHARES',
    earnTokenName: 'DEGEN',
    finished: false,
    info: '0%',
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37',
    sort: 5,
    closedForStaking: true,
  },
  WhitelistUSDCRewardPool: {/*USDC whitelist*/
    name: 'Earn DEGEN by staking USDC',
    info: '0%',
    whitelist: 'Yes',
    poolId: 1,
    sectionInUI: 0,
    contract: 'WhitelistUSDCRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'DEGEN',
    finished: false,
    multiplier: '7500x',
    site: "#",
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    sort: 3,
    closedForStaking: true,
  },
  WhitelistTombRewardPool: { /*TOMB whitelist*/
    name: 'Earn DEGEN by staking TOMB',
    info: '0%',
    whitelist: 'Yes',
    poolId: 2,
    sectionInUI: 0,
    contract: 'WhitelistTombRewardPool',
    depositTokenName: 'TOMB',
    earnTokenName: 'DEGEN',
    finished: false,
    multiplier: '5000x',
    site: '#',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    sort: 4,
    closedForStaking: true,
  },
  // DSHARE STAKING starts here
  TombFtmLPTShareRewardPool: {
    name: 'Earn DSHARE by DEGEN-TOMB LP',
    info: '0%',
    whitelist: 'No',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TombFtmLPTShareRewardPool',
    depositTokenName: 'DEGEN-TOMB LP',
    earnTokenName: 'DSHARE',
    finished: false,
    multiplier: '35500x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5&inputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    site: '#',
    sort: 2,
    closedForStaking: true,
  },
  TshareFtmLPTShareRewardPool: {
    name: 'Earn DSHARE by DSHARE-USDC LP',
    info: '0%',
    whitelist: 'No',
    poolId: 2,
    sectionInUI: 2,
    contract: 'TshareFtmLPTShareRewardPool',
    depositTokenName: 'DSHARE-USDC LP',
    earnTokenName: 'DSHARE',
    finished: false,
    multiplier: '24000x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5&inputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    site: '#',
    sort: 3,
    closedForStaking: true,
  },
  TwoshareFtmLPTShareRewardPool: {
    name: 'Earn DSHARE by TSHARES-FTM LP',
    info: '0.2%',
    whitelist: 'No',
    poolId: 3,
    sectionInUI: 2,
    contract: 'TwoshareFtmLPTShareRewardPool',
    depositTokenName: 'TSHARES-FTM LP',
    earnTokenName: 'DSHARE',
    finished: true,
    multiplier: '15000x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x4cdF39285D7Ca8eB3f090fDA0C069ba5F4145B37',
    site: '#',
    sort: 6,
    closedForStaking: true,
  },
  TwoombFtmLPTShareRewardPool: {
    name: 'Earn DSHARE by TOMB-FTM LP',
    info: '0.2%',
    whitelist: 'No',
    poolId: 4,
    sectionInUI: 2,
    contract: 'TwoombFtmLPTShareRewardPool',
    depositTokenName: 'TOMB-FTM LP',
    earnTokenName: 'DSHARE',
    finished: true,
    multiplier: '15000x',
    buyLink: 'https://spookyswap.finance/swap?outputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7',
    site: '#',
    sort: 5,
    closedForStaking: true,
  },
  DegenDshareLPDshareRewardPool: {
    name: 'Earn DSHARE by DEGEN-DSHARE LP',
    info: '0%',
    whitelist: 'No',
    poolId: 5,
    sectionInUI: 2,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'DEGEN-DSHARE LP',
    earnTokenName: 'DSHARE',
    finished: true,
    multiplier: '15000x',
    buyLink: '#',
    site: '#',
    sort: 4,
    closedForStaking: true,
  },
  // TwoombTwosharesLPTShareRewardPool: {
  //   name: 'Earn DSHARE by TOMB-TSHARES LP',
  //   poolId: 4,
  //   sectionInUI: 2,
  //   contract: 'TwoombTwosharesLPTShareRewardPool',
  //   depositTokenName: 'TOMB-TSHARESLP',
  //   earnTokenName: 'TSHARE',
  //   finished: false,
  //   multiplier: '0',
  //   buyLink: '',
  //   site: '',
  //   sort: 12,
  //   closedForStaking: true,
  // },
/*   Tomb2SHARESRebates: {
    name: 'Bond 2SHARES, earn DEGEN',
    poolId: 0,
    sectionInUI: 3,
    contract: 'TombFtmRewardPool',
    depositTokenName: '2SHARES',
    earnTokenName: 'DEGEN',
    finished: false,
    multiplier: '10000x',
    buyLink: '',
    site: '',
    sort: 5,
    closedForStaking: true,
  }, */
    USDCRebates: {
     name: 'Bond USDC, earn DEGEN',
     info: '0%',
     whitelist: 'No',
     poolId: 1,
     sectionInUI: 3,
     contract: 'TombFtmRewardPool',
     depositTokenName: 'USDC',
     earnTokenName: 'DEGEN',
     finished: true,
     multiplier: '15000x',
     buyLink: '',
     site: '',
     sort: 6,
     closedForStaking: true,
  },
  Tomb2SHARESFTMRebates: {
    name: 'Bond TSHARES-WFTM LP, earn DEGEN',
    info: '0%',
    whitelist: 'No',
    poolId: 2,
    sectionInUI: 3,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'TSHARES-WFTM LP',
    earnTokenName: 'DEGEN',
    finished: true,
    multiplier: '12000x',
    buyLink: '',
    site: '',
    sort: 4,
    closedForStaking: true,
  },
  // TombDEGENFTMRebates: {
  //   name: 'Bond DEGEN-TOMB LP, earn DEGEN',
  //   poolId: 3,
  //   sectionInUI: 3,
  //   contract: 'TombFtmRewardPool',
  //   depositTokenName: 'DEGEN-TOMB LP',
  //   earnTokenName: 'DEGEN',
  //   finished: false,
  //   multiplier: '6000x',
  //   buyLink: '',
  //   site: '',
  //   sort: 1,
  //   closedForStaking: true,
  // },
  TombDSHARERebates: {
    name: 'Bond DSHARE, earn DEGEN',
    info: '0%',
    whitelist: 'No',
    poolId: 4,
    sectionInUI: 3,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'DSHARE',
    earnTokenName: 'DEGEN',
    finished: true,
    multiplier: '5000x',
    buyLink: '',
    site: '',
    sort: 3,
    closedForStaking: true,
  },
  //TombDSHAREFTMRebates: {
   // name: 'Bond DSHARE-USDC LP, earn DEGEN',
   // poolId: 5,
   // sectionInUI: 3,
  //  contract: 'TombFtmRewardPool',
  //  depositTokenName: 'DSHARE-USDC LP',
  //  earnTokenName: 'DEGEN',
  //  finished: false,
  //  multiplier: '6000x',
  //  buyLink: '',
 //   site: '',
 //   sort: 2,
 //   closedForStaking: true,
 // },
};

export default configurations['production'];
