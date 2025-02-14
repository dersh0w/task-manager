import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";
import { deleteTask } from "../services/api";


function TaskList({ tasks, updateTaskInList }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  }

  const handleDeleteTask = async (taskId) => {
    if(!window.confirm("Tem certeza que deseja deletar esta task?")) return;

    try {
      const response = await deleteTask(taskId);
      if(response.data.status === "fail" || response.data.status === "error") {
        throw new Error("Erro ao deletar task.");
      }
      updateTaskInList(tasks.filter((task) => task.id !== taskId))
    } catch(err) {
      throw new Error("Error: " + err);
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="px-6 py-3 ">ID</th>
              <th className="px-6 py-3 ">Título</th>
              <th className="px-6 py-3 ">Status</th>
              <th className="px-6 py-3 ">Criada em</th>
              <th className="px-6 py-3 ">#</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{task.id}</th>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.status}</td>
                  <td className="px-6 py-4">{new Date(task.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/tasks/${task.id}`)}
                    >
                      Detalhes
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => handleEditClick(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Nenhuma tarefa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {editModalOpen && (
          <EditTaskModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} task={selectedTask} updateTaskInList={updateTaskInList} />
        )}
      </div>
    </>
  )
}

export default TaskList;