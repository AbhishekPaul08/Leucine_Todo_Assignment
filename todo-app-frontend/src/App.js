import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div>
      <header>
        <div>
          <h1>Todo App</h1>
        </div>
      </header>
      
      <main>
        <TodoList />
      </main>
      
      <footer>
        <div>
          <p>My Todo-App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
