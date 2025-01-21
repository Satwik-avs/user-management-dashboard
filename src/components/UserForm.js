import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * UserForm Component
 * Handles the user form for adding and editing users.
 * @param {object} props - The properties passed to the component.
 */
const UserForm = ({ editUser, fetchUsers, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: { name: '' }
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData({ name: '', email: '', company: { name: '' } });
    }

    setSuccessMessage(''); // Clear success message when editUser changes
  }, [editUser]);

  /**
   * Validates the form data.
   * @returns {boolean} - True if the form data is valid, false otherwise.
   */
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.company.name.trim()) errors.company = 'Department is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles input changes and updates the form data.
   * @param {object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name.includes('company')) {
        return {
          ...prevState,
          company: {
            ...prevState.company,
            name: value
          }
        };
      }
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  /**
   * Handles form submission.
   * Sends a POST or PUT request based on whether editing or adding a user.
   * @param {object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editUser) {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, formData);
      setSuccessMessage('User updated successfully!');
    } else {
      await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      setSuccessMessage('User added successfully!');
    }
    fetchUsers();
    onClose();
    console.log(successMessage); // Log success message to check if it’s being set
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editUser ? 'Edit User' : 'Add User'}</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <input
            type="text"
            name="company.name"
            placeholder="Department"
            value={formData.company.name}
            onChange={handleChange}
            required
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </div>
        <div className="button-container">
          <button type="submit">{editUser ? 'Update' : 'Add'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
