import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from '../lib/api';

export default function DuyguEkle() {
    const [isim, setIsim] = useState('');
    const [tarih, setTarih] = useState(new Date());
    const [aciklama, setAciklama] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const handleDuyguEkle = async () => {
        if (!isim || !aciklama) {
            alert('Duygu ismi ve açıklama boş bırakılamaz!');
            return;
        }

        try {
            await api.DuyguEkle(isim, tarih.toISOString().split('T')[0], aciklama);
            alert('Duygu başarıyla eklendi!');
            resetFields();
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu! Lütfen tekrar deneyin.');
        }
    };

    const resetFields = () => {
        setIsim('');
        setTarih(new Date());
        setAciklama('');
    };

    const handleConfirm = (date: Date) => {
        setTarih(date);
        setShowPicker(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Duygu Ekle</Text>

            <TextInput
                style={styles.input}
                placeholder="Duygu İsmi"
                value={isim}
                onChangeText={setIsim}
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
                <Text style={styles.datePickerText}>
                    {tarih.toLocaleDateString('tr-TR')}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setShowPicker(false)}
                locale="tr-TR"
                date={tarih}
            />

            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Açıklama"
                value={aciklama}
                onChangeText={setAciklama}
                placeholderTextColor="#888"
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleDuyguEkle}>
                <Text style={styles.buttonText}>Duygu Ekle</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#E0F7FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#00796B',
    },
    input: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 12,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    datePickerButton: {
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 12,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%',
        backgroundColor: '#00796B',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
