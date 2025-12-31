document.addEventListener('DOMContentLoaded', () => {
    // Initialize Navigation
    if (typeof Navbar !== 'undefined') {
        Navbar.init('Contact');
    }

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate Sending
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            // Success Feedback
            // "display your messay is suussfully delivered to the owner or system admin"
            showNotification('Your message is successfully delivered to the owner or system admin', 'success');

            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }, 1500);
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    notif.innerHTML = `
        <i class="fas ${icon}"></i>
        <p>${message}</p>
    `;

    container.appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(100%)';
        setTimeout(() => notif.remove(), 300);
    }, 4000);
}
