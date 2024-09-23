import { fetchRoles, createRole, updateRole, deleteRole } from '../api/roleApi';

// Fetch all roles
const loadRoles = async () => {
  try {
    const roles = await fetchRoles();
    console.log('All roles:', roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Create a new role
const addRole = async (roleName) => {
  try {
    const newRole = await createRole(roleName);
    console.log('New role created:', newRole);
  } catch (error) {
    console.error('Error creating role:', error);
  }
};

// Update an existing role
const modifyRole = async (roleId, roleName) => {
  try {
    const updatedRole = await updateRole(roleId, roleName);
    console.log('Role updated:', updatedRole);
  } catch (error) {
    console.error('Error updating role:', error);
  }
};

// Delete a role
const removeRole = async (roleId) => {
  try {
    await deleteRole(roleId);
    console.log('Role deleted successfully');
  } catch (error) {
    console.error('Error deleting role:', error);
  }
};
