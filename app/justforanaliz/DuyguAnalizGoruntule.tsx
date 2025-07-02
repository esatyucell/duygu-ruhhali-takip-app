import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getDuygular } from '../lib/api';

type Duygu = {
    id: number;
    duygu: string;     // kategori gibi
    tarih: string;
    aciklama: string;
};

export default function DuyguAnalizGoruntule() {
    const [duygular, setDuygular] = useState<Duygu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDuygular = async () => {
            try {
                const data = await getDuygular();
                if (Array.isArray(data)) {
                    setDuygular(data);
                } else {
                    throw new Error('Veri formatı geçersiz!');
                }
            } catch (error) {
                console.error('Duygular alınırken hata oluştu:', error);
                setError('Duygular alınırken hata oluştu!');
            } finally {
                setLoading(false);
            }
        };
        fetchDuygular();
    }, []);

    // Duyguları önce tarihe göre (yeniden eskiye) sırala, sonra kategorilere grupla
    const grupDuygular: { [key: string]: Duygu[] } = duygular.length
        ? duygular
            .sort((a, b) => new Date(b.tarih).getTime() - new Date(a.tarih).getTime()) // En yeni üstte
            .reduce((acc: { [key: string]: Duygu[] }, duygu) => {
                if (!acc[duygu.duygu]) {
                    acc[duygu.duygu] = [];
                }
                acc[duygu.duygu].push(duygu);
                return acc;
            }, {})
        : {};

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00796B" />
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Duygu Analizi (Kategoriye Göre)</Text>

            {Object.entries(grupDuygular).map(([kategori, duygularListesi]) => (
                <View key={kategori} style={styles.kategoriContainer}>
                    <Text style={styles.kategoriBaslik}>{kategori}</Text>
                    {duygularListesi.map((duygu) => (
                        <View key={duygu.id} style={styles.duyguContainer}>
                            <Text style={styles.duyguText}>Tarih: {duygu.tarih}</Text>
                            <Text style={styles.duyguText}>Açıklama: {duygu.aciklama}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 20,
        textAlign: 'center',
    },
    kategoriContainer: {
        marginBottom: 20,
        backgroundColor: '#F1F8E9',
        padding: 15,
        borderRadius: 12,
    },
    kategoriBaslik: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#33691E',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#AED581',
        paddingBottom: 4,
    },
    duyguContainer: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    duyguText: {
        fontSize: 15,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA',
    },
    loadingText: {
        fontSize: 18,
        color: '#00796B',
        marginTop: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA',
    },
    errorText: {
        fontSize: 18,
        color: '#FF0000',
    },
});
