import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {User} from 'oidc-client';
import {FunctionComponent, ReactElement} from 'react';

type UserInfoProps = {user: User} & RouteComponentProps<{}>;

const UserInfo: FunctionComponent<UserInfoProps> = (props: UserInfoProps): ReactElement => {
  if (props.user) {
    return <React.Fragment>{JSON.stringify(props.user)}</React.Fragment>;
  } else {
    return <div>Please log in to display user info</div>;
  }
};

function mapStateToProps(state: AppState) {
  return {
    user: state.oidc.user,
  };
}

export default connect(
  mapStateToProps,
  null
)(UserInfo);
