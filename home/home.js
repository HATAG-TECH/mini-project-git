/**
 * TeamPortfolio Dashboard - Home Page JavaScript
 * Contains interactive functionality for the dashboard
 */

// DOM Ready Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('TeamPortfolio Dashboard initialized');
    
    // Initialize all components
    initNavigation();
    initAuthModals();
    initButtons();
    initAnimations();
    initCurrentYear();
    initPasswordStrength();
    initFormValidation();
    initThemeToggle();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize authentication modals
 */
function initAuthModals() {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtnNav = document.getElementById('loginBtnNav');
    const signupBtnNav = document.getElementById('signupBtnNav');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open Login Modal
    if (loginBtnNav) {
        loginBtnNav.addEventListener('click', () => openModal(loginModal));
    }
    
    // Open Signup Modal
    if (signupBtnNav) {
        signupBtnNav.addEventListener('click', () => openModal(signupModal));
    }
    
    // Close Modals
    if (closeLogin) {
        closeLogin.addEventListener('click', () => closeModal(loginModal));
    }
    
    if (closeSignup) {
        closeSignup.addEventListener('click', () => closeModal(signupModal));
    }
    
    // Switch between modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => openModal(signupModal), 300);
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(signupModal);
            setTimeout(() => openModal(loginModal), 300);
        });
    }
    
    // Close modals when clicking outside
    [loginModal, signupModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal.classList.contains('active')) closeModal(loginModal);
            if (signupModal.classList.contains('active')) closeModal(signupModal);
        }
    });
    
    // Password toggle functionality
    initPasswordToggles();
}

/**
 * Open modal with animation
 */
function openModal(modal) {
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add focus to first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 300);
}

/**
 * Close modal with animation
 */
function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Initialize password toggle buttons
 */
function initPasswordToggles() {
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleSignupPassword = document.getElementById('toggleSignupPassword');
    const loginPassword = document.getElementById('loginPassword');
    const signupPassword = document.getElementById('signupPassword');
    
    if (toggleLoginPassword && loginPassword) {
        toggleLoginPassword.addEventListener('click', () => {
            togglePasswordVisibility(loginPassword, toggleLoginPassword);
        });
    }
    
    if (toggleSignupPassword && signupPassword) {
        toggleSignupPassword.addEventListener('click', () => {
            togglePasswordVisibility(signupPassword, toggleSignupPassword);
        });
    }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(passwordInput, toggleButton) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = toggleButton.querySelector('i');
    if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/**
 * Initialize password strength indicator
 */
function initPasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    if (!passwordInput || !strengthBar || !strengthText) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.className = 'strength-fill';
        strengthBar.classList.add(strength.class);
        
        // Update strength text
        strengthText.textContent = strength.text;
        strengthText.style.color = strength.color;
    });
}

/**
 * Calculate password strength
 */
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine strength
    if (password.length === 0) {
        return { class: '', text: 'Password strength', color: '#6b7280' };
    } else if (score <= 2) {
        return { class: 'weak', text: 'Weak password', color: '#ef4444' };
    } else if (score <= 4) {
        return { class: 'medium', text: 'Medium strength', color: '#f59e0b' };
    } else {
        return { class: 'strong', text: 'Strong password', color: '#10b981' };
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }
}

/**
 * Handle login form submission
 */
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Mock successful login
        showNotification('Welcome back! Login successful.', 'success');
        closeModal(document.getElementById('loginModal'));
        
        // In a real app, you would:
        // 1. Send login request to server
        // 2. Store authentication token
        // 3. Redirect to dashboard
    }, 1500);
}

/**
 * Handle signup form submission
 */
function handleSignupSubmit(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const terms = document.getElementById('terms').checked;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please agree to the terms and conditions', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Mock successful signup
        showNotification(`Welcome ${firstName}! Your account has been created.`, 'success');
        closeModal(document.getElementById('signupModal'));
        
        // In a real app, you would:
        // 1. Send signup request to server
        // 2. Send verification email
        // 3. Redirect to verification or dashboard page
    }, 2000);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize button interactions
 */
function initButtons() {
    // Get Started button (now signup)
    const getStartedBtn = document.getElementById('signupBtnNav');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            createRippleEffect(event, this);
        });
    }
    
    // Explore Platform button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            showNotification('Opening platform explorer...', 'info');
            
            // Scroll to features section
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                window.scrollTo({
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            createRippleEffect(event, this);
        });
    }
    
    // View Projects button
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function() {
            showNotification('Loading project gallery...', 'info');
            
            // Highlight project section
            const projectSection = document.querySelector('.dashboard-preview-section');
            if (projectSection) {
                projectSection.style.boxShadow = '0 0 0 4px rgba(67, 97, 238, 0.3)';
                setTimeout(() => {
                    projectSection.style.boxShadow = '';
                }, 1500);
            }
            
            createRippleEffect(event, this);
        });
    }
    
    // Join Team button
    const joinTeamBtn = document.getElementById('joinTeamBtn');
    if (joinTeamBtn) {
        joinTeamBtn.addEventListener('click', function() {
            openModal(document.getElementById('signupModal'));
            createRippleEffect(event, this);
        });
    }
    
    // Social auth buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            showNotification(`Connecting with ${provider}...`, 'info');
            
            // In a real app, this would trigger OAuth flow
            setTimeout(() => {
                showNotification(`${provider} authentication successful!`, 'success');
            }, 1000);
        });
    });
    
    // All other buttons with ripple effect
    const buttons = document.querySelectorAll('.btn:not(.social-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                createRippleEffect(e, this);
            }
        });
    });
}

/**
 * Initialize page animations
 */
function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .dashboard-card, .stat-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add hover animations to cards
    const cards = document.querySelectorAll('.card, .feature-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
}

/**
 * Initialize current year in footer
 */
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize theme toggle (light/dark mode)
 */
function initThemeToggle() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Theme toggle could be added as a button in the navbar
    // This is a basic implementation that can be expanded
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(event, button) {
    // Only create ripple if button is not loading
    if (button.classList.contains('loading')) return;
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple element after animation completes
    setTimeout(() => {
        if (ripple.parentNode === button) {
            ripple.remove();
        }
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
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification-success {
                background-color: #10b981;
            }
            
            .notification-info {
                background-color: #3b82f6;
            }
            
            .notification-error {
                background-color: #ef4444;
            }
            
            .notification-warning {
                background-color: #f59e0b;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
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
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
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
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Simulate live data updates for dashboard
 */
function simulateLiveUpdates() {
    // Update stats periodically (every 30 seconds)
    setInterval(() => {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const valueElement = card.querySelector('.stat-value');
            if (valueElement) {
                const currentValue = parseInt(valueElement.textContent);
                const change = Math.floor(Math.random() * 5) - 2; // Random change -2 to +2
                const newValue = Math.max(1, currentValue + change);
                
                // Animate the number change
                animateValueChange(valueElement, currentValue, newValue);
            }
        });
    }, 30000);
}

/**
 * Animate value change in an element
 */
function animateValueChange(element, start, end, duration = 500) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(start + (end - start) * easeProgress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Start live updates simulation
setTimeout(simulateLiveUpdates, 5000);