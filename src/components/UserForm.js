import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ editUser, onClose, setNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: { name: '' }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData({ name: '', email: '', company: { name: '' } });
    }
  }, [editUser]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let response;
      if (editUser) {
        response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, formData);
        setNotification('User updated successfully!');
      } else {
        response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
        setNotification('User added successfully!');
      }
      onClose(response.data);
    } catch (error) {
      console.error('Error in form submission:', error);
      setNotification('Failed to submit the form. Please try again.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editUser ? 'Edit User' : 'Add User'}</h2>
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
      <div>
        <button type="submit">{editUser ? 'Update' : 'Add'}</button>
        <button type="button" onClick={() => onClose(null)}>Cancel</button>
      </div>
    </form>
  );
};

export default UserForm;
