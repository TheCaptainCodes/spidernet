const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const messagesFile = path.join(__dirname, '../data/messages.json');

// Ensure messages file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, '[]');
}

function generateId() {
  return 'msg_' + Math.random().toString(36).substr(2, 6);
}

router.post('/help', (req, res) => {
  const { helpType, helpMessage, location, nodeId } = req.body;
  if (!helpType || !helpMessage || !location || !nodeId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newMessage = {
    id: generateId(),
    helpType,
    helpMessage,
    location,
    nodeId,
    timestamp: new Date().toISOString()
  };
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  messages.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  console.log('Received help request:', newMessage);
  res.json({ status: 'received', id: newMessage.id });
});

router.get('/messages', (req, res) => {
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  res.json(messages);
});

// Add POST /message for normal messages
router.post('/message', (req, res) => {
  const { content, nodeId, nodeName, type, senderId, senderName, encrypted, helpType, gpsLocation } = req.body;
  if (!content || !nodeId || !nodeName || !type || !senderId || !senderName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newMessage = {
    id: generateId(),
    content,
    timestamp: Date.now(),
    nodeId,
    nodeName,
    type,
    hops: 1,
    isDelivered: true,
    senderId,
    senderName,
    encrypted: !!encrypted,
    helpType,
    gpsLocation,
  };
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  messages.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  console.log('Received message:', newMessage);
  res.json({ status: 'received', id: newMessage.id });
});

module.exports = router; 