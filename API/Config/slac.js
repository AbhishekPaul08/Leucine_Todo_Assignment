require('dotenv').config();
const axios = require('axios');
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK;

const sendToSlack = async (message) => {
  try {
    await axios.post(SLACK_WEBHOOK_URL, { text: message });
    return true;
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return false;
  }
};

module.exports = { sendToSlack };