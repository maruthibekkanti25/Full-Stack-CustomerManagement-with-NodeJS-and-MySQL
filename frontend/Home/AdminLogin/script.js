document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Send login details to the server
    fetch('http://localhost:3000/admin-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful. Redirecting to AdminDisplay.html...');
            // Redirect to admin display page if credentials match
            window.location.href = '../AdminDisplay/index.html';
        } else {
            console.log('Login failed. Showing error message.');
            // Show error message if credentials don't match
            document.getElementById('errorMessage').textContent = 'Invalid username or password';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'An error occurred. Please try again later.';
    });
});
