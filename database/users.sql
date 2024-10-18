CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO users (username, password)
VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');
