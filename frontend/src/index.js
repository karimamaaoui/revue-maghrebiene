import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js';
import './i18n'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Suspense fallback="loading">

      <App />
      </Suspense>,

    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
