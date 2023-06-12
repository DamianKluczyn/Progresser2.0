import './App.css';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Boards from "./components/Views/Boards";

function App() {
  return (
    <div className="App">
      <h1>Progresser App</h1>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
            <Route path="/boards" element={<Boards />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
