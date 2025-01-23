import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import Pagination from './Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [editUser, setEditUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(''); // Notification state
  const [notificationType, setNotificationType] = useState('success'); // Type of notification: success or error

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setNotification('User deleted successfully!');
      setNotificationType('success');
    } catch (error) {
      console.error('Error deleting user:', error);
      setNotification('Failed to delete the user. Please try again.', 'error');
      setNotificationType('error');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFormClose = (updatedUser) => {
    setShowForm(false);
    if (updatedUser) {
      if (editUser) {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      } else {
        setUsers([updatedUser, ...users]);
      }
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <h2>User List</h2>
      {notification && (
        <div className={`notification ${notificationType}`}>
          {notification}
        </div>
      )}
      <button className='add-button' onClick={handleAdd}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className='edit-button' onClick={() => handleEdit(user)}>Edit</button>
                <button className ='delete-button'onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {showForm && (
        <UserForm
          editUser={editUser}
          onClose={handleFormClose}
          setNotification={setNotification}
        />
      )}
    </div>
  );
};

export default UserList;
