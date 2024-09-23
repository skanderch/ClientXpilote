import axios from 'axios';

// Define the base URL for the Attendance API
const BASE_URL = 'http://51.210.241.36:5000/api/attendances';

// Fetch all attendance records
export const fetchAttendances = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendances:', error);
    throw error;
  }
};

// Fetch attendance records for a specific date
export const fetchAttendancesByDate = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}?date=${date}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching attendances for date ${date}:`, error);
    throw error;
  }
};

// Fetch attendance records for a specific employee
export const fetchAttendancesByEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${BASE_URL}?employee_id=${employeeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching attendances for employee ${employeeId}:`, error);
    throw error;
  }
};

// Create a new attendance record
export const createAttendance = async (attendanceData) => {
  try {
    const response = await axios.post(BASE_URL, attendanceData);
    return response.data;
  } catch (error) {
    console.error('Error creating attendance:', error);
    throw error;
  }
};

// Update an existing attendance record
export const updateAttendance = async (attendanceId, attendanceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${attendanceId}`, attendanceData);
    return response.data;
  } catch (error) {
    console.error(`Error updating attendance ${attendanceId}:`, error);
    throw error;
  }
};

// Delete an attendance record
export const deleteAttendance = async (attendanceId) => {
  try {
    await axios.delete(`${BASE_URL}/${attendanceId}`);
  } catch (error) {
    console.error(`Error deleting attendance ${attendanceId}:`, error);
    throw error;
  }
};
