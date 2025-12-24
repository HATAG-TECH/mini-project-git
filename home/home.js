/**
 * TeamPortfolio Dashboard - Professional Dark Mode
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('TeamPortfolio Dashboard initialized');
    
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initButtons();
    initAnimations();
    initCurrentYear();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
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
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Set active nav link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Set home as active by default
    document.querySelector('.nav-link[href="#"]').classList.add('active');
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const footerThemeToggle = document.getElementById('footerThemeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    
    // Theme toggle function
    const toggleTheme = () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Dispatch custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: isDark ? 'dark' : 'light' }
        }));
    };
    
    // Add event listeners to all theme buttons
    [themeToggle, mobileThemeToggle, footerThemeToggle].forEach(button => {
        if (button) {
            button.addEventListener('click', toggleTheme);
        }
    });
    
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
 * Initialize button interactions
 */
function initButtons() {
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to login page...', 'info');
            createRippleEffect(e, this);
            
            // Simulate navigation delay
            setTimeout(() => {
                console.log('Navigate to login page');
                // window.location.href = '/login';
            }, 500);
        });
    }
    
    // Sign Up button
    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Redirecting to sign up page...', 'info');
            createRippleEffect(e, this);
            
            // Simulate navigation delay
            setTimeout(() => {
                console.log('Navigate to signup page');
                // window.location.href = '/signup';
            }, 500);
        });
    }
    
    // Explore Platform button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            showNotification('Exploring platform features...', 'success');
            createRippleEffect(e, this);
            
            // Scroll to features section
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                window.scrollTo({
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // View Demo button
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            showNotification('Loading demo dashboard...', 'info');
            createRippleEffect(e, this);
            
            // Scroll to dashboard section
            const dashboardSection = document.querySelector('.dashboard');
            if (dashboardSection) {
                window.scrollTo({
                    top: dashboardSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Start Trial button
    const startTrialBtn = document.getElementById('startTrialBtn');
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', function(e) {
            showNotification('Starting your free trial...', 'success');
            createRippleEffect(e, this);
            
            // Simulate trial start
            setTimeout(() => {
                console.log('Free trial started');
                // Redirect to signup with trial parameter
            }, 500);
        });
    }
    
    // Schedule Demo button
    const scheduleDemoBtn = document.getElementById('scheduleDemoBtn');
    if (scheduleDemoBtn) {
        scheduleDemoBtn.addEventListener('click', function(e) {
            showNotification('Opening demo scheduler...', 'info');
            createRippleEffect(e, this);
        });
    }
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

/**
 * Initialize page animations
 */
function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .dashboard-panel, .stat-card, .project-item'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
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
 * Create ripple effect on button click
 */
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
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
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
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
                background: rgba(var(--notification-bg), 0.95);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .notification-info {
                --notification-bg: 59, 130, 246;
            }
            
            .notification-success {
                --notification-bg: 16, 185, 129;
            }
            
            .notification-error {
                --notification-bg: 239, 68, 68;
            }
            
            .notification-warning {
                --notification-bg: 245, 158, 11;
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
 * Simulate live data updates
 */
function simulateLiveData() {
    // Update stats every 30 seconds
    setInterval(() => {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const currentValue = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
            const isPercentage = stat.textContent.includes('%');
            const change = Math.random() * 0.02 - 0.01; // -1% to +1%
            
            let newValue;
            if (isPercentage) {
                newValue = Math.min(100, Math.max(0, currentValue + (currentValue * change)));
                stat.textContent = `${newValue.toFixed(0)}%`;
            } else if (stat.textContent.includes('s')) {
                newValue = Math.max(0.5, currentValue + (Math.random() * 0.2 - 0.1));
                stat.textContent = `${newValue.toFixed(1)}s`;
            } else {
                newValue = Math.max(1, Math.round(currentValue + (currentValue * change)));
                stat.textContent = newValue.toLocaleString();
            }
        });
        
        // Update activity times
        const activityTimes = document.querySelectorAll('.activity-time');
        activityTimes.forEach((time, index) => {
            const hoursAgo = index + 1;
            if (hoursAgo === 1) {
                time.textContent = '15 min ago';
            } else {
                time.textContent = `${hoursAgo} hours ago`;
            }
        });
    }, 30000);
}

// Initialize live data updates after page load
setTimeout(simulateLiveData, 5000);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            mobileToggle.click();
        }
    }
});