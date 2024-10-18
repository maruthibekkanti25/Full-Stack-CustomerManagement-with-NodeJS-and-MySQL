CREATE TABLE inventory (
    inventory_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    customer_id INT,
    PRIMARY KEY (inventory_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
INSERT INTO inventory (user_id, customer_id)
VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 11);
