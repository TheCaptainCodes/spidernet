import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const EMERGENCY_TYPES = [
  { key: 'medical', label: 'Medical Emergency', icon: 'medkit', color: '#60A5FA', gradient: ['rgba(59, 130, 246, 0.2)', 'rgba(6, 182, 212, 0.2)'] as [string, string] },
  { key: 'power', label: 'Power Outage', icon: 'flash', color: '#C084FC', gradient: ['rgba(168, 85, 247, 0.2)', 'rgba(147, 51, 234, 0.2)'] as [string, string] },
  { key: 'vehicle', label: 'Vehicle Issue', icon: 'car', color: '#4ADE80', gradient: ['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.2)'] as [string, string] },
  { key: 'home', label: 'Home Emergency', icon: 'home', color: '#FB923C', gradient: ['rgba(249, 115, 22, 0.2)', 'rgba(245, 101, 101, 0.2)'] as [string, string] },
  { key: 'fire', label: 'Fire', icon: 'flame', color: '#F87171', gradient: ['rgba(239, 68, 68, 0.2)', 'rgba(245, 101, 101, 0.2)'] as [string, string] },
  { key: 'police', label: 'Police', icon: 'shield', color: '#60A5FA', gradient: ['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.2)'] as [string, string] },
  { key: 'lost', label: 'Lost Person', icon: 'person', color: '#F59E42', gradient: ['rgba(251, 191, 36, 0.2)', 'rgba(251, 146, 60, 0.2)'] as [string, string] },
  { key: 'animal', label: 'Animal Issue', icon: 'paw', color: '#34D399', gradient: ['rgba(16, 185, 129, 0.2)', 'rgba(34, 197, 94, 0.2)'] as [string, string] },
  { key: 'weather', label: 'Severe Weather', icon: 'cloudy', color: '#38BDF8', gradient: ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.1)'] as [string, string] },
  { key: 'other', label: 'Other', icon: 'help-circle', color: '#A3A3A3', gradient: ['rgba(156, 163, 175, 0.2)', 'rgba(107, 114, 128, 0.2)'] as [string, string] },
];

