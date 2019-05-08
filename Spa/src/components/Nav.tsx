import * as React from 'react';
import userManager from '../userManager';
import {Link} from 'react-router-dom';
import GitHubButton from 'react-github-btn';

interface NavProps {
  isConnected: boolean;
  path: string;
}

const Nav = (props: NavProps) => {
  const logout = (event: any) => {
    event.preventDefault();
    userManager.signoutRedirect();
    userManager.removeUser();
  };

  const login = () => {
    // pass the current path to redirect to the correct page after successfull login
    userManager.signinRedirect({
      data: {path: props.path},
    });
  };

  return (
    <header className="navbar">
      <section className="navbar-section">
        <Link to="/" className="btn btn-link">
          Home
        </Link>
        <Link to="/counter" className="btn btn-link">
          Counter
        </Link>
        <Link to="/user" className="btn btn-link">
          User
        </Link>
        {props.isConnected ? (
          <button className="btn btn-default btn-sm" onClick={event => logout(event)}>
            Logout
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => login()}>
            Login
          </button>
        )}
      </section>
      <section className="navbar-center">
        <a href="#" className="navbar-brand mr-2">
          <b>react-ts-identityserver</b>
        </a>
      </section>
      <section className="navbar-section mx-2">
        <GitHubButton
          data-size="large"
          data-icon="octicon-star"
          data-show-count
          href="https://github.com/ThunderDev1/reactjs-ts-identityserver">
          Star
        </GitHubButton>
      </section>
    </header>
  );
};

export default Nav;
