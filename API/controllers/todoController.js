const TodoModel = require('../Models/TodoModel');
const { groqClient } = require('../Config/groq');
const { sendToSlack } = require('../Config/slac');

const TodoController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await TodoModel.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      console.error('Error in getAllTodos controller:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  },
  
  createTodo: async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      
      const newTodo = await TodoModel.createTodo({ title, description });
      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error in createTodo controller:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  },
  
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      
      const isDeleted = await TodoModel.deleteTodo(id);
      
      if (!isDeleted) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error in deleteTodo controller:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  },
  
  summarizeTodos: async (req, res) => {
    try {
      const todos = await TodoModel.getAllTodos();
      
      if (todos.length === 0) {
        const message = "No todos found to summarize.";
        await sendToSlack(message);
        return res.status(200).json({ message });
      }
      
      // Format todos for the Groq request
      const todoList = todos.map(todo => 
        `- ${todo.title}${todo.description ? `: ${todo.description}` : ''} (${todo.completed ? 'Completed' : 'Pending'})`
      ).join('\n');
      
      // Generate summary with Groq using the correct SDK approach
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes todo lists concisely."
          },
          {
            role: "user",
            content: `Please summarize the following todo list in a brief, helpful way that identifies key tasks, priorities, and overall status. Here's the list:\n\n${todoList}`
          }
        ],
        model: "llama3-8b-8192",
        temperature: 0.3,
        max_tokens: 500
      });
      
      const summary = completion.choices[0]?.message?.content || "Unable to generate summary";
      
      // Send to Slack
      await sendToSlack(`*Todo List Summary*\n${summary}`);
      
      res.status(200).json({ summary });
    } catch (error) {
      console.error('Error in summarizeTodos controller:', error);
      res.status(500).json({ error: 'Failed to summarize todos' });
    }
  }
};

module.exports = TodoController;