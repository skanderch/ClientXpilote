import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material';
import { fetchEmployees } from './employeeAPI';
import { createAttendance, updateAttendance } from './attendanceAPI';

const AttendanceForm = ({ attendance, onSuccess }) => {
  const [employeeId, setEmployeeId] = useState(attendance?.employee_id || '');
  const [date, setDate] = useState(attendance?.date ? new Date(attendance.date).toISOString().substring(0, 10) : '');
  const [status, setStatus] = useState(attendance?.status || 'To Define');
  const [hoursWorked, setHoursWorked] = useState(attendance?.hours_worked || '');
  const [reason, setReason] = useState(attendance?.reason || '');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchEmployeesData = async () => {
    try {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendanceData = {
      employee_id: employeeId,
      date,
      status,
      hours_worked: hoursWorked,
      reason
    };

    try {
      if (attendance) {
        // Edit attendance
        await updateAttendance(attendance._id, attendanceData);
      } else {
        // Create new attendance
        await createAttendance(attendanceData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="employee-label">Employee</InputLabel>
        <Select
          labelId="employee-label"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        >
          {employees.map(employee => (
            <MenuItem key={employee._id} value={employee._id}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="date"
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <MenuItem value="To Define">To Define</MenuItem>
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="number"
        label="Hours Worked"
        value={hoursWorked}
        onChange={(e) => setHoursWorked(e.target.value)}
      />
      <TextField
        fullWidth
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default AttendanceForm;
