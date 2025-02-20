import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, Card, XStack, Button, Stack, Theme, Accordion } from 'tamagui';
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ExternalLink } from '@tamagui/lucide-icons';

const faqItems = [
  {
    question: 'Egzersizleri nasıl yapmalıyım?',
    answer: 'Egzersizleri video rehberlerini takip ederek, belirtilen süre ve tekrar sayısına uygun şekilde yapmalısınız. Herhangi bir ağrı durumunda egzersizi sonlandırın ve uzmanınıza danışın.'
  },
  {
    question: 'İlerleme takibini nasıl yapabilirim?',
    answer: 'İlerleme sekmesinden günlük, haftalık ve aylık istatistiklerinizi görüntüleyebilir, ağrı seviyenizi kaydedebilir ve hedeflerinizi takip edebilirsiniz.'
  },
  {
    question: 'Uzmanımla nasıl iletişime geçebilirim?',
    answer: 'Uygulama üzerinden mesajlaşma veya görüntülü görüşme özelliklerini kullanarak uzmanınızla iletişime geçebilirsiniz. Acil durumlarda doğrudan telefon ile ulaşmanız önerilir.'
  },
  {
    question: 'Bildirim ayarlarını nasıl değiştirebilirim?',
    answer: 'Profil > Ayarlar > Bildirimler menüsünden bildirim tercihlerinizi özelleştirebilirsiniz.'
  },
];

const contactInfo = {
  email: 'destek@phyexercise.com',
  phone: '+90 850 123 4567',
  workingHours: 'Hafta içi 09:00 - 18:00',
};

export const SupportScreen = () => {
  return (
    <Theme name="light">
      <ScrollView>
        <YStack f={1} backgroundColor="$background" padding="$4" space="$4">
          {/* Sık Sorulan Sorular */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <HelpCircle size={24} color="$blue10" />
                <Text fontSize={24} fontWeight="bold">
                  Sık Sorulan Sorular
                </Text>
              </XStack>

              <Accordion type="multiple">
                {faqItems.map((item, index) => (
                  <Accordion.Item key={index} value={`item-${index}`}>
                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                      {({ open }: { open: boolean }) => (
                        <>
                          <Text fontSize="$4" fontWeight="500" flex={1} marginRight="$2">
                            {item.question}
                          </Text>
                          <ChevronDown
                            size={20}
                            style={{
                              transform: [{ rotate: open ? '180deg' : '0deg' }],
                            }}
                          />
                        </>
                      )}
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <Text fontSize="$3" color="$gray11" marginTop="$2">
                        {item.answer}
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Stack>
          </Card>

          {/* İletişim Bilgileri */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <XStack alignItems="center" space="$2">
                <MessageCircle size={24} color="$blue10" />
                <Text fontSize={24} fontWeight="bold">
                  İletişim
                </Text>
              </XStack>

              <Stack space="$3">
                <XStack space="$2" alignItems="center">
                  <Mail size={20} color="$gray11" />
                  <Text fontSize="$4">{contactInfo.email}</Text>
                </XStack>

                <XStack space="$2" alignItems="center">
                  <Phone size={20} color="$gray11" />
                  <Text fontSize="$4">{contactInfo.phone}</Text>
                </XStack>

                <Text fontSize="$3" color="$gray11">
                  Çalışma Saatleri: {contactInfo.workingHours}
                </Text>
              </Stack>

              <Button
                size="$4"
                icon={MessageCircle}
                themeInverse
                marginTop="$2"
              >
                Mesaj Gönder
              </Button>
            </Stack>
          </Card>

          {/* Yardımcı Linkler */}
          <Card bordered padding="$4">
            <Stack space="$4">
              <Text fontSize={24} fontWeight="bold">
                Yardımcı Linkler
              </Text>

              <Button
                size="$4"
                icon={ExternalLink}
                backgroundColor="$gray5"
                color="$gray11"
              >
                Kullanım Kılavuzu
              </Button>

              <Button
                size="$4"
                icon={ExternalLink}
                backgroundColor="$gray5"
                color="$gray11"
              >
                Video Rehberler
              </Button>

              <Button
                size="$4"
                icon={ExternalLink}
                backgroundColor="$gray5"
                color="$gray11"
              >
                Gizlilik Politikası
              </Button>
            </Stack>
          </Card>

          {/* Versiyon Bilgisi */}
          <Text
            color="$gray10"
            fontSize="$2"
            textAlign="center"
            marginTop="$2"
          >
            PhyExercise v1.0.0
          </Text>
        </YStack>
      </ScrollView>
    </Theme>
  );
};

export default SupportScreen; 