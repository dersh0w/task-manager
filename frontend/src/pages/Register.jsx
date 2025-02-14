import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";
import NavBar from "../components/NavBar";

function RegisterUser() {
  const [userRegister, setUserRegister] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await registerUser(userRegister);
      if(data.status === "fail" || data.status === "error") {
        setError(data.message || "Something went wrong");
      } else {
        navigate("/dashboard"); // Redirect after registration
        window.location.reload(false);
      }
    } catch(err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Crie sua conta!</h1>
          {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
          
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John Doe"
                value={userRegister.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="johndoe@email.com"
                value={userRegister.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="••••••••"
                value={userRegister.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              Criar Conta
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Já tem uma conta? <a href="/login" className="text-blue-600 hover:underline">Faça o login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;