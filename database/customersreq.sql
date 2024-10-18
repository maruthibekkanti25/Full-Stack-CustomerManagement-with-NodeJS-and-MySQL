CREATE TABLE customersreq (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    customer_id INT NOT NULL,
    status ENUM('accept', 'reject', 'pending') DEFAULT 'pending',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
