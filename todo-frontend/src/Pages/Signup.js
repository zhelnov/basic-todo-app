import React from 'react';
import { useNavigate } from "react-router-dom";

import { signup } from '../api';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const submit = async () => {
    const res = await signup({ name, email: mail, password: pwd });
    if (!res.statusCode) {
      navigate('/login');
    }
    // skipping validation and error toast showup, only sunshine scenario
  };

  return (
    <div>
      <header className="App-header">
        Welcome!
      </header>
      <p className="hint">
        Sign up to start using Simpledo today.
      </p>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder='Full name' />
      <input type="text" name="email" value={mail} onChange={e => setMail(e.target.value)} placeholder='Email' />
      <input type="password" name="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder='Password' />

      <p className="gray-link" onClick={() => navigate("/login")}>
        Do have an account? Sign in.
      </p>

      <button className="action-button" onClick={submit}>Sign Up</button>
    </div>
  );
}