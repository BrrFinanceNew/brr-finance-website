import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import LaunchCountdown from '../../components/LaunchCountdown';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

import useBanks from '../../hooks/useBanks';
import cemetaryImg from '../../assets/img/cemetery.jpg';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${cemetaryImg}) no-repeat !important;
    background-size: cover !important;
    background-color: var(--black);
}

* {
    border-radius: 0 !important;
}
`;
const date = new Date('2022-2-26 18:00:00Z');
const Cemetery = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  
  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: var(--accent-light);
  `;

  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Graveyard
              </Typography>
              <Grid container justify="center">
                <LaunchCountdown deadline={date} description={'Public Genesis Starts In'} descriptionLink={''}></LaunchCountdown> 
                </Grid>
              {<Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
              <b>Strategy:<br/>
              For the health and longevity of the protocol, a good strategy is to take 20% profits and then:<br/>
               1) Re-invest a portion of earned DSHARE in DSHARE-USDC LP in the <StyledLink href="/farms">Graveyard</StyledLink> to farm more DEGEN! <br/>
               2) Re-invest a portion of  earned DSHARE in <StyledLink href="/boardroom">Mortuary</StyledLink> page to farm more DEGEN!</b>
            </Alert> } 
              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    Earn DSHARE by staking LP Tokens
                  </Typography>
                  <Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                  PLEASE unstake from the OLD DEGEN-TOMB LP pool & restake in the NEW DEGEN TOMB LP pool!
                </Alert>
                  <Grid container spacing={3}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
                
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Public Genesis Pool Has ended, you can withdraw your funds
                  </Typography>
                  <Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                    Make sure you unstake from the whitelist genesis pools and restake in the public pools to continue to earn Degen
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div> 
                
              

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '40px', marginBottom: '20px' }}>
                  Whitelist Genesis Pools - ENDED, Unstake funds and Stake them in the Public Pools Above
                    {/*<Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                  All below pools have ended. Please unstake and collect your rewards.
              </Alert>*/}
                  </Typography>
                  <Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
                    Whitelist pools will end soon please make sure to unstake from below pools and restake in the pools above to continue to earn Degen
                  </Alert>
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
              </Box>
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
