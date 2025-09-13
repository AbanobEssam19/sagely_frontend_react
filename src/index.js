import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import { Provider } from 'react-redux';
import store from "./states/store";
import Alert from './components/Alert/Alert.jsx';

import './assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Alert />
      <App />
    </React.StrictMode>
  </Provider>
);