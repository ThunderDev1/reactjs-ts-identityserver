import Home from './components/Home';
import Counter from './components/Counter';

import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import CallbackPage from './components/CallbackPage';
import {AppState} from './store';

import userManager from './userManager';
import {User} from 'oidc-client';
import axios from 'axios';
import UserInfo from './components/UserInfo';
import {Dispatch} from 'redux';
import Contact from './components/Contact';
import Nav from './components/Nav';

interface RoutesModuleProps {
  user: User;
  isLoadingUser: boolean;
  dispatch: Dispatch;
  location: any;
}

const Routes = (props: RoutesModuleProps) => {
  console.log(props);

  // wait for user to be loaded, and location is known
  if (props.isLoadingUser || !props.location) {
    return <div>Loading...</div>;
  }

  // check if user is signed in
  userManager.getUser().then(user => {
    if (user && !user.expired) {
      // Set the authorization header for axios
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
    }
  });

  const isConnected: boolean = !!props.user;

  return (
    <React.Fragment>
      <Nav isConnected={isConnected} path={props.location.pathname} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/callback" component={CallbackPage} />
        <Route path="/counter" component={Counter} />
        <Route path="/user" component={UserInfo} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </React.Fragment>
  );
};

function mapStateToProps(state: AppState) {
  return {
    user: state.oidc.user,
    isLoadingUser: state.oidc.isLoadingUser,
    location: state.router.location,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
