import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";
import AuthContext from './Context/AuthContext';
import Cart from './Context/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <Cart>
        <Router>
          <App />
        </Router>
      </Cart>
    </AuthContext>
  </React.StrictMode>
);