import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Pagination from './Pagination';
/**
 * UserList Component
 * It manages the user list that includes fetching , deleting, adding and editing user. 
 */

const UserList = () => {
  const [users, setUsers] = useState([]); // To store user date 
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [usersPerPage] = useState(3); // Number of user for page
  const [editUser, setEditUser] = useState(null); // To edit the stored data
  const [showForm, setShowForm] = useState(false); // To hide the user form

  useEffect(() => {
    fetchUsers();
  }, []);
  /**
   * Fetches users from the mock backend API
   */

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
/**
 * Deletes a user by ID
 * @param {number} id - ID of the user to delete 
 */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
/**
 * Sets the user to be edited and shows the form.
 * @param {object} user - User object to be edited.
 */
  const handleEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };
  /**
   * Prepares the form for adding a new user.
   */
  const handleAdd = () => {
    setEditUser(null);
    setShowForm(true);
  };
/**
 * Handles page change for pagination.
 * @param {number} pageNumber - The new page number. 
 */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
/**
 * Handles closing the form and fetching updated user data.
 */
  const handleFormClose = () => {
    setShowForm(false);
    fetchUsers();
  };
// Calculate the displayed users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <h2>User List</h2>
      <button className="add-button" onClick={handleAdd}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1]}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showForm && (
        <UserForm editUser={editUser} fetchUsers={fetchUsers} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default UserList;
