import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import allReducers from './reducers/index';
import { createStore } from 'redux';
import { CookiesProvider } from 'react-cookie';
import { QueryParamProvider } from 'use-query-params';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <App />
        </QueryParamProvider>
      </Router>
    </Provider>
  </CookiesProvider>

  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
