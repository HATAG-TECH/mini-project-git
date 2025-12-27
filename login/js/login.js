/**
 * Professional Login Page JavaScript
 * Frontend-only authentication simulation for demonstration purposes
 */

// DOM Ready Event
document.addEventListener('DOMContentLoaded', function () {
    console.log('Login page initialized');

    // Check if already logged in
    checkIfAlreadyLoggedIn();

    // Initialize all components
    initFormValidation();
    initPasswordToggle();
    initSocialButtons();
    initNavigation();
    initThemeToggle();
    initThemeToggle();
    checkRememberedUser();
    checkUrlErrors();
});

/**
 * Check for URL error parameters (e.g. access denied)
 */
function checkUrlErrors() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    if (error === 'access_denied') {
        // Clear the query param to avoid showing it on refresh
        window.history.replaceState({}, document.title, window.location.pathname);

        // Show notification with a slight delay to ensure it's visible
        setTimeout(() => {
            showNotification('Access Denied: Please log in to view that page.', 'error');
        }, 500);
    }
}

/**
 * Check if user is already logged in
 */
function checkIfAlreadyLoggedIn() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Already logged in, redirect to home page
        console.log('Already logged in, redirecting to home...');
        window.location.href = '../home/index.html';
    }
}

/**
 * Check for remembered user
 */
function checkRememberedUser() {
    const emailEl = document.getElementById('email');
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser && emailEl) {
        emailEl.value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
        return;
    }

    // If no remembered user, prefill with last registered email (helpful right after signup)
    const lastRegistered = localStorage.getItem('lastRegisteredEmail');
    if (lastRegistered && emailEl) {
        emailEl.value = lastRegistered;
    }
}

