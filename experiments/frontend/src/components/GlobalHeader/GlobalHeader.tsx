import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logoMain from 'themes/ecarsense/images/img-logo.svg';
import Paths from 'paths';

const isAuthorized = process.env.REACT_APP_IS_AUTHORIZED;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    zIndex: 1100,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  logoLink: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  logoMain: {
    [theme.breakpoints.down('xs')]: {
      height: '1.5rem',
    },
  },
}));

const GlobalHeader: React.FC = () => {
  const classes = useStyles();

  return !isAuthorized ? null : (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to={Paths.landingPage}>
          <img
            className={classes.logoMain}
            src={logoMain}
            alt="eCarSense"
            data-testid="Logo"
          />
        </Link>
        <div className={classes.grow} />
        <Link to={Paths.home}>Home</Link>
        <div className={classes.grow} />
        <Link to={Paths.about}>About</Link>
      </Toolbar>
    </AppBar>
  );
};
export default GlobalHeader;
