import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getTask } from "../services/api";

function Task() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => async () => {
    try {
      const response = await getTask(taskId);
      if(response.status === "fail" || response.status === "error") {
        return setError(response.message);
      }
      setTask(response.data.task);
    } catch(err) {
      setError(err.message);
    }
  }, [taskId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(",", "");
  };

  return (
    <>
      <NavBar />
      
      { error ? (
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold">{error}</h2>
          <button onClick={() => navigate("/dashboard")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            voltar
          </button>
        </div>
      ) : task ? (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-gray-900">
          <h2 className="text-2xl font-bold mb-4">Task [{task.id}]</h2>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Descrição:</strong> {task.description || "Sem descrição."}</p>
          <p>
            <strong>Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded-full text-white ${(task.status === "concluída") ? "bg-green-500" : ((task.status === "pendente") ? "bg-red-500" : "bg-yellow-500")}`}>
              {task.status.toUpperCase()}
            </span>
          </p>
          <p><strong>Criada em:</strong> {formatDate(task.createdAt)}</p>
          <p><strong>Atualizada em:</strong> {formatDate(task.updatedAt)}</p>
          <div className="mt-4">
            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading task details...</p>
      )}
    </>
  )
}

export default Task;