> Habtamu:
/
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
});

/
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
    
    /

> Habtamu:
* Simulate authentication process
     */
    function simulateAuthentication(username, password, demoCredentials) {
        // Show loading state
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="button-text">Signing in...</span>';
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
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
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

/
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

> Habtamu:
/
 * Initialize social login buttons (placeholder functionality)
 */
function initSocialButtons() {
    const googleButton = document.querySelector('.google-button');
    const githubButton = document.querySelector('.github-button');
    
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            showNotification('Google authentication would open here', 'info');
            
            // Add ripple effect
            createRippleEffect(event, this);
            
            // Simulate loading state
            simulateSocialLogin(this, 'Google');
        });
    }
    
    if (githubButton) {
        githubButton.addEventListener('click', function() {
            showNotification('GitHub authentication would open here', 'info');
            
            // Add ripple effect
            createRippleEffect(event, this);
            
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

/
 * Initialize demo credentials auto-fill
 */
function initDemoCredentials() {
    const demoCredentials = document.querySelector('.demo-credentials');
    
    if (!demoCredentials) return;
    
    // Auto-fill demo credentials on click
    demoCredentials.addEventListener('click', function(e) {
        if (e.target.closest('.credential-item')) {
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
                    loginButton.focus();
                }
            }
        }
    });
}

> Habtamu:
/
 * Initialize navigation links
 */
function initNavigation() {
    const createAccountLink = document.getElementById('createAccountLink');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    // Create Account link
    if (createAccountLink) {
        createAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to registration page...', 'info');
            
            // Simulate navigation delay
            setTimeout(() => {
                // In a real application, this would navigate to register.html
                console.log('Navigate to register page');
                // window.location.href = 'register.html';
            }, 500);
        });
    }
    
    // Forgot Password link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Password reset functionality would open here', 'info');
            
            // Simulate password reset flow
            setTimeout(() => {
                const email = prompt('Enter your email for password reset:');
                if (email) {
                    showNotification(`Password reset email sent to ${email}`, 'success');
                }
            }, 300);
        });
    }
}

/
 * Create ripple effect on button click
 */
function createRippleEffect(event, element)
