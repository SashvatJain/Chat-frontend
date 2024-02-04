// UserList.js
import React, { useState } from 'react';
import './style.css';

const AdminPanel = () => {
  // Example user data
  const initialUsers = [
    { id: 1, name: 'User 1', status: 'Pending', isAdmin: false },
    { id: 2, name: 'User 2', status: 'Pending', isAdmin: false },
    { id: 3, name: 'User 3', status: 'Approved', isAdmin: true },
    // Add more users as needed
  ];

  const [users, setUsers] = useState(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState(null);

  const handleApprove = (userId) => {
    setLoadingUserId(userId);

    // Simulating an asynchronous action (e.g., API call)
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.id === userId
          ? { ...user, status: 'Approved', isAdmin: false }
          : user
      );
      setUsers(updatedUsers);
      setLoadingUserId(null);
    }, 1000);
  };

  const handleDecline = (userId) => {
    setLoadingUserId(userId);

    // Simulating an asynchronous action (e.g., API call)
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, status: 'Declined' } : user
      );
      setUsers(updatedUsers);
      setLoadingUserId(null);
    }, 1000);
  };

  const handleMakeAdmin = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isAdmin: true } : user
    );
    setUsers(updatedUsers);
  };

  const handleRemoveUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                {user.status === 'Pending' && (
                  <div className="actions-container">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(user.id)}
                      disabled={loadingUserId === user.id}
                    >
                      Approve
                      {loadingUserId === user.id && (
                        <span className="progress-circle"></span>
                      )}
                    </button>
                    <button
                      className="decline-btn"
                      onClick={() => handleDecline(user.id)}
                      disabled={loadingUserId === user.id}
                    >
                      Decline
                      {loadingUserId === user.id && (
                        <span className="progress-circle"></span>
                      )}
                    </button>
                  </div>
                )}
                {user.status === 'Approved' && !user.isAdmin && (
                  <div className="actions-container">
                    <button
                      className="make-admin-btn"
                      onClick={() => handleMakeAdmin(user.id)}
                    >
                      Make Admin
                    </button>
                    <button
                      className="remove-user-btn"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
