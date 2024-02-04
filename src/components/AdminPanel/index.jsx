// UserList.js
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

const AdminPanel = () => {
  // Example user data
  // const initialUsers = [
  //   { id: 1, name: 'User 1', status: 'Pending', isadmin: false },
  //   { id: 2, name: 'User 2', status: 'Pending', isadmin: false },
  //   { id: 3, name: 'User 3', status: 'Approved', isadmin: true },
  //   // Add more users as needed
  // ];

  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/usersList').then(({ data }) => {
      console.log('users:', data?.body)
      setUsers(data?.body)
    })
  }, [])

  const handleApprove = (userId) => {
    setLoadingUserId(userId);
    const reqData = {
      id:userId,
      status:true
    }
    axios.put('http://127.0.0.1:5000/updateUser',reqData).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
  };

  const handleDecline = (userId) => {
    setLoadingUserId(userId);
    const reqData = {
      id:userId,
      status:false
    }
    axios.put('http://127.0.0.1:5000/updateUser',reqData).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })
  };

  const handleMakeAdmin = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isadmin: true } : user
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
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.isverified ? "Verified" : "Not Verified"}</td>
              <td>{user.isadmin ? "Admin" : "User"}</td>
              <td>
                {!user.isverified && (
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
                {user.isverified && !user.isadmin && (
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
