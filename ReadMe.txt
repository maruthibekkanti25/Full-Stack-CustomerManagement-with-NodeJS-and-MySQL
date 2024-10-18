1.create the database.
2.use the created database.
3.create the tables from the 'database' folder.
    (use the query "source pathOfTheSQLFile")
4. In models=>models.js make sure to change the password and the database.
5.Now run the server.js.

In the https://localhost:3000 we can see Admin Login and User Login.

In the user Login we can register or Login users.

Enter the username and password to login. Use username and password from users.sql.

After Login You can see the particualar user's Inventory you can add customers into Inventory by clicking AddUser.
Clicking Add sends a request to the admin Page.  When the admin accepts the request the customer is added to the Inventory.

In the admin page you can see all the users and their inventory.
In the Admin page you can Add Customers, Edit Customers, Delete Customers. You can also accept or reject the User requests.

