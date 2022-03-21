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
import cemetaryImg from '../../assets/img/1.jpg';

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
const date = new Date('2022-2-27 22:30:00Z');
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
                Farm
              </Typography>
              <Grid container justify="center">
                {/*<LaunchCountdown deadline={date} description={'Public Genesis Starts In'} descriptionLink={''}></LaunchCountdown> */}
                </Grid>
{/*               {<Alert style={{ backgroundColor:"black" , color:"white" , width:"60%" , marginLeft:"20%"}}variant="filled" severity="warning">
              <b>Strategy:<br/>
              For the health and longevity of the protocol, a good strategy is to take 20% profits and then:<br/>
               1) Re-invest a portion of earned PRINTER in PRINTER-BUSD LP in the <StyledLink href="/farms">Farm</StyledLink> to farm more PRINTER! <br/>
               2) Re-invest a portion of earned PRINTER in <StyledLink href="/boardroom">Boardroom</StyledLink> page to farm more CASH!</b>
            </Alert> } */} 
              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    Earn PRINTER by staking LP Tokens
                  </Typography>
                  <Alert style={{ backgroundColor:"black" , color:"white" , width:"30%" , marginLeft:"20%"}}variant="filled" severity="warning">
                  Stake your LPs in the farms below to earn PRINTER
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
                   <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '100px' }}>
                    Genesis Pool Has ended, you can withdraw your funds
                  </Typography> 
{/*                   <Alert style={{ backgroundColor:"black" , color:"white" , width:"44%" , marginLeft:"20%"}}variant="filled" severity="warning">
                    Genesis staking is open! The genesis pools are subject to a 1% Deposit FEE !
                  </Alert> */}
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
                    Whitelist pools will end soon please make sure to unstake from below pools and restake in the pools above to continue to earn Cash
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
