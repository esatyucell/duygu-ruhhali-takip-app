// routes/duygular.js

module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Duygular listeleme (GET)
    router.get('/', (req, res) => {
        db.query('SELECT * FROM duygular', (err, results) => {
            if (err) {
                console.error('Veritabanı sorgu hatası:', err);
                return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
            }
            res.json(results);
        });
    });

    // Duygu ekleme (POST)
    router.post('/', (req, res) => {
        const { duygu, tarih, aciklama } = req.body;

        if (!duygu || !tarih || !aciklama) {
            return res.status(400).json({ error: 'Duygu adı, açıklaması ve tarihi gereklidir' });
        }

        db.query('INSERT INTO duygular (duygu, tarih , aciklama) VALUES (?, ?, ?)',
            [duygu, tarih, aciklama], (err, results) => {
                if (err) {
                    console.error('Veritabanı sorgu hatası:', err);
                    return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
                }
                res.status(201).json({ message: 'Duygu başarıyla eklendi' });
            });
    });

    // Duygu güncelleme (PUT)
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { duygu, tarih, aciklama } = req.body;

        if (!duygu || !tarih || !aciklama) {
            return res.status(400).json({ error: 'Duygu adı, tarih ve açıklama gereklidir' });
        }

        db.query('UPDATE duygular SET duygu = ?, tarih = ?, aciklama = ? WHERE id = ?',
            [duygu, tarih, aciklama, id], (err, results) => {
                if (err) {
                    console.error('Veritabanı sorgu hatası:', err);
                    return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Duygu bulunamadı' });
                }
                res.json({ message: 'Duygu başarıyla güncellendi' });
            });
    });

    // Duygu silme (DELETE)
    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        db.query('DELETE FROM duygular WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Veritabanı sorgu hatası:', err);
                return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Duygu bulunamadı' });
            }
            res.json({ message: 'Duygu başarıyla silindi' });
        });
    });

    return router;
};
