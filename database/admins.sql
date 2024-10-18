CREATE TABLE admins (
    id INT NOT NULL AUTO_INCREMENT,
    adminname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO admins (adminname, password)
VALUES ('admin1', 'password1'), ('admin2', 'password2');
