import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageModal } from './ImageModal';

const DEMO_IMAGES = [
  {
    title: 'Scenic Mountain',
    source: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80' },
  },
  {
    title: 'Coastal Sunset',
    source: { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  },
  {
    title: 'Neon City Night',
    source: { uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80' },
  },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<{
    source: any;
    caption: string;
  } | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <Text style={styles.title}>Image Modal Demo</Text>
          <Text style={styles.subtitle}>
            Tap any card below to launch the standalone ImageModal preview.
          </Text>

          <View style={styles.cardList}>
            {DEMO_IMAGES.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                style={styles.card}
                onPress={() =>
                  setSelectedImage({
                    source: item.source,
                    caption: item.title,
                  })
                }>
                <Image
                  source={item.source}
                  style={styles.thumbnail}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.tapPrompt}>Tap to open full modal →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ImageModal
          visible={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          source={selectedImage?.source}
          caption={selectedImage?.caption}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 20,
  },
  cardList: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  thumbnail: {
    width: 90,
    height: 90,
    backgroundColor: '#0f172a',
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  tapPrompt: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '600',
  },
});
