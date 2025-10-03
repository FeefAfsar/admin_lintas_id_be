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

// Gunakan Routes
app.use('/api/v1', apiRoutes); // Semua rute akan diawali dengan /api/v1

// Database connect helper for serverless & local
async function connectDB() {
    if (mongoose.connection.readyState === 1) return;

    if (!global._mongoConnectPromise) {
        global._mongoConnectPromise = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Berhasil terhubung ke MongoDB');
        }).catch(err => {
            console.error('Koneksi database gagal:', err);
            throw err;
        });
    }
    return global._mongoConnectPromise;
}

// Export app and connectDB for serverless invocation
module.exports = { app, connectDB };

// If run directly, start a local server (for npm start)
if (require.main === module) {
    (async () => {
        try {
            await connectDB();
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
        } catch (err) {
            console.error('Gagal memulai server:', err);
            process.exit(1);
        }
    })();
}