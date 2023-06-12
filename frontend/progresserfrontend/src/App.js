import './App.css';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Boards from "./components/Views/Boards";
import BoardDetail from "./components/Views/BoardDetail";
import AddTask from "./components/Views/AddTask";
import AddBoard from "./components/Views/AddBoard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/addBoard" element={<AddBoard />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
