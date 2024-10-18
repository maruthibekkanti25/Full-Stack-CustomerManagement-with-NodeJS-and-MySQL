document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('User registered successfully');
            window.location.href = '../UserLogin/userLogin.html';
        } else {
            document.getElementById('errorMessage').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
