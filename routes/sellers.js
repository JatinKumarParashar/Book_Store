const express = require('express');
const router = express.Router();
const sellersControllers=require('../controllers/sellers');


router.post('/add-sellers', sellersControllers.postSignUp);
router.get('/get-sellers',sellersControllers.getSellers);
router.delete('/delete-seller/:id',sellersControllers.deleteSeller);
router.put('/edit-seller',sellersControllers.editSeller);
router.post('/add-book',sellersControllers.postBook);
router.get('/get-book',sellersControllers.getBook);
router.delete('/delete-book',sellersControllers.deleteBook);
router.put('/edit-book',sellersControllers.postEdit); 
router.get('/get-order/:sellerId',sellersControllers.getOrder);
router.get('/get-order',sellersControllers.getorder);


module.exports=router;