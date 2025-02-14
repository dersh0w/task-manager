import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
        <p className="text-lg text-gray-600 max-w-lg">
          Organize your tasks efficiently and stay productive. Manage your daily activities with ease.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-3 border border-gray-600 text-gray-800 rounded-lg bg-gray-600 hover:bg-gray-200">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;