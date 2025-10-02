const Exam = require('../models/exam');      // DIUBAH: Memanggil model 'exam'
const Course = require('../models/course');

// Menambahkan exam baru ke sebuah course
exports.addExamToCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course tidak ditemukan' });
        }

        // DIUBAH: Membuat 'Exam' baru
        const exam = new Exam({
            ...req.body,
            course: courseId
        });

        await exam.save();
        
        // PENTING: Kita akan simpan ID exam ke dalam array 'exams' di dokumen Course
        course.exams.push(exam._id);
        await course.save();

        res.status(201).json({ success: true, data: exam });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};