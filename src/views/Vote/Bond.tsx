import React, {useCallback, useMemo, useEffect} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import HomeImage from '../../assets/img/1.jpg';
import useRaffleStats from '../../hooks/useRaffleBalance';
import useTombFinance from '../../hooks/useTombFinance';

import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import { Alert } from '@material-ui/lab';
import {ReactComponent as IconTelegram} from '../../assets/img/telegram.svg';
import {ReactComponent as IconDiscord} from '../../assets/img/discord.svg';

import { Box, Container, Card, CardContent, Typography, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { Stats } from 'fs';
import LaunchCountdown from '../../components/LaunchCountdown';

const BackgroundImage = createGlobalStyle`
body {
  background: url(${HomeImage}) no-repeat !important;
  background-size: cover !important;
  background-color: var(--black);
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
  const startDate = new Date('2022-4-14 09:00:00Z');
  const endDate = new Date('2022-4-17 18:00:00Z');
  const raffleAddressYes = '0x566f9ED49C7bCE33073603370B8c9F8Fb1F5C7f5';
  const raffleAddressNo = '0xe3C82e9c682A4a858C7E23B683b37a9A9a179acF';
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const classes = useStyles();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const raffleStats = useRaffleStats(account, raffleAddressYes);
  const RaffleStatsNo = useRaffleStats(account, raffleAddressNo);


  const startTime = Number(startDate); 
  const endTime = Number(endDate); 

  
  const raffleBalsYes = useMemo(
    () => (raffleStats ? Number(raffleStats.totalSupply).toFixed(0) : null),
    [raffleStats],
  );

  const raffleBalsNo = useMemo(
    () => (RaffleStatsNo ? Number(RaffleStatsNo.totalSupply).toFixed(0) : null),
    [RaffleStatsNo],
  );

  const userBalsYes = useMemo(
    () => (raffleStats ? Number(raffleStats.priceInDollars).toFixed(0) : null),
    [raffleStats],
  );

  const userBalsNo = useMemo(
    () => (RaffleStatsNo ? Number(RaffleStatsNo.priceInDollars).toFixed(0) : null),
    [RaffleStatsNo],
  );

  const handleBuyBonds = useCallback( 
    async (amount: string) => { 
      const tx = await tombFinance.sendDollar(amount, raffleAddressYes);
        addTransaction(tx, {
          summary: `Send ${Number(amount).toFixed(2)} CASH to the yes vote ${amount} `,
        });
    
    },
    [tombFinance, addTransaction],
  );

  const handleNoBonds = useCallback( 
    async (amount: string) => { 
      const tx = await tombFinance.sendDollar(amount, raffleAddressNo);
        addTransaction(tx, {
          summary: `Send ${Number(amount).toFixed(2)} CASH to the no vote ${amount} `,
        });
    
    },
    [tombFinance, addTransaction],
  );

  return (   
<Switch>
<Page>
  <BackgroundImage />
  {!!account ? (
    <>
    
     <Grid item xs={12} md={12} lg={12} >     
        <h2 style={{ fontSize: '80px', textAlign:'center', color: '#fff' }}>Community Vote</h2>   

      <Grid container justify="center" spacing={3} style={{margin: '10px'}}>      
      {Date.now() < startTime ? <LaunchCountdown deadline={startDate} description={'Vote Starts In'} descriptionLink={''}></LaunchCountdown> : <LaunchCountdown deadline={endDate} description={'Vote Closes In'} descriptionLink={''}></LaunchCountdown>}
      </Grid>
          <Card style={{padding: '20px'}}>
          <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>Brr Finance vote #001 <br/>
Petition to the Circus
Dear Brr Finance community.<br/><br/> This first vote proposition is actually coming from the Brr Finance dev team itself. We would like to have community input on it: a vote on yes or no.<br/><br/>
After deliberation, we see we have done and achieved the following: $35k spent on initial marketing, a Dao King YouTube interview, a rebate treasury, a cash burning voting system, a nodes system, some doxxed and some KYC team members, a nice and friendly community, an education section, and more. Upcoming in the short run are a more active Twitter account and a Telegram.
What we have not achieved, however, is a big inflow of investors interested in staying with the protocol long term. And ultimately, that is the most important of all.<br/><br/>
We are at a point where we feel it would be wise to petition to the Seigniorage Circus. If they accept us as one of their campaigns, there is a high likelihood that the directional force of their communal investments will bring Brr back up to the skies, where it should be.<br/><br/>
But the Circus does more. If the Circus accepts us, they will probably start directing us to make changes based on their insight. If we say yes to them, we’ll have to accept that they’ll get a say in how we do things. As dev team, we are already okay with that, but since we’ve wanted for Brr to be community directed, we put this to vote.<br/><br/>
For those who don’t know the Seigniorage Circus: https://discord.gg/e4yTGmfaVk</p>                
{/*           <p style={{fontSize: '20px', textAlign:'center', color: '#fff' }}>Raffle address: {raffleAddress}</p>
 */}        </Card>  
      </Grid>
    
    <Grid container justify="center" spacing={3} style={{marginTop: '10px'}}>
        <Grid item xs={12} sm={12} lg={6}>  
            <Card>
              <h2 style={{textAlign:'center', marginTop: '10px' }}>Vote YES</h2>
              <p style={{textAlign:'center'}}>Total Yes Votes: {raffleBalsYes}</p>         
              <p style={{textAlign:'center'}}>Your entries: {userBalsYes}</p>
              <p style={{textAlign:'center'}}>Your account: {account}</p>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>  
            <Card>
              <h2 style={{textAlign:'center', marginTop: '10px' }}>Vote NO</h2>
              <p style={{textAlign:'center'}}>Total No Votes: {raffleBalsNo}</p>         
              <p style={{textAlign:'center'}}>Your entries: {userBalsNo}</p>
              <p style={{textAlign:'center'}}>Your account: {account}</p>
            </Card>
          </Grid>
        <Grid item xs={12} sm={12} lg={6}>  
        <StylecBond>
          <StyledCardWrapper>   
            <ExchangeCard
              action="Enter Voting"
              fromToken={tombFinance.TOMB}
              fromTokenName="CASH"
              toToken={tombFinance.TBOND}
              toTokenName="CBOND"
              priceDesc={
                Date.now() < endTime && Date.now() > startTime
                  ? 'Voting is open! 1 CASH = 1 Entry'
                  : 'Voting is currently closed'
              }
              disabled={Date.now() < endTime && Date.now() > startTime ? false : true}
              onExchange={handleBuyBonds}
            />
          </StyledCardWrapper>
        </StylecBond>
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>  
        <StylecBond>
          <StyledCardWrapper>
            <ExchangeCard
              action="Enter Voting"
              fromToken={tombFinance.TOMB}
              fromTokenName="CASH"
              toToken={tombFinance.TBOND}
              toTokenName="CBOND"
              priceDesc={
                Date.now() < endTime && Date.now() > startTime
                  ? 'Voting is open! 1 CASH = 1 Entry'
                  : 'Voting is currently closed'
              }
              disabled={Date.now() < endTime && Date.now() > startTime ? false : true}
              onExchange={handleNoBonds}
            />
          </StyledCardWrapper>
        </StylecBond>
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
