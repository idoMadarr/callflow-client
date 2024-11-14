/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import ButtonElement from './components/ButtonElement';
import GettingCall from './components/GettingCall';
import VideoElement from './components/VideoElement';
import WebRTC from './utils/rtc';
import firestore from '@react-native-firebase/firestore';

let peerConstraints = {
  iceServers: [
    {
      // urls: 'stun:stun.l.google.com:19302',
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

const App = () => {
  const [localStream, setLocalStream] = useState<MediaStream | any>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection(peerConstraints),
  );

  useEffect(() => {
    initWebRTC();
  }, []);

  const initWebRTC = async () => {
    // Set local and remote streams:
    const l_stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(l_stream);

    const r_stream = new MediaStream();
    setRemoteStream(r_stream);
  };

  const settingOffer = async () => {
    // Push tracks from local stream to peer connection
    await localStream.getTracks().forEach((track: any) => {
      peerConnection.current.addTrack(track, localStream);
    });

    // Pull tracks from remote stream & add to video stream
    // @ts-ignore:
    await peerConnection.current.addEventListener('track', event => {
      console.log('track', event);
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream?.addTrack(track);
      });
    });
  };

  const createOffer = async () => {
    const callDoc = await firestore().collection('calls').doc();
    console.log(callDoc.id);
  };
  // const peerConnection = new RTCPeerConnection(peerConstraints);

  // useEffect(() => {
  //   start();
  // }, []);
  // const [gettingCall, setGettingCall] = useState(false);
  // const pc = useRef<RTCPeerConnection>();
  // const connecting = useRef(false);

  // const setupWebRTC = async () => {
  //   pc.current = new RTCPeerConnection(peerConstraints);

  //   const stream = await WebRTC.getStream();

  //   if (stream) {
  //     setLocalStream(stream);
  //     stream.getTracks().forEach(track => {
  //       console.log(track, 'track');
  //       pc.current?.addTrack(track);
  //     });
  //   }
  // };

  // const start = async () => {
  //   const stream = await mediaDevices.getUserMedia({
  //     audio: true,
  //     video: {
  //       // video: 640,
  //       // height: 480,
  //       frameRate: 30,
  //       facingMode: 'user' /* 'environment' */,
  //       // deviceId: videoSourceId,
  //     },
  //   });
  //   await setLocalStream(stream);
  //   // await createOffer();
  // };

  // const createOffer = async () => {
  //   peerConnection.current = new RTCPeerConnection(peerConstraints);

  //   const testRemote = new MediaStream();
  //   await setRemoteStream(testRemote);

  //   // @ts-ignore:
  //   await localStream.getTracks().forEach(track => {
  //     peerConnection.current?.addTrack(track, localStream);
  //   });

  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'connectionstatechange',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '1');
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'icecandidate',
  //     // @ts-ignore:
  //     async event => {
  //       if (event.candidate) {
  //         console.log('new ice candidate', event.candidate);
  //       }
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'icecandidateerror',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '2');
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'iceconnectionstatechange',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '3');
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'icegatheringstatechange',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '4');
  //     },
  //   );

  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'negotiationneeded',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '5');
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener(
  //     'signalingstatechange',
  //     // @ts-ignore:
  //     event => {
  //       console.log(event, '6');
  //     },
  //   );
  //   // @ts-ignore:
  //   await peerConnection.current.addEventListener('track', event => {
  //     console.log('track', event);

  //     // @ts-ignore:
  //     event.streams[0].getTracks().forEach(track => {
  //       // @ts-ignore:
  //       remoteStream?.addTrack();
  //     });
  //   });

  //   let offer = await peerConnection.current.createOffer({});
  //   await peerConnection.current.setLocalDescription(offer);

  //   console.log(offer, 'offer');
  // };

  // const end = async () => {
  //   if (localStream) {
  //     localStream.release();
  //     setLocalStream(null);
  //     remoteStream?.release();
  //     setRemoteStream(null);
  //   }
  // };

  return (
    <SafeAreaView style={styles.screen}>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={styles.video} />
      )}
      {remoteStream && (
        <RTCView streamURL={remoteStream.toURL()} style={styles.video} />
      )}
      <View style={styles.controller}>
        <ButtonElement
          title={'V'}
          onPress={settingOffer}
          backgroundColor={'green'}
        />
        <ButtonElement
          title={'X'}
          onPress={createOffer}
          backgroundColor={'red'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  video: {
    // position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.3,
    margin: 1,
    backgroundColor: 'red',
  },
  controller: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
});

export default App;

/*
stream: 
{
    "_id": "539ad16d-3e2f-4b6c-9674-955f4ae9486d",
    "_reactTag": "539ad16d-3e2f-4b6c-9674-955f4ae9486d",
    "_tracks": [{
        "_constraints": [Object],
        "_enabled": true,
        "_muted": false,
        "_peerConnectionId": undefined,
        "_readyState": "live",
        "_settings": [Object],
        "id": "5a10c948-09bf-4f60-b9a5-27020e2d0a42",
        "kind": "audio",
        "label": "",
        "remote": false
    }, {
        "_constraints": [Object],
        "_enabled": true,
        "_muted": false,
        "_peerConnectionId": undefined,
        "_readyState": "live",
        "_settings": [Object],
        "id": "dc6149b3-4f34-457f-babb-032dd33a45b6",
        "kind": "video",
        "label": "",
        "remote": false
    }]
}
*/
