// Login.js
import React, { useState } from 'react';
import ChatScreen from '../ChatScreen';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedIn, setIsloggedIn] = useState(false);
  // const history = useHistory();

  const handleLogin = () => {
    setIsloggedIn(true)
    console.log("User Loggedin")
    // Add your authentication logic here (e.g., API call, check credentials)
    // For simplicity, always navigate to the dashboard
    // history.push('/dashboard');
  };

  if(isloggedIn){
    return (
      <ChatScreen/>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
