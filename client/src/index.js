import React from 'react';
import ReactDOM from 'react-dom/client';
import { MetaMaskProvider } from "metamask-react";
import './index.css';
import App from './App';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
