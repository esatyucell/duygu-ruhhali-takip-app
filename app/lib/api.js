const API_URL = 'http://192.168.1.100:5000/api/duygular';  // API'nin doğru URL'si

// getDuygular fonksiyonu
export const getDuygular = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Duygular alınırken hata oluştu:", error);
    }
};

// DuyguEkle fonksiyonu
export const DuyguEkle = async (duygu, tarih, aciklama) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ duygu, tarih, aciklama }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Duygu eklenirken hata oluştu:", error);
    }
};

// updateDuygu fonksiyonu
export const updateDuygu = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Duygu güncellenirken hata oluştu:", error);
    }
};

// Duygu silme fonksiyonu
export const deleteDuygu = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Başarılı bir silme işlemi, veriyi döndürür
            return await response.json();
        } else {
            // Hata durumunda gelen mesajı almak
            const errorData = await response.json();
            console.error("Duygu silinemedi:", errorData);
            throw new Error('Duygu silinemedi');
        }
    } catch (error) {
        console.error("Duygu silme hatası:", error);
        throw error;
    }
};

export default { getDuygular, DuyguEkle, updateDuygu, deleteDuygu };
