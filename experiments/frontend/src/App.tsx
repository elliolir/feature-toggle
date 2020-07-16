import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import FeatureToggleRoute from 'common/FeatureToggleRoute';

import LandingPage from 'pages/LandingPage/LandingPage';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import PageNotFound from 'pages/PageNotFound/PageNotFound';

import GlobalHeader from 'components/GlobalHeader/GlobalHeader';

import './App.css';

const isAuthorized = process.env.REACT_APP_IS_AUTHORIZED;

function App() {
  const PrivateRoute = ({ component: Component, ...rest }: any) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthorized ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
        }
      />
    );
  };

  return (
    <div className="App">
      <Router>
        <GlobalHeader />
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <FeatureToggleRoute exact path="/home" component={Home} feature="home_route" />
            <FeatureToggleRoute
              exact
              path="/about"
              component={() => <PrivateRoute exact path="/about" component={About} />}
              feature="about_route"
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
