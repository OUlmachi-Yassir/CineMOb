import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StyledTitle = () => {
  const title = "ADGE";

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {title.split('').map((letter, index) => (
          <Text key={index} style={[styles.letter, styles[`letter${index + 1}` as keyof typeof styles]]}>
            {letter}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 60,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  letter1: {
    color: '#ffffff',
    fontFamily: 'serif',
    textShadowColor: '#c00000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,

  },
  letter2: {
    color: '#c00000',
    fontStyle: 'italic',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  letter3: {
    color: '#ffffff',
    fontFamily: 'cursive',
    textShadowColor: '#c00000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,

  },
  letter4: {
    color: '#c00000',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});

export default StyledTitle;
