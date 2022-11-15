const path = require('path');
const express = require('express');
const { getAllTeacher, createTeacher } = require('../controllers/teacherController');


const router = express.Router();



router.route('/').get(getAllTeacher).post(createTeacher);



module.exports = router;