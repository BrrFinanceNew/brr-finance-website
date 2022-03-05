import React, {useCallback, useMemo, useEffect} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import HomeImage from '../../assets/img/1.jpg';
import styled from 'styled-components';

import useWhitelist from '../../hooks/useWhitelist';

import { Box, Container, Card, CardContent, Typography, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import LaunchCountdown from '../../components/LaunchCountdown';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #ccc;
  }
`;


const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    height: '1.3rem',
    fontFamily: 'superstar',
      [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline',
    marginLeft: '20px',
  },

  img: {
    width: '24px',
    height: '24px',
  },
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    }},
}));

const Bond: React.FC = () => {
  const {account} = useWallet();

  const checkWhitelist = useWhitelist(account);
  
  const userBals = useMemo(
    () => (checkWhitelist ? checkWhitelist.whitelist : 'checking your address please wait...'),
    [checkWhitelist],
  );

  return (   
<Switch>
<Page>
  <BackgroundImage />
  {!!account ? (
    <>
    
     <Grid item xs={12} md={12} lg={12} >     
     <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Cash Whitelist Checker
              </Typography>
        
        
      </Grid>
     {/* <LaunchCountdown deadline={date} description={'Raffle closes in'} descriptionLink={''}></LaunchCountdown>*/}

    <Grid container justify="center" spacing={3} style={{marginTop: '10px'}}>
      <Grid item xs={12} sm={12} lg={12}>  
            <Card>
              <h2 style={{textAlign:'center', marginTop: '10px' }}></h2>
              <p style={{fontSize: '20px', textAlign:'center', color: '#fff' }}>Your account: {account}</p>
              <p style={{fontSize: '20px', textAlign:'center', color: '#fff' }}>{userBals}</p>
            </Card>
          </Grid>
      </Grid>

    </>
  ) : (
    <UnlockWallet />
  )}
</Page>
</Switch>
  );
};

const StylecBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
