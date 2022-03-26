import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as TP } from '@material-ui/core/styles';
import { ThemeProvider as TP1 } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import usePromptNetwork from './hooks/useNetworkPrompt';
import BanksProvider from './contexts/Banks';
import TombFinanceProvider from './contexts/TombFinanceProvider';
import ModalsProvider from './contexts/Modals';
import store from './state';
import theme from './theme';
import newTheme from './newTheme';
import config from './config';
import Updaters from './state/Updaters';
import Loader from './components/Loader';
import Popups from './components/Popups';
import Regulations from './views/Regulations/Regulations';
import { RefreshContextProvider } from './contexts/RefreshContext';
import RebatesStrategy from './views/RebatesStrategy';

const Home = lazy(() => import('./views/Home'));
const Farms = lazy(() => import('./views/Cemetery'));
const Node = lazy(() => import('./views/Node'));
const Boardroom = lazy(() => import('./views/Masonry'));
const Rebates = lazy(() => import('./views/Rebates'));
const rebatesStrategy = lazy(() => import('./views/RebatesStrategy'));
const Bonds = lazy(() => import('./views/Pit'));
const Treasury = lazy(() => import('./views/Treasury'));
const Strategy = lazy(() => import('./views/Strategy'));
const Roadmap = lazy(() => import('./views/Roadmap'));
const AboutUs = lazy(() => import('./views/AboutUs'));
const Whitelist = lazy(() => import('./views/Whitelist'));
const Raffle = lazy(() => import('./views/Raffle'));

// const SBS = lazy(() => import('./views/Sbs'));
// const Liquidity = lazy(() => import('./views/Liquidity'));

const NoMatch = () => (
  <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    URL Not Found. <a href="/">Go back home.</a>
  </h3>
);

const App: React.FC = () => {
  // Clear localStorage for mobile users
  if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
    localStorage.clear();
    localStorage.setItem('connectorId', '');
    localStorage.setItem('version_app', '1.1');
  }

  usePromptNetwork();

  return (
    <Providers>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/node">
              <Farms />
            </Route>
            <Route path="/boardroom">
              <Boardroom />
            </Route>
            <Route path="/rebates">
              <Rebates />
              </Route>
            <Route path="/rebatesStrategy">
              <RebatesStrategy />
            </Route>
            <Route path="/bonds">
              <Bonds />
            </Route>
            <Route path="/treasury">
              <Treasury />
            </Route>
            <Route path="/roadmap">
              <Roadmap />
            </Route>
            <Route path="/strategy">
              <Strategy />
            </Route>
            <Route path="/aboutUs">
              <AboutUs />
            </Route>
            <Route path="/whitelist">
              <Whitelist />
            </Route>
            <Route path="/raffle">
              <Raffle />
            </Route> 
            {/* <Route path="/sbs">
              <SBS />
            </Route>
            <Route path="/regulations">
              <Regulations />
            </Route>
            <Route path="/liquidity">
              <Liquidity />
            </Route> */}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
          chainId={config.chainId}
          connectors={{
            walletconnect: { rpcUrl: config.defaultProvider },
            walletlink: {
              url: config.defaultProvider,
              appName: 'Brr Finance',
              appLogoUrl: 'https://github.com/2omb/cash-frontend/blob/8ab3b1f5ecc7d5dad5b856f160d6e7afb8357560/src/assets/img/TOMB-TSHARES.png',
            },
          }}
        >
          <Provider store={store}>
            <Updaters />
            <RefreshContextProvider>
              <TombFinanceProvider>
                <ModalsProvider>
                  <BanksProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </BanksProvider>
                </ModalsProvider>
              </TombFinanceProvider>
            </RefreshContextProvider>
          </Provider>
        </UseWalletProvider>
      </TP>
    </TP1>
  );
};

export default App;
