const express = require('express');
const router = express.Router();

const connectedDevices = [
  {
    id: 'dev_001',
    name: 'Alex Phone',
    type: 'smartphone',
    lastConnected: '2025-07-02T12:00:00Z',
    isActive: true,
  },
  {
    id: 'dev_002',
    name: 'Sarah Tablet',
    type: 'tablet',
    lastConnected: '2025-07-01T09:30:00Z',
    isActive: false,
  },
];

router.get('/connected-devices', (req, res) => {
  res.json(connectedDevices);
});

module.exports = router; 