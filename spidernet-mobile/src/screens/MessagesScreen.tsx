import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MessagesScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://192.168.0.104:4000/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load messages');
        setLoading(false);
      });
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const res = await fetch('http://192.168.0.104:4000/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: newMessage,
            nodeId: 'node_home_001',
            nodeName: "Alex's Home Node",
            type: 'public',
            senderId: 'user_001',
            senderName: 'Alex Rivera',
            encrypted: false,
          }),
        });
        const data = await res.json();
        if (data.status === 'received') {
          setMessages([{ id: data.id, content: newMessage, nodeId: 'node_home_001', nodeName: "Alex's Home Node", type: 'public', senderId: 'user_001', senderName: 'Alex Rivera', encrypted: false, timestamp: Date.now(), hops: 0, isDelivered: true }, ...messages]);
          setNewMessage('');
        }
      } catch (e) {
        setError('Failed to send message');
      }
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isOwnMessage = item.senderId === 'user_001';
    const isEmergency = item.type === 'emergency';

    return (
      <View style={[styles.messageContainer, isOwnMessage && styles.ownMessage]}>
        <LinearGradient
          colors={
            isEmergency
              ? ['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.2)']
              : isOwnMessage
              ? ['rgba(6, 182, 212, 0.2)', 'rgba(8, 145, 178, 0.2)']
              : ['rgba(55, 65, 81, 0.2)', 'rgba(31, 41, 55, 0.2)']
          }
          style={[
            styles.messageBubble,
            isEmergency && styles.emergencyMessage,
          ]}
        >
          <View style={styles.messageHeader}>
            <Text style={styles.senderName}>{item.senderName}</Text>
            <View style={styles.messageMeta}>
              {item.encrypted && (
                <Ionicons name="lock-closed" size={12} color="#9CA3AF" />
              )}
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
          </View>
          
          <Text style={styles.messageContent}>{item.content}</Text>
          
          <View style={styles.messageFooter}>
            <Text style={styles.nodeName}>{item.nodeName}</Text>
            <Text style={styles.hops}>• {item.hops} hops</Text>
            {item.isDelivered && (
              <Ionicons name="checkmark-done" size={12} color="#4ADE80" />
            )}
          </View>
        </LinearGradient>
      </View>
    );
  };

  const MessageInput = () => (
    <View style={styles.inputContainer}>
      <LinearGradient
        colors={['rgba(31, 41, 55, 0.9)', 'rgba(17, 24, 39, 0.9)']}
        style={styles.inputGradient}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={newMessage.trim() ? '#06B6D4' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const NetworkStatus = () => (
    <View style={styles.networkStatus}>
      <LinearGradient
        colors={['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.2)']}
        style={styles.statusGradient}
      >
        <View style={styles.statusContent}>
          <Ionicons name="wifi" size={16} color="#4ADE80" />
          <Text style={styles.statusText}>Network Active • 12 nodes connected</Text>
        </View>
      </LinearGradient>
    </View>
  );

  if (loading) return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text style={styles.errorText}>{error}</Text></View>;
  if (!messages.length) return <View style={styles.container}><Text style={styles.loadingText}>No messages</Text></View>;

  return (
    <LinearGradient
      colors={['#111827', '#1F2937']}
      style={styles.container}
    >
      <NetworkStatus />
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        inverted
      />
      
      <MessageInput />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  networkStatus: {
    padding: 16,
    paddingBottom: 8,
  },
  statusGradient: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.3)',
  },
  emergencyMessage: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    color: '#9CA3AF',
    fontSize: 11,
    marginLeft: 4,
  },
  messageContent: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nodeName: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  hops: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  inputContainer: {
    padding: 16,
    paddingTop: 8,
  },
  inputGradient: {
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.5)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(55, 65, 81, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MessagesScreen; 