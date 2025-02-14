import axios from "axios";

// FIX
const API = "http://localhost:3000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      localStorage.setItem("token", response.data.data.token); // Save token
      return response;
    } else {
      throw new Error(response.message || "Login failed");
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      localStorage.setItem("token", response.data.data.token); // Save token
      return response;
    } else {
      throw new Error(response.message || "Login failed");
    }
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw error.message;
  }
};

export const logout = () => {
  localStorage.removeItem("token"); // Remove token on logout
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken(); // Check if token exists
};
