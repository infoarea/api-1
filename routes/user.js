const path = require('path');
const express = require('express');
const { getAllUser, createUser, singleUser, deleteUser, updateUser } = require('../controllers/userController');


const router = express.Router();



router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(singleUser).delete(deleteUser).put(updateUser).patch(updateUser)



module.exports = router;