// models.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'authentication'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connection successful');
});

exports.createCustomers = (customer, callback) => {
    db.query(
        `INSERT INTO customers (customer_name, email, phone, address, date_of_birth, gender, occupation, membership_status, last_purchase_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [customer.customer_name, customer.email, customer.phone, customer.address, customer.date_of_birth, customer.gender, customer.occupation, customer.membership_status, customer.last_purchase_date],
        callback
    );
}

exports.getCustomers = (callback) => {
    db.query('SELECT * FROM customers', callback);
}

exports.getCustomersById = (customerId, callback) => {
    db.query('SELECT * FROM customers WHERE id = ?', [customerId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
}

exports.UpdateCustomersById = (customerId, customer, callback) => {
    const sql = `
        UPDATE customers SET
            customer_name = ?,
            email = ?,
            phone = ?,
            address = ?,
            date_of_birth = ?,
            gender = ?,
            occupation = ?,
            membership_status = ?,
            last_purchase_date = ?
        WHERE id = ?`;

    // Ensure dates are formatted properly before inserting them
    const formatDate = (date) => date instanceof Date ? date.toISOString().split('T')[0] : date;

    const values = [
        customer.customer_name,
        customer.email,
        customer.phone,
        customer.address,
        formatDate(new Date(customer.date_of_birth)),
        customer.gender,
        customer.occupation,
        customer.membership_status,
        formatDate(new Date(customer.last_purchase_date)),
        customerId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
}


function deletefromCustomersreq(customerId, callback) {
    console.log("Deleting from customersreq with customerId:", customerId);
    db.query('DELETE FROM customersreq WHERE customer_id = ?', [customerId], (err, result) => {
        if (err) {
            return callback(err);  // Pass error to callback
        }
        callback(null, result);  // Proceed if no error
    });
}
exports.deleteCustomers = (customerId, callback) => {
    // First, delete from inventory where customer_id matches
    db.query('DELETE FROM inventory WHERE customer_id = ?', [customerId], (err) => {
        if (err) {
            return callback(err); // Handle error while deleting from inventory
        }
        
        // Then, delete the customer from the customers table
        db.query('DELETE FROM customers WHERE id = ?', [customerId], (err, result) => {
            if (err) {
                return callback(err, null); // Handle error in customer deletion
            }
            return callback(null, result); // Success, pass result back
        });
    });
}


exports.adminLogin = (username, password, callback) => {
    const query = 'SELECT * FROM admins WHERE adminname = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return callback(err, null); 
        }

        if (results.length > 0) {
            
            callback(null, { success: true });
        } else {
            
            callback(null, { success: false });
        }
    });
};

exports.register = (username, password, callback) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [username, password];
    
    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { success: true });
    });
};

exports.UserLogin = (username, password, callback) => {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return callback(err, null); 
        }

        // console.log(results.length);

        if (results.length > 0) {
            callback(null, { success: true });
        } else {
            callback(null, { success: false });
        }
    });
};

exports.getInventory = (id, callback) => {
    const query = `
        SELECT * FROM customers c
        INNER JOIN inventory i ON i.customer_id = c.id 
        WHERE i.user_id = ?
    `;
    db.query(query, [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

exports.getUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
}

exports.addInventory = (userId, customer_id, callback) => {
    const query = "INSERT INTO inventory (user_id, customer_id) VALUES (?, ?)";
    db.query(query, [userId, customer_id], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

exports.removeFromInventory = (invId, callback) => {
    const query = "DELETE FROM inventory WHERE inventory_id = ?";
    db.query(query, [invId], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            callback(err,null);
        }
        else callback (null, result);
    });
}

exports.CreateCustomerRequests = (customerRequest , callback) =>{
    const query = `INSERT INTO customersreq (user_id, customer_id) VALUES(?, ?)`;
    db.query(query, [customerRequest.user_id, customerRequest.customer_id], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            callback(err,null);
        }
        else callback (null, result);
    });
}


exports.getCustomerRequests = (callback) =>{
    const query = `SELECT * FROM customersreq where status="pending"`;
    db.query(query,callback);
}

exports.deleteCustomerRequests = (id, callback) => {
    const query = "DELETE FROM customersreq WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            callback(err,null);
        }
        else callback (null, result);
    });
}

exports.UpdateCustomerRequests = (id, body,callback) =>{
    const query = `UPDATE customersreq SET status = "accept" WHERE id=?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            callback(err,null);
        }
        else {
            this.addInventory(body.user_id, body.customer_id,(err,result)=>{
                if(err)
                {
                    console.error("Error executing query for addInventory: ", err);
                    callback(err,null);
                }
                else{
                    callback(null,result);
                }
            })
        }
    });
}


exports.db = db;

