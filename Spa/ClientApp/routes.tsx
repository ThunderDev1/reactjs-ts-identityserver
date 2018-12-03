import Home from './components/Home';
import Counter from './components/Counter';

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import CallbackPage from './components/CallbackPage';
import { ApplicationState } from './store';

import userManager from './userManager';
import { User } from 'oidc-client';
import Layout from './components/Layout';
import axios from 'axios';
import UserInfo from './components/UserInfo';

type RoutesModuleProps =
    { user: User, isLoadingUser: boolean }
    & RouteComponentProps<{}>
    & { dispatch: any }

class RoutesModule extends React.Component<RoutesModuleProps, {}>{

    render() {

        // wait for user to be loaded, and location is known
        if (this.props.isLoadingUser || !this.props.location) {
            return null;
        }

        // if location is callback page, return only CallbackPage route to allow signin process
        if (this.props.location.pathname == '/callback') {
            return <Route path='/callback' component={CallbackPage} />
        }

        // check if user is signed in
        userManager.getUser().then(user => {
            if (user && !user.expired) {
                // Set the authorization header for axios
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
            }
        });

        let isConnected: boolean = !!this.props.user;

        return (
            <Switch>
                <Layout isConnected={isConnected}>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/user' component={UserInfo} />
                </Layout>
            </Switch>
        )
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
        user: state.oidc.user,
        isLoadingUser: state.oidc.isLoadingUser,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesModule);