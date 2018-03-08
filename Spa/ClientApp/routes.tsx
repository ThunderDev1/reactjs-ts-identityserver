import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';

import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import CallbackPage from './components/CallbackPage';
import { ApplicationState, AppThunkAction } from './store';

import userManager from './userManager';
import { User } from 'oidc-client';
import Layout from './components/Layout';
import axios from 'axios';

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
            if (!user || user.expired) {
                // if no user found, or token has expired, auto redirect to identity server signin page
                // pass the current path to redirect to the correct page after successfull login
                userManager.signinRedirect({ data: { path: window.location.pathname } });
                return null;

                // currently, if the user is not authenticated, he can't access any pages
                // you could however comment the two lines above and instead 
                // return routes that do not require authentication ("public pages")
                // you would have a signin button somewhere that calls the signinRedirect() method
            }else{
                // I'm using axios for api calls
                // this sets the authorization header and base url that will be used for every api call
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
                axios.defaults.baseURL = 'http://localhost:5200/api';
            }
        });

        // wait for userManager to load the user
        if (!this.props.user)
            return null;

        // user is signed in, return all your routes
        return (
            <Switch>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
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