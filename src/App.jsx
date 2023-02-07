import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpPage from './components/SignUpPage/SignUpPage';

function App() {
  return (
    <div className='mainLayout'>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
