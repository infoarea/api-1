const path = require('path');
const express = require('express');
const { getAllProduct, createProduct, singleProduct, deleteProduct, updateProduct } = require('../controllers/productController');


const router = express.Router();



router.route('/').get(getAllProduct).post(createProduct);
router.route('/:id').get(singleProduct).delete(deleteProduct).put(updateProduct).patch(updateProduct)
// .delete(deleteUser).put(updateUser).patch(updateUser)



module.exports = router;