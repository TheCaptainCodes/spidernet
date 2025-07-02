import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [deviceStatus, setDeviceStatus] = useState<any>(null);
  const [connectedDevices, setConnectedDevices] = useState<any[]>([]);
  const [autoRelay, setAutoRelay] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://192.168.0.104:4000/user').then(res => res.json()),
      fetch('http://192.168.0.104:4000/device-status').then(res => res.json()),
      fetch('http://192.168.0.104:4000/connected-devices').then(res => res.json()),
    ])
      .then(([userData, deviceStatusData, connectedDevicesData]) => {
        setUser(userData);
        setDeviceStatus(deviceStatusData);
        setConnectedDevices(connectedDevicesData);
        setAutoRelay(userData.autoRelay);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>;
  if (!user || !deviceStatus) return <View style={styles.container}><Text style={styles.loadingText}>No data</Text></View>;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            Alert.alert('Logged Out', 'You have been successfully logged out.');
          },
        },
      ]
    );
  };

  const UserProfile = () => (
    <View style={styles.section}>
      <LinearGradient
        colors={['rgba(6, 182, 212, 0.2)', 'rgba(8, 145, 178, 0.2)']}
        style={styles.profileGradient}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#06B6D4" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.deviceId}>{user.deviceId}</Text>
            <Text style={styles.nodeName}>{user.nodeName}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const DeviceInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Device Information</Text>
      <View style={styles.deviceInfoContainer}>
        <LinearGradient
          colors={['rgba(31, 41, 55, 0.5)', 'rgba(17, 24, 39, 0.5)']}
          style={styles.deviceInfoGradient}
        >
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="hardware-chip" size={20} color="#06B6D4" />
              <Text style={styles.infoLabel}>Device ID</Text>
            </View>
            <Text style={styles.infoValue}>{user.deviceId}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="wifi" size={20} color="#4ADE80" />
              <Text style={styles.infoLabel}>Connection Status</Text>
            </View>
            <Text style={[styles.infoValue, { color: '#4ADE80' }]}>
              {user.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="time" size={20} color="#FACC15" />
              <Text style={styles.infoLabel}>Uptime</Text>
            </View>
            <Text style={styles.infoValue}>{deviceStatus.uptime}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="cloud-upload" size={20} color="#C084FC" />
              <Text style={styles.infoLabel}>Data Transferred</Text>
            </View>
            <Text style={styles.infoValue}>{deviceStatus.dataTransferred}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );

  const ConnectedDevices = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Connected Devices</Text>
      <View style={styles.devicesContainer}>
        {connectedDevices.map((device) => (
          <View key={device.id} style={styles.deviceItem}>
            <LinearGradient
              colors={['rgba(31, 41, 55, 0.5)', 'rgba(17, 24, 39, 0.5)']}
              style={styles.deviceItemGradient}
            >
              <View style={styles.deviceItemLeft}>
                <Ionicons
                  name={
                    device.type === 'smartphone'
                      ? 'phone-portrait'
                      : device.type === 'tablet'
                      ? 'tablet-portrait'
                      : 'laptop'
                  }
                  size={24}
                  color={device.isActive ? '#4ADE80' : '#9CA3AF'}
                />
                <View style={styles.deviceItemInfo}>
                  <Text style={styles.deviceItemName}>{device.name}</Text>
                  <Text style={styles.deviceItemType}>{device.type}</Text>
                  <Text style={styles.deviceItemTime}>
                    Last connected: {device.lastConnected}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.deviceStatus,
                  { backgroundColor: device.isActive ? '#4ADE80' : '#6B7280' },
                ]}
              />
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );

  const Settings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.settingsContainer}>
        <LinearGradient
          colors={['rgba(31, 41, 55, 0.5)', 'rgba(17, 24, 39, 0.5)']}
          style={styles.settingsGradient}
        >
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="repeat" size={20} color="#06B6D4" />
              <Text style={styles.settingLabel}>Auto Relay</Text>
            </View>
            <Switch
              value={autoRelay}
              onValueChange={setAutoRelay}
              trackColor={{ false: '#374151', true: '#06B6D4' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#FACC15" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#374151', true: '#FACC15' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="location" size={20} color="#4ADE80" />
              <Text style={styles.settingLabel}>Location Sharing</Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: '#374151', true: '#4ADE80' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );

  const Actions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.2)', 'rgba(6, 182, 212, 0.2)']}
            style={styles.actionGradient}
          >
            <Ionicons name="refresh" size={20} color="#60A5FA" />
            <Text style={styles.actionText}>Refresh Network</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={['rgba(168, 85, 247, 0.2)', 'rgba(147, 51, 234, 0.2)']}
            style={styles.actionGradient}
          >
            <Ionicons name="settings" size={20} color="#C084FC" />
            <Text style={styles.actionText}>Advanced Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
          <LinearGradient
            colors={['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.2)']}
            style={styles.actionGradient}
          >
            <Ionicons name="log-out" size={20} color="#F87171" />
            <Text style={styles.actionText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
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
          <UserProfile />
          <DeviceInfo />
          <ConnectedDevices />
          <Settings />
          <Actions />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  profileGradient: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deviceId: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  nodeName: {
    color: '#06B6D4',
    fontSize: 14,
    fontWeight: '500',
  },
  deviceInfoContainer: {
    marginBottom: 16,
  },
  deviceInfoGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    color: '#D1D5DB',
    fontSize: 14,
    marginLeft: 8,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  devicesContainer: {
    gap: 12,
  },
  deviceItem: {
    marginBottom: 8,
  },
  deviceItemGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  deviceItemName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  deviceItemType: {
    color: '#9CA3AF',
    fontSize: 12,
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  deviceItemTime: {
    color: '#6B7280',
    fontSize: 11,
  },
  deviceStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  settingsContainer: {
    marginBottom: 16,
  },
  settingsGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  actionGradient: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen; 