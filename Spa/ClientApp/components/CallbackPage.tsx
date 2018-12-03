import * as React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { push } from 'react-router-redux';
import userManager from './../userManager';

import { RouteComponentProps } from 'react-router';

class CallbackPage extends React.Component<RouteComponentProps<{}> & { dispatch: any }, {}> {

  successCallback = (user: User) => {
    // get the user's previous location, passed during signinRedirect()
    var redirectPath = user.state.path as string;
    this.props.dispatch(push(redirectPath));
  }

  errorCallback = (error: Error) => {
    console.log(error);
    this.props.dispatch(push('/'));
  }

  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallback}
        errorCallback={this.errorCallback}
      >
        <div>Loading...</div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);
