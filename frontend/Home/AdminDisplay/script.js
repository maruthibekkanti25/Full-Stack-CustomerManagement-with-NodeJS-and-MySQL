window.onload = function () {
    fetchCustomers();
    closeAdd();
    console.log("onload");

    function handle() {
        fetch("http://localhost:3000/users")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                console.log(users);
                showUserInventory(users);
            })
            .catch(err => {
                console.log("Error Fetching UsersData", err);
            });
    
        // document.getElementById("userInventory").removeEventListener("click", handle);
    }

    function getRequests() {
        fetch("http://localhost:3000/customersrequests")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(requests => {
                console.log(requests.result);
                showRequests(requests.result);
            })
            .catch(err => {
                console.log("Error Fetching requests", err);
            });
    }
    
    document.getElementById("userInventory").addEventListener("click", handle);
    document.getElementById("requests").addEventListener("click", getRequests);
        
}
function addUserModal() {
    document.getElementById("addUser").style.display = "block";
    document.getElementById("editUser").style.display = "none";
}
function showRequests(requests) {
    var requestsContainer = document.getElementById("requests-container");
    requestsContainer.style.display = "block";
    var requestsTable = document.getElementById("requestsTable");
    
    for (const request of requests) {
        var row = document.createElement('tr');
        row.className = "row";
        row.innerHTML = `
        <td>${request.id}</td>
        <td>${request.user_id}</td>
        <td>${request.customer_id}</td>
        <td>${request.status}</td>
        <td>
            <button class="reject" onclick="rejectRequest(${request.id})">Reject</button>
            <button class="accept" onclick="acceptRequest(${request.id}, ${request.user_id}, ${request.customer_id})">Accept</button>
        </td>`;
    requestsTable.appendChild(row);
    }

}
function rejectRequest(id) {
    fetch(`http://localhost:3000/customersrequests/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({id: id})
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Request failed');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.reload();
        } else {
            alert("NOT Rejected");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
}
function acceptRequest(id, userId, customerId) {
    fetch(`http://localhost:3000/customersrequests/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({user_id: userId, customer_id: customerId})
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Request failed');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.reload();
        } else {
            alert("NOT Aceepted");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
}
function showUserInventory(users) {
    var inventoryContainer = document.getElementById("inventory-container");
    inventoryContainer.style.display = "block";
    var inventoryTable = document.getElementById("inventoryTable");
    inventoryTable.innerHTML = "";
    for (const user of users) {
        const div = document.createElement("div");
        div.className = "div" + user.id;
        const usernameHeading = document.createElement("h3");
        usernameHeading.textContent = user.username;
        div.appendChild(usernameHeading);

        const oneTable = document.createElement("table");
        oneTable.id = "table" + user.id;

        const row = document.createElement('tr');
        row.className = "tableHeader";
        row.innerHTML = `
            <th class ="id"> ID</th>
            <th class="name">Name</th>
            <th class="email">Email</th>
            <th class="phone">PhoneNumber</th>
            <th class="address">Address</th>
            <th class="dob">DOB</th>
            <th class="gender">Gender</th>
            <th class="occupation">Occupation</th>
            <th class="status">MembershipStatus</th>
            <th class="purchaseDate">PurchaseDate</th>`;
        oneTable.appendChild(row);

        div.appendChild(oneTable);
        inventoryTable.appendChild(div);


        const userInventoryRequest = new XMLHttpRequest();
        userInventoryRequest.open("GET", `http://localhost:3000/inventory/${user.id}`, true);
        userInventoryRequest.send();

        userInventoryRequest.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                const userCustomers = JSON.parse(this.responseText);

                if (userCustomers.length !== 0) {
                    for (const customer of userCustomers) {
                        let dob = new Date(customer.date_of_birth).toISOString().split('T')[0];
                        let purDate = new Date(customer.last_purchase_date).toISOString().split('T')[0];

                        const row = document.createElement('tr');
                        row.id = "customers" + customer.user_id;
                        row.innerHTML = `
                        <td class="id">${customer.id}</td>
                        <td class="name">${customer.customer_name}</td>
                        <td class="email">${customer.email}</td>
                        <td class="phone">${customer.phone}</td>
                        <td class="address">${customer.address}</td>
                        <td class="dob">${dob}</td>
                        <td class="gender">${customer.gender}</td>
                        <td class="occupation">${customer.occupation}</td>
                        <td class="status">${customer.membership_status}</td>
                        <td class="purchaseDate">${purDate}</td>`;
                        oneTable.appendChild(row);
                    }
                }
                else {
                    oneTable.innerHTML = '';
                }
            } else if (this.readyState === 4) {
                console.error("Error fetching user benefits data");
                alert("Error accessing user benefits data");
            }

        }
    }
}

function closeInventory() {
    const inventoryContainer = document.getElementById("inventory-container");
    inventoryContainer.style.display = "none";
}

