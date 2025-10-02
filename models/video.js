// models/video.js
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, { timestamps: true });

// DIUBAH: Daftarkan model dengan nama 'Video' (V besar)
module.exports = mongoose.model('Video', VideoSchema);