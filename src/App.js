import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { text: 'Taste JavaScript', done: true },
    { text: 'Code furiously', done: true },
    { text: 'Promote Mavo', done: false },
    { text: 'Give talks', done: false },
    { text: 'Write tutorials', done: true },
    { text: 'Have a life!', done: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [showClearButton, setShowClearButton] = useState(todos.some(todo => todo.done));
  const [markAllChecked, setMarkAllChecked] = useState(todos.every(todo => todo.done)); // Eklenen durum

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
    setShowClearButton(updatedTodos.some(todo => todo.done));
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setShowClearButton(updatedTodos.some(todo => todo.done));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
    setShowClearButton(false);
  };

  const handleMarkAll = () => {
    const allDone = !markAllChecked;
    setTodos(todos.map(todo => ({ ...todo, done: allDone })));
    setMarkAllChecked(allDone);
    setShowClearButton(allDone);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo} className="todo-form">
          <div className="new-todo-container">
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              autoFocus
            />
            <button
              className="mark-all"
              onClick={handleMarkAll}
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </form>
      </header>
      {todos.length > 0 && (
        <section className="main">
          <ul className="todo-list">
            {filteredTodos.map((todo, index) => (
              <li key={index} className={todo.done ? 'completed' : ''}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(index)}
                  />
                  <div className="label-container">
                    <label>{todo.text}</label>
                  </div>
                  <button className="destroy" onClick={() => deleteTodo(index)}>X</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {todos.filter(todo => !todo.done).length} item{todos.filter(todo => !todo.done).length !== 1 ? 's' : ''} left
          </span>
          <ul className="filters">
            <li>
              <a
                href="#/"
                className={filter === 'all' ? 'selected' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                className={filter === 'active' ? 'selected' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                className={filter === 'completed' ? 'selected' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </li>
          </ul>
          {showClearButton && (
            <button
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default App;

