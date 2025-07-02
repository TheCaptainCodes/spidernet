export interface Node {
  id: string;
  name: string;
  ownerName: string;
  type: 'home';
  status: 'online' | 'offline' | 'connecting';
  distance: number; // in meters
  coordinates: { lat: number; lng: number };
  signalStrength: number;
  lastSeen: string;
  health: number;
  relayPath: string[];
  range: number;
  batteryLevel: number;
  temperature: number;
  uptime: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  nodeId: string;
  nodeName: string;
  type: 'public' | 'emergency';
  hops: number;
  isDelivered: boolean;
  senderId: string;
  senderName: string;
  encrypted: boolean;
  helpType?: string;
  gpsLocation?: string;
}

export interface HelpRequest {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  location: string;
  status: 'pending' | 'acknowledged' | 'resolved';
  deviceId: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'smartphone' | 'tablet' | 'laptop';
  lastConnected: string;
  isActive: boolean;
}

export interface DeviceStatus {
  health: number;
  temperature: number;
  batteryLevel: number;
  signalStrength: number;
  uptime: string;
  dataTransferred: string;
  nodesConnected: number;
}

export const mockUser = {
  id: 'user_001',
  name: 'Alex Rivera',
  deviceId: 'SPD-7X8K9L2M',
  homeNodeId: 'node_home_001',
  isConnectedToHomeNode: true,
  profilePicture: null,
  nodeName: 'Alex\'s Home Node',
  isConnected: true,
  autoRelay: true,
};

export const deviceStatus: DeviceStatus = {
  health: 95,
  temperature: 34,
  batteryLevel: 87,
  signalStrength: 92,
  uptime: '7d 14h 23m',
  dataTransferred: '2.4 GB',
  nodesConnected: 12,
};

// User's home node (the one they own)
export const homeNode: Node = {
  id: 'node_home_001',
  name: 'Alex\'s Home Node',
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
};

