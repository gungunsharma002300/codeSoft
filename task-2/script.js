// Button click animation
document.getElementById("btn").addEventListener("click", () => {
  alert("Welcome to the future 🚀");
});

// Smooth scroll effect
document.querySelectorAll("a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});