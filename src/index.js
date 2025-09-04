import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./states/store";
import Alert from './components/Alert';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Alert />
      <App />
    </React.StrictMode>
  </Provider>
);