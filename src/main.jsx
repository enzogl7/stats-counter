import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './components/i18n';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
