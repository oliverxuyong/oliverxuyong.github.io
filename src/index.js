import React, { StrictMode } from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDom.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
