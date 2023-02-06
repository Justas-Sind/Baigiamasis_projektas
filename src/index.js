import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { QuestionProvider } from './contexts/QuestionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QuestionProvider>
          <App />
        </QuestionProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
