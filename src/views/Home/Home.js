import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/3.jpg';
import CashImage from '../../assets/img/DEGEN.svg';
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
  const tombFtmLpStats = useLpStats('DEGEN-TOMB LP');
  const tShareFtmLpStats = useLpStats('DSHARE-USDC LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  const { price: ftmPrice, marketCap: ftmMarketCap, priceChange: ftmPriceChange } = useFantomPrice();
  const { balance: rebatesTVL } = useTotalTreasuryBalance();
  const totalTVL = TVL + rebatesTVL;

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }
  
  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=0xF61d81d623d9c4a45ff5766EDa5AF224c3dde1A5&inputCurrency=0x6c021Ae822BEa943b2E66552bDe1D2696a53fbB7';
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=0xeddF0Dc0772D69572C0b9fFFaFF335ceBC1B6140&inputCurrency=0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(2) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply-20000) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(2) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply-383) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply-383) : null), [tShareStats]);

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
  const date = new Date('2022-2-24 17:00:00Z');

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
        <Grid item xs={12} sm={6}>
          <Paper style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <Box p={4}>
              <h2>Welcome to Degen Finance!</h2>
              <p>An algorithmic stablecoin on the Fantom Opera blockchain, pegged to the price of 1 TOMB</p>
              <p>Degen utilizes multiple bonding mechanisms at the <StyledLink href="/rebates">DAO</StyledLink> as well as seigniorage.</p>
              <p>
                Stake your DEGEN-TOMB LP in the <StyledLink href="/farms">Graveyard</StyledLink> to earn DSHARE rewards.
                Then stake your earned DSHARE in the <StyledLink href="/boardroom">Mortuary</StyledLink> to maximize profits!
              </p><h2>
              Degen-Tomb LP staking is open! <br/>
DSHARE rewards will start 1 Hour AFTER the Public Genesis ends</h2>
            </Box>
          </Paper>
				</Grid>
        <Grid container justify="center">
            <Box mt={3} style={{ width: '1000px' }}>
            <Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                Do your own research before investing. Investing is risky and may result in monetary loss. Degen is beta software and may contain bugs. By using degen, you agree that the Degen team is not responsible for any financial losses from investing in Degen.
            </Alert>
            </Box>
            { <LaunchCountdown deadline={date} description={'Raffle ends in'} descriptionLink={''}></LaunchCountdown> }

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
              <Button color="primary" href="/farms" variant="contained" style={{ marginRight: '10px' }}>
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
                Buy DEGEN
              </Button>
              <Button color="primary" variant="contained" target="_blank" href={buyTShareAddress} style={{ marginRight: '10px' }} className={classes.button}>
                Buy DSHARE
              </Button>
              <Button  variant="contained" target="_blank" href="https://dexscreener.com/fantom/0xf6b99c9b6e6bdbfd1b2de21f908189b49f43b9e3" style={{ marginRight: '10px' }} className={classes.button}>
                DEGEN Chart
              </Button>
              <Button variant="contained" target="_blank" href="https://dexscreener.com/fantom/0x6ce65e05902630b8a4455376c3969aebd4c6c245" className={classes.button}>
                DSHARE Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>TOMB</h2>
              <Box mt={2} style={{ backgroundColor: "transparent !important" }}>
                <CardIcon style={{ backgroundColor: "transparent !important" }}>
                  <TokenSymbol symbol="TOMBHOME" style={{ backgroundColor: "transparent !important"}} />
                </CardIcon>
      
                <span style={{ fontSize: '30px' }}>${ftmPrice ? ftmPrice : '-.----'} USD</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${ftmMarketCap} <br />
                Price Change 24h: {ftmPriceChange.toFixed(2)}% <br />
                <br />
                <br />
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DEGEN</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TOMB');
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
                  <TokenSymbol symbol="DEGEN" style={{ backgroundColor: "transparent !important" }} />
                </CardIcon>
    
                <span style={{ fontSize: '30px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} TOMB</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DSHARE</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TSHARE');
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
                  <TokenSymbol symbol="DSHARE" />
                </CardIcon>
  
                <span style={{ fontSize: '30px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} TOMB</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(1 * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: 1{/*tShareCirculatingSupply*/} <br />
                Total Supply: 1{/*tShareTotalSupply*/}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DBOND</h2>
              { <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('TBOND');
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
                  <TokenSymbol symbol="DBOND" />
                </CardIcon>
     
                <span style={{ fontSize: '30px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} TOMB</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>DEGEN-TOMB LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="DEGEN-TOMB HOME" />
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
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} DEGEN /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} TOMB
                </span>
              </Box>
              <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{ backgroundColor: "transparent", boxShadow: "none", border: "1px solid var(--white)" }}>
            <CardContent align="center">
              <h2>DSHARE-USDC LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="DSHARE-USDC HOME" />
                </CardIcon>
              </Box>
              {/*<Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
            </Box>*/}
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} DSHARE /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} USDC
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
