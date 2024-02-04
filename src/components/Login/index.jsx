// Login.js
import React, { useState } from 'react';
import ChatScreen from '../ChatScreen';
import axios from 'axios';
import CommonModal from '../shared/CommonModal';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [apiMessage,setApiMessage]  = useState('')
  const [modalVisibility,setModalVisibility]  = useState(false)
  // const history = useHistory();

  const handleLogin = () => {
    console.log('email:',email)
    const reqBody ={
      email,
      password
    }
    axios.post('http://127.0.0.1:5000/login',reqBody).then(({data})=>{
      console.log("data:",data)
      setApiMessage(data?.message)
      if(data?.status==='success'){
        setIsloggedIn(true)
      }else{
        setModalVisibility(true)

      }
    }
    )
    // setIsloggedIn(true)
    // Add your authentication logic here (e.g., API call, check credentials)
    // For simplicity, always navigate to the dashboard
    // history.push('/dashboard');
  };

  const handleModalClose = ()=>{
    setModalVisibility(false)
  }

  if(isloggedIn){
    return (
      <ChatScreen email={email}/>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      {/* <form onSubmit={handleLogin}> */}
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail((e.target.value).toString())}
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
        <button type="submit" onClick={handleLogin}>Login</button>
      {/* </form> */}
      {modalVisibility && <CommonModal message={apiMessage} onClose={handleModalClose}/>}
    </div>
  );
};

export default Login;
