import { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export const usePulse = () => {
  const scale = useSharedValue(1);

  const startPulse = () => {
    scale.value = withRepeat(withTiming(1.05, { duration: 1500 }), -1, true);
  };

  const stopPulse = () => {
    scale.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { startPulse, stopPulse, animatedStyle };
};