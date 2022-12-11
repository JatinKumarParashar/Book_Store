const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customer');


router.post('/add-customer',customerController.postSignup);
router.post('/add-order',customerController.addOrder);
router.get('/get-order/:customerId',customerController.getOrder);
router.get('/get-customer',customerController.getCustomer);
router.delete('/delete-customer/:id',customerController.deleteCustomer);
router.put('/edit-customer',customerController.editCustomer);

module.exports=router;