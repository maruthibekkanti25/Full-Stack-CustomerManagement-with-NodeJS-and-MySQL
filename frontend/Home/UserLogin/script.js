document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token && data.result.success) {
            localStorage.setItem('token', data.token);
            console.log('Login successful. Redirecting to UserDisplay.html...');
            // Redirect to admin display page if credentials match
            console.log(`Redirecting to: ../UserDisplay/index.html?username=${username}`);
            window.location.href = `../UserDisplay/index.html?username=${username}`;
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
