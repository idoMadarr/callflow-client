import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {MediaStream, RTCView} from 'react-native-webrtc';
import ButtonElement from './ButtonElement';

interface VideoElementPropsType {
  hangup(): void;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

const ButtonContainer = ({hangup}: {hangup(): void}) => {
  return (
    <View>
      {/* <ButtonElement title={'Done'} backgroundColor={'red'} onPress={hangup} /> */}
    </View>
  );
};

const VideoElement: React.FC<VideoElementPropsType> = ({
  hangup,
  localStream,
  remoteStream,
}) => {
  // On call we will just display the local stream of the current user
  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
        <ButtonContainer hangup={hangup} />
      </View>
    );
  }

  // Once the call is connected we will display local and remote streams
  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={'cover'}
          style={styles.videoLocal}
        />
        <RTCView
          streamURL={remoteStream.toURL()}
          objectFit={'cover'}
          style={styles.video}
        />
      </View>
    );
  }

  return (
    <View>
      <ButtonContainer hangup={hangup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 6,
  },
});

export default VideoElement;
