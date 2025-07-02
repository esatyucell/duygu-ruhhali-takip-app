import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getDuygular } from '../lib/api';

interface Duygu {
    id: number;
    duygu: string;
    tarih: string;
    aciklama: string;
}

const DuyguAnalizYuzde = () => {
    const [weeklyData, setWeeklyData] = useState<Record<string, number>>({});
    const [monthlyData, setMonthlyData] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAndAnalyze() {
            try {
                const allDuygular: Duygu[] = await getDuygular();
                const now = new Date();

                const weekly: Record<string, number> = {};
                const monthly: Record<string, number> = {};

                let weeklyTotal = 0;
                let monthlyTotal = 0;

                allDuygular.forEach((item) => {
                    const itemDate = new Date(item.tarih);
                    const diffTime = now.getTime() - itemDate.getTime();
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);

                    if (diffDays <= 7) {
                        weekly[item.duygu] = (weekly[item.duygu] || 0) + 1;
                        weeklyTotal++;
                    }

                    if (diffDays <= 30) {
                        monthly[item.duygu] = (monthly[item.duygu] || 0) + 1;
                        monthlyTotal++;
                    }
                });

                const weeklyPercentages: Record<string, number> = {};
                for (let key in weekly) {
                    weeklyPercentages[key] = ((weekly[key] / weeklyTotal) * 100);
                }

                const monthlyPercentages: Record<string, number> = {};
                for (let key in monthly) {
                    monthlyPercentages[key] = ((monthly[key] / monthlyTotal) * 100);
                }

                setWeeklyData(weeklyPercentages);
                setMonthlyData(monthlyPercentages);
                setLoading(false);
            } catch (err) {
                console.error("Veri analiz hatası:", err);
            }
        }

        fetchAndAnalyze();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#00796B" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>📅 Haftalık Duygu Yüzdeleri</Text>
            {Object.keys(weeklyData).map((key) => (
                <Text key={key} style={styles.item}>
                    {key}: {weeklyData[key].toFixed(1)}%
                </Text>
            ))}

            <Text style={styles.title}>🗓️ Aylık Duygu Yüzdeleri</Text>
            {Object.keys(monthlyData).map((key) => (
                <Text key={key} style={styles.item}>
                    {key}: {monthlyData[key].toFixed(1)}%
                </Text>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E0F7FA',
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#00796B',
    },
    item: {
        fontSize: 18,
        marginTop: 10,
        color: '#333',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DuyguAnalizYuzde;
