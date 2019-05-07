import * as React from 'react';
import {connect} from 'react-redux';
import {User} from 'oidc-client';
import {push} from 'connected-react-router';
import userManager from './../userManager';
import {Dispatch} from 'redux';
import {useEffect} from 'react';

interface CallbackPageProps {
  dispatch: Dispatch;
  signInParams: string;
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

  // by default userManager gets params from the current route
  // eg. 'localhost:5100/callback#token_id=...&session_state=...
  //                              ------------------------------
  // this doesn't work when using hash history as the first hash messed up the process
  // eg. 'localhost:5100/#/callback#token_id=...&session_state=...
  // need to pass the token manually to signinRedirectCallback function
  useEffect(() => {
    userManager
      .signinRedirectCallback(props.signInParams)
      .then(user => successCallback(user))
      .catch(error => errorCallback(error));
  });

  return <div>Loading...</div>;
};

export default connect()(CallbackPage);
