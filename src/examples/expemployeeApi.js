import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from './employeeApi';

// Fetch all employees
const loadEmployees = async () => {
  try {
    const employees = await fetchEmployees();
    console.log('All employees:', employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

// Create a new employee
const addEmployee = async (employeeData) => {
  try {
    const newEmployee = await createEmployee(employeeData);
    console.log('New employee created:', newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
  }
};

// Update an existing employee
const modifyEmployee = async (employeeId, employeeData) => {
  try {
    const updatedEmployee = await updateEmployee(employeeId, employeeData);
    console.log('Employee updated:', updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

// Delete an employee
const removeEmployee = async (employeeId) => {
  try {
    await deleteEmployee(employeeId);
    console.log('Employee deleted successfully');
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};
