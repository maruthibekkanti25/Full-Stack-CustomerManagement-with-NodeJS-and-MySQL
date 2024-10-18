const params = new URLSearchParams(window.location.search);
const username = params.get('username');
var userId = -1;
console.log("Extracted Username: ", username);
window.onload = () => {
    fetchInventory();
}

function showToAdd() {
    document.getElementById('customers-container').style.display = 'block';
    // document.getElementById('popupForm').style.display = 'block';
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/customers', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const customersData = JSON.parse(xhr.responseText);
            const ctable = document.getElementById('ctable');
            ctable.innerHTML = `<tr id="tableheadings">
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
                <th>Add</th>
            </tr>`; // Clear the table before adding new rows
            
            for (const customer of customersData) {
                console.log("adding into showToAdd");
                let dob = new Date(customer.date_of_birth).toISOString().split('T')[0];
                let purDate = new Date(customer.last_purchase_date).toISOString().split('T')[0];
                const row = document.createElement('tr');
                row.className = 'customer';
                row.id = 'row' + customer.id;
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
                    <td class="purchaseDate">${purDate}</td>
                    <td class="actions">
                        <button class="addB" id="add${customer.id}" onclick="addInventory(${customer.id})">add</button>
                    </td>

                `;
                ctable.appendChild(row);
            }
        } else if (xhr.readyState === 4) {
            console.error("Error accessing data: " + xhr.statusText);
            alert("Error accessing data(all benefits)");
        }
    };
}

function closeShowToAdd() {
    document.getElementById('customers-container').style.display = 'none';
}

function fetchInventory() {
    const xhr = new XMLHttpRequest();
    console.log("Inventory Onload");
    xhr.open('GET', 'http://localhost:3000/users', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 201)) {
            const userData = JSON.parse(this.responseText);
            for (const user of userData) {
                if (user.username === username) {
                    console.log("User Found");
                    userId = user.id;
                    displayInventory(user.id);
                    break;
                }
            }
        }
    };
}
function addInventory(customerId) {
    console.log("addInventory"); 
    console.log(userId);
    console.log(customerId);

    fetch(`http://localhost:3000/customersrequests`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: userId , customer_id: customerId })  // Ensure that this JSON format matches the server-side expectation
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
            alert("Request sent successfully");
            window.location.reload();
        } else {
            alert("Request NOT sent");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
}


function addUserModal() {
    document.getElementById("addUser").style.display = "block";
}
function displayInventory(id) {
    console.log( "userID : " + id);
    const table = document.getElementById('inventoryTable').querySelector('tbody');
    console.log("Display Inventory Function");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/inventory/${id}`, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const inventoryData = JSON.parse(this.responseText);
            for (const item of inventoryData) {
                console.log("invID : "+item.inventory_id);
                const row = document.createElement('tr');
                row.id = "row"+item.inventory_id;
                row.style.backgroundColor = 'white';
                console.log("adding to Inventory");
                row.innerHTML = `
                    <td>${item.customer_name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.address}</td>
                    <td>${item.occupation}</td>
                    <td>${item.membership_status}</td>
                    <td>
                        <button id="remove" onclick="removeFromInventory(${item.inventory_id})" >Remove</button>
                        <button id="fav" onclick="addToFav(${row.id})" >Fav</button>
                    </td>
                `;
                table.appendChild(row);
            }
        } else if (this.readyState === 4) {
            console.error("Error accessing data");
            document.getElementById('errorMessage').textContent = "Error accessing data";
            document.getElementById('errorMessage').style.display = 'block';
        }
    };
}


function removeFromInventory(invId) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE',` http://localhost:3000/inventory/${invId}`, true);
    xhr.setRequestHeader('Authorization', localStorage.getItem('token'));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 201 || xhr.status === 200) {
                alert("customer deleted successfully");
                window.location.reload();
            } else {
                alert("Error deleting customer: " + xhr.statusText);
            }
        }
    };
    xhr.send();
}

function addToFav(row) {
    console.log("Added to Fav");
    if(row.style.backgroundColor !== 'white') {
        row.style.backgroundColor = 'white';
    }
    else{
        row.style.backgroundColor = 'rgb(85, 206, 91)';
    }
}