import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

interface ButtonPropsType {
  title: string;
  onPress(): void;
  backgroundColor: string;
}

const ButtonElement: React.FC<ButtonPropsType> = ({
  title,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, {backgroundColor}]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 60,
    height: 60,
    padding: 10,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ButtonElement;
