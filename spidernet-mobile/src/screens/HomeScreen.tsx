import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [deviceStatus, setDeviceStatus] = useState<any>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://192.168.0.104:4000/user').then(res => res.json()),
      fetch('http://192.168.0.104:4000/device-status').then(res => res.json()),
      fetch('http://192.168.0.104:4000/nodes').then(res => res.json()),
    ])
      .then(([userData, deviceStatusData, nodesData]) => {
        setUser(userData);
        setDeviceStatus(deviceStatusData);
        setNodes(nodesData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data from backend');
        setLoading(false);
      });
  }, []);

  const handleConnect = async () => {
    if (!user || !user.homeNodeId) return;
    setIsConnecting(true);
    try {
      await fetch('http://192.168.0.104:4000/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodeId: user.homeNodeId }),
      });
    } catch (e) {}
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  if (loading) return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>;
  if (!user || !deviceStatus) return <View style={styles.container}><Text style={styles.loadingText}>No data</Text></View>;

  const ConnectionButton = () => (
    <TouchableOpacity
      onPress={handleConnect}
      disabled={isConnecting}
      style={styles.connectionButton}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          user.isConnectedToHomeNode
            ? ['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.2)']
            : ['rgba(59, 130, 246, 0.2)', 'rgba(6, 182, 212, 0.2)']
        }
        style={styles.connectionGradient}
      >
        <View style={styles.connectionContent}>
          <View style={styles.connectionLeft}>
            <Ionicons
              name={user.isConnectedToHomeNode ? 'wifi' : 'wifi-outline'}
              size={28}
              color={user.isConnectedToHomeNode ? '#4ADE80' : '#60A5FA'}
            />
            <View style={styles.connectionText}>
              <Text style={styles.connectionTitle}>
                {user.isConnectedToHomeNode ? 'Connected' : 'Disconnected'}
              </Text>
              <Text style={styles.connectionSubtitle}>
                {user.isConnectedToHomeNode
                  ? `Connected to ${nodes.find(node => node.id === user.homeNodeId)?.name}`
                  : 'Tap to connect via Bluetooth'}
              </Text>
            </View>
          </View>
          <View style={styles.connectionIcon}>
            {isConnecting ? (
              <View style={styles.loadingSpinner} />
            ) : (
              <Ionicons name="flash" size={24} color="#FFFFFF" />
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const EmergencyButton = () => (
    <TouchableOpacity
      style={styles.emergencyButton}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Emergency')}
    >
      <LinearGradient
        colors={['rgba(239, 68, 68, 0.2)', 'rgba(249, 115, 22, 0.2)']}
        style={styles.emergencyGradient}
      >
        <View style={styles.emergencyContent}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="warning" size={28} color="#F87171" />
          </View>
          <View style={styles.emergencyText}>
            <Text style={styles.emergencyTitle}>Emergency SOS</Text>
            <Text style={styles.emergencySubtitle}>
              Send help request via mesh network
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const MAP_SIZE = width - 32;

  const NetworkMap = () => {
    if (!user || !nodes.length) return null;
    // Find home node
    const homeNode = nodes.find((n: any) => n.id === user.homeNodeId) || nodes[0];
    const otherNodes = nodes.filter((n: any) => n.id !== homeNode.id);
    // Reduce and randomize nodes for a more organic web
    let webNodes = [...otherNodes];
    while (webNodes.length < 8) {
      webNodes = webNodes.concat(
        otherNodes.map((n: any, i: number) => ({ ...n, id: n.id + '_d' + i, distance: n.distance + Math.random() * 100 + 50 }))
      );
      if (webNodes.length > 10) webNodes = webNodes.slice(0, 10);
    }
    // Randomize angles and distances, keep nodes within visible area
    const center = MAP_SIZE / 2;
    const minR = 90;
    const maxR = MAP_SIZE / 2 - 36;
    const nodePositions = webNodes.map((node, i) => {
      // Add a little more randomization for organic look
      const angle = (2 * Math.PI * i) / webNodes.length + (Math.random() - 0.5) * 0.25;
      const r = minR + Math.random() * (maxR - minR) * 0.85;
      return {
        ...node,
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
        r,
        angle,
      };
    });
    return (
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <Svg width={MAP_SIZE} height={MAP_SIZE}>
          {/* Draw subtle concentric web rings */}
          {[1, 2, 3].map((ring) => (
            <Circle
              key={`ring-${ring}`}
              cx={center}
              cy={center}
              r={minR + ((maxR - minR) * ring) / 3}
              stroke="#06B6D4"
              strokeWidth={0.7}
              opacity={0.10}
              fill="none"
            />
          ))}
          {/* Draw web lines */}
          {nodePositions.map((node) => (
            <Line
              key={`line-${node.id}`}
              x1={center}
              y1={center}
              x2={node.x}
              y2={node.y}
              stroke="#06B6D4"
              strokeWidth={0.8}
              opacity={0.18}
            />
          ))}
          {/* Draw nodes as small emoji with colored background */}
          {nodePositions.map((node) => (
            <React.Fragment key={node.id}>
              <Circle
                cx={node.x}
                cy={node.y}
                r={14}
                fill="#06B6D4"
                stroke="#fff"
                strokeWidth={2}
              />
              <SvgText
                x={node.x}
                y={node.y + 7}
                fontSize="18"
                fontWeight="bold"
                textAnchor="middle"
                fill="#fff"
                onPress={() => setSelectedNode(node)}
              >
                🕸️
              </SvgText>
            </React.Fragment>
          ))}
          {/* Draw home node at center with glow */}
          <Circle cx={center} cy={center} r={32} fill="#10B981" opacity={0.18} />
          <Circle cx={center} cy={center} r={20} fill="#10B981" stroke="#fff" strokeWidth={4} />
          <SvgText
            x={center}
            y={center + 7}
            fill="#fff"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
          >
            Home
          </SvgText>
        </Svg>
        <Text style={{ color: '#fff', marginTop: 8, fontSize: 14 }}>Nearby Nodes (spider web layout)</Text>
        <Modal
          visible={!!selectedNode}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedNode(null)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#1F2937', borderRadius: 16, padding: 24, minWidth: 260 }}>
              <Text style={{ color: '#06B6D4', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{selectedNode?.name}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Owner: {selectedNode?.ownerName}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Status: {selectedNode?.status}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Battery: {selectedNode?.batteryLevel}%</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Temp: {selectedNode?.temperature}°C</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Signal: {selectedNode?.signalStrength}%</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Last Seen: {selectedNode?.lastSeen}</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Distance: {Math.round(selectedNode?.distance)}m</Text>
              <Text style={{ color: '#fff', marginBottom: 4 }}>Uptime: {selectedNode?.uptime}</Text>
              <TouchableOpacity
                style={{ marginTop: 16, alignSelf: 'center', backgroundColor: '#06B6D4', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 }}
                onPress={() => setSelectedNode(null)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const DeviceHealth = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Device Status</Text>
      <View style={styles.deviceHealthContainer}>
        <View style={styles.healthGrid}>
          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
              <Ionicons name="pulse" size={20} color="#4ADE80" />
            </View>
            <View style={styles.healthText}>
              <Text style={[styles.healthValue, { color: '#4ADE80' }]}>
                {deviceStatus.health}%
              </Text>
              <Text style={styles.healthLabel}>Health</Text>
            </View>
          </View>

          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
              <Ionicons name="thermometer" size={20} color="#60A5FA" />
            </View>
            <View style={styles.healthText}>
              <Text style={[styles.healthValue, { color: '#60A5FA' }]}>
                {deviceStatus.temperature}°C
              </Text>
              <Text style={styles.healthLabel}>Temp</Text>
            </View>
          </View>

          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(234, 179, 8, 0.2)' }]}>
              <Ionicons name="battery-charging" size={20} color="#FACC15" />
            </View>
            <View style={styles.healthText}>
              <Text style={[styles.healthValue, { color: '#FACC15' }]}>
                {deviceStatus.batteryLevel}%
              </Text>
              <Text style={styles.healthLabel}>Battery</Text>
            </View>
          </View>

          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(168, 85, 247, 0.2)' }]}>
              <Ionicons name="cellular" size={20} color="#C084FC" />
            </View>
            <View style={styles.healthText}>
              <Text style={[styles.healthValue, { color: '#C084FC' }]}>
                {deviceStatus.signalStrength}%
              </Text>
              <Text style={styles.healthLabel}>Signal</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const NetworkStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Network Overview</Text>
      <View style={styles.statsContainer}>
        <NetworkMap />
      </View>
        
    </View>
  );

  return (
    <LinearGradient
      colors={['#111827', '#1F2937']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ConnectionButton />
          <EmergencyButton />
          <DeviceHealth />
          <NetworkStats />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  connectionButton: {
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  connectionGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  connectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  connectionText: {
    marginLeft: 16,
    flex: 1,
  },
  connectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  connectionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  connectionIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
    borderRadius: 14,
  },
  emergencyButton: {
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  emergencyGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    color: '#F87171',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emergencySubtitle: {
    color: 'rgba(248, 113, 113, 0.8)',
    fontSize: 16,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  deviceHealthContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.3)',
    borderRadius: 10,
    padding: 16,
    width: '48%',
    marginBottom: 10,
  },
  healthIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  healthText: {
    flex: 1,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  healthLabel: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 18,
  },
  statValue: {
    color: '#06B6D4',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#D1D5DB',
    fontSize: 16,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center',
  },
  errorText: {
    color: '#F87171',
    fontSize: 16,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default HomeScreen; 