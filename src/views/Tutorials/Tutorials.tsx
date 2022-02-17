import React, {useCallback, useMemo} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';

import daoImg from '../../assets/img/3.jpg';
import { Grid , Box, Container, Card, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import asgard from '../../assets/img/asgard.jpg';
import hermes from '../../assets/img/hermes.png';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${daoImg}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
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
}));

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const classes = useStyles();


  return (
    <Switch>
      <Page>
      <BackgroundImage />
      <Container>   
        <Grid item xs={12} md={12} lg={12} >     
          <Typography color="textPrimary" align="center" variant="h3" gutterBottom style={{ marginBottom: '40px' }}>
              Tutorials
          </Typography>
                <p style={{textAlign:'center', color: '#fff' }}>Degen Finance Tutorials</p>           
              </Grid>

        <Grid container justify="center" spacing={3} style={{}}>
          <Grid item xs={12} sm={12} lg={6} >  
            <Card style={{padding:'30px'}}>
                  <a href='#' target='_blank'><h2 style={{textAlign:'center'}}>1</h2></a>

            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>  
          <Card style={{padding:'30px'}}>
                  <a href='#' target='_blank'><h2 style={{textAlign:'center'}}>2</h2></a>
           
            </Card>
          </Grid>
                   
        </Grid>
      </Container>
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
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
