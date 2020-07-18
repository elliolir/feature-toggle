import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  withOptimizely,
  OptimizelyFeature,
  OptimizelyExperiment,
  OptimizelyVariation
} from '@optimizely/react-sdk'

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

const GlobalHeader: React.FC = (props: any) => {
  const classes = useStyles();

  const trackEvent = (name: string): void => {
    const { optimizely } = props
    optimizely.track(name);
  }

  return isAuthorized ? null : 
    <OptimizelyFeature feature="global_header_feature">
      {(isEnabled, { alt }) => {
        return (
          isEnabled
            ? <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <Link to={Paths.landingPage}>
                    <img
                      className={classes.logoMain}
                      src={logoMain}
                      alt={String(alt)}
                      data-testid="Logo"
                  />
                  </Link>
                </Toolbar>
                <OptimizelyExperiment experiment="nav">
                  <OptimizelyVariation variation="home">
                    <div className={classes.grow} />
                      <Link to={Paths.home} onClick={() => trackEvent('chooseHome')}>Home</Link>
                    <div className={classes.grow} />
                  </OptimizelyVariation>
                  <OptimizelyVariation variation="about">
                    <Link to={Paths.about} onClick={() => trackEvent('chooseAbout')}>About</Link>
                  </OptimizelyVariation>
                </OptimizelyExperiment>
              </AppBar>
            : null
          )
      }
      }
      </OptimizelyFeature>
    ;
};
export default withOptimizely(GlobalHeader);
