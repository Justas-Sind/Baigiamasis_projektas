import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';
import HomePage from './components/HomePage/HomePage';
import Page404 from './components/Page404/Page404';
import Footer from './components/Footer/Footer';
import QuestionsPage from './components/QuestionsPage/QuestionsPage';

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
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="*" element={<Page404 />}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
