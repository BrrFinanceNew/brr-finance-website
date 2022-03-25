import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import styled from "styled-components";


import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: 'var(--white)',
    'background-color': 'rgba(0,0,0,0)',
    'backdrop-filter': "blur(2px)",
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    backgroundColor: 'var(--accent)'
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: '"Gilroy"',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: 'var(--white)',
    fontSize: '14px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: 'var(--white)',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            <Typography style={{marginRight:"-30%"}} variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              {/* <a className={ classes.brandLink } href="/">2omb Finance</a> */}
              <Link to="/" color="inherit" className={classes.brandLink}>
                Brr Finance
              </Link>
              <a href="https://twitter.com/ApeOClock/status/1492068413266542592"><img src="https://i.imgur.com/G09QuiF.png" width="10%" margin-left="10px" title="source: imgur.com" /></a>
            </Typography>
            <Box style={{marginRight:""}} mr={5}>
              <Link color="color" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/farms" className={classes.link}>
                Farm
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                Boardroom
              </Link>
              <Link color="textPrimary" to="/rebates" className={classes.link}>
                Rebate Treasury
              </Link>
              <Link color="textPrimary" to="/treasury" className={classes.link}>
                Treasury
              </Link>
              <Link color="textPrimary" to="/rebatesStrategy" className={classes.link}>
                Rebate Strategy
              </Link>
              <Link color="textPrimary" to="/raffle" className={classes.link}>
                Raffle
              </Link>
              <Link color="textPrimary" to="/bonds" className={classes.link}>
                cBonds
              </Link>
              <Link color="textPrimary" to="/strategy" className={classes.link}>
                Strategy
              </Link>          
              <a href="https://brr-finance.gitbook.io/brr-finance/" target="_blank" className={classes.link}>
                Docs
              </a>
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Brr Finance
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farm" to="/farms" />
                <ListItemLink primary="Boardroom" to="/boardroom" />
                <ListItemLink primary="cBonds" to="/bonds" />
                <ListItemLink primary="DAO" to="/rebates" />
                <ListItemLink primary="Treasury" to="/treasury" />
                <ListItemLink primary="Raffle" to="/raffle" />
{/*                 <ListItemLink primary="Roadmap" to="/roadmap" />
 */}{/*                 <ListItemLink primary="Raffle" to="/raffle" />
 */}                 {/*<ListItemLink primary="Strategy" to="/tutorials" />*/} 
                {/*<ListItemLink primary="About Us" to="/aboutUs" />*/}                
{/*                 <ListItemLink primary="Whitelist" to="/whitelist" />
 */}{/*                 <ListItem button component="a" href="https://ethereumtowers.com/">
                  <ListItemText>Clubhouse</ListItemText>
                </ListItem> */}
                <ListItem button component="a" href="https://brr-finance.gitbook.io/brr-finance/">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" onOpen={handleDrawerClose} />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
