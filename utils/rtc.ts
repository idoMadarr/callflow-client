import {mediaDevices} from 'react-native-webrtc';

interface SourceStreamType {
  deviceId: string;
  facing: string;
  groupId: string;
  kind: string;
  label: string;
}

let mediaConstraints = {
  audio: true,
  video: {
    frameRate: 30,
    facingMode: 'user',
  },
};

export default class WebRTC {
  static async getStream() {
    let isFrontCam: boolean = true;

    const sourceStream =
      (await mediaDevices.enumerateDevices()) as SourceStreamType[];

    let videoSourceId: string = '';

    sourceStream.forEach(source => {
      if (
        source.kind === 'videoinput' &&
        source.facing === (isFrontCam ? 'front' : 'environment')
      ) {
        videoSourceId = source.deviceId;
      }
    });

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        video: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFrontCam ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });

    if (typeof stream != 'boolean') {
      return stream;
    }
    return null;
  }

  static async stopStream(stream: any) {
    stream.release();
  }
}

/* 
sourceStream:
[{
    "deviceId": "0",
    "facing": "environment",
    "groupId": "",
    "kind": "videoinput",
    "label": "0"
}, {
    "deviceId": "1",
    "facing": "front",
    "groupId": "",
    "kind": "videoinput",
    "label": "1"
}, {
    "deviceId": "audio-1",
    "groupId": "",
    "kind": "audioinput",
    "label": "Audio"
}]
*/
