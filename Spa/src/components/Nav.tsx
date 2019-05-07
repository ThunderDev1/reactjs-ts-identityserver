import * as React from 'react';
import {Link} from 'react-router-dom';
import userManager from '../userManager';

interface NavProps {
  isConnected: boolean;
}

const Nav = (props: NavProps) => {
  const logout = (event: any) => {
    event.preventDefault();
    userManager.signoutRedirect();
    userManager.removeUser();
  }

  const login = () => {
    // pass the current path to redirect to the correct page after successfull login
    userManager.signinRedirect({
      data: { path: window.location.pathname }
    });
  }

  if(!props.isConnected){
    return <button onClick={() => login()}>Log in</button>
  }
  
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
      <button onClick={(event) => logout(event)}>Log out</button>
    </nav>
  );
};

export default Nav;
