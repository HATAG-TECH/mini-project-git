/**
 * Global Navigation System
 * Handles rendering and functionality of the navigation bar across all pages.
 */

const Navbar = {
    /**
     * Render the navigation bar into the 'global-header' element
     * @param {string} activePage - The name of the current page ('Home', 'About', 'Projects', 'Team', 'Contact')
     */
    render: function (activePage) {
        const headerElement = document.getElementById('global-header');
        if (!headerElement) {
            console.error('Global header element not found');
            return;
        }

        // Ensure the header has the correct classes and layout
        if (!headerElement.classList.contains('header')) {
            headerElement.classList.add('header');
        }

        const headerHTML = `
            <div class="container">
                <nav class="navbar">
                    <div class="nav-brand">
                        <a href="../home/index.html" class="logo-link" style="text-decoration: none;">
                            <span class="logo-text">TeamPortfolio</span>
                            <span class="logo-badge">PRO</span>
                        </a>
                    </div>

                    <div class="nav-menu" id="navMenu">
                        <div class="nav-links">
                            <a href="../home/index.html" class="nav-link ${activePage === 'Home' ? 'active' : ''}">
                                <i class="fas fa-home"></i>
                                <span>Home</span>
                            </a>
                            <a href="../about/about.html" class="nav-link ${activePage === 'About' ? 'active' : ''}">
                                <i class="fas fa-info-circle"></i>
                                <span>About</span>
                            </a>
                            <a href="../projects/projects.html" class="nav-link ${activePage === 'Projects' ? 'active' : ''}">
                                <i class="fas fa-project-diagram"></i>
                                <span>Projects</span>
                            </a>
                            <a href="../team/team.html" class="nav-link ${activePage === 'Team' ? 'active' : ''}">
                                <i class="fas fa-users"></i>
                                <span>Team</span>
                            </a>
                            <a href="../contact/contact.html" class="nav-link ${activePage === 'Contact' ? 'active' : ''}">
                                <i class="fas fa-envelope"></i>
                                <span>Contact</span>
                            </a>
                        </div>

                        <div class="nav-actions">
                            <div class="theme-toggle">
                                <button class="theme-btn" id="themeToggle" aria-label="Toggle theme">
                                    <i class="fas fa-sun"></i>
                                    <i class="fas fa-moon"></i>
                                </button>
                            </div>

                            <!-- Guest Menu -->
                            <div class="guest-menu" id="guestMenu" style="display: none;">
                                <a href="../login/login.html" class="btn btn-ghost" style="margin-right: 10px;">Login</a>
                                <a href="../register/register.html" class="btn btn-primary"
                                    style="padding: 8px 16px; border-radius: 8px; background: #4361ee; color: white; text-decoration: none;">Sign Up</a>
                            </div>

                            <!-- User Menu -->
                            <div class="user-menu" id="userMenu" style="display: none;">
                                <div class="user-info" style="display: flex; align-items: center; gap: 10px;">
                                    <div class="user-avatar" id="userAvatar"
                                        style="width: 32px; height: 32px; border-radius: 50%; background: #4361ee; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">
                                        U</div>
                                    <div class="user-details">
                                        <span class="user-name" id="userName"
                                            style="font-weight: 500; font-size: 0.9rem;">User</span>
                                    </div>
                                    <button class="logout-btn" id="logoutBtn" title="Logout"
                                        style="background: none; border: none; cursor: pointer; color: inherit; font-size: 1rem; margin-left: 10px;">
                                        <i class="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="nav-mobile-actions">
                        <button class="theme-btn mobile" id="mobileThemeToggle" aria-label="Toggle theme">
                            <i class="fas fa-sun"></i>
                            <i class="fas fa-moon"></i>
                        </button>
                        <button class="mobile-toggle" id="mobileToggle">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </nav>
            </div>
        `;

        headerElement.innerHTML = headerHTML;
    },

    /**
     * Initialize Theme, Auth, and Mobile Menu
     */
    init: function (activePage) {
        this.render(activePage);
        this.initTheme();
        this.updateAuthUI();
        this.initMobileMenu();
    },

    /**
     * Update Authentication UI based on session state
     */
    updateAuthUI: function () {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userMenu = document.getElementById('userMenu');
        const guestMenu = document.getElementById('guestMenu');
        const userNameDisplay = document.getElementById('userName');
        const userAvatarDisplay = document.getElementById('userAvatar');
        const logoutBtn = document.getElementById('logoutBtn');

        if (isLoggedIn) {
            if (userMenu) userMenu.style.display = 'block';
            if (guestMenu) guestMenu.style.display = 'none';

            const name = sessionStorage.getItem('userName') || 'User';
            if (userNameDisplay) userNameDisplay.textContent = name;
            if (userAvatarDisplay) userAvatarDisplay.textContent = name.charAt(0).toUpperCase();
        } else {
            if (userMenu) userMenu.style.display = 'none';
            if (guestMenu) guestMenu.style.display = 'block';
        }

        if (logoutBtn) {
            // Remove old listeners to avoid duplicates if re-initialized
            const newBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);

            newBtn.addEventListener('click', function () {
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('userName');
                window.location.href = '../login/login.html';
            });
        }
    },

    /**
     * Initialize Theme handling
     */
    initTheme: function () {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;

        // Default is dark (CSS :root has dark variables).
        // If savedTheme is 'light', add light-mode class to override.
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
            // Ensure consistent storage value (optional, but good for clarity)
            if (!savedTheme) localStorage.setItem('theme', 'dark');
        }

        // Setup theme toggles
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const footerThemeToggle = document.getElementById('footerThemeToggle'); // Sometimes in footer

        const toggleTheme = () => {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        };

        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
        if (footerThemeToggle) footerThemeToggle.addEventListener('click', toggleTheme);
    },

    /**
     * Initialize Mobile Menu toggle
     */
    initMobileMenu: function () {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });
        }
    }
};

// Export to window if needed
window.Navbar = Navbar;
