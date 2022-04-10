import {Grid} from '@material-ui/core';
import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import HomeImage from '../../assets/img/3.jpg';
import Page from '../../components/Page';
import CashNode from '../CashNode';
import CashCard from './CashCard';
import { createGlobalStyle } from 'styled-components';
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

const CashNodes = () => {
  const {path} = useRouteMatch();
  return (
    <Page>
      <BackgroundImage />
      <Switch>
        <Route exact path={path}>
          <h2 style={{fontSize: '80px', textAlign: 'center'}}>NODES</h2>
          <Grid container spacing={3} style={{marginTop: '20px'}}>
            <CashCard />
          </Grid>
        </Route>
        <Route path={`${path}/:bankId`}>
          <CashNode />
        </Route>
      </Switch>
    </Page>
  );
};

export default CashNodes;
