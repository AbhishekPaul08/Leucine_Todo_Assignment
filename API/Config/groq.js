require('dotenv').config();
const Groq = require('groq-sdk');

const GROQ_API_KEY = process.env.GROQ_API;

const groqClient = new Groq({ 
  apiKey: GROQ_API_KEY 
});

module.exports = { groqClient };