import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const DuyguAnaliz = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/justforanaliz/DuyguAnalizGoruntule')}
            >
                <Text style={styles.buttonText}>Duygu Analiz Görüntüle</Text>
            </TouchableOpacity>

            <View style={{ height: 16 }} />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/justforanaliz/DuyguAnalizYuzde')}
            >
                <Text style={styles.buttonText}>Duygu Analiz Yüzde</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    button: {
        backgroundColor: '#8ba69b',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default DuyguAnaliz;
