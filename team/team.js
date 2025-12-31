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
    currentYearSpan.textContent = new Date().getFullYear();

    // Team members data with enhanced information
    const teamMembers = [
        {
            id: 1,
            name: "habtamu shewamen",
            role: "Frontend Developer & Project Lead",
            description: "Specializes in creating responsive, user-friendly interfaces with modern JavaScript frameworks. Leads team coordination and ensures project milestones are met.",
            fullDescription: "With over 5 years of experience in frontend development, Alex excels at creating intuitive user interfaces using React, Vue.js, and modern CSS frameworks. As Project Lead, they coordinate team efforts, manage timelines, and ensure seamless communication between all team members.",
            skills: ["React", "Vue.js", "TypeScript", "UI/UX", "Project Management"],
            experience: "5+ years",
            email: "habtamushewamen12gmail.com",
            avatarColor: "#3498db",
            avatarInitials: "AM"
        },
        {
            id: 2,
            name: "estifanos shambel ",
            role: "UI/UX Designer",
            description: "Creates intuitive and aesthetically pleasing user interfaces. Focuses on user research, wireframing, and prototyping to optimize user experience.",
            fullDescription: "Samantha is a passionate UI/UX designer with a background in psychology and design. She creates user-centered designs that are both beautiful and functional. Her process includes user research, wireframing, prototyping, and usability testing to ensure optimal user experiences.",
            skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
            experience: "4 years",
            email: "estifanosshambel295gmail.com",
            avatarColor: "#2ecc71",
            avatarInitials: "SC"
        },
        {
            id: 3,
            name: "habtamu befikadu",
            role: "Backend Developer",
            description: "Builds robust server-side logic and database architecture. Ensures system security, performance, and scalability of applications.",
            fullDescription: "David is a backend specialist with expertise in Node.js, Python, and database design. He builds secure, scalable APIs and ensures system reliability. His focus is on creating efficient server-side logic that can handle high loads while maintaining data integrity.",
            skills: ["Node.js", "Python", "Database Design", "API Development", "Security"],
            experience: "6 years",
            email: "habtamubefekadu19gamil.com",
            avatarColor: "#9b59b6",
            avatarInitials: "DR"
        },
        {
            id: 4,
            name: "biniyam agegnewu",
            role: "Full Stack Developer",
            description: "Works across both frontend and backend development. Implements features end-to-end and ensures seamless integration between components.",
            fullDescription: "Jessica is a versatile full stack developer who enjoys working on both client-side and server-side code. She has experience with the MERN stack and enjoys solving complex problems that span the entire application stack.",
            skills: ["JavaScript", "Express.js", "MongoDB", "React", "Full Stack"],
            experience: "4 years",
            email: "biniyamagegnehu2gmail.com",
            avatarColor: "#e74c3c",
            avatarInitials: "JW"
        },
        {
            id: 5,
            name: "henok kebede",
            role: "Quality Assurance Engineer",
            description: "Designs and executes test plans to ensure software quality. Implements automated testing and monitors for bugs and performance issues.",
            fullDescription: "Michael is a meticulous QA engineer who ensures our software meets the highest quality standards. He develops comprehensive test plans, implements automated testing, and works closely with developers to identify and resolve issues early in the development cycle.",
            skills: ["Testing", "Automation", "Debugging", "Performance", "CI/CD"],
            experience: "5 years",
            email: "henokkebede410@gmail.com",
            avatarColor: "#f39c12",
            avatarInitials: "MT"
        },
        {
            id: 6,
            name: "melat kassa",
            role: "DevOps Specialist",
            description: "Manages deployment pipelines, cloud infrastructure, and CI/CD processes. Ensures reliable and efficient development workflows.",
            fullDescription: "Emily is a DevOps specialist who manages our cloud infrastructure and CI/CD pipelines. She ensures smooth deployments, monitors system performance, and optimizes development workflows for maximum efficiency.",
            skills: ["Docker", "AWS", "CI/CD", "Infrastructure", "Kubernetes"],
            experience: "4 years",
            email: "kassamelat234.gmail.com",
            avatarColor: "#1abc9c",
            avatarInitials: "EZ"
        },
        {
            id: 7,
            name: "icon girma",
            role: "Technical Documentation & Support",
            description: "Creates comprehensive documentation and provides technical support. Ensures knowledge transfer and assists with project communication.",
            fullDescription: "Ryan is responsible for creating clear, comprehensive technical documentation and providing support to both the team and end-users. He ensures knowledge is properly documented and transferred, and assists with project communication and coordination.",
            skills: ["Documentation", "Technical Writing", "Support", "Communication", "Training"],
            experience: "3 years",
            email: "icongirma129gmail.com",
            avatarColor: "#34495e",
            avatarInitials: "RC"
        }
    ];

    // Initialize the page
    function initPage() {
        // Initialize Navigation
        if (typeof Navbar !== 'undefined') {
            Navbar.init('Team');
        }

        // Hide loader after page loads
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);

        generateTeamCards();
        setupScrollAnimations();
        setupEventListeners();

        // Initialize skills animation
        setTimeout(animateSkills, 1000);
    }

    // Generate team cards with enhanced hover effects
    function generateTeamCards() {
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
                        <span class="view-text">Click for details</span>
                        <i class="fas fa-arrow-right"></i>
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

                // Create a glow effect
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const glow = document.createElement('div');
                glow.className = 'card-glow';
                glow.style.cssText = `
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle at ${x}px ${y}px, rgba(52, 152, 219, 0.2), transparent);
                    top: -100px;
                    left: -100px;
                    pointer-events: none;
                    z-index: -1;
                    border-radius: 50%;
                `;

                this.appendChild(glow);

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

                // Remove glow effect
                const glow = this.querySelector('.card-glow');
                if (glow) glow.remove();

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

            // Add touch support for mobile
            card.addEventListener('touchstart', function (e) {
                this.classList.add('touched');
                e.preventDefault();
            }, { passive: false });

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
            </div>
            <div class="modal-details">
                <h3>About</h3>
                <p class="modal-description">${member.fullDescription}</p>
                
                <h3>Skills & Expertise</h3>
                <div class="modal-skills">
                    ${skillsHTML}
                </div>
                
                <h3>Contact</h3>
                <div class="modal-contact">
                    <p><i class="fas fa-envelope"></i> ${member.email}</p>
                    <button class="contact-btn"><i class="fas fa-paper-plane"></i> Send Message</button>
                </div>
            </div>
        `;

        // Show modal
        memberModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        memberModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Setup scroll animations
    function setupScrollAnimations() {
        // Scroll progress indicator
        window.addEventListener('scroll', function () {
            // Update scroll progress
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";

            // Show/hide back to top button
            if (winScroll > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Parallax effect for header
            const parallaxValue = winScroll * 0.5;
            pageHeader.style.setProperty('--scroll-parallax', `${parallaxValue}px`);

            // Trigger animations when elements come into view
            checkScrollAnimations();
        });

        // Back to top button
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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

        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            if (!bar.classList.contains('animated')) {
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight - 100;

                if (isVisible) {
                    bar.classList.add('animated');
                    const level = bar.getAttribute('data-level');
                    const fill = bar.querySelector('.skill-fill');
                    fill.style.width = level + '%';
                }
            }
        });
    }

    // Animate skill bars
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight - 100;

            if (isVisible) {
                bar.classList.add('animated');
                const level = bar.getAttribute('data-level');
                const fill = bar.querySelector('.skill-fill');
                fill.style.width = level + '%';
            }
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Modal close button
        modalClose.addEventListener('click', closeModal);

        // Close modal when clicking outside
        memberModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && memberModal.classList.contains('active')) {
                closeModal();
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
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize the page
    initPage();

    // Add some dynamic CSS for additional effects
    addDynamicStyles();

    // Initialize animations on load
    setTimeout(() => {
        teamTitle.classList.add('animated');
    }, 500);
});

// Add dynamic CSS for additional effects
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
        
        .view-text {
            font-size: 0.9rem;
        }
        
        .view-details i {
            transition: transform 0.3s ease;
        }
        
        .team-card:hover .view-details i {
            transform: translateX(5px);
        }
        
        /* Modal styles */
        .modal-header {
            padding: 40px;
            text-align: center;
            color: white;
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
        }
        
        .modal-header h2 {
            font-size: 2.2rem;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }
        
        .modal-role {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }
        
        .modal-experience {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 1rem;
            position: relative;
            z-index: 2;
        }
        
        .modal-details {
            padding: 30px;
        }
        
        .modal-details h3 {
            color: var(--heading-color);
            margin: 25px 0 15px;
            font-size: 1.4rem;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 8px;
        }
        
        .modal-details h3:first-child {
            margin-top: 0;
        }
        
        .modal-description {
            line-height: 1.7;
            color: var(--text-muted);
        }
        
        .modal-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .modal-skill {
            background: #f1f8ff;
            color: #0366d6;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .modal-contact {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .modal-contact p {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-muted);
            font-size: 1.1rem;
        }
        
        .contact-btn {
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        }
        
        .contact-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }
        
        /* Card glow effect */
        .card-glow {
            animation: glowPulse 3s infinite;
        }
        
        @keyframes glowPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
        }
        
        /* Team card touch effect */
        .team-card.touched {
            transform: scale(0.98);
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--dark-light);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #3498db, #2ecc71);
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #2980b9, #27ae60);
        }
    `;

    document.head.appendChild(style);
}