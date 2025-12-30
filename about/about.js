// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const footerThemeToggle = document.getElementById('footerThemeToggle');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const currentYear = document.getElementById('currentYear');
const valueCards = document.querySelectorAll('.value-card');

// Initialize AOS (Animate on Scroll) if available
let aosInitialized = false;

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    document.body.className = savedTheme;
    updateThemeIcons(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';

    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
    const sunIcons = document.querySelectorAll('.fa-sun');
    const moonIcons = document.querySelectorAll('.fa-moon');

    if (theme === 'dark-mode') {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'inline-block');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'inline-block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    const icon = mobileToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Initialize AOS (Animate on Scroll) - Simulated version
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
        aosInitialized = true;
    } else {
        // Fallback animation for value cards
        valueCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
}

// Auth Button Handlers
function handleLogin() {
    // In a real application, this would redirect to login page
    alert('Login feature would open a login modal or redirect to login page.');
    console.log('Login button clicked');
}

function handleSignup() {
    // In a real application, this would redirect to signup page
    alert('Sign up feature would open a signup modal or redirect to signup page.');
    console.log('Signup button clicked');
}

// CTA Button Handlers
function handleGetStarted() {
    const ctaBtn = document.querySelector('.cta-actions .btn-primary');
    ctaBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Redirecting...</span>';

    setTimeout(() => {
        alert('Redirecting to signup page...');
        // window.location.href = '/signup'; // Uncomment for actual redirection
        ctaBtn.innerHTML = '<i class="fas fa-rocket"></i><span>Get Started Free</span>';
    }, 1000);
}

function handleScheduleDemo() {
    const demoBtn = document.querySelector('.cta-actions .btn-outline');
    demoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Scheduling...</span>';

    setTimeout(() => {
        alert('Opening demo scheduler...');
        // window.location.href = '/demo'; // Uncomment for actual redirection
        demoBtn.innerHTML = '<i class="fas fa-calendar"></i><span>Schedule Demo</span>';
    }, 1000);
}

// Set Current Year in Footer
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                observer.unobserve(statNumber);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => observer.observe(number));
}

// Initialize Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));
}

// Event Listeners
function initEventListeners() {
    // Theme toggles
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    footerThemeToggle.addEventListener('click', toggleTheme);

    // Mobile menu
    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Auth buttons
    if (loginBtn) loginBtn.addEventListener('click', handleLogin);
    if (signupBtn) signupBtn.addEventListener('click', handleSignup);

    // CTA buttons
    const getStartedBtn = document.querySelector('.cta-actions .btn-primary');
    const scheduleDemoBtn = document.querySelector('.cta-actions .btn-outline');

    if (getStartedBtn) getStartedBtn.addEventListener('click', handleGetStarted);
    if (scheduleDemoBtn) scheduleDemoBtn.addEventListener('click', handleScheduleDemo);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initEventListeners();
    setCurrentYear();
    initAOS();
    animateStats();
    initTimelineAnimation();

    // Add loading animation for better UX
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Tab navigation focus styles
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Additional CSS would be needed for animations and mobile menu
// Add the following to your about.css:

/*
.mobile-toggle.active i {
    transform: rotate(90deg);
}

.nav-menu {
    transition: transform 0.3s ease;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--bg-color);
        padding: 20px;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animated {
        opacity: 1;
        transform: translateX(0);
    }
}

.keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
*/