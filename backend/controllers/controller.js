
const db = require('../models/models');
const middleware = require('../middleware/middleware');


exports.createCustomers = (req, res) => {
    const customer = req.body;
    db.createCustomers(customer, (err) => {
        if (err) {
            console.error("Error creating customer ", err);
            res.status(500).send("Error creating customer");
            return;
        }
        res.status(201).send("Customer created successfully");
    });
}

exports.getCustomers = (req, res) => {
    db.getCustomers((err, customers) => {
        if (err) {
            console.error("Error fetching customers ", err);
            res.status(500).send("Error fetching customers");
            return;
        }
        res.status(200).json(customers);
    });
}

exports.getCustomersById = (req, res) => {
    const customerId = req.params.id;
    db.getCustomersById(customerId, (err, customer) => {
        if (err) {
            console.error("Error fetching customer ", err);
            res.status(500).send("Error fetching customer");
            return;
        }
        res.status(200).json(customer);
    });
}

exports.UpdateCustomersById = (req, res) => {
    const customerId = req.params.id;
    const customer = req.body;
    db.UpdateCustomersById(customerId, customer, (err) => {
        if (err) {
            console.error("Error updating customer ", err);
            res.status(500).send("Error updating customer");
            return;
        }
        res.status(200).send("Customer updated successfully");
    });
}

exports.deleteCustomers = (req, res) => {
    const customerId = req.params.id;
    db.deleteCustomers(customerId, (err) => {
        if (err) {
            console.error("Error deleting customer ", err);
            res.status(500).send("Error deleting customer");
            return;
        }
        res.status(200).send("Customer deleted successfully");
    });
}

exports.adminLogin = (req, res) => {
    const { username, password } = req.body;

    db.adminLogin(username, password, (err, result) => {
        if (err) {
            console.error("Error logging admin", err);
            return res.status(500).json({ success: false, message: "Error logging admin" });
        }
        res.status(200).json(result); 
    });
};

exports.register = (req, res) =>{
    const {username, password } = req.body;
    db.register(username, password, (err, result) => {
        if (err) {
            console.error("Error registering user", err);
            return res.status(500).json({ success: false, message: "Error registering user" });
        }
        res.status(200).json(result);
    })
}

exports.UserLogin = (req, res) => {
    const { username, password } = req.body;

    db.UserLogin(username, password, (err, result) => {
        if (err) {
            console.error("Error logging User", err);
            return res.status(500).json({ success: false, message: "Error logging User" });
        }
        const token = middleware.generateToken(req.body);
        res.status(200).json({token, result}); 
    });
};

exports.getInventory = (req, res) => {
    const id = req.params.id;
    db.getInventory(id, (err, customers) => {
        if (err) {
            console.error("Error fetching customers ", err);
            res.status(500).send("Error fetching customers");
            return;
        }
        res.status(200).json(customers);
    });
}

exports.getUsers = (req, res) => {
    db.getUsers((err, users) => {
        if (err) {
            console.error("Error fetching users ", err);
            res.status(500).send("Error fetching users");
            return;
        }
        res.status(200).json(users);
    });
}

exports.addToInventory = (req, res) => {
    const inventory = req.body;
    const userId = req.params.id;
    console.log("Inventory: "+inventory);
    if (!userId || !inventory.customer_id) {
        return res.status(400).json({ success: false, message: 'Invalid data provided' });
    }

    db.addInventory(userId, inventory, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error adding to inventory', error: err });
        } else {
            return res.status(201).json({ success: true, message: 'Inventory added successfully', result });
        }
    });
};

exports.removeFromInventory = (req, res) => {
    const invId = req.params.id;  
    console.log("Received invId for deletion:", invId);
    db.removeFromInventory(invId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: `Error deleting from Inventory`, error: err });
        } else {
            return res.status(200).json({ success: true, message: `Inventory deleted successfully`, result });
        }
    });
};

exports.CreateCustomerRequests = (req, res) =>{
    const customerRequest = req.body;
    db.CreateCustomerRequests(customerRequest, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false, message: `Error creating Request`, error: err });
        }
        else{
            return res.status(200).json({ success: true, message: `Request created successfully`, result });
        }
    })
}

exports.getCustomerRequests = (req, res) =>{
    db.getCustomerRequests((err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false, message: `Error creating Request`, error: err });
        }
        else{
            return res.status(200).json({ success: true, message: `Request data got successfully`, result });
        }
    })
}



exports.deleteCustomerRequests = (req, res) =>{
    const id = req.params.id;
    db.deleteCustomerRequests(id, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false, message: `Error creating Request`, error: err });
        }
        else{
            return res.status(200).json({ success: true, message: `Request rejected successfully`, result });
        }
    })
}
exports.UpdateCustomerRequests = (req, res) =>{
    const body = req.body;
    const id = req.params.id;
    db.UpdateCustomerRequests(id,body, (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ success: false, message: `Error creating Request`, error: err });
        }
        else{
            return res.status(200).json({ success: true, message: `Request accepted successfully`, result });
        }
    })
}