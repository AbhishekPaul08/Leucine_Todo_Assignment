import React, { useState, useEffect } from 'react';
import { fetchTodos, summarizeTodos } from '../api/todoApi';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState('');

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError('');
    } catch (error) {
      setError('Failed to load todos. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const handleTodoDeleted = (deletedId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletedId));
  };

  const handleSummarize = async () => {
    try {
      setSummarizing(true);
      setSummary('');
      const result = await summarizeTodos();
      setSummary(result.summary);
    } catch (error) {
      alert('Failed to generate summary. Please try again.');
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div>
      <TodoForm onTodoAdded={handleTodoAdded} />
      
      <div className="todo-header">
        <h2>Your Todos</h2>
        
        <button
          onClick={handleSummarize}
          disabled={summarizing || todos.length === 0}
        >
          {summarizing ? 'Summarizing...' : 'Summarize & Send to Slack'}
        </button>
      </div>
      
      {summary && (
        <div className="summary-box">
          <h3>Summary (Sent to Slack)</h3>
          <p>{summary}</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading ? (
        <div>Loading todos...</div>
      ) : todos.length === 0 ? (
        <div>
          <p>No todos yet. Add one to get started!</p>
        </div>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onTodoDeleted={handleTodoDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;