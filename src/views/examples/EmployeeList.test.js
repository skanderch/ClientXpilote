// src/views/examples/EmployeeList.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom directly
import axios from 'axios';
import EmployeeList from './EmployeeList';


// Mock axios
jest.mock('axios');

describe('EmployeeList Component', () => {
  // Mock data for employees
  const mockEmployees = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Developer',
      hire_date: '2024-01-01',
      status: 'Active',
      production_site: 'Paris',
    },
    // Add more mock employees as needed
  ];

  test('fetches and displays employees', async () => {
    // Mock axios.get to resolve with mock employees data
    axios.get.mockResolvedValue({ data: mockEmployees });

    render(<EmployeeList />);

    // Assert that the employee data is displayed
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('handles employee deletion', async () => {
    // Mock axios.get to resolve with mock employees data
    axios.get.mockResolvedValue({ data: mockEmployees });

    // Mock axios.delete
    axios.delete.mockResolvedValue({});

    render(<EmployeeList />);

    // Wait for the employee to be displayed
    await screen.findByText('John Doe');

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Assert that axios.delete was called
    expect(axios.delete).toHaveBeenCalledWith('http://51.210.241.36:5000/api/employees/1');

    // Wait for the employee to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  test('handles employee editing and form submission', async () => {
    // Mock axios.get to resolve with mock employees data
    axios.get.mockResolvedValue({ data: mockEmployees });

    // Mock axios.put (or post) for editing
    axios.put = jest.fn().mockResolvedValue({});

    render(<EmployeeList />);

    // Wait for the employee to be displayed
    await screen.findByText('John Doe');

    // Open the modal for editing
    fireEvent.click(screen.getByText('Edit'));

    // Assert that the modal is open and the employee data is passed correctly
    expect(screen.getByText('Add/Edit Agent')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();

    // Simulate form submission (assuming EmployeeForm is implemented properly)
    // This part depends on how your EmployeeForm component handles submission
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.click(screen.getByText('Save'));

    // Assert that axios.put was called with the correct data
    expect(axios.put).toHaveBeenCalledWith(
      'http://51.210.241.36:5000/api/employees/1',
      { name: 'Jane Doe' }
    );
  });
});
