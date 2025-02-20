import React from 'react';
import { Image } from 'react-native';
import { Card, Text, YStack, XStack, Button } from 'tamagui';
import { Timer, Repeat, Info } from '@tamagui/lucide-icons';

interface ExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  repetitions: string;
  imageUrl: string;
  onPress: () => void;
  onInfoPress: () => void;
}

const ExerciseCard = ({
  title,
  description,
  duration,
  repetitions,
  imageUrl,
  onPress,
  onInfoPress,
}: ExerciseCardProps) => {
  return (
    <Card
      elevate
      bordered
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      onPress={onPress}
    >
      <Card.Header padded>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
      </Card.Header>
      
      <YStack space="$2" padding="$4">
        <Text fontSize="$6" fontWeight="bold">{title}</Text>
        <Text fontSize="$4" color="$gray11">{description}</Text>
        
        <XStack space="$4" marginTop="$2">
          <XStack space="$2" alignItems="center">
            <Timer size={20} />
            <Text fontSize="$4">{duration}</Text>
          </XStack>
          
          <XStack space="$2" alignItems="center">
            <Repeat size={20} />
            <Text fontSize="$4">{repetitions}</Text>
          </XStack>
        </XStack>
        
        <Button
          icon={Info}
          variant="outlined"
          onPress={onInfoPress}
          marginTop="$2"
        >
          Detaylı Bilgi
        </Button>
      </YStack>
    </Card>
  );
};

export default ExerciseCard; 