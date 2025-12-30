/**
 * Professional Register Page JavaScript
 * Frontend-only registration simulation for demonstration purposes
 */

// DOM Ready Event
document.addEventListener('DOMContentLoaded', function () {
    console.log('Register page initialized');

    // Initialize all components
    initFormValidation();
    initPasswordToggle();
    initSocialButtons();
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
        if (!savedTheme) localStorage.setItem('theme', 'dark');
    }
}

/**
 * Initialize form validation and submission
 */
function initFormValidation() {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const registerButton = document.getElementById('registerButton');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (!registerForm) return;

    // Real-time validation
    usernameInput.addEventListener('input', function () {
        validateField(this, usernameError, 'Username is required');
    });

    emailInput.addEventListener('input', function () {
        if (!this.value.trim()) {
            showError(this, emailError, 'Email is required');
        } else if (!isValidEmail(this.value.trim())) {
            showError(this, emailError, 'Please enter a valid email address');
        } else {
            clearError(this, emailError);
        }
    });

    passwordInput.addEventListener('input', function () {
        if (!this.value.trim()) {
            showError(this, passwordError, 'Password is required');
        } else {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongPasswordRegex.test(this.value)) {
                showError(this, passwordError, 'Password must be 8+ chars, include Upper, Lower, Number, and Special character');
            } else {
                clearError(this, passwordError);
            }
        }
    });

    // Form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Reset errors
        clearErrors();

        // Validate inputs
        let isValid = true;

        if (!validateField(usernameInput, usernameError, 'Username is required')) {
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else {
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongPasswordRegex.test(passwordInput.value)) {
                showError(passwordInput, passwordError, 'Password must be 8+ chars, include Upper, Lower, Number, and Special character');
                isValid = false;
            }
        }

        if (!termsCheckbox.checked) {
            showNotification('Please agree to the Terms & Conditions', 'error');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Simulate registration
        simulateRegistration(
            usernameInput.value.trim(),
            emailInput.value.trim(),
            passwordInput.value
        );
    });

    // Validate email format
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Validate a single field
    function validateField(input, errorElement, message) {
        const value = input.value.trim();

        if (!value) {
            showError(input, errorElement, message);
            return false;
        }

        clearError(input, errorElement);
        return true;
    }

    // Show error state
    function showError(input, errorElement, message) {
        input.style.borderColor = 'var(--error)';
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    // Clear error state
    function clearError(input, errorElement) {
        input.style.borderColor = '';
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }

    // Clear all errors
    function clearErrors() {
        clearError(usernameInput, usernameError);
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
    }

    /**
     * Simulate registration process
     */
    function simulateRegistration(username, email, password) {
        // Show loading state
        registerButton.disabled = true;
        const originalButtonContent = registerButton.innerHTML;
        registerButton.innerHTML = '<span class="button-text">Creating Account...</span>';
        loadingOverlay.classList.add('active');

        // Simulate API call delay
        setTimeout(() => {
            // Persist user to localStorage (simple demo storage)
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check for existing email or username
            const exists = users.find(u => u.email === email || u.username === username);
            if (exists) {
                showNotification('An account with that email or username already exists', 'error');
                registerButton.disabled = false;
                registerButton.innerHTML = originalButtonContent;
                loadingOverlay.classList.remove('active');
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            // Optional: store last registered values to prefill login
            localStorage.setItem('lastRegisteredEmail', email);
            localStorage.setItem('lastRegisteredUser', username);

            // Successful "registration"
            showNotification('Account created successfully! Redirecting to login...', 'success');

            // Redirect to login page after delay
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 1200);

        }, 900); // Simulate network delay
    }
}

/**
 * Initialize password visibility toggle
 */
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    if (!passwordToggle || !passwordInput) return;

    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');

        // Add focus back to input
        passwordInput.focus();
    });
}

/**
 * Initialize social registration buttons (placeholder functionality)
 */
function initSocialButtons() {
    const googleButton = document.querySelector('.google-button');
    const githubButton = document.querySelector('.github-button');

    if (googleButton) {
        googleButton.addEventListener('click', function () {
            showNotification('Google registration would open here', 'info');
        });
    }

    if (githubButton) {
        githubButton.addEventListener('click', function () {
            showNotification('GitHub registration would open here', 'info');
        });
    }
}

/**
 * Show professional notification
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;

    container.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(30px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}
