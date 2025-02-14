import axios from "axios";
import { getToken } from "./AuthService";

// FIX
const API = "http://localhost:3000/api";
const headers = {
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API}/tasks`, taskData, {
      headers,
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const getUserTasks = async () => {
  try {
    const response = await axios.get(`${API}/tasks`, {
      headers,
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const getTask = async (taskId) => {
  try {
    const response = await axios.get(`${API}/tasks/${taskId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API}/tasks/${taskId}`, taskData, {
      headers,
    });

    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API}/tasks/${taskId}`, {
      headers,
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};
