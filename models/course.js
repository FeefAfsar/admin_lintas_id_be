// models/course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    wilayah: { type: String, required: true },
    durasi: { type: String },
    level: { type: String },
    skills: { type: String },
    videoUrl: { type: String },
    // References to related documents
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);