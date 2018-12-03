import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Button, Table, Segment, Header, Grid, Form } from 'semantic-ui-react';
import { User } from 'oidc-client';

type UserInfoProps = { user: User } & RouteComponentProps<{}>;

class UserInfo extends React.Component<UserInfoProps, {}> {

  renderRow(propertyName: string, object: Object) {
    return <Table.Row>
      <Table.Cell>{propertyName}</Table.Cell>
      <Table.Cell >{object[propertyName]}</Table.Cell>
    </Table.Row>
  }

  public render() {

    if (this.props.user) {
      return (<React.Fragment>

        <Header as='h3' color="grey">Oidc</Header>
        <Grid celled>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>access_token</Grid.Column>
            <Grid.Column width={13}>
              <div style={{ wordWrap: 'break-word', textAlign: 'left' }}>{this.props.user.access_token}</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>expires_at</Grid.Column>
            <Grid.Column width={13}>{this.props.user.expires_at}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>scope</Grid.Column>
            <Grid.Column width={13}>{this.props.user.scope}</Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>token_type</Grid.Column>
            <Grid.Column width={13}>{this.props.user.token_type}</Grid.Column>
          </Grid.Row>
        </Grid>

        <Header as='h3' color="grey">Profile</Header>
        <Table inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Property</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRow("auth_time", this.props.user.profile)}
            {this.renderRow("idp", this.props.user.profile)}
            {this.renderRow("name", this.props.user.profile)}
            {this.renderRow("preferred_username", this.props.user.profile)}
            {this.renderRow("sid", this.props.user.profile)}
            {this.renderRow("sub", this.props.user.profile)}
          </Table.Body>
        </Table>
      </React.Fragment>);
    } else {
      return <div>Please log in to display user info</div>
    }
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps, null)(UserInfo);