import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import TaskList from "../components/TaskList";
import { getToken } from "../services/AuthService";
import { getUserTasks } from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = getToken();
        if(!token) {
          navigate("/login");
          return;
        }

        const response = await getUserTasks();
        if(response.data.status === "fail" || response.data.status === "error") {
          throw new Error("Erro ao buscar tasks.");
        }
        setTasks(response.data.data.tasks);
      } catch(err) {
        throw new Error("Error: " + err);
      }
    };
    fetchTasks();
  }, []);

  const updateTaskInList = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Suas Tasks</h1>
          <Link
            to="/create-task"
            className="bg-green-600 hover:bg-green-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
          >
            Nova Task
          </Link>
        </div>
        <TaskList tasks={tasks} updateTaskInList={updateTaskInList} />
      </div>
    </> 
  )
}

export default Dashboard;