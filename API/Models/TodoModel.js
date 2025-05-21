const { db } = require('../Config/firebase');
const { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  query,
  orderBy,
  serverTimestamp
} = require('firebase/firestore');

const COLLECTION_NAME = 'todos';

const TodoModel = {
  getAllTodos: async () => {
    try {
      const todosRef = collection(db, COLLECTION_NAME);
      const q = query(todosRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const todos = [];
      querySnapshot.forEach(doc => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      
      return todos;
    } catch (error) {
      console.error('Error getting todos:', error);
      throw error;
    }
  },
  
  getTodoById: async (id) => {
    try {
      const todoDoc = await getDoc(doc(db, COLLECTION_NAME, id));
      
      if (!todoDoc.exists()) {
        return null;
      }
      
      return { id: todoDoc.id, ...todoDoc.data() };
    } catch (error) {
      console.error('Error getting todo:', error);
      throw error;
    }
  },
  
  createTodo: async (todoData) => {
    try {
      const todoWithTimestamp = {
        ...todoData,
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, COLLECTION_NAME), todoWithTimestamp);
      return { id: docRef.id, ...todoWithTimestamp };
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },
  
  deleteTodo: async (id) => {
    try {
      const todoRef = doc(db, COLLECTION_NAME, id);
      const todoDoc = await getDoc(todoRef);
      
      if (!todoDoc.exists()) {
        return false;
      }
      
      await deleteDoc(todoRef);
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
};

module.exports = TodoModel;