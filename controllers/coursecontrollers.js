const Course = require('../models/course');

// 1. FUNGSI UNTUK MEMBUAT COURSE (DENGAN MODE AUDIT)
exports.createCourse = async (req, res) => {
    console.log("\n--- [BACKEND] FUNGSI createCourse DIMULAI ---");
    console.log("[BACKEND] Data yang diterima di req.body:", req.body);

    if (!req.body.title || !req.body.category) {
        console.error("[BACKEND] Gagal Validasi: Judul atau Kategori kosong.");
        return res.status(400).json({ success: false, message: "Judul dan Kategori wajib diisi." });
    }

    try {
        console.log("[BACKEND] Mencoba membuat dokumen Mongoose baru...");
        const course = new Course(req.body);
        console.log("[BACKEND] Dokumen berhasil dibuat:", course);

        console.log("[BACKEND] Mencoba menyimpan ke database...");
        const savedCourse = await course.save();
        console.log("[BACKEND] SUKSES! Dokumen berhasil disimpan:", savedCourse);

        res.status(201).json({ success: true, data: savedCourse, magicWord: "backend-berhasil-menyimpan" });
    } catch (error) {
        console.error("--- [BACKEND] !!! TERJADI ERROR DI BLOK CATCH !!! ---");
        console.error(error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan di server." });
    }
};

// 2. FUNGSI UNTUK MENDAPATKAN SEMUA COURSE
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('videos').populate('exams');
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. FUNGSI UNTUK MENGHAPUS COURSE
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course tidak ditemukan' });
        }
        res.status(200).json({ success: true, message: 'Course berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};