const EmergencyScreen: React.FC = () => {
  const [isSendingSOS, setIsSendingSOS] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState(EMERGENCY_TYPES[0].key);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://192.168.0.104:4000/user').then(res => res.json()),
      fetch('http://192.168.0.104:4000/nodes').then(res => res.json()),
    ])
      .then(([userData, nodesData]) => {
        setUser(userData);
        setNodes(nodesData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load user/node info');
        setLoading(false);
      });
  }, []);

  const sendSOS = async () => {
    if (!user) return;
    Alert.alert(
      'Send Emergency SOS',
      'Are you sure you want to send an emergency SOS signal to all nearby nodes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send SOS',
          style: 'destructive',
          onPress: async () => {
            setIsSendingSOS(true);
            try {
              const homeNode = nodes.find((n: any) => n.id === user.homeNodeId) || nodes[0];
              const res = await fetch('http://192.168.0.104:4000/help', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  helpType: 'emergency',
                  helpMessage: 'EMERGENCY SOS',
                  location: homeNode?.coordinates || { lat: 0, lon: 0 },
                  nodeId: homeNode?.id || '',
                  nodeName: homeNode?.name || '',
                  timestamp: new Date().toISOString(),
                  deviceId: user.deviceId,
                }),
              });
              await res.json();
            setTimeout(() => {
              setIsSendingSOS(false);
              Alert.alert(
                'SOS Sent',
                'Emergency SOS signal has been sent to all nearby nodes. Help is on the way.',
                [{ text: 'OK' }]
              );
              }, 2000);
            } catch (e) {
              setIsSendingSOS(false);
              Alert.alert('Error', 'Failed to send SOS.');
            }
          },
        },
      ]
    );
  };

  const sendHelpRequest = async () => {
    if (!helpMessage.trim() || !user) return;
    try {
      const homeNode = nodes.find((n: any) => n.id === user.homeNodeId) || nodes[0];
      const typeObj = EMERGENCY_TYPES.find(t => t.key === selectedType);
      const res = await fetch('http://192.168.0.104:4000/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          helpType: selectedType,
          helpMessage: helpMessage,
          location: homeNode?.coordinates || { lat: 0, lon: 0 },
          nodeId: homeNode?.id || '',
          nodeName: homeNode?.name || '',
          timestamp: new Date().toISOString(),
          deviceId: user.deviceId,
          typeLabel: typeObj?.label,
        }),
      });
      await res.json();
      setRequests([
        {
        id: `help_${Date.now()}`,
          type: typeObj?.label || 'Custom',
        message: helpMessage,
        timestamp: new Date().toISOString(),
          location: `${homeNode?.coordinates.lat}, ${homeNode?.coordinates.lng}`,
          status: 'pending',
          deviceId: user.deviceId,
        },
        ...requests,
      ]);
      setHelpMessage('');
      Alert.alert('Help Request Sent', 'Your help request has been sent to the network.');
    } catch (e) {
      Alert.alert('Error', 'Failed to send help request.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FACC15';
      case 'acknowledged':
        return '#60A5FA';
      case 'resolved':
        return '#4ADE80';
      default:
        return '#9CA3AF';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'time';
      case 'acknowledged':
        return 'checkmark-circle';
      case 'resolved':
        return 'checkmark-done-circle';
      default:
        return 'help-circle';
    }
  };

  const SOSButton = () => (
    <TouchableOpacity
      style={styles.sosButton}
      onPress={sendSOS}
      disabled={isSendingSOS}
    >
      <LinearGradient
        colors={['rgba(239, 68, 68, 0.3)', 'rgba(220, 38, 38, 0.3)']}
        style={styles.sosGradient}
      >
        <View style={styles.sosContent}>
          <View style={styles.sosIcon}>
            {isSendingSOS ? (
              <View style={styles.sosSpinner} />
            ) : (
              <Ionicons name="warning" size={32} color="#F87171" />
            )}
          </View>
          <Text style={styles.sosTitle}>
            {isSendingSOS ? 'Sending SOS...' : 'EMERGENCY SOS'}
          </Text>
          <Text style={styles.sosSubtitle}>
            {isSendingSOS
              ? 'Broadcasting emergency signal'
              : 'Send emergency signal to all nearby nodes'}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const QuickHelpOptions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Help Options</Text>
      <View style={styles.helpOptions}>
        {EMERGENCY_TYPES.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={styles.helpOption}
            activeOpacity={0.85}
            onPress={() => setSelectedType(type.key)}
          >
          <LinearGradient
              colors={type.gradient}
            style={styles.helpOptionGradient}
          >
              {selectedType === type.key && (
                <View style={styles.selectedHelpOptionOverlay} pointerEvents="none" />
              )}
              <Ionicons name={type.icon as any} size={24} color={type.color} style={{ zIndex: 2 }} />
              <Text style={[styles.helpOptionText, selectedType === type.key && styles.selectedHelpOptionText]}>{type.label}</Text>
          </LinearGradient>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const CustomHelpRequest = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Custom Help Request</Text>
      <View style={styles.customHelpContainer}>
        <LinearGradient
          colors={['rgba(31, 41, 55, 0.5)', 'rgba(17, 24, 39, 0.5)']}
          style={styles.customHelpGradient}
        >
          <TextInput
            style={styles.helpInput}
            value={helpMessage}
            onChangeText={setHelpMessage}
            placeholder="Describe your emergency or need for help..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.sendHelpButton}
            onPress={sendHelpRequest}
            disabled={!helpMessage.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={helpMessage.trim() ? '#FFFFFF' : '#6B7280'}
            />
            <Text
              style={[
                styles.sendHelpText,
                { color: helpMessage.trim() ? '#FFFFFF' : '#6B7280' },
              ]}
            >
              Send Request
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );

  const HelpHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Help Requests</Text>
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {requests.map((request) => (
          <View key={request.id} style={styles.historyItem}>
            <LinearGradient
              colors={['rgba(31, 41, 55, 0.5)', 'rgba(17, 24, 39, 0.5)']}
              style={styles.historyGradient}
            >
              <View style={styles.historyHeader}>
                <View style={styles.historyLeft}>
                  <Ionicons
                    name={getStatusIcon(request.status)}
                    size={16}
                    color={getStatusColor(request.status)}
                  />
                  <Text style={styles.historyType}>{request.type}</Text>
                </View>
                <Text
                  style={[styles.historyStatus, { color: getStatusColor(request.status) }]}
                >
                  {request.status}
                </Text>
              </View>
              <Text style={styles.historyMessage}>{request.message}</Text>
              <Text style={styles.historyTime}>
                {new Date(request.timestamp).toLocaleString()}
              </Text>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  if (loading) return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>;
  if (!user) return <View style={styles.container}><Text style={styles.loadingText}>No user data</Text></View>;

  return (
    <LinearGradient
      colors={['#111827', '#1F2937']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <SOSButton />
          <QuickHelpOptions />
          <CustomHelpRequest />
          <HelpHistory />
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
  sosButton: {
    marginBottom: 24,
  },
  sosGradient: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  sosContent: {
    alignItems: 'center',
  },
  sosIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sosSpinner: {
    width: 32,
    height: 32,
    borderWidth: 3,
    borderColor: '#F87171',
    borderTopColor: 'transparent',
    borderRadius: 16,
  },
  sosTitle: {
    color: '#F87171',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  sosSubtitle: {
    color: 'rgba(248, 113, 113, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  helpOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  helpOption: {
    width: '48%',
    marginBottom: 12,
  },
  helpOptionGradient: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
  },
  helpOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  customHelpContainer: {
    marginBottom: 16,
  },
  customHelpGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  helpInput: {
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  sendHelpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  sendHelpText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  historyContainer: {
    maxHeight: 300,
  },
  historyItem: {
    marginBottom: 12,
  },
  historyGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyType: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  historyMessage: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 8,
  },
  historyTime: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedHelpOptionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,24,39,0.35)',
    borderRadius: 12,
    zIndex: 1,
  },
  selectedHelpOptionText: {
    color: '#06B6D4',
    fontWeight: 'bold',
    zIndex: 2,
  },
});

export default EmergencyScreen; 