import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number; // from 0 to 1
  medStatus: string;
  day: string;
  intakesLabel?: string;
};

export default function MedicineProgressCircle({
  progress,
  medStatus,
  day,
  intakesLabel = 'Intakes',
}: Props) {
  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Shared value for animation
  const animatedProgress = useSharedValue(0);

  // Animate to desired progress
  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [progress]);

  // Animated props for stroke offset
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - animatedProgress.value * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View className="items-center space-y-1">
      <Text className="text-xs text-gray-500">{intakesLabel}</Text>

      <View className="justify-center items-center">
        <Svg width={size} height={size}>
          {/* Track */}
          <Circle
            stroke="#e5e7eb"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Animated progress */}
          <AnimatedCircle
            stroke="#22c55e"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        {/* Pill + Med Status */}
        <View className="absolute items-center">
          <Text className="text-xl">💊</Text>
          <Text className="text-xs text-green-800">{medStatus}</Text>
        </View>
      </View>

      <Text className="text-xs text-gray-500">{day}</Text>
    </View>
  );
}
