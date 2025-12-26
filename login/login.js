/**
 * Professional Login Page JavaScript
 * Frontend-only authentication simulation for demonstration purposes
 */

// DOM Ready Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page initialized');
    
    // Initialize all components
    initFormValidation();
    initPasswordToggle();
    initSocialButtons();
    initDemoCredentials();
    initNavigation();
    initAnimations();
});

/**
 * Initialize form validation and submission
 */
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginButton = document.getElementById('loginButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Demo credentials for simulation
    const DEMO_CREDENTIALS = {
        username: 'demo@teamportfolio.com',
        password: 'demo123'
    };
    
    if (!loginForm) return;
    
    // Real-time validation
    usernameInput.addEventListener('input', function() {
        validateField(this, usernameError, 'Username is required');
    });
    
    passwordInput.addEventListener('input', function() {
        validateField(this, passwordError, 'Password is required');
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        clearErrors();
        
        // Validate inputs
        let isValid = true;
        
        if (!validateField(usernameInput, usernameError, 'Username is required')) {
            isValid = false;
        }
        
        if (!validateField(passwordInput, passwordError, 'Password is required')) {
            isValid = false;
        }
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate authentication
        simulateAuthentication(
            usernameInput.value.trim(),
            passwordInput.value,
            DEMO_CREDENTIALS
        );
    });
    
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
        clearError(passwordInput, passwordError);
    }
    
    /**
     * Simulate authentication process
     */
    function simulateAuthentication(username, password, demoCredentials) {
        // Show loading state
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="button-text">Signing in...</span><i class="fas fa-spinner fa-spin button-icon"></i>';
        loadingOverlay.classList.add('active');
        
        // Simulate API call delay
        setTimeout(() => {
            // Check against demo credentials
            if (username === demoCredentials.username && password === demoCredentials.password) {
                // Successful login
                showNotification('Login successful! Redirecting to dashboard...', 'success');
                
                // Store login state in session storage for demonstration
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', username);
                sessionStorage.setItem('userName', 'Demo User');
                
                // Check remember me
                const rememberMe = document.getElementById('rememberMe').checked;
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
                // Redirect to home page after delay
                setTimeout(() => {
                    window.location.href = '../home/index.html';
                }, 1500);
                
            } else {
                // Invalid credentials
                showNotification('Invalid username or password. Try: demo@teamportfolio.com / demo123', 'error');
                
                // Reset form state
                loginButton.disabled = false;
                loginButton.innerHTML = '<span class="button-text">Sign In</span><i class="fas fa-arrow-right button-icon"></i>';
                loadingOverlay.classList.remove('active');
                
                // Add error effects
                usernameInput.style.borderColor = 'var(--error)';
                passwordInput.style.borderColor = 'var(--error)';
                
                // Shake animation for error state
                loginForm.classList.add('shake');
                setTimeout(() => {
                    loginForm.classList.remove('shake');
                }, 500);
            }
        }, 1200); // Simulate network delay
    }
    
    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
}

/**
 * Initialize password visibility toggle
 */
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (!passwordToggle || !passwordInput) return;
    
    passwordToggle.addEventListener('click', function() {
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
        googleButton.addEventListener('click', function(e) {
            showNotification('Google authentication would open here', 'info');
            
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Simulate loading state
            simulateSocialLogin(this, 'Google');
        });
    }
    
    if (githubButton) {
        githubButton.addEventListener('click', function(e) {
            showNotification('GitHub authentication would open here', 'info');
            
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Simulate loading state
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
 * Initialize demo credentials auto-fill
 */
function initDemoCredentials() {
    const fillDemoBtn = document.getElementById('fillDemoBtn');
    const demoCredentials = document.querySelector('.demo-credentials');
    
    if (fillDemoBtn) {
        fillDemoBtn.addEventListener('click', function(e) {
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            if (usernameInput && passwordInput) {
                usernameInput.value = 'demo@teamportfolio.com';
                passwordInput.value = 'demo123';
                
                // Trigger input events for validation
                usernameInput.dispatchEvent(new Event('input'));
                passwordInput.dispatchEvent(new Event('input'));
                
                // Show confirmation
                showNotification('Demo credentials filled! Click "Sign In" to continue.', 'success');
                
                // Focus on login button
                const loginButton = document.getElementById('loginButton');
                if (loginButton) {
                    setTimeout(() => loginButton.focus(), 100);
                }
                
                createRippleEffect(e, this);
            }
        });
    }
    
    // Auto-fill on clicking credentials text
    if (demoCredentials) {
        const credentialItems = demoCredentials.querySelectorAll('.credential-item');
        credentialItems.forEach(item => {
            item.addEventListener('click', function() {
                fillDemoBtn.click();
            });
        });
    }
}

/**
 * Initialize navigation links
 */
function initNavigation() {
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    
    // Forgot Password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
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
                        <input type="email" id="resetEmail" placeholder="you@example.com" class="form-input">
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
                        background: white;
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
        });
    }
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
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
    closeBtn.addEventListener('click', function() {
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
    switch(type) {
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
document.addEventListener('keydown', function(e) {
    // Submit form with Enter key
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && (focused.type === 'text' || focused.type === 'password')) {
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