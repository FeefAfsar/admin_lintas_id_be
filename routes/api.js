const express = require('express');
const router = express.Router();

// Import controllers
const { createCourse, getAllCourses, deleteCourse } = require('../controllers/coursecontrollers');
const { addVideoToCourse } = require('../controllers/videocontrollers');
// DIUBAH: Memanggil examController dan fungsi barunya
const { addExamToCourse } = require('../controllers/examcontrollers');


// --- Routes untuk Course ---
router.post('/courses', createCourse);
router.get('/courses', getAllCourses);
router.delete('/courses/:id', deleteCourse);

// --- Routes untuk Video (terkait dengan course) ---
router.post('/courses/:courseId/videos', addVideoToCourse);

// --- Routes untuk Exam (terkait dengan course) ---
// DIUBAH: Menggunakan fungsi addExamToCourse
router.post('/courses/:courseId/exams', addExamToCourse);


module.exports = router;