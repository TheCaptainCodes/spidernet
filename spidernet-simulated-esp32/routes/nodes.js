const express = require('express');
const router = express.Router();

// Dummy nodes data (should match mockNodes + homeNode structure)
const nodes = [
  {
    id: 'node_home_001',
    name: "Alex's Home Node",
    ownerName: 'Alex Rivera',
    type: 'home',
    status: 'online',
    distance: 0,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    signalStrength: 100,
    lastSeen: 'Now',
    health: 95,
    relayPath: [],
    range: 500,
    batteryLevel: 87,
    temperature: 34,
    uptime: '7d 14h 23m',
  },
  {
    id: 'node_001',
    name: "Sarah's Node",
    ownerName: 'Sarah Johnson',
    type: 'home',
    status: 'online',
    distance: 89,
    coordinates: { lat: 40.7138, lng: -74.0050 },
    signalStrength: 85,
    lastSeen: '30s ago',
    health: 88,
    relayPath: ['node_home_001'],
    range: 450,
    batteryLevel: 92,
    temperature: 31,
    uptime: '12d 3h 45m',
  },
  // ... add more nodes as needed
];

router.get('/nodes', (req, res) => {
  res.json(nodes);
});

router.post('/connect', (req, res) => {
  const { nodeId } = req.body;
  // Simulate connection logic
  if (nodes.find(n => n.id === nodeId)) {
    return res.json({ status: 'connected', nodeId });
  }
  res.status(404).json({ error: 'Node not found' });
});

module.exports = router; 