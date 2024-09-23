import axios from 'axios';

const API_BASE_URL = 'http://51.210.241.36:5000/api/roles';

/**
 * Fetch all roles from the server.
 * @returns {Promise} Axios promise with the response containing the list of roles.
 */
export const fetchRoles = () => {
  return axios.get(API_BASE_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching roles:', error);
      throw error;
    });
};

/**
 * Delete a role by its ID.
 * @param {string} roleId - The ID of the role to delete.
 * @returns {Promise} Axios promise with the response after deleting the role.
 */
export const deleteRole = (roleId) => {
  return axios.delete(`${API_BASE_URL}/${roleId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting role:', error);
      throw error;
    });
};

/**
 * Update an existing role by its ID.
 * @param {string} roleId - The ID of the role to update.
 * @param {string} roleName - The new name for the role.
 * @returns {Promise} Axios promise with the response after updating the role.
 */
export const updateRole = (roleId, roleName) => {
  return axios.put(`${API_BASE_URL}/${roleId}`, { role_name: roleName })
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating role:', error);
      throw error;
    });
};

/**
 * Create a new role.
 * @param {string} roleName - The name of the new role.
 * @returns {Promise} Axios promise with the response after creating the role.
 */
export const createRole = (roleName) => {
  return axios.post(API_BASE_URL, { role_name: roleName })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating role:', error);
      throw error;
    });
};
