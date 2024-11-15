import React, {useState, useRef, Fragment} from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TextInputContainer from '../components/TextInputContainer';

function JoinScreen({}) {
  const [type, setType] = useState('JOIN');

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );

  const otherUserId = useRef<string | null>(null);

  const onCall = () => {
    setType('OUTGOING_CALL');
  };

  return (
    <KeyboardAvoidingView behavior={'height'} style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Fragment>
          <View style={styles.callerContainer}>
            <Text style={styles.text}>Your Caller ID</Text>
            <View>
              <Text style={styles.text}>{callerId}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Enter call id of another user</Text>
            <TextInputContainer
              placeholder={'Enter Caller ID'}
              value={otherUserId.current}
              setValue={text => {
                otherUserId.current = text;
              }}
              keyboardType={'number-pad'}
            />
            <TouchableOpacity onPress={onCall} style={styles.callButton}>
              <Text style={styles.buttonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  callerContainer: {
    padding: 35,
    backgroundColor: '#1A1C22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  inputContainer: {
    backgroundColor: '#1A1C22',
    padding: 40,
    marginTop: 25,
    justifyContent: 'center',
    borderRadius: 14,
  },
  callButton: {
    height: 50,
    backgroundColor: '#5568FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default JoinScreen;
