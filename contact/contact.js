document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let response = document.getElementById("response");

    if (name === "" || email === "" || message === "") {
        response.style.color = "red";
        response.innerText = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        response.style.color = "red";
        response.innerText = "Please enter a valid email address.";
        return;
    }

    response.style.color = "green";
    response.innerText = "Message sent successfully! (Demo only)";

    document.getElementById("contactForm").reset();
});
