// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
window.emailjs.init("QuuQqvXLpN0s4fL6J")

// Form submission handler
const contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const company = formData.get("company")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all required fields.")
    return
  }

  // Show loading state
  const submitButton = this.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent
  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Send email using EmailJS
  // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
  window.emailjs
    .send("service_8dwll8f", "template_05hi9ng", {
      from_name: name,
      from_email: email,
      company: company || "Not specified",
      message: message,
      to_email: "groundedcyber@gmail.com", // This should match your EmailJS template
    })
    .then(() => {
      alert("Thank you for your message! We will get back to you within 24 hours.")
      this.reset()
    })
    .catch((error) => {
      console.error("EmailJS Error:", error)
      alert(
        "Sorry, there was an error sending your message. Please try again or contact us directly at groundedcyber@gmail.com",
      )
    })
    .finally(() => {
      // Reset button state
      submitButton.textContent = originalText
      submitButton.disabled = false
    })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 15, 35, 0.98)"
  } else {
    header.style.background = "rgba(15, 15, 35, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe service cards for animation
document.querySelectorAll(".service-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})
