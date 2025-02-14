import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/AuthService";
import taskManagerLogo from '/logo.png'

function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <Link to="/">
        <div className="flex items-center">
          <img src={taskManagerLogo} alt="Task Manager Logo" className="logo h-10 w-10 mr-3" />
          <h2 className="text-xl font-bold">Task Manager</h2>
        </div>
      </Link>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md">Logout</button>
        ) : (
          <>
            <Link to="/register" className="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded-md">Register</Link>
            <Link to="/login" className="px-4 py-2 bg-orange-400 hover:bg-orange-600 rounded-md">Login</Link>
          </>
        )}
        
      </div>
    </nav>
  )
}

export default NavBar;