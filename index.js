const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Memuat variabel dari file .env

const apiRoutes = require('./routes/api');

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengizinkan akses dari domain lain
app.use(express.json()); // Mem-parsing body request sebagai JSON

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Berhasil terhubung ke MongoDB');
}).catch(err => {
    console.error('Koneksi database gagal:', err);
});

// Gunakan Routes
app.use('/api/v1', apiRoutes); // Semua rute akan diawali dengan /api/v1

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});