// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--dark)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                navLinks.style.gap = '15px';
                navLinks.style.zIndex = '1000';
            }
        });
    }
    
    // Sidebar item active state
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Card hover effects enhancement
    const cards = document.querySelectorAll('.card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('feature-card') ? 'translateY(-10px)' : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search tags interaction
    const searchTags = document.querySelectorAll('.search-tag');
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-input');
            searchInput.value = this.textContent.replace('Quick: ', '');
            searchInput.focus();
        });
    });
    
    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Simulate loading animation for stats
    const statProgressBars = document.querySelectorAll('.stat-progress');
    statProgressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
    
    // Update activity time dynamically
    function updateActivityTimes() {
        const activityTimes = document.querySelectorAll('.activity-time, .notification-time');
        const now = new Date();
        
        activityTimes.forEach((timeElement, index) => {
            const hoursAgo = index + 1;
            const time = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
            
            if (hoursAgo === 1) {
                timeElement.textContent = '1 hour ago';
            } else {
                timeElement.textContent = `${hoursAgo} hours ago`;
            }
        });
    }
    
    updateActivityTimes();
    
    // Auto-refresh activity every 5 minutes
    setInterval(updateActivityTimes, 5 * 60 * 1000);
    
    // Add click effect to cards
    const infoCards = document.querySelectorAll('.card');
    infoCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Update card stats randomly (simulating live data)
    function updateCardStats() {
        const cardStats = document.querySelectorAll('.card-stat');
        
        cardStats.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 50) - 25; // Random change between -25 and +25
            const newValue = Math.max(100, currentValue + change); // Ensure minimum value
            
            // Animate the number change
            let start = currentValue;
            const end = newValue;
            const duration = 1000;
            const startTime = Date.now();
            
            function animate() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(start + (end - start) * progress);
                stat.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        });
    }
    
    // Update stats every 30 seconds
    setInterval(updateCardStats, 30000);
});