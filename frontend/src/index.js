import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
// import './index.css';
import App11 from './App11';
// eslint-disable-next-line import/no-webpack-loader-syntax
require('file-loader?name=[name].[ext]!./index1.html')

ReactDOM.render(
  <React.StrictMode>
    <App11/>
  </React.StrictMode>,
  document.getElementById('root'),
);
