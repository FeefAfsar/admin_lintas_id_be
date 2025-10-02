const Video = require('../models/video');      // INI BAGIAN YANG DIPERBAIKI
const Course = require('../models/course');    // Disesuaikan juga

// Menambah video ke sebuah course
exports.addVideoToCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const video = new Video({
            ...req.body,
            course: courseId // Menghubungkan video ke course yang spesifik
        });
        await video.save();

        // Tambahkan referensi video ini ke dalam array 'videos' di dokumen Course
        await Course.findByIdAndUpdate(courseId, { $push: { videos: video._id } });

        res.status(201).json({ success: true, data: video });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};