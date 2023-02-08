import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { QuestionProvider } from './contexts/QuestionContext';
import { AnswerProvider } from './contexts/AnswerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <QuestionProvider>
          <AnswerProvider>
            <App />
          </AnswerProvider>
        </QuestionProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
