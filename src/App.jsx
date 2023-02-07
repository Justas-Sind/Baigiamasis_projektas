import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='mainLayout'>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>

        </Routes>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
