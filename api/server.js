const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = 5000;

dotenv.config();  // .env dosyasını yükle

// Veritabanı bağlantısı
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
        return;
    }
    console.log('Veritabanına bağlanıldı.');
});

// CORS ayarları
app.use(cors());  // Tüm kaynaklardan gelen isteklere izin verir, sadece belirli bir kaynağa izin vermek için:
// app.use(cors({ origin: 'http://localhost:3000' }));  // Örneğin, frontend'i localhost:3000'den çalıştırıyorsanız.

// JSON verilerini işlemek için middleware
app.use(express.json());

// API route'ları
const duygularRouter = require('./routes/duygular');
app.use('/api/duygular', duygularRouter(db));  // Veritabanı bağlantısını router'a gönder

// Sunucu başlatma
app.listen(port, (err) => {
    if (err) {
        console.error('Sunucu başlatılamadı:', err);
    } else {
        console.log(`Server ${port} portunda çalışıyor.`);
    }
});
