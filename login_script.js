document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginAsSelect = document.getElementById('loginAs');
    const loginCodeInput = document.getElementById('loginCode');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Optional: Change eye icon based on password visibility
        togglePassword.textContent = type === 'password' ? '👁' : '👁‍🗨';
    });

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        if (!loginAsSelect.value) {
            alert('Please select login type');
            return;
        }

        if (!loginCodeInput.value) {
            alert('Please enter login code');
            return;
        }

        if (!passwordInput.value) {
            alert('Please enter password');
            return;
        }

        // Create login data object
        const loginData = {
            loginType: loginAsSelect.value,
            loginCode: loginCodeInput.value,
            password: passwordInput.value
        };

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', loginData);
        
        // Example API call (commented out - implement according to your backend)
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/api/index';
            } else {
                alert(data.message || 'Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    
    });

    // Optional: Add input validation as user types
    loginCodeInput.addEventListener('input', function() {
        this.value = this.value.trim(); // Remove white spaces
    });

    // Optional: Prevent form submission on Enter key in select
    loginAsSelect.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});