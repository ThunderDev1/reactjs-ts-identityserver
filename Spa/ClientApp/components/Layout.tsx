import * as React from 'react';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { User } from 'oidc-client';
import userManager from './../userManager';

import { Button, Container, Menu, Responsive, Segment, Visibility, } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

interface LayoutProps {
  isConnected: boolean;
}

export default class Layout extends React.Component<LayoutProps, {}> {

  logout = (event: any) => {
    event.preventDefault();
    userManager.signoutRedirect();
    userManager.removeUser();
  }

  login() {
    // pass the current path to redirect to the correct page after successfull login
    userManager.signinRedirect({
      data: { path: window.location.pathname }
    });
  }

  renderStarButton() {
    return <span style={{ marginLeft: '1.5em' }}>
      <a className="github-button"
        href="https://github.com/ThunderDev1/reactjs-ts-identityserver"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star ThunderDev1/reactjs-ts-identityserver on GitHub">Star</a>
    </span>;
  }

  renderPublicMenu() {
    return (
      <Menu inverted pointing secondary size='large'>
        <Container>
          <Menu.Item as={NavLink} to="/" exact>Home</Menu.Item>
          <Menu.Item as={NavLink} to="/counter">Counter</Menu.Item>
          <Menu.Item position='right' >
            <Button as='a' inverted onClick={() => this.login()}>Log in</Button>
            {this.renderStarButton()}
          </Menu.Item>
        </Container>
      </Menu>);
  }

  renderAuthMenu() {
    return (
      <Menu inverted pointing secondary size='large'>
        <Container>
          <Menu.Item as={NavLink} to="/" exact>Home</Menu.Item>
          <Menu.Item as={NavLink} to="/user">User info</Menu.Item>
          <Menu.Item as={NavLink} to="/counter">Counter</Menu.Item>
          <Menu.Item position='right' >
            <Button as='a' inverted onClick={(event) => this.logout(event)}>Log out</Button>
            {this.renderStarButton()}
          </Menu.Item>
        </Container>
      </Menu>);
  }

  render() {
    return (
      <Segment
        inverted vertical textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
      >
        {this.props.isConnected ? this.renderAuthMenu() : this.renderPublicMenu()}
        <Container>
          {this.props.children}
        </Container>
      </Segment >
    )
  }
}
