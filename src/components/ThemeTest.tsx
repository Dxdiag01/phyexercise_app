import React from 'react';
import { ScrollView } from 'react-native';
import { Text, YStack, XStack, Button } from 'tamagui';

export const ThemeTest = () => {
  return (
    <ScrollView>
      <YStack padding="$md" space="$md">
        <Text fontFamily="$heading" fontSize={24} fontWeight="700">
          Başlık 1 (Poppins Bold)
        </Text>
        
        <Text fontFamily="$heading" fontSize={20} fontWeight="600">
          Başlık 2 (Poppins SemiBold)
        </Text>
        
        <Text fontFamily="$heading" fontSize={18} fontWeight="500">
          Başlık 3 (Poppins Medium)
        </Text>
        
        <Text fontFamily="$body" fontSize={16}>
          Bu bir body metnidir (Inter Regular). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        
        <Text fontFamily="$body" fontSize={14}>
          Bu bir küçük metindir (Inter Regular). Lorem ipsum dolor sit amet.
        </Text>
        
        <XStack space="$sm">
          <Button backgroundColor="$primary" color="white">
            Primary Button
          </Button>
          
          <Button backgroundColor="transparent" borderColor="$primary" borderWidth={1} color="$primary">
            Secondary Button
          </Button>
        </XStack>
        
        <YStack 
          backgroundColor="$background" 
          padding="$md" 
          borderRadius={12}
          borderWidth={1}
          borderColor="$border"
        >
          <Text fontFamily="$heading" fontSize={18} fontWeight="600">
            Kart Başlığı
          </Text>
          <Text fontFamily="$body" fontSize={16}>
            Bu bir kart içeriğidir. Arka plan ve border renkleri tema sisteminden gelmektedir.
          </Text>
        </YStack>
      </YStack>
    </ScrollView>
  );
}; 