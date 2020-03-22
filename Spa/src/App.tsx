import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {FunctionComponent, ReactElement} from 'react';
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore, { history } from './configureStore';
import {ConnectedRouter} from 'connected-react-router';
import 'spectre.css/dist/spectre.min.css';

const store = configureStore();

const App: FunctionComponent<{}> = (): ReactElement => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(App);
