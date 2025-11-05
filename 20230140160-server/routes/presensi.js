// routes/presensi.js
const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const reportController = require('../controllers/reportController'); // ✅ Tambahan
const { addUserData } = require('../middleware/permissionMiddleware');

// Terapkan middleware addUserData ke semua rute di bawah ini
router.use(addUserData);

router.post('/check-in', presensiController.CheckIn);
router.post('/check-out', presensiController.CheckOut);

// ✅ Tambahkan route laporan
router.get('/reports/daily', reportController.getDailyReport);

router.delete("/:id", presensiController.deletePresensi);
router.put("/:id", presensiController.updatePresensi);

module.exports = router;
