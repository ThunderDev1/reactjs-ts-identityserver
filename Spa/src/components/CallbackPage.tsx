import * as React from 'react';
import {connect} from 'react-redux';
import {User} from 'oidc-client';
import {push} from 'connected-react-router';
import userManager from './../userManager';
import {Dispatch} from 'redux';
import {useEffect} from 'react';

interface CallbackPageProps {
  dispatch: Dispatch;
}

const CallbackPage = (props: CallbackPageProps) => {
  const successCallback = (user: User) => {
    // get the user's previous location, passed during signinRedirect()
    var redirectPath = user.state.path as string;
    props.dispatch(push(redirectPath));
  };

  const errorCallback = (error: Error) => {
    console.log(error);
    props.dispatch(push('/'));
  };

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(user => successCallback(user))
      .catch(error => errorCallback(error));
  });

  return <div>Loading...</div>;
};

export default connect()(CallbackPage);