function fetchCustomers() {
    fetch("http://localhost:3000/customers")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network Error Unable to fetch Customers");
            }
            return response.json();
        })
        .then(customers => {
            displayCustomers(customers);
        })
        .catch(err => {
            console.log("Error Fetching Customers", err);
        });
}
function displayCustomers(customers) {
    console.log(customers);
    document.getElementById("addUser").style.display = "none";
    document.getElementById("editUser").style.display = "none";
    var table = document.getElementById('table');
    table.innerHTML = ` <tr id="tableheadings">
                <th class="id">Id</th>
                <th class="name">Name</th>
                <th class="email">Email</th>
                <th class="phone">PhoneNumber</th>
                <th class="address">Address</th>
                <th class="dob">DOB</th>
                <th class="gender">Gender</th>
                <th class="occupation">Occupation</th>
                <th class="status">MembershipStatus</th>
                <th class="purchaseDate">PurchaseDate</th>
                <th class="actions">Actions</th>
            </tr>`;
    customers.forEach(customer => {
        let dob = new Date(customer.date_of_birth).toISOString().split('T')[0];
        let purDate = new Date(customer.last_purchase_date).toISOString().split('T')[0];
        var row = document.createElement("tr");
        row.innerHTML = `<td class="id">${customer.id}</td>
        <td class="name">${customer.customer_name}</td>
        <td class="email">${customer.email}</td>
        <td class="phone">${customer.phone}</td>
        <td class="address">${customer.address}</td>
        <td class="dob">${dob}</td>
        <td class="gender">${customer.gender}</td>
        <td class="occupation">${customer.occupation}</td>
        <td class="status">${customer.membership_status}</td>
        <td class="purchaseDate">${purDate}</td>
        <td class="actions">
        <button class="edit" onclick="editFunction('${customer.customer_name}','${customer.email}','${customer.phone}','${customer.address}','${dob}','${customer.gender}','${customer.occupation}','${customer.membership_status}','${purDate}','${customer.id}')">EDIT</button> 
        <button class="delete" onclick="deleteFunction(${customer.id})">DELETE</button>
        </td>`;
        table.appendChild(row);
    });
}

function closeRequests() {
    document.getElementById("requests-container").style.display = "none";
}

function addCustomerFunction() {
    console.log("addCustomerFunction");
    document.getElementById("addUser").style.display = "none";
    document.getElementById("editUser").style.display = "none";
    var customer = {
        "customer_name": document.getElementById("addName").value,
        "email": document.getElementById("addEmail").value,
        "phone": document.getElementById("addPhone").value,
        "address": document.getElementById("addAddress").value,
        "date_of_birth": document.getElementById("addDob").value,
        "gender": document.getElementById("addGender").value,
        "occupation": document.getElementById("addOccupation").value,
        "membership_status": document.getElementById("addStatus").value,
        "last_purchase_date": document.getElementById("addPurchaseDate").value
    }
    if (!customer.customer_name || !customer.email || !customer.phone || !customer.address || !customer.date_of_birth || !customer.gender || !customer.occupation || !customer.membership_status || !customer.last_purchase_date) {
        alert("Please fill all the fields");
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/customers", true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("addName").value = "";
            document.getElementById("addEmail").value = "";
            document.getElementById("addPhone").value = "";
            document.getElementById("addAddress").value = "";
            document.getElementById("addDob").value = "";
            document.getElementById("addGender").value = "";
            document.getElementById("addOccupation").value = "";
            document.getElementById("addStatus").value = "";
            document.getElementById("addPurchaseDate").value = "";
            alert("New Customer Added");
            fetchCustomers();
        }
    }
    xhttp.send(JSON.stringify(customer));
}

function editFunction(name, email, phone, address, dob, gender, occupation, membership_status, purDate, id) {
    console.log("editFunction");
    console.log(phone);
    document.getElementById("addUser").style.display = "none";
    document.getElementById("editUser").style.display = "block";
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editAddress").value = address;
    document.getElementById("editDob").value = dob;
    document.getElementById("editGender").value = gender;
    document.getElementById("editOccupation").value = occupation;
    document.getElementById("editStatus").value = membership_status;
    document.getElementById("editPurchaseDate").value = purDate;
    closeEdit();
    document.getElementById("submitEditUserButton").addEventListener('click', function handle() {
        editUser(id);
        document.getElementById("submitEditUserButton").removeEventListener('click', handle);
    });
}
function editUser(id) {
    var customer = {
        "customer_name": document.getElementById("editName").value,
        "email": document.getElementById("editEmail").value,
        "phone": document.getElementById("editPhone").value,
        "address": document.getElementById("editAddress").value,
        "date_of_birth": document.getElementById("editDob").value,
        "gender": document.getElementById("editGender").value,
        "occupation": document.getElementById("editOccupation").value,
        "membership_status": document.getElementById("editStatus").value,
        "last_purchase_date": document.getElementById("editPurchaseDate").value
    };
    if (!customer.customer_name || !customer.email || !customer.phone || !customer.address || !customer.date_of_birth || !customer.gender || !customer.occupation || !customer.membership_status || !customer.last_purchase_date) {
        alert("Please fill all the fields");
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/customers/" + id, true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Customer Edited");
            fetchCustomers();
        }
    }
    xhttp.send(JSON.stringify(customer));
}
function deleteFunction(id) {
    if (confirm("Are you sure?")) {
        console.log("confirmed");
        console.log(id);
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "http://localhost:3000/customers/" + id, true);
        xhttp.setRequestHeader('content-type', 'application/json');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                fetchCustomers();
            }
        }
        xhttp.send();
    }
}

let isAddListened = false;
function closeAdd() {
    if (isAddListened) return;
    console.log("CloseAdd()");
    var addUser = document.getElementById("addUser");
    document.getElementById("addUserButton").addEventListener('click', (event) => {
        document.getElementById("addUser").style.display = "block";
        event.stopPropagation();
    });
    document.addEventListener('click', function (event) {
        if (document.getElementById("addUser").style.display === "block" && !addUser.contains(event.target)) {
            document.getElementById("addUser").style.display = "none";
        }
    });
    isAddListened = true;

}

let isEditListened = false;
function closeEdit() {
    if (isEditListened) return;
    console.log("CloseEdit()");
    var editUser = document.getElementById("editUser");
    document.addEventListener('click', function (event) {
        if (document.getElementById("editUser").style.display === "block" && !editUser.contains(event.target) && !event.target.classList.contains("edit")) {
            document.getElementById("editUser").style.display = "none";
        }
    });
    isEditListened = true;

}