const express = require('express');
const TodoController = require('../Controllers/todoController');

const router = express.Router();

// GET /todos – Fetch all todos
router.get('/', TodoController.getAllTodos);

// POST /todos – Add a new todo
router.post('/', TodoController.createTodo);

// DELETE /todos/:id – Delete a todo
router.delete('/:id', TodoController.deleteTodo);

// POST /summarize – Summarize todos and send to Slack
router.post('/summarize', TodoController.summarizeTodos);

module.exports = router;
