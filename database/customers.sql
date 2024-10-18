CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    occupation VARCHAR(50) NOT NULL,
    membership_status ENUM('Active', 'Inactive') NOT NULL,
    last_purchase_date DATE
);

INSERT INTO customers (customer_name, email, phone, address, date_of_birth, gender, occupation, membership_status, last_purchase_date)
VALUES
('Aarav Sharma', 'aarav.sharma@example.com', '9876543210', '123 MG Road, Delhi', '1995-05-21', 'Male', 'Engineer', 'Active', '2024-08-01'),
('Ananya Patel', 'ananya.patel@example.com', '9876543211', '45 Sector 18, Noida', '1992-12-11', 'Female', 'Doctor', 'Active', '2024-07-15'),
('Vivaan Singh', 'vivaan.singh@example.com', '9876543212', '67 Park Street, Kolkata', '1989-07-30', 'Male', 'Architect', 'Inactive', '2024-06-10'),
('Diya Nair', 'diya.nair@example.com', '9876543213', '22 Brigade Road, Bangalore', '1996-11-08', 'Female', 'Designer', 'Active', '2024-08-05'),
('Ishaan Gupta', 'ishaan.gupta@example.com', '9876543214', '89 CG Road, Ahmedabad', '1993-04-22', 'Male', 'Accountant', 'Inactive', '2024-07-20'),
('Meera Rao', 'meera.rao@example.com', '9876543215', '101 MG Road, Chennai', '1990-03-15', 'Female', 'Lawyer', 'Active', '2024-07-25'),
('Kabir Joshi', 'kabir.joshi@example.com', '9876543216', '34 Residency Road, Pune', '1987-09-02', 'Male', 'Manager', 'Active', '2024-08-08'),
('Aditi Roy', 'aditi.roy@example.com', '9876543217', '78 Lake Road, Hyderabad', '1998-01-19', 'Female', 'Teacher', 'Inactive', '2024-06-28'),
('Arjun Mehta', 'arjun.mehta@example.com', '9876543218', '15 Main Street, Mumbai', '1994-02-14', 'Male', 'Consultant', 'Active', '2024-08-02'),
('Sneha Kapoor', 'sneha.kapoor@example.com', '9876543219', '99 Link Road, Chandigarh', '1991-10-06', 'Female', 'HR Specialist', 'Inactive', '2024-07-05');

