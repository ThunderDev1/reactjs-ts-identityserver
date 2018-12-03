import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancer, Store, StoreEnhancerStoreCreator, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as oidcReducer } from 'redux-oidc';
import createOidcMiddleware from 'redux-oidc';
import userManager from './userManager';
import * as StoreModule from './store';
import { ApplicationState, reducers } from './store';
import { History } from 'history';
import logger from 'redux-logger';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => StoreEnhancer;

    userManager.events.addSilentRenewError(function (error) {
        console.error('error while renewing the access token', error);
    });

    const oidcMiddleware = createOidcMiddleware(userManager);

    const createStoreWithMiddleware = compose<StoreEnhancerStoreCreator<any>>(
        applyMiddleware(oidcMiddleware, thunk, routerMiddleware(history), logger),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof StoreModule>('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

// function buildRootReducer(allReducers: ReducersMapObject) {
//     return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer, oidc: oidcReducer }));
// }

function buildRootReducer(allReducers: any) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer, oidc: oidcReducer }));
}