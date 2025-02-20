import React, { useState, useEffect } from 'react';
import { Image, ImageProps, ActivityIndicator, View } from 'react-native';
import { styled } from 'tamagui';
import {
  checkImageCache,
  resizeImage,
  IMAGE_SIZES,
  IMAGE_QUALITY,
  createOptimizedSource
} from '../../utils/imageOptimization';

const LoadingContainer = styled(View, {
  justifyContent: 'center',
  alignItems: 'center',
});

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  size: keyof typeof IMAGE_SIZES;
  quality?: keyof typeof IMAGE_QUALITY;
  showLoadingIndicator?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  uri,
  size,
  quality = 'high',
  showLoadingIndicator = true,
  ...props
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        // Önbellekte var mı kontrol et
        const cachedUri = await checkImageCache(uri);
        // Boyutlandır
        const resizedUri = await resizeImage(cachedUri, size, quality);
        setImageUri(resizedUri);
      } catch (error) {
        console.error('Görüntü yükleme hatası:', error);
        setImageUri(uri); // Hata durumunda orijinal URI'yi kullan
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [uri, size, quality]);

  if (!imageUri) {
    return showLoadingIndicator ? (
      <LoadingContainer style={props.style}>
        <ActivityIndicator size="small" color="#0052CC" />
      </LoadingContainer>
    ) : null;
  }

  return (
    <Image
      {...props}
      source={createOptimizedSource(imageUri, size)}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
    />
  );
};

export default OptimizedImage; 