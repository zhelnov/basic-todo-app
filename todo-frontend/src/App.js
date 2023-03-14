import React from 'react';
import { Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import Todo from './Pages/Todo';
import Login from './Pages/Login';

export const AppContext = React.createContext({
  userToken: null,
  setUserToken: () => {},
  todos: [],
  setTodos: () => {},
  viewMode: 'all',
  setViewMode: () => {},
});

function App() {
  const [userToken, setToken] = React.useState(null);
  const setUserToken = (newtoken) => setToken(() => newtoken);

  const [todos, settodos] = React.useState(null);
  const setTodos = (todos) => settodos(() => todos);

  const [viewMode, setMode] = React.useState(null);
  const setViewMode = (mode) => setMode(() => mode);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <AppContext.Provider value={{
        userToken,
        setUserToken,
        todos,
        setTodos,
        viewMode,
        setViewMode,
      }}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
};

export default App;
