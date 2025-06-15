// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking a link
      const navLinks = document.querySelector(".nav-links");
      navLinks.classList.remove("active");
      const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
      const icon = mobileNavToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    }
  });
});

// Add active class to navigation links on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

// Add scroll reveal animation
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".timeline-item, .project-card");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

// Update icon based on current theme
const icon = themeToggle.querySelector("i");
icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);

  // Save theme preference
  localStorage.setItem("theme", newTheme);

  // Update icon
  const icon = themeToggle.querySelector("i");
  icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

  setTimeout(updateTimelineDots, 100); // Small delay to ensure theme has changed
});

// Mobile Navigation
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelector(".nav-links");

mobileNavToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Recommendations Slider
const recommendationItems = document.querySelectorAll(".recommendation-item");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  // Hide all slides
  recommendationItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show current slide and activate corresponding dot
  recommendationItems[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % recommendationItems.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  // Show first slide
  showSlide(currentSlide);

  // Start automatic slideshow
  slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Add click event to dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
    // Reset the interval when manually changing slides
    clearInterval(slideInterval);
    startSlideshow();
  });
});

// Start the slideshow when the page loads
document.addEventListener("DOMContentLoaded", startSlideshow);

// Pause slideshow when hovering over recommendations
const recommendationsSlider = document.querySelector(".recommendations-slider");
recommendationsSlider.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

recommendationsSlider.addEventListener("mouseleave", () => {
  startSlideshow();
});

// Timeline Dot Styling
function updateTimelineDots() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    const dateElement = item.querySelector(".timeline-date");
    const dot = item.querySelector(".timeline-dot");

    if (dateElement && dot) {
      // Default state: white with black border
      dot.style.background = "var(--background)";
      dot.style.border = "2px solid var(--primary-color)";

      // If date includes "Present", make it solid black
      if (dateElement.textContent.includes("Present")) {
        dot.style.background = "var(--primary-color)";
        dot.style.border = "none";
      }
    }
  });
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  startSlideshow();
});

// Update dots when theme changes
themeToggle.addEventListener("click", () => {
  setTimeout(updateTimelineDots, 100);
});
