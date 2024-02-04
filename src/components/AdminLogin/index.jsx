// Login.js
import React, { useState } from 'react';
import AdminPanel from '../AdminPanel';
// import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const history = useHistory();

  const handleLogin = () => {
    setIsLoggedIn(true)
    console.log("AdminLogin Loggedin")
    // Add your authentication logic here (e.g., API call, check credentials)
    // For simplicity, always navigate to the dashboard
    // history.push('/dashboard');
  };

  if(isLoggedIn){
    return(
      <AdminPanel/>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login AdminLogin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
