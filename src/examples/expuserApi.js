import { fetchRoles, fetchUsers, createUser, updateUser, deleteUser } from './userApi';

// Fetch all users
const loadUsers = async () => {
  try {
    const users = await fetchUsers();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Create a new user
const addUser = async (userData) => {
  try {
    await createUser(userData);
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Update an existing user
const modifyUser = async (userId, userData) => {
  try {
    await updateUser(userId, userData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Delete a user
const removeUser = async (userId) => {
  try {
    await deleteUser(userId);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
