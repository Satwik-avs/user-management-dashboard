import React from 'react';
import UserList from './components/UserList';
import './App.css';
/** 
 * App component
 * The main component that renders the User Management Dashboard.
 * It includes the userlist which manage the data(user-related)
*/

const App = () => {
  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserList />
    </div>
  );
};

export default App;
