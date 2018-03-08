import * as React from 'react';
import { NavMenu } from './NavMenu';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { User } from 'oidc-client';

export default class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}