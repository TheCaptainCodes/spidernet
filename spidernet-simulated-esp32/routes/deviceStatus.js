const express = require('express');
const router = express.Router();

const deviceStatus = {
  health: 95,
  temperature: 34,
  batteryLevel: 87,
  signalStrength: 92,
  uptime: '7d 14h 23m',
  dataTransferred: '2.4 GB',
  nodesConnected: 12,
};

router.get('/device-status', (req, res) => {
  res.json(deviceStatus);
});

module.exports = router; 