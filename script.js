// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

// Close the mobile menu after selecting a navigation link
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Keep the footer year current
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepares a WhatsApp message.
// IMPORTANT: Replace the placeholder below with the business WhatsApp number.
// Use country code and digits only, e.g. South Africa: 27XXXXXXXXX (no + or spaces).
const WHATSAPP_NUMBER = "27REPLACEWITHNUMBER";

const contactForm = document.getElementById("contactForm");
const formHint = document.getElementById("formHint");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  if (!/^27\d{9}$/.test(WHATSAPP_NUMBER)) {
    formHint.textContent = "The form is ready. Website setup needed: replace WHATSAPP_NUMBER in script.js with your South African WhatsApp number (27 followed by 9 digits).";
    formHint.classList.add("error-message");
    return;
  }

  const formData = new FormData(contactForm);
  const message = [
    "Hello Wetzie_Gate Systems,",
    "",
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Service: ${formData.get("service")}`,
    `Message: ${formData.get("message")}`
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  formHint.textContent = "WhatsApp has opened with your enquiry. Review it and press Send in WhatsApp.";
  formHint.classList.remove("error-message");
});
