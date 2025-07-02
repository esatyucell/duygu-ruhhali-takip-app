
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          // route.name doğru büyük/küçük harfe göre kontrol edilmeli
          if (route.name === 'index') {
            iconName = 'home-outline';
          } else if (route.name === 'DuyguEkle') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'DuyguGuncelle') {
            iconName = 'create-outline';
          } else if (route.name === 'DuyguSil') {
            iconName = 'trash-outline';
          } else if (route.name === 'DuyguAnaliz') {
            iconName = 'bar-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1abc9c',    // Aktif turkuaz renk
        tabBarInactiveTintColor: 'gray',     // Pasif gri renk
        tabBarStyle: { backgroundColor: '#ffffff' }, // Navbar beyaz arka plan
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
      <Tabs.Screen name="DuyguEkle" options={{ title: 'Duygu Ekle' }} />
      <Tabs.Screen name="DuyguGuncelle" options={{ title: 'Duygu Güncelle' }} />
      <Tabs.Screen name="DuyguSil" options={{ title: 'Duygu Sil' }} />
      <Tabs.Screen name="DuyguAnaliz" options={{ title: 'Duygu Analiz' }} />
    </Tabs>
  );
}
