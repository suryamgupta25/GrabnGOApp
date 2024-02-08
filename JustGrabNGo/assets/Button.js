import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    margin: 2,
    width: '75%',
    elevation: 3,
    backgroundColor: '#ff6666',
    // alignSelf: "center"
    flexDirection: "row"
  },
  text: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