/**
 * Initialize form validation and submission
 */
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginButton = document.getElementById('loginButton');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Demo credentials removed for production security


    if (!loginForm) return;

    // Real-time validation
    emailInput.addEventListener('input', function () {
        validateEmail(this, emailError);
    });

    passwordInput.addEventListener('input', function () {
        validatePassword(this, passwordError);
    });

    // Form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submitted');

        // Reset errors
        clearErrors();

        // Validate inputs
        let isValid = true;

        if (!validateEmail(emailInput, emailError)) {
            isValid = false;
        }

        if (!validatePassword(passwordInput, passwordError)) {
            isValid = false;
        }

        if (!isValid) {
            showNotification('Please correct the errors in the form', 'error');
            return;
        }

        console.log('Form is valid, starting authentication...');

        // Simulate authentication
        simulateAuthentication(
            emailInput.value.trim(),
            passwordInput.value
        );
    });

    // Validate email
    function validateEmail(input, errorElement) {
        const value = input.value.trim();

        if (!value) {
            showError(input, errorElement, 'Email is required');
            return false;
        }

        if (!isValidEmail(value)) {
            showError(input, errorElement, 'Please enter a valid email address');
            return false;
        }

        clearError(input, errorElement);
        return true;
    }

    // Validate password
    function validatePassword(input, errorElement) {
        const value = input.value;

        if (!value) {
            showError(input, errorElement, 'Password is required');
            return false;
        }

        if (value.length < 6) {
            showError(input, errorElement, 'Password must be at least 6 characters');
            return false;
        }

        clearError(input, errorElement);
        return true;
    }

    // Show error state
    function showError(input, errorElement, message) {
        input.style.borderColor = 'var(--error)';
        input.parentElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
    }

    // Clear error state
    function clearError(input, errorElement) {
        input.style.borderColor = '';
        input.parentElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.opacity = '0';
    }

    // Clear all errors
    function clearErrors() {
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
    }

    /**
     * Simulate authentication process - FIXED REDIRECT
     */
    function simulateAuthentication(email, password) {
        console.log('Authenticating user:', email);

        // Show loading state
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="button-text">Authenticating...</span><i class="fas fa-spinner fa-spin button-icon"></i>';
        loadingOverlay.classList.add('active');

        // Simulate API call delay
        setTimeout(() => {
            const identifier = email.trim();

            // Check stored users first (allow login by email or username)
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const matchedUser = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);

            if (matchedUser) {
                console.log('Authentication successful (registered user)!');

                showNotification('Login successful! Redirecting to dashboard...', 'success');

                // Store login state in session storage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', matchedUser.email);
                sessionStorage.setItem('userName', matchedUser.username);

                // Check remember me
                const rememberMe = document.getElementById('rememberMe').checked;
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', identifier);
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                setTimeout(() => {
                    window.location.href = '../home/index.html';
                }, 800);

                return;
            }

            // Invalid credentials (No demo fallback)
            console.log('Authentication failed');
            showNotification('Invalid email/username or password. Please register if you don\'t have an account.', 'error');

            // Reset form state
            loginButton.disabled = false;
            loginButton.innerHTML = '<span class="button-text">Sign In to Dashboard</span><i class="fas fa-arrow-right button-icon"></i>';
            loadingOverlay.classList.remove('active');

            // Add error effects
            emailInput.style.borderColor = 'var(--error)';
            passwordInput.style.borderColor = 'var(--error)';

            // Shake animation for error state
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
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
 * Initialize social login buttons (placeholder functionality)
 */
function initSocialButtons() {
    const googleButton = document.getElementById('googleLoginBtn');
    const githubButton = document.getElementById('githubLoginBtn');

    if (googleButton) {
        googleButton.addEventListener('click', function (e) {
            showNotification('Google authentication would open here', 'info');
            createRippleEffect(e, this);
            simulateSocialLogin(this, 'Google');
        });
    }

    if (githubButton) {
        githubButton.addEventListener('click', function (e) {
            showNotification('GitHub authentication would open here', 'info');
            createRippleEffect(e, this);
            simulateSocialLogin(this, 'GitHub');
        });
    }

    function simulateSocialLogin(button, provider) {
        const originalText = button.innerHTML;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span>Connecting...</span>`;
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification(`${provider} authentication is simulated for demonstration`, 'info');
        }, 1500);
    }
}

/**
 * Initialize navigation links
 */
function initNavigation() {
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Forgot Password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            showPasswordResetModal();
        });
    }
}

/**
 * Show password reset modal
 */
function showPasswordResetModal() {
    // Create password reset modal
    const modal = document.createElement('div');
    modal.className = 'password-reset-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h3><i class="fas fa-key"></i> Reset Password</h3>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <div class="form-group">
                <label for="resetEmail">Email Address</label>
                <input type="email" id="resetEmail" placeholder="abebe.kebede@example.com" class="form-input">
                <div class="error-message" id="resetEmailError"></div>
            </div>
            <button class="btn btn-primary" id="resetPasswordBtn">Send Reset Link</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .password-reset-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1001;
                backdrop-filter: blur(4px);
            }
            
            .modal-content {
                background: var(--white);
                padding: var(--space-2xl);
                border-radius: var(--radius-xl);
                max-width: 400px;
                width: 90%;
                position: relative;
                box-shadow: var(--shadow-xl);
                animation: fadeInUp 0.3s ease;
            }
            
            .modal-close {
                position: absolute;
                top: var(--space-md);
                right: var(--space-md);
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--gray);
                cursor: pointer;
                line-height: 1;
            }
            
            .modal-close:hover {
                color: var(--dark);
            }
            
            .modal-content h3 {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                margin-bottom: var(--space-md);
                color: var(--dark);
            }
            
            .modal-content p {
                color: var(--gray);
                margin-bottom: var(--space-xl);
            }
            
            .btn-primary {
                background: var(--primary);
                color: white;
                border: none;
                padding: var(--space-md) var(--space-xl);
                border-radius: var(--radius);
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: all var(--transition);
            }
            
            .btn-primary:hover {
                background: var(--primary-dark);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });

    // Handle password reset
    const resetBtn = modal.querySelector('#resetPasswordBtn');
    const resetEmail = modal.querySelector('#resetEmail');
    const resetError = modal.querySelector('#resetEmailError');

    resetBtn.addEventListener('click', () => {
        const email = resetEmail.value.trim();
        if (!email) {
            resetError.textContent = 'Please enter your email address';
            resetError.style.opacity = '1';
            return;
        }

        if (!isValidEmail(email)) {
            resetError.textContent = 'Please enter a valid email address';
            resetError.style.opacity = '1';
            return;
        }

        resetBtn.disabled = true;
        resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            showNotification(`Password reset link sent to ${email}`, 'success');
            modal.remove();
            document.body.style.overflow = '';
        }, 1500);
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme - DEFAULT TO DARK
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        // We will default to dark, but no need to forcibly save it immediately if we want to respect "system default" later, 
        // but for now let's be explicit as requested.
        if (!savedTheme) localStorage.setItem('theme', 'dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    });
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 20px;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                z-index: 9999;
                animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                max-width: 400px;
                box-shadow: var(--shadow-xl);
                backdrop-filter: blur(10px);
            }
            
            .notification-info {
                background: rgba(59, 130, 246, 0.95);
            }
            
            .notification-success {
                background: rgba(16, 185, 129, 0.95);
            }
            
            .notification-error {
                background: rgba(239, 68, 68, 0.95);
            }
            
            .notification-warning {
                background: rgba(245, 158, 11, 0.95);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                transition: color 0.2s ease;
            }
            
            .notification-close:hover {
                color: white;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
            
            @keyframes shake {
                10%, 90% { transform: translateX(-1px); }
                20%, 80% { transform: translateX(2px); }
                30%, 50%, 70% { transform: translateX(-3px); }
                40%, 60% { transform: translateX(3px); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close notification on button click
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function () {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

/**
 * Get appropriate icon for notification type
 */
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Submit form with Enter key
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && (focused.type === 'text' || focused.type === 'password' || focused.type === 'email')) {
            e.preventDefault();
            document.getElementById('loginButton')?.click();
        }
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.password-reset-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }
});