import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CountUp from 'react-countup';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import useTotalTreasuryBalance from '../../hooks/useTotalTreasuryBalance.js'

import { Box, Card, CardContent, Typography, Grid, Container } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';
import treasuryImg from '../../assets/img/5.jpg';


const assetList = [
  {
    depositTokenName: 'TSHARES',
  },
  {
    depositTokenName: 'TSHARES-WFTM LP',
  },
  {
    depositTokenName: 'WFTM',
  },
  {
    depositTokenName: 'PRINTER',
  },
  {
    depositTokenName: 'PRINTER-BUSD LP',
  },
]

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${treasuryImg}) no-repeat !important;
    background-size: cover !important;
    background-color: var(--black);
}

* {
    border-radius: 0 !important;
}
`;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
}));

const Cemetery = () => {
  const classes = useStyles();
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const { balance, balance_2shares_wftm, balance_cash_wftm, balance_printer_wftm, balance_cash, balance_printer, balance_2shares } = useTotalTreasuryBalance();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom style={{ marginBottom: '50px' }}>
                Treasury
              </Typography>

              {/* <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box> */}
              
              <Box mt={2}>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          Total Treasury Balance:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={2} style={{ marginTop: '100px' }}>
              <Typography color="textPrimary" align="center" variant="h4" gutterBottom style={{ marginBottom: '50px' }}>
                Protocol Owned Liquidity
              </Typography>
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          TOMB-WFTM LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_cash_wftm} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          PRINTER-BUSD LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_printer_wftm} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          TSHARES-WFTM LP:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares_wftm} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} className={classes.gridItem}>
                    <Card style={{ height: "auto" }}>
                      <CardContent align="center">
                        <Typography variant="h5">
                          WFTM:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_cash} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          PRINTER:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_printer} separator="," prefix="$" />
                      </CardContent>
                      <CardContent align="center">
                        <Typography variant="h5">
                          TSHARES:
                        </Typography>
                        <CountUp style={{ fontSize: '25px' }} end={balance_2shares} separator="," prefix="$" />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* <Grid container justify="center" spacing={3}>
                {assetList.map((asset) => 
                <Card>
                  <CemeteryCard bank={asset} />
                </Card>
                )}
              </Grid> */}




              

            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
