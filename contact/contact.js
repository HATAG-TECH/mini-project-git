const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

// Show success/error messages
function showMessage(message, isSuccess) {
    const response = document.getElementById("response");
    response.innerText = message;
    response.className = 'response-box ' + (isSuccess ? 'response-success' : 'response-error');
    response.style.display = 'block';
    setTimeout(() => response.style.display = 'none', 4000);
}

// Form validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        showMessage("Please fill all fields.", false);
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showMessage("Invalid email address.", false);
        return;
    }

    showMessage("Message sent successfully! (Demo only)", true);
    this.reset();
});
