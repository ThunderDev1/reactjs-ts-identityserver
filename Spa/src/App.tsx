import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {FunctionComponent, ReactElement} from 'react';
// import {HashRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {ConnectedRouter} from 'connected-react-router';
import {createHashHistory} from 'history';

const history = createHashHistory();
const store = configureStore(history);

const App: FunctionComponent<{}> = (): ReactElement => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Routes />
      </React.Fragment>
    </ConnectedRouter>
  </Provider>
);

export default hot(App);
