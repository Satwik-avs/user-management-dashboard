import axios from 'axios';

// Base URL for the mock backend API
const API_URL = 'https://jsonplaceholder.typicode.com/users';
/**
 * Fetches the list of users from the API
 * @returns {Promise} - A promise that resolves with response data.
 */
export const fetchUsers = () => {
  return axios.get(API_URL);
};
/**
 * Creates a new user by sending a POST request to the API.
 * @param {object} user - The User data to be created.
 * @returns {Promise} - A promise that resolves with response data. 
 */
export const createUser = (user) => {
  return axios.post(API_URL, user);
};
/**
 * Updates an existing user by sending a PUT request to the API
 * @param {number} id - The ID of the user to be updated.
 * @param {object} user - The updated user data.
 * @returns {Promise} - A promise that resolves with response data.
 */
export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/${id}`, user);
};
/**
 * Deleted a user by sending a DELETE request to the API.
 * @param {number} id - The ID of the user to be deleted. 
 * @returns {Promise} - A promise that resolves with the response data.
 */
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
