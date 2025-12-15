import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

type GameButtonProps = {
    title: string,
    onPress: () => void,
    colorFrom: string,
    colorTo: string
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GameButton = ({ title, onPress, colorFrom, colorTo } : GameButtonProps ) => {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [colorFrom, colorTo]
    );

    return {
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    // Animate to 1 when pressed down
    pressed.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    // Animate back to 0 when released
    pressed.value = withTiming(0, { duration: 150 });
  };

  return (
    <AnimatedPressable
      style={[styles.button, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minWidth: 150,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameButton;