/**
 * TeamPortfolio Projects Page
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Projects page initialized');

    // Initialize Navigation
    if (typeof Navbar !== 'undefined') {
        Navbar.init('Projects');
    }

    // Initialize components
    initProjects();
    initFilters();
    initSearch();
    initButtons();
    initCurrentYear();

    // Load projects
    loadProjects();
});

/**
 * Initialize project data and display
 */
function initProjects() {
    // Project data
    window.projectsData = [
        {
            id: 1,
            title: "React Dashboard System",
            category: "web",
            description: "A comprehensive analytics dashboard built with React, featuring real-time data visualization and interactive charts for business intelligence.",
            tech: ["React", "TypeScript", "Chart.js", "Material-UI", "Node.js"],
            status: "active",
            featured: true,
            stats: {
                timeline: "3 months",
                team: "5 members",
                complexity: "High"
            }
        },
        {
            id: 2,
            title: "E-Commerce Mobile App",
            category: "mobile",
            description: "Cross-platform mobile application for online shopping with seamless payment integration and personalized recommendations.",
            tech: ["React Native", "Redux", "Stripe API", "Firebase"],
            status: "completed",
            featured: false,
            stats: {
                timeline: "4 months",
                team: "6 members",
                complexity: "Medium"
            }
        },
        {
            id: 3,
            title: "API Gateway Service",
            category: "api",
            description: "Scalable microservices architecture with API gateway, load balancing, and authentication middleware.",
            tech: ["Node.js", "Express", "Redis", "Docker", "JWT"],
            status: "active",
            featured: false,
            stats: {
                timeline: "2 months",
                team: "3 members",
                complexity: "High"
            }
        },
        {
            id: 4,
            title: "Banking UI/UX Design",
            category: "design",
            description: "Modern banking interface design system with focus on accessibility, security, and user experience.",
            tech: ["Figma", "Adobe XD", "User Testing", "Prototyping"],
            status: "in-progress",
            featured: false,
            stats: {
                timeline: "1.5 months",
                team: "2 members",
                complexity: "Medium"
            }
        },
        {
            id: 5,
            title: "Machine Learning Chatbot",
            category: "ai",
            description: "AI-powered customer support chatbot with natural language processing and sentiment analysis.",
            tech: ["Python", "TensorFlow", "NLP", "FastAPI", "PostgreSQL"],
            status: "active",
            featured: false,
            stats: {
                timeline: "5 months",
                team: "4 members",
                complexity: "High"
            }
        },
        {
            id: 6,
            title: "Task Management Platform",
            category: "web",
            description: "Collaborative project management tool with real-time updates, file sharing, and team communication.",
            tech: ["Vue.js", "Socket.io", "MongoDB", "AWS"],
            status: "completed",
            featured: false,
            stats: {
                timeline: "6 months",
                team: "8 members",
                complexity: "High"
            }
        },
        {
            id: 7,
            title: "Fitness Tracking App",
            category: "mobile",
            description: "Mobile application for tracking workouts, nutrition, and health metrics with social features.",
            tech: ["Flutter", "Firebase", "HealthKit", "GraphQL"],
            status: "in-progress",
            featured: false,
            stats: {
                timeline: "3 months",
                team: "4 members",
                complexity: "Medium"
            }
        },
        {
            id: 8,
            title: "Data Analytics Pipeline",
            category: "api",
            description: "ETL pipeline for processing and analyzing large datasets with automated reporting.",
            tech: ["Python", "Apache Spark", "Airflow", "BigQuery", "Tableau"],
            status: "active",
            featured: false,
            stats: {
                timeline: "4 months",
                team: "5 members",
                complexity: "High"
            }
        }
    ];

    // Filter state
    window.filterState = {
        currentFilter: 'all',
        searchQuery: '',
        displayedProjects: 6
    };
}

/**
 * Load and display projects
 */
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    const featuredContainer = document.getElementById('featuredProject');

    if (!grid) return;

    // Clear existing projects
    grid.innerHTML = '';

    // Filter projects
    const filteredProjects = filterProjects();

    // Update project counts
    updateProjectCounts(filteredProjects);

    // Display projects
    filteredProjects.slice(0, window.filterState.displayedProjects).forEach(project => {
        grid.appendChild(createProjectCard(project));
    });

    // Load featured project
    loadFeaturedProject(featuredContainer);

    // Animate projects
    animateProjects();
}

/**
 * Create project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.featured ? 'featured' : ''}`;
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);

    const categoryIcons = {
        web: 'fas fa-globe',
        mobile: 'fas fa-mobile-alt',
        api: 'fas fa-server',
        design: 'fas fa-palette',
        ai: 'fas fa-robot'
    };

    const statusColors = {
        active: 'success',
        completed: 'primary',
        'in-progress': 'warning'
    };

    const statusLabels = {
        active: 'Active',
        completed: 'Completed',
        'in-progress': 'In Progress'
    };

    card.innerHTML = `
        ${project.featured ? '<span class="project-badge">Featured</span>' : ''}
        
        <div class="project-image">
            <i class="${categoryIcons[project.category] || 'fas fa-code'}"></i>
        </div>
        
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-category">
                    <i class="${categoryIcons[project.category] || 'fas fa-code'}"></i>
                    <span>${project.category.toUpperCase()}</span>
                </div>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            
            <div class="project-footer">
                <div class="project-status">
                    <div class="status-dot ${project.status}"></div>
                    <span>${statusLabels[project.status]}</span>
                </div>
                
                <div class="project-actions">
                    <button class="project-btn view-project" data-id="${project.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="project-btn like-project" data-id="${project.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const viewBtn = card.querySelector('.view-project');
    const likeBtn = card.querySelector('.like-project');

    viewBtn.addEventListener('click', function () {
        viewProjectDetails(project.id);
    });

    likeBtn.addEventListener('click', function () {
        likeProject(project.id);
    });

    // Add hover effect
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });

    return card;
}

/**
 * Load featured project
 */
function loadFeaturedProject(container) {
    if (!container) return;

    const featured = window.projectsData.find(p => p.featured);
    if (!featured) return;

    container.innerHTML = `
        <div class="featured-content">
            <div class="featured-image">
                <div class="project-badge">Featured Project</div>
            </div>
            
            <div class="featured-details">
                <div class="hero-badge">
                    <span><i class="fas fa-star"></i> Showcase Project</span>
                </div>
                
                <h2>${featured.title}</h2>
                <p class="project-description">${featured.description}</p>
                
                <div class="featured-tech">
                    ${featured.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                
                <div class="featured-stats">
                    <div class="featured-stat">
                        <div class="featured-stat-value">${featured.stats.timeline}</div>
                        <div class="featured-stat-label">Timeline</div>
                    </div>
                    <div class="featured-stat">
                        <div class="featured-stat-value">${featured.stats.team}</div>
                        <div class="featured-stat-label">Team Size</div>
                    </div>
                    <div class="featured-stat">
                        <div class="featured-stat-value">${featured.stats.complexity}</div>
                        <div class="featured-stat-label">Complexity</div>
                    </div>
                    <div class="featured-stat">
                        <div class="featured-stat-value">${featured.status}</div>
                        <div class="featured-stat-label">Status</div>
                    </div>
                </div>
                
                <div class="cta-actions" style="margin-top: var(--space-xl);">
                    <button class="btn btn-primary" id="viewFeaturedBtn">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Case Study</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listener to featured project button
    const viewBtn = container.querySelector('#viewFeaturedBtn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function () {
            viewProjectDetails(featured.id);
        });
    }
}

/**
 * Initialize filter functionality
 */
function initFilters() {
    const filterTags = document.querySelectorAll('.filter-tag');

    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tag
            this.classList.add('active');

            // Update filter state
            window.filterState.currentFilter = this.getAttribute('data-filter');
            window.filterState.displayedProjects = 6;

            // Reload projects
            loadProjects();

            // Show notification
            if (window.filterState.currentFilter !== 'all') {
                showNotification(`Filtering ${window.filterState.currentFilter} projects`, 'info');
            }
        });
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('projectSearch');

    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);

            searchTimeout = setTimeout(() => {
                window.filterState.searchQuery = this.value.toLowerCase();
                window.filterState.displayedProjects = 6;
                loadProjects();

                if (window.filterState.searchQuery) {
                    showNotification(`Searching for "${this.value}"`, 'info');
                }
            }, 300);
        });
    }
}

/**
 * Initialize button interactions
 */
function initButtons() {
    // Load More button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            window.filterState.displayedProjects += 3;
            loadProjects();

            // Disable button if all projects are displayed
            const filteredProjects = filterProjects();
            if (window.filterState.displayedProjects >= filteredProjects.length) {
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-check"></i> All Projects Loaded';
            }
        });
    }

    // Contact button
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function () {
            window.location.href = '../contact/contact.html';
        });
    }

    // View Demo button
    const viewDemoBtn = document.getElementById('viewDemoBtn');
    if (viewDemoBtn) {
        viewDemoBtn.addEventListener('click', function () {
            showNotification('Loading case studies...', 'info');
            // Scroll to featured project
            const featuredSection = document.querySelector('.featured-project');
            if (featuredSection) {
                window.scrollTo({
                    top: featuredSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Filter projects based on current filter and search
 */
function filterProjects() {
    return window.projectsData.filter(project => {
        // Apply category filter
        if (window.filterState.currentFilter !== 'all' &&
            project.category !== window.filterState.currentFilter) {
            return false;
        }

        // Apply search filter
        if (window.filterState.searchQuery) {
            const searchText = window.filterState.searchQuery;
            const projectText = `
                ${project.title} 
                ${project.description} 
                ${project.tech.join(' ')} 
                ${project.category}
            `.toLowerCase();

            if (!projectText.includes(searchText)) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Update project counts in hero section
 */
function updateProjectCounts(filteredProjects) {
    const totalProjects = document.getElementById('totalProjects');
    const activeProjects = document.getElementById('activeProjects');
    const techStack = document.getElementById('techStack');

    if (totalProjects) {
        totalProjects.textContent = filteredProjects.length;
    }

    if (activeProjects) {
        const activeCount = filteredProjects.filter(p => p.status === 'active').length;
        activeProjects.textContent = activeCount;
    }

    if (techStack) {
        // Count unique technologies across all projects
        const allTech = filteredProjects.flatMap(p => p.tech);
        const uniqueTech = [...new Set(allTech)];
        techStack.textContent = uniqueTech.length;
    }
}

/**
 * View project details
 */
function viewProjectDetails(projectId) {
    const project = window.projectsData.find(p => p.id === projectId);
    if (!project) return;

    showNotification(`Opening ${project.title} details...`, 'info');

    // In a real app, this would open a modal or navigate to a details page
    console.log('Viewing project:', project);

    // For now, scroll to featured section and highlight
    const featuredSection = document.querySelector('.featured-project');
    if (featuredSection) {
        window.scrollTo({
            top: featuredSection.offsetTop - 100,
            behavior: 'smooth'
        });

        // Highlight project
        const projectCard = document.querySelector(`.project-card[data-id="${projectId}"]`);
        if (projectCard) {
            projectCard.classList.add('featured');
            setTimeout(() => {
                projectCard.classList.remove('featured');
            }, 3000);
        }
    }
}

/**
 * Like a project
 */
function likeProject(projectId) {
    const likeBtn = document.querySelector(`.like-project[data-id="${projectId}"]`);
    if (likeBtn) {
        likeBtn.innerHTML = '<i class="fas fa-heart" style="color: var(--accent);"></i>';
        likeBtn.disabled = true;

        showNotification('Project added to favorites!', 'success');

        // In a real app, this would save to localStorage or send to server
        console.log('Liked project:', projectId);
    }
}

/**
 * Animate projects on scroll
 */
function animateProjects() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
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
 * Show notification (reuse from main home.js if available)
 */
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/**
 * Initialize theme toggle (if not already initialized)
 */
if (typeof initThemeToggle === 'undefined') {
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const footerThemeToggle = document.getElementById('footerThemeToggle');
        const body = document.body;

        const toggleTheme = () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };

        [themeToggle, mobileThemeToggle, footerThemeToggle].forEach(button => {
            if (button) {
                button.addEventListener('click', toggleTheme);
            }
        });
    }

    // Call it if needed
    initThemeToggle();
}