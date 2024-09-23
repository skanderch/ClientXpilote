import { fetchAttendances, fetchAttendancesByDate, fetchAttendancesByEmployee, createAttendance, updateAttendance, deleteAttendance } from './attendanceApi';

// Fetch all attendance records
const loadAllAttendances = async () => {
  try {
    const attendances = await fetchAttendances();
    console.log('All attendances:', attendances);
  } catch (error) {
    console.error('Error fetching all attendances:', error);
  }
};

// Fetch attendance records for a specific date
const loadAttendancesByDate = async (date) => {
  try {
    const attendances = await fetchAttendancesByDate(date);
    console.log(`Attendances for ${date}:`, attendances);
  } catch (error) {
    console.error(`Error fetching attendances for date ${date}:`, error);
  }
};

// Create a new attendance record
const addAttendance = async (attendanceData) => {
  try {
    const newAttendance = await createAttendance(attendanceData);
    console.log('New attendance created:', newAttendance);
  } catch (error) {
    console.error('Error creating attendance:', error);
  }
};

// Update an existing attendance record
const modifyAttendance = async (attendanceId, attendanceData) => {
  try {
    const updatedAttendance = await updateAttendance(attendanceId, attendanceData);
    console.log('Attendance updated:', updatedAttendance);
  } catch (error) {
    console.error('Error updating attendance:', error);
  }
};

// Delete an attendance record
const removeAttendance = async (attendanceId) => {
  try {
    await deleteAttendance(attendanceId);
    console.log('Attendance deleted successfully');
  } catch (error) {
    console.error('Error deleting attendance:', error);
  }
};
