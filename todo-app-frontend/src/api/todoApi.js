const API_BASE_URL = 'http://localhost:5000/todos';

export const fetchTodos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const summarizeTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error('Failed to summarize todos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error summarizing todos:', error);
    throw error;
  }
};