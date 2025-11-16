import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import CallInterface from '../ call/CallInterface';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'astrologer';
  time: string;
};



export default function ChatScreen({ route, navigation }: any) {
  const { astrologer } = route.params;
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'in-call'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [message, setMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const ringtoneRef = useRef<any>(null);
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am your astrologer. How can I help you today?',
      sender: 'astrologer',
      time: '10:00 AM',
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const startCall = () => {
    setCallState('ringing');
    
    // Show calling UI
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // Start ripple animation
    const ripple = Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    ripple.start();

    // Simulate call being answered after 2-4 seconds
    const answerTime = 2000 + Math.random() * 2000;
    ringtoneRef.current = setTimeout(() => {
      ripple.stop();
      setCallState('in-call');
      const startTime = Date.now();
      const timer = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }, answerTime);

    return () => {
      ripple.stop();
      if (ringtoneRef.current) {
        clearTimeout(ringtoneRef.current);
      }
    };
  };

  const endCall = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rippleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCallState('idle');
      setCallDuration(0);
      if (ringtoneRef.current) {
        clearTimeout(ringtoneRef.current);
      }
    });
  };



  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate astrologer reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message. I am analyzing your query...',
        sender: 'astrologer',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#1A0855' }}
      edges={['top', 'bottom']}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image source={{ uri: astrologer.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.astrologerName}>{astrologer.name}</Text>
              <Text style={styles.astrologerStatus}>
                {astrologer.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={startCall}
            >
              <Text style={styles.iconText}>📞</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={{ padding: 16 }}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === 'user'
                  ? styles.userBubble
                  : styles.astrologerBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timeText}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#888"
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Call Interface */}
        <CallInterface
          astrologer={astrologer}
          callState={callState}
          callDuration={callDuration}
          onEndCall={endCall}
          rippleAnim={rippleAnim}
          fadeAnim={fadeAnim}
          scaleAnim={scaleAnim}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0855' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D1B69',
    backgroundColor: '#1A0855',
  },
  backButton: { marginRight: 12 },
  backButtonText: { color: '#fff', fontSize: 24 },
  headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FCD34D',
  },
  astrologerName: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  astrologerStatus: { color: '#4CAF50', fontSize: 12 },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 16 },
  iconText: { fontSize: 20 },
  messagesContainer: { flex: 1, backgroundColor: '#150A37' },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    backgroundColor: '#2D1B69',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  astrologerBubble: {
    backgroundColor: '#2D1B69',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: { color: '#fff', fontSize: 16, marginBottom: 4 },
  timeText: { color: '#888', fontSize: 10, textAlign: 'right' },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1A0855',
    borderTopWidth: 1,
    borderTopColor: '#2D1B69',
  },
  input: {
    flex: 1,
    backgroundColor: '#2D1B69',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    maxHeight: 120,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#FCD34D',
    borderRadius: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: { color: '#000', fontWeight: 'bold' },
  
});
