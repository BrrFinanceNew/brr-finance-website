import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/DEGEN.svg';
import tomb from '../../assets/img/fantom-ftm-logo.png';
import tShareLogo from '../../assets/img/DSHARES.svg';
import tombLogoPNG from '../../assets/img/DEGEN.png';
import tShareLogoPNG from '../../assets/img/DSHARES.png';
import tBondLogo from '../../assets/img/DBOND-01.png';
import tshares from '../../assets/img/tshares.png';
import degenDshare from '../../assets/img/degen-dshare.png';
import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/DSHARES-TOMB.png';

import wftmLogo from '../../assets/img/fantom-ftm-logo.png';
import booLogo from '../../assets/img/spooky.png';
import belugaLogo from '../../assets/img/BELUGA.png';
import twoshareLogo from '../../assets/img/t_2SHARE-01.png';
import twoombLogo from '../../assets/img/t_2OMB-01.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';
import bifiLogo from '../../assets/img/COW.svg';
import mimLogo from '../../assets/img/mimlogopng.png';
import bloomLogo from '../../assets/img/BLOOM.jpg';
import TwoombLPLogo from '../../assets/img/tomb_ftm.png';
import TwosharesLPLogo from '../../assets/img/tomb_ftm.png';
import TwoombTwosharesLPLogo from '../../assets/img/TOMB-TSHARES.png';

import UsdcLogo from '../../assets/img/USDC.png';

import ThreeombLPLogo from '../../assets/img/DEGEN-TOMB.png';
import ThreesharesLPLogo from '../../assets/img/DSHARES-TOMB.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tomb,
  DEGEN: tombLogo,
  DBOND: tBondLogo,
  DSHARES: tShareLogoPNG,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  TSHARES: tshares,
  TBOND: tBondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  BELUGA: belugaLogo,
  BIFI: bifiLogo,
  MIM: mimLogo,
  USDC: UsdcLogo,
  BLOOM: bloomLogo,
  'TOMB-WFTM LP': TwoombLPLogo,
  'TSHARES-WFTM LP': TwosharesLPLogo,
  'TOMB-TSHARES LP': TwoombTwosharesLPLogo,
  'DEGEN-DSHARE LP': degenDshare,
  'DEGEN-TOMB LP': ThreeombLPLogo,
  'DSHARES-TOMB LP': ThreesharesLPLogo,


  'wFTM': wftmLogo,
  '2OMB': twoombLogo,
  '2SHARES': twoshareLogo,
  'TOMB-FTM-LP': tombFtmLpLogo,
  'TSHARE-FTM-LP': tshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 115 }) => {
  if(symbol === 'TOMB' || symbol === 'TOMBPNG' || symbol === '2OMB'){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={70} height={70} />;
  }else{
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
  }

};

export default TokenSymbol;
