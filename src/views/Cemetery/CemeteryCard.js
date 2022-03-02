import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';

const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined" style={{ border: '1px solid var(--white)' }}>
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'transparent',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >

               {bank.depositToken.symbol === 'USDC' ? <TokenSymbol size={55} symbol={bank.depositToken.symbol} /> : <TokenSymbol size={70} symbol={bank.depositToken.symbol} />}     
                  
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography variant="h6" component="h2">
            {bank.whitelist == 'No' || bank.whitelist == 'Yes' ? <Typography variant="h6" component="h2"> Whitelist Only: {bank.whitelist}</Typography> : <Typography variant="h6" component="h2"> {bank.whitelist}</Typography>}
            <Typography color="textSecondary">
              Deposit Fee: {bank.info}
            </Typography>
            <Typography color="textSecondary">
     
              {/*Deposit {bank.depositTokenName.toUpperCase()}*/} Earn {` ${bank.earnTokenName}`}
            </Typography>
            <Typography color="#322f32">
              {/* {bank.name} */}
              Daily APR: {bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%
            </Typography>
            <Typography color="#322f32">
              {/* {bank.name} */}
              Yearly APR: {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%
            </Typography>
{/*             <Typography color="textSecondary">
              Multiplier: {bank.multiplier}
            </Typography> */}

            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
{/*         <Button color="primary" size="small" variant="contained" target="_blank" href={`${bank.site}`}>
          ↗
        </Button> */}
        <Button color="primary" size="small" variant="contained" target="_blank" href={`${bank.buyLink}`}>
            Buy
          </Button>
          <Button color="primary" size="small" variant="contained" component={Link} to={`/farms/${bank.contract}`}>
            Stake
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
