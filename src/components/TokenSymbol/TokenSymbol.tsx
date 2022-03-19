import React from 'react';

//Farm ecosystem logos
import tombLogo from '../../assets/img/CASH.gif';
import tomb from '../../assets/img/tomb.png';
import tShareLogo from '../../assets/img/PRINTER.gif';
import tombLogoPNG from '../../assets/img/CASH.gif';
import tShareLogoPNG from '../../assets/img/PRINTER.gif';
import tBondLogo from '../../assets/img/CBOND-01.png';
import tshares from '../../assets/img/tshares.png';
import cashPrinter from '../../assets/img/cash-PRINTER.gif';
import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/PRINTER-BUSD.png';

import wftmLogo from '../../assets/img/fantom-ftm-logo.png';
import wbnbLogo from '../../assets/img/fantom-ftm-logo.png';

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
import tshareftm from '../../assets/img/tshare_ftm.png';
import tbond from '../../assets/img/tbond.png';
import BusdLogo from '../../assets/img/BUSD.png';
import cashprinter from '../../assets/img/printer-cash.png';
import ThreeombLPLogo from '../../assets/img/CASH-TOMB.png';
import ThreesharesLPLogo from '../../assets/img/PRINTER-BUSD.png';
import bombLogo from '../../assets/img/bomb.png';
import grapeLogo from '../../assets/img/grape.png';
import empLogo from '../../assets/img/emp.png';
import dibsLogo from '../../assets/img/dibs.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tomb,
  TBOND: tbond,
  TOMBHOME: tomb,
  TSHARES: tshares,
  CASH: tombLogo,
  CBOND: tBondLogo,
  PRINTER: tShareLogoPNG,
  WFTM: wftmLogo,
  BUSD: BusdLogo,
  WBNB: wbnbLogo,
  BOMB: bombLogo,
  GRAPE: grapeLogo,
  EMP: empLogo,
  DIBS: dibsLogo,

  'TOMB-WFTM LP': TwoombLPLogo,
  'TSHARES-WFTM LP': TwosharesLPLogo,

  'CASH-BUSD LP': ThreeombLPLogo,
  'CASH-TOMB HOME': ThreeombLPLogo,

  'PRINTER-BUSD LP': ThreesharesLPLogo,
  'PRINTER-BUSD HOME': ThreesharesLPLogo,

  'PRINTER-CASH LP': cashprinter,
  'PRINTER-CASH HOME': ThreesharesLPLogo,

  'wFTM': wftmLogo,
  '2OMB': twoombLogo,
  '2SHARES': twoshareLogo,
  'TOMB-FTM LP': TwoombLPLogo,
  'TSHARES-FTM LP': tshareftm,

};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 100 }) => {
  if(symbol ==='PRINTER-BUSD HOME' || symbol === 'CASH-TOMB HOME' || symbol === 'TOMBHOME'){
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={110} height={110} />;
  }else{
    return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
  }

};

export default TokenSymbol;
