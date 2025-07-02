import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AnaSayfa() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Duygu Takip Uygulamasına Hoşgeldin!</Text>
      <Image
        source={{ uri: 'https://i.imgur.com/your-image-url.jpg' }}
        style={styles.image}
      />
      <Text style={styles.description}>
        Bu uygulama ile ruh halinizi kolayca kaydedebilir, geçmiş duygularınızı analiz edebilir ve gelişiminizi takip edebilirsiniz. Haydi başlayalım!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA', // açık soft renk
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#00796B',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#004D40',
  },
});
