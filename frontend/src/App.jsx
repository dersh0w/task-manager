import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from './pages/Page404';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask'
import Task from './pages/Task';
import PrivateRoute from './context/PrivateRoute';

//TODO: Dockerizar aplicação
//TODO: Implementar uma search bar
//TODO: Refatorar e otimizar código (tudo)
//TODO: Melhorar a estética
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/create-task" element={<CreateTask />}></Route>
            <Route path="/tasks/:taskId" element={<Task />}></Route>
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
