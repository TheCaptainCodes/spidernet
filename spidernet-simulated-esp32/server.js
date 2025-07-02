const express = require('express');
const cors = require('cors');
const os = require('os'); // Import the 'os' module

const messageRoutes = require('./routes/message');
const nodesRoutes = require('./routes/nodes');
const userRoutes = require('./routes/user');
const deviceStatusRoutes = require('./routes/deviceStatus');
const connectedDevicesRoutes = require('./routes/connectedDevices');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/', messageRoutes);
app.use('/', nodesRoutes);
app.use('/', userRoutes);
app.use('/', deviceStatusRoutes);
app.use('/', connectedDevicesRoutes);

// Function to get the local IPv4 address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    const iface = interfaces[name];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; // Fallback if no non-internal IPv4 is found
}

const LAN_IP = getLocalIpAddress(); // Get the actual local IP

// Listen on all available network interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simulated ESP32 server running at http://localhost:${PORT}`);
  console.log(`Simulated ESP32 server also accessible on your network at http://0.0.0.0:${PORT}`);
  
  if (LAN_IP && LAN_IP !== 'localhost') {
    console.log(`Your actual LAN IP address is: http://${LAN_IP}:${PORT}`);
  } else {
    console.log(`Could not determine a specific LAN IP. Check your network configuration.`);
  }
});