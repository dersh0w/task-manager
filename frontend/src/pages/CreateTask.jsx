import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { createTask } from "../services/api";

function CreateTask() {
  const [taskData, setTaskData] = useState({ title: "", description: "", status: "em progresso"});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!taskData.title.trim()) {
      setError("Título é necessário!");
      return;
    }

    try {
      const response = await createTask(taskData);
      if(response.status === "fail" || response.status === "error") {
        setError(response.message);
      } else {
        alert("Task criada com sucesso!");
        navigate("/dashboard"); // Redirect after creating the task
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-300">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">Criar Nova Task</h1>
          
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Digite o título da task"
                value={taskData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">Descrição:</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Adicione uma descrição"
                value={taskData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-gray-900 mb-2">Status:</legend>
              <div className="flex flex-col space-y-2 text-gray-900">
                {["em progresso", "pendente", "concluída"].map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={taskData.status === status}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              Criar Task
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/dashboard" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTask;