import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';

function App() {
  return (
    <div className='mainLayout'>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
