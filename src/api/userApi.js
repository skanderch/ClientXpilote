import axios from 'axios';

const API_BASE_URL = 'http://51.210.241.36:5000/api';

// Fetch all roles
export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    await axios.post(`${API_BASE_URL}/users`, userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
