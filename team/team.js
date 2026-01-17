// Enhanced Team Page JavaScript with Advanced Animations

document.addEventListener('DOMContentLoaded', function () {
    // Initialize variables
    const loader = document.getElementById('loader');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const pageHeader = document.getElementById('pageHeader');
    const teamTitle = document.getElementById('teamTitle');
    const teamStats = document.getElementById('teamStats');
    const teamMission = document.getElementById('teamMission');
    const skillsSection = document.getElementById('skillsSection');
    const teamGrid = document.getElementById('teamGrid');
    const memberModal = document.getElementById('memberModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    // Team members data
    const teamMembers = [
        {
            id: 1,
            name: "Habtamu Shewamene",
            role: "Frontend Developer & Project Lead",
            description: "Specializes in creating responsive, user-friendly interfaces with modern JavaScript frameworks.",
            fullDescription: "With over 5 years of experience in frontend development, Habtamu excels at creating intuitive user interfaces using React, Vue.js, and modern CSS frameworks. As Project Lead, he coordinates team efforts, manages timelines, and ensures seamless communication.",
            skills: ["React", "Vue.js", "TypeScript", "UI/UX", "Project Management"],
            experience: "5+ years",
            email: "habtamushewamen@gmail.com",
            avatarColor: "#3498db",
            avatarInitials: "HS"
        },
        {
            id: 2,
            name: "Estifanos Shambel",
            role: "UI/UX Designer",
            description: "Creates intuitive and aesthetically pleasing user interfaces. Focuses on user research.",
            fullDescription: "Estifanos is a passionate UI/UX designer with a background in psychology and design. He creates user-centered designs that are both beautiful and functional. His process includes user research, wireframing, prototyping, and usability testing.",
            skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
            experience: "4 years",
            email: "estifanosshambel@gmail.com",
            avatarColor: "#2ecc71",
            avatarInitials: "ES"
        },
        {
            id: 3,
            name: "Habtamu Befekadu",
            role: "Backend Developer",
            description: "Builds robust server-side logic and database architecture. Ensures system security.",
            fullDescription: "Habtamu B. is a backend specialist with expertise in Node.js, Python, and database design. He builds secure, scalable APIs and ensures system reliability. His focus is on creating efficient server-side logic that can handle high loads.",
            skills: ["Node.js", "Python", "Database Design", "API Development", "Security"],
            experience: "6 years",
            email: "habtamubefekadu@gmail.com",
            avatarColor: "#9b59b6",
            avatarInitials: "HB"
        },
        {
            id: 4,
            name: "Biniam Agegnehu",
            role: "Full Stack Developer",
            description: "Works across both frontend and backend development. Implements features end-to-end.",
            fullDescription: "Biniam is a versatile full stack developer who enjoys working on both client-side and server-side code. He has experience with the MERN stack and enjoys solving complex problems that span the entire application stack.",
            skills: ["JavaScript", "Express.js", "MongoDB", "React", "Full Stack"],
            experience: "4 years",
            email: "biniamagegnehu@gmail.com",
            avatarColor: "#e74c3c",
            avatarInitials: "BA"
        },
        {
            id: 5,
            name: "Henok Kebede",
            role: "Quality Assurance Engineer",
            description: "Designs and executes test plans to ensure software quality. Implements automated testing.",
            fullDescription: "Henok is a meticulous QA engineer who ensures our software meets the highest quality standards. He develops comprehensive test plans, implements automated testing, and works closely with developers to identify and resolve issues.",
            skills: ["Testing", "Automation", "Debugging", "Performance", "CI/CD"],
            experience: "5 years",
            email: "henokkebede@gmail.com",
            avatarColor: "#f39c12",
            avatarInitials: "HK"
        },
        {
            id: 6,
            name: "Melat Kassahun",
            role: "DevOps Specialist",
            description: "Manages deployment pipelines, cloud infrastructure, and CI/CD processes.",
            fullDescription: "Melat is a DevOps specialist who manages our cloud infrastructure and CI/CD pipelines. She ensures smooth deployments, monitors system performance, and optimizes development workflows for maximum efficiency.",
            skills: ["Docker", "AWS", "CI/CD", "Infrastructure", "Kubernetes"],
            experience: "4 years",
            email: "melatkassahun@gmail.com",
            avatarColor: "#1abc9c",
            avatarInitials: "MK"
        },
        {
            id: 7,
            name: "Icon Girma",
            role: "Technical Documentation & Support",
            description: "Creates comprehensive documentation and provides technical support.",
            fullDescription: "Icon is responsible for creating clear, comprehensive technical documentation and providing support to both the team and end-users. He ensures knowledge is properly documented and transferred.",
            skills: ["Documentation", "Technical Writing", "Support", "Communication", "Training"],
            experience: "3 years",
            email: "icongirma@gmail.com",
            avatarColor: "#34495e",
            avatarInitials: "IG"
        }
    ];

    // Initialize the page
    initPage();

    function initPage() {
        // Initialize Navigation
        if (typeof Navbar !== 'undefined') {
            Navbar.init('Team');
        }

        // Hide loader after page loads (Fail-safe)
        setTimeout(() => {
            if (loader) {
                loader.classList.add('loaded');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 800);

        generateTeamCards();
        setupScrollAnimations();
        setupEventListeners();

        // Initialize skills animation safely
        setTimeout(() => {
            animateSkills();
        }, 1000);

        // Add dynamic CSS
        addDynamicStyles();

        setTimeout(() => {
            if (teamTitle) teamTitle.classList.add('animated');
        }, 300);
    }

    // Generate team cards
    function generateTeamCards() {
        if (!teamGrid) return;
        teamGrid.innerHTML = '';

        teamMembers.forEach((member, index) => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.setAttribute('data-member-id', member.id);
            card.style.animationDelay = `${index * 0.1 + 0.5}s`;

            // Create skills HTML
            let skillsHTML = '';
            if (member.skills && member.skills.length > 0) {
                skillsHTML = `<div class="member-skills">`;
                member.skills.forEach(skill => {
                    skillsHTML += `<span class="skill-tag">${skill}</span>`;
                });
                skillsHTML += `</div>`;
            }

            card.innerHTML = `
                <div class="card-header">
                    <div class="member-avatar" style="background-color: ${member.avatarColor}">
                        <span>${member.avatarInitials}</span>
                    </div>
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                </div>
                <div class="card-body">
                    <p class="member-description">${member.description}</p>
                    ${skillsHTML}
                    <div class="view-details">
                        <span class="view-text">Contact / Details</span>
                        <i class="fas fa-envelope"></i>
                    </div>
                </div>
            `;

            teamGrid.appendChild(card);
        });

        // Add event listeners to cards
        addCardInteractions();
    }

    // Enhanced card interactions
    function addCardInteractions() {
        const cards = document.querySelectorAll('.team-card');

        cards.forEach(card => {
            // Mouse enter effect
            card.addEventListener('mouseenter', function (e) {
                this.style.zIndex = '100';

                // Add floating animation to skills
                const skills = this.querySelectorAll('.skill-tag');
                skills.forEach((skill, i) => {
                    skill.style.transform = `translateY(-${5 + i * 2}px)`;
                    skill.style.transitionDelay = `${i * 0.05}s`;
                });
            });

            // Mouse leave effect
            card.addEventListener('mouseleave', function () {
                this.style.zIndex = '';

                // Reset skills position
                const skills = this.querySelectorAll('.skill-tag');
                skills.forEach(skill => {
                    skill.style.transform = '';
                    skill.style.transitionDelay = '';
                });
            });

            // Click to show modal with member details
            card.addEventListener('click', function () {
                const memberId = this.getAttribute('data-member-id');
                const member = teamMembers.find(m => m.id === parseInt(memberId));

                if (member) {
                    showMemberModal(member);

                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                }
            });

            // Touch support
            card.addEventListener('touchstart', function (e) {
                this.classList.add('touched');
            }, { passive: true });

            card.addEventListener('touchend', function () {
                this.classList.remove('touched');
            });
        });
    }

    // Show member details in modal
    function showMemberModal(member) {
        // Create modal content
        let skillsHTML = '';
        if (member.skills && member.skills.length > 0) {
            member.skills.forEach(skill => {
                skillsHTML += `<span class="modal-skill">${skill}</span>`;
            });
        }

        modalBody.innerHTML = `
            <div class="modal-header" style="background-color: ${member.avatarColor}">
                <div class="modal-avatar">${member.avatarInitials}</div>
                <h2>${member.name}</h2>
                <p class="modal-role">${member.role}</p>
                <p class="modal-experience"><i class="fas fa-briefcase"></i> ${member.experience} experience</p>
                <button class="modal-close-btn" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-details">
                <h3>About</h3>
                <p class="modal-description">${member.fullDescription}</p>
                
                <h3>Skills & Expertise</h3>
                <div class="modal-skills">
                    ${skillsHTML}
                </div>
                
                <!-- Contact Form Section -->
                <div class="modal-contact-form">
                    <h4>Contact ${member.name}</h4>
                    <div class="form-feedback" id="formFeedback"></div>
                    <form id="contactForm" data-member-name="${member.name}">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="fullName">Full Name *</label>
                                <input type="text" id="fullName" required placeholder="Your name">
                            </div>
                            <div class="form-group">
                                <label for="gender">Gender *</label>
                                <select id="gender" required>
                                    <option value="" disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="age">Age *</label>
                                <input type="number" id="age" required placeholder="Age" min="18" max="100">
                            </div>
                            <div class="form-group">
                                <label for="role">Role *</label>
                                <select id="role" required>
                                    <option value="" disabled selected>Select Role</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Employer">Employer</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="purpose">Purpose of Contact *</label>
                            <input type="text" id="purpose" required placeholder="e.g. Job Offer, Collaboration">
                        </div>
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" required placeholder="Write your message here..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-paper-plane"></i> Send Message
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Show modal
        memberModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add Form Listener
        document.getElementById('contactForm').addEventListener('submit', handleContactFormSubmit);
    }

    // Handle Contact Form Submit
    function handleContactFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const memberName = form.getAttribute('data-member-name'); // retrieve member name

        const feedback = document.getElementById('formFeedback');
        const fullName = document.getElementById('fullName').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const role = document.getElementById('role').value;
        const purpose = document.getElementById('purpose').value;
        const message = document.getElementById('message').value;

        // Basic Validation
        if (!fullName || !gender || !age || !role || !purpose || !message) {
            feedback.textContent = "Please fill in all mandatory fields.";
            feedback.className = "form-feedback error";
            feedback.style.display = 'block';
            return;
        }

        // Simulate API call/Success
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Update feedback message to include member name
            feedback.textContent = `Your message to ${memberName} has been sent successfully.`;
            feedback.className = "form-feedback success";
            feedback.style.display = 'block';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent';

            // Clear form
            e.target.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    }

    // Close modal
    function closeModal() {
        if (memberModal) memberModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Setup scroll animations
    function setupScrollAnimations() {
        if (!scrollProgress || !backToTop || !pageHeader) return;

        window.addEventListener('scroll', function () {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";

            if (winScroll > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            const parallaxValue = winScroll * 0.5;
            pageHeader.style.setProperty('--scroll-parallax', `${parallaxValue}px`);

            checkScrollAnimations();
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Check for scroll animations
    function checkScrollAnimations() {
        const elements = [
            { element: teamTitle, offset: 100 },
            { element: teamStats, offset: 100 },
            { element: teamMission, offset: 100 },
            { element: skillsSection, offset: 100 }
        ];

        elements.forEach(item => {
            if (item.element && !item.element.classList.contains('animated')) {
                const rect = item.element.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight - item.offset;

                if (isVisible) {
                    item.element.classList.add('animated');
                }
            }
        });

        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            if (!bar.classList.contains('animated')) {
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight - 100;

                if (isVisible) {
                    bar.classList.add('animated');
                    const level = bar.getAttribute('data-level');
                    const fill = bar.querySelector('.skill-fill');
                    if (fill) fill.style.width = level + '%';
                }
            }
        });
    }

    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight - 100;

            if (isVisible) {
                bar.classList.add('animated');
                const level = bar.getAttribute('data-level');
                const fill = bar.querySelector('.skill-fill');
                if (fill) fill.style.width = level + '%';
            }
        });
    }

    // Setup event listeners

    function setupEventListeners() {
        // Attach modal close handlers so the 'X' and overlay work as expected.
        if (memberModal) {
            // Close when clicking the overlay background (outside modal content)
            memberModal.addEventListener('click', function (e) {
                if (e.target === memberModal) closeModal();
            });

            // Close when clicking any close button inside the modal header
            memberModal.addEventListener('click', function (e) {
                const btn = e.target.closest('.modal-close-btn');
                if (btn) closeModal();
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Add some dynamic CSS for additional CARD effects (removed modal/form hardcode)
    addDynamicStyles();

    setTimeout(() => {
        if (teamTitle) teamTitle.classList.add('animated');
    }, 500);
});

// Add dynamic CSS for additional effects (kept only card touches, moved modal/msg styles to team/style.css where possible)
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Dynamic Styles Injected by JS (minimal) */
        .view-details {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--primary);
            font-weight: 600;
            margin-top: 20px;
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.3s ease;
        }
        
        .team-card:hover .view-details {
            opacity: 1;
            transform: translateX(0);
        }
        
        .team-card:hover .view-details i {
            transform: translateX(5px);
        }

        /* Modal Header Custom for JS injection */
        .modal-header {
            padding: 40px;
            text-align: center;
            color: white; /* Always white text on colored bg */
            border-radius: 20px 20px 0 0;
            position: relative;
            overflow: hidden;
        }
        
        .modal-header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(0,0,0,0.2), transparent);
            pointer-events: none;
        }
        
        .modal-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: bold;
            margin: 0 auto 20px;
            border: 3px solid white;
            position: relative;
            z-index: 2;
        }

        .modal-close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(0,0,0,0.2);
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
            z-index: 10;
        }
        
        .modal-close-btn:hover {
            background: rgba(0,0,0,0.4);
        }

        /* Card glow effect */
        .card-glow {
            animation: glowPulse 3s infinite;
        }
        
        @keyframes glowPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--dark-light);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 5px;
        }
    `;

    document.head.appendChild(style);
}