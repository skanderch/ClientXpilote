// employeeApi.js
import axios from 'axios';

const BASE_URL = 'http://51.210.241.36:5000/api/employees';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(BASE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    await axios.delete(`${BASE_URL}/${employeeId}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};
