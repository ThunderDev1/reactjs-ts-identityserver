import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppState} from '../store';
import {User} from 'oidc-client';
import {FunctionComponent, ReactElement} from 'react';

type UserInfoProps = {user: User} & RouteComponentProps<{}>;

const UserInfo: FunctionComponent<UserInfoProps> = (props: UserInfoProps): ReactElement => {
  if (!props.user) {
    return (
      <div className="empty">
        <div className="empty-icon">
          <i className="icon icon-people" />
        </div>
        <p className="empty-title h5">Please login to view user information</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>User information</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>token_type</td>
            <td>{props.user.token_type}</td>
          </tr>
          <tr>
            <td>access_token</td>
            <td>{props.user.access_token}</td>
          </tr>
          <tr>
            <td>expires_at</td>
            <td>{props.user.expires_at}</td>
          </tr>
          <tr>
            <td>scope</td>
            <td>{props.user.scope}</td>
          </tr>
          {Object.keys(props.user.profile).map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>{props.user.profile[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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
