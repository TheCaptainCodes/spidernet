const express = require('express');
const router = express.Router();

const user = {
  id: 'user_001',
  name: 'Alex Rivera',
  deviceId: 'SPD-7X8K9L2M',
  homeNodeId: 'node_home_001',
  isConnectedToHomeNode: true,
  profilePicture: null,
  nodeName: "Alex's Home Node",
  isConnected: true,
  autoRelay: true,
};

router.get('/user', (req, res) => {
  res.json(user);
});

module.exports = router; 