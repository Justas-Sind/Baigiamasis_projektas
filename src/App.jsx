import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';
import HomePage from './components/HomePage/HomePage';
import Page404 from './components/Page404/Page404';

function App() {
  return (
    <div className='mainLayout'>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
