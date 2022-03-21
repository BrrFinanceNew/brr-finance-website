import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/3.jpg';
import CashImage from '../../assets/img/CASH.gif';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useFantomPrice from '../../hooks/useFantomPrice';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';
import LaunchCountdown from '../../components/LaunchCountdown';
import MetamaskFox from '../../assets/img/metamask-fox.svg';

import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-color: var(--black);
}

* {
    border-radius: 0 !important;
}
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('CASH-BUSD LP');
  const tShareFtmLpStats = useLpStats('PRINTER-BUSD LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  const { price: ftmPrice, marketCap: ftmMarketCap, priceChange: ftmPriceChange } = useFantomPrice();
  //const { balance: rebatesTVL } = useTotalTreasuryBalance();
  const totalTVL = TVL;

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }
  
  const buyTombAddress = 'https://pancakeswap.finance/swap?outputCurrency=0xbFF6a376F54335919BC5332a16A81a07E8bDc06a&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
  const buyTShareAddress = 'https://pancakeswap.finance/swap?outputCurrency=0xDACDCf56f42b3F3a0fB57459CeFC10b8F393f199&inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(2) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(2) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(2) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });
  const date = new Date('2022-3-21 19:00:00Z');

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: var(--accent-light);
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={3} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
		      <Image className="ombImg-home" color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={9}>
          <Paper style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <Box p={4}>
              <h2>Welcome to Brr Finance!</h2>
              <p>An algorithmic stablecoin on the Binance Smart Chain, pegged to the price of 1 BUSD</p>
              <p>Cash utilizes multiple bonding mechanisms at the <StyledLink href="/rebates">DAO</StyledLink> as well as seigniorage.</p>
              <p>
                Stake your CASH-BUSD LP in the <StyledLink href="/farms">Farm</StyledLink> to earn PRINTER rewards.
                Then stake your earned PRINTER in the <StyledLink href="/boardroom">Boardroom</StyledLink> to maximize profits!
              </p>
              <p>This protocol is built to last which means that the Genesis farms will be juicy but after that the LP's are going to be adjusted in order to 
                make this as stable as possible. </p>
              <p> We all want crazy aprs but that means crazy dips and gigantic risks. Our aim is to make this a 
                long term project , not a hit and run. </p>
              <h2>The PRINTER-BUSD LP is opened for Staking !
              </h2>
            </Box>
          </Paper>
				</Grid>
        <Grid container justify="center">
            <Box mt={3} style={{ width: '1000px' }}>
            <Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                Do your own research before investing. Investing is risky and may result in monetary loss. By using cash, you agree that the Cash team is not responsible for any financial losses from investing in Cash.
            </Alert>
            </Box>
            { <LaunchCountdown deadline={date} description={'PRINTER-BUSD LP starts in'} descriptionLink={''}></LaunchCountdown> }
  
        </Grid>

        {/* <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{ margin: '12px', display: 'flex' }}>
            <Alert severity="warning" style={{ backgroundColor: "transparent", border: "1px solid var(--white)" }}>
              <b>
      Please visit our <StyledLink target="_blank" href="https://docs.tomb.finance">documentation</StyledLink> before purchasing TOMB or TSHARE!</b>
            </Alert>
        </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              { <CountUp style={{ fontSize: '25px' }} end={totalTVL} separator="," prefix="$" />}
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%', backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <CardContent align="center">
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/farms" variant="contained" style={{marginRight: '10px'}}>
                Farm Now
              </Button>
              <Button color="primary" href="/boardroom" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy CASH
              </Button>
              <Button color="primary" variant="contained" target="_blank" href={buyTShareAddress} style={{ marginRight: '10px' }} className={classes.button}>
                Buy PRINTER
              </Button>
              <Button  variant="contained" target="_blank" href="https://dexscreener.com/bsc/0x2ec7840D0C9fEB2c590eEeD3ee19F1737b2e4300" style={{ marginRight: '10px' }} className={classes.button}>
                CASH Chart
              </Button>
              <Button variant="contained" target="_blank" href="https://dexscreener.com/bsc/0x9dd76D241f3Ae71281bDbd1aa1629bff4834DF65" className={classes.button}>
                PRINTER Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>Peg</h2>
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="TOMBHOME" style={{ backgroundColor: "transparent !important"}} />
                </CardIcon>
      
                <span style={{ fontSize: '30px' }}>${ftmPrice ? ftmPrice : '-.----'} BUSD</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
{/*                 Market Cap: ${ftmMarketCap} <br />
                Price Change 24h: {ftmPriceChange.toFixed(2)}% <br /> */}
                <br />                <br />                <br />
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CASH</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('CASH');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> }
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="CASH" style={{ backgroundColor: "transparent !important" }} />
                </CardIcon>
    
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} BUSD</span>
              </Box>
   {/*            <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box> */}
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toLocaleString('en-US')} <br />
                Circulating Supply: {Number(tombCirculatingSupply).toLocaleString('en-US')} <br />
                Total Supply: {Number(tombTotalSupply).toLocaleString('en-US')}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>PRINTER</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('PRINTER');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> }
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PRINTER" />
                </CardIcon>
  
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} BUSD</span>
              </Box>
{/*               <Box>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box> */}
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(1 * tSharePriceInDollars).toLocaleString('en-US')} <br />
                Circulating Supply: {tShareCirculatingSupply -695} <br />
                Total Supply: 80000{/*tShareTotalSupply*/}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CBOND</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('CBOND');
                }}
                color="secondary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px', borderColor: "var(--accent-light)" }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button> }
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CBOND" />
                </CardIcon>
     
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} BUSD</span>
              </Box>
{/*               <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box> */}
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toLocaleString('en-US')} <br />
                Circulating Supply: {Number(tBondCirculatingSupply).toLocaleString('en-US')} <br />
                Total Supply: {Number(tBondTotalSupply).toLocaleString('en-US')}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>CASH-BUSD LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CASH-TOMB HOME" />
                </CardIcon>
              </Box>
              {/*
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} CASH /{' '}
                  {tombLPStats?.ftmAmount ? (tombLPStats?.ftmAmount).toLocaleString('en-US') : '-.--'} BUSD
                </span>
              </Box>
{/*               <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
 */}              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>PRINTER-BUSD LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="PRINTER-BUSD HOME" />
                </CardIcon>
              </Box>
              {/*<Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
            </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? Number(tshareLPStats?.tokenAmount).toLocaleString('en-US') : '-.--'} PRINTER /{' '}
                  {tshareLPStats?.ftmAmount ? Number(tshareLPStats?.ftmAmount).toLocaleString('en-US') : '-.--'} BUSD
                </span>
              </Box>
{/*               <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
 */}              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? Number(tshareLPStats.totalLiquidity).toLocaleString('en-US') : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? Number(tshareLPStats.totalSupply).toLocaleString('en-US') : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
