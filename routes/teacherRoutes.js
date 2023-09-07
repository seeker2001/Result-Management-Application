const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/TeacherController');

router.get('/login', TeacherController.getLoginPage);
router.post('/login', TeacherController.postLoginPage);
router.get('/viewall', TeacherController.getViewAllPage);
router.get('/add', TeacherController.getAddStudentPage);
router.post('/add', TeacherController.postStudentData)
router.get('/edit/:id', TeacherController.getEditStudentPage);
router.post('/edit/:id', TeacherController.updateStudentData);
router.get('/delete/:id', TeacherController.deleteStudentData);

module.exports = router;
