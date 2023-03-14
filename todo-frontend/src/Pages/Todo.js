import React from 'react';
import { useNavigate } from "react-router-dom";

import { checkmarkTodoItem, createTodoItem, deleteTodoItem, findOwnTodos } from '../api';
import { AppContext } from '../App';

import del from '../delete.svg';

export default function Todo() {
  const navigate = useNavigate();
  const context = React.useContext(AppContext);

  const [newTodo, setNewTodo] = React.useState('');
  //const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    if (!context.userToken) {
      navigate('/login')
    } else if (!context.todos) {
      findOwnTodos(context.userToken).then(res => context.setTodos(res));
    }
  });

  const onNewTodoKeyDown = async (event) => {
    if (event.key !== 'Enter' || event.target.value === '') {
      return;
    }
    setNewTodo('');
    const res = await createTodoItem(context.userToken, event.target.value);
    if (!res.statusCode) {
      const todosRes = await findOwnTodos(context.userToken);
      if (!todosRes.statusCode) {
        context.setTodos(todosRes);
      }
    }
  };

  const onCompletedClick = async (id, checked) => {
    await checkmarkTodoItem(context.userToken, id, checked);
    const todosRes = await findOwnTodos(context.userToken);
    if (!todosRes.statusCode) {
      context.setTodos(todosRes);
    }
  };

  const onDeleteClick = async (id) => {
    await deleteTodoItem(context.userToken, id);
    const todosRes = await findOwnTodos(context.userToken);
    if (!todosRes.statusCode) {
      context.setTodos(todosRes);
    }
  };

  const onLogout = () => {
    context.setUserToken(null);
    context.setTodos(null);
  }

  return (
    <div>
      <header className="App-header">
        Todo list
      </header>
      <input type="text" name="add-todo" value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={e => onNewTodoKeyDown(e)} placeholder='Add a new todo' />

      {(context.todos || []).map((todo) => {
        return <div className="todo-item" key={`todo-item-${todo.id}`}>
          <input type="checkbox" checked={todo.completed} onChange={(e) => onCompletedClick(todo.id, e.target.checked)}></input>
          {todo.text}
          <img src={del} className="remove-button" onClick={() => onDeleteClick(todo.id)} alt="logo" />
        </div>
      })}

      <p className="gray-link-logout" onClick={onLogout}>
        Logout
      </p>

    </div>
  );
}