// Expand mockNodes to have many more nodes for spider web effect
export const mockNodes: Node[] = [
  // Inner ring nodes
  {
    id: 'node_001',
    name: 'Sarah\'s Node',
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
  {
    id: 'node_002',
    name: 'Mike\'s Node',
    ownerName: 'Mike Chen',
    type: 'home',
    status: 'online',
    distance: 156,
    coordinates: { lat: 40.7118, lng: -74.0070 },
    signalStrength: 78,
    lastSeen: '1m ago',
    health: 82,
    relayPath: ['node_home_001'],
    range: 480,
    batteryLevel: 76,
    temperature: 36,
    uptime: '5d 8h 12m',
  },
  {
    id: 'node_003',
    name: 'Emma\'s Node',
    ownerName: 'Emma Wilson',
    type: 'home',
    status: 'online',
    distance: 203,
    coordinates: { lat: 40.7148, lng: -74.0040 },
    signalStrength: 72,
    lastSeen: '45s ago',
    health: 91,
    relayPath: ['node_home_001', 'node_001'],
    range: 420,
    batteryLevel: 94,
    temperature: 29,
    uptime: '18d 22h 5m',
  },
  {
    id: 'node_004',
    name: 'Carlos\'s Node',
    ownerName: 'Carlos Rodriguez',
    type: 'home',
    status: 'online',
    distance: 267,
    coordinates: { lat: 40.7108, lng: -74.0080 },
    signalStrength: 65,
    lastSeen: '2m ago',
    health: 76,
    relayPath: ['node_home_001', 'node_002'],
    range: 390,
    batteryLevel: 68,
    temperature: 38,
    uptime: '3d 11h 30m',
  },
  {
    id: 'node_005',
    name: 'Lisa\'s Node',
    ownerName: 'Lisa Park',
    type: 'home',
    status: 'online',
    distance: 341,
    coordinates: { lat: 40.7158, lng: -74.0030 },
    signalStrength: 58,
    lastSeen: '3m ago',
    health: 87,
    relayPath: ['node_home_001', 'node_001', 'node_003'],
    range: 460,
    batteryLevel: 81,
    temperature: 32,
    uptime: '9d 16h 18m',
  },
  {
    id: 'node_006',
    name: 'David\'s Node',
    ownerName: 'David Kim',
    type: 'home',
    status: 'online',
    distance: 298,
    coordinates: { lat: 40.7098, lng: -74.0090 },
    signalStrength: 61,
    lastSeen: '1m ago',
    health: 79,
    relayPath: ['node_home_001', 'node_002', 'node_004'],
    range: 410,
    batteryLevel: 73,
    temperature: 35,
    uptime: '6d 9h 42m',
  },
  // Add more nodes for the spider web effect
  {
    id: 'node_007',
    name: 'Anna\'s Node',
    ownerName: 'Anna Thompson',
    type: 'home',
    status: 'online',
    distance: 423,
    coordinates: { lat: 40.7168, lng: -74.0020 },
    signalStrength: 52,
    lastSeen: '4m ago',
    health: 84,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005'],
    range: 380,
    batteryLevel: 89,
    temperature: 30,
    uptime: '15d 7h 33m',
  },
  {
    id: 'node_008',
    name: 'James\'s Node',
    ownerName: 'James Brown',
    type: 'home',
    status: 'online',
    distance: 387,
    coordinates: { lat: 40.7088, lng: -74.0100 },
    signalStrength: 55,
    lastSeen: '2m ago',
    health: 77,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006'],
    range: 430,
    batteryLevel: 65,
    temperature: 37,
    uptime: '4d 13h 21m',
  },
  {
    id: 'node_009',
    name: 'Maria\'s Node',
    ownerName: 'Maria Garcia',
    type: 'home',
    status: 'online',
    distance: 512,
    coordinates: { lat: 40.7178, lng: -74.0010 },
    signalStrength: 48,
    lastSeen: '5m ago',
    health: 90,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007'],
    range: 440,
    batteryLevel: 96,
    temperature: 28,
    uptime: '21d 4h 15m',
  },
  {
    id: 'node_010',
    name: 'Tom\'s Node',
    ownerName: 'Tom Wilson',
    type: 'home',
    status: 'online',
    distance: 478,
    coordinates: { lat: 40.7078, lng: -74.0110 },
    signalStrength: 51,
    lastSeen: '3m ago',
    health: 83,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008'],
    range: 400,
    batteryLevel: 71,
    temperature: 33,
    uptime: '8d 19h 8m',
  },
  {
    id: 'node_011',
    name: 'Sophie\'s Node',
    ownerName: 'Sophie Martin',
    type: 'home',
    status: 'online',
    distance: 598,
    coordinates: { lat: 40.7188, lng: -74.0000 },
    signalStrength: 44,
    lastSeen: '6m ago',
    health: 86,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007', 'node_009'],
    range: 420,
    batteryLevel: 88,
    temperature: 31,
    uptime: '11d 2h 47m',
  },
  {
    id: 'node_012',
    name: 'Chris\'s Node',
    ownerName: 'Chris Davis',
    type: 'home',
    status: 'online',
    distance: 567,
    coordinates: { lat: 40.7068, lng: -74.0120 },
    signalStrength: 47,
    lastSeen: '4m ago',
    health: 80,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008', 'node_010'],
    range: 450,
    batteryLevel: 69,
    temperature: 34,
    uptime: '7d 15h 39m',
  },
  {
    id: 'node_013',
    name: 'Rachel\'s Node',
    ownerName: 'Rachel Lee',
    type: 'home',
    status: 'online',
    distance: 689,
    coordinates: { lat: 40.7198, lng: -73.9990 },
    signalStrength: 41,
    lastSeen: '7m ago',
    health: 92,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007', 'node_009', 'node_011'],
    range: 460,
    batteryLevel: 93,
    temperature: 27,
    uptime: '25d 8h 12m',
  },
  {
    id: 'node_014',
    name: 'Kevin\'s Node',
    ownerName: 'Kevin Taylor',
    type: 'home',
    status: 'online',
    distance: 654,
    coordinates: { lat: 40.7058, lng: -74.0130 },
    signalStrength: 43,
    lastSeen: '5m ago',
    health: 78,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008', 'node_010', 'node_012'],
    range: 410,
    batteryLevel: 67,
    temperature: 36,
    uptime: '5d 22h 54m',
  },
  {
    id: 'node_015',
    name: 'Nina\'s Node',
    ownerName: 'Nina Anderson',
    type: 'home',
    status: 'online',
    distance: 778,
    coordinates: { lat: 40.7208, lng: -73.9980 },
    signalStrength: 38,
    lastSeen: '8m ago',
    health: 89,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007', 'node_009', 'node_011', 'node_013'],
    range: 480,
    batteryLevel: 95,
    temperature: 26,
    uptime: '19d 11h 28m',
  },
  {
    id: 'node_016',
    name: 'Paul\'s Node',
    ownerName: 'Paul Miller',
    type: 'home',
    status: 'online',
    distance: 743,
    coordinates: { lat: 40.7048, lng: -74.0140 },
    signalStrength: 40,
    lastSeen: '6m ago',
    health: 81,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008', 'node_010', 'node_012', 'node_014'],
    range: 430,
    batteryLevel: 72,
    temperature: 35,
    uptime: '9d 6h 17m',
  },
  {
    id: 'node_017',
    name: 'Grace\'s Node',
    ownerName: 'Grace White',
    type: 'home',
    status: 'online',
    distance: 867,
    coordinates: { lat: 40.7218, lng: -73.9970 },
    signalStrength: 35,
    lastSeen: '9m ago',
    health: 94,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007', 'node_009', 'node_011', 'node_013', 'node_015'],
    range: 500,
    batteryLevel: 97,
    temperature: 25,
    uptime: '28d 14h 33m',
  },
  {
    id: 'node_018',
    name: 'Mark\'s Node',
    ownerName: 'Mark Johnson',
    type: 'home',
    status: 'online',
    distance: 832,
    coordinates: { lat: 40.7038, lng: -74.0150 },
    signalStrength: 37,
    lastSeen: '7m ago',
    health: 85,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008', 'node_010', 'node_012', 'node_014', 'node_016'],
    range: 440,
    batteryLevel: 74,
    temperature: 32,
    uptime: '12d 9h 45m',
  },
  {
    id: 'node_019',
    name: 'Lily\'s Node',
    ownerName: 'Lily Chen',
    type: 'home',
    status: 'online',
    distance: 956,
    coordinates: { lat: 40.7228, lng: -73.9960 },
    signalStrength: 32,
    lastSeen: '10m ago',
    health: 88,
    relayPath: ['node_home_001', 'node_001', 'node_003', 'node_005', 'node_007', 'node_009', 'node_011', 'node_013', 'node_015', 'node_017'],
    range: 520,
    batteryLevel: 91,
    temperature: 29,
    uptime: '16d 7h 22m',
  },
  {
    id: 'node_020',
    name: 'Ryan\'s Node',
    ownerName: 'Ryan Smith',
    type: 'home',
    status: 'online',
    distance: 921,
    coordinates: { lat: 40.7028, lng: -74.0160 },
    signalStrength: 34,
    lastSeen: '8m ago',
    health: 82,
    relayPath: ['node_home_001', 'node_002', 'node_004', 'node_006', 'node_008', 'node_010', 'node_012', 'node_014', 'node_016', 'node_018'],
    range: 450,
    batteryLevel: 70,
    temperature: 33,
    uptime: '6d 18h 31m',
  },
];

export const connectedDevices: ConnectedDevice[] = [
  {
    id: 'device_001',
    name: 'Alex\'s iPhone',
    type: 'smartphone',
    lastConnected: '2 minutes ago',
    isActive: true,
  },
  {
    id: 'device_002',
    name: 'Alex\'s iPad',
    type: 'tablet',
    lastConnected: '1 hour ago',
    isActive: false,
  },
  {
    id: 'device_003',
    name: 'Alex\'s MacBook',
    type: 'laptop',
    lastConnected: '3 hours ago',
    isActive: false,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg_001',
    content: 'Network status check - all nodes operational',
    timestamp: Date.now() - 300000, // 5 minutes ago
    nodeId: 'node_home_001',
    nodeName: 'Alex\'s Home Node',
    type: 'public',
    hops: 0,
    isDelivered: true,
    senderId: 'user_001',
    senderName: 'Alex Rivera',
    encrypted: false,
  },
  {
    id: 'msg_002',
    content: 'Emergency: Power outage in downtown area',
    timestamp: Date.now() - 600000, // 10 minutes ago
    nodeId: 'node_001',
    nodeName: 'Sarah\'s Node',
    type: 'emergency',
    hops: 1,
    isDelivered: true,
    senderId: 'user_002',
    senderName: 'Sarah Johnson',
    encrypted: true,
    helpType: 'power_outage',
    gpsLocation: '40.7138, -74.0050',
  },
  {
    id: 'msg_003',
    content: 'Weather alert: Heavy rain expected tonight',
    timestamp: Date.now() - 900000, // 15 minutes ago
    nodeId: 'node_002',
    nodeName: 'Mike\'s Node',
    type: 'public',
    hops: 1,
    isDelivered: true,
    senderId: 'user_003',
    senderName: 'Mike Chen',
    encrypted: false,
  },
];

export const helpRequests: HelpRequest[] = [
  {
    id: 'help_001',
    type: 'Medical Emergency',
    message: 'Need immediate medical assistance',
    timestamp: '2024-01-15T14:30:00Z',
    location: '40.7128, -74.0060',
    status: 'acknowledged',
    deviceId: 'SPD-7X8K9L2M',
  },
  {
    id: 'help_002',
    type: 'Power Outage',
    message: 'Power outage in downtown area',
    timestamp: '2024-01-15T13:45:00Z',
    location: '40.7138, -74.0050',
    status: 'resolved',
    deviceId: 'SPD-7X8K9L2M',
  },
]; 