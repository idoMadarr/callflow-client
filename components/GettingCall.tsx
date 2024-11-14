import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import ButtonElement from './ButtonElement';

interface GettingCallPropsType {
  hangup(): void;
  join(): void;
}

const GettingCall: React.FC<GettingCallPropsType> = ({hangup, join}) => {
  return (
    <View>
      <Image source={require('../assets/images/Small.jpg')} />
      <View style={styles.controller}>
        <ButtonElement title={'V'} onPress={join} backgroundColor={'green'} />
        <ButtonElement title={'X'} onPress={hangup} backgroundColor={'red'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controller: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default GettingCall;
