import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { updateDuygu, getDuygular } from '../lib/api'; // api fonksiyonlarını import ediyoruz

type Duygu = {
    id: number;
    duygu: string;
    tarih: string;
    aciklama: string;
};

export default function DuyguGuncelle() {
    const [duygular, setDuygular] = useState<Duygu[]>([]);
    const [selectedDuygu, setSelectedDuygu] = useState<Duygu | null>(null);
    const [duygu, setDuygu] = useState<string>(''); // string olarak tanımlandı
    const [aciklama, setAciklama] = useState<string>(''); // string olarak tanımlandı

    useEffect(() => {
        const fetchDuygular = async () => {
            try {
                const data = await getDuygular(); // API'den duygu verisi alıyoruz
                setDuygular(data); // State'e duygu verilerini set ediyoruz
            } catch (error) {
                console.error('Duygular alınırken hata oluştu:', error);
            }
        };
        fetchDuygular();
    }, []);

    const handleSelectDuygu = (duygu: Duygu) => {
        setSelectedDuygu(duygu); // Seçilen duyguyu set ediyoruz
        setDuygu(duygu.duygu); // TextInput'a duygu değerini ekliyoruz
        setAciklama(duygu.aciklama); // Açıklamayı textinput'a ekliyoruz
    };

    const handleUpdateDuygu = async () => {
        if (selectedDuygu) {
            try {
                // Güncelleme API çağrısı
                await updateDuygu(selectedDuygu.id, { duygu, aciklama });
                // Güncelleme sonrası tekrar duygu verilerini alıyoruz
                const updatedDuygular = await getDuygular();
                setDuygular(updatedDuygular);
                alert('Duygu başarıyla güncellendi');
                setSelectedDuygu(null); // Seçilen duyguyu sıfırlıyoruz
                setDuygu(''); // Duygu inputunu sıfırlıyoruz
                setAciklama(''); // Açıklama inputunu sıfırlıyoruz
            } catch (error) {
                console.error('Duygu güncellenirken hata oluştu:', error);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Duygu Güncelle</Text>

            {duygular.length > 0 ? (
                <View>
                    <Text style={styles.subtitle}>Geçmiş Duygular</Text>
                    {duygular.map((duygu) => (
                        <View key={duygu.id} style={styles.duyguCard}>
                            <Text style={styles.duyguText}>{duygu.duygu} - {duygu.tarih}</Text>
                            <Button
                                title="Düzenle"
                                onPress={() => handleSelectDuygu(duygu)}
                                color="#009688" // Normal turkuaz
                            />
                            {selectedDuygu?.id === duygu.id && (
                                <View style={styles.formContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={duygu.duygu} // burada duygu string olarak kullanılacak
                                        onChangeText={setDuygu}
                                        placeholder="Duygunuzu girin"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        value={aciklama} // burada aciklama string olarak kullanılacak
                                        onChangeText={setAciklama}
                                        placeholder="Açıklamanızı girin"
                                    />
                                    <Button
                                        title="Güncelle"
                                        onPress={handleUpdateDuygu}
                                        color="#80CBC4" // Açık turkuaz
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.noData}>Henüz duygu verisi bulunmamaktadır.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5F2', // Soft turkuaz arka plan
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 22,
        color: '#00796B',
        marginBottom: 10,
    },
    duyguCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 12, // Yuvarlak köşeler
        borderWidth: 1,
        borderColor: '#80CBC4', // Soft turkuaz sınır
    },
    duyguText: {
        fontSize: 16,
        color: '#333',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginTop: 20,
        borderRadius: 12, // Yuvarlak köşeler
        borderWidth: 1,
        borderColor: '#80CBC4', // Soft turkuaz sınır
    },
    input: {
        height: 40,
        borderColor: '#80CBC4', // Soft turkuaz sınır
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 8, // Yuvarlak köşeler
        fontSize: 16,
        backgroundColor: '#E8F5F2', // Soft turkuaz arka plan
    },
    noData: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
