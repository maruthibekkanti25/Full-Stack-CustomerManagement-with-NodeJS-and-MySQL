// routes.js
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');
const middleware = require('../middleware/middleware');

// Public Routes
router.post('/login', controllers.UserLogin);
router.post('/register', controllers.register); //jwt
router.post('/admin-login', controllers.adminLogin);

// customers Routes
router.get('/customers', controllers.getCustomers);
router.get('/customers/:id', controllers.getCustomersById);
router.put('/customers/:id', controllers.UpdateCustomersById);
router.post('/customers', controllers.createCustomers);
router.delete('/customers/:id', controllers.deleteCustomers);

//users routes
router.get('/users', controllers.getUsers);
// router.get('/users/:id', controllers.getUsersById);
// router.put('/users/:id', controllers.UpdateUsersById);
// router.post('/users', controllers.createUsers);
// router.delete('/users/:id', controllers.deleteUsers);

//inventory routes
router.get('/inventory/:id', controllers.getInventory); // userId passed
router.post('/inventory/:id',middleware.authenticateUser, controllers.addToInventory);//userID passed //jwt
router.delete('/inventory/:id',middleware.authenticateUser, controllers.removeFromInventory); // InventoryId passed

//Requests
router.post('/customersrequests', controllers.CreateCustomerRequests);
router.get('/customersrequests', controllers.getCustomerRequests);
router.put('/customersrequests/:id', controllers.UpdateCustomerRequests);
router.delete('/customersrequests/:id',middleware.authenticateUser, controllers.deleteCustomerRequests);


module.exports = router;
