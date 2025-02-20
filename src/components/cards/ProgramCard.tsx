import React from 'react';
import { Card, XStack, YStack, Text, Progress, Stack } from 'tamagui';
import { Activity, Clock, ChevronRight } from '@tamagui/lucide-icons';

interface ProgramCardProps {
  title: string;
  description: string;
  exercises?: number;
  duration: string;
  progress?: number;
  icon: React.ElementType;
  backgroundColor?: string;
  iconColor?: string;
  onPress?: () => void;
}

export const ProgramCard = ({
  title,
  description,
  exercises,
  duration,
  progress,
  icon: Icon,
  backgroundColor = '$background',
  iconColor = '$blue10',
  onPress,
}: ProgramCardProps) => {
  return (
    <Card
      bordered
      padding="$4"
      pressStyle={{ scale: 0.98 }}
      backgroundColor={backgroundColor}
      borderColor={backgroundColor === '$background' ? '$borderColor' : 'transparent'}
      onPress={onPress}
      elevation={2}
    >
      <XStack space="$4" alignItems="center">
        <Stack
          backgroundColor={backgroundColor === '$background' ? '$blue2' : 'rgba(255,255,255,0.2)'}
          padding="$3"
          borderRadius="$4"
        >
          <Icon size={24} color={iconColor} />
        </Stack>
        <YStack flex={1} space="$2">
          <Text fontSize="$5" fontWeight="bold" color={backgroundColor === '$background' ? '$text' : iconColor}>
            {title}
          </Text>
          <Text fontSize="$3" color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'}>
            {description}
          </Text>
          <XStack space="$4" alignItems="center" marginTop="$1">
            {exercises && (
              <XStack space="$2" alignItems="center">
                <Activity size={16} color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'} />
                <Text fontSize="$3" color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'}>
                  {exercises} egzersiz
                </Text>
              </XStack>
            )}
            <XStack space="$2" alignItems="center">
              <Clock size={16} color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'} />
              <Text fontSize="$3" color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'}>
                {exercises ? duration : `Süre: ${duration}`}
              </Text>
            </XStack>
          </XStack>
          {progress !== undefined && (
            <Progress value={progress} backgroundColor={backgroundColor === '$background' ? '$gray5' : 'rgba(255,255,255,0.2)'} marginTop="$2">
              <Progress.Indicator backgroundColor={iconColor} />
            </Progress>
          )}
        </YStack>
        <ChevronRight size={20} color={backgroundColor === '$background' ? '$gray11' : 'rgba(255,255,255,0.8)'} />
      </XStack>
    </Card>
  );
};

export default ProgramCard; 