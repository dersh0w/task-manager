import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { updateTask } from "../services/api";

const EditTaskModal = ({ isOpen, onClose, task, updateTaskInList }) => {
  const [updateTaskData, setUpdateTaskData] = useState({
    title: task.title || "", 
    description: task.description || "", 
    status: task.status || ""
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await updateTask(task.id, updateTaskData);
      console.log(response);
      console.log(JSON.stringify(response));
      console.log(response.data);
      if(response?.data?.status === "fail" || response?.data?.status === "error") {
        setError(response?.data?.message);
      } else {
        updateTaskInList(response.data);  
        onClose();
      }
    } catch (err) {
      setError("Erro ao atualizar task.");
    }

  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div className="fixed inset-0 bg-gray-800/75"></div>

      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96 relative text-gray-900">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold">Editar Task #{task.id}</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
         
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={updateTaskData.title}
              onChange={(e) => setUpdateTaskData({ ...updateTaskData, title: e.target.value })}
              required
            />
          </div>

          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="description"
              rows="3"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={updateTaskData.description}
              onChange={(e) => setUpdateTaskData({ ...updateTaskData, description: e.target.value })}
            />
          </div>

          
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-700">Status</legend>
            {["em progresso", "pendente", "concluída"].map((status) => (
              <label key={status} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={updateTaskData.status === status}
                  onChange={(e) => setUpdateTaskData({ ...updateTaskData, status: e.target.value })}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
              </label>
            ))}
          </fieldset>

          
          {error && <p className="text-red-500 text-sm">{error}</p>}

          
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Salvar
          </button>
        </form>
      </div>
    </Dialog>
  )
}

export default EditTaskModal;