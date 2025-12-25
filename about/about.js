// about.js
document.addEventListener("DOMContentLoaded", () => {
    /* -----------------------------
       DOM ELEMENTS
    ----------------------------- */
    const body = document.body;

    const themeToggle = document.getElementById("themeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
    const footerThemeToggle = document.getElementById("footerThemeToggle");

    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");

    const currentYear = document.getElementById("currentYear");

    /* -----------------------------
       THEME HANDLING
    ----------------------------- */
    const THEME_KEY = "teamportfolio-theme";

    function setTheme(theme) {
        body.classList.remove("light-mode", "dark-mode");
        body.classList.add(theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeIcons(theme);
    }

    function toggleTheme() {
        const isLight = body.classList.contains("light-mode");
        setTheme(isLight ? "dark-mode" : "light-mode");
    }

    function updateThemeIcons(theme) {
        const showSun = theme === "dark-mode";

        document.querySelectorAll(".theme-btn").forEach(btn => {
            const sun = btn.querySelector(".fa-sun");
            const moon = btn.querySelector(".fa-moon");

            if (!sun || !moon) return;

            sun.style.display = showSun ? "inline-block" : "none";
            moon.style.display = showSun ? "none" : "inline-block";
        });
    }

    const savedTheme = localStorage.getItem(THEME_KEY) || "light-mode";
    setTheme(savedTheme);

    themeToggle?.addEventListener("click", toggleTheme);
    mobileThemeToggle?.addEventListener("click", toggleTheme);
    footerThemeToggle?.addEventListener("click", toggleTheme);

    /* -----------------------------
       MOBILE NAV TOGGLE
    ----------------------------- */
    mobileToggle?.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        mobileToggle.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            mobileToggle.classList.remove("active");
        });
    });

    /* -----------------------------
       AUTH BUTTON PLACEHOLDERS
    ----------------------------- */
    loginBtn?.addEventListener("click", () => {
        alert("Login functionality not implemented yet.");
    });

    signupBtn?.addEventListener("click", () => {
        alert("Sign up functionality not implemented yet.");
    });

    /* -----------------------------
       CURRENT YEAR (FOOTER)
    ----------------------------- */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* -----------------------------
       SIMPLE SCROLL ANIMATIONS
       (For data-aos attributes)
    ----------------------------- */
    const animatedElements = document.querySelectorAll("[data-aos]");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("aos-animate");
                }
            });
        },
        { threshold: 0.15 }
    );

    animatedElements.forEach(el => observer.observe(el));
});
