/**
 * TeamPortfolio Dashboard - Simplified & Fixed
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Home page initialized');

    // Initialize Navigation
    if (typeof Navbar !== 'undefined') {
        Navbar.init('Home');
    }

    // Initialize all components
    initButtons();
    initCurrentYear();

    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }, 500);
});
function initButtons() {
    // Explore button
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function (e) {
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

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn:not(.btn-icon)');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            createRippleEffect(e, this);
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
 * Initialize logout functionality
 */
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            // Clear session storage
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');

            // Show notification
            showNotification('You have been logged out successfully', 'info');

            // Redirect to login page after delay
            setTimeout(() => {
                window.location.href = '../login/login.html';
            }, 1000);
        });
    }
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

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
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