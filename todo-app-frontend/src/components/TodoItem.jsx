import React, { useState } from 'react';
import { deleteTodo } from '../api/todoApi';

const TodoItem = ({ todo, onTodoDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setIsDeleting(true);
        await deleteTodo(todo.id);
        
        if (onTodoDeleted) {
          onTodoDeleted(todo.id);
        }
      } catch (error) {
        console.error('Failed to delete todo:', error);
        alert('Failed to delete todo. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <div>
          <h3>{todo.title}</h3>
          {todo.description && (
            <p>{todo.description}</p>
          )}
          {todo.createdAt && (
            <p>
              Added: {new Date(todo.createdAt.seconds * 1000).toLocaleString()}
            </p>
          )}
        </div>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="delete-btn"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
