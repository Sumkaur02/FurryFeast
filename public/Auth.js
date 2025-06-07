// Check if user is already logged in
if (localStorage.getItem('currentUser') && window.location.pathname.includes('sign')) {
    window.location.href = 'index.html';
}

// Sign Up Form
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('newEmail').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            showError('newEmail', 'Email already registered');
            return;
        }
        
        // Create new user
        const newUser = {
            name,
            email,
            password // Note: In a real app, you would hash the password
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Log the user in
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'index.html';
    });
}

// Sign In Form
const signinForm = document.getElementById('signinForm');
if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (!user) {
            showError('password', 'Invalid email or password');
            return;
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error show';
    errorElement.textContent = message;
    
    // Remove existing error if any
    const existingError = field.nextElementSibling;
    if (existingError && existingError.classList.contains('error')) {
        existingError.remove();
    }
    
    field.insertAdjacentElement('afterend', errorElement);
    field.focus();
}

// Remove the redundant logout functionality from this file
// It's now handled in script.js

