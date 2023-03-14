import React from 'react';
import { useNavigate } from "react-router-dom";

import { login } from '../api';
import { AppContext } from '../App';

export default function Todo() {
  const navigate = useNavigate();
  const context = React.useContext(AppContext);

  const [mail, setMail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const submit = async () => {
    const res = await login({ username: mail, password: pwd });
    if (!res.statusCode) {
      context.setUserToken(res.access_token);
      navigate('/todo');
    }
    // skipping validation and error toast showup, only sunshine scenario
  };

  return (
    <div>
      <header className="App-header">
        Welcome back!
      </header>
      <p className="hint">
        Log in to continue.
      </p>
      <input type="text" name="email" value={mail} onChange={e => setMail(e.target.value)} placeholder='Email' />
      <input type="password" name="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder='Password' />

      <p className="gray-link" onClick={() => navigate("/")}>
        Don’t have an account? Sign up.
      </p>

      <button className="action-button" onClick={submit}>Log In</button>
    </div>
  );
}