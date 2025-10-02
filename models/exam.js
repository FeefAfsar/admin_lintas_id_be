// models/exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, { timestamps: true });

// DIUBAH: Daftarkan model dengan nama 'Exam' (E besar)
module.exports = mongoose.model('Exam', ExamSchema);