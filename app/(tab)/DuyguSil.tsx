import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { getDuygular, deleteDuygu } from '../lib/api';  // API fonksiyonlarınızı içe aktardığınız yer

// Duygu tipi
interface Duygu {
    id: number;
    duygu: string;
    tarih: string;
    aciklama: string;
}

const DuyguSil = () => {
    const [duygular, setDuygular] = useState<Duygu[]>([]); // Duyguları tutacak state

    // Duyguları API'den al
    useEffect(() => {
        const fetchDuygular = async () => {
            try {
                const data = await getDuygular();
                setDuygular(data);
            } catch (error) {
                console.error("Duygular alınırken hata oluştu:", error);
            }
        };
        fetchDuygular();
    }, []);

    // Duygu silme fonksiyonu
    const handleDeleteDuygu = async (id: number) => {
        try {
            const response = await deleteDuygu(id);  // Duygu silme API çağrısı
            if (response) {
                Alert.alert('Başarılı', 'Duygu başarıyla silindi.');
                // Silme işleminden sonra duyguları yeniden al
                const updatedDuygular = duygular.filter((duygu) => duygu.id !== id);
                setDuygular(updatedDuygular);
            } else {
                Alert.alert('Hata', 'Duygu silinemedi. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            console.error('Duygu silme hatası:', error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Duygu Sil</Text>
            {duygular.length === 0 ? (
                <Text>Henüz duygu verisi yok.</Text>
            ) : (
                duygular.map((duygu) => (
                    <View key={duygu.id} style={styles.duyguContainer}>
                        <Text>{duygu.duygu}</Text>
                        <Text>{duygu.tarih}</Text>
                        <Button title="Sil" onPress={() => handleDeleteDuygu(duygu.id)} />
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,  // Bu, container'ın tüm alanı kaplamasını sağlar
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    duyguContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default DuyguSil;
