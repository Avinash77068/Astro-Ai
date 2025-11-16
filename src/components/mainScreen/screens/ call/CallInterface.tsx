import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

type CallInterfaceProps = {
  astrologer: {
    name: string;
    avatar: string;
  };
  callState: 'idle' | 'ringing' | 'in-call';
  callDuration: number;
  onEndCall: () => void;
  rippleAnim: Animated.Value;
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  rippleAnim: any;
  fadeAnim: any;
  scaleAnim: any;
};

const CallInterface: React.FC<CallInterfaceProps> = ({
  astrologer,
  callState,
  callDuration,
  onEndCall,
  rippleAnim,
  fadeAnim,
  scaleAnim,
}) => {
  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (callState === 'idle') return null;

  return (
    <Animated.View
    <Animated.View 
      style={[
        styles.callContainer,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.callHeader}>
        <View style={styles.astrologerAvatarContainer}>
          <Image
            source={{ uri: astrologer.avatar }}
            style={[
              styles.astrologerAvatar,
              callState === 'ringing' && styles.ringingAvatar,
            ]}
          />
          {callState === 'ringing' && (
            <Animated.View
              style={[
                styles.rippleEffect,
                {
                  opacity: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 0],
                  }),
                  transform: [
                    {
                      scale: rippleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 1.3],
                      }),
                    },
                  ],
                },
              ]}
            />
          )}
        </View>

        <Text style={styles.callerName}>{astrologer.name}</Text>
        <Text style={styles.callStatus}>
          {callState === 'ringing' ? 'Ringing...' : 'In Call'}
        </Text>
        {callState === 'in-call' && (
          <Text style={styles.callDuration}>
            {formatCallTime(callDuration)}
          </Text>
        )}
      </View>

      <View style={styles.callControls}>
        <TouchableOpacity
          style={[styles.callButton, styles.endCallButton]}
          onPress={onEndCall}
        >
          <Text style={styles.callButtonText}>End</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  callContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A0855',
    justifyContent: 'space-between',
    padding: 24,
    zIndex: 100,
  },
  callHeader: {
    alignItems: 'center',
    marginTop: 60,
    flex: 1,
    justifyContent: 'center',
  },
  astrologerAvatarContainer: {
    position: 'relative',
    marginBottom: 30,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  astrologerAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4CAF50',
    zIndex: 2,
  },
  ringingAvatar: {
    borderColor: '#FCD34D',
  },
  rippleEffect: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(252, 211, 77, 0.3)',
    zIndex: 1,
  },
  callerName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  callStatus: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500',
  },
  callDuration: {
    color: '#FCD34D',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 40,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  callButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default CallInterface;